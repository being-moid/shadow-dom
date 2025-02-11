import { LitElement, html, css, unsafeCSS } from 'lit';
import './PatientSearch.js';
import './PriorAuthActionButtons.js';  // Add this import at the top with other imports
import nphiesLogo from '../styles/nphies-logo-trans.png';
import avatarImage from '../styles/avatar.png';
import avatarBarcode from '../styles/avatar-barcode.png';
import userIcon from '../styles/user.svg';
import shieldIcon from '../styles/shield.svg';
import { API_ENDPOINTS } from '../config/api.js';

const componentStyles = css`
  :host {
    display: block;
    width: 100%;
    height: 100%;
    background: var(--sw-background-color, #f8fafc);
    color: var(--sw-text-color, #1e293b);
    font-family: var(--sw-font-family, 'Inter', system-ui, -apple-system, sans-serif);
    --medical-primary: #8500d8;
    --healthcare-green: #10B981;
    --healthcare-bg: #F3F4F6;
    --primary: var(--medical-primary);
    --primary-dark: #8500d8;
    --primary-light:rgb(180, 59, 255);
    --success: var(--healthcare-green);
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

  .visit-table-container {
    overflow-x: auto;
    margin: 1rem 0;
    border-radius: 0.5rem;
    border: 1px solid var(--gray-200);
  }

  .visit-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    white-space: nowrap;
  }

  .visit-table th {
    background: var(--gray-50);
    padding: 0.75rem 1rem;
    text-align: left;
    font-weight: 500;
    color: var(--gray-600);
    border-bottom: 1px solid var(--gray-200);
  }

  .visit-table td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--gray-200);
    color: var(--gray-700);
  }

  .visit-table tr:last-child td {
    border-bottom: none;
  }

  .visit-table tr.selected {
    background: var(--primary-50);
  }

  .status-badge {
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    font-size: 12px;
    font-weight: 500;
  }

  .status-scheduled {
    background: var(--gray-100);
    color: var(--gray-700);
  }

  .status-in-progress {
    background: #FEF3C7;
    color: #92400E;
  }

  .status-completed {
    background: #D1FAE5;
    color: #065F46;
  }

  .status-cancelled {
    background: #FEE2E2;
    color: #991B1B;
  }

  .btn-select {
    padding: 0.375rem 0.75rem;
    border-radius: 0.375rem;
    font-size: 12px;
    font-weight: 500;
    border: 1px solid var(--primary);
    background: transparent;
    color: var(--primary);
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-select:hover:not(:disabled) {
    background: var(--primary);
    color: white;
  }

  .btn-select:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: var(--primary);
    color: white;
  }

  .empty-state {
    padding: 2rem;
    text-align: center;
    color: var(--gray-500);
  }

  .healthcare-search {
    position: relative;
    margin-bottom: 1rem;
  }

  .healthcare-search input {
    width: 100%;
    padding: 0.75rem 1rem;
    padding-right: 2.5rem;
    border: 2px solid var(--medical-primary);
    border-radius: 0.5rem;
    font-size: 0.875rem;
    transition: all 0.2s;
    background-color: var(--healthcare-bg);
  }

  .healthcare-search input:focus {
    outline: none;
    border-color: var(--primary-dark);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    background-color: white;
  }

  .healthcare-search svg {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.25rem;
    height: 1.25rem;
    color: var(--medical-primary);
    pointer-events: none;
  }

  .healthcare-results {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid var(--gray-200);
    border-radius: 0.5rem;
    max-height: 15rem;
    overflow-y: auto;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    z-index: 50;
    margin-top: 0.25rem;
  }

  .healthcare-result-item {
    padding: 0.75rem 1rem;
    cursor: pointer;
    border-bottom: 1px solid var(--gray-200);
    transition: all 0.2s;
  }

  .healthcare-result-item:hover {
    background: var(--healthcare-bg);
  }

  .healthcare-result-item h4 {
    color: var(--medical-primary);
    font-weight: 600;
    margin: 0;
    font-size: 0.875rem;
  }

  .healthcare-result-item p {
    color: var(--gray-600);
    font-size: 0.75rem;
    margin: 0.25rem 0;
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
    background: var(--healthcare-green);
    color: white;
  }

  .badge-code {
    background: var(--medical-primary);
    color: white;
  }

  .badge-price {
    background: var(--gray-100);
    color: var(--gray-700);
  }

  .dropdown-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    gap: 0.5rem;
    color: var(--gray-500);
  }

  .dropdown-empty {
    padding: 1rem;
    text-align: center;
    color: var(--gray-500);
    font-size: 0.875rem;
  }

  .loading-spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid var(--gray-200);
    border-top-color: var(--medical-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Update existing table styles */
  .table-container {
    background: white;
    border: 1px solid var(--gray-200);
    border-radius: 0.5rem;
    overflow: hidden;
    margin-top: 1rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    background: var(--gray-50);
    padding: 0.75rem 1rem;
    text-align: left;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--gray-700);
    text-transform: uppercase;
  }

  td {
    padding: 0.75rem 1rem;
    border-top: 1px solid var(--gray-200);
    font-size: 0.875rem;
    color: var(--gray-800);
  }

  tr:hover td {
    background: var(--gray-50);
  }

  .empty-state {
    text-align: center;
    padding: 2rem;
    color: var(--gray-500);
  }

  .empty-state p:first-child {
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  /* Notification styles */
  .notification {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    animation: slideIn 0.2s ease-out;
    z-index: 100;
  }

  .notification.success {
    background: var(--healthcare-green);
    color: white;
  }

  .notification.error {
    background: var(--error);
    color: white;
  }

  .notification.warning {
    background: var(--warning);
    color: white;
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .dropdown-item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.25rem;
  }

  .dropdown-item-badge {
    background: var(--primary);
    color: white;
    padding: 0.125rem 0.375rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .dropdown-item-short-desc {
    display: block;
    color: var(--primary);
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.25rem;
  }

  .dropdown-item-description {
    display: block;
    color: var(--gray-700);
    font-size: 0.875rem;
    margin-bottom: 0.25rem;
  }

  .dropdown-item-category {
    display: block;
    color: var(--gray-500);
    font-size: 0.75rem;
    font-style: italic;
  }
`;

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
      collapsedSections: { type: Object },
      isLoading: { type: Boolean },
      formData: { type: Object },
      progress: { type: Number },
      visitDetails: { type: Object },
      supportingInfo: { type: Array },
      servicePrices: { type: Array },
      selectedPriceList: { type: Object },
      facilityId: { type: Number },
      medications: { type: Array }
    };
  }

  static get styles() {
    return [
      componentStyles,
      css`
        .dropdown-item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.25rem;
        }

        .dropdown-item-badge {
          background: var(--primary);
          color: white;
          padding: 0.125rem 0.375rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .dropdown-item-short-desc {
          display: block;
          color: var(--primary);
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 0.25rem;
        }

        .dropdown-item-description {
          display: block;
          color: var(--gray-700);
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
        }

        .dropdown-item-category {
          display: block;
          color: var(--gray-500);
          font-size: 0.75rem;
          font-style: italic;
        }
      `
    ];
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
    
    // Add debounce timers
    this.searchDebounceTimers = {
      procedure: null,
      diagnosis: null
    };

    // Initialize new properties
    this.servicePrices = [];
    this.selectedPriceList = null;
    this.facilityId = null;
    this.medications = [];

    this.addEventListener('switch-tab', this.switchTab);
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
            <button class="close-button" @click="${this.handleClose}">
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
      
      <prior-auth-action-buttons
        .selectedPatient="${this.selectedPatient}"
        .isLoading="${this.isLoading}"
        @notification="${this.handleNotification}"
        @close="${this.handleClose}"
      ></prior-auth-action-buttons>
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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
                @patient-selected="${this.handlePatientSelected}"
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Care Team
              </h2>
            </div>
            <div class="section-content">
              <div class="form-field dropdown-container" id="practitionerDropdown">
                <input type="text" class="form-input" id="practitionerSearch" 
                       placeholder=" " @input="${this.handlePractitionerSearch}">
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 00-2-2V5a2 2 0 00-2 2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Diagnosis
              </h2>
            </div>
            <div class="section-content">
              <div class="form-field dropdown-container" id="diagnosisDropdown">
                <input type="text" class="form-input" id="diagnosisSearch" 
                       placeholder=" " @input="${this.handleDiagnosisSearch}">
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
          ${this.renderProcedureSection()}

          <!-- Medications Section -->
          <div class="section ${this.isCollapsed('medications') ? 'collapsed' : ''}">
            <div class="section-header" @click="${() => this.toggleSection('medications')}">
              <h2 class="section-title">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Medications
              </h2>
            </div>
            <div class="section-content">
              <div class="form-field dropdown-container" id="medicationDropdown">
                <input type="text" class="form-input" id="medicationSearch" 
                       placeholder=" " @input="${this.handleMedicationSearch}">
                <label class="form-label" for="medicationSearch">Search Medications</label>
                ${this.isLoading ? html`
                  <div class="loading-overlay">
                    <div class="loading-spinner"></div>
                  </div>
                ` : ''}
              </div>
              ${this.renderMedicationTable()}
            </div>
          </div>

          <!-- Supporting Information Section -->
          <div class="section ${this.isCollapsed('supporting') ? 'collapsed' : ''}">
            <div class="section-header" @click="${() => this.toggleSection('supporting')}">
              <h2 class="section-title">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Supporting Information
              </h2>
            </div>
            <div class="section-content">
              <!-- Vitals Information -->
              <div class="mb-6">
                <h3 class="text-lg font-semibold mb-4">Vitals Information</h3>
                ${this.renderVitals()}
              </div>

              <div class="form-grid">
                <div class="form-field">
                  <textarea class="form-input" id="treatmentPlan" rows="3" 
                          placeholder=" " .value="${this.formData.clinicalInfo.treatmentPlan}"
                          @input="${e => this.updateFormData('clinicalInfo', 'treatmentPlan', e.target.value)}"></textarea>
                  <label class="form-label" for="treatmentPlan">Treatment Plan</label>
                  <div class="character-counter">${this.formData.clinicalInfo.treatmentPlan.length}/500</div>
                </div>
                <div class="form-field">
                  <textarea class="form-input" id="patientHistory" rows="3" 
                          placeholder=" " .value="${this.formData.clinicalInfo.patientHistory}"
                          @input="${e => this.updateFormData('clinicalInfo', 'patientHistory', e.target.value)}"></textarea>
                  <label class="form-label" for="patientHistory">Patient History</label>
                </div>
              </div>
              <div class="form-field">
                <div class="file-upload-container">
                  <input type="file" class="form-input" id="supportingDocs" 
                         multiple @change="${this.handleFileUpload}">
                  <label class="form-label" for="supportingDocs">Supporting Documents</label>
                </div>
              </div>
            </div>
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
    if (!this.careTeam?.length) return html`
      <div class="empty-state">
        <p>No care team members found</p>
      </div>
    `;

    return html`
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>LICENSE/PIN</th>
              <th>TITLE</th>
              <th>NAME</th>
              <th>DEPARTMENT</th>
              <th>DESIGNATION</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            ${this.careTeam.map(member => html`
              <tr>
                <td>${member.id}</td>
                <td>${member.pinNo || 'N/A'}</td>
                <td>${member.title}</td>
                <td>${member.name}</td>
                <td>${member.departmentId || 'N/A'}</td>
                <td>${member.designationId || 'N/A'}</td>
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

  renderVitals() {
    if (!this.selectedVisit) return html`
      <div class="empty-state">
        <p>No vitals information available</p>
      </div>
    `;

    const bmiRecords = this.selectedVisit.iclinicsBmis || [];
    const bmiRecord = bmiRecords.find(bmi => bmi.visitId === this.selectedVisit.id) || bmiRecords[0];
    
    const formatValue = (value, unit) => {
      if (value === 0 || value === 0.0) return `0 ${unit}`;
      if (!value) return `0 ${unit}`;
      return `${value} ${unit}`;
    };

    return html`
      <div class="vitals-container">
        ${bmiRecords.length === 0 ? html`
          <div class="alert alert-info mb-4">
            No vitals were performed in this visit
          </div>
        ` : ''}
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Vital Sign</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Blood Pressure</td>
                <td>${bmiRecord?.systolic || '0'}/${bmiRecord?.diastolic || '0'} mmHg</td>
              </tr>
              <tr>
                <td>Height</td>
                <td>${formatValue(bmiRecord?.height, 'cm')}</td>
              </tr>
              <tr>
                <td>Weight</td>
                <td>${formatValue(bmiRecord?.weight, 'kg')}</td>
              </tr>
              <tr>
                <td>BMI</td>
                <td>${formatValue(bmiRecord?.bmi, 'kg/m²')}</td>
              </tr>
              <tr>
                <td>Temperature</td>
                <td>${formatValue(bmiRecord?.temperature, '°C')}</td>
              </tr>
              <tr>
                <td>Pulse Rate</td>
                <td>${formatValue(bmiRecord?.pulseRate, 'bpm')}</td>
              </tr>
              <tr>
                <td>SpO2</td>
                <td>${formatValue(bmiRecord?.spo2, '%')}</td>
              </tr>
              <tr>
                <td>Respiratory Rate</td>
                <td>${formatValue(bmiRecord?.respRate, 'breaths/min')}</td>
              </tr>
              <tr>
                <td>Blood Sugar</td>
                <td>${formatValue(bmiRecord?.bloodSugar, 'mg/dL')}</td>
              </tr>
              <tr>
                <td>Pain Scale</td>
                <td>${bmiRecord?.painScale || '0'}/10</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="clinical-info mt-4">
          <h3 class="text-lg font-semibold mb-2">Clinical Information</h3>
          <div class="grid grid-cols-1 gap-4">
            <div class="form-field">
              <label class="form-label">Chief Complaint</label>
              <p class="mt-1">${bmiRecord?.chiefComplaint || 'Not specified'}</p>
            </div>
            <div class="form-field">
              <label class="form-label">Comments</label>
              <p class="mt-1">${bmiRecord?.comments || 'No comments'}</p>
            </div>
          </div>
        </div>
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
    if (!this.diagnoses?.length) {
        return html`
            <div class="empty-state">
                <p>No diagnoses added yet</p>
                <p class="text-sm text-gray-500">Search and select ICD codes above</p>
            </div>
        `;
    }

    return html`
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ICD Code</th>
                        <th>Short Description</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.diagnoses.map(diagnosis => html`
                        <tr>
                            <td>${diagnosis.code}</td>
                            <td>${diagnosis.shortDescription}</td>
                            <td>${diagnosis.description}</td>
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

  renderProcedureSection() {
    return html`
      <div class="section ${this.isCollapsed('procedures') ? 'collapsed' : ''}">
        <div class="section-header" @click="${() => this.toggleSection('procedures')}">
          <h2 class="section-title">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Procedures
          </h2>
        </div>
        <div class="section-content">
          ${this.renderProcedureSearch()}
          ${this.renderProcedureTable()}
        </div>
      </div>
    `;
  }

  renderProcedureSearch() {
    return html`
      <div class="form-field dropdown-container" id="procedureDropdown">
        <input type="text" class="form-input" id="procedureSearch" 
               placeholder=" " @input="${this.handleProcedureSearch}">
        <label class="form-label" for="procedureSearch">Search CPT Codes</label>
        ${this.isLoading ? html`
          <div class="loading-overlay">
            <div class="loading-spinner"></div>
          </div>
        ` : ''}
      </div>
    `;
  }

  handleProcedureSearch = this.debounce(async (event) => {
    const searchTerm = event.target.value;
    console.log('Procedure search triggered with term:', searchTerm);

    // Get or create the dropdown container
    const container = this.shadowRoot.querySelector('#procedureDropdown');
    let resultsContainer = container.querySelector('.dropdown-results');
    
    if (!resultsContainer) {
        resultsContainer = document.createElement('div');
        resultsContainer.className = 'dropdown-results';
        container.appendChild(resultsContainer);
    }

    if (searchTerm?.length < 3) {
        console.log('Search term too short, clearing results');
        resultsContainer.innerHTML = '<div class="dropdown-empty">Please enter at least 3 characters to search</div>';
        return;
    }

    this.isLoading = true;
    resultsContainer.innerHTML = '<div class="dropdown-loading"><div class="loading-spinner"></div>Searching procedures...</div>';

    try {
        const response = await fetch(`${API_ENDPOINTS.MASTER_PRICE_SERVICE_DIRECTORY.AUTOCOMPLETE_SERVICES}?searchTerm=${encodeURIComponent(searchTerm)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        
        console.log('Raw response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Procedure search result:', result);

        if (result.isSuccessfull && result.dynamicResult) {
            console.log('Found procedures:', result.dynamicResult.length);
            const transformedResults = result.dynamicResult.map(procedure => {
                const standardCharges = typeof procedure.standardCharges === 'number' ? procedure.standardCharges : 
                                      parseFloat(procedure.standardCharges) || 0;
                return {
                    id: procedure.id,
                    code: procedure.cptCode,
                    name: procedure.serviceName,
                    description: procedure.description || procedure.cptDescription || 'No description available',
                    type: procedure.serviceTypeName || 'Procedure',
                    category: procedure.serviceCategory || 'Procedure',
                    status: procedure.serviceStatus || 'Unknown',
                    facility: procedure.facilityName || 'Unknown Facility',
                    unitType: procedure.unitTypeName || 'Per Service',
                    standardCharges: standardCharges,
                    isActive: procedure.isActive
                };
            });
            
            if (transformedResults.length === 0) {
                resultsContainer.innerHTML = '<div class="dropdown-empty">No procedures found matching your search</div>';
            } else {
                const procedureItems = transformedResults.map(procedure => {
                    const procedureJson = JSON.stringify(procedure).replace(/'/g, '&apos;');
                    return `<div class="dropdown-item" data-procedure='${procedureJson}'>
                        <div class="dropdown-item-header">
                            <span class="dropdown-item-title">${procedure.code || 'No CPT Code'}</span>
                            <span class="dropdown-item-badge">${procedure.type}</span>
                        </div>
                        <span class="dropdown-item-short-desc">${procedure.name}</span>
                        <span class="dropdown-item-description">${procedure.description}</span>
                        <span class="dropdown-item-category">
                            ${procedure.facility} - ${procedure.unitType}
                            ${typeof procedure.standardCharges === 'number' ? ` - $${procedure.standardCharges.toFixed(2)}` : ''}
                        </span>
                    </div>`;
                }).join('');

                resultsContainer.innerHTML = procedureItems;

                // Add click handlers
                resultsContainer.querySelectorAll('.dropdown-item').forEach(item => {
                    item.addEventListener('click', () => {
                        try {
                            const procedure = JSON.parse(item.getAttribute('data-procedure'));
                            console.log('Selected procedure:', procedure);
                            this.selectProcedure(procedure);
                            resultsContainer.remove();
                        } catch (error) {
                            console.error('Error selecting procedure:', error);
                            this.showNotification('Error selecting procedure', 'error');
                        }
                    });
                });
            }
        } else {
            throw new Error(result.errorMessage || 'Failed to fetch procedures');
        }
    } catch (error) {
        console.error('Error in procedure search:', error);
        this.showNotification(`Error searching procedures: ${error.message}`, 'error');
        resultsContainer.innerHTML = '<div class="dropdown-empty error"><p>Error searching procedures:</p><p>' + error.message + '</p></div>';
    } finally {
        this.isLoading = false;
        this.requestUpdate();
    }
  }, 300);

  renderProcedureTable() {
    if (!this.procedures?.length) {
      return html`
        <div class="empty-state">
          <p>No procedures added yet</p>
          <p class="text-sm text-gray-500">Search and select procedures above</p>
        </div>
      `;
    }

    return html`
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>CPT Code</th>
              <th>Service Name</th>
              <th>Description</th>
              <th>Type</th>
              <th>Facility</th>
              <th>Charges</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${this.procedures.map(procedure => html`
              <tr>
                <td>${procedure.code}</td>
                <td>${procedure.name}</td>
                <td>${procedure.description}</td>
                <td>${procedure.type}</td>
                <td>${procedure.facility}</td>
                <td>$${typeof procedure.standardCharges === 'number' ? procedure.standardCharges.toFixed(2) : '0.00'}</td>
                <td>
                  <button class="btn btn-secondary" @click="${() => this.removeProcedure(procedure)}">
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

  async selectProcedure(procedure) {
    console.log('Selecting procedure:', procedure);
    
    // Check for duplicates
    if (this.procedures.some(p => p.code === procedure.code)) {
        console.log('Duplicate procedure found');
        this.showNotification('This procedure has already been added', 'warning');
        return;
    }

    // Initialize procedures array if it doesn't exist
    if (!Array.isArray(this.procedures)) {
        console.log('Initializing procedures array');
        this.procedures = [];
    }

    this.procedures = [...this.procedures, procedure];
    console.log('Updated procedures list:', this.procedures);
    
    this.updateProgress();
    this.requestUpdate();
    this.showNotification('Procedure added successfully', 'success');
  }

  renderMedicationTable() {
    if (!this.medications?.length) {
      return html`
        <div class="empty-state">
          <p>No medications added yet</p>
          <p class="text-sm text-gray-500">Search and select medications above</p>
        </div>
      `;
    }

    return html`
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Medication Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${this.medications.map(medication => html`
              <tr>
                <td>${medication.medicationName}</td>
                <td>${new Date(medication.startDate).toLocaleDateString()}</td>
                <td>${new Date(medication.endDate).toLocaleDateString()}</td>
                <td>
                  <button class="btn btn-secondary" @click="${() => this.removeMedication(medication)}">
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

  handleMedicationSearch = this.debounce(async (event) => {
    console.log('handleMedicationSearch called with event:', event);
    
    if (!event || !event.target || !event.target.value) {
      console.log('Invalid event or missing value:', event);
      return;
    }

    const searchTerm = event.target.value.trim().toUpperCase();
    console.log('Medication search triggered with term:', searchTerm);

    const container = this.shadowRoot.querySelector('#medicationDropdown');
    let resultsContainer = container.querySelector('.dropdown-results');
    
    if (!resultsContainer) {
        resultsContainer = document.createElement('div');
        resultsContainer.className = 'dropdown-results';
        container.appendChild(resultsContainer);
    }

    if (searchTerm?.length < 3) {
        console.log('Search term too short, clearing results');
        resultsContainer.innerHTML = '<div class="dropdown-empty">Please enter at least 3 characters to search</div>';
        return;
    }

    this.isLoading = true;
    resultsContainer.innerHTML = '<div class="dropdown-loading"><div class="loading-spinner"></div>Searching medications...</div>';

    try {
        const response = await fetch(API_ENDPOINTS.MEDICATION.PAGED, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                filters: `MedicationName_=${searchTerm}`,
                page: 1,
                pageSize: 100
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Medication search result:', result);

        if (result.isSuccessfull && result.dynamicResult) {
            console.log('Found medications:', result.dynamicResult.length);
            const transformedResults = result.dynamicResult.map(medication => ({
                id: medication.id,
                medicationName: medication.medicationName,
                startDate: medication.startDate,
                endDate: medication.endDate
            }));
            
            if (transformedResults.length === 0) {
                resultsContainer.innerHTML = '<div class="dropdown-empty">No medications found matching your search</div>';
            } else {
                const medicationItems = transformedResults.map(medication => {
                    const medicationJson = JSON.stringify(medication).replace(/'/g, '&apos;');
                    return `<div class="dropdown-item" data-medication='${medicationJson}'>
                        <div class="dropdown-item-header">
                            <span class="dropdown-item-title">${medication.medicationName}</span>
                        </div>
                        <span class="dropdown-item-description">
                            ${new Date(medication.startDate).toLocaleDateString()} - 
                            ${new Date(medication.endDate).toLocaleDateString()}
                        </span>
                    </div>`;
                }).join('');

                resultsContainer.innerHTML = medicationItems;

                // Add click handlers
                resultsContainer.querySelectorAll('.dropdown-item').forEach(item => {
                    item.addEventListener('click', () => {
                        try {
                            const medication = JSON.parse(item.getAttribute('data-medication'));
                            console.log('Selected medication:', medication);
                            this.selectMedication(medication);
                            resultsContainer.remove();
                        } catch (error) {
                            console.error('Error selecting medication:', error);
                            this.showNotification('Error selecting medication', 'error');
                        }
                    });
                });
            }
        } else {
            throw new Error(result.errorMessage || 'Failed to fetch medications');
        }
    } catch (error) {
        console.error('Error in medication search:', error);
        this.showNotification(`Error searching medications: ${error.message}`, 'error');
        resultsContainer.innerHTML = '<div class="dropdown-empty error"><p>Error searching medications:</p><p>' + error.message + '</p></div>';
    } finally {
        this.isLoading = false;
        this.requestUpdate();
    }
  }, 300);

  selectMedication(medication) {
    console.log('Selecting medication:', medication);
    
    // Check for duplicates
    if (this.medications.some(m => m.id === medication.id)) {
        console.log('Duplicate medication found');
        this.showNotification('This medication has already been added', 'warning');
        return;
    }

    // Initialize medications array if it doesn't exist
    if (!Array.isArray(this.medications)) {
        console.log('Initializing medications array');
        this.medications = [];
    }

    this.medications = [...this.medications, medication];
    console.log('Updated medications list:', this.medications);
    
    this.updateProgress();
    this.requestUpdate();
    this.showNotification('Medication added successfully', 'success');
  }

  removeMedication(medication) {
    this.medications = this.medications.filter(m => m.id !== medication.id);
    this.updateProgress();
    this.requestUpdate();
  }

  renderClaims() {
    return html`
      <div class="claims-container">
        <h2>Claims Management</h2>
        <!-- Implement claims management UI -->
      </div>
    `;
  }

  renderReports() {
    return html`
      <div class="reports-container">
        <h2>Reports</h2>
        <!-- Implement reports UI -->
      </div>
    `;
  }

  // Event Handlers
  async handlePatientSelected(event) {
    this.isLoading = true;
    try {
      this.selectedPatient = event.detail;
      
      // Fetch visits for the selected patient
      await this.fetchVisits();
      
      this.updateProgress();
    } catch (error) {
      console.error('Error fetching patient visits:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async fetchVisits() {
    if (!this.selectedPatient) return;
    
    this.isLoading = true;
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
        this.visits = result.dynamicResult;
        if (this.visits.length > 0) {
          this.selectVisit(this.visits[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching visits:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async processVisitData(visit) {
    if (!visit) return;

    // Set visit details
    this.visitDetails = {
      id: visit.id,
      date: visit.visitDate,
      time: visit.startTime,
      type: this.getVisitTypeName(visit.fkVisitSubTypeId),
      status: this.getVisitStatusName(visit.fkPatientVisitStatusId),
      facility: visit.fkFacilityId,
      reasonOfVisit: visit.reasonOfVisit,
      episodeId: visit.episodeId,
      transactionId: visit.transactionIdno
    };

    // Set care team from the visit's doctor information
    if (visit.doctor) {
      const doctor = {
        id: visit.doctor.id,
        pinNo: visit.doctor.pinNo,
        title: 'Dr.',
        name: `${visit.doctor.fname} ${visit.doctor.lname}`.trim(),
        departmentId: visit.doctor.departmentId,
        designationId: visit.doctor.designationId
      };
      
      this.careTeam = [doctor];
    }

    // Set the selected visit
    this.selectedVisit = visit;

    // Fetch vitals for the visit
    const bmiRecords = await this.fetchVitals(visit.id);
    
    // Update form data with BMI information if available
    const bmiRecord = bmiRecords.find(bmi => bmi.visitId === visit.id) || bmiRecords[0];
    
    if (bmiRecord) {
      this.formData = {
        ...this.formData,
        vitalSigns: {
          bloodPressure: `${bmiRecord.systolic || '0'}/${bmiRecord.diastolic || '0'}`,
          height: bmiRecord.height || 0,
          weight: bmiRecord.weight || 0
        },
        clinicalInfo: {
          chiefComplaint: bmiRecord.chiefComplaint || '',
          treatmentPlan: this.formData.clinicalInfo.treatmentPlan,
          patientHistory: this.formData.clinicalInfo.patientHistory
        }
      };
    } else {
      // Set default values if no BMI record exists
      this.formData = {
        ...this.formData,
        vitalSigns: {
          bloodPressure: '0/0',
          height: 0,
          weight: 0
        },
        clinicalInfo: {
          chiefComplaint: '',
          treatmentPlan: this.formData.clinicalInfo.treatmentPlan,
          patientHistory: this.formData.clinicalInfo.patientHistory
        }
      };
    }

    // Set procedures from billing details/services if available
    if (visit.services && Array.isArray(visit.services)) {
      this.procedures = visit.services.map(service => ({
        id: service.id,
        code: service.cptCode,
        name: service.serviceName,
        description: service.description || 'No description available',
        type: service.serviceTypeName || 'Service',
        charges: service.charges || 0,
        provider: service.provider,
        date: service.date,
        status: service.status
      }));
    } else {
      this.procedures = [];
    }

    this.updateProgress();
    this.requestUpdate();
  }

  handleDateRangeChange(event) {
    // Handle date range change
    this.updateProgress();
  }

  handleVisitTypeChange(event) {
    // Handle visit type change
    this.updateProgress();
  }

  async handlePractitionerSearch(event) {
    const searchText = event.target.value;
    if (searchText.length < 3) return;

    this.isLoading = true;
    try {
      const response = await fetch(API_ENDPOINTS.CARE_TEAM.PAGED, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: 1,
          pageSize: 10,
          filters: searchText ? `Fname.contains("${searchText}") or Lname.contains("${searchText}")` : null
        })
      });

      const result = await response.json();
      if (result.isSuccessfull) {
        const practitioners = result.dynamicResult.map(emp => ({
          id: emp.id,
          name: `${emp.fname} ${emp.lname}`,
          title: emp.title || 'Dr.',
          pinNo: emp.pinNo,
          departmentId: emp.departmentId,
          designationId: emp.designationId,
          specialty: emp.specialty || 'General'
        }));
        this.showPractitionerResults(practitioners);
      }
    } catch (error) {
      console.error('Error searching practitioners:', error);
      this.showNotification('Error searching practitioners', 'error');
    } finally {
      this.isLoading = false;
    }
  }

  async handleDiagnosisSearch(event) {
    const searchTerm = event.target.value;
    console.log('Diagnosis search triggered with term:', searchTerm);

    // Get or create the dropdown container
    const container = this.shadowRoot.querySelector('#diagnosisDropdown');
    let resultsContainer = container.querySelector('.dropdown-results');
    
    if (!resultsContainer) {
        resultsContainer = document.createElement('div');
        resultsContainer.className = 'dropdown-results';
        container.appendChild(resultsContainer);
    }

    if (searchTerm?.length < 3) {
        console.log('Search term too short, clearing results');
        resultsContainer.innerHTML = '<div class="dropdown-empty">Please enter at least 3 characters to search</div>';
        return;
    }

    this.isLoading = true;
    resultsContainer.innerHTML = '<div class="dropdown-loading"><div class="loading-spinner"></div>Searching ICD codes...</div>';

    try {
        const response = await fetch(`${API_ENDPOINTS.DIAGNOSIS.SEARCH_ICDS}/${encodeURIComponent(searchTerm)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        
        console.log('Raw response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Diagnosis search result:', result);

        if (result.isSuccessfull && result.dynamicResult) {
            console.log('Found diagnoses:', result.dynamicResult.length);
            const transformedResults = result.dynamicResult.map(diagnosis => ({
                id: diagnosis.id,
                code: diagnosis.icdcode,
                shortDescription: diagnosis.shortDescription,
                description: diagnosis.description,
                preAuthReq: diagnosis.preAuthReq
            }));
            
            if (transformedResults.length === 0) {
                resultsContainer.innerHTML = '<div class="dropdown-empty">No ICD codes found matching your search</div>';
            } else {
                const diagnosisItems = transformedResults.map(diagnosis => {
                    const diagnosisJson = JSON.stringify(diagnosis).replace(/'/g, '&apos;');
                    return `<div class="dropdown-item" data-diagnosis='${diagnosisJson}'>
                        <div class="dropdown-item-header">
                            <span class="dropdown-item-title">${diagnosis.code}</span>
                            <span class="dropdown-item-badge">${diagnosis.preAuthReq ? 'Prior Auth Required' : 'No Auth Required'}</span>
                        </div>
                        <span class="dropdown-item-short-desc">${diagnosis.shortDescription}</span>
                        <span class="dropdown-item-description">${diagnosis.description}</span>
                    </div>`;
                }).join('');

                resultsContainer.innerHTML = diagnosisItems;

                // Add click handlers
                resultsContainer.querySelectorAll('.dropdown-item').forEach(item => {
                    item.addEventListener('click', () => {
                        try {
                            const diagnosis = JSON.parse(item.getAttribute('data-diagnosis'));
                            console.log('Selected diagnosis:', diagnosis);
                            this.selectDiagnosis(diagnosis);
                            resultsContainer.remove();
                        } catch (error) {
                            console.error('Error selecting diagnosis:', error);
                            this.showNotification('Error selecting diagnosis', 'error');
                        }
                    });
                });
            }
        } else {
            throw new Error(result.errorMessage || 'Failed to fetch diagnoses');
        }
    } catch (error) {
        console.error('Error in diagnosis search:', error);
        this.showNotification(`Error searching diagnoses: ${error.message}`, 'error');
        resultsContainer.innerHTML = '<div class="dropdown-empty error"><p>Error searching diagnoses:</p><p>' + error.message + '</p></div>';
    } finally {
        this.isLoading = false;
        this.requestUpdate();
    }
}

  handleFileUpload(event) {
    const files = event.target.files;
    // Implement file upload logic
    this.updateProgress();
  }

  updateFormData(section, field, value) {
    this.formData = {
      ...this.formData,
      [section]: {
        ...this.formData[section],
        [field]: value
      }
    };
    this.updateProgress();
  }

  async handleSaveAsDraft() {
    this.isLoading = true;
    try {
      // Implement save as draft logic
      const formData = this.getFormData();
      // Save to local storage or API
      localStorage.setItem('priorAuthDraft', JSON.stringify(formData));
      this.showNotification('Draft saved successfully', 'success');
    } catch (error) {
      console.error('Error saving draft:', error);
      this.showNotification('Error saving draft', 'error');
    } finally {
        this.isLoading = false;
    }
  }

  async handleValidate() {
    this.isLoading = true;
    try {
      const formData = this.getFormData();
      const response = await fetch(API_ENDPOINTS.ELIGIBILITY.VERIFY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (result.isSuccessfull) {
        this.showNotification('Validation successful', 'success');
      } else {
        this.showNotification(result.errorMessage || 'Validation failed', 'error');
      }
    } catch (error) {
      console.error('Error validating form:', error);
      this.showNotification('Error validating form', 'error');
    } finally {
      this.isLoading = false;
    }
  }

  async handleSubmit() {
    this.isLoading = true;
    try {
      // Get the dental prior auth template
      const response = await fetch('/src/data/dp.json');
      const dentalPriorAuth = await response.json();

      // Update only the Patient object with selected patient's information
      dentalPriorAuth.Patient = {
        Identifier: this.selectedPatient.id.toString(),
        IdentifierSystem: "http://nphies.sa/identifier/iqama",
        FirstName: this.selectedPatient.fname || '',
        LastName: this.selectedPatient.lname || '',
        Gender: this.selectedPatient.gender?.toLowerCase() || 'unknown',
        DateOfBirth: this.selectedPatient.dateOfBirth || '',
        MaritalStatus: this.selectedPatient.maritalStatus || 'U',
        Occupation: this.selectedPatient.occupation || '',
        PhoneNumber: this.selectedPatient.phoneNumber || '',
        NationalIdentity: this.selectedPatient.nationalId || ''
      };

      // Submit the prior authorization request
      const submitResponse = await fetch(API_ENDPOINTS.PRIOR_AUTH.DENTAL_SUBMIT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dentalPriorAuth)
      });

      const result = await submitResponse.json();
      if (result.isSuccessfull) {
        this.showNotification('Prior authorization submitted successfully', 'success');
        this.handleClose();
      } else {
        this.showNotification(result.errorMessage || 'Submission failed', 'error');
      }
    } catch (error) {
      console.error('Error submitting prior auth:', error);
      this.showNotification('Error submitting prior authorization', 'error');
    } finally {
      this.isLoading = false;
    }
  }

  removeCareTeamMember(member) {
    this.careTeam = this.careTeam.filter(m => m.id !== member.id);
  }

  removeDiagnosis(diagnosis) {
    this.diagnoses = this.diagnoses.filter(d => d.code !== diagnosis.code);
  }

  removeProcedure(procedure) {
    this.procedures = this.procedures.filter(p => p.code !== procedure.code);
  }

  switchTab(tab) {
    if (typeof tab === 'object' && tab.detail) {
      this.activeTab = tab.detail.tab;
    } else {
      this.activeTab = tab;
    }
        this.requestUpdate();
    }

  handleClose() {
    // Handle closing the form
    this.reset();
    // Additional cleanup if needed
  }

  getProgressPercentage() {
    return this.progress;
  }

  updateProgress() {
    let completedSteps = 0;
    let totalSteps = 7; // Updated total number of sections

    // Check patient selection
    if (this.selectedPatient) completedSteps++;

    // Check visit selection
    if (this.selectedVisit) completedSteps++;

    // Check care team
    if (this.careTeam && this.careTeam.length > 0) completedSteps++;

    // Check diagnosis
    if (this.diagnoses && this.diagnoses.length > 0) completedSteps++;

    // Check procedures
    if (this.procedures && this.procedures.length > 0) completedSteps++;

    // Check medications
    if (this.medications && this.medications.length > 0) completedSteps++;

    // Check supporting info
    const hasSupporting = Object.values(this.formData.vitalSigns).some(value => value) ||
                         Object.values(this.formData.clinicalInfo).some(value => value);
    if (hasSupporting) completedSteps++;

    this.progress = Math.round((completedSteps / totalSteps) * 100);
  }

  isCollapsed(section) {
    return this.collapsedSections[section];
  }

  toggleSection(section) {
    this.collapsedSections = {
      ...this.collapsedSections,
      [section]: !this.collapsedSections[section]
    };
    this.requestUpdate();
  }

  getFormData() {
    return {
      patient: this.selectedPatient,
      visit: this.selectedVisit,
      careTeam: this.careTeam,
      diagnoses: this.diagnoses,
      procedures: this.procedures,
      vitalSigns: this.formData.vitalSigns,
      clinicalInfo: this.formData.clinicalInfo,
      medications: this.medications
    };
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification ' + type;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 200);
    }, 3000);
  }

  showPractitionerResults(results) {
    const container = this.shadowRoot.querySelector('#practitionerDropdown');
    if (!container) return;

    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown-results';

    if (this.isLoading) {
      dropdown.innerHTML = `
        <div class="dropdown-loading">
          <div class="loading-spinner"></div>
          Searching...
        </div>
      `;
    } else if (!results || results.length === 0) {
      dropdown.innerHTML = `
        <div class="dropdown-empty">
          No practitioners found
        </div>
      `;
    } else {
      dropdown.innerHTML = results.map(practitioner => `
        <div class="dropdown-item" @click="${() => this.selectPractitioner(practitioner)}">
          <span class="dropdown-item-title">${practitioner.name}</span>
          <span class="dropdown-item-subtitle">${practitioner.specialty} - ${practitioner.licenseNumber}</span>
        </div>
      `).join('');
    }

    // Remove existing dropdown if any
    const existingDropdown = container.querySelector('.dropdown-results');
    if (existingDropdown) {
      existingDropdown.remove();
    }

    container.appendChild(dropdown);

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!container.contains(e.target)) {
        dropdown.remove();
      }
    }, { once: true });
  }

  selectPractitioner(practitioner) {
    this.careTeam = [...this.careTeam, practitioner];
    this.updateProgress();
    this.requestUpdate();
  }

  selectVisit(visit) {
    this.selectedVisit = visit;
    // Process the selected visit's billing details and other information
    this.processVisitData(visit);
    this.requestUpdate();
  }

  // Add debounce helper method
  debounce(func, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  showProcedureResults(results) {
    const container = this.shadowRoot.querySelector('#procedureDropdown');
    if (!container) return;

    const dropdown = document.createElement('div');
    dropdown.className = 'healthcare-results';

    if (this.isLoading) {
      dropdown.innerHTML = `
        <div class="dropdown-loading">
          <div class="loading-spinner"></div>
          <span>Searching...</span>
        </div>
      `;
    } else if (!results || results.length === 0) {
      dropdown.innerHTML = `
        <div class="dropdown-empty">
          <span>No services found</span>
        </div>
      `;
    } else {
      const procedureItems = results.map(service => `
        <div class="healthcare-result-item" data-procedure='${JSON.stringify(service)}'>
          <h4>${service.name}</h4>
          <p>${service.description || 'No description available'}</p>
          <div class="healthcare-badges">
            <span class="healthcare-badge badge-type">${service.type}</span>
            ${service.code ? `<span class="healthcare-badge badge-code">CPT: ${service.code}</span>` : ''}
            <span class="healthcare-badge badge-price">$${(service.charges || 0).toFixed(2)}</span>
          </div>
        </div>
      `).join('');

      dropdown.innerHTML = procedureItems;

      // Add click handlers
      dropdown.querySelectorAll('.healthcare-result-item').forEach(item => {
        item.addEventListener('click', () => {
          const procedure = JSON.parse(item.getAttribute('data-procedure'));
          this.selectProcedure(procedure);
          dropdown.remove();
        });
      });
    }

    // Remove existing dropdown if any
    const existingDropdown = container.querySelector('.healthcare-results');
    if (existingDropdown) {
      existingDropdown.remove();
    }

    container.appendChild(dropdown);

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!container.contains(e.target)) {
        dropdown.remove();
      }
    }, { once: true });
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

  getStatusClass(statusId) {
    const classes = {
      1: 'status-scheduled',
      2: 'status-in-progress',
      3: 'status-completed',
      4: 'status-cancelled'
    };
    return classes[statusId] || 'status-scheduled';
  }

  async fetchServicePrices(serviceId) {
    try {
      const response = await fetch(API_ENDPOINTS.MPDIR_SERVICE_PRICE.PAGED, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters: 'serviceId==' + serviceId + ',isActive==true',
          sorts: '-effectiveFrom',
          page: 1,
          pageSize: 10
        })
      });

      if (!response.ok) throw new Error('Failed to fetch service prices');
      
      const result = await response.json();
      if (result.isSuccessfull && result.dynamicResult) {
        this.servicePrices = result.dynamicResult;
        this.requestUpdate();
      } else {
        throw new Error(result.errorMessage || 'Failed to fetch service prices');
      }
    } catch (error) {
      console.error('Error fetching service prices:', error);
      this.showNotification(error.message, 'error');
    }
  }

  async fetchPriceList(serviceId) {
    if (!this.facilityId) return;

    try {
      const response = await fetch(API_ENDPOINTS.MPDIR_SERVICE_DIRECTORY_PRICELIST.PAGED, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters: 'serviceId==' + serviceId + ',facilityId==' + this.facilityId,
          sorts: '-effectiveDate',
          page: 1,
          pageSize: 10
        })
      });

      if (!response.ok) throw new Error('Failed to fetch price list');
      
      const result = await response.json();
      if (result.isSuccessfull && result.dynamicResult) {
        this.selectedPriceList = result.dynamicResult[0] || null;
        this.requestUpdate();
      } else {
        throw new Error(result.errorMessage || 'Failed to fetch price list');
      }
    } catch (error) {
      console.error('Error fetching price list:', error);
      this.showNotification(error.message, 'error');
    }
  }

  async fetchVitals(visitId) {
    try {
      // Try outpatient BMI records first
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
        // If no outpatient records, try inpatient records
        const inpatientResponse = await fetch(API_ENDPOINTS.VITALS.INPATIENT_BMI, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page: 1,
            pageSize: 10,
            filters: 'visitId==' + visitId
          })
        });

        const inpatientResult = await inpatientResponse.json();
        if (inpatientResult.isSuccessfull && inpatientResult.dynamicResult?.length > 0) {
          bmiRecords = inpatientResult.dynamicResult;
        }
      }

      return bmiRecords;
    } catch (error) {
      console.error('Error fetching vitals:', error);
      this.showNotification('Error fetching vitals information', 'error');
      return [];
    }
  }

  selectDiagnosis(diagnosis) {
    console.log('Selecting diagnosis:', diagnosis);
    
    // Check for duplicates
    if (this.diagnoses.some(d => d.code === diagnosis.code)) {
        console.log('Duplicate diagnosis found');
        this.showNotification('This diagnosis has already been added', 'warning');
        return;
    }

    // Initialize diagnoses array if it doesn't exist
    if (!Array.isArray(this.diagnoses)) {
        console.log('Initializing diagnoses array');
        this.diagnoses = [];
    }

    this.diagnoses = [...this.diagnoses, diagnosis];
    console.log('Updated diagnoses list:', this.diagnoses);
    
    this.updateProgress();
    this.requestUpdate();
    this.showNotification('Diagnosis added successfully', 'success');
  }

  handleNotification(event) {
    // Handle notifications from the action buttons
    const { message, type } = event.detail;
    // Implement your notification system here
    console.log(`${type}: ${message}`);
  }
}

if (!customElements.get('prior-auth-claim-management')) {
  customElements.define('prior-auth-claim-management', PriorAuthClaimManagement);
}