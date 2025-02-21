import { LitElement, html, css } from 'lit';
import { API_ENDPOINTS } from '../config/api';

export class PriorAuthWidget extends LitElement {
  static get properties() {
    return {
      priorAuths: { type: Array },
      loading: { type: Boolean },
      searchType: { type: String },
      searchQuery: { type: String },
      startDate: { type: String },
      endDate: { type: String },
      selectedCaseType: { type: String },
      selectedStatus: { type: String },
      selectedPatient: { type: Object },
      selectedVisit: { type: Object },
      visits: { type: Array },
      vitals: { type: Object }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        --primary: #8500d8;
        --primary-light: #a64ced;
        --primary-dark: #6a00ad;
        --success: #10B981;
        --warning: #F59E0B;
        --error: #EF4444;
        --gray-50: #F9FAFB;
        --gray-100: #F3F4F6;
        --gray-200: #E5E7EB;
        --gray-300: #D1D5DB;
        --gray-400: #9CA3AF;
        --gray-500: #6B7280;
        --gray-600: #4B5563;
        --gray-700: #374151;
        --gray-800: #1F2937;
        --gray-900: #111827;
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
      }

      .page-header {
        max-width: 1400px;
        margin: 0 auto 2rem;
        padding: 0 1rem;
      }

      .page-title {
        font-size: 2rem;
        font-weight: 600;
        color: var(--gray-900);
        margin-bottom: 0.5rem;
      }

      .page-description {
        color: var(--gray-600);
        font-size: 1.125rem;
      }

      @media (max-width: 768px) {
        .page-title {
          font-size: 1.5rem;
        }

        .page-description {
          font-size: 1rem;
        }
      }

      .widget-container {
        background: white;
        border-radius: 1rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }

      .filters-section {
        background: white;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }

      .filters-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
      }

