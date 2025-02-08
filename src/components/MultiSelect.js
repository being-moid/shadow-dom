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
    width: 100%;
    padding: 0.75rem;
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 0.5rem;
    text-align: left;
    color: #374151;
    font-size: 0.875rem;
    cursor: pointer;
    position: relative;
    min-height: 42px;
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
    border: 1px solid #E5E7EB;
    border-radius: 0.5rem;
    margin-top: 0.25rem;
    z-index: 10;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    display: none;
  }
  
  .dropdown.show {
    display: block;
  }
  
  .search-input {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-bottom: 1px solid #E5E7EB;
    font-size: 0.875rem;
  }
  
  .search-input:focus {
    outline: none;
    border-bottom-color: #463AA1;
  }

  .options-container {
    max-height: 400px; /* Set a reasonable max height */
    overflow-y: auto;
  }
  
  .option {
    padding: 0.75rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-bottom: 1px solid #F3F4F6;
  }
  
  .option:last-child {
    border-bottom: none;
  }
  
  .option:hover {
    background-color: #F3F4F6;
  }
  
  .option input[type="checkbox"] {
    margin: 0;
    width: 16px;
    height: 16px;
    border-radius: 4px;
    border: 2px solid #D1D5DB;
  }
  
  .option input[type="checkbox"]:checked {
    background-color: #463AA1;
    border-color: #463AA1;
  }
  
  .no-results {
    padding: 0.75rem;
    color: #6B7280;
    font-size: 0.875rem;
    text-align: center;
  }
  
  .placeholder {
    color: #9CA3AF;
  }
`;

export class MultiSelect extends LitElement {
  static get properties() {
    return {
      options: { type: Array },
      placeholder: { type: String },
      selected: { type: Array },
      isOpen: { type: Boolean },
      name: { type: String },
      searchText: { type: String }
    };
  }

  static get styles() {
    return css`
      ${componentStyles}
      
      .search-input {
        width: 100%;
        padding: 0.5rem;
        border: none;
        border-bottom: 1px solid #E5E7EB;
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
      }

      .search-input:focus {
        outline: none;
        border-bottom-color: #463AA1;
      }

      .no-results {
        padding: 0.5rem 0.75rem;
        color: #6B7280;
        font-size: 0.875rem;
      }
    `;
  }

  constructor() {
    super();
    this.options = [];
    this.placeholder = 'Select items...';
    this.selected = [];
    this.isOpen = false;
    this.name = '';
    this.searchText = '';
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  handleOptionClick(value, e) {
    e.stopPropagation();
    const index = this.selected.indexOf(value);
    let newSelected;
    
    if (index === -1) {
      newSelected = [...this.selected, value];
    } else {
      newSelected = this.selected.filter(item => item !== value);
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

  handleSearch(e) {
    this.searchText = e.target.value.toLowerCase();
    this.requestUpdate();
  }

  render() {
    const filteredOptions = this.options.filter(option => 
      option.label.toLowerCase().includes(this.searchText?.toLowerCase() || '')
    );

    return html`
      <div class="multi-select">
        <button
          type="button"
          class="select-button"
          @click="${this.toggleDropdown}"
          aria-haspopup="listbox"
        >
          ${this.selected.length 
            ? this.selected.map(value => 
                this.options.find(opt => opt.value === value)?.label
              ).join(', ')
            : html`<span class="placeholder">${this.placeholder}</span>`}
        </button>
        
        <div class="dropdown ${this.isOpen ? 'show' : ''}">
          <input
            type="text"
            class="search-input"
            placeholder="Search..."
            @input="${this.handleSearch}"
            @click="${e => e.stopPropagation()}"
            .value="${this.searchText || ''}"
          />
          
          <div class="options-container">
            ${filteredOptions.length ? filteredOptions.map(option => html`
              <div class="option" @click="${(e) => this.handleOptionClick(option.value, e)}">
                <input
                  type="checkbox"
                  .checked="${this.selected.includes(option.value)}"
                  @click="${(e) => e.stopPropagation()}"
                  @change="${(e) => this.handleOptionClick(option.value, e)}"
                />
                <span>${option.label}</span>
              </div>
            `) : html`
              <div class="no-results">No services found</div>
            `}
          </div>
        </div>
      </div>
    `;
  }
}

// Add check to prevent double registration
if (!customElements.get('multi-select')) {
  customElements.define('multi-select', MultiSelect);
} 