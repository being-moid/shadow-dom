import { LitElement, html, css } from 'lit';
import { API_ENDPOINTS } from '../config/api';

// Add enums as constants
const PriorAuthenticationPostingStatus = {
  Draft: 1,
  Processing: 2,
  Cancelled: 3,
  Reapplied: 4,
  InQueue: 5,
  Rejected: 6
};

const PriorAuthenticationOutcome = {
  Completed: 0,
  Queued: 1,
  Partial: 2,
  Error: 3,
  Pending: 4,
  Rejected: 5
};

const componentStyles = css`
  :host {
    display: block;
    position: relative;
  }

  .grid-container {
    width: 100%;
    overflow-x: auto;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  }

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    min-width: 1000px;
  }

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #E5E7EB;
    vertical-align: top;
  }

  th {
    background-color: #F9FAFB;
    font-weight: 600;
    color: #374151;
    position: sticky;
    top: 0;
    z-index: 10;
    border-bottom: 2px solid #E5E7EB;
  }

  tr:nth-child(even) {
    background-color: #F9FAFB;
  }

  tr:hover {
    background-color: #F3F4F6;
  }

  .status-cell {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.375rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
    min-width: 100px;
    text-align: center;
  }

  .status-draft {
    background-color: #E5E7EB;
    color: #374151;
  }

  .status-processing {
    background-color: #DBEAFE;
    color: #1E40AF;
  }

  .status-cancelled {
    background-color: #FEE2E2;
    color: #991B1B;
  }

  .status-reapplied {
    background-color: #FEF3C7;
    color: #92400E;
  }

  .status-inqueue {
    background-color: #F3E8FF;
    color: #6B21A8;
  }

  .status-rejected {
    background-color: #FEE2E2;
    color: #991B1B;
  }

  .status-completed {
    background-color: #D1FAE5;
    color: #065F46;
  }

  .status-queued {
    background-color: #F3E8FF;
    color: #6B21A8;
  }

  .status-partial {
    background-color: #FEF3C7;
    color: #92400E;
  }

  .status-error {
    background-color: #FEE2E2;
    color: #991B1B;
  }

  .status-pending {
    background-color: #DBEAFE;
    color: #1E40AF;
  }

  .action-cell {
    display: flex;
    gap: 0.5rem;
  }

  .action-button {
    padding: 0.375rem 0.75rem;
    border-radius: 0.375rem;
    background-color: #4F46E5;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s;
  }

  .action-button:hover {
    background-color: #4338CA;
    transform: translateY(-1px);
  }

  .action-button:active {
    transform: translateY(0);
  }

  .error-list {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: #991B1B;
  }

  .error-item {
    margin-bottom: 0.25rem;
  }

  .small-text {
    font-size: 0.75rem;
    color: #6B7280;
    display: block;
  }

  .patient-info {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .patient-name {
    font-weight: 500;
    color: #111827;
  }

  .patient-details {
    font-size: 0.75rem;
    color: #6B7280;
    line-height: 1.4;
  }

  .loading-overlay {
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
  }

  .loading-spinner {
    width: 2.5rem;
    height: 2.5rem;
    border: 3px solid #E5E7EB;
    border-top-color: #4F46E5;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .empty-state {
    padding: 3rem;
    text-align: center;
    color: #6B7280;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 1024px) {
    .grid-container {
      border-radius: 0;
    }
  }
`;

export class PriorAuthGrid extends LitElement {
  static get properties() {
    return {
      priorAuths: { type: Array },
      loading: { type: Boolean }
    };
  }

  static get styles() {
    return componentStyles;
  }

  constructor() {
    super();
    this.priorAuths = [];
    this.loading = true;
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.fetchPriorAuths();
  }

