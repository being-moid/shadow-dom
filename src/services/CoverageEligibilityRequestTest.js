import { CoverageEligibilityRequestMapper } from './CoverageEligblityRequestService';
import fhirClient from './FhirClient';

export class CoverageEligibilityRequestTest {
    static getDummyFormData() {
        // Generate consistent UUIDs for references
        const messageHeaderId = crypto.randomUUID();
        const requestId = crypto.randomUUID();
        const patientId = crypto.randomUUID();
        const providerId = crypto.randomUUID();
        const insurerId = crypto.randomUUID();
        const facilityId = crypto.randomUUID();

        return {
            messageHeaderId: messageHeaderId,
            requestId: requestId,
            focusReference: `http://provider.com/Coverageeligibilityrequest/${requestId}`,
            patient: {
                id: patientId,
                identifier: "2000000002",
                fullName: "Mohammed Ahmed Ali",
                familyName: "Ali",
                givenNames: ["Mohammed", "Ahmed"],
                phone: "+966512345678",
                gender: "male",
                birthDate: "1990-01-01",
                maritalStatus: "M",
                occupation: "employee",
                reference: `http://provider.com/Patient/${patientId}`
            },
            provider: {
                id: providerId,
                license: "PR-FHIR",
                name: "Saudi General Hospital",
                typeCode: "5",
                typeDisplay: "Hospital",
                reference: `http://provider.com/Organization/${providerId}`,
                endpoint: "http://provider.com"
            },
            insurer: {
                id: insurerId,
                license: "INS-FHIR",
                name: "Tawuniya Insurance",
                reference: `http://provider.com/Organization/${insurerId}`,
                endpoint: "http://nphies.sa/license/payer-license/INS-FHIR"
            },
            facility: {
                id: facilityId,
                license: "GACH",
                name: "Main Hospital Branch",
                type: "GACH",
                reference: `http://provider.com/Location/${facilityId}`
            },
            serviceDate: {
                start: new Date().toISOString(),
                end: new Date(Date.now() + 86400000).toISOString() // Tomorrow
            },
            meta: {
                profile: [
                    "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/bundle|1.0.0",
                    "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/message-header|1.0.0",
                    "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/eligibility-request|1.0.0"
                ],
                eventCoding: {
                    system: "http://nphies.sa/terminology/CodeSystem/ksa-message-events",
                    code: "eligibility-request"
                }
            }
        };
    }

    static async testEligibilityRequest() {
        try {
            console.log("Starting Coverage Eligibility Request Test...");

            // Get dummy form data
            const formData = this.getDummyFormData();
            console.log("Form Data:", formData);

            // Map the request using CoverageEligibilityRequestMapper
            const mappedParams = CoverageEligibilityRequestMapper.mapRequestParams(formData);
            console.log("Mapped Parameters:", mappedParams);

            // Create the FHIR Bundle
            const fhirBundle = CoverageEligibilityRequestMapper.createRequest(mappedParams);
            console.log("FHIR Bundle:", fhirBundle);

            // Send the request using FhirClient
            console.log("Sending request to FHIR server...");
            const response = await fhirClient.processMessage(fhirBundle);
            console.log("FHIR Server Response:", response);

            return {
                success: true,
                request: fhirBundle,
                response: response
            };
        } catch (error) {
            console.error("Error in Coverage Eligibility Request Test:", error);
            return {
                success: false,
                error: error.message,
                request: null
            };
        }
    }

    static testInBrowser() {
        // Create a simple UI for testing
        const testDiv = document.createElement('div');
        testDiv.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 1000;
            max-width: 400px;
        `;

        const button = document.createElement('button');
        button.textContent = 'Test Coverage Eligibility Request';
        button.style.cssText = `
            background: #8500d8;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-family: 'Inter', sans-serif;
            margin-bottom: 10px;
            width: 100%;
        `;

        const resultDiv = document.createElement('div');
        resultDiv.style.cssText = `
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            margin-top: 10px;
            max-height: 300px;
            overflow-y: auto;
        `;

        testDiv.appendChild(button);
        testDiv.appendChild(resultDiv);
        document.body.appendChild(testDiv);

        button.addEventListener('click', async () => {
            resultDiv.innerHTML = 'Testing...';
            try {
                const result = await CoverageEligibilityRequestTest.testEligibilityRequest();
                resultDiv.innerHTML = `
                    <div style="color: ${result.success ? '#10B981' : '#EF4444'}">
                        ${result.success ? 'Test Completed Successfully!' : 'Test Failed'}
                    </div>
                    <div style="margin-top: 10px; font-size: 12px; color: #6B7280;">
                        Check browser console for detailed logs
                    </div>
                `;
            } catch (error) {
                resultDiv.innerHTML = `
                    <div style="color: #EF4444">Error: ${error.message}</div>
                    <div style="margin-top: 10px; font-size: 12px; color: #6B7280;">
                        Check browser console for detailed logs
                    </div>
                `;
            }
        });
    }
}

export default CoverageEligibilityRequestTest; 