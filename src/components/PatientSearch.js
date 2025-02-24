import { LitElement, html, css, unsafeCSS } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import searchIcon from '../styles/search.svg';
import { customElement } from 'lit/decorators.js';
import {API_ENDPOINTS} from '../config/api.js';

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
    border: 1px solid var(--gray-200);
    border-radius: 12px;
    background: white;
    font-size: 1rem;
    color: var(--gray-900);
    background-image: url('${unsafeCSS(searchIcon)}');
    background-repeat: no-repeat;
    background-position: 1rem center;
    background-size: 1.25rem;
    transition: all 0.2s ease;
  }

  .search-input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(133, 0, 216, 0.1);
  }

  .search-input::placeholder {
    color: var(--gray-400);
  }

  .dropdown {
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    right: 0;
    background: white;
    border: 1px solid var(--gray-200);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 100;
    max-height: 400px;
    overflow-y: auto;
  }

  .search-result {
    padding: 1.25rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    border-bottom: 1px solid var(--gray-100);
  }

  .search-result:last-child {
    border-bottom: none;
  }

  .search-result:hover {
    background-color: var(--gray-50);
  }

  .patient-avatar {
    width: 48px;
    height: 48px;
    border-radius: 24px;
    background: var(--gray-100);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary);
    font-size: 1.5rem;
    font-weight: 500;
  }

  .result-info {
    flex: 1;
  }

  .result-title {
    color: var(--gray-900);
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }

  .result-subtitle {
    color: var(--gray-600);
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .meta-icon {
    width: 16px;
    height: 16px;
    color: var(--gray-400);
  }

  .result-badges {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .badge {
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
  }

  .badge-verified {
    background-color: var(--success);
    color: white;
  }

  .badge-pending {
    background-color: var(--warning);
    color: white;
  }

  .badge-error {
    background-color: var(--error);
    color: white;
  }

  .loader-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    gap: 0.75rem;
  }

  .loader {
    width: 24px;
    height: 24px;
    border: 2px solid var(--gray-200);
    border-top: 2px solid var(--primary);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  .loader-text {
    color: var(--gray-600);
    font-size: 0.875rem;
  }

  .no-results {
    padding: 2rem;
    text-align: center;
    color: var(--gray-500);
  }

  .no-results-icon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .no-results-text {
    font-size: 0.875rem;
    margin-bottom: 0.25rem;
  }

  .no-results-subtext {
    font-size: 0.75rem;
    color: var(--gray-400);
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
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
    return [
      componentStyles,
      css`
        .result-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .result-details {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--gray-600);
          font-size: 0.875rem;
        }

        .detail-icon {
          font-size: 1rem;
        }

        .detail-label {
          font-weight: 500;
          color: var(--gray-700);
        }

        .detail-value {
          color: var(--gray-900);
        }

        .result-status {
          margin-top: 0.5rem;
        }

        .status-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .status-insured {
          background-color: var(--success);
          color: white;
        }

        .status-self-pay {
          background-color: var(--error);
          color: white;
        }

        .status-icon {
          font-size: 1rem;
        }

        .badge {
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
          background-color: var(--primary-light);
          color: white;
        }

        .badge-verified {
          background-color: var(--success);
        }

        .no-results {
          text-align: center;
          padding: 2rem;
        }

        .no-results-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: var(--gray-400);
        }

        .no-results-text {
          color: var(--gray-700);
          font-weight: 500;
          margin-bottom: 0.25rem;
        }

        .no-results-hint {
          color: var(--gray-500);
          font-size: 0.875rem;
        }
      `
    ];
  }

  constructor() {
    super();
    this.searchQuery = '';
    this.suggestions = [];
    this.isLoading = false;
  }

  render() {
    return html`
      <div class="search-container">
        <input
          type="text"
          class="search-input"
          placeholder="Search by patient PIN, name or national ID..."
          .value="${this.searchQuery}"
          @input="${this.handleInputChange}"
        >
        ${this.searchQuery.length >= 3 ? html`
          <div class="dropdown">
            ${this.isLoading ? html`
              <div class="loader-container">
                <div class="loader"></div>
                <span>Searching patients...</span>
              </div>
            ` : this.suggestions.length > 0 ? html`
              ${this.suggestions.map(patient => html`
                <div class="search-result" @click="${() => this.selectPatient(patient)}">
                  <div class="result-info">
                    <div class="result-header">
                      <span class="result-title">${this.formatPatientName(patient)}</span>
                      ${patient.patientInsurances?.length > 0 ? html`
                        <span class="badge badge-verified">✓ Insured</span>
                      ` : html`
                        <span class="badge badge-warning">Self Pay</span>
                      `}
                    </div>
                    <div class="result-details">
                      <div class="detail-item">
                        <span class="detail-icon">🏥</span>
                        <span class="detail-label">MRN:</span>
                        <span class="detail-value">${patient.pinNo}</span>
                      </div>
                      <div class="detail-item">
                        <span class="detail-icon">🪪</span>
                        <span class="detail-label">National ID:</span>
                        <span class="detail-value">${patient.nic}</span>
                      </div>
                      ${patient.cellPhoneNo ? html`
                        <div class="detail-item">
                          <span class="detail-icon">📱</span>
                          <span class="detail-label">Mobile:</span>
                          <span class="detail-value">${patient.cellPhoneNo}</span>
                        </div>
                      ` : ''}
                    </div>
                    ${patient.patientInsurances?.length > 0 ? html`
                      <div class="result-status">
                        <span class="status-tag status-insured">
                          <span class="status-icon">✓</span>
                          Insured - ${patient.patientInsurances[0].payer?.companyName || 'N/A'}
                        </span>
                      </div>
                    ` : html`
                      <div class="result-status">
                        <span class="status-tag status-self-pay">
                          <span class="status-icon">⚠</span>
                          Self Pay
                        </span>
                      </div>
                    `}
                  </div>
                </div>
              `)}
            ` : html`
              <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <div class="no-results-text">No matching patients found</div>
                <div class="no-results-hint">Try searching with a different term</div>
              </div>
            `}
          </div>
        ` : ''}
      </div>
    `;
  }

  getInitials(name) {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }

  async handleInputChange(e) {
    this.searchQuery = e.target.value.trim();
    if (this.searchQuery.length >= 3) {
      this.isLoading = true;
      try {
        const query = this.searchQuery.toString();
        const filters = /^\d+$/.test(query) ? `pinNo_=${query}` : `(pinNo|firstName|middleName|lastName|nic|cellPhoneNo)_=${query}`;
        const requestBody = JSON.stringify({
          filters,
          page: 1,
          pageSize: 50
        });

        const response = await fetch(API_ENDPOINTS.PATIENT.PAGED, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: requestBody
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
    }
    this.requestUpdate();
  }

  selectPatient(patient) {
    const fullPatientData = patient.fullData;
    const patientInsurance = fullPatientData.patientInsurances && fullPatientData.patientInsurances.length > 0 
      ? fullPatientData.patientInsurances[0] 
      : null;

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

  formatPatientName(patient) {
    const nameParts = [
      patient.firstName,
      patient.middleName,
      patient.lastName
    ].filter(part => part && part.trim() !== '');
    return nameParts.join(' ');
  }
} 