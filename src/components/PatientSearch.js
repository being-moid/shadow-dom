import { LitElement, html, css, unsafeCSS } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import searchIcon from '../styles/search.svg';

const componentStyles = css`
  :host {
    display: block;
    position: relative;
  }

  .search-container {
    position: relative;
    width: 100%;
  }

  .search-input {
    width: 100%;
    padding: 1.25rem 1rem 1.25rem 3rem;
    border: 1px solid #E5E7EB;
    border-radius: 0.5rem;
    background: white;
    font-size: 1rem;
    color: #1F2937;
    background-image: url('${unsafeCSS(searchIcon)}');
    background-repeat: no-repeat;
    background-position: 1rem center;
    background-size: 1.25rem;
    transition: all 0.2s ease;
  }

  .search-input:focus {
    outline: none;
    border-color: #463AA1;
    box-shadow: 0 0 0 3px rgba(70, 58, 161, 0.1);
  }

  .search-input::placeholder {
    color: #9CA3AF;
  }

  .dropdown {
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    z-index: 100;
    max-height: 16rem;
    overflow-y: auto;
    width: 100%;
  }

  .search-result {
    padding: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .search-result:not(:last-child) {
    border-bottom: 1px solid #F3F4F6;
  }

  .search-result:first-child {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  .search-result:last-child {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }

  .search-result:hover {
    background-color: #F9FAFB;
  }

  .result-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .result-title {
    font-weight: 600;
    color: #111827;
    font-size: 0.875rem;
    text-transform: uppercase;
  }

  .result-subtitle {
    font-size: 0.75rem;
    color: #6B7280;
  }

  .result-id {
    font-size: 0.875rem;
    color: #6B7280;
    font-weight: 500;
  }
`;

export class PatientSearch extends LitElement {
  static get properties() {
    return {
      value: { type: String },
      results: { type: Array },
      isOpen: { type: Boolean }
    };
  }

  static get styles() {
    return componentStyles;
  }

  constructor() {
    super();
    this.value = '';
    this.results = [];
    this.isOpen = false;
  }

  handleInput(e) {
    this.value = e.target.value;
    // Mock search results - replace with actual API call
    if (this.value) {
      this.results = [
        {
          mrn: '36616',
          name: 'WALEED AL RASHED',
          nationalId: '200000000009',
          mobile: '966561922084'
        }
      ];
      this.isOpen = true;
    } else {
      this.results = [];
      this.isOpen = false;
    }
  }

  handleSelect(patient) {
    this.dispatchEvent(new CustomEvent('patient-selected', {
      detail: patient,
      bubbles: true,
      composed: true
    }));
    this.value = patient.name;
    this.isOpen = false;
  }

  render() {
    return html`
      <div class="search-container">
        <input
          type="text"
          class="search-input"
          placeholder="Search Patient using MRN#, ID/IQAMA, PASSPORT#"
          .value="${this.value}"
          @input="${this.handleInput}"
        >
        ${this.isOpen && this.results.length ? html`
          <div class="dropdown">
            ${this.results.map(patient => html`
              <div class="search-result" @click="${() => this.handleSelect(patient)}">
                <div class="result-info">
                  <span class="result-title">${patient.name}</span>
                  <span class="result-subtitle">MRN: ${patient.mrn}</span>
                </div>
                <span class="result-id">ID: ${patient.nationalId}</span>
              </div>
            `)}
          </div>
        ` : null}
      </div>
    `;
  }
}

if (!customElements.get('patient-search')) {
  customElements.define('patient-search', PatientSearch);
} 