import './components/FloatingButton.js';
import './components/ServiceTable.js';
import './components/Modal.js';
import './components/DataViewModal.js';
import './components/CoverageVerification.js';
import './components/PriorAuthClaimManagement.js';

const modalContentStyles = `
  flex: 1;
  overflow-y: auto;
  padding: 0 2rem;
`;

const modalActionStyles = `
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem 2rem;
  background: white;
  border-top: 1px solid #E5E7EB;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 10;
  width: 100%;
  box-sizing: border-box;
`;

const modalWrapperStyles = `
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

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

  createCoverageVerificationWithButton(options = {}) {
    const btn = this.createFloatingButton({
      ...options,
      position: 'bottom-right-1',
      type: 'coverage'
    });

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
      padding: 2rem;
      box-sizing: border-box;
      opacity: 0;
      transition: opacity 0.3s ease;
      justify-content: center;
      align-items: flex-start;
    `;
    
    const coverageVerification = document.createElement('coverage-verification');
    coverageVerification.style.cssText = `
      margin: 0 auto;
      width: 100%;
      max-width: 1200px;
      height: calc(100vh - 4rem);
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
      position: relative;
      z-index: 9998;
      background: white;
      border-radius: 0.75rem;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    `;

    // Create a wrapper for the entire modal content
    const modalWrapper = document.createElement('div');
    modalWrapper.style.cssText = modalWrapperStyles;

    // Add styles to the content wrapper
    const contentWrapper = document.createElement('div');
    contentWrapper.style.cssText = modalContentStyles;
    
    // Move the content into the wrapper
    while (coverageVerification.firstChild) {
      contentWrapper.appendChild(coverageVerification.firstChild);
    }

    // Add the action buttons container
    const actionContainer = document.createElement('div');
    actionContainer.style.cssText = modalActionStyles;

    // Assemble the modal structure
    modalWrapper.appendChild(contentWrapper);
    modalWrapper.appendChild(actionContainer);
    coverageVerification.appendChild(modalWrapper);
    container.appendChild(coverageVerification);
    document.body.appendChild(container);

    const showPopup = () => {
      container.style.display = 'flex';
      // Force a reflow before adding opacity
      container.offsetHeight;
      container.style.opacity = '1';
      coverageVerification.style.opacity = '1';
      coverageVerification.style.transform = 'translateY(0)';
      document.body.style.overflow = 'hidden';
    };

    // Wire up the button click to show the popup
    btn.addEventListener('click', showPopup);

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
      btn.remove();
    };

    return { container, btn, coverageVerification, cleanup };
  },

  createPriorAuthClaimManagementWithButton(options = {}) {
    const btn = this.createFloatingButton({
      ...options,
      position: 'bottom-right-2',
      type: 'prior-auth'
    });

    const container = document.createElement('div');
    container.id = 'prior-auth-container';
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: rgba(0, 0, 0, 0.5);
      display: none;
      z-index: 9998;
      padding: 2rem;
      box-sizing: border-box;
      opacity: 0;
      transition: opacity 0.3s ease;
      justify-content: center;
      align-items: flex-start;
    `;
    
    const priorAuthClaimManagement = document.createElement('prior-auth-claim-management');
    priorAuthClaimManagement.style.cssText = `
      margin: 0 auto;
      width: 100%;
      max-width: 1200px;
      height: calc(100vh - 4rem);
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
      position: relative;
      z-index: 9998;
      background: white;
      border-radius: 0.75rem;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    `;

    // Create a wrapper for the entire modal content
    const modalWrapper = document.createElement('div');
    modalWrapper.style.cssText = modalWrapperStyles;

    // Add styles to the content wrapper
    const contentWrapper = document.createElement('div');
    contentWrapper.style.cssText = modalContentStyles;
    
    // Move the content into the wrapper
    while (priorAuthClaimManagement.firstChild) {
      contentWrapper.appendChild(priorAuthClaimManagement.firstChild);
    }

    // Add the action buttons container
    const actionContainer = document.createElement('div');
    actionContainer.style.cssText = modalActionStyles;

    // Assemble the modal structure
    modalWrapper.appendChild(contentWrapper);
    modalWrapper.appendChild(actionContainer);
    priorAuthClaimManagement.appendChild(modalWrapper);
    container.appendChild(priorAuthClaimManagement);
    document.body.appendChild(container);

    const showPopup = () => {
      container.style.display = 'flex';
      requestAnimationFrame(() => {
        container.style.opacity = '1';
        priorAuthClaimManagement.style.opacity = '1';
        priorAuthClaimManagement.style.transform = 'translateY(0)';
      });
      document.body.style.overflow = 'hidden';
    };

    btn.addEventListener('click', showPopup);

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
      btn.remove();
    };

    return { container, btn, priorAuthClaimManagement, cleanup };
  },

  createPriorAuthGridWithButton(options = {}) {
    const btn = this.createFloatingButton({
      ...options,
      position: 'bottom-right-3',
      type: 'prior-auth-grid'
    });

    const modal = document.createElement('prior-auth-grid-modal');
    document.body.appendChild(modal);

    // Wire up the button click to show the modal
    btn.addEventListener('click', () => {
      modal.isOpen = true;
    });

    // Cleanup function
    const cleanup = () => {
      modal.remove();
      btn.remove();
    };

    return { modal, btn, cleanup };
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