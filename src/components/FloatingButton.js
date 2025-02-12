import { LitElement, html, css } from 'lit';

const componentStyles = css`
  :host {
    display: block;
    position: fixed;
    z-index: 1000;
  }

  :host([position="bottom-right-1"]) {
    bottom: 2rem;
    right: 2rem;
  }

  :host([position="bottom-right-2"]) {
    bottom: 6rem;
    right: 2rem;
  }

  :host([position="bottom-right-3"]) {
    bottom: 10rem;
    right: 2rem;
  }

  :host([position="bottom-left-1"]) {
    bottom: 2rem;
    left: 2rem;
  }

  :host([position="bottom-left-2"]) {
    bottom: 6rem;
    left: 2rem;
  }

  :host([position="bottom-left-3"]) {
    bottom: 10rem;
    left: 2rem;
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

export class FloatingButton extends LitElement {
  static get properties() {
    return {
      position: { type: String, reflect: true },
      glowing: { type: Boolean, reflect: true },
      disabled: { type: Boolean, reflect: true },
      type: { type: String, reflect: true }
    };
  }

  static get styles() {
    return componentStyles;
  }

  constructor() {
    super();
    this.position = 'bottom-right';
    this.glowing = false;
    this.disabled = false;
    this.type = 'coverage'; // default type
  }

  render() {
    return html`
      <button @click="${this._handleClick}">
        ${this.type === 'prior-auth' ? html`
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ` : html`
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        `}
      </button>
    `;
  }

  _handleClick(e) {
    if (!this.disabled) {
      console.log(`${this.type === 'coverage' ? 'Coverage' : 'Prior Auth'} button clicked`);
      this.dispatchEvent(new CustomEvent('click', {
        bubbles: true,
        composed: true,
        detail: { originalEvent: e, type: this.type }
      }));
    }
  }
}

if (!customElements.get('floating-button')) {
  customElements.define('floating-button', FloatingButton);
} 