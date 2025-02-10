import { LitElement, html, css, unsafeCSS } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import searchIcon from '../styles/search.svg';
import { customElement } from 'lit/decorators.js';
import API_ENDPOINTS from '@config/api.js';

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
    width: 67rem;
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
    margin-bottom: 1rem;
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

  /* New loader and no-results styles */
  .loader-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    gap: 0.5rem;
  }

  .loader {
    width: 1rem;
    height: 1rem;
    border: 2px solid #F3F4F6;
    border-top: 2px solid #463AA1;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .no-results {
    padding: 0.75rem 1.25rem;
    text-align: center;
    color: #6B7280;
    font-size: 0.875rem;
  }
`;

@customElement('patient-search')
export class PatientSearch extends LitElement {
  static get properties() {
    return {
      searchQuery: { type: String },
      suggestions: { type: Array },
      isLoading: { type: Boolean }
    };
  }

  static get styles() {
    return componentStyles;
  }

  constructor() {
    super();
    this.searchQuery = '';
    this.suggestions = [];
    this.isLoading = false;
  }

  async handleInputChange(e) {
    this.searchQuery = e.target.value.trim();
    if (this.searchQuery.length >= 3) {
      this.isLoading = true;
      try {
        const response = await fetch(API_ENDPOINTS.PATIENT.PAGED, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filters: `(pinNo|firstName|middleName|lastName|nic|cellPhoneNo)_=${this.searchQuery}`,
            page: 1,
            pageSize: 50
          })
        });
        const result = await response.json();
        if (result && result.dynamicResult) {
          this.suggestions = result.dynamicResult.map(p => ({
            ...p,
            mrn: p.pinNo,
            name: [p.firstName, p.middleName, p.lastName].filter(part => part && part.trim() !== '').join(' '),
            nationalId: p.nic,
            mobile: p.cellPhoneNo,
            fullData: p
          }));
        } else {
          this.suggestions = [];
        }
      } catch (error) {
        console.error('Error fetching patients:', error);
        this.suggestions = [];
      } finally {
        this.isLoading = false;
      }
    } else {
      this.suggestions = [];
      this.isLoading = false;
    }
    this.requestUpdate();
  }

  selectPatient(patient) {
    const fullPatientData = patient.fullData;
    const patientInsurance = fullPatientData.patientInsurances && fullPatientData.patientInsurances.length > 0 
      ? fullPatientData.patientInsurances[0] 
      : null;

    // Simple NPHIES verification - only check if insuranceCoverages exists and has items
    const isNphiesVerified = fullPatientData.insuranceCoverages && fullPatientData.insuranceCoverages.length > 0;

    const insuranceDetails = patientInsurance ? {
      company: patientInsurance.payer?.companyName || 'N/A',
      contractNumber: patientInsurance.memberId || 'N/A',
      memberID: patientInsurance.memberId || 'N/A',
      policyNumber: patientInsurance.memberId || 'N/A',
      coveragePlan: patientInsurance.fkPlan?.planName || 'N/A',
      planDetails: patientInsurance.fkPlan || null,
      contractDetails: patientInsurance.fkPlan?.fkContract || null,
      isNphiesEnabled: patientInsurance.payer?.isNphiesEnabled || false
    } : null;

    const coverageDetails = {
      type: patientInsurance ? 'Primary' : 'Self Pay',
      dependent: 'No',
      relationship: patientInsurance?.fkRelationId === 1 ? 'Self' : 'Other',
      startDate: patientInsurance?.startDate || 'N/A',
      endDate: patientInsurance?.expiryDate || 'N/A',
      payorReference: patientInsurance?.payerId || 'N/A',
      groupNumber: patientInsurance?.workCompanyId || 'N/A',
      groupName: insuranceDetails?.contractDetails?.contractName || 'N/A',
      planNumber: patientInsurance?.fkPlanId || 'N/A',
      planName: insuranceDetails?.planDetails?.planName || 'N/A',
      network: 'In-Network',
      subrogation: 'Not Covered',
      lastEligibilityVerificationDate: fullPatientData.insuranceCoverages?.length > 0 
        ? fullPatientData.insuranceCoverages[0].lastEligiblityVerifcationDate 
        : null,
      isNphiesVerified: isNphiesVerified
    };

    this.dispatchEvent(new CustomEvent('patient-selected', {
      detail: {
        ...patient,
        insuranceInfo: insuranceDetails,
        coverageDetails: coverageDetails,
        patientType: fullPatientData.patientType?.patientTypeName || 'Self Pay',
        isNphiesVerified: isNphiesVerified,
        insuranceCoverages: fullPatientData.insuranceCoverages || []
      },
      bubbles: true,
      composed: true
    }));

    this.searchQuery = '';
    this.suggestions = [];
  }

  render() {
    return html`
      <div class="search-container">
        <input
          type="text"
          class="search-input"
          placeholder="Search by patient PIN..."
          .value="${this.searchQuery}"
          @input="${this.handleInputChange}"
        >
        ${this.searchQuery.length >= 3 ? html`
          <div class="dropdown">
            ${this.isLoading
              ? html`
                  <div class="loader-container">
                    <div class="loader"></div>
                    <span>Loading...</span>
                  </div>
                `
              : this.suggestions.length
                ? html`${this.suggestions.map(patient => html`
                    <div class="search-result" @click="${() => this.selectPatient(patient)}">
                      <div class="result-info">
                        <span class="result-title">${patient.name}</span>
                        <span class="result-subtitle">MRN: ${patient.mrn}</span>
                      </div>
                      <span class="result-id">ID: ${patient.nationalId}</span>
                    </div>
                  `)}
                `
                : html``}
          </div>
        ` : null}
      </div>
    `;
  }
} 