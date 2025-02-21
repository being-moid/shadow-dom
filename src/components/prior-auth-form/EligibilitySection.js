import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { API_ENDPOINTS } from '../../config/api';
import { sharedStyles } from './shared-styles';
import { CoverageEligibilityRequestMapper } from '../../services/CoverageEligblityRequestService';
import fhirClient from '../../services/FhirClient';

@customElement('eligibility-section')
export class EligibilitySection extends LitElement {
    static styles = [
        sharedStyles,
        css`
            :host {
                display: block;
            }

            .eligibility-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 1.5rem;
                margin-top: 1rem;
            }

            .eligibility-card {
                background: white;
                border: 1px solid var(--gray-200);
                border-radius: 12px;
                padding: 1.25rem;
                transition: all 0.2s ease;
            }

            .eligibility-card:hover {
                border-color: var(--primary-light);
                box-shadow: 0 2px 4px rgba(133, 0, 216, 0.1);
            }

            .card-header {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 1rem;
            }

            .card-icon {
                width: 40px;
                height: 40px;
                color: var(--primary);
                padding: 8px;
                background: var(--gray-50);
                border-radius: 10px;
            }

            .card-title {
                color: var(--gray-900);
                font-weight: 500;
                margin-bottom: 0.25rem;
            }

            .card-subtitle {
                color: var(--gray-600);
                font-size: 0.875rem;
            }

            .info-grid {
                display: grid;
                gap: 0.75rem;
            }

            .info-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .info-label {
                color: var(--gray-600);
                font-size: 0.875rem;
            }

            .info-value {
                color: var(--gray-900);
                font-size: 0.875rem;
                font-weight: 500;
            }

            .status-badge {
                padding: 0.25rem 0.75rem;
                border-radius: 9999px;
                font-size: 0.75rem;
                font-weight: 500;
            }

            .status-active {
                background-color: var(--success);
                color: white;
            }

            .status-inactive {
                background-color: var(--error);
                color: white;
            }

            .status-pending {
                background-color: var(--warning);
                color: white;
            }

            .check-eligibility {
                margin-top: 1.5rem;
                padding-top: 1.5rem;
                border-top: 1px solid var(--gray-100);
            }

            .check-eligibility-btn {
                width: 100%;
            }

            .loading-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(255, 255, 255, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10;
            }

            .empty-state {
                text-align: center;
                padding: 2rem;
                color: var(--gray-500);
            }

            .form-row {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1rem;
                margin-bottom: 1rem;
            }

            .date-inputs {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
            }

            .license-inputs {
                background: var(--gray-50);
                padding: 1rem;
                border-radius: 8px;
                margin-bottom: 1rem;
            }

            .license-title {
                font-weight: 500;
                color: var(--gray-700);
                margin-bottom: 0.5rem;
            }
        `
    ];

    static get properties() {
        return {
            eligibility: { type: Object },
            coverage: { type: Object },
            patient: { type: Object },
            visit: { type: Object },
            isLoading: { type: Boolean, state: true },
            error: { type: String, state: true },
            facilityLicense: { type: String, state: true },
            insuranceLicense: { type: String, state: true },
            providerLicense: { type: String, state: true },
            serviceDateFrom: { type: String, state: true },
            serviceDateTo: { type: String, state: true }
        };
    }

    constructor() {
        super();
        this.eligibility = null;
        this.coverage = null;
        this.patient = null;
        this.visit = null;
        this.isLoading = false;
        this.error = null;
        this.facilityLicense = '';
        this.insuranceLicense = '';
        this.providerLicense = '';
        this.serviceDateFrom = new Date().toISOString().split('T')[0];
        this.serviceDateTo = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    }

