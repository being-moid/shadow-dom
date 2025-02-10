import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import API_ENDPOINTS from '@config/api.js';

@customElement('insurance-plan-manager')
export class InsurancePlanManager extends LitElement {
  static get properties() {
    return {
      contractId: { type: Number },
      loading: { type: Boolean },
      error: { type: String },
      newPlan: { type: Object },
      isNewContract: { type: Boolean }
    };
  }

  static styles = css`
    :host {
      display: block;
      font-family: system-ui, -apple-system, sans-serif;
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

    .form-input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #E5E7EB;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      color: #1F2937;
      background: white;
      transition: all 0.2s ease;
    }

    .form-input:focus {
      outline: none;
      border-color: #463AA1;
      box-shadow: 0 0 0 3px rgba(70, 58, 161, 0.1);
    }

    .form-input::placeholder {
      color: #9CA3AF;
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
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
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
    }
  `;

  constructor() {
    super();
    this.contractId = 0;
    this.loading = false;
    this.error = null;
    this.isNewContract = false;
    this.newPlan = {
      planName: '',
      planCode: '',
      startDate: '',
      endDate: '',
      createdby: 1,
      rowStatus: 1
    };
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (!this.isNewContract && !this.contractId) {
      this.error = 'No contract selected';
      return;
    }

    try {
      this.loading = true;

      if (this.isNewContract) {
        // For new contracts, emit the plan data to be included in contract creation
        this.dispatchEvent(new CustomEvent('plan-data', {
          detail: this.newPlan,
          bubbles: true,
          composed: true
        }));
      } else {
        // For existing contracts, create plan via API
        const response = await fetch(API_ENDPOINTS.INSURANCE_CONTRACT.BASE, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: this.contractId,
            insurancePlans: [this.newPlan]
          }),
        });

        if (!response.ok) throw new Error('Failed to create plan');

        this.resetForm();
        this.dispatchEvent(new CustomEvent('plan-created', {
          detail: { contractId: this.contractId },
          bubbles: true,
          composed: true
        }));
      }
    } catch (err) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }

  resetForm() {
    this.newPlan = {
      planName: '',
      planCode: '',
      startDate: '',
      endDate: '',
      createdby: 1,
      rowStatus: 1
    };
  }

  render() {
    return html`
      <div class="form-section">
        <h4 class="form-section-title">Plan Details</h4>
        
        ${this.error ? html`<div class="error">${this.error}</div>` : ''}
        
        <form @submit=${this.handleSubmit}>
          <div class="form-grid">
            <div class="form-field-wrapper">
              <input 
                type="text" 
                class="form-input"
                .value=${this.newPlan.planName}
                @input=${e => this.newPlan.planName = e.target.value}
                required
              />
              <label class="form-label">Plan Name</label>
            </div>
            
            <div class="form-field-wrapper">
              <input 
                type="text" 
                class="form-input"
                .value=${this.newPlan.planCode}
                @input=${e => this.newPlan.planCode = e.target.value}
                required
              />
              <label class="form-label">Plan Code</label>
            </div>
            
            <div class="form-field-wrapper">
              <input 
                type="date" 
                class="form-input"
                .value=${this.newPlan.startDate}
                @input=${e => this.newPlan.startDate = e.target.value}
                required
              />
              <label class="form-label">Start Date</label>
            </div>
            
            <div class="form-field-wrapper">
              <input 
                type="date" 
                class="form-input"
                .value=${this.newPlan.endDate}
                @input=${e => this.newPlan.endDate = e.target.value}
                required
              />
              <label class="form-label">End Date</label>
            </div>
          </div>
          
          ${!this.isNewContract ? html`
            <button 
              type="submit" 
              class="primary-button"
              ?disabled=${this.loading || !this.contractId}
            >
              ${this.loading ? html`
                <span class="loading"></span>
                Creating...
              ` : 'Add Plan'}
            </button>
          ` : ''}
        </form>
      </div>
    `;
  }
} 