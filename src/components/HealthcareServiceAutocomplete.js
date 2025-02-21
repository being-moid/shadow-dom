import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { API_ENDPOINTS } from '../config/api.js';

@customElement('healthcare-service-autocomplete')
export class HealthcareServiceAutocomplete extends LitElement {
  static get properties() {
    return {
      selectedServices: { type: Array },
      searchResults: { type: Array },
      isLoading: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.selectedServices = [];
    this.searchResults = [];
    this.isLoading = false;
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      font-family: var(--sw-font-family, 'Inter', system-ui, -apple-system, sans-serif);
    }

    .healthcare-autocomplete {
      margin-bottom: 1.5rem;
    }

    .healthcare-search {
      position: relative;
      margin-bottom: 1rem;
    }

    .healthcare-search input {
      width: 100%;
      padding: 0.75rem 1rem;
      padding-right: 2.5rem;
      border: 2px solid var(--medical-primary, #3B82F6);
      border-radius: 0.5rem;
      font-size: 0.875rem;
      transition: all 0.2s;
    }

    .healthcare-search input:focus {
      outline: none;
      border-color: var(--primary-dark, #2563eb);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .healthcare-search svg {
      position: absolute;
      right: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      width: 1.25rem;
      height: 1.25rem;
      color: var(--medical-primary, #3B82F6);
    }

    .healthcare-results {
      background: white;
      border: 1px solid var(--gray-200, #E5E7EB);
      border-radius: 0.5rem;
      max-height: 15rem;
      overflow-y: auto;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .healthcare-result-item {
      padding: 0.75rem 1rem;
      cursor: pointer;
      border-bottom: 1px solid var(--gray-200, #E5E7EB);
      transition: all 0.2s;
    }

    .healthcare-result-item:hover {
      background: var(--healthcare-bg, #F3F4F6);
    }

    .healthcare-result-item h4 {
      margin: 0;
      color: var(--medical-primary, #3B82F6);
      font-weight: 600;
    }

    .healthcare-result-item p {
      margin: 0.25rem 0 0;
      font-size: 0.875rem;
      color: var(--gray-600, #4B5563);
    }

    .healthcare-badges {
      display: flex;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .healthcare-badge {
      padding: 0.25rem 0.5rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .badge-type {
      background: var(--healthcare-green, #10B981);
      color: white;
    }

    .badge-code {
      background: var(--medical-primary, #3B82F6);
      color: white;
    }

    .badge-price {
      background: var(--gray-100, #F3F4F6);
      color: var(--gray-700, #374151);
    }

    .healthcare-selected {
      margin-top: 1rem;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    thead {
      background: var(--medical-primary, #3B82F6);
      color: white;
    }

    th {
      padding: 0.75rem;
      text-align: left;
    }

    td {
      padding: 0.75rem;
      border-bottom: 1px solid var(--gray-200, #E5E7EB);
    }

    .loading-spinner {
      width: 1.5rem;
      height: 1.5rem;
      border: 2px solid var(--gray-200, #E5E7EB);
      border-top-color: var(--medical-primary, #3B82F6);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;

  debouncedSearch = this.debounce((searchTerm) => {
    this.searchServices(searchTerm);
  }, 300);

  debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  async searchServices(searchTerm) {
    if (searchTerm.length < 3) return;

    this.isLoading = true;
    try {
      const response = await fetch(`${API_ENDPOINTS.MasterPriceServiceDirectory.AutocompleteServices}?searchTerm=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) throw new Error('Failed to fetch services');
      
      const results = await response.json();
      this.searchResults = results;
    } catch (error) {
      console.error('Error searching services:', error);
      this.dispatchEvent(new CustomEvent('show-notification', {
        detail: { message: error.message, type: 'error' },
        bubbles: true,
        composed: true
      }));
    } finally {
      this.isLoading = false;
    }
  }

  toggleService(service) {
    const index = this.selectedServices.findIndex(s => s.id === service.id);
    if (index === -1) {
      this.selectedServices = [...this.selectedServices, service];
    } else {
      this.selectedServices = this.selectedServices.filter(s => s.id !== service.id);
    }

    this.dispatchEvent(new CustomEvent('service-update', {
      detail: { services: this.selectedServices },
      bubbles: true,
      composed: true
    }));
  }

  getServiceIcon(serviceTypeId) {
    const icons = {
      1: 'test-tube',
      2: 'scan',
      3: 'pill',
      // Add mappings for all service types
    };
    return icons[serviceTypeId] || 'stethoscope';
  }

  render() {
    return html`
      <div class="healthcare-autocomplete">
        <div class="healthcare-search">
          <input 
            type="text" 
            @input=${(e) => this.debouncedSearch(e.target.value)}
            placeholder="Search healthcare services..."
          />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        ${this.isLoading ? html`
          <div class="loading-spinner"></div>
        ` : this.searchResults.length > 0 ? html`
          <div class="healthcare-results">
            ${this.searchResults.map(service => html`
              <div class="healthcare-result-item" @click=${() => this.toggleService(service)}>
                <h4>${service.serviceName}</h4>
                <p>${service.description}</p>
                <div class="healthcare-badges">
                  <span class="healthcare-badge badge-type">${service.serviceTypeName}</span>
                  ${service.cptCode ? html`
                    <span class="healthcare-badge badge-code">CPT: ${service.cptCode}</span>
                  ` : ''}
                  <span class="healthcare-badge badge-price">
                    $${service.standardCharges?.toFixed(2)}
                  </span>
                </div>
              </div>
            `)}
          </div>
        ` : ''}

        ${this.selectedServices.length > 0 ? html`
          <div class="healthcare-selected">
            <table>
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${this.selectedServices.map(service => html`
                  <tr>
                    <td>
                      <div>
                        <div class="font-medium">${service.serviceName}</div>
                        <div class="text-sm text-gray-500">${service.serviceTypeName}</div>
                      </div>
                    </td>
                    <td>$${service.standardCharges?.toFixed(2)}</td>
                    <td>
                      <button @click=${() => this.toggleService(service)}
                        class="text-red-500 hover:text-red-700">
                        Remove
                      </button>
                    </td>
                  </tr>
                `)}
              </tbody>
            </table>
          </div>
        ` : ''}
      </div>
    `;
  }
} 