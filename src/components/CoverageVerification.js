import { LitElement, html, css, unsafeCSS } from 'lit';
import './PatientSearch.js';
import nphiesLogo from '../styles/nphies.png';
import avatarImage from '../styles/avatar.png';
import avatarBarcode from '../styles/avatar-barcode.png';
import userIcon from '../styles/user.svg';
import shieldIcon from '../styles/shield.svg';

const componentStyles = css`
  :host {
    display: block;
    font-family: system-ui, -apple-system, sans-serif;
  }

  .wrapper {
    background: white;
    border-radius: 0.75rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  }

  .header {
    background: #463AA1;
    color: white;
    padding: 1.5rem 2rem;
    font-size: 1.75rem;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-left-radius: 0.75rem;
    border-top-right-radius: 0.75rem;
  }

  .nphies-logo {
    width: 140px;
    height: auto;
    content: url('${unsafeCSS(nphiesLogo)}');
  }

  .tabs {
    display: flex;
    background: #463AA1;
    padding: 0 2rem;
  }

  .tab {
    padding: 1rem 2.5rem;
    color: white;
    cursor: pointer;
    background: transparent;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .tab.active {
    background: white;
    color: #463AA1;
  }

  .content {
    padding: 2rem 2rem 2rem 0;
    background: white;
    border-bottom-left-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
    position: relative;
  }

  .search-wrapper {
    padding-left: 2rem;
    width: 100%;
    max-width: 960px;
  }

  .patient-info {
    padding-left: 2rem;
    padding-right: 2rem;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 3rem;
    margin-bottom: 3rem;
    align-items: start;
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .images-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .info-field {
    background: white;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid #E5E7EB;
  }

  .field-label {
    font-size: 0.75rem;
    color: #6B7280;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-transform: uppercase;
  }

  .field-value {
    font-size: 0.875rem;
    color: #111827;
    font-weight: 600;
    text-transform: uppercase;
  }

  .avatar {
    width: 140px;
    height: 140px;
    border-radius: 0.5rem;
    content: url('${unsafeCSS(avatarImage)}');
    object-fit: cover;
  }

  .barcode {
    width: 140px;
    height: auto;
    content: url('${unsafeCSS(avatarBarcode)}');
    object-fit: contain;
  }

  .verify-button {
    margin: 2rem 2rem 0 auto;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 2.5rem;
    background: #463AA1;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 600;
    text-transform: uppercase;
    transition: all 0.2s ease;
    position: relative;
  }

  .verify-button:disabled {
    background: #6B7280;
    cursor: default;
  }

  .verify-button .loader {
    width: 1.25rem;
    height: 1.25rem;
    border: 2px solid white;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-right: 0.5rem;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .section-header {
    padding-left: 2rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .section-title {
    font-size: 1rem;
    font-weight: 600;
    color: #111827;
    text-transform: uppercase;
    margin: 0;
  }

  .verified-badge {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.5rem;
    background: #DEF7EC;
    color: #03543F;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .verified-badge svg {
    width: 0.875rem;
    height: 0.875rem;
  }

  .company-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .company-icon {
    width: 1.5rem;
    height: 1.5rem;
    content: url('${unsafeCSS(shieldIcon)}');
  }

  .insurance-grid {
    padding-left: 2rem;
    padding-right: 2rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .coverage-details-grid {
    padding-left: 2rem;
    padding-right: 2rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .animate-in {
    animation: slideIn 0.3s ease-out forwards;
  }

  .mapping-status {
    margin-left: 0.5rem;
  }

  .benefits-mapping-grid {
    padding: 0 2rem;
  }

  .mapping-row {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 1.5rem;
    padding: 1rem;
    border: 1px solid #E5E7EB;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    background: white;
  }

  .service-type {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .benefit-selector select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #E5E7EB;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    min-height: 100px;
  }

  .benefit-selector option {
    padding: 0.5rem;
    border-bottom: 1px solid #F3F4F6;
  }

  .total-allowed {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-end;
  }

  .total-allowed .field-value {
    font-size: 1.125rem;
    color: #059669;
  }

  .mapped-benefits-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .mapped-benefit {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    background: #F9FAFB;
    border-radius: 0.25rem;
    font-size: 0.875rem;
  }

  .mapped-benefit span:last-child {
    color: #059669;
    font-weight: 600;
  }

  .benefits-grid {
    padding: 0 2rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .primary-button {
    background: #059669;
  }

  .primary-button:hover {
    background: #047857;
  }

  .map-benefits-button {
    margin: 1rem 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 2.5rem;
    background: #059669;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 600;
    text-transform: uppercase;
    transition: all 0.2s ease;
  }

  .map-benefits-button:hover {
    background: #047857;
  }
`;

