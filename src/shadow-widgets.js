import './components/FloatingButton.js';
import './components/ServiceTable.js';
import './components/Modal.js';
import './components/DataViewModal.js';
import './components/CoverageVerification.js';
import './components/PriorAuthClaimManagement.js';

// Create the ShadowWidgets API
const ShadowWidgets = {
  createFloatingButton(options) {
    const btn = document.createElement('floating-button');
    if (options.position) {
      btn.setAttribute('position', options.position);
    }
    if (typeof options.glowing !== 'undefined') {
      btn.glowing = options.glowing;
    }
    if (typeof options.disabled !== 'undefined') {
      btn.disabled = options.disabled;
    }
    if (options.type) {
      btn.type = options.type;
    }
    document.body.appendChild(btn);
    return btn;
  },

  createPlanModal(options) {
    const modal = document.createElement('plan-modal');
    if (options) {
      if (options.title) {
        modal.title = options.title;
      }
      if (typeof options.isOpen !== 'undefined') {
        modal.isOpen = options.isOpen;
      }
    }
    document.body.appendChild(modal);
    return modal;
  },

  createDataViewModal(options) {
    const modal = document.createElement('data-view-modal');
    if (options) {
      if (typeof options.isOpen !== 'undefined') {
        modal.isOpen = options.isOpen;
      }
      if (options.patientData) {
        modal.patientData = options.patientData;
      }
      if (options.insuranceData) {
        modal.insuranceData = options.insuranceData;
      }
    }
    document.body.appendChild(modal);
    return modal;
  },

  createModalWithFloatingButton(modalOptions, buttonOptions) {
    const modal = this.createPlanModal(modalOptions);
    const button = this.createFloatingButton(buttonOptions);
    // Wire the floating button to toggle the modal on click
    button.addEventListener('click', () => {
      if (!modal.isOpen) {
        modal.isOpen = true;
      } else {
        modal.close();
      }
    });
    return { modal, button };
  },

  createDataViewWithFloatingButton(modalOptions, buttonOptions) {
    const modal = this.createDataViewModal(modalOptions);
    const button = this.createFloatingButton(buttonOptions);
    button.addEventListener('click', () => {
      if (!modal.isOpen) {
        modal.isOpen = true;
      } else {
        modal.close();
      }
    });
    return { modal, button };
  },

  createCoverageVerificationWithButton(buttonOptions = {}) {
    // Create a container for the coverage verification popup
    const container = document.createElement('div');
    container.id = 'coverage-verification-container';
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: rgba(0, 0, 0, 0.5);
      display: none;
      z-index: 9998;
      overflow-y: auto;
      padding: 2rem;
      box-sizing: border-box;
      opacity: 0;
      transition: opacity 0.3s ease;
      justify-content: center;
      align-items: flex-start;
    `;
    
    // Create the coverage verification component
    const coverageVerification = document.createElement('coverage-verification');
    coverageVerification.style.cssText = `
      margin: 0 auto;
      width: 100%;
      max-width: 1200px;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
      position: relative;
      z-index: 9998;
    `;

    container.appendChild(coverageVerification);
    document.body.appendChild(container);

    // Create the floating button with specific text and icon
    const button = this.createFloatingButton({
      position: 'bottom-right',
      glowing: true,
      ...buttonOptions
    });

    const showPopup = () => {
      container.style.display = 'flex';
      // Force a reflow before adding opacity
      container.offsetHeight;
      container.style.opacity = '1';
      coverageVerification.style.opacity = '1';
      coverageVerification.style.transform = 'translateY(0)';
      document.body.style.overflow = 'hidden';
      
      // Dispatch event to switch to coverage tab and show patient search
      coverageVerification.dispatchEvent(new CustomEvent('switch-tab', {
        detail: { tab: 'coverage' }
      }));
    };

    // Wire up the button click to show the popup
    button.addEventListener('click', showPopup);

    const hidePopup = () => {
      container.style.opacity = '0';
      coverageVerification.style.opacity = '0';
      coverageVerification.style.transform = 'translateY(20px)';
      setTimeout(() => {
        container.style.display = 'none';
        document.body.style.overflow = '';
      }, 300);
    };

    // Add click handler to close on background click
    container.addEventListener('click', (e) => {
      if (e.target === container) {
        hidePopup();
      }
    });

    // Listen for the close event from the component
    coverageVerification.addEventListener('close', hidePopup);

    // Add escape key handler
    const handleEscape = (e) => {
      if (e.key === 'Escape' && container.style.display === 'flex') {
        hidePopup();
      }
    };

    document.addEventListener('keydown', handleEscape);

    // Cleanup function
    const cleanup = () => {
      document.removeEventListener('keydown', handleEscape);
      container.remove();
      button.remove();
    };

    return { container, button, coverageVerification, cleanup };
  },

  createPriorAuthClaimManagementWithButton(buttonOptions = {}) {
    // Create a container for the prior auth & claim management popup
    const container = document.createElement('div');
    container.id = 'prior-auth-claim-management-container';
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: rgba(0, 0, 0, 0.5);
      display: none;
      z-index: 9998;
      overflow-y: auto;
      padding: 2rem;
      box-sizing: border-box;
      opacity: 0;
      transition: opacity 0.3s ease;
      justify-content: center;
      align-items: flex-start;
    `;
    
    // Create the prior auth & claim management component
    const priorAuthClaimManagement = document.createElement('prior-auth-claim-management');
    priorAuthClaimManagement.style.cssText = `
      margin: 0 auto;
      width: 100%;
      max-width: 1200px;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
      position: relative;
      z-index: 9998;
    `;

    container.appendChild(priorAuthClaimManagement);
    document.body.appendChild(container);

    // Create the floating button
    const button = this.createFloatingButton({
      position: buttonOptions.position || 'bottom-right',
      glowing: buttonOptions.glowing !== undefined ? buttonOptions.glowing : true,
      type: 'prior-auth',
      ...buttonOptions,
      // Ensure type is not overridden by buttonOptions spread
      type: 'prior-auth'
    });

    const showPopup = () => {
      container.style.display = 'flex';
      requestAnimationFrame(() => {
        container.style.opacity = '1';
        priorAuthClaimManagement.style.opacity = '1';
        priorAuthClaimManagement.style.transform = 'translateY(0)';
      });
      document.body.style.overflow = 'hidden';
      
      // Dispatch event to switch to prior-auth tab
      priorAuthClaimManagement.dispatchEvent(new CustomEvent('switch-tab', {
        detail: { tab: 'prior-auth' }
      }));
    };

    button.addEventListener('click', showPopup);

    const hidePopup = () => {
      container.style.opacity = '0';
      priorAuthClaimManagement.style.opacity = '0';
      priorAuthClaimManagement.style.transform = 'translateY(20px)';
      setTimeout(() => {
        container.style.display = 'none';
        document.body.style.overflow = '';
      }, 300);
    };

    container.addEventListener('click', (e) => {
      if (e.target === container) {
        hidePopup();
      }
    });

    priorAuthClaimManagement.addEventListener('close', hidePopup);

    const handleEscape = (e) => {
      if (e.key === 'Escape' && container.style.display === 'flex') {
        hidePopup();
      }
    };

    document.addEventListener('keydown', handleEscape);

    const cleanup = () => {
      document.removeEventListener('keydown', handleEscape);
      container.remove();
      button.remove();
    };

    return { container, button, priorAuthClaimManagement, cleanup };
  }
};

// Make it available globally
window.ShadowWidgets = ShadowWidgets;

// Export as default and as a named export
export default ShadowWidgets;
export { ShadowWidgets };

// Ensure compatibility with CommonJS environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports.default = ShadowWidgets;
} 