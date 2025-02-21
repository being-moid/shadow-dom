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

  .claim-invoice {
    padding: 2rem;
    background: white;
    border: 1px solid var(--gray-200);
    border-radius: 0.5rem;
    margin: 1rem;
  }

  .invoice-header {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .invoice-title {
    text-align: center;
  }

  .invoice-title h2 {
    color: var(--gray-900);
    margin: 0;
  }

  .invoice-details {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  .provider-info,
  .patient-info,
  .insurance-info {
    padding: 1rem;
    background: var(--gray-50);
    border-radius: 0.5rem;
  }

  .provider-info h3,
  .patient-info h3,
  .insurance-info h3 {
    color: var(--gray-700);
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
  }

  .invoice-items table {
    width: 100%;
    margin: 2rem 0;
  }

  .invoice-items th {
    background: var(--gray-100);
    padding: 0.75rem;
    text-align: left;
  }

  .invoice-items td {
    padding: 0.75rem;
    border-bottom: 1px solid var(--gray-200);
  }

  .text-right {
    text-align: right;
    font-weight: 500;
  }

  .grand-total {
    font-weight: 600;
    font-size: 1.1em;
    background: var(--gray-50);
  }

  .invoice-footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--gray-200);
  }

  .diagnosis-info,
  .practitioner-info {
    padding: 1rem;
    background: var(--gray-50);
    border-radius: 0.5rem;
  }

  .diagnosis-info h3,
  .practitioner-info h3 {
    color: var(--gray-700);
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
  }

  .careteam-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .member-card {
    background: white;
    border: 1px solid var(--gray-200);
    border-radius: 0.5rem;
    padding: 1.25rem;
    transition: all 0.2s;
  }

  .member-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--gray-100);
  }

  .member-role {
    font-weight: 600;
    color: var(--primary);
    font-size: 1.1rem;
  }

  .member-content {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .member-id {
    font-weight: 500;
    color: var(--gray-900);
  }

  .member-qualification {
    font-size: 0.875rem;
    color: var(--gray-700);
  }

  .member-specialty {
    font-size: 0.875rem;
    color: var(--gray-700);
  }

  .medications-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .medication-card {
    background: white;
    border: 1px solid var(--gray-200);
    border-radius: 0.5rem;
    padding: 1.25rem;
    transition: all 0.2s;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .medication-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .medication-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--gray-100);
  }

  .medication-code {
    font-weight: 600;
    color: var(--primary);
    font-size: 1.1rem;
  }

  .medication-status {
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
    background: var(--gray-100);
    color: var(--gray-700);
  }

  .medication-content {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .medication-content .detail-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .medication-instructions {
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--gray-100);
  }

  .medication-instructions .value {
    margin-top: 0.25rem;
    font-size: 0.875rem;
    color: var(--gray-600);
    line-height: 1.5;
  }

  .invoice-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
  }

  .submit-claim-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: var(--primary, #8500d8);
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .submit-claim-button:hover {
    background: var(--primary-dark, #6a00ad);
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .submit-claim-button:active {
    transform: translateY(0);
  }

  .button-icon {
    width: 1.25rem;
    height: 1.25rem;
    stroke-width: 2;
  }

  .notification {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    background: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 0.75rem;
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
  }

  .notification.success {
    background: #10B981;
    color: white;
  }

  .notification.error {
    background: #EF4444;
    color: white;
  }

  .notification.info {
    background: #3B82F6;
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
`;

export class PriorAuthGrid extends LitElement {
  static get properties() {
    return {
      priorAuths: { type: Array },
      loading: { type: Boolean },
      activeClaimTab: { type: String },
      selectedClaimView: { type: Object }
    };
  }

  static get styles() {
    return [componentStyles, css`
      .claim-container {
        background: var(--gray-50);
        border-radius: 0.75rem;
        overflow: hidden;
        margin: 1rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }

      .claim-tabs {
        display: flex;
        background: white;
        padding: 1rem 1rem 0;
        border-bottom: 1px solid var(--gray-200);
        gap: 0.5rem;
      }

      .tab-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.25rem;
        border: none;
        background: transparent;
        color: var(--gray-600);
        border-radius: 0.5rem 0.5rem 0 0;
        cursor: pointer;
        transition: all 0.2s;
      }

      .tab-button:hover {
        background: var(--gray-50);
        color: var(--gray-900);
      }

      .tab-button.active {
        background: var(--primary);
        color: white;
      }

      .tab-icon {
        width: 1.25rem;
        height: 1.25rem;
      }

      .claim-content {
        padding: 1.5rem;
        background: white;
      }

      .modern-invoice {
        max-width: 1200px;
        margin: 0 auto;
      }

      .invoice-branding {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .invoice-logo {
        width: 3rem;
        height: 3rem;
        color: var(--primary);
      }

      .invoice-info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
        margin: 2rem 0;
      }

      .info-card {
        background: var(--gray-50);
        border-radius: 0.5rem;
        padding: 1.5rem;
        border: 1px solid var(--gray-200);
      }

      .card-header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1rem;
      }

      .card-icon {
        width: 1.5rem;
        height: 1.5rem;
        color: var(--primary);
      }

      .modern-table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        margin: 2rem 0;
      }

      .modern-table th {
        background: var(--gray-50);
        padding: 1rem;
        text-align: left;
        font-weight: 600;
        color: var(--gray-700);
      }

      .modern-table td {
        padding: 1rem;
        border-bottom: 1px solid var(--gray-100);
      }

      .modern-table tfoot tr {
        background: var(--gray-50);
      }

      .modern-table tfoot td {
        padding: 1rem;
        font-weight: 600;
      }

      .coverage-grid,
      .procedures-grid,
      .diagnosis-grid,
      .careteam-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-top: 1.5rem;
      }

      .coverage-item,
      .procedure-card,
      .diagnosis-card,
      .member-card {
        background: white;
        border: 1px solid var(--gray-200);
        border-radius: 0.5rem;
        padding: 1.25rem;
        transition: all 0.2s;
      }

      .coverage-item:hover,
      .procedure-card:hover,
      .diagnosis-card:hover,
      .member-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }

      .section-header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 1.5rem;
      }

      .section-icon {
        width: 1.75rem;
        height: 1.75rem;
        color: var(--primary);
      }

      .label {
        display: block;
        font-size: 0.875rem;
        color: var(--gray-500);
        margin-bottom: 0.25rem;
      }

      .value {
        font-weight: 500;
        color: var(--gray-900);
      }

      .status-badge {
        display: inline-flex;
        align-items: center;
        padding: 0.375rem 0.75rem;
        border-radius: 9999px;
        font-size: 0.875rem;
        font-weight: 500;
        background: var(--primary);
        color: white;
      }
    `];
  }

  constructor() {
    super();
    this.priorAuths = [];
    this.loading = true;
    this.activeClaimTab = 'invoice';
    this.selectedClaimView = null;
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
        // Sort the prior auths by date in descending order (newest first)
        this.priorAuths = data.dynamicResult.sort((a, b) => {
          const requestA = JSON.parse(a.customEndpointRequest);
          const requestB = JSON.parse(b.customEndpointRequest);
          const dateA = new Date(requestA.CreatedDate || requestA.RequestDate || 0);
          const dateB = new Date(requestB.CreatedDate || requestB.RequestDate || 0);
          return dateB - dateA;
        });
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

  renderClaimTabs(request) {
    return html`
      <div class="claim-tabs">
        <button 
          class="tab-button ${this.activeClaimTab === 'invoice' ? 'active' : ''}"
          @click=${() => this.activeClaimTab = 'invoice'}>
          <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 17h6m-6-4h6m-6-4h6M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" stroke-width="2" stroke-linecap="round"/>
          </svg>
          Invoice
        </button>
        <button 
          class="tab-button ${this.activeClaimTab === 'coverage' ? 'active' : ''}"
          @click=${() => this.activeClaimTab = 'coverage'}>
          <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke-width="2" stroke-linecap="round"/>
          </svg>
          Coverage
        </button>
        <button 
          class="tab-button ${this.activeClaimTab === 'procedures' ? 'active' : ''}"
          @click=${() => this.activeClaimTab = 'procedures'}>
          <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" stroke-linecap="round"/>
          </svg>
          Procedures
        </button>
        <button 
          class="tab-button ${this.activeClaimTab === 'diagnosis' ? 'active' : ''}"
          @click=${() => this.activeClaimTab = 'diagnosis'}>
          <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 5a2 2 0 012 2h2a2 2 0 012-2" stroke-width="2" stroke-linecap="round"/>
          </svg>
          Diagnosis
        </button>
        <button 
          class="tab-button ${this.activeClaimTab === 'medications' ? 'active' : ''}"
          @click=${() => this.activeClaimTab = 'medications'}>
          <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" stroke-width="2" stroke-linecap="round"/>
          </svg>
          Medications
        </button>
        <button 
          class="tab-button ${this.activeClaimTab === 'careteam' ? 'active' : ''}"
          @click=${() => this.activeClaimTab = 'careteam'}>
          <svg class="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" stroke-width="2" stroke-linecap="round"/>
          </svg>
          Care Team
        </button>
      </div>
    `;
  }

  renderClaimContent(request) {
    switch(this.activeClaimTab) {
      case 'invoice':
        return this.renderInvoice(request);
      case 'coverage':
        return this.renderCoverage(request);
      case 'procedures':
        return this.renderProcedures(request);
      case 'diagnosis':
        return this.renderDiagnosis(request);
      case 'medications':
        return this.renderMedications(request);
      case 'careteam':
        return this.renderCareTeam(request);
      default:
        return this.renderInvoice(request);
    }
  }

  async handleClaimSubmit(request) {
    try {
      const response = await fetch(API_ENDPOINTS.PREAUTHORIZATION.DENTAL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error('Failed to submit claim');
      }

      const result = await response.json();
      this.showNotification('Claim submitted successfully', 'success');
      return result;
    } catch (error) {
      console.error('Error submitting claim:', error);
      this.showNotification('Failed to submit claim: ' + error.message, 'error');
      throw error;
    }
  }

  showNotification(message, type = 'info') {
    this.dispatchEvent(new CustomEvent('notification', {
      detail: { message, type },
      bubbles: true,
      composed: true
    }));
  }

  renderInvoice(request) {
    const procedures = request.Procedures || [];
    const totalAmount = procedures.reduce((sum, proc) => sum + proc.UnitPrice, 0);
    const vatRate = 0.15;
    const vatAmount = totalAmount * vatRate;
    const grandTotal = totalAmount + vatAmount;

    return html`
      <div class="modern-invoice">
        <div class="invoice-header">
          <div class="invoice-branding">
            <svg class="invoice-logo" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 14l9-5-9-5-9 5 9 5z" stroke-width="2" stroke-linecap="round"/>
              <path d="M12 14l9-5-9-5-9 5 9 5z" stroke-width="2" stroke-linecap="round" transform="translate(0 6)"/>
            </svg>
            <div class="invoice-title">
              <h2>Dental Claim Invoice</h2>
              <p class="invoice-number">Request ID: ${request.RequestId}</p>
            </div>
          </div>
          <div class="invoice-actions">
            <button 
              class="submit-claim-button" 
              @click=${() => this.handleClaimSubmit(request)}
            >
              <svg class="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 5a2 2 0 012 2h2a2 2 0 012-2" stroke-width="2"/>
              </svg>
              Submit for Claim
            </button>
          </div>
        </div>

        <div class="invoice-info-grid">
          <div class="info-card provider">
            <div class="card-header">
              <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2"/>
                <path d="M9 10h.01M15 10h.01M9.75 15h4.5" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <h3>Provider</h3>
            </div>
            <div class="card-content">
              <p class="name">${request.ProviderLicense.Name}</p>
              <p class="detail">License: ${request.ProviderLicense.LicenseNumber}</p>
              <p class="detail">System: ${request.ProviderLicense.System}</p>
            </div>
          </div>

          <div class="info-card patient">
            <div class="card-header">
              <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <h3>Patient</h3>
            </div>
            <div class="card-content">
              <p class="name">${request.Patient.FirstName} ${request.Patient.LastName}</p>
              <p class="detail">ID: ${request.Patient.Identifier}</p>
              <p class="detail">Phone: ${request.Patient.PhoneNumber}</p>
            </div>
          </div>

          <div class="info-card insurance">
            <div class="card-header">
              <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <h3>Insurance</h3>
            </div>
            <div class="card-content">
              <p class="name">${request.PayerLicense.Name}</p>
              <p class="detail">Plan: ${request.Coverage.PlanName}</p>
              <p class="detail">Member ID: ${request.Coverage.MemberId}</p>
            </div>
          </div>
        </div>

        <div class="invoice-items">
          <table class="modern-table">
            <thead>
              <tr>
                <th>Procedure</th>
                <th>Tooth</th>
                <th>Surface</th>
                <th>Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${procedures.map(proc => html`
                <tr>
                  <td>
                    <div class="procedure-info">
                      <span class="procedure-code">${proc.ProcedureCode}</span>
                      <span class="procedure-system">${proc.ProcedureSystem}</span>
                    </div>
                  </td>
                  <td>${proc.ToothCode || 'N/A'}</td>
                  <td>${proc.ToothSiteCode || 'N/A'}</td>
                  <td>${new Date(proc.ServiceDate).toLocaleDateString()}</td>
                  <td class="amount">SAR ${proc.UnitPrice.toFixed(2)}</td>
                </tr>
              `)}
            </tbody>
            <tfoot>
              <tr class="subtotal">
                <td colspan="4">Subtotal</td>
                <td>SAR ${totalAmount.toFixed(2)}</td>
              </tr>
              <tr class="vat">
                <td colspan="4">VAT (15%)</td>
                <td>SAR ${vatAmount.toFixed(2)}</td>
              </tr>
              <tr class="total">
                <td colspan="4">Total Amount</td>
                <td>SAR ${grandTotal.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    `;
  }

  renderCoverage(request) {
    const coverage = request.Coverage;
    return html`
      <div class="coverage-details">
        <div class="section-header">
          <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" stroke-width="2"/>
          </svg>
          <h3>Coverage Details</h3>
        </div>
        <div class="coverage-grid">
          <div class="coverage-item">
            <span class="label">Policy Holder ID</span>
            <span class="value">${coverage.PolicyHolderId}</span>
          </div>
          <div class="coverage-item">
            <span class="label">Coverage Type</span>
            <span class="value">${coverage.CoverageTypeDisplay}</span>
          </div>
          <div class="coverage-item">
            <span class="label">Member ID</span>
            <span class="value">${coverage.MemberId}</span>
          </div>
          <div class="coverage-item">
            <span class="label">Plan Name</span>
            <span class="value">${coverage.PlanName}</span>
          </div>
          <div class="coverage-item">
            <span class="label">Network</span>
            <span class="value">${coverage.Network}</span>
          </div>
          <div class="coverage-item">
            <span class="label">Valid From</span>
            <span class="value">${new Date(coverage.CoverageStartDate).toLocaleDateString()}</span>
          </div>
          <div class="coverage-item">
            <span class="label">Valid To</span>
            <span class="value">${new Date(coverage.CoverageEndDate).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    `;
  }

  renderProcedures(request) {
    const procedures = request.Procedures || [];
    return html`
      <div class="procedures-details">
        <div class="section-header">
          <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2"/>
          </svg>
          <h3>Dental Procedures</h3>
        </div>
        <div class="procedures-grid">
          ${procedures.map(proc => html`
            <div class="procedure-card">
              <div class="procedure-header">
                <span class="procedure-code">${proc.ProcedureCode}</span>
                <span class="procedure-date">${new Date(proc.ServiceDate).toLocaleDateString()}</span>
              </div>
              <div class="procedure-details">
                <div class="detail-item">
                  <span class="label">Tooth</span>
                  <span class="value">${proc.ToothCode || 'N/A'}</span>
                </div>
                <div class="detail-item">
                  <span class="label">Surface</span>
                  <span class="value">${proc.ToothSiteCode || 'N/A'}</span>
                </div>
                <div class="detail-item">
                  <span class="label">Amount</span>
                  <span class="value">SAR ${proc.UnitPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          `)}
        </div>
      </div>
    `;
  }

  renderDiagnosis(request) {
    const diagnoses = request.Diagnoses || [];
    return html`
      <div class="diagnosis-details">
        <div class="section-header">
          <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 5a2 2 0 012 2h2a2 2 0 012-2" stroke-width="2"/>
          </svg>
          <h3>Diagnosis Information</h3>
        </div>
        <div class="diagnosis-grid">
          ${diagnoses.map(diag => html`
            <div class="diagnosis-card">
              <div class="diagnosis-header">
                <span class="diagnosis-code">${diag.Code}</span>
                <span class="diagnosis-type">${diag.Type}</span>
              </div>
              <div class="diagnosis-content">
                <p class="diagnosis-display">${diag.Display}</p>
                <p class="diagnosis-system">${diag.System}</p>
              </div>
            </div>
          `)}
        </div>
      </div>
    `;
  }

  renderMedications(request) {
    const medications = request.Medications || [];
    return html`
      <div class="medications-details">
        <div class="section-header">
          <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" stroke-width="2"/>
          </svg>
          <h3>Medications</h3>
        </div>
        <div class="medications-grid">
          ${medications.map(med => html`
            <div class="medication-card">
              <div class="medication-header">
                <span class="medication-code">${med.Code}</span>
                <span class="medication-status">${med.Status}</span>
              </div>
              <div class="medication-content">
                <div class="detail-item">
                  <span class="label">Name</span>
                  <span class="value">${med.Display}</span>
                </div>
                <div class="detail-item">
                  <span class="label">Dosage</span>
                  <span class="value">${med.Dosage || 'N/A'}</span>
                </div>
                <div class="detail-item">
                  <span class="label">Frequency</span>
                  <span class="value">${med.Frequency || 'N/A'}</span>
                </div>
                <div class="detail-item">
                  <span class="label">Duration</span>
                  <span class="value">${med.Duration || 'N/A'}</span>
                </div>
                ${med.Instructions ? html`
                  <div class="medication-instructions">
                    <span class="label">Instructions</span>
                    <p class="value">${med.Instructions}</p>
                  </div>
                ` : ''}
              </div>
            </div>
          `)}
        </div>
      </div>
    `;
  }

  renderCareTeam(request) {
    const careTeam = request.CareTeam || [];
    return html`
      <div class="careteam-details">
        <div class="section-header">
          <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" stroke-width="2"/>
          </svg>
          <h3>Care Team Members</h3>
        </div>
        <div class="careteam-grid">
          ${careTeam.map(member => html`
            <div class="member-card">
              <div class="member-header">
                <span class="member-role">${member.Role}</span>
              </div>
              <div class="member-content">
                <p class="member-id">ID: ${member.PractitionerId}</p>
                <p class="member-qualification">${member.Qualification}</p>
                <p class="member-specialty">${member.Specialty}</p>
              </div>
            </div>
          `)}
        </div>
      </div>
    `;
  }

  renderClaimInvoice(priorAuth) {
    const request = JSON.parse(priorAuth.customEndpointRequest);
    
    return html`
      <div class="claim-container">
        ${this.renderClaimTabs(request)}
        <div class="claim-content">
          ${this.renderClaimContent(request)}
        </div>
      </div>
    `;
  }

  render() {
    // If we're in claim view mode, only show the claim details
    if (this.selectedClaimView) {
      const request = JSON.parse(this.selectedClaimView.customEndpointRequest);
      return html`
        <div class="claim-container">
          ${this.renderClaimTabs(request)}
          <div class="claim-content">
            ${this.renderClaimContent(request)}
          </div>
        </div>
      `;
    }

    // Otherwise show the grid view
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
                          ID: ${customRequest.Patient.Identifier}<br>
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
                          Plan: ${customRequest.Coverage.PlanName}<br>
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
                    
                      <button class="action-button" @click=${() => this.viewClaim(auth)}>
                        Convert to Claim
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

  viewClaim(auth) {
    this.dispatchEvent(new CustomEvent('view-claim', {
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