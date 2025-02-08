import { LitElement, html, css } from 'lit';

const componentStyles = css`
  :host {
    position: fixed;
    z-index: 9998;
    display: block;
  }

  :host([position='bottom-right']) {
    bottom: 2rem;
    right: 2rem;
  }

  :host([position='bottom-left']) {
    bottom: 2rem;
    left: 2rem;
  }

  button {
    background: #463AA1;
    color: white;
    border: none;
    border-radius: 0.75rem;
    padding: 1rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: all 0.2s ease;
    min-width: 200px;
    white-space: nowrap;
    line-height: 1;
  }

  button:hover {
    background: #5B4FC7;
    transform: translateY(-1px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  button svg {
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
    stroke: currentColor;
    stroke-width: 2;
  }

  button span {
    white-space: nowrap;
    font-size: 0.875rem;
    letter-spacing: 0.025em;
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 5px rgba(70, 58, 161, 0.5), 0 0 10px rgba(70, 58, 161, 0.3);
    }
    50% {
      box-shadow: 0 0 15px rgba(70, 58, 161, 0.8), 0 0 20px rgba(70, 58, 161, 0.5);
    }
  }

  :host([glowing]) button {
    animation: glow 2s ease-in-out infinite;
  }

  :host([disabled]) button {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

export class FloatingButton extends LitElement {
  static get properties() {
    return {
      position: { type: String, reflect: true },
      glowing: { type: Boolean, reflect: true },
      disabled: { type: Boolean, reflect: true }
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
  }

  render() {
    return html`
      <button @click="${this._handleClick}">
        <slot></slot>
      </button>
    `;
  }

  _handleClick(e) {
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent('click', {
        bubbles: true,
        composed: true,
        detail: { originalEvent: e }
      }));
    }
  }
}

if (!customElements.get('floating-button')) {
  customElements.define('floating-button', FloatingButton);
} 