import { API_URL, FHIR_URL } from '../config/api';

class FhirClient {
    constructor(baseUrl = FHIR_URL) {
        this.baseUrl = baseUrl;
        this.abortControllers = new Map();
    }

    /**
     * Creates headers with optional authorization
     * @param {Object} options Additional header options
     * @returns {Headers} Headers object
     */
    createHeaders(options = {}) {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...options
        });
        
        // Add authorization if available
        const token = localStorage.getItem('auth_token');
        if (token) {
            headers.append('Authorization', `Bearer ${token}`);
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
     * Makes a FHIR request with streaming support
     * @param {string} endpoint FHIR endpoint
     * @param {Object} options Request options
     * @returns {Promise<Object>} FHIR resource
     */
    async request(endpoint, options = {}) {
        const controller = new AbortController();
        const id = Date.now().toString();
        this.abortControllers.set(id, controller);

        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                ...options,
                headers: this.createHeaders(options.headers),
                signal: controller.signal,
                mode: 'cors',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`FHIR request failed: ${response.status} ${response.statusText}`);
            }

            // Use streaming for large responses
            if (response.headers.get('content-length') > 1024 * 1024) { // 1MB
                return await this.handleStreamingResponse(response);
            }

            return await response.json();
        } finally {
            this.abortControllers.delete(id);
        }
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
        // Ensure the bundle is of type "message"
        if (bundle.type !== "message") {
            throw new Error("Bundle must be of type 'message' for $process-message operation");
        }

        return this.request('/$process-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors',
            credentials: 'same-origin',
            body: JSON.stringify(bundle)
        });
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
            body: JSON.stringify(parameters)
        });
    }
}

// Create singleton instance
const fhirClient = new FhirClient();
export default fhirClient; 