export class CoverageVerification extends LitElement {
  static get properties() {
    return {
      activeTab: { type: String },
      selectedPatient: { type: Object },
      insuranceInfo: { type: Object },
      isVerifying: { type: Boolean },
      isVerified: { type: Boolean },
      coverageDetails: { type: Object },
      serviceTypes: { type: Array },
      mappedBenefits: { type: Object },
      availableBenefits: { type: Array },
      isMappingComplete: { type: Boolean }
    };
  }

  static get styles() {
    return componentStyles;
  }

  constructor() {
    super();
    this.activeTab = 'coverage';
    this.selectedPatient = null;
    this.isVerifying = false;
    this.isVerified = false;
    this.isMappingComplete = false;
    this.serviceTypes = [
      { id: 1, name: 'E & M Codes', mapped: [] },
      { id: 2, name: 'CPT Services', mapped: [] },
      { id: 3, name: 'Laboratory', mapped: [] },
      { id: 4, name: 'Radiology', mapped: [] },
      { id: 5, name: 'Dental', mapped: [] },
      { id: 6, name: 'HCPCS', mapped: [] },
      { id: 7, name: 'Room & Board', mapped: [] },
      { id: 8, name: 'Pharmacy', mapped: [] },
      { id: 9, name: 'HA Service Codes', mapped: [] },
      { id: 10, name: 'DRG', mapped: [] },
      { id: 11, name: 'Kitchen Services', mapped: [] },
      { id: 12, name: 'Endoscopy', mapped: [] },
      { id: 13, name: 'Orthodontic', mapped: [] },
      { id: 14, name: 'Maternity', mapped: [] },
      { id: 15, name: 'Surgical Packages', mapped: [] }
    ];
    
    // Mock available benefits from insurance
    this.availableBenefits = [
      { id: 1, name: 'General Consultation', description: 'Basic medical consultation', allowed: 100 },
      { id: 2, name: 'Specialist Visit', description: 'Consultation with specialist', allowed: 200 },
      { id: 3, name: 'Blood Test', description: 'Complete blood count', allowed: 150 },
      { id: 4, name: 'X-Ray', description: 'Basic radiological examination', allowed: 300 },
      { id: 5, name: 'Dental Cleaning', description: 'Basic dental hygiene', allowed: 250 },
      // Add more mock benefits as needed
    ];

    this.mappedBenefits = {};
    this.insuranceInfo = {
      company: 'ADAMJEEE',
      contractNumber: 'WALEED ALHURSHID',
      memberID: 'WALEED ALHURSHID',
      policyNumber: 'WALEED ALHURSHID',
      coveragePlan: 'WALEED ALHURSHID'
    };
    this.coverageDetails = {
      type: 'Primary',
      dependent: 'No',
      relationship: 'Self',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      payorReference: 'REF123456',
      groupNumber: 'GRP789',
      groupName: 'Standard Group',
      planNumber: 'PLN456',
      planName: 'Premium Health Plan',
      network: 'In-Network',
      subrogation: 'Not Covered'
    };
  }

  handlePatientSelected(e) {
    this.selectedPatient = e.detail;
  }

  switchTab(tab) {
    this.activeTab = tab;
  }

  async handleVerify() {
    this.isVerifying = true;
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.isVerifying = false;
    this.isVerified = true;
  }

  startBenefitMapping() {
    this.activeTab = 'benefits';
  }

  handleBenefitMapping(serviceTypeId, selectedBenefits) {
    this.serviceTypes = this.serviceTypes.map(type => {
      if (type.id === serviceTypeId) {
        return {
          ...type,
          mapped: selectedBenefits
        };
      }
      return type;
    });

    this.requestUpdate();
  }

  calculateTotalAllowed(mappedBenefits) {
    return mappedBenefits.reduce((sum, benefit) => sum + benefit.allowed, 0);
  }

