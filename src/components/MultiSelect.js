import { LitElement, html, css } from 'lit';

const componentStyles = css`
  :host {
    display: block;
  }
  
  .multi-select {
    position: relative;
    width: 100%;
  }
  
  .select-button {
    background-color: #E5E7EB;
    color: #374151;
    padding: 0.5rem 2rem 0.5rem 0.75rem;
    border-radius: 0.25rem;
    width: 100%;
    text-align: left;
    position: relative;
    cursor: pointer;
    border: 1px solid #D1D5DB;
  }
  
  .select-button:after {
    content: '';
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #374151;
  }
  
  .dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #D1D5DB;
    border-radius: 0.25rem;
    margin-top: 0.25rem;
    max-height: 200px;
    overflow-y: auto;
    z-index: 10;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    display: none;
  }
  
  .dropdown.show {
    display: block;
  }
  
  .option {
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .option:hover {
    background-color: #F3F4F6;
  }
  
  .option input[type="checkbox"] {
    margin: 0;
  }
  
  .placeholder {
    color: #6B7280;
  }
`;

export class MultiSelect extends LitElement {
  static get properties() {
    return {
      options: { type: Array },
      placeholder: { type: String },
      selected: { type: Array },
      isOpen: { type: Boolean },
      name: { type: String }
    };
  }

  static get styles() {
    return componentStyles;
  }

  constructor() {
    super();
    this.options = [];
    this.placeholder = 'Select items...';
    this.selected = [];
    this.isOpen = false;
    this.name = '';
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  handleOptionClick(option, e) {
    e.stopPropagation();
    const index = this.selected.indexOf(option);
    let newSelected;
    
    if (index === -1) {
      newSelected = [...this.selected, option];
    } else {
      newSelected = this.selected.filter(item => item !== option);
    }
    
    this.selected = newSelected;
    
    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        value: this.selected,
        name: this.name
      },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="multi-select">
        <button
          type="button"
          class="select-button"
          @click="${this.toggleDropdown}"
          aria-haspopup="listbox"
        >
          ${this.selected.length 
            ? this.selected.join(', ') 
            : html`<span class="placeholder">${this.placeholder}</span>`}
        </button>
        
        <div class="dropdown ${this.isOpen ? 'show' : ''}">
          ${this.options.map(option => html`
            <div class="option" @click="${(e) => this.handleOptionClick(option, e)}">
              <input
                type="checkbox"
                .checked="${this.selected.includes(option)}"
                @click="${(e) => e.stopPropagation()}"
                @change="${(e) => this.handleOptionClick(option, e)}"
              />
              <span>${option}</span>
            </div>
          `)}
        </div>
      </div>
    `;
  }
}

// Add check to prevent double registration
if (!customElements.get('multi-select')) {
  customElements.define('multi-select', MultiSelect);
} 