import './components/FloatingButton.js';

export function createPlanModal(options = {}) {
  const modal = document.createElement('plan-modal');
  modal.id = options.id || 'planModal';
  modal.title = options.title || 'Plan Details';
  
  document.body.appendChild(modal);
  
  return {
    modal,
    open: () => {
      modal.isOpen = true;
    },
    close: () => {
      modal.isOpen = false;
    },
    onSave: (callback) => {
      modal.addEventListener('save', (e) => {
        callback(e.detail);
      });
    },
    onClose: (callback) => {
      modal.addEventListener('close', callback);
    },
    destroy: () => {
      document.body.removeChild(modal);
    }
  };
}

export function createFloatingButton(options = {}) {
  const button = document.createElement('floating-button');
  button.disabled = options.disabled || false;
  button.glowing = options.glowing || false;
  button.position = options.position || 'left';
  
  document.body.appendChild(button);
  
  return {
    button,
    setDisabled: (disabled) => {
      button.disabled = disabled;
    },
    setGlowing: (glowing) => {
      button.glowing = glowing;
    },
    setPosition: (position) => {
      button.position = position;
    },
    onClick: (callback) => {
      button.addEventListener('click', callback);
    },
    destroy: () => {
      document.body.removeChild(button);
    }
  };
}

export function createPlanWidget(options = {}) {
  const modal = createPlanModal(options);
  const button = createFloatingButton(options);
  
  button.onClick(() => {
    if (!button.button.disabled) {
      modal.open();
    }
  });
  
  return {
    modal,
    button,
    destroy: () => {
      modal.destroy();
      button.destroy();
    }
  };
} 