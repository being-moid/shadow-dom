import { CoverageEligibilityRequestTest } from './CoverageEligibilityRequestTest';
import { CoverageEligibilityRequestMapper } from './CoverageEligblityRequestService';
import fhirClient from './FhirClient';

// Initialize test functionality
const CoverageEligibilityTest = {
    getDummyData: () => CoverageEligibilityRequestTest.getDummyFormData(),
    test: () => CoverageEligibilityRequestTest.testEligibilityRequest(),
    showTestUI: () => CoverageEligibilityRequestTest.testInBrowser(),
    mapper: CoverageEligibilityRequestMapper,
    client: fhirClient
};

// Expose to window object
if (typeof window !== 'undefined') {
    window.CoverageEligibilityTest = CoverageEligibilityTest;
}

export default CoverageEligibilityTest; 