import { LitElement, html, css } from 'lit';
import servicesData from '../../data/services.json';

export class PriorAuthVerification extends LitElement {
  static get properties() {
    return {
      activeTab: { type: String },
      patientData: { type: Object },
      serviceData: { type: Object },
      availableServices: { type: Array },
      selectedServices: { type: Array },
      serviceTypes: { type: Array },
      selectedServiceType: { type: Object }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        background: white;
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }

      .wrapper {
        max-height: calc(100vh - 4rem);
        overflow-y: auto;
      }

      .header {
        background: #463AA1;
        color: white;
        padding: 1rem 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: sticky;
        top: 0;
        z-index: 1;
      }

      .close-button {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .close-button svg {
        width: 1.5rem;
        height: 1.5rem;
      }

      .tabs {
        display: flex;
        background: #F3F4F6;
        padding: 0.5rem 1rem;
        gap: 0.5rem;
        border-bottom: 1px solid #E5E7EB;
        overflow-x: auto;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE and Edge */
        white-space: nowrap;
      }

      .tabs::-webkit-scrollbar {
        display: none; /* Chrome, Safari and Opera */
      }

      .tab {
        padding: 0.75rem 1rem;
        cursor: pointer;
        font-weight: 500;
        color: #6B7280;
        border-bottom: 2px solid transparent;
        white-space: nowrap;
        font-size: 0.875rem;
        transition: all 0.2s ease;
      }

      .tab:hover {
        color: #463AA1;
      }

      .tab.active {
        color: #463AA1;
        border-bottom-color: #463AA1;
        font-weight: 600;
      }

      .content {
        padding: 1.5rem;
      }

      .section-card {
        background: white;
        border: 1px solid #E5E7EB;
        border-radius: 0.5rem;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        transition: all 0.3s ease;
      }

      .section-card:hover {
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
      }

      .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
      }

      .section-title {
        font-size: 1.125rem;
        font-weight: 600;
        color: #111827;
      }

      .section-subtitle {
        color: #6B7280;
        font-size: 0.875rem;
        margin-top: 0.25rem;
      }

      .section-content {
        color: #374151;
      }

      .section-icon {
        width: 2rem;
        height: 2rem;
        color: #463AA1;
      }

      .service-selection {
        margin-top: 1rem;
      }

      .service-dropdown {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #E5E7EB;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        font-size: 0.875rem;
        color: #374151;
      }

      .services-table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        margin-top: 1rem;
        border: 1px solid #E5E7EB;
        border-radius: 0.5rem;
        overflow: hidden;
      }

      .services-table th {
        text-align: left;
        padding: 0.75rem;
        background: #F9FAFB;
        font-size: 0.75rem;
        font-weight: 600;
        color: #6B7280;
        text-transform: uppercase;
        border-bottom: 1px solid #E5E7EB;
      }

      .services-table td {
        padding: 0.75rem;
        border-bottom: 1px solid #E5E7EB;
        font-size: 0.875rem;
        color: #374151;
        background: white;
      }

      .services-table tr:last-child td {
        border-bottom: none;
      }

      .remove-btn {
        padding: 0.375rem 0.75rem;
        background: #EF4444;
        color: white;
        border: none;
        border-radius: 0.375rem;
        cursor: pointer;
        font-size: 0.75rem;
        transition: all 0.2s ease;
      }

      .remove-btn:hover {
        background: #DC2626;
      }

