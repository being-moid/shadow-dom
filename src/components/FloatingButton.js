import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const componentStyles = css`
  :host {
    display: block;
    position: fixed;
    z-index: 9999;
  }

  :host([position="left"]) {
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
  }

  :host([position="right"]) {
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }

  :host([position="top"]) {
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
  }

  :host([position="bottom"]) {
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
  }

  .floating-button {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    transition: all 0.3s ease;
    position: relative;
  }

  .floating-button:hover {
    transform: scale(1.1);
  }

  .floating-button.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #E5E7EB;
  }

  .floating-button.glowing {
    animation: glow 2s infinite;
  }

  .floating-button.glowing:hover {
    animation: none;
    box-shadow: 0 0 15px #4F46E5;
  }

  @keyframes glow {
    0% {
      box-shadow: 0 0 5px #4F46E5;
    }
    50% {
      box-shadow: 0 0 20px #4F46E5;
    }
    100% {
      box-shadow: 0 0 5px #4F46E5;
    }
  }

  svg {
    width: 24px;
    height: 24px;
    stroke: #4F46E5;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
  }

  .disabled svg {
    stroke: #6B7280;
  }
`;

export class FloatingButton extends LitElement {
  static get properties() {
    return {
      disabled: { type: Boolean },
      glowing: { type: Boolean },
      position: { type: String, reflect: true }
    };
  }

  static get styles() {
    return componentStyles;
  }

  constructor() {
    super();
    this.disabled = false;
    this.glowing = false;
    this.position = 'left';
  }

  handleClick() {
    if (this.disabled) return;
    
    this.dispatchEvent(new CustomEvent('click', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const buttonClasses = [
      'floating-button',
      this.disabled ? 'disabled' : '',
      this.glowing ? 'glowing' : ''
    ].filter(Boolean).join(' ');

    return html`
      <button 
        class="${buttonClasses}"
        @click="${this.handleClick}"
        title="${this.disabled ? 'Currently unavailable' : 'Open Plan Details'}"
      >
        ${unsafeHTML('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>')}
      </button>
    `;
  }
}

// Prevent double registration
if (!customElements.get('floating-button')) {
  customElements.define('floating-button', FloatingButton);
} 