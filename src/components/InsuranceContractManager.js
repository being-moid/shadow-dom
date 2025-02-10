import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import API_ENDPOINTS from '@config/api.js';
import './InsurancePlanManager.js';

@customElement('insurance-contract-manager')
export class InsuranceContractManager extends LitElement {
  static get properties() {
    return {
      insuranceCompanyId: { type: Number },
      contracts: { type: Array },
      selectedContractId: { type: String },
      selectedPlanId: { type: String },
      plans: { type: Array },
      loading: { type: Boolean },
      loadingContracts: { type: Boolean },
      loadingPlans: { type: Boolean },
      error: { type: String },
      newContract: { type: Object },
      mode: { type: String }, // 'existing' or 'new'
      insuranceCompanies: { type: Array }
    };
  }

  static styles = css`
    :host {
      display: block;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .form-container {
      background: white;
      border-radius: 0.75rem;
      padding: 2rem;
    }

    .form-section {
      margin-bottom: 2rem;
    }

    .form-section-title {
      color: #1F2937;
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0 0 1.5rem 0;
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .form-field-wrapper {
      position: relative;
      margin-bottom: 1.25rem;
    }

    .form-label {
      position: absolute;
      top: -0.75rem;
      left: 0.75rem;
      padding: 0 0.25rem;
      background: white;
      color: #6B7280;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.2s ease;
    }

    .form-input, .form-select {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #E5E7EB;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      color: #1F2937;
      background: white;
      transition: all 0.2s ease;
    }

    .form-input:focus, .form-select:focus {
      outline: none;
      border-color: #463AA1;
      box-shadow: 0 0 0 3px rgba(70, 58, 161, 0.1);
    }

    .form-input::placeholder {
      color: #9CA3AF;
    }

    .mode-toggle {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 2rem;
      padding: 1rem;
      background: #F9FAFB;
      border-radius: 0.5rem;
    }

    .toggle-switch {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 34px;
    }

    .toggle-switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .toggle-slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      transition: .4s;
      border-radius: 34px;
    }

    .toggle-slider:before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }

    input:checked + .toggle-slider {
      background-color: #463AA1;
    }

    input:checked + .toggle-slider:before {
      transform: translateX(26px);
    }

    .toggle-label {
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
    }

    .error {
      color: #EF4444;
      font-size: 0.875rem;
      margin-top: 0.5rem;
      padding: 0.5rem;
      background: #FEE2E2;
      border-radius: 0.375rem;
    }

    .success {
      color: #059669;
      font-size: 0.875rem;
      margin-top: 0.5rem;
      padding: 0.5rem;
      background: #ECFDF5;
      border-radius: 0.375rem;
    }

    .primary-button {
      background: #463AA1;
      color: white;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 0.5rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      width: 100%;
    }

    .primary-button:disabled {
      background: #9CA3AF;
      cursor: not-allowed;
    }

    .primary-button:hover:not(:disabled) {
      background: #3c319c;
      transform: translateY(-1px);
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .loading {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      border: 2px solid #E5E7EB;
      border-top-color: #463AA1;
      border-radius: 50%;
      animation: spin 0.75s linear infinite;
      margin-right: 0.5rem;
    }

    .plans-list {
      margin-top: 1.5rem;
    }

    .plan-item {
      padding: 1rem;
      border: 1px solid #E5E7EB;
      border-radius: 0.375rem;
      margin-bottom: 0.75rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .plan-item:hover {
      border-color: #463AA1;
      background: #F8FAFC;
    }

    .plan-item.selected {
      border-color: #463AA1;
      background: #EEF2FF;
    }

    .plan-item strong {
      display: block;
      color: #1F2937;
      font-size: 1rem;
      margin-bottom: 0.25rem;
    }

    .plan-item div {
      color: #6B7280;
      font-size: 0.875rem;
    }

    .skeleton {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
      border-radius: 0.375rem;
    }

    .skeleton-select {
      width: 100%;
      height: 2.75rem;
    }

    .skeleton-plan {
      height: 5rem;
      margin-bottom: 0.75rem;
    }

    @keyframes loading {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }

    .loading-overlay {
      position: relative;
      pointer-events: none;
      opacity: 0.7;
    }

    .loading-overlay::after {
      content: "";
      position: absolute;
      inset: 0;
      background: rgba(255, 255, 255, 0.5);
    }
  `;

  constructor() {
    super();
    this.insuranceCompanyId = 0;
    this.contracts = [];
    this.selectedContractId = null;
    this.selectedPlanId = null;
    this.plans = [];
    this.loading = false;
    this.loadingContracts = false;
    this.loadingPlans = false;
    this.error = null;
    this.mode = 'existing';
    this.insuranceCompanies = [];
    this.newContract = {
      fkCompanyId: 0,
      contractName: '',
      contractDate: '',
      rowStatus: 1,
      createdby: 1,
      insurancePlans: []
    };
    this.addEventListener('plan-created', this.handlePlanCreated);
  }

  async firstUpdated() {
    await this.loadInsuranceCompanies();
    if (this.insuranceCompanyId) {
      await this.fetchContracts();
    }
  }

