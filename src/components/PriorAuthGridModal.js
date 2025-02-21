import { LitElement, html, css } from 'lit';
import './PriorAuthGrid.js';
import nphiesLogo from '../styles/nphies-logo-trans.png';

const componentStyles = css`
  :host {
    display: block;
    font-family: var(--sw-font-family, 'Inter', system-ui, -apple-system, sans-serif);
    --primary: #8500d8;
    --primary-dark: #6a00ad;
    --gray-50: #F9FAFB;
    --gray-100: #F3F4F6;
    --gray-200: #E5E7EB;
    --gray-300: #D1D5DB;
    --gray-400: #9CA3AF;
    --gray-500: #6B7280;
    --gray-600: #4B5563;
    --gray-700: #374151;
    --gray-800: #1F2937;
    --gray-900: #111827;
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
    background: var(--primary);
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

  .modal-tabs {
    display: flex;
    background: white;
    padding: 0;
    border-bottom: 1px solid var(--gray-200);
    gap: 0.5rem;
  }

  .modal-tab {
    padding: 1rem 2rem;
    color: var(--gray-600);
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.2s;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .modal-tab:hover {
    color: var(--primary);
    background: var(--gray-50);
  }

  .modal-tab.active {
    color: var(--primary);
    border-bottom-color: var(--primary);
    background: var(--gray-50);
  }

  .modal-tab-icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  .modal-body {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
    background: var(--gray-50);
  }

  .modal-footer {
    padding: 1rem 2rem;
    background: white;
    border-top: 1px solid var(--gray-200);
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
    border: 1.5px solid var(--gray-300);
    color: var(--gray-700);
  }

  .button-secondary:hover {
    border-color: var(--gray-400);
    color: var(--gray-900);
    transform: translateY(-1px);
  }

  .tab-content {
    display: none;
  }

  .tab-content.active {
    display: block;
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
      title: { type: String },
      activeTab: { type: String },
      selectedAuth: { type: Object }
    };
  }

  static get styles() {
    return componentStyles;
  }

  constructor() {
    super();
    this.isOpen = false;
    this.title = 'Prior Authorization List';
    this.activeTab = 'list';
    this.selectedAuth = null;
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
      this.activeTab = 'list';
      this.selectedAuth = null;
      this.dispatchEvent(new CustomEvent('close'));
      document.body.style.overflow = '';
    }, 300);
  }

  switchTab(tab, auth = null) {
    this.activeTab = tab;
    if (auth) {
      this.selectedAuth = auth;
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('isOpen') && this.isOpen) {
      setTimeout(() => {
        const backdrop = this.shadowRoot.querySelector('.modal-backdrop');
        const content = this.shadowRoot.querySelector('.modal-content');
        backdrop.offsetHeight;
        content.offsetHeight;
        backdrop.classList.add('open');
        content.classList.add('open');
        document.body.style.overflow = 'hidden';
      }, 0);
    }
  }

  handleViewClaim(auth) {
    this.switchTab('claim', auth);
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
          
          <div class="modal-tabs">
            <button 
              class="modal-tab ${this.activeTab === 'list' ? 'active' : ''}"
              @click="${() => this.switchTab('list')}">
              <svg class="modal-tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 6h16M4 10h16M4 14h16M4 18h16" stroke-width="2" stroke-linecap="round"/>
              </svg>
              Prior Authorizations
            </button>
            ${this.selectedAuth ? html`
              <button 
                class="modal-tab ${this.activeTab === 'claim' ? 'active' : ''}"
                @click="${() => this.switchTab('claim')}">
                <svg class="modal-tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 17h6m-6-4h6m-6-4h6M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Claim Details
              </button>
            ` : ''}
          </div>
          
          <div class="modal-body">
            <div class="tab-content ${this.activeTab === 'list' ? 'active' : ''}">
              <prior-auth-grid
                @view-claim="${(e) => this.handleViewClaim(e.detail)}"
              ></prior-auth-grid>
            </div>
            
            ${this.selectedAuth ? html`
              <div class="tab-content ${this.activeTab === 'claim' ? 'active' : ''}">
                <prior-auth-grid
                  .selectedClaimView="${this.selectedAuth}"
                ></prior-auth-grid>
              </div>
            ` : ''}
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