      .description-cell {
        max-width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .services-table th,
      .services-table td {
        padding: 0.75rem;
        text-align: left;
        white-space: nowrap;
      }

      .type-cell {
        color: #6B7280;
        font-size: 0.875rem;
        background: #F3F4F6;
        padding: 0.25rem 0.5rem !important;
        border-radius: 0.25rem;
        display: inline-block;
      }

      .selection-group {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 1rem;
      }

      .service-type-dropdown {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #E5E7EB;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        color: #374151;
        background: white;
      }

      .service-type-dropdown:focus {
        outline: none;
        border-color: #463AA1;
        ring: 2px solid rgba(70, 58, 161, 0.1);
      }
    `;
  }

  constructor() {
    super();
    this.activeTab = 'payerLicense';
    this.patientData = null;
    this.serviceData = null;
    this.availableServices = [];
    this.selectedServices = [];
    this.serviceTypes = [];
    this.selectedServiceType = null;
    this.fetchServiceTypes();
    this.tabs = [
      { id: 'payerLicense', label: 'Payer Information' },
      { id: 'practitionerLicense', label: 'Practitioner Information' },
      { id: 'patient', label: 'Patient' },
      { id: 'encounter', label: 'Visit' },
      { id: 'coverage', label: 'Coverage' },
      { id: 'diagnoses', label: 'Diagnoses' },
      { id: 'procedures', label: 'Services' },
      { id: 'supportingInformation', label: 'Supporting Information' },
      { id: 'communication', label: 'Communication' }
    ];
  }

  async fetchServiceTypes() {
    try {
      const response = await fetch('https://bf4d-110-38-247-43.ngrok-free.app/api/listofvaluesservicetype/getpagedasync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sort: "sequenceNo",
          page: 1,
          pageSize: 58
        })
      });
      const data = await response.json();
      if (data?.dynamicResult) {
        this.serviceTypes = data.dynamicResult;
      } else {
        this.serviceTypes = [];
      }
      this.requestUpdate();
    } catch (error) {
      console.error('Error fetching service types:', error);
      this.serviceTypes = [];
      this.requestUpdate();
    }
  }

  async fetchServices(serviceTypeId) {
    try {
      const filters = `ServiceTypeID==${serviceTypeId},AND ServiceName_=CPT`;

      const response = await fetch('https://bf4d-110-38-247-43.ngrok-free.app/api/mpdirservicedirectory/getpagedasync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          filters: filters,
          sort: "-ServiceName",
          page: 1,
          pageSize: 58
        })
      });
      const data = await response.json();
      if (data?.dynamicResult) {
        this.availableServices = data.dynamicResult;
      } else {
        this.availableServices = [];
      }
      this.requestUpdate();
    } catch (error) {
      console.error('Error fetching services:', error);
      this.availableServices = [];
      this.requestUpdate();
    }
  }

  handleClose() {
    this.dispatchEvent(new CustomEvent('close'));
  }

  switchTab(tab) {
    this.activeTab = tab;
  }

  calculateTotalPricing(service) {
    return (service.vipCharges || 0) + (service.standardCharges || 0) + (service.creditCharges || 0);
  }

  handleServiceAdd(e) {
    const selectedValues = e.detail.value;
    
    // Convert selected values to services
    const newServices = selectedValues
      .map(value => this.availableServices.find(service => service.id === value))
      .filter(service => service && !this.selectedServices.some(s => s.id === service.id));

    this.selectedServices = [...this.selectedServices, ...newServices];
  }

  handleServiceRemove(serviceId) {
    this.selectedServices = this.selectedServices.filter(s => s.id !== serviceId);
    
    // Find the multi-select component and update its selected values
    const multiSelect = this.shadowRoot.querySelector('multi-select');
    if (multiSelect) {
      multiSelect.selected = multiSelect.selected.filter(id => id !== serviceId);
    }
  }

  getServiceTypeName(serviceTypeId) {
    if (!Array.isArray(this.serviceTypes)) return 'N/A';
    const serviceType = this.serviceTypes.find(type => type?.id === serviceTypeId);
    return serviceType?.typeName || 'N/A';
  }

  handleServiceTypeChange(e) {
    const selectedId = Number(e.target.value);
    const selectedType = this.serviceTypes.find(type => type.id === selectedId);
    this.selectedServiceType = selectedType;
    
    if (selectedType) {
      this.fetchServices(selectedType.id);
    } else {
      this.availableServices = [];
    }
    
    this.requestUpdate();
  }

  renderTabContent(tab) {
    const contentMap = {
      payerLicense: {
        title: 'Payer Information',
        subtitle: 'Insurance provider details',
        icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
      },
      practitionerLicense: {
        title: 'Practitioner Information',
        subtitle: 'Healthcare provider details',
        icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
      },
      patient: {
        title: 'Patient Information',
        subtitle: 'Patient demographics and details',
        icon: 'M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
      },
      encounter: {
        title: 'Visit Details',
        subtitle: 'Visit information and type',
        icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
      },
      coverage: {
        title: 'Coverage Information',
        subtitle: 'Insurance and benefit details',
        icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
      },
      diagnoses: {
        title: 'Diagnoses',
        subtitle: 'Clinical conditions and diagnoses',
        icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
      },
      procedures: {
        title: 'Services',
        subtitle: 'Select medical services and procedures',
        icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
        content: html`
          <div class="service-selection">
            <div class="selection-group">
              <select 
                class="service-type-dropdown"
                @change=${this.handleServiceTypeChange}
              >
                <option value="">Select Service Type</option>
                ${Array.isArray(this.serviceTypes) && this.serviceTypes
                  .filter(type => type?.typeName && type?.commonName)
                  .map(type => html`
                    <option value=${type.id}>
                      ${type.typeName} (${type.commonName})
                    </option>
                  `)}
              </select>

              ${this.selectedServiceType ? html`
                <multi-select
                  .options=${this.availableServices.map(service => ({
                    value: service.id,
                    label: service.serviceName
                  }))}
                  @change=${this.handleServiceAdd}
                  placeholder="Search and select services..."
                ></multi-select>
              ` : ''}
            </div>

            ${this.selectedServices.length > 0 ? html`
              <table class="services-table">
                <thead>
                  <tr>
                    <th>Service Name</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Pricing</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${this.selectedServices.map(service => html`
                    <tr>
                      <td>${service.serviceName}</td>
                      <td>
                        <span class="type-cell">
                          ${this.getServiceTypeName(service.serviceTypeId)}
                        </span>
                      </td>
                      <td class="description-cell" title="${service.description || 'N/A'}">
                        ${service.description || 'N/A'}
                      </td>
                      <td>$${this.calculateTotalPricing(service).toFixed(2)}</td>
                      <td>
                        <button class="remove-btn" @click=${() => this.handleServiceRemove(service.id)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  `)}
                </tbody>
              </table>
            ` : ''}
          </div>
        `
      },
      supportingInformation: {
        title: 'Supporting Information',
        subtitle: 'Additional documentation and evidence',
        icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
      },
      communication: {
        title: 'Communication',
        subtitle: 'Messages and notifications',
        icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
      }
    };

    const content = contentMap[tab];
    if (!content) {
      console.error(`No content found for tab: ${tab}`);
      return html`<div>Tab content not found</div>`;
    }
    
    return html`
      <div class="section-card">
        <div class="section-header">
          <div>
            <div class="section-title">${content.title}</div>
            <div class="section-subtitle">${content.subtitle}</div>
          </div>
          <svg class="section-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${content.icon}" />
          </svg>
        </div>
        ${content.content || ''}
      </div>
    `;
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="header">
          Prior Authorization Request Center
          <button class="close-button" @click="${this.handleClose}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="tabs">
          ${this.tabs.map(tab => html`
            <div class="tab ${this.activeTab === tab.id ? 'active' : ''}"
                 @click="${() => this.switchTab(tab.id)}">
              ${tab.label}
            </div>
          `)}
        </div>

        <div class="content">
          ${this.renderTabContent(this.activeTab)}
        </div>
      </div>
    `;
  }
}

if (!customElements.get('prior-auth-verification')) {
  customElements.define('prior-auth-verification', PriorAuthVerification);
} 