import { LitElement, html, css } from 'lit';

// Define the styles that we need from Tailwind
const componentStyles = css`
  :host {
    display: block;
  }
  
  .mb-4 {
    margin-bottom: 1rem;
  }
  
  .block {
    display: block;
  }
  
  .text-gray-700 {
    color: rgb(55, 65, 81);
  }
  
  .text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
  
  .font-bold {
    font-weight: 700;
  }
  
  .mb-2 {
    margin-bottom: 0.5rem;
  }
  
  .shadow {
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  }
  
  .appearance-none {
    appearance: none;
  }
  
  .border {
    border-width: 1px;
    border-style: solid;
    border-color: rgb(229, 231, 235);
  }
  
  .rounded {
    border-radius: 0.25rem;
  }
  
  .w-full {
    width: 100%;
  }
  
  .py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  
  .px-3 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
  
  .leading-tight {
    line-height: 1.25;
  }
  
  .focus\\:outline-none:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
  
  .focus\\:shadow-outline:focus {
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }
`;

export class FormInput extends LitElement {
  static get properties() {
    return {
      label: { type: String },
      type: { type: String },
      value: { type: String },
      name: { type: String },
      placeholder: { type: String },
      required: { type: Boolean }
    };
  }

  static get styles() {
    return componentStyles;
  }

  constructor() {
    super();
    this.type = 'text';
    this.value = '';
    this.label = '';
    this.placeholder = '';
    this.required = false;
  }

  render() {
    return html`
      <div class="mb-4">
        ${this.label 
          ? html`<label class="block text-gray-700 text-sm font-bold mb-2">
                  ${this.label}
                </label>` 
          : null}
        <input
          type="${this.type}"
          .value="${this.value}"
          name="${this.name}"
          placeholder="${this.placeholder}"
          ?required="${this.required}"
          @input="${this._handleInput}"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    `;
  }

  _handleInput(e) {
    this.value = e.target.value;
    this.dispatchEvent(new CustomEvent('input', {
      detail: {
        value: this.value,
        name: this.name
      },
      bubbles: true,
      composed: true
    }));
  }
}

// Add check to prevent double registration
if (!customElements.get('form-input')) {
  customElements.define('form-input', FormInput);
} 