// Import WebComponents polyfill for broader browser support
import '@webcomponents/webcomponentsjs/webcomponents-bundle.js';

// Import our components
import './components/FormInput.js';
import './components/MultiSelect.js';
import './components/ServiceTable.js';
import './components/Modal.js';
import './components/FloatingButton.js';
import './components/CoverageVerification.js';

// Import and export helpers
export { createPlanModal, createFloatingButton, createPlanWidget } from './helpers.js';

// Import Tailwind styles
import './styles/tailwind.css'; 