  renderPatientInfo() {
    if (!this.selectedPatient) return null;

    return html`
      <div class="patient-info">
        <div class="info-grid">
          <div class="info-field">
            <div class="field-label">
              <img src="${userIcon}" class="user-icon" alt="">
              FULL NAME
            </div>
            <div class="field-value">${this.selectedPatient.name}</div>
          </div>
          <div class="info-field">
            <div class="field-label">
              <img src="${userIcon}" class="user-icon" alt="">
              PATIENT TYPE
            </div>
            <div class="field-value">SELF PAY</div>
          </div>
        </div>
        <div class="images-container">
          <img src="${avatarImage}" class="avatar" alt="Patient Photo">
          <img src="${avatarBarcode}" class="barcode" alt="Barcode">
        </div>
      </div>
    `;
  }

  renderInsuranceInfo() {
    return html`
      <div class="section-header">
        <h3 class="section-title">INSURANCE INFORMATION</h3>
        ${this.isVerified ? html`
          <div class="verified-badge">
            <svg viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            Verified
          </div>
        ` : null}
      </div>
      <div class="insurance-grid">
        <div class="info-field">
          <div class="field-label">INSURANCE COMPANY</div>
          <div class="company-info">
            <img class="company-icon" alt="">
            <div class="field-value">${this.insuranceInfo.company}</div>
          </div>
        </div>
        <div class="info-field">
          <div class="field-label">CONTRACT#</div>
          <div class="field-value">${this.insuranceInfo.contractNumber}</div>
        </div>
        <div class="info-field">
          <div class="field-label">MEMBER ID</div>
          <div class="field-value">${this.insuranceInfo.memberID}</div>
        </div>
        <div class="info-field">
          <div class="field-label">POLICY#</div>
          <div class="field-value">${this.insuranceInfo.policyNumber}</div>
        </div>
        <div class="info-field">
          <div class="field-label">INSURANCE COVERAGE PLAN</div>
          <div class="field-value">${this.insuranceInfo.coveragePlan}</div>
        </div>
      </div>
    `;
  }

  renderCoverageDetails() {
    if (!this.isVerified) return null;

    return html`
      <div class="section-header">
        <h3 class="section-title">COVERAGE DETAILS</h3>
      </div>
      <div class="coverage-details-grid">
        <div class="info-field">
          <div class="field-label">TYPE</div>
          <div class="field-value">${this.coverageDetails.type}</div>
        </div>
        <div class="info-field">
          <div class="field-label">DEPENDENT</div>
          <div class="field-value">${this.coverageDetails.dependent}</div>
        </div>
        <div class="info-field">
          <div class="field-label">RELATIONSHIP</div>
          <div class="field-value">${this.coverageDetails.relationship}</div>
        </div>
        <div class="info-field">
          <div class="field-label">START DATE</div>
          <div class="field-value">${this.coverageDetails.startDate}</div>
        </div>
        <div class="info-field">
          <div class="field-label">END DATE</div>
          <div class="field-value">${this.coverageDetails.endDate}</div>
        </div>
        <div class="info-field">
          <div class="field-label">PAYOR REFERENCE</div>
          <div class="field-value">${this.coverageDetails.payorReference}</div>
        </div>
        <div class="info-field">
          <div class="field-label">GROUP NUMBER</div>
          <div class="field-value">${this.coverageDetails.groupNumber}</div>
        </div>
        <div class="info-field">
          <div class="field-label">GROUP NAME</div>
          <div class="field-value">${this.coverageDetails.groupName}</div>
        </div>
        <div class="info-field">
          <div class="field-label">PLAN NUMBER</div>
          <div class="field-value">${this.coverageDetails.planNumber}</div>
        </div>
        <div class="info-field">
          <div class="field-label">PLAN NAME</div>
          <div class="field-value">${this.coverageDetails.planName}</div>
        </div>
        <div class="info-field">
          <div class="field-label">NETWORK</div>
          <div class="field-value">${this.coverageDetails.network}</div>
        </div>
        <div class="info-field">
          <div class="field-label">SUBROGATION</div>
          <div class="field-value">${this.coverageDetails.subrogation}</div>
        </div>
      </div>
    `;
  }

