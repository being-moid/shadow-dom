import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './PatientSearch.js';
import nphiesLogo from '../styles/nphies-logo-trans.png';
import avatarImage from '../styles/avatar.png';
import avatarBarcode from '../styles/avatar-barcode.png';
import userIcon from '../styles/user.svg';
import shieldIcon from '../styles/shield.svg';
import { API_ENDPOINTS } from '../config/api.js';
import './HealthcareServiceAutocomplete'; // Import the new component

const componentStyles = css`
  :host {
    display: block;
    width: 100%;
    height: 100%;
    background: var(--sw-background-color, #f8fafc);
    color: var(--sw-text-color, #1e293b);
    font-family: var(--sw-font-family, 'Inter', system-ui, -apple-system, sans-serif);
    --primary: #8500d8;
    --primary-dark: #6a00ad;
    --primary-light: #9d1aff;
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
  }

  /* Typography */
  h1, .h1 {
    font-size: 24px;
    line-height: 1.2;
  }

  h2, .h2 {
    font-size: 20px;
    line-height: 1.3;
  }

  h3, .h3 {
    font-size: 18px;
    line-height: 1.4;
  }

  p, .body-text {
    font-size: 16px;
    line-height: 1.5;
  }

  .small-text {
    font-size: 14px;
    line-height: 1.5;
  }

  /* Update header styles */
  .header {
    background: var(--primary);
    color: white;
    padding: 1.5rem 2rem;
    display: flex;
    gap: 2rem;
    align-items: flex-start;
    position: relative;
  }

  .header-title {
    font-size: 24px;
    font-weight: 500;
    margin: 0;
    line-height: 1.2;
  }

  /* Update tabs */
  .tabs {
    display: flex;
    background: var(--primary);
    padding: 0 2rem;
  }

  .tab {
    padding: 0.5rem 2rem;
    color: white;
    cursor: pointer;
    background: transparent;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    font-weight: 500;
    font-size: 14px;
    transition: all 0.2s ease;
  }

  .tab.active {
    background: white;
    color: var(--primary);
  }

  /* Update section titles */
  .section-title {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: var(--gray-800);
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  /* Update form labels and inputs */
  .form-label {
    font-size: 14px;
    color: var(--gray-500);
  }

  .form-input {
    font-size: 16px;
  }

  /* Update table text */
  .table-container {
    font-size: 14px;
  }

  th {
    font-size: 14px;
    font-weight: 600;
  }

  td {
    font-size: 14px;
  }

  /* Update buttons */
  button {
    font-size: 14px;
  }

  .close-button {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    cursor: pointer;
    padding: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.375rem;
    transition: all 0.2s ease;
  }

  .close-button:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  .close-button svg {
    width: 1.25rem;
    height: 1.25rem;
    stroke-width: 2.5;
  }

  /* Update progress bar */
  .progress-bar {
    background: var(--success);
  }

  /* Update other button styles */
  .btn-primary {
    background: var(--primary);
  }

  .btn-primary:hover {
    background: var(--primary-dark);
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    background: var(--gray-50);
  }

  .sticky-header {
    position: sticky;
    top: 0;
    background: white;
    z-index: 10;
  }

  .header-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .nphies-logo {
    width: 140px;
    height: auto;
    object-fit: contain;
  }

  .progress-indicator {
    width: 100%;
    height: 0.5rem;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 0.25rem;
    overflow: hidden;
  }

  .content {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
  }

  .prior-auth-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .section {
    background: white;
    border-radius: 0.75rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: all 0.3s ease;
    border: 1px solid var(--gray-200);
  }

  .section.collapsed .section-content {
    display: none;
  }

  .section-header {
    padding: 1.25rem 1.5rem;
    background: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background-color 0.2s;
  }

  .section-header:hover {
    background: var(--gray-50);
  }

  .section-title svg {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--primary);
  }

  .section-content {
    padding: 1.5rem;
    border-top: 1px solid var(--gray-200);
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .form-field {
    position: relative;
    margin-bottom: 1.5rem;
  }

  .form-input:hover {
    border-color: var(--gray-400);
  }

  .form-input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(70, 58, 161, 0.1);
  }

  .form-input:not(:placeholder-shown) + .form-label,
  .form-input:focus + .form-label {
    transform: translateY(-1.4rem) scale(0.85);
    color: var(--primary);
  }

  textarea.form-input {
    resize: vertical;
    min-height: 120px;
    line-height: 1.5;
  }

  .character-counter {
    position: absolute;
    right: 0.75rem;
    bottom: 0.75rem;
    font-size: 0.75rem;
    color: var(--gray-500);
  }

  .file-upload-container {
    border: 2px dashed var(--gray-300);
    border-radius: 0.75rem;
    padding: 2rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    background: var(--gray-50);
  }

  .file-upload-container:hover {
    border-color: var(--primary);
    background: white;
  }

  .file-upload-container input[type="file"] {
    display: none;
  }

  .tooltip {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 0.375rem 0.875rem;
    background: var(--gray-100);
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--gray-700);
    transition: all 0.2s;
  }

  .tooltip[data-status="complete"] {
    background: var(--success);
    color: white;
  }

  .tooltip[data-status="pending"] {
    background: var(--warning);
    color: white;
  }

  .tooltip[data-tooltip]:hover::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.5rem 0.75rem;
    background: var(--gray-900);
    color: white;
    border-radius: 0.375rem;
    font-size: 0.75rem;
    white-space: nowrap;
    z-index: 10;
    margin-bottom: 0.5rem;
  }

  .action-buttons {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 2rem;
    padding: 1.25rem;
    background: white;
    border-radius: 0.75rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--gray-200);
    position: sticky;
    bottom: -24px;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  .btn-secondary {
    background: white;
    border: 1.5px solid var(--gray-300);
    color: var(--gray-700);
  }

  .btn-secondary:hover {
    border-color: var(--gray-400);
    color: var(--gray-900);
    transform: translateY(-1px);
  }

  .btn[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  /* Table Styles */
  .table-container {
    overflow-x: auto;
    margin-top: 1rem;
    border-radius: 0.5rem;
    border: 1px solid var(--gray-200);
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    background: var(--gray-50);
    padding: 0.875rem 1rem;
    text-align: left;
    font-weight: 600;
    color: var(--gray-700);
    border-bottom: 1px solid var(--gray-200);
  }

  td {
    padding: 1rem;
    border-bottom: 1px solid var(--gray-200);
    color: var(--gray-800);
  }

  tr:hover td {
    background: var(--gray-50);
  }

  /* Patient Info Styles */
  .patient-info {
    background: white;
    border-radius: 0.5rem;
    padding: 1.5rem;
    border: 1px solid var(--gray-200);
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }

  .info-item {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .info-label {
    font-size: 0.75rem;
    color: var(--gray-500);
    font-weight: 500;
  }

  .info-value {
    font-size: 0.875rem;
    color: var(--gray-900);
    font-weight: 500;
  }

  /* Animations */
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(1rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-in {
    animation: slideIn 0.3s ease-out;
  }

  /* Loading States */
  .loading-overlay {
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20;
  }

  .loading-spinner {
    width: 2rem;
    height: 2rem;
    border: 3px solid var(--gray-200);
    border-top-color: var(--primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Dropdown Styles */
  .dropdown-container {
    position: relative;
  }

  .dropdown-results {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid var(--gray-200);
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    max-height: 15rem;
    overflow-y: auto;
    z-index: 30;
    margin-top: 0.25rem;
  }

  .dropdown-item {
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .dropdown-item:hover {
    background: var(--gray-50);
  }

  .dropdown-item:not(:last-child) {
    border-bottom: 1px solid var(--gray-200);
  }

  .dropdown-item-title {
    font-weight: 500;
    color: var(--gray-900);
  }

  .dropdown-item-subtitle {
    font-size: 0.75rem;
    color: var(--gray-500);
  }

  .dropdown-empty {
    padding: 1rem;
    text-align: center;
    color: var(--gray-500);
    font-size: 0.875rem;
  }

  .dropdown-loading {
    padding: 1rem;
    text-align: center;
    color: var(--gray-500);
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 0.5rem;
  }

  .dropdown-loading .loading-spinner {
    width: 1rem;
    height: 1rem;
    border-width: 2px;
  }
`;