  async loadInsuranceCompanies() {
    try {
      this.loading = true;
      const response = await fetch(API_ENDPOINTS.INSURANCE_COMPANY.PAGED,{
        headers: {
          'Content-Type': 'application/json',
        },  
        method: 'POST',    
        body: JSON.stringify({ page: 1, pageSize: 1000 })   
      });
      if (!response.ok) throw new Error('Failed to fetch insurance companies');
      const result = await response.json();
      if (result.isSuccessfull) {
        this.insuranceCompanies = result.dynamicResult;
      }
    } catch (err) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }

  async fetchContracts() {
    try {
      this.loadingContracts = true;
      this.contracts = [];
      this.selectedContractId = null;
      this.selectedPlanId = null;
      this.plans = [];
      
      const response = await fetch(API_ENDPOINTS.INSURANCE_COMPANY.CONTRACTS(this.insuranceCompanyId));
      if (!response.ok) throw new Error('Failed to fetch contracts');
      this.contracts = await response.json();
    } catch (err) {
      this.error = err.message;
    } finally {
      this.loadingContracts = false;
    }
  }

  toggleMode() {
    this.mode = this.mode === 'existing' ? 'new' : 'existing';
    this.selectedContractId = null;
    this.selectedPlanId = null;
    this.resetForm();
  }

  render() {
    return html`
      <div class="form-container">
        <div class="mode-toggle">
          <span class="toggle-label">Create New Contract</span>
          <label class="toggle-switch">
            <input 
              type="checkbox" 
              .checked=${this.mode === 'existing'}
              @change=${this.toggleMode}
            >
            <span class="toggle-slider"></span>
          </label>
          <span class="toggle-label">Use Existing Contract</span>
        </div>

        ${this.error ? html`<div class="error">${this.error}</div>` : ''}
        
        <div class="form-section">
          <h4 class="form-section-title">Insurance Company</h4>
          <div class="form-field-wrapper">
            ${this.loading ? html`
              <div class="skeleton skeleton-select"></div>
            ` : html`
              <select 
                class="form-select"
                .value=${this.insuranceCompanyId}
                @change=${e => {
                  this.insuranceCompanyId = e.target.value;
                  if (e.target.value) {
                    this.fetchContracts();
                  } else {
                    this.contracts = [];
                    this.selectedContractId = null;
                    this.selectedPlanId = null;
                    this.plans = [];
                  }
                }}
              >
                <option value="">Select Insurance Company</option>
                ${Array.isArray(this.insuranceCompanies) ? this.insuranceCompanies.map(company => html`
                  <option value=${company.id}>${company.companyName}</option>
                `) : ''}
              </select>
              <label class="form-label">Insurance Company</label>
            `}
          </div>
        </div>

        ${this.mode === 'existing' ? html`
          <div class="form-section ${!this.insuranceCompanyId ? 'loading-overlay' : ''}">
            <h4 class="form-section-title">Select Contract</h4>
            <div class="form-field-wrapper">
              ${this.loadingContracts ? html`
                <div class="skeleton skeleton-select"></div>
              ` : html`
                <select 
                  class="form-select"
                  .value=${this.selectedContractId}
                  @change=${this.handleContractSelect}
                  ?disabled=${!this.insuranceCompanyId}
                >
                  <option value="">Select Contract</option>
                  ${Array.isArray(this.contracts) ? this.contracts.map(contract => html`
                    <option value=${contract.id}>${contract.contractName}</option>
                  `) : ''}
                </select>
                <label class="form-label">Contract</label>
              `}
            </div>

            ${this.selectedContractId ? html`
              <div class="plans-list">
                <h4 class="form-section-title">Available Plans</h4>
                ${this.loadingPlans ? html`
                  <div class="skeleton skeleton-plan"></div>
                  <div class="skeleton skeleton-plan"></div>
                  <div class="skeleton skeleton-plan"></div>
                ` : html`
                  ${Array.isArray(this.plans) && this.plans.length === 0 
                    ? html`
                      <insurance-plan-manager
                        .contractId=${this.selectedContractId}
                      ></insurance-plan-manager>
                    `
                    : html`
                      ${Array.isArray(this.plans) ? this.plans.map(plan => html`
                        <div 
                          class="plan-item ${plan.id === this.selectedPlanId ? 'selected' : ''}"
                          @click=${() => this.handlePlanSelect(plan)}
                        >
                          <strong>${plan.planName}</strong>
                          <div>Code: ${plan.planCode}</div>
                          <div>Valid: ${new Date(plan.startDate).toLocaleDateString()} - ${new Date(plan.endDate).toLocaleDateString()}</div>
                        </div>
                      `) : ''}
                    `}
                `}
              </div>
            ` : ''}
          </div>
        ` : html`
          <div class="form-section ${!this.insuranceCompanyId ? 'loading-overlay' : ''}">
            <h4 class="form-section-title">Create New Contract</h4>
            <form @submit=${this.handleContractSubmit}>
              <div class="form-grid">
                <div class="form-field-wrapper">
                  <input 
                    type="text" 
                    class="form-input"
                    .value=${this.newContract.contractName}
                    @input=${e => this.newContract.contractName = e.target.value}
                    required
                    ?disabled=${!this.insuranceCompanyId}
                  />
                  <label class="form-label">Contract Name</label>
                </div>
                
                <div class="form-field-wrapper">
                  <input 
                    type="date" 
                    class="form-input"
                    .value=${this.newContract.contractDate}
                    @input=${e => this.newContract.contractDate = e.target.value}
                    required
                    ?disabled=${!this.insuranceCompanyId}
                  />
                  <label class="form-label">Contract Date</label>
                </div>
              </div>

              <insurance-plan-manager
                .contractId=${0}
                .isNewContract=${true}
                .disabled=${!this.insuranceCompanyId}
                @plan-data=${this.handlePlanData}
              ></insurance-plan-manager>

              <button 
                type="submit" 
                class="primary-button"
                ?disabled=${this.loading || this.loadingContracts || this.loadingPlans || !this.insuranceCompanyId}
              >
                ${this.loading || this.loadingContracts || this.loadingPlans ? html`
                  <span class="loading"></span>
                  Creating...
                ` : 'Create Contract & Plan'}
              </button>
            </form>
          </div>
        `}
      </div>
    `;
  }

