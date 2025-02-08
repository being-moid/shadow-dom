import './components/FloatingButton.js';
import './components/ServiceTable.js';
import './components/Modal.js';
import './components/DataViewModal.js';

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