      .section-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--gray-900);
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .filters-row {
        display: flex;
        gap: 2rem;
        align-items: flex-start;
      }

      .filter-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .filter-group.case-type,
      .filter-group.status {
        width: 200px;
      }

      .filter-group.search-type {
        width: 420px;
      }

      .filter-group.search-field {
        width: 320px;
      }

      .filter-group.date-range {
        width: 420px;
      }

      .filter-group.generate-button-container {
        margin-left: auto;
        padding-top: 1.5rem;
        display: flex;
        gap: 1rem;
        align-items: center;
      }

      .filter-label {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--gray-700);
        margin-bottom: 0.25rem;
      }

      .filter-input {
        padding: 0.625rem 1rem;
        border: 1px solid var(--gray-300);
        border-radius: 0.5rem;
        font-size: 0.875rem;
        color: var(--gray-900);
        background: white;
        transition: all 0.2s;
        height: 40px;
        width: 100%;
        appearance: none;
        -webkit-appearance: none;
      }

      .radio-group {
        display: flex;
        gap: 2rem;
        align-items: center;
        padding: 0.5rem 0;
      }

      .radio-label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.875rem;
        color: var(--gray-700);
        cursor: pointer;
      }

      .radio-label input[type="radio"] {
        width: 1.125rem;
        height: 1.125rem;
        border: 2px solid var(--primary);
        border-radius: 50%;
        appearance: none;
        -webkit-appearance: none;
        position: relative;
        margin: 0;
        cursor: pointer;
      }

      .radio-label input[type="radio"]:checked {
        background-color: var(--primary);
        border-color: var(--primary);
      }

      .radio-label input[type="radio"]:checked::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 0.375rem;
        height: 0.375rem;
        background-color: white;
        border-radius: 50%;
      }

      .date-inputs {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 5rem;
      }

      .button {
        height: 40px;
        border-radius: 0.5rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
      }

      .create-button {
        background: white;
        color: var(--primary);
        border: 1px solid var(--primary);
        width: 180px;
      }

      .create-button:hover {
        background: var(--gray-50);
      }

      .generate-button {
        background: var(--primary);
        color: white;
        border: none;
        width: 140px;
      }

      .generate-button:hover {
        background: var(--primary-dark);
      }

      .grid-section {
        padding: 1.5rem;
      }

      .grid-header {
        background: var(--primary);
        border: 1px solid var(--primary-dark);
        border-radius: 0.5rem 0.5rem 0 0;
      }

      .grid-header .grid-row {
        font-weight: 600;
        color: white;
      }

      .grid-body {
        border: 1px solid var(--gray-200);
        border-top: none;
        border-radius: 0 0 0.5rem 0.5rem;
        background: white;
      }

      .grid-body .grid-row {
        border-bottom: 1px solid var(--gray-200);
        transition: background-color 0.2s;
      }

      .grid-body .grid-row:hover {
        background-color: var(--gray-50);
      }

      .grid-body .grid-row:last-child {
        border-bottom: none;
      }

      .status-badge {
        padding: 0.375rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: 500;
        text-align: center;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 100px;
      }

      .status-success { 
        background: #D1FAE5; 
        color: #065F46;
      }
      
      .status-warning { 
        background: #FEF3C7; 
        color: #92400E;
      }
      
      .status-error { 
        background: #FEE2E2; 
        color: #991B1B;
      }
      
      .status-info { 
        background: #DBEAFE; 
        color: #1E40AF;
      }

      .empty-state {
        padding: 3rem;
        text-align: center;
        color: var(--gray-500);
      }

      .loading-spinner {
        width: 2rem;
        height: 2rem;
        border: 2px solid var(--gray-200);
        border-top-color: var(--primary);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 2rem auto;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      .grid-row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1.5fr 1.5fr 1fr 1fr 1fr 1fr;
        gap: 1rem;
        padding: 1rem;
        align-items: center;
      }

      @media (max-width: 1024px) {
        .grid-row {
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        }
      }

      .visit-grid {
        margin-top: 1.5rem;
        background: white;
        border-radius: 0.5rem;
        overflow: hidden;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .visit-table {
        width: 100%;
        border-collapse: collapse;
      }

      .visit-table th,
      .visit-table td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid var(--gray-200);
      }

      .visit-table th {
        background: var(--primary);
        color: white;
        font-weight: 500;
      }

      .visit-table tr:hover {
        background: var(--gray-50);
      }

      .visit-table tr.selected {
        background: var(--primary-light);
        color: white;
      }

      .btn-select {
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        border: 1px solid var(--primary);
        background: white;
        color: var(--primary);
        cursor: pointer;
        transition: all 0.2s;
      }

      .btn-select:hover {
        background: var(--primary);
        color: white;
      }

      .btn-select:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .vitals-section {
        margin-top: 1.5rem;
        padding: 1.5rem;
        background: white;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .vitals-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-top: 1rem;
      }

      .vital-card {
        padding: 1rem;
        background: var(--gray-50);
        border-radius: 0.5rem;
        border: 1px solid var(--gray-200);
      }

      .vital-label {
        font-size: 0.875rem;
        color: var(--gray-600);
        margin-bottom: 0.5rem;
      }

      .vital-value {
        font-size: 1.25rem;
        font-weight: 500;
        color: var(--gray-900);
      }
    `;
  }

  constructor() {
    super();
    this.priorAuths = [];
    this.loading = true;
    this.searchType = 'mrn';
    this.searchQuery = '';
    this.startDate = '';
    this.endDate = '';
    this.selectedCaseType = 'all';
    this.selectedStatus = 'all';
    this.selectedPatient = null;
    this.selectedVisit = null;
    this.visits = [];
    this.vitals = {
      bloodPressure: '',
      height: '',
      weight: '',
      bmi: ''
    };
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.fetchPriorAuths();
  }

  async fetchPriorAuths() {
    try {
      this.loading = true;
      const response = await fetch(API_ENDPOINTS.PREAUTHORIZATION.PAGED, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          page: 1,
          pageSize: 10,
          caseType: this.selectedCaseType,
          status: this.selectedStatus,
          searchType: this.searchType,
          searchQuery: this.searchQuery,
          startDate: this.startDate,
          endDate: this.endDate
        })
      });

      if (!response.ok) throw new Error('Failed to fetch prior auths');
      
      const data = await response.json();
      if (data.dynamicResult) {
        this.priorAuths = data.dynamicResult;
      }
    } catch (error) {
      console.error('Error fetching prior auths:', error);
    } finally {
      this.loading = false;
    }
  }

  handleSearch() {
    this.fetchPriorAuths();
  }

  handleCreateNew() {
    const container = document.createElement('div');
    container.id = 'prior-auth-management-container';
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      z-index: 9998;
      padding: 2rem;
      box-sizing: border-box;
      justify-content: center;
      align-items: flex-start;
    `;
    
    const priorAuthClaimManagement = document.createElement('prior-auth-claim-management');
    priorAuthClaimManagement.style.cssText = `
      margin: 0 auto;
      width: 100%;
      max-width: 1200px;
      height: calc(100vh - 4rem);
      position: relative;
      z-index: 9999;
      background: white;
      border-radius: 0.75rem;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      animation: slideIn 0.3s ease-out;
    `;

    container.appendChild(priorAuthClaimManagement);
    document.body.appendChild(container);
    document.body.style.overflow = 'hidden';

    // Handle closing
    const handleClose = () => {
      container.remove();
      document.body.style.overflow = '';
    };

    // Close on backdrop click
    container.addEventListener('click', (e) => {
      if (e.target === container) {
        handleClose();
      }
    });

    // Close on escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    // Listen for the close event from the component
    priorAuthClaimManagement.addEventListener('close', handleClose);

    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
  }

  async handlePatientSelect(event) {
    this.loading = true;
    try {
      const patientData = event.detail;
      this.selectedPatient = patientData;
      await this.fetchVisits();
    } catch (error) {
      console.error('Error handling patient selection:', error);
      this.showNotification('Error loading patient data', 'error');
    } finally {
      this.loading = false;
    }
  }

  async fetchVisits() {
    if (!this.selectedPatient) return;
    
    this.loading = true;
    try {
      const response = await fetch(API_ENDPOINTS.VISIT.PAGED, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: 1,
          pageSize: 10,
          filters: "patientId==" + this.selectedPatient.id
        })
      });
      
      const result = await response.json();
      if (result.isSuccessfull && result.dynamicResult) {
        if (result.dynamicResult[0]?.visitmanagementVisits) {
          this.visits = result.dynamicResult[0].visitmanagementVisits;
        } else {
          this.visits = result.dynamicResult;
        }

        if (this.visits.length > 0) {
          this.selectVisit(this.visits[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching visits:', error);
      this.showNotification('Error loading visit data', 'error');
    } finally {
      this.loading = false;
    }
  }

  async selectVisit(visit) {
    this.selectedVisit = visit;
    await this.fetchVitals(visit.id);
    this.requestUpdate();
  }

  async fetchVitals(visitId) {
    try {
      const outpatientResponse = await fetch(API_ENDPOINTS.VITALS.OUTPATIENT_BMI, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: 1,
          pageSize: 10,
          filters: 'visitId==' + visitId
        })
      });

      let bmiRecords = [];
      const outpatientResult = await outpatientResponse.json();
      
      if (outpatientResult.isSuccessfull && outpatientResult.dynamicResult?.length > 0) {
        bmiRecords = outpatientResult.dynamicResult;
      } else {
        const inpatientResponse = await fetch(API_ENDPOINTS.VITALS.INPATIENT_BMI, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page: 1,
            pageSize: 10,
            filters: 'NurseVisitId==' + visitId
          })
        });

        const inpatientResult = await inpatientResponse.json();
        if (inpatientResult.isSuccessfull && inpatientResult.dynamicResult?.length > 0) {
          bmiRecords = inpatientResult.dynamicResult;
        }
      }

      if (bmiRecords.length > 0) {
        const latestRecord = bmiRecords[0];
        this.vitals = {
          bloodPressure: `${latestRecord.systolic || '0'}/${latestRecord.diastolic || '0'}`,
          height: latestRecord.height || 0,
          weight: latestRecord.weight || 0,
          bmi: latestRecord.bmi || 0
        };
      }
    } catch (error) {
      console.error('Error fetching vitals:', error);
      this.showNotification('Error fetching vitals information', 'error');
    }
  }

  getStatusClass(status) {
    const statusMap = {
      1: 'status-info',
      2: 'status-warning',
      3: 'status-error',
      4: 'status-success',
      5: 'status-warning',
      6: 'status-error'
    };
    return statusMap[status] || 'status-info';
  }

  getVisitTypeName(typeId) {
    const types = {
      1: 'Regular Visit',
      2: 'Follow-up',
      3: 'Emergency',
      4: 'Consultation'
    };
    return types[typeId] || 'Unknown';
  }

  getVisitStatusName(statusId) {
    const statuses = {
      1: 'Scheduled',
      2: 'In Progress',
      3: 'Completed',
      4: 'Cancelled'
    };
    return statuses[statusId] || 'Unknown';
  }

  renderVisitGrid() {
    if (!this.selectedPatient) {
      return html`
        <div class="empty-state">
          <p>Please select a patient to view visits</p>
        </div>
      `;
    }

    if (!this.visits?.length) {
      return html`
        <div class="empty-state">
          <p>No visits found for this patient</p>
        </div>
      `;
    }

    return html`
      <div class="visit-grid">
        <table class="visit-table">
          <thead>
            <tr>
              <th>Visit ID</th>
              <th>Visit Date</th>
              <th>Visit Type</th>
              <th>Status</th>
              <th>Episode ID</th>
              <th>Transaction ID</th>
              <th>Facility</th>
              <th>Provider</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${this.visits.map(visit => html`
              <tr class="${this.selectedVisit?.id === visit.id ? 'selected' : ''}">
                <td>${visit.id || 'N/A'}</td>
                <td>${visit.startDate ? new Date(visit.startDate).toLocaleDateString() : 'N/A'}</td>
                <td>${this.getVisitTypeName(visit.fkVisitSubTypeId)}</td>
                <td>
                  <span class="status-badge ${this.getStatusClass(visit.fkPatientVisitStatusId)}">
                    ${this.getVisitStatusName(visit.fkPatientVisitStatusId)}
                  </span>
                </td>
                <td>${visit.episodeId || 'N/A'}</td>
                <td>${visit.transactionIdno || 'N/A'}</td>
                <td>${visit.facilityName || visit.fkFacilityId || 'N/A'}</td>
                <td>${visit.doctorName || visit.doctorId || 'N/A'}</td>
                <td>
                  <button 
                    class="btn-select"
                    ?disabled="${this.selectedVisit?.id === visit.id}"
                    @click="${() => this.selectVisit(visit)}"
                  >
                    ${this.selectedVisit?.id === visit.id ? 'Selected' : 'Select'}
                  </button>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }

  renderVitals() {
    if (!this.selectedVisit) return '';

    return html`
      <div class="vitals-section">
        <h3 class="section-title">Vital Information</h3>
        <div class="vitals-grid">
          <div class="vital-card">
            <div class="vital-label">Blood Pressure</div>
            <div class="vital-value">${this.vitals.bloodPressure} mmHg</div>
          </div>
          <div class="vital-card">
            <div class="vital-label">Height</div>
            <div class="vital-value">${this.vitals.height} cm</div>
          </div>
          <div class="vital-card">
            <div class="vital-label">Weight</div>
            <div class="vital-value">${this.vitals.weight} kg</div>
          </div>
          <div class="vital-card">
            <div class="vital-label">BMI</div>
            <div class="vital-value">${this.vitals.bmi}</div>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <div class="page-header">
        <h1 class="page-title">Prior Authorization Management</h1>
        <p class="page-description">View and manage your prior authorizations and claims</p>
      </div>

      <div class="widget-container">
        <div class="filters-section">
          <div class="filters-header">
            <h2 class="section-title">
              <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 5a2 2 0 012 2h2a2 2 0 012-2" stroke-width="2"/>
              </svg>
              Prior Requests List
            </h2>
          </div>

          <!-- First Row -->
          <div class="filters-row">
            <div class="filter-group case-type">
              <label class="filter-label">Case Type:</label>
              <select class="filter-input" .value="${this.selectedCaseType}" @change="${e => this.selectedCaseType = e.target.value}">
                <option value="all">All</option>
                <option value="dental">Dental</option>
                <option value="medical">Medical</option>
              </select>
            </div>

            <div class="filter-group status">
              <label class="filter-label">Status:</label>
              <select class="filter-input" .value="${this.selectedStatus}" @change="${e => this.selectedStatus = e.target.value}">
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <!-- Second Row -->
          <div class="filters-row">
            <div class="filter-group search-type">
              <label class="filter-label">Search Type:</label>
              <div class="radio-group">
                <label class="radio-label">
                  <input type="radio" name="searchType" value="mrn" ?checked="${this.searchType === 'mrn'}" @change="${e => this.searchType = e.target.value}">
                  MRN
                </label>
                <label class="radio-label">
                  <input type="radio" name="searchType" value="nationalId" ?checked="${this.searchType === 'nationalId'}" @change="${e => this.searchType = e.target.value}">
                  National ID
                </label>
                <label class="radio-label">
                  <input type="radio" name="searchType" value="requestId" ?checked="${this.searchType === 'requestId'}" @change="${e => this.searchType = e.target.value}">
                  Request ID
                </label>
              </div>
            </div>

         
          </div>

          <!-- Third Row -->
          <div class="filters-row">
            <div class="filter-group date-range">
              <label class="filter-label">Date Range:</label>
              <div class="date-inputs">
                <input type="date" class="filter-input" .value="${this.startDate}" @input="${e => this.startDate = e.target.value}">
                <input type="date" class="filter-input" .value="${this.endDate}" @input="${e => this.endDate = e.target.value}">
              </div>
            </div>
           <div class="filter-group search-field" style="padding-left :30px;">
              <label class="filter-label">Search:</label>
              <input type="text" class="filter-input"  placeholder="Enter search term..." .value="${this.searchQuery}" @input="${e => this.searchQuery = e.target.value}">
            </div>
            <div class="filter-group generate-button-container">
              <button class="button create-button" @click="${this.handleCreateNew}">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 4v16m8-8H4" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Create New
              </button>
              <button class="button generate-button" @click="${this.handleSearch}">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-width="2"/>
                </svg>
                Generate
              </button>
            </div>
          </div>
        </div>

        ${this.renderVisitGrid()}
        ${this.renderVitals()}

        <div class="grid-section">
          ${this.loading ? html`
            <div class="loading-spinner"></div>
          ` : this.priorAuths.length === 0 ? html`
            <div class="empty-state">
              <p>No records to display.</p>
            </div>
          ` : html`
            <div class="grid-container">
              <div class="grid-header">
                <div class="grid-row">
                  <div>ID</div>
                  <div>Case Type</div>
                  <div>MRN</div>
                  <div>Patient Name</div>
                  <div>Plan</div>
                  <div>Auth Start</div>
                  <div>Auth End</div>
                  <div>Denial Code</div>
                  <div>Status</div>
                </div>
              </div>
              <div class="grid-body">
                ${this.priorAuths.map(auth => {
                  const request = JSON.parse(auth.customEndpointRequest);
                  return html`
                    <div class="grid-row">
                      <div>${request.RequestId}</div>
                      <div>${request.CaseType || 'N/A'}</div>
                      <div>${request.Patient?.MRN || 'N/A'}</div>
                      <div>${request.Patient?.FirstName} ${request.Patient?.LastName}</div>
                      <div>${request.Coverage?.PlanName || 'N/A'}</div>
                      <div>${new Date(request.AuthStartDate).toLocaleDateString()}</div>
                      <div>${new Date(request.AuthEndDate).toLocaleDateString()}</div>
                      <div>${request.DenialCode || 'N/A'}</div>
                      <div>
                        <span class="status-badge ${this.getStatusClass(auth.status)}">
                          ${this.getStatusText(auth.status)}
                        </span>
                      </div>
                    </div>
                  `;
                })}
              </div>
            </div>
          `}
        </div>
      </div>
    `;
  }

  getStatusClass(status) {
    const statusMap = {
      1: 'status-info',
      2: 'status-warning',
      3: 'status-error',
      4: 'status-success',
      5: 'status-warning',
      6: 'status-error'
    };
    return statusMap[status] || 'status-info';
  }

  getStatusText(status) {
    const statusMap = {
      1: 'Draft',
      2: 'Processing',
      3: 'Cancelled',
      4: 'Approved',
      5: 'In Queue',
      6: 'Rejected'
    };
    return statusMap[status] || 'Unknown';
  }
}

if (!customElements.get('prior-auth-widget')) {
  customElements.define('prior-auth-widget', PriorAuthWidget);
} 