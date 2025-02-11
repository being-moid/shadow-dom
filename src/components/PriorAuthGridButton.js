import { LitElement, html, css } from 'lit';
import './PriorAuthGridModal.js';

const componentStyles = css`
  :host {
    display: block;
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 1000;
  }

  button {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 9999px;
    background: #8500d8;
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }

  button:hover {
    transform: scale(1.1);
    background: #6a00ad;
  }

  button:disabled {
    background: #9CA3AF;
    cursor: not-allowed;
    transform: none;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export class PriorAuthGridButton extends LitElement {
  static get properties() {
    return {
      disabled: { type: Boolean, reflect: true }
    };
  }

  static get styles() {
    return componentStyles;
  }

  constructor() {
    super();
    this.disabled = false;
  }

  firstUpdated() {
    this.modal = document.createElement('prior-auth-grid-modal');
    document.body.appendChild(this.modal);
  }

  _handleClick() {
    if (!this.disabled) {
      this.modal.isOpen = true;
    }
  }

  render() {
    return html`
      <button @click="${this._handleClick}" ?disabled="${this.disabled}">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </button>
    `;
  }
}

if (!customElements.get('prior-auth-grid-button')) {
  customElements.define('prior-auth-grid-button', PriorAuthGridButton);
} 