    render() {
        if (!this.patient || !this.visit) {
            return html`
                <div class="empty-state">
                    <p>Please select a patient and visit to view eligibility information.</p>
                </div>
            `;
        }

        return html`
            <div class="license-inputs">
                <div class="license-title">Required License Information</div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Provider License (PR-FHIR)</label>
                        <input 
                            type="text" 
                            class="form-control"
                            .value=${this.providerLicense}
                            @input=${(e) => this.providerLicense = e.target.value}
                            placeholder="Enter provider license"
                        >
                    </div>
                    <div class="form-group">
                        <label class="form-label">Facility License (GACH)</label>
                        <input 
                            type="text" 
                            class="form-control"
                            .value=${this.facilityLicense}
                            @input=${(e) => this.facilityLicense = e.target.value}
                            placeholder="Enter facility license"
                        >
                    </div>
                    <div class="form-group">
                        <label class="form-label">Insurance License (INS-FHIR)</label>
                        <input 
                            type="text" 
                            class="form-control"
                            .value=${this.insuranceLicense}
                            @input=${(e) => this.insuranceLicense = e.target.value}
                            placeholder="Enter insurance license"
                        >
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Service Date Range</label>
                        <div class="date-inputs">
                            <input 
                                type="date" 
                                class="form-control"
                                .value=${this.serviceDateFrom}
                                @input=${(e) => this.serviceDateFrom = e.target.value}
                            >
                            <input 
                                type="date" 
                                class="form-control"
                                .value=${this.serviceDateTo}
                                @input=${(e) => this.serviceDateTo = e.target.value}
                            >
                        </div>
                    </div>
                </div>
            </div>

            <div class="eligibility-grid">
                ${this.renderCoverageCard()}
                ${this.renderBenefitsCard()}
                ${this.renderLimitsCard()}
            </div>

            ${!this.eligibility ? html`
                <div class="check-eligibility">
                    <button class="button button-primary check-eligibility-btn"
                            ?disabled=${!this.isFormValid() || this.isLoading}
                            @click=${this.checkEligibility}>
                        ${this.isLoading ? 'Checking Eligibility...' : 'Check Latest Eligibility'}
                    </button>
                </div>
            ` : ''}

            ${this.error ? html`
                <div class="error-message">
                    ${this.error}
                </div>
            ` : ''}
        `;
    }

    isFormValid() {
        return this.patient && 
               this.visit && 
               this.facilityLicense && 
               this.insuranceLicense &&
               this.providerLicense &&
               this.serviceDateFrom &&
               this.serviceDateTo;
    }

    async checkEligibility() {
        if (!this.isFormValid()) {
            this.error = 'Please fill in all required fields';
            return;
        }

        this.isLoading = true;
        this.error = null;

        try {
            const requestId = crypto.randomUUID();
            const patientId = this.patient.id;
            const providerId = this.visit.doctor?.id || crypto.randomUUID();
            const insurerId = crypto.randomUUID();
            const facilityId = crypto.randomUUID();

            // Create request parameters using the mapper
            const requestParams = {
                messageHeaderId: crypto.randomUUID(),
                requestId: requestId,
                patient: {
                    id: patientId,
                    identifier: this.patient.pinNo,
                    fullName: this.formatPatientName(this.patient),
                    familyName: this.patient.lastName,
                    givenNames: [this.patient.firstName, this.patient.middleName].filter(Boolean),
                    phone: this.patient.cellPhoneNo,
                    gender: (this.patient.gender.genderName || 'unknown').toLowerCase(),
                    birthDate: this.patient.dateOfBirth,
                    reference: `Patient/${patientId}`
                },
                provider: {
                    id: providerId,
                    license: this.providerLicense,
                    name: this.visit.doctor ? `Dr. ${this.visit.doctor.fname} ${this.visit.doctor.lname}` : 'Unknown Provider',
                    reference: `Organization/${providerId}`,
                    endpoint: "http://provider.com"
                },
                insurer: {
                    id: insurerId,
                    license: this.insuranceLicense,
                    name: this.patient.patientInsurances?.[0]?.payer?.companyName || 'Unknown Insurer',
                    reference: `Organization/${insurerId}`,
                    endpoint: "http://nphies.sa/license/payer-license/INS-FHIR"
                },
                facility: {
                    id: facilityId,
                    license: this.facilityLicense,
                    name: this.visit.facility?.name || 'Main Facility',
                    reference: `Location/${facilityId}`
                },
                serviceDate: {
                    start: new Date(this.serviceDateFrom).toISOString(),
                    end: new Date(this.serviceDateTo).toISOString()
                },
                focusReference: `http://provider.com/Coverageeligibilityrequest/${requestId}`
            };

            // Create FHIR Bundle using the mapper
            const fhirBundle = CoverageEligibilityRequestMapper.createRequest(requestParams);
            console.log('Generated FHIR Bundle:', fhirBundle);

            // Use fhirClient to send the request
            const response = await fhirClient.processMessage(fhirBundle);
            
            if (response.messageType === 'success') {
                this.dispatchEvent(new CustomEvent('eligibility-checked', {
                    detail: {
                        eligibility: response.eligibility,
                        coverage: response.coverage,
                        requestBundle: fhirBundle,
                        responseBundle: response.bundle
                    },
                    bubbles: true,
                    composed: true
                }));
            } else {
                throw new Error(response.message || 'Failed to check eligibility');
            }
        } catch (error) {
            console.error('Error checking eligibility:', error);
            this.error = error.message;
            this.dispatchEvent(new CustomEvent('show-notification', {
                detail: { message: error.message, type: 'error' },
                bubbles: true,
                composed: true
            }));
        } finally {
            this.isLoading = false;
        }
    }

