// Import WebComponents polyfill for broader browser support
import '@webcomponents/webcomponentsjs/webcomponents-bundle.js';

// Import our components
import './components/FormInput.js';
import './components/MultiSelect.js';
import './components/ServiceTable.js';
import './components/Modal.js';
import './components/FloatingButton.js';
import './components/CoverageVerification.js';
import './components/PriorAuthGridButton.js';
import './components/PriorAuthGridModal.js';
import './components/PriorAuthGrid.js';
import './components/prior-auth-form/PriorAuthFormWidget.js';

// Import test utilities and FHIR services
import { CoverageEligibilityRequestTest } from './services/CoverageEligibilityRequestTest';
import { CoverageEligibilityRequestMapper } from './services/CoverageEligblityRequestService';
import fhirClient from './services/FhirClient';

// Import and export ShadowWidgets API
import { ShadowWidgets } from './shadow-widgets.js';

// Initialize all widgets with different positions
const coverageVerification = ShadowWidgets.createCoverageVerificationWithButton({
    glowing: true
});

const priorAuthWidget = ShadowWidgets.createPriorAuthClaimManagementWithButton({
    glowing: true
});

const priorAuthGridWidget = ShadowWidgets.createPriorAuthGridWithButton({
    glowing: true
});

// Initialize test functionality
const CoverageEligibilityTest = {
    getDummyData: () => CoverageEligibilityRequestTest.getDummyFormData(),
    test: () => CoverageEligibilityRequestTest.testEligibilityRequest(),
    showTestUI: () => CoverageEligibilityRequestTest.testInBrowser(),
    mapper: CoverageEligibilityRequestMapper,
    client: fhirClient
};

// Expose to window object
window.CoverageEligibilityTest = CoverageEligibilityTest;

// Export helpers and widgets
export { ShadowWidgets, CoverageEligibilityTest };

// Import Tailwind styles
import './styles/tailwind.css'; 