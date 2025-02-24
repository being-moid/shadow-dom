import API_ENDPOINTS, { API_URL, FHIR_URL } from '../config/api';
import axios from 'axios';

 class FhirClient {
    
    constructor(baseUrl = API_ENDPOINTS.FHIR.SendMessage) {
        this.baseUrl = baseUrl;
        
        this.axiosInstance = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            timeout: 30000,
            // Don't parse response automatically
            transformResponse: [(data) => data],
            withCredentials: false, // Important for CORS
            maxRedirects: 5 // Handle ngrok redirects
        });

        // Add request interceptor
        this.axiosInstance.interceptors.request.use((config) => {
            // Add request ID and timestamp
            const requestId = Date.now().toString();
            config.headers['X-Request-ID'] = requestId;
            
            // If the request has data, process dates before sending
            if (config.data) {
                config.data = this.processDatesInResource(config.data);
            }
            
            console.log(`[${requestId}] FHIR Request:`, {
                url: config.url,
                method: config.method,
                headers: config.headers,
                data: config.data
            });
            
            return config;
        });

        // Add response interceptor
        this.axiosInstance.interceptors.response.use(
            (response) => {
                const requestId = response.config.headers['X-Request-ID'];
                console.log(`[${requestId}] FHIR Response:`, {
                    status: response.status,
                    headers: response.headers,
                    data: response.data
                });

                try {
                    const parsed = typeof response.data === 'string' ? 
                        JSON.parse(response.data) : response.data;

                    // Handle API response wrapper
                    if ('isSuccessfull' in parsed) {
                        if (!parsed.isSuccessfull) {
                            throw new Error(parsed.errorMessage || 'API request failed');
                        }
                        
                        // Extract the FHIR resource from dynamicResult
                        if (!parsed.dynamicResult) {
                            throw new Error('No dynamicResult in API response');
                        }

                        return this.processFhirResource(parsed.dynamicResult);
                    }
                    
                    // Direct FHIR response
                    return this.processFhirResource(parsed);
                } catch (error) {
                    console.error(`[${requestId}] Error parsing FHIR response:`, error);
                    throw new Error(`Invalid FHIR response: ${error.message}`);
                }
            },
            (error) => {
                const requestId = error.config?.headers['X-Request-ID'];
                console.error(`[${requestId}] FHIR request failed:`, error);

                // Handle API error response
                if (error.response?.data) {
                    const errorData = typeof error.response.data === 'string' ?
                        JSON.parse(error.response.data) : error.response.data;

                    if ('isSuccessfull' in errorData && !errorData.isSuccessfull) {
                        // Create OperationOutcome from API error
                        const operationOutcome = {
                            resourceType: 'OperationOutcome',
                            issue: [{
                                severity: 'error',
                                code: 'processing',
                                diagnostics: errorData.errorMessage || 'Unknown error',
                                details: {
                                    text: errorData.errorStackTrace || ''
                                }
                            }]
                        };

                        return Promise.reject({
                            resourceType: 'Bundle',
                            type: 'collection',
                            entry: [{
                                resource: operationOutcome
                            }]
                        });
                    }
                }

                return Promise.reject(error);
            }
        );
    }

    /**
     * Creates headers with optional authorization
     * @param {Object} options Additional header options
     * @returns {Object} Headers object
     */
    createHeaders(options = {}) {
        const headers = {
            'Content-Type': 'application/fhir+json',
            'Accept': 'application/fhir+json',
            ...options
        };
        
        // Add authorization if available
        const token = localStorage.getItem('auth_token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        return headers;
    }

    /**
     * Handles streaming response for large FHIR resources
     * @param {Response} response Fetch response object
     * @returns {Promise<Object>} Parsed FHIR resource
     */
    async handleStreamingResponse(response) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let chunks = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            chunks += decoder.decode(value, { stream: true });
        }

        // Final decode to handle any remaining bytes
        chunks += decoder.decode();

        try {
            return JSON.parse(chunks);
        } catch (error) {
            console.error('Error parsing FHIR response:', error);
            throw new Error('Invalid FHIR response format');
        }
    }

    /**
     * Formats a date string to FHIR format
     * @param {string} dateString The date string to format
     * @param {boolean} includeTime Whether to include time component
     * @returns {string} Formatted date string
     */
    formatFhirDate(dateString, includeTime = false) {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                throw new Error('Invalid date');
            }

            // Format date as YYYY-MM-DD
            const dateComponent = date.toISOString().split('T')[0];
            
            // For birthDate, we only want the date component
            if (!includeTime) {
                return dateComponent;
            }

            // For other dates that need time, use full ISO string
            return date.toISOString();
        } catch (error) {
            console.error('Error formatting date:', dateString, error);
            return dateString; // Return original if can't format
        }
    }

    /**
     * Process dates in a FHIR resource
     * @param {Object|string} resource The FHIR resource
     * @returns {Object|string} Processed resource
     */
    processDatesInResource(resource) {
        if (typeof resource === 'string') {
            try {
                resource = JSON.parse(resource);
            } catch (e) {
                return resource;
            }
        }

        const processValue = (value) => {
            if (Array.isArray(value)) {
                return value.map(v => this.processDatesInResource(v));
            }
            if (typeof value === 'object' && value !== null) {
                return this.processDatesInResource(value);
            }
            return value;
        };

        // Handle specific date fields
        const dateFields = ['birthDate', 'date', 'issued', 'recorded', 'lastUpdated'];
        const timeFields = ['timestamp', 'period.start', 'period.end', 'effectiveDateTime'];

        const processed = { ...resource };
        
        Object.entries(processed).forEach(([key, value]) => {
            if (dateFields.includes(key)) {
                processed[key] = this.formatFhirDate(value, false);
            } else if (timeFields.includes(key)) {
                processed[key] = this.formatFhirDate(value, true);
            } else {
                processed[key] = processValue(value);
            }
        });

        return processed;
    }

    /**
     * Process a FHIR resource, handling nested value objects
     * @param {Object} resource The FHIR resource to process
     * @returns {Object} Processed FHIR resource
     */
    processFhirResource(resource) {
        if (!resource || typeof resource !== 'object') {
            return resource;
        }

        // Handle arrays
        if (Array.isArray(resource)) {
            return resource.map(item => this.processFhirResource(item));
        }

        const result = {};

        // Process each property
        for (const [key, value] of Object.entries(resource)) {
            if (value && typeof value === 'object') {
                if ('value' in value) {
                    // Extract value from {value: X} structure
                    result[key] = value.value;
                } else if (Array.isArray(value)) {
                    // Process arrays
                    result[key] = value.map(item => this.processFhirResource(item));
                } else {
                    // Recursively process nested objects
                    result[key] = this.processFhirResource(value);
                }
            } else {
                result[key] = value;
            }
        }

        return result;
    }

    /**
     * Makes a FHIR request
     * @param {string} endpoint FHIR endpoint
     * @param {Object} options Request options
     * @returns {Promise<Object>} FHIR resource
     */
    async request(endpoint, options = {}) {
        try {
            // For process-message, use the base URL directly
            const url = endpoint === this.baseUrl ? '' : endpoint;
            
            const config = {
                url,
                method: options.method || 'GET',
                headers: {
                    ...this.axiosInstance.defaults.headers,
                    ...options.headers
                }
            };

            if (options.body) {
                // Process dates in the request body
                const processedBody = this.processDatesInResource(options.body);
                config.data = typeof processedBody === 'string' ? 
                    processedBody : JSON.stringify(processedBody);
            }

            return await this.axiosInstance(config);

        } catch (error) {
            console.error('FHIR request error:', error);
            throw error;
        }
    }

    /**
     * Performs a FHIR search
     * @param {string} resourceType FHIR resource type
     * @param {Object} params Search parameters
     * @returns {Promise<Object>} Search results
     */
    async search(resourceType, params = {}) {
        const searchParams = new URLSearchParams(params);
        return this.request(`/${resourceType}/_search?${searchParams.toString()}`, {
            method: 'POST'
        });
    }

    /**
     * Creates a FHIR resource
     * @param {string} resourceType FHIR resource type
     * @param {Object} resource Resource data
     * @returns {Promise<Object>} Created resource
     */
    async create(resourceType, resource) {
        return this.request(`/${resourceType}`, {
            method: 'POST',
            body: JSON.stringify(resource)
        });
    }

    /**
     * Updates a FHIR resource
     * @param {string} resourceType FHIR resource type
     * @param {string} id Resource ID
     * @param {Object} resource Updated resource data
     * @returns {Promise<Object>} Updated resource
     */
    async update(resourceType, id, resource) {
        return this.request(`/${resourceType}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(resource)
        });
    }

    /**
     * Reads a FHIR resource
     * @param {string} resourceType FHIR resource type
     * @param {string} id Resource ID
     * @returns {Promise<Object>} Resource data
     */
    async read(resourceType, id) {
        return this.request(`/${resourceType}/${id}`);
    }

    /**
     * Deletes a FHIR resource
     * @param {string} resourceType FHIR resource type
     * @param {string} id Resource ID
     * @returns {Promise<void>}
     */
    async delete(resourceType, id) {
        return this.request(`/${resourceType}/${id}`, {
            method: 'DELETE'
        });
    }

    /**
     * Performs a FHIR batch/transaction using $process-message operation
     * @param {Object} bundle FHIR Bundle resource
     * @returns {Promise<Object>} Bundle response
     */
    async transaction(bundle) {
        return this.processMessage(bundle);
    }

    /**
     * Performs a $process-message operation with a FHIR Bundle
     * @param {Object} bundle FHIR Bundle resource
     * @returns {Promise<Object>} Operation outcome
     */
    async processMessage(bundle) {
        if (!bundle.resourceType || bundle.resourceType !== 'Bundle') {
            throw new Error('Invalid FHIR Bundle - missing or incorrect resourceType');
        }

        if (bundle.type !== "message") {
            throw new Error("Bundle must be of type 'message' for $process-message operation");
        }

        try {
            // Since FHIR_URL already includes $process-message, use it directly
            return await this.request(this.baseUrl, {
                method: 'POST',
                body: bundle
            });
        } catch (error) {
            console.error('Error processing FHIR message:', error);
            throw error;
        }
    }

    /**
     * Performs a FHIR operation
     * @param {string} resourceType FHIR resource type
     * @param {string} operation Operation name
     * @param {Object} parameters Operation parameters
     * @returns {Promise<Object>} Operation outcome
     */
    async operation(resourceType, operation, parameters = {}) {
        return this.request(`/${resourceType}/$${operation}`, {
            method: 'POST',
            body: parameters // Axios will handle JSON.stringify
        });
    }

    /**
     * Cancels an ongoing FHIR request
     * @param {string} id Request ID
     */
    cancelRequest(id) {
        const controller = this.abortControllers.get(id);
        if (controller) {
            controller.abort();
            this.abortControllers.delete(id);
        }
    }
}

// Create and export singleton instance
const fhirClient = new FhirClient();

// Named export for the class and default export for the instance
export { FhirClient };
export default fhirClient; 