    formatPatientName(patient) {
        return [patient.firstName, patient.middleName, patient.lastName]
            .filter(Boolean)
            .join(' ');
    }

    renderCoverageCard() {
        const coverage = this.coverage || this.patient?.coverageDetails;
        if (!coverage) return '';

        return html`
            <div class="eligibility-card">
                <div class="card-header">
                    <span class="card-icon">🏥</span>
                    <div>
                        <div class="card-title">Coverage Information</div>
                        <div class="card-subtitle">Insurance Details</div>
                    </div>
                </div>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Coverage Type</span>
                        <span class="info-value">${coverage.type}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Network Type</span>
                        <span class="info-value">${coverage.network}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Plan Name</span>
                        <span class="info-value">${coverage.planName}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Group Name</span>
                        <span class="info-value">${coverage.groupName}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Effective Date</span>
                        <span class="info-value">${this.formatDate(coverage.startDate)}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Expiry Date</span>
                        <span class="info-value">${this.formatDate(coverage.endDate)}</span>
                    </div>
                </div>
            </div>
        `;
    }

    renderBenefitsCard() {
        const coverage = this.coverage || this.patient?.coverageDetails;
        if (!coverage) return '';

        return html`
            <div class="eligibility-card">
                <div class="card-header">
                    <span class="card-icon">💰</span>
                    <div>
                        <div class="card-title">Benefits</div>
                        <div class="card-subtitle">Coverage Benefits</div>
                    </div>
                </div>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Co-Payment</span>
                        <span class="info-value">${coverage.copayment || '0'}%</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Deductible</span>
                        <span class="info-value">SAR ${coverage.deductible || '0'}</span>
                    </div>
                    ${coverage.benefits?.map(benefit => html`
                        <div class="info-item">
                            <span class="info-label">${benefit.name}</span>
                            <span class="info-value">${benefit.value}</span>
                        </div>
                    `)}
                </div>
            </div>
        `;
    }

    renderLimitsCard() {
        const coverage = this.coverage || this.patient?.coverageDetails;
        if (!coverage) return '';

        return html`
            <div class="eligibility-card">
                <div class="card-header">
                    <span class="card-icon">⚠️</span>
                    <div>
                        <div class="card-title">Limits & Restrictions</div>
                        <div class="card-subtitle">Coverage Limitations</div>
                    </div>
                </div>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Subrogation</span>
                        <span class="info-value">${coverage.subrogation}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Last Verification</span>
                        <span class="info-value">${this.formatDate(coverage.lastEligibilityVerificationDate)}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">NPHIES Status</span>
                        <span class="status-badge ${coverage.isNphiesVerified ? 'status-active' : 'status-inactive'}">
                            ${coverage.isNphiesVerified ? 'Verified' : 'Not Verified'}
                        </span>
                    </div>
                </div>
            </div>
        `;
    }

    formatDate(dateString) {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
} 