  handlePlanData(e) {
    const planData = e.detail;
    this.newContract.insurancePlans = [{
      ...planData,
      rowStatus: 1,
      createdBy: 1,
      level: 2,
      copayAmount: planData.copayAmount || 0,
      planNameIdpayer: planData.planName,
      expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    }];
  }

  async handleContractSubmit(e) {
    e.preventDefault();
    try {
      this.loading = true;
      
      if (!this.newContract.insurancePlans || this.newContract.insurancePlans.length === 0) {
        throw new Error('Please add at least one insurance plan');
      }

      const contractPayload = {
        ...this.newContract,
        fkCompanyId: parseInt(this.insuranceCompanyId),
        rowStatus: 1,
        createdby: 1,
        insurancePlans: this.newContract.insurancePlans.map(plan => ({
          ...plan,
          rowStatus: 1,
          createdBy: 1,
          level: plan.level || 1,
          copayAmount: plan.copayAmount || 0,
          copayOnGross: plan.copayOnGross || 0,
          planNameIdpayer: plan.planNameIdpayer || plan.planName,
          expiryDate: plan.expiryDate || new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
        }))
      };

      const response = await fetch(API_ENDPOINTS.INSURANCE_CONTRACT.BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contractPayload),
      });
      
      if (!response.ok) throw new Error('Failed to create contract');
      
      const result = await response.json();
      if (result.isSuccessfull) {
        await this.fetchContracts();
        this.resetForm();
        this.handleContractSelect({ target: { value: result.dynamicResult.id } });
        
        const successEvent = new CustomEvent('show-notification', {
          bubbles: true,
          composed: true,
          detail: {
            message: 'Contract and plan created successfully',
            type: 'success'
          }
        });
        this.dispatchEvent(successEvent);
      } else {
        throw new Error(result.errorMessage || 'Failed to create contract');
      }
    } catch (err) {
      this.error = err.message;
      const errorEvent = new CustomEvent('show-notification', {
        bubbles: true,
        composed: true,
        detail: {
          message: err.message,
          type: 'error'
        }
      });
      this.dispatchEvent(errorEvent);
    } finally {
      this.loading = false;
    }
  }

  async handleContractSelect(e) {
    const contractId = e.target.value;
    this.selectedContractId = contractId;
    this.selectedPlanId = null;
    this.plans = [];
    
    if (contractId) {
      await this.fetchPlans(contractId);
      const selectedContract = this.contracts.find(c => c.id.toString() === contractId);
      this.dispatchEvent(new CustomEvent('contract-selected', {
        detail: { contract: selectedContract },
        bubbles: true,
        composed: true
      }));
    }
  }

  handlePlanSelect(plan) {
    this.selectedPlanId = plan.id;
    const selectedContract = this.contracts.find(c => c.id.toString() === this.selectedContractId);
    
    this.dispatchEvent(new CustomEvent('contract-selected', {
      detail: { 
        contract: selectedContract,
        plan: plan
      },
      bubbles: true,
      composed: true
    }));
  }

  async handlePlanCreated(e) {
    const { contractId } = e.detail;
    if (contractId === this.selectedContractId) {
      await this.fetchPlans(contractId);
    }
  }

  async fetchPlans(contractId) {
    try {
      this.loadingPlans = true;
      this.plans = [];
      
      const response = await fetch(API_ENDPOINTS.INSURANCE_COMPANY.CONTRACT_PLANS(contractId));
      if (!response.ok) throw new Error('Failed to fetch plans');
      this.plans = await response.json();
    } catch (err) {
      this.error = err.message;
    } finally {
      this.loadingPlans = false;
    }
  }

  resetForm() {
    this.newContract = {
      fkCompanyId: this.insuranceCompanyId,
      contractName: '',
      contractDate: '',
      rowStatus: 1,
      createdby: 1,
      insurancePlans: []
    };
    
    const planManager = this.shadowRoot.querySelector('insurance-plan-manager');
    if (planManager) {
      planManager.resetForm();
    }
  }
} 