// Add API endpoints for healthcare services
const HEALTHCARE_ENDPOINTS = {
  DIAGNOSIS: {
    SEARCH_ICDS: (searchTerm) => `/api/Diagnosis/SearchICDs/${encodeURIComponent(searchTerm)}`
  },
  MEDICATION: {
    PAGED: '/api/Medication/GetPagedAsync'
  },
  CARE_TEAM: {
    PAGED: '/api/HrEmployee/GetPagedAsync'
  },
  VITALS: {
    OUTPATIENT_BMI: '/api/IclinicsBmi/GetPagedAsync',
    INPATIENT_BMI: '/api/IpdNursingBmi/GetPagedAsync'
  },
  PROCEDURES: {
    AUTOCOMPLETE: '/api/MasterPriceServiceDirectory/AutocompleteServices',
    SEARCH: (searchTerm) => `/api/MasterPriceServiceDirectory/SearchServices/${encodeURIComponent(searchTerm)}`
  },
  PRICES: {
    SERVICE_PRICES: '/api/MpdirServiceprice/GetPagedAsync',
    PRICE_LISTS: '/api/MpdirServicedirectoryPricelist/GetPagedAsync'
  }
};

export class PriorAuthClaimManagement extends LitElement {
  static get properties() {
    return {
      activeTab: { type: String },
      selectedPatient: { type: Object },
      selectedVisit: { type: Object },
      visits: { type: Array },
      careTeam: { type: Array },
      diagnoses: { type: Array },
      procedures: { type: Array },
      medications: { type: Array },
      collapsedSections: { type: Object },
      isLoading: { type: Boolean },
      formData: { type: Object },
      progress: { type: Number },
      visitDetails: { type: Object },
      supportingInfo: { type: Array },
      selectedServices: { type: Array },
      selectedFacility: { type: Object },
      searchResults: { type: Object }
    };
  }