  renderBenefitsMapping() {
    return html`
      <div class="section-header">
        <h3 class="section-title">BENEFIT MAPPING</h3>
        <div class="mapping-status">
          ${this.isMappingComplete ? html`
            <div class="verified-badge">
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              Mapped
            </div>
          ` : null}
        </div>
      </div>
      <div class="benefits-mapping-grid">
        ${this.serviceTypes.map(serviceType => html`
          <div class="mapping-row">
            <div class="service-type">
              <div class="field-label">${serviceType.name}</div>
              <div class="field-value">
                ${serviceType.mapped.length ? html`${serviceType.mapped.length} benefits mapped` : 'No benefits mapped'}
              </div>
            </div>
            <div class="benefit-selector">
              <select multiple @change="${(e) => this.handleBenefitMapping(serviceType.id, Array.from(e.target.selectedOptions).map(opt => this.availableBenefits[opt.value]))}">
                ${this.availableBenefits.map((benefit, index) => html`
                  <option value="${index}">${benefit.name} - ${benefit.description} ($${benefit.allowed})</option>
                `)}
              </select>
            </div>
            <div class="total-allowed">
              <div class="field-label">TOTAL ALLOWED</div>
              <div class="field-value">$${this.calculateTotalAllowed(serviceType.mapped)}</div>
            </div>
          </div>
        `)}
      </div>
      ${!this.isMappingComplete ? html`
        <button 
          class="map-benefits-button"
          @click="${() => this.isMappingComplete = true}"
        >
          COMPLETE MAPPING
        </button>
      ` : null}
    `;
  }

  renderMappedBenefits() {
    if (!this.isMappingComplete) return null;

    return html`
      <div class="section-header">
        <h3 class="section-title">MAPPED BENEFITS</h3>
      </div>
      <div class="benefits-grid">
        ${this.serviceTypes.filter(type => type.mapped.length > 0).map(serviceType => html`
          <div class="info-field">
            <div class="field-label">${serviceType.name}</div>
            <div class="field-value">
              <div class="mapped-benefits-list">
                ${serviceType.mapped.map(benefit => html`
                  <div class="mapped-benefit">
                    <span>${benefit.name}</span>
                    <span>$${benefit.allowed}</span>
                  </div>
                `)}
              </div>
              <div class="total-allowed">
                Total: $${this.calculateTotalAllowed(serviceType.mapped)}
              </div>
            </div>
          </div>
        `)}
      </div>
    `;
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="header">
          Coverage Eligibility Verification Center
          <img src="${nphiesLogo}" class="nphies-logo" alt="NPHIES">
        </div>
        
        <div class="tabs">
          <div class="tab ${this.activeTab === 'coverage' ? 'active' : ''}"
               @click="${() => this.switchTab('coverage')}">
            COVERAGE
          </div>
          <div class="tab ${this.activeTab === 'benefits' ? 'active' : ''}"
               @click="${() => this.switchTab('benefits')}">
            BENEFITS / PLAN COPAYS
          </div>
        </div>

        <div class="content">
          ${!this.selectedPatient ? html`
            <div class="search-wrapper">
              <patient-search @patient-selected="${this.handlePatientSelected}"></patient-search>
            </div>
          ` : html`
            <div class="animate-in">
              ${this.activeTab === 'coverage' ? html`
                ${this.renderPatientInfo()}
                ${this.renderInsuranceInfo()}
                ${this.renderCoverageDetails()}
                ${!this.isVerified ? html`
                  <button 
                    class="verify-button" 
                    @click="${this.handleVerify}"
                    ?disabled="${this.isVerifying}"
                  >
                    ${this.isVerifying ? html`
                      <div class="loader"></div>
                      VERIFYING...
                    ` : 'VERIFY'}
                  </button>
                ` : html`
                  <button 
                    class="verify-button" 
                    disabled
                  >
                    VERIFIED
                  </button>
                  ${!this.isMappingComplete ? html`
                    <button 
                      class="map-benefits-button primary-button" 
                      @click="${this.startBenefitMapping}"
                    >
                      MAP BENEFITS
                    </button>
                  ` : null}
                `}
              ` : html`
                ${this.isMappingComplete ? this.renderMappedBenefits() : this.renderBenefitsMapping()}
              `}
            </div>
          `}
        </div>
      </div>
    `;
  }
}

if (!customElements.get('coverage-verification')) {
  customElements.define('coverage-verification', CoverageVerification);
} 