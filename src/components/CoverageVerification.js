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
    max-width: 1200px;
    margin: 0 auto;
    background: white;
    border-radius: 0.75rem;
    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  }

  .wrapper {
    background: white;
    border-radius: 0.75rem;
    position: relative;
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
    position: relative;
  }

  .close-button {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.375rem;
    transition: all 0.2s ease;
    z-index: 10;
  }

  .close-button:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  .close-button svg {
    width: 1.5rem;
    height: 1.5rem;
    stroke: currentColor;
    stroke-width: 2;
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

  .back-button {
    margin: 1rem 2rem;
    padding: 0.5rem 1rem;
    background: #F3F4F6;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 0.875rem;
  }

  .verification-form {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-section {
    background: white;
    border: 1px solid #E5E7EB;
    border-radius: 0.5rem;
    padding: 1.5rem;
  }

  .form-section h4 {
    margin: 0 0 1rem 0;
    color: #111827;
    font-size: 1rem;
    font-weight: 600;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .input-group label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
  }

  .input-group input,
  .input-group select {
    padding: 0.5rem;
    border: 1px solid #E5E7EB;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    color: #111827;
  }

  .input-group input:focus,
  .input-group select:focus {
    outline: none;
    border-color: #463AA1;
    box-shadow: 0 0 0 3px rgba(70, 58, 161, 0.1);
  }

  .secondary-button {
    background: #F3F4F6;
    color: #374151;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .secondary-button:hover {
    background: #E5E7EB;
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
      isMappingComplete: { type: Boolean },
      providerInfo: { type: Object },
      locationInfo: { type: Object },
      servicePeriod: { type: Object },
      facilities: { type: Array },
      insuranceCompanies: { type: Array },
      selectedFacility: { type: Object },
      selectedInsuranceCompany: { type: Object },
      isManualMode: { type: Boolean },
      manualFormData: { type: Object }
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

    // Initialize new properties with default values
    this.providerInfo = {
      licenseNumber: 'PR-FHIR',
      name: 'Saudi General Clinic',
      type: '5',
      active: true
    };
    
    this.locationInfo = {
      licenseNumber: 'GACH',
      name: 'Test Provider',
      active: true
    };

    this.servicePeriod = {
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString().split('T')[0] + 'T23:59:59'
    };

    // Initialize new properties
    this.facilities = [];
    this.insuranceCompanies = [];
    this.selectedFacility = null;
    this.selectedInsuranceCompany = null;
    this.isManualMode = false;
    this.manualFormData = {
      organizationLicenseNumber: '',
      locationLicenseNumber: '',
      insuranceLicenseNumber: '',
      occupation: '',
      maritalStatus: ''
    };

    // Load facilities and insurance companies
    this.loadFacilities();
    this.loadInsuranceCompanies();
  }

  async loadFacilities() {
    try {
      const response = await fetch('https://localhost:7006/api/buildingmanagementfacility/getpagedasync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters: '',
          page: 1,
          pageSize: 10
        })
      });
      const result = await response.json();
      if (result.isSuccessfull) {
        this.facilities = result.dynamicResult;
      }
    } catch (error) {
      console.error('Error loading facilities:', error);
    }
  }

  async loadInsuranceCompanies() {
    try {
      const response = await fetch('https://localhost:7006/api/insurancecompany/getpagedasync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filters: '',
          page: 1,
          pageSize: 1000
        })
      });
      const result = await response.json();
      if (result.isSuccessfull) {
        this.insuranceCompanies = result.dynamicResult;
      }
    } catch (error) {
      console.error('Error loading insurance companies:', error);
    }
  }

  handleFacilityChange(e) {
    const facilityId = e.target.value;
    this.selectedFacility = this.facilities.find(f => f.id === parseInt(facilityId));
    this.requestUpdate();
  }

  handleInsuranceCompanyChange(e) {
    const companyId = e.target.value;
    this.selectedInsuranceCompany = this.insuranceCompanies.find(c => c.id === parseInt(companyId));
    this.requestUpdate();
  }

  toggleManualMode() {
    this.isManualMode = !this.isManualMode;
    this.requestUpdate();
  }

  handleManualInputChange(e) {
    const { name, value } = e.target;
    this.manualFormData = {
      ...this.manualFormData,
      [name]: value
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
    
    try {
      const payload = this.prepareVerificationPayload();
      console.log('Verification Payload:', payload);
      
      // TODO: Add actual API call here
      // const response = await fetch('verification-endpoint', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload)
      // });
      
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      this.isVerified = true;
    } catch (error) {
      console.error('Verification failed:', error);
      // TODO: Add error handling UI
    } finally {
      this.isVerifying = false;
    }
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

  handleBack() {
    this.selectedPatient = null;
    this.isVerified = false;
    this.isMappingComplete = false;
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
            <div class="field-value">${this.selectedPatient.patientType}</div>
          </div>
          <div class="info-field">
            <div class="field-label">
              <img src="${userIcon}" class="user-icon" alt="">
              NATIONAL ID
            </div>
            <div class="field-value">${this.selectedPatient.nationalId}</div>
          </div>
          <div class="info-field">
            <div class="field-label">
              <img src="${userIcon}" class="user-icon" alt="">
              MOBILE
            </div>
            <div class="field-value">${this.selectedPatient.mobile}</div>
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
    const insuranceInfo = this.selectedPatient?.insuranceInfo;
    if (!insuranceInfo) {
      return html`
        <div class="section-header">
          <h3 class="section-title">INSURANCE INFORMATION</h3>
        </div>
        <div class="insurance-grid">
          <div class="info-field">
            <div class="field-label">STATUS</div>
            <div class="field-value">SELF PAY</div>
          </div>
        </div>
      `;
    }

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
            <div class="field-value">${insuranceInfo.company}</div>
          </div>
        </div>
        <div class="info-field">
          <div class="field-label">CONTRACT#</div>
          <div class="field-value">${insuranceInfo.contractNumber}</div>
        </div>
        <div class="info-field">
          <div class="field-label">MEMBER ID</div>
          <div class="field-value">${insuranceInfo.memberID}</div>
        </div>
        <div class="info-field">
          <div class="field-label">POLICY#</div>
          <div class="field-value">${insuranceInfo.policyNumber}</div>
        </div>
        <div class="info-field">
          <div class="field-label">INSURANCE COVERAGE PLAN</div>
          <div class="field-value">${insuranceInfo.coveragePlan}</div>
        </div>
        ${insuranceInfo.planDetails ? html`
          <div class="info-field">
            <div class="field-label">PLAN CATEGORY</div>
            <div class="field-value">${insuranceInfo.planDetails.planCategory || 'N/A'}</div>
          </div>
          <div class="info-field">
            <div class="field-label">PLAN CODE</div>
            <div class="field-value">${insuranceInfo.planDetails.planCode || 'N/A'}</div>
          </div>
          <div class="info-field">
            <div class="field-label">ANNUAL LIMIT</div>
            <div class="field-value">${insuranceInfo.planDetails.annualLimit || 'N/A'}</div>
          </div>
        ` : null}
        ${insuranceInfo.contractDetails ? html`
          <div class="info-field">
            <div class="field-label">CONTRACT NAME</div>
            <div class="field-value">${insuranceInfo.contractDetails.contractName || 'N/A'}</div>
          </div>
          <div class="info-field">
            <div class="field-label">CONTRACT DATE</div>
            <div class="field-value">${insuranceInfo.contractDetails.contractDate || 'N/A'}</div>
          </div>
        ` : null}
      </div>
    `;
  }

  renderCoverageDetails() {
    if (!this.isVerified || !this.selectedPatient?.coverageDetails) return null;

    const coverageDetails = this.selectedPatient.coverageDetails;
    return html`
      <div class="section-header">
        <h3 class="section-title">COVERAGE DETAILS</h3>
      </div>
      <div class="coverage-details-grid">
        <div class="info-field">
          <div class="field-label">TYPE</div>
          <div class="field-value">${coverageDetails.type}</div>
        </div>
        <div class="info-field">
          <div class="field-label">DEPENDENT</div>
          <div class="field-value">${coverageDetails.dependent}</div>
        </div>
        <div class="info-field">
          <div class="field-label">RELATIONSHIP</div>
          <div class="field-value">${coverageDetails.relationship}</div>
        </div>
        <div class="info-field">
          <div class="field-label">START DATE</div>
          <div class="field-value">${coverageDetails.startDate}</div>
        </div>
        <div class="info-field">
          <div class="field-label">END DATE</div>
          <div class="field-value">${coverageDetails.endDate}</div>
        </div>
        <div class="info-field">
          <div class="field-label">PAYOR REFERENCE</div>
          <div class="field-value">${coverageDetails.payorReference}</div>
        </div>
        <div class="info-field">
          <div class="field-label">GROUP NUMBER</div>
          <div class="field-value">${coverageDetails.groupNumber}</div>
        </div>
        <div class="info-field">
          <div class="field-label">GROUP NAME</div>
          <div class="field-value">${coverageDetails.groupName}</div>
        </div>
        <div class="info-field">
          <div class="field-label">PLAN NUMBER</div>
          <div class="field-value">${coverageDetails.planNumber}</div>
        </div>
        <div class="info-field">
          <div class="field-label">PLAN NAME</div>
          <div class="field-value">${coverageDetails.planName}</div>
        </div>
        <div class="info-field">
          <div class="field-label">NETWORK</div>
          <div class="field-value">${coverageDetails.network}</div>
        </div>
        <div class="info-field">
          <div class="field-label">SUBROGATION</div>
          <div class="field-value">${coverageDetails.subrogation}</div>
        </div>
        ${coverageDetails.lastEligibilityVerificationDate ? html`
          <div class="info-field">
            <div class="field-label">LAST ELIGIBILITY CHECK</div>
            <div class="field-value">${new Date(coverageDetails.lastEligibilityVerificationDate).toLocaleDateString()}</div>
          </div>
        ` : null}
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

  renderVerificationForm() {
    const hasInsurance = this.selectedPatient?.insuranceInfo;
    const facility = this.selectedFacility;
    
    return html`
      <div class="verification-form">
        <div class="form-section">
          <h4>Facility Information</h4>
          <div class="form-group">
            <label>Select Facility</label>
            <select @change="${this.handleFacilityChange}">
              <option value="">Select a facility...</option>
              ${this.facilities.map(f => html`
                <option value="${f.id}">${f.facilityName}</option>
              `)}
            </select>
          </div>
          
          ${facility && (!facility.lisenceNo || !facility.dhausername) ? html`
            <div class="form-group">
              ${!facility.lisenceNo ? html`
                <div class="input-group">
                  <label>Organization License Number</label>
                  <input 
                    type="text"
                    name="organizationLicenseNumber"
                    .value="${this.manualFormData.organizationLicenseNumber}"
                    @input="${this.handleManualInputChange}"
                  >
                </div>
              ` : null}
              ${!facility.dhausername ? html`
                <div class="input-group">
                  <label>Location License Number</label>
                  <input 
                    type="text"
                    name="locationLicenseNumber"
                    .value="${this.manualFormData.locationLicenseNumber}"
                    @input="${this.handleManualInputChange}"
                  >
                </div>
              ` : null}
            </div>
          ` : null}
        </div>

        <div class="form-section">
          <h4>Insurance Information</h4>
          ${hasInsurance && !this.isManualMode ? html`
            <div class="form-group">
              <label>Using existing insurance: ${this.selectedPatient.insuranceInfo.company}</label>
              <button @click="${this.toggleManualMode}" class="secondary-button">
                Use Different Insurance
              </button>
            </div>
          ` : html`
            <div class="form-group">
              <label>Select Insurance Company</label>
              <select @change="${this.handleInsuranceCompanyChange}">
                <option value="">Select an insurance company...</option>
                ${this.insuranceCompanies.map(c => html`
                  <option value="${c.id}">${c.companyName}</option>
                `)}
              </select>
            </div>
          `}

          ${(this.isManualMode || !hasInsurance) && this.selectedInsuranceCompany ? html`
            <div class="form-group">
              ${!this.selectedInsuranceCompany.licenseNumber ? html`
                <div class="input-group">
                  <label>Insurance License Number</label>
                  <input 
                    type="text"
                    name="insuranceLicenseNumber"
                    .value="${this.manualFormData.insuranceLicenseNumber}"
                    @input="${this.handleManualInputChange}"
                  >
                </div>
              ` : null}
            </div>
          ` : null}
        </div>

        <div class="form-section">
          <h4>Additional Patient Information</h4>
          <div class="form-group">
            <div class="input-group">
              <label>Occupation</label>
              <input 
                type="text"
                name="occupation"
                .value="${this.manualFormData.occupation}"
                @input="${this.handleManualInputChange}"
                placeholder="Required for verification"
              >
            </div>
            <div class="input-group">
              <label>Marital Status</label>
              <select 
                name="maritalStatus"
                .value="${this.manualFormData.maritalStatus}"
                @change="${this.handleManualInputChange}"
              >
                <option value="">Select status...</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h4>Service Period</h4>
          <div class="form-group">
            <div class="input-group">
              <label>Start Date</label>
              <input 
                type="datetime-local"
                .value="${this.servicePeriod.startDate.split('.')[0]}"
                @change="${(e) => this.updateServicePeriod(e.target.value, this.servicePeriod.endDate)}"
              >
            </div>
            <div class="input-group">
              <label>End Date</label>
              <input 
                type="datetime-local"
                .value="${this.servicePeriod.endDate.split('.')[0]}"
                @change="${(e) => this.updateServicePeriod(this.servicePeriod.startDate, e.target.value)}"
              >
            </div>
          </div>
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <div class="wrapper">
        <div class="header">
          Coverage Eligibility Verification Center
          <img src="${nphiesLogo}" class="nphies-logo" alt="NPHIES">
          <button class="close-button" @click="${this.handleClose}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
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
              <button class="back-button" @click="${this.handleBack}">Back to Search</button>
              ${this.activeTab === 'coverage' ? html`
                ${this.renderPatientInfo()}
                ${this.renderInsuranceInfo()}
                ${this.renderVerificationForm()}
                ${!this.isVerified ? html`
                  <button 
                    class="verify-button" 
                    @click="${this.handleVerify}"
                    ?disabled="${this.isVerifying || !this.selectedFacility}"
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

  handleClose() {
    const event = new CustomEvent('close', {
      bubbles: true,
      composed: true,
      detail: { source: 'close-button' }
    });
    this.dispatchEvent(event);
  }

  prepareVerificationPayload() {
    if (!this.selectedPatient || !this.selectedFacility) return null;

    const patientData = this.selectedPatient.fullData;
    const names = this.selectedPatient.name.split(' ');
    const insuranceCompany = this.isManualMode ? this.selectedInsuranceCompany : 
                           (this.selectedPatient?.insuranceInfo ? { companyName: this.selectedPatient.insuranceInfo.company } : this.selectedInsuranceCompany);
    
    return {
      PatientInfo: {
        Id: patientData.pinNo,
        IqamaId: patientData.nic,
        FullName: this.selectedPatient.name,
        FamilyName: patientData.lastName || names[names.length - 1],
        GivenNames: [
          patientData.firstName || names[0],
          patientData.middleName || (names.length > 2 ? names.slice(1, -1).join(' ') : '')
        ].filter(Boolean),
        PhoneNumber: patientData.cellPhoneNo,
        Gender: patientData.gender?.genderName || 'Unknown',
        BirthDate: patientData.dateOfBirth,
        Occupation: this.manualFormData.occupation || 'Unknown',
        MaritalStatus: this.manualFormData.maritalStatus || patientData.maritalStatus?.status || 'Unknown'
      },
      ProviderInfo: {
        LicenseNumber: this.selectedFacility.lisenceNo || this.manualFormData.organizationLicenseNumber,
        Name: this.selectedFacility.facilityName,
        Type: this.selectedFacility.facilityType.toString(),
        Active: true
      },
      InsurerInfo: {
        LicenseNumber: insuranceCompany?.licenseNumber || this.manualFormData.insuranceLicenseNumber || 'INS-FHIR',
        Name: insuranceCompany?.companyName || 'Unknown',
        Active: true
      },
      LocationInfo: {
        LicenseNumber: this.selectedFacility.dhausername || this.manualFormData.locationLicenseNumber || 'GACH',
        Name: this.selectedFacility.facilityName,
        Active: true
      },
      ServicePeriod: this.servicePeriod
    };
  }

  updateServicePeriod(startDate, endDate) {
    this.servicePeriod = {
      startDate: startDate || new Date().toISOString(),
      endDate: endDate || new Date().toISOString().split('T')[0] + 'T23:59:59'
    };
  }
}

if (!customElements.get('coverage-verification')) {
  customElements.define('coverage-verification', CoverageVerification);
} 