  static get styles() {
    return componentStyles;
  }

  constructor() {
    super();
    this.activeTab = 'prior-auth';
    this.selectedPatient = null;
    this.selectedVisit = null;
    this.visits = [];
    this.careTeam = [];
    this.diagnoses = [];
    this.procedures = [];
    this.medications = [];
    this.collapsedSections = {
      patient: false,
      visit: false,
      'care-team': false,
      diagnosis: false,
      procedures: false,
      medications: false,
      supporting: false
    };
    this.isLoading = false;
    this.formData = {
      vitalSigns: {
        bloodPressure: '',
        height: '',
        weight: ''
      },
      clinicalInfo: {
        treatmentPlan: '',
        patientHistory: '',
        chiefComplaint: ''
      }
    };
    this.progress = 0;
    this.visitDetails = null;
    this.supportingInfo = [];
    this.selectedServices = [];
    this.selectedFacility = null;
    this.searchResults = {
      diagnoses: [],
      medications: [],
      procedures: [],
      careTeam: []
    };

    this.addEventListener('switch-tab', this.switchTab.bind(this));
  }

  firstUpdated() {
    this.updateProgress();
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="sticky-header">
          <div class="header">
            <img src="${nphiesLogo}" class="nphies-logo" alt="NPHIES">
            <div class="header-content">
              <h1 class="header-title">Prior Auth & Claim Management Center</h1>
              <div class="progress-indicator">
                <div class="progress-bar" style="width: ${this.getProgressPercentage()}%"></div>
              </div>
            </div>
            <button class="close-button" @click="${this.handleClose.bind(this)}">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          
          <div class="tabs">
            <div class="tab ${this.activeTab === 'prior-auth' ? 'active' : ''}"
                 @click="${() => this.switchTab('prior-auth')}">
              PRIOR AUTH
            </div>
            <div class="tab ${this.activeTab === 'claims' ? 'active' : ''}"
                 @click="${() => this.switchTab('claims')}">
              CLAIMS
            </div>
            <div class="tab ${this.activeTab === 'reports' ? 'active' : ''}"
                 @click="${() => this.switchTab('reports')}">
              REPORTS
            </div>
          </div>
        </div>

        <div class="content">
          ${this.activeTab === 'prior-auth' ? this.renderPriorAuth() : ''}
          ${this.activeTab === 'claims' ? this.renderClaims() : ''}
          ${this.activeTab === 'reports' ? this.renderReports() : ''}
        </div>
      </div>
    `;
  }

  renderPriorAuth() {
    return html`
      <div class="prior-auth-container">
        <!-- Patient Information Section -->
        <div class="section ${this.isCollapsed('patient') ? 'collapsed' : ''}">
          <div class="section-header" @click="${() => this.toggleSection('patient')}">
            <h2 class="section-title">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Patient Information
            </h2>
            <span class="tooltip" 
                  data-tooltip="${this.selectedPatient ? 'Patient information complete' : 'Search and select patient'}"
                  data-status="${this.selectedPatient ? 'complete' : 'pending'}">
              ${this.selectedPatient ? '✓ Complete' : 'Pending'}
            </span>
          </div>
          <div class="section-content">
            ${!this.selectedPatient ? html`
              <patient-search 
              @patient-selected="${this.handlePatientSelected.bind(this)}"
                .loading="${this.isLoading}"
              ></patient-search>
            ` : this.renderPatientInfo()}
          </div>
        </div>

        ${this.selectedPatient ? html`
          <!-- Visit/Episode Selection Section -->
          <div class="section ${this.isCollapsed('visit') ? 'collapsed' : ''}">
            <div class="section-header" @click="${() => this.toggleSection('visit')}">
              <h2 class="section-title">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Visit/Episode Selection
              </h2>
            </div>
            <div class="section-content">
              ${this.renderVisitDetails()}
            </div>
          </div>

          <!-- Care Team Section -->
          <div class="section ${this.isCollapsed('care-team') ? 'collapsed' : ''}">
            <div class="section-header" @click="${() => this.toggleSection('care-team')}">
              <h2 class="section-title">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Care Team
              </h2>
            </div>
            <div class="section-content">
              <div class="form-field dropdown-container" id="practitionerDropdown">
                <input type="text" class="form-input" id="practitionerSearch" 
                placeholder=" " @input="${this.handlePractitionerSearch.bind(this)}">
                <label class="form-label" for="practitionerSearch">Search Practitioner</label>
                ${this.isLoading ? html`
                  <div class="loading-overlay">
                    <div class="loading-spinner"></div>
                  </div>
                ` : ''}
              </div>
              ${this.renderCareTeam()}
            </div>
          </div>

          <!-- Diagnosis Section -->
          <div class="section ${this.isCollapsed('diagnosis') ? 'collapsed' : ''}">
            <div class="section-header" @click="${() => this.toggleSection('diagnosis')}">
              <h2 class="section-title">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Diagnosis
              </h2>
            </div>
            <div class="section-content">
              <div class="form-field dropdown-container" id="diagnosisDropdown">
                <input type="text" class="form-input" id="diagnosisSearch" 
                placeholder=" " @input="${this.handleDiagnosisSearch.bind(this)}">
                <label class="form-label" for="diagnosisSearch">Search ICD-10</label>
                ${this.isLoading ? html`
                  <div class="loading-overlay">
                    <div class="loading-spinner"></div>
                  </div>
                ` : ''}
              </div>
              ${this.renderDiagnosisTable()}
            </div>
          </div>

          <!-- Procedures Section -->
          <div class="section ${this.isCollapsed('procedures') ? 'collapsed' : ''}">
            <div class="section-header" @click="${() => this.toggleSection('procedures')}">
              <h2 class="section-title">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Procedures
              </h2>
            </div>
            <div class="section-content">
            <!-- Healthcare Service Autocomplete Component -->
            <healthcare-service-autocomplete @service-update="${this.handleServiceUpdate.bind(this)}"></healthcare-service-autocomplete>
            </div>
          </div>

          <!-- Supporting Information Section -->
          <div class="section ${this.isCollapsed('supporting') ? 'collapsed' : ''}">
            <div class="section-header" @click="${() => this.toggleSection('supporting')}">
              <h2 class="section-title">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Supporting Information
              </h2>
            </div>
            <div class="section-content">
              <div class="form-grid">
                <div class="form-field">
                  <input type="text" class="form-input" id="bloodPressure" 
                         placeholder=" " .value="${this.formData.vitalSigns.bloodPressure}"
                  @input="${this.updateFormData.bind(this, 'vitalSigns', 'bloodPressure')}">
                  <label class="form-label" for="bloodPressure">Blood Pressure</label>
                </div>
                <div class="form-field">
                  <input type="number" class="form-input" id="height" 
                         placeholder=" " .value="${this.formData.vitalSigns.height}"
                  @input="${this.updateFormData.bind(this, 'vitalSigns', 'height')}">
                  <label class="form-label" for="height">Height (cm)</label>
                </div>
                <div class="form-field">
                  <input type="number" class="form-input" id="weight" 
                         placeholder=" " .value="${this.formData.vitalSigns.weight}"
                  @input="${this.updateFormData.bind(this, 'vitalSigns', 'weight')}">
                  <label class="form-label" for="weight">Weight (kg)</label>
                </div>
              </div>
              <div class="form-field">
                <textarea class="form-input" id="treatmentPlan" rows="3" 
                          placeholder=" " .value="${this.formData.clinicalInfo.treatmentPlan}"
                @input="${this.updateFormData.bind(this, 'clinicalInfo', 'treatmentPlan')}"></textarea>
                <label class="form-label" for="treatmentPlan">Treatment Plan</label>
                <div class="character-counter">${this.formData.clinicalInfo.treatmentPlan.length}/500</div>
              </div>
              <div class="form-field">
                <textarea class="form-input" id="patientHistory" rows="3" 
                          placeholder=" " .value="${this.formData.clinicalInfo.patientHistory}"
                @input="${this.updateFormData.bind(this, 'clinicalInfo', 'patientHistory')}"></textarea>
                <label class="form-label" for="patientHistory">Patient History</label>
              </div>
              <div class="form-field">
                <textarea class="form-input" id="chiefComplaint" rows="3" 
                          placeholder=" " .value="${this.formData.clinicalInfo.chiefComplaint}"
                @input="${this.updateFormData.bind(this, 'clinicalInfo', 'chiefComplaint')}"></textarea>
                <label class="form-label" for="chiefComplaint">Chief Complaint</label>
              </div>
              <div class="form-field">
                <div class="file-upload-container">
                  <input type="file" class="form-input" id="supportingDocs" 
                  multiple @change="${this.handleFileUpload.bind(this)}">
                  <label class="form-label" for="supportingDocs">Supporting Documents</label>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="action-buttons">
          <button class="btn btn-secondary" @click="${this.handleSaveAsDraft.bind(this)}" ?disabled="${this.isLoading}">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Save as Draft
            </button>
          <button class="btn btn-secondary" @click="${this.handleValidate.bind(this)}" ?disabled="${this.isLoading}">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Validate
            </button>
          <button class="btn btn-primary" @click="${this.handleSubmit.bind(this)}" ?disabled="${this.isLoading}">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
              Submit
            </button>
          </div>
        ` : ''}
      </div>
      ${this.isLoading ? html`
        <div class="loading-overlay">
          <div class="loading-spinner"></div>
          <div class="loading-text">Processing...</div>
        </div>
      ` : ''}
    `;
  }

  renderPatientInfo() {
    if (!this.selectedPatient) return '';
    
    return html`
      <div class="patient-info">
        <div class="info-grid">
          <div class="info-item">
            <span class="info-label">Name:</span>
            <span class="info-value">${this.selectedPatient.name}</span>
          </div>
          <div class="info-item">
            <span class="info-label">ID:</span>
            <span class="info-value">${this.selectedPatient.id}</span>
          </div>
          <div class="info-item">
            <span class="info-label">DOB:</span>
            <span class="info-value">${this.selectedPatient.dateOfBirth}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Gender:</span>
            <span class="info-value">${this.selectedPatient.gender}</span>
          </div>
        </div>
      </div>
    `;
  }

  renderVisitDetails() {
    if (!this.visits?.length) return html`
      <div class="empty-state">
        No visits found for this patient
      </div>
    `;

    return html`
      <div class="visit-table-container">
        <table class="visit-table">
          <thead>
            <tr>
              <th>Visit Date</th>
              <th>Time</th>
              <th>Type</th>
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
                <td>${new Date(visit.visitDate).toLocaleDateString()}</td>
                <td>${visit.startTime}</td>
                <td>${this.getVisitTypeName(visit.fkVisitSubTypeId)}</td>
                <td>
                  <span class="status-badge ${this.getStatusClass(visit.fkPatientVisitStatusId)}">
                    ${this.getVisitStatusName(visit.fkPatientVisitStatusId)}
                  </span>
                </td>
                <td>${visit.episodeId}</td>
                <td>${visit.transactionIdno}</td>
                <td>${visit.fkFacilityId}</td>
                <td>${visit.doctorId}</td>
                <td>
                  <button 
                    class="btn-select"
                    @click="${() => this.selectVisit(visit)}"
                    ?disabled="${this.selectedVisit?.id === visit.id}"
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

  renderCareTeam() {
    if (!this.careTeam?.length) return '';

    return html`
      <div class="care-team-list">
        ${this.careTeam.map(member => html`
          <div class="team-member">
            <div class="member-info">
              <span class="member-id">ID: ${member.id}</span>
              <span class="member-role">${member.role}</span>
              <span class="member-type">${member.type}</span>
            </div>
          </div>
        `)}
      </div>
    `;
  }

  renderVisitTable() {
    return html`
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Provider</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${this.visits?.map(visit => html`
              <tr>
                <td>${visit.date}</td>
                <td>${visit.type}</td>
                <td>${visit.provider}</td>
                <td>${visit.status}</td>
                <td>
                  <button class="btn btn-secondary" @click="${() => this.selectVisit(visit)}">
                    Select
                  </button>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }

  renderCareTeamTable() {
    return html`
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Specialty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${this.careTeam?.map(member => html`
              <tr>
                <td>${member.name}</td>
                <td>${member.role}</td>
                <td>${member.specialty}</td>
                <td>
                  <button class="btn btn-secondary" @click="${() => this.removeCareTeamMember(member)}">
                    Remove
                  </button>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }

  renderDiagnosisTable() {
    return html`
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Description</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${this.diagnoses?.map(diagnosis => html`
              <tr>
                <td>${diagnosis.code}</td>
                <td>${diagnosis.description}</td>
                <td>${diagnosis.type}</td>
                <td>
                  <button class="btn btn-secondary" @click="${() => this.removeDiagnosis(diagnosis)}">
                    Remove
                  </button>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }

  renderClaims() {
    return html`
      <div class="claims-container">
        <h2>Claims Management</h2>
        <!-- Claims content here -->
      </div>
    `;
  }

  selectDiagnosis(diagnosis) {
    // Prevent duplicate diagnoses
    if (this.diagnoses.some(d => d.code === diagnosis.code)) {
      this.showNotification('This diagnosis has already been added', 'warning');
      return;
    }

    const diagnosisItem = {
      id: diagnosis.id,
      code: diagnosis.code,
      description: diagnosis.description,
      type: diagnosis.type || 'ICD-10'
    };

    this.diagnoses = [...this.diagnoses, diagnosisItem];
    this.updateProgress();
    this.requestUpdate();
    this.showNotification('Diagnosis added successfully', 'success');
  }

  selectMedication(medication) {
    // Prevent duplicate medications
    if (this.medications.some(m => m.id === medication.id)) {
      this.showNotification('This medication has already been added', 'warning');
      return;
    }

    const medicationItem = {
      id: medication.id,
      name: medication.name,
      description: medication.description,
      code: medication.code,
      type: medication.type || 'Medication'
    };

    this.medications = [...this.medications, medicationItem];
    this.updateProgress();
    this.requestUpdate();
    this.showNotification('Medication added successfully', 'success');
  }

  selectCareTeamMember(member) {
    // Prevent duplicate team members
    if (this.careTeam.some(m => m.id === member.EmployeeId)) {
      this.showNotification('This team member has already been added', 'warning');
      return;
    }

    const teamMember = {
      id: member.EmployeeId,
      firstName: member.Fname,
      lastName: member.Lname,
      email: member.Email,
      department: member.DepartmentName,
      role: member.Role || 'Healthcare Provider'
    };

    this.careTeam = [...this.careTeam, teamMember];
    this.updateProgress();
    this.requestUpdate();
    this.showNotification('Team member added successfully', 'success');
  }

  selectProcedure(procedure) {
    // Prevent duplicate procedures
    if (this.procedures.some(p => p.id === procedure.id)) {
      this.showNotification('This procedure has already been added', 'warning');
      return;
    }

    const procedureItem = {
      id: procedure.id,
      name: procedure.name || procedure.serviceName,
      description: procedure.description,
      type: procedure.serviceTypeName || 'Procedure',
      cptCode: procedure.cptCode,
      charges: procedure.standardCharges || 0
    };

    this.procedures = [...this.procedures, procedureItem];
    this.updateProgress();
    this.requestUpdate();
    this.showNotification('Procedure added successfully', 'success');

    // Fetch and store price information if available
    if (procedure.id) {
      this.fetchServicePrices(procedure.id).then(prices => {
        if (prices && prices.length > 0) {
          procedureItem.prices = prices;
          this.requestUpdate();
        }
      });

      if (this.selectedFacility?.id) {
        this.fetchPriceLists(procedure.id, this.selectedFacility.id).then(priceLists => {
          if (priceLists && priceLists.length > 0) {
            procedureItem.priceLists = priceLists;
            this.requestUpdate();
          }
        });
      }
    }
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 200);
    }, 3000);
  }

  updateProgress() {
    let total = 0;
    let completed = 0;

    // Check patient info
    if (this.selectedPatient) {
      total++; completed++;
    }

    // Check visit info
    if (this.selectedVisit) {
      total++; completed++;
    }

    // Check care team
    if (this.careTeam.length > 0) {
      total++; completed++;
    }

    // Check diagnoses
    if (this.diagnoses.length > 0) {
      total++; completed++;
    }

    // Check procedures
    if (this.procedures.length > 0) {
      total++; completed++;
    }

    // Check medications
    if (this.medications.length > 0) {
      total++; completed++;
    }

    // Check supporting info
    if (this.supportingInfo.length > 0) {
      total++; completed++;
    }

    this.progress = total > 0 ? Math.round((completed / total) * 100) : 0;
    this.requestUpdate();
  }
}