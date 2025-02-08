import { LitElement, html, css } from 'lit';

const componentStyles = css`
  :host {
    display: block;
  }

  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
    width: 90%;
    max-width: 1200px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
  }

  .modal-header {
    padding: 1rem;
    border-bottom: 1px solid #E5E7EB;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #312e81;
    color: white;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  .modal-title {
    font-size: 1.25rem;
    font-weight: 600;
  }

  .close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: white;
    cursor: pointer;
    padding: 0.5rem;
    line-height: 1;
  }

  .close-button:hover {
    color: #E5E7EB;
  }

  .modal-body {
    padding: 1rem;
  }

  .tabs {
    display: flex;
    border-bottom: 2px solid #E5E7EB;
    margin-bottom: 1rem;
  }

  .tab {
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    margin-bottom: -2px;
    color: #6B7280;
    font-weight: 500;
  }

  .tab.active {
    color: #312e81;
    border-bottom-color: #312e81;
  }

  .tab:hover:not(.active) {
    color: #4B5563;
  }

  .data-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .data-field {
    background: #F9FAFB;
    padding: 1rem;
    border-radius: 0.375rem;
    border: 1px solid #E5E7EB;
  }

  .field-label {
    font-size: 0.875rem;
    color: #6B7280;
    margin-bottom: 0.25rem;
  }

  .field-value {
    font-size: 1rem;
    color: #111827;
    font-weight: 500;
  }

  .nphies-logo {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 100px;
    height: auto;
  }
`;

export class DataViewModal extends LitElement {
  static get properties() {
    return {
      isOpen: { type: Boolean },
      activeTab: { type: String },
      patientData: { type: Object },
      insuranceData: { type: Object }
    };
  }

  static get styles() {
    return componentStyles;
  }

  constructor() {
    super();
    this.isOpen = false;
    this.activeTab = 'coverage';
    this.patientData = {};
    this.insuranceData = {};
  }

  close() {
    this.isOpen = false;
    this.dispatchEvent(new CustomEvent('close'));
  }

  handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      this.close();
    }
  }

  setTab(tab) {
    this.activeTab = tab;
  }

  renderPatientInfo() {
    const { fullName = '', patientType = '' } = this.patientData;
    return html`
      <div class="data-grid">
        <div class="data-field">
          <div class="field-label">FULL NAME</div>
          <div class="field-value">${fullName}</div>
        </div>
        <div class="data-field">
          <div class="field-label">PATIENT TYPE</div>
          <div class="field-value">${patientType}</div>
        </div>
      </div>
    `;
  }

  renderInsuranceInfo() {
    const {
      insuranceCompany = '',
      contractNumber = '',
      memberID = '',
      policyNumber = '',
      coveragePlan = ''
    } = this.insuranceData;

    return html`
      <div class="data-grid">
        <div class="data-field">
          <div class="field-label">INSURANCE COMPANY</div>
          <div class="field-value">${insuranceCompany}</div>
        </div>
        <div class="data-field">
          <div class="field-label">CONTRACT#</div>
          <div class="field-value">${contractNumber}</div>
        </div>
        <div class="data-field">
          <div class="field-label">MEMBER ID</div>
          <div class="field-value">${memberID}</div>
        </div>
        <div class="data-field">
          <div class="field-label">POLICY#</div>
          <div class="field-value">${policyNumber}</div>
        </div>
        <div class="data-field">
          <div class="field-label">INSURANCE COVERAGE PLAN</div>
          <div class="field-value">${coveragePlan}</div>
        </div>
      </div>
    `;
  }

  render() {
    if (!this.isOpen) return null;

    return html`
      <div class="modal-backdrop" @click="${this.handleBackdropClick}">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title">Coverage Eligibility Verification Center</h2>
            <button class="close-button" @click="${this.close}">&times;</button>
          </div>
          
          <div class="modal-body">
            <div class="tabs">
              <div 
                class="tab ${this.activeTab === 'coverage' ? 'active' : ''}"
                @click="${() => this.setTab('coverage')}"
              >
                COVERAGE
              </div>
              <div 
                class="tab ${this.activeTab === 'benefits' ? 'active' : ''}"
                @click="${() => this.setTab('benefits')}"
              >
                BENEFITS / PLAN COPAYS
              </div>
            </div>

            ${this.activeTab === 'coverage' 
              ? html`
                  <h3>PATIENT'S INFORMATION</h3>
                  ${this.renderPatientInfo()}
                  <h3>INSURANCE INFORMATION</h3>
                  ${this.renderInsuranceInfo()}
                `
              : html`
                  <h3>BENEFITS AND PLAN COPAYS</h3>
                  <p>Benefits information will be displayed here.</p>
                `
            }
          </div>
        </div>
      </div>
    `;
  }
}

// Prevent double registration
if (!customElements.get('data-view-modal')) {
  customElements.define('data-view-modal', DataViewModal);
} 