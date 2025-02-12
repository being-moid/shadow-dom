import { LitElement, html, css } from 'lit';
import './PriorAuthGrid.js';
import nphiesLogo from '../styles/nphies-logo-trans.png';

const componentStyles = css`
  :host {
    display: block;
    font-family: var(--sw-font-family, 'Inter', system-ui, -apple-system, sans-serif);
  }

  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    z-index: 9998;
    padding: 2rem;
    box-sizing: border-box;
    justify-content: center;
    align-items: flex-start;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .modal-backdrop.open {
    opacity: 1;
  }

  .modal-content {
    background: white;
    width: 100%;
    max-width: 1200px;
    height: calc(100vh - 4rem);
    border-radius: 0.75rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 9999;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
  }

  .modal-content.open {
    opacity: 1;
    transform: translateY(0);
  }

  .modal-header {
    background: #8500d8;
    color: white;
    padding: 1.5rem 2rem;
    display: flex;
    gap: 2rem;
    align-items: flex-start;
    position: relative;
  }

  .nphies-logo {
    width: 140px;
    height: auto;
    object-fit: contain;
  }

  .header-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
  }

  .modal-title {
    font-size: 24px;
    font-weight: 500;
    margin: 0;
    line-height: 1.2;
  }

  .close-button {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    cursor: pointer;
    padding: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.375rem;
    transition: all 0.2s ease;
  }

  .close-button:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  .close-button svg {
    width: 1.25rem;
    height: 1.25rem;
    stroke-width: 2.5;
  }

  .modal-body {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
    background: var(--sw-background-color, #f8fafc);
  }

  .modal-footer {
    padding: 1rem 2rem;
    background: white;
    border-top: 1px solid #E5E7EB;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .button {
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.875rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  .button-secondary {
    background: white;
    border: 1.5px solid #D1D5DB;
    color: #374151;
  }

  .button-secondary:hover {
    border-color: #9CA3AF;
    color: #111827;
    transform: translateY(-1px);
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(1rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-in {
    animation: slideIn 0.3s ease-out;
  }
`;

export class PriorAuthGridModal extends LitElement {
  static get properties() {
    return {
      isOpen: { type: Boolean },
      title: { type: String }
    };
  }

  static get styles() {
    return componentStyles;
  }

  constructor() {
    super();
    this.isOpen = false;
    this.title = 'Prior Authorization List';
  }

  handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      this.close();
    }
  }

  close() {
    const backdrop = this.shadowRoot.querySelector('.modal-backdrop');
    const content = this.shadowRoot.querySelector('.modal-content');
    
    backdrop.style.opacity = '0';
    content.style.opacity = '0';
    content.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      this.isOpen = false;
      this.dispatchEvent(new CustomEvent('close'));
      document.body.style.overflow = '';
    }, 300);
  }

  updated(changedProperties) {
    if (changedProperties.has('isOpen') && this.isOpen) {
      // Wait for elements to be rendered
      setTimeout(() => {
        const backdrop = this.shadowRoot.querySelector('.modal-backdrop');
        const content = this.shadowRoot.querySelector('.modal-content');
        
        // Force a reflow before adding the open class
        backdrop.offsetHeight;
        content.offsetHeight;
        
        backdrop.classList.add('open');
        content.classList.add('open');
        document.body.style.overflow = 'hidden';
      }, 0);
    }
  }

  render() {
    if (!this.isOpen) return null;

    return html`
      <div class="modal-backdrop" @click="${this.handleBackdropClick}">
        <div class="modal-content">
          <div class="modal-header">
            <img src="${nphiesLogo}" class="nphies-logo" alt="NPHIES">
            <div class="header-content">
              <h1 class="modal-title">${this.title}</h1>
            </div>
            <button class="close-button" @click="${this.close}">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          
          <div class="modal-body">
            <prior-auth-grid></prior-auth-grid>
          </div>
          
          <div class="modal-footer">
            <button class="button button-secondary" @click="${this.close}">Close</button>
          </div>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('prior-auth-grid-modal')) {
  customElements.define('prior-auth-grid-modal', PriorAuthGridModal);
}