  async fetchPriorAuths() {
    try {
      this.loading = true;
      const response = await fetch(API_ENDPOINTS.PREAUTHORIZATION.PAGED,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ page: 1, pageSize: 10 })
        }
      );
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

  getPostingStatusClass(status) {
    const statusMap = {
      [PriorAuthenticationPostingStatus.Draft]: 'draft',
      [PriorAuthenticationPostingStatus.Processing]: 'processing',
      [PriorAuthenticationPostingStatus.Cancelled]: 'cancelled',
      [PriorAuthenticationPostingStatus.Reapplied]: 'reapplied',
      [PriorAuthenticationPostingStatus.InQueue]: 'inqueue',
      [PriorAuthenticationPostingStatus.Rejected]: 'rejected'
    };
    return `status-cell status-${statusMap[status] || 'draft'}`;
  }

  getPostingStatusText(status) {
    const statusMap = {
      [PriorAuthenticationPostingStatus.Draft]: 'Draft',
      [PriorAuthenticationPostingStatus.Processing]: 'Processing',
      [PriorAuthenticationPostingStatus.Cancelled]: 'Cancelled',
      [PriorAuthenticationPostingStatus.Reapplied]: 'Reapplied',
      [PriorAuthenticationPostingStatus.InQueue]: 'SEND FOR AUTH',
      [PriorAuthenticationPostingStatus.Rejected]: 'Rejected'
    };
    return statusMap[status] || 'Unknown';
  }

  getOutcomeStatusClass(outcome) {
    const statusMap = {
      [PriorAuthenticationOutcome.Completed]: 'completed',
      [PriorAuthenticationOutcome.Queued]: 'queued',
      [PriorAuthenticationOutcome.Partial]: 'partial',
      [PriorAuthenticationOutcome.Error]: 'error',
      [PriorAuthenticationOutcome.Pending]: 'pending',
      [PriorAuthenticationOutcome.Rejected]: 'rejected'
    };
    return `status-cell status-${statusMap[outcome] || 'pending'}`;
  }

  getOutcomeStatusText(outcome) {
    const statusMap = {
      [PriorAuthenticationOutcome.Completed]: 'Completed',
      [PriorAuthenticationOutcome.Queued]: 'Queued',
      [PriorAuthenticationOutcome.Partial]: 'Partial',
      [PriorAuthenticationOutcome.Error]: 'Error',
      [PriorAuthenticationOutcome.Pending]: 'Pending',
      [PriorAuthenticationOutcome.Rejected]: 'Rejected'
    };
    return statusMap[outcome] || 'Unknown';
  }

  parseErrors(fhirJsonResponse) {
    try {
      if (!fhirJsonResponse) return [];
      
      const response = typeof fhirJsonResponse === 'string' 
        ? JSON.parse(fhirJsonResponse)
        : fhirJsonResponse;

      if (!response) return [];

      // Handle array of error objects directly
      if (Array.isArray(response)) {
        return response.map(error => 
          typeof error === 'object' 
            ? (error.message || error.display || JSON.stringify(error))
            : String(error)
        );
      }

      // Handle FHIR response structure
      const errors = response.entry?.find(entry => 
        entry.resource?.error)?.resource?.error || [];
      
      return errors.map(error => 
        error.code?.coding?.[0]?.display || 
        error.message || 
        'Unknown error'
      );
    } catch (error) {
      console.error('Error parsing FHIR response:', error);
      return [];
    }
  }

  formatOutcome(outcome) {
    return this.getOutcomeStatusText(outcome);
  }

  render() {
    return html`
      <div class="grid-container">
        ${this.loading ? html`
          <div class="loading-overlay">
            <div class="loading-spinner"></div>
          </div>
        ` : ''}
        
        ${this.priorAuths.length === 0 && !this.loading ? html`
          <div class="empty-state">
            No prior authorizations found
          </div>
        ` : html`
          <table>
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Patient Information</th>
                <th>Provider Details</th>
                <th>Insurance</th>
                <th>Posting Status</th>
                <th>Outcome</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${this.priorAuths.map(auth => {
                const customRequest = JSON.parse(auth.customEndpointRequest);
                
                return html`
                  <tr>
                    <td>${customRequest.RequestId}</td>
                    <td>
                      <div class="patient-info">
                        <span class="patient-name">${customRequest.Patient.FirstName} ${customRequest.Patient.LastName}</span>
                        <span class="patient-details">
                          ID: ${customRequest.Patient.NationalIdentity || 'N/A'}<br>
                          DOB: ${new Date(customRequest.Patient.DateOfBirth).toLocaleDateString()}<br>
                          Gender: ${customRequest.Patient.Gender}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div class="patient-info">
                        <span class="patient-name">${customRequest.ProviderLicense.Name}</span>
                        <span class="patient-details">
                          License: ${customRequest.ProviderLicense.LicenseNumber}<br>
                          System: ${customRequest.ProviderLicense.System}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div class="patient-info">
                        <span class="patient-name">${customRequest.PayerLicense.Name}</span>
                        <span class="patient-details">
                          Plan: ${customRequest.Coverage.PlanName || 'N/A'}<br>
                          Type: ${customRequest.Coverage.CoverageTypeDisplay}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span class="${this.getPostingStatusClass(auth.postingStatus)}">
                        ${this.getPostingStatusText(auth.postingStatus)}
                      </span>
                    </td>
                    <td>
                      <div class="outcome-container">
                        <span class="${this.getOutcomeStatusClass(auth.status)}">
                          ${this.getOutcomeStatusText(auth.status)}
                        </span>
                      </div>
                    </td>
                    <td class="action-cell">
                      <button class="action-button" @click=${() => this.viewDetails(auth)}>
                        View
                      </button>
                      <button class="action-button" @click=${() => this.resubmit(auth)}>
                        Resubmit
                      </button>
                    </td>
                  </tr>
                `;
              })}
            </tbody>
          </table>
        `}
      </div>
    `;
  }

  viewDetails(auth) {
    this.dispatchEvent(new CustomEvent('view-details', {
      detail: auth,
      bubbles: true,
      composed: true
    }));
  }

  resubmit(auth) {
    this.dispatchEvent(new CustomEvent('resubmit', {
      detail: auth,
      bubbles: true,
      composed: true
    }));
  }
}

if (!customElements.get('prior-auth-grid')) {
  customElements.define('prior-auth-grid', PriorAuthGrid);
} 