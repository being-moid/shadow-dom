import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { API_ENDPOINTS,FHIR_URL } from '../../config/api';
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

            .button-group {
                display: flex;
                gap: 1rem;
                margin-top: 1.5rem;
                padding-top: 1.5rem;
                border-top: 1px solid var(--gray-100);
            }

            .test-button {
                background-color: var(--warning);
                color: white;
            }

            .insurance-grid {
                /* existing styling */
            }

            /* New styles for verification section */
            .verification-section {
                margin-top: 1.5rem;
            }
            .verification-cards {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 1.5rem;
                margin-top: 1rem;
            }
            .verification-card {
                background: white;
                border: 1px solid var(--gray-200);
                border-radius: 12px;
                padding: 1.25rem;
                transition: all 0.2s ease;
                cursor: pointer;
            }
            .verification-card.selected {
                border-color: var(--primary);
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            }

            /* Styles for Insurance Analytics */
            .insurance-analytics {
                margin-top: 2rem;
            }
            .insurance-group {
                margin-bottom: 2rem;
            }
            .insurance-group h4 {
                font-size: 1.125rem;
                margin-bottom: 0.5rem;
                color: var(--primary);
            }
            .analytics-table {
                width: 100%;
                border-collapse: collapse;
                background: white;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }
            .analytics-table th {
                background: var(--gray-50);
                padding: 0.75rem 1rem;
                text-align: left;
                font-weight: 500;
                color: var(--gray-700);
                border-bottom: 1px solid var(--gray-200);
            }
            .analytics-table td {
                padding: 0.75rem 1rem;
                border-bottom: 1px solid var(--gray-100);
                vertical-align: middle;
            }
            .analytics-table tr:last-child td {
                border-bottom: none;
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
            serviceDateTo: { type: String, state: true },
            isTestMode: { type: Boolean, state: true },
            coverageDetails: { type: Object, state: true },
            verifications: { type: Array, state: true },
            selectedVerificationId: { type: Number, state: true }
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
        this.isTestMode = false;
        this.coverageDetails = null;
        this.verifications = [];
        this.selectedVerificationId = null;
    }

    updated(changedProperties) {
        if(changedProperties.has('patient') && this.patient && this.patient.id) {
            this.loadCoverage();
            this.loadVerifications();
        }
    }

    async loadCoverage() {
        try {
            const response = await fetch(`${API_ENDPOINTS.PATIENT.LoadCoverage}${this.patient.id}/coverage`);
            if (!response.ok) throw new Error('Failed to load coverage');
            const result = await response.json();
            if(result.isSuccessfull && Array.isArray(result.dynamicResult) && result.dynamicResult.length > 0) {
                this.coverageDetails = result.dynamicResult[0];
            } else {
                this.coverageDetails = null;
            }
        } catch (error) {
            console.error('Error loading coverage:', error);
            this.coverageDetails = null;
        }
    }

    async loadVerifications() {
        try {
            const response = await fetch(`${API_ENDPOINTS.PATIENT.Eligblities}/${this.patient.id}`);
            if (!response.ok) throw new Error('Failed to load verifications');
            const result = await response.json();
            if(result.isSuccessfull && Array.isArray(result.dynamicResult)) {
                this.verifications = result.dynamicResult;
            } else {
                this.verifications = [];
            }
        } catch (error) {
            console.error('Error loading verifications:', error);
            this.verifications = [];
        }
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
            <!-- Removed Required License Information section -->
            
            <div class="insurance-grid">
                <div class="info-field">
                    <div class="field-label">STATUS</div>
                    <div class="field-value">SELF PAY</div>
                </div>
            </div>

            <div class="verification-section">
                <h3 class="card-title">Coverage Verification</h3>
                ${this.renderVerificationCards()}
            </div>
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

    // Format phone number helper
    formatPhoneNumber(phone) {
        if (!phone) return '';
        // Remove any non-digit characters and ensure it starts with +966
        const cleaned = phone.replace(/\D/g, '');
        return cleaned.startsWith('966') ? `+${cleaned}` : `+966${cleaned.replace(/^0+/, '')}`;
    }

    // Format patient name helper
    formatPatientName(patient) {
        const parts = [patient.firstName, patient.middleName, patient.lastName].filter(Boolean);
        return parts.join(' ');
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
            const messageHeaderId = crypto.randomUUID();
            const patientId = this.patient.id;

            const requestParams = {
                messageHeaderId,
                requestId,
                focusReference: `http://provider.com/CoverageEligibilityRequest/${requestId}`,
                meta: {
                    profile: [
                        "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/bundle|1.0.0",
                        "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/message-header|1.0.0",
                        "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/eligibility-request|1.0.0"
                    ]
                },
                patient: {
                    id: patientId,
                    reference: `Patient/${patientId}`,
                    identifier: this.patient.pinNo,
                    fullName: this.formatPatientName(this.patient),
                    familyName: this.patient.lastName,
                    givenNames: [this.patient.firstName, this.patient.middleName].filter(Boolean),
                    phone: this.formatPhoneNumber(this.patient.cellPhoneNo),
                    gender: (this.patient.gender.genderName || 'unknown').toLowerCase(),
                    birthDate: this.patient.dateOfBirth,
                    occupation: "student"
                },
                provider: {
                    id: this.providerLicense,
                    reference: `Organization/${this.providerLicense}`,
                    license: this.providerLicense,
                    name: this.visit.facility?.name || 'Saudi General Clinic',
                    endpoint: "http://provider.com",
                    typeCode: "5",
                    typeDisplay: "Clinic"
                },
                insurer: {
                    id: this.insuranceLicense,
                    reference: `Organization/${this.insuranceLicense}`,
                    license: this.insuranceLicense,
                    name: this.patient.patientInsurances?.[0]?.payer?.companyName || 'Test Payer',
                    endpoint: "http://nphies.sa/license/payer-license/INS-FHIR"
                },
                facility: {
                    id: this.facilityLicense,
                    reference: `Location/${this.facilityLicense}`,
                    license: this.facilityLicense,
                    name: this.visit.facility?.name || 'Test Provider',
                    type: "GACH"
                },
                serviceDate: {
                    start: new Date(this.serviceDateFrom).toISOString().split('T')[0],
                    end: new Date(this.serviceDateTo).toISOString().split('T')[0]
                }
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

    async runTestEligibility() {
        this.isLoading = true;
        this.error = null;
        this.isTestMode = true;

        try {
            const requestId = crypto.randomUUID();
            const messageHeaderId = crypto.randomUUID();
            
            const testParams = {
                messageHeaderId,
                requestId,
                focusReference: `http://provider.com/CoverageEligibilityRequest/${requestId}`,
                meta: {
                    profile: [
                        "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/bundle|1.0.0",
                        "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/message-header|1.0.0",
                        "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/eligibility-request|1.0.0"
                    ]
                },
                patient: {
                    id: "test-patient-001",
                    reference: "Patient/test-patient-001",
                    identifier: "1234567890",
                    fullName: "Test Patient",
                    familyName: "Patient",
                    givenNames: ["Test"],
                    phone: "+966500000000",
                    gender: "male",
                    birthDate: "1990-01-01",
                    occupation: "student"
                },
                provider: {
                    id: "PR-FHIR",
                    reference: "Organization/PR-FHIR",
                    license: "PR-FHIR",
                    name: "Test Provider Organization",
                    endpoint: "http://provider.com",
                    typeCode: "5",
                    typeDisplay: "Clinic"
                },
                insurer: {
                    id: "INS-FHIR",
                    reference: "Organization/INS-FHIR",
                    license: "INS-FHIR",
                    name: "Test Insurance Company",
                    endpoint: "http://nphies.sa/license/payer-license/INS-FHIR"
                },
                facility: {
                    id: "GACH",
                    reference: "Location/GACH",
                    license: "GACH",
                    name: "Test Facility",
                    type: "GACH"
                },
                serviceDate: {
                    start: new Date().toISOString().split('T')[0],
                    end: new Date(Date.now() + 86400000).toISOString().split('T')[0]
                }
            };

            // Create FHIR Bundle using the mapper
            const fhirBundle = CoverageEligibilityRequestMapper.createRequest(testParams);
            console.log('Generated Test FHIR Bundle:', fhirBundle);

            // Use fhirClient to send the request
            const response = await fhirClient.processMessage(fhirBundle);
            
            if (response.messageType === 'success') {
                this.dispatchEvent(new CustomEvent('eligibility-checked', {
                    detail: {
                        eligibility: response.eligibility,
                        coverage: response.coverage,
                        requestBundle: fhirBundle,
                        responseBundle: response.bundle,
                        isTestMode: true
                    },
                    bubbles: true,
                    composed: true
                }));
            } else {
                throw new Error(response.message || 'Failed to check test eligibility');
            }
        } catch (error) {
            console.error('Error running test eligibility:', error);
            this.error = `Test Error: ${error.message}`;
            this.dispatchEvent(new CustomEvent('show-notification', {
                detail: { 
                    message: `Test Error: ${error.message}`, 
                    type: 'error' 
                },
                bubbles: true,
                composed: true
            }));
        } finally {
            this.isLoading = false;
            this.isTestMode = false;
        }
    }

    // Group benefits by categoryCode for analytical display
    groupBenefits() {
        if (!this.coverageDetails || !this.coverageDetails.benefits) return {};
        return this.coverageDetails.benefits.reduce((groups, benefit) => {
            const key = benefit.categoryCode;
            if (!groups[key]) groups[key] = [];
            groups[key].push(benefit);
            return groups;
        }, {});
    }

    // Render Insurance Analytics by grouping benefits with modern design and SVG icons
    renderInsuranceAnalytics() {
        const groups = this.groupBenefits();
        return html`
            <div class="insurance-analytics">
                ${Object.keys(groups).map(category => html`
                    <div class="insurance-group">
                        <h4>Category ${category}</h4>
                        <table class="analytics-table">
                            <thead>
                                <tr>
                                    <th>Benefit Name</th>
                                    <th>Type</th>
                                    <th>Allowed</th>
                                    <th>Used</th>
                                    <th>Frequency</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${groups[category].map(benefit => html`
                                    <tr>
                                        <td>${benefit.name}</td>
                                        <td>${benefit.benefitTypeCode}</td>
                                        <td>${benefit.allowedMoney} ${benefit.allowedCurrency}</td>
                                        <td>${benefit.usedMoney ? benefit.usedMoney + ' ' + benefit.usedCurrency : 'N/A'}</td>
                                        <td>${benefit.frequency || 1}</td>
                                    </tr>
                                `)}
                            </tbody>
                        </table>
                    </div>
                `)}
            </div>
        `;
    }

    renderCoverageCard() {
        const coverage = this.coverageDetails;
        if (!coverage) return html`<div class="empty-state">No coverage found.</div>`;
        return html`
            <div class="eligibility-card">
                <div class="card-header">
                    <span class="card-icon">
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="#007BFF">
                            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                            <path d="M11 14h2v-4h3V8h-3V5h-2v3H8v2h3z"/>
                        </svg>
                    </span>
                    <div>
                        <div class="card-title">Coverage Information</div>
                        <div class="card-subtitle">${coverage.type} (${coverage.memberId})</div>
                    </div>
                </div>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Status</span>
                        <span class="info-value">${coverage.status}</span>
                    </div>
                </div>
            </div>
        `;
    }

    renderBenefitsCard() {
        const coverage = this.coverageDetails;
        if (!coverage || !coverage.benefits || coverage.benefits.length === 0) return html`<div class="empty-state">No benefits available.</div>`;
        return html`
            <div class="eligibility-card">
                <div class="card-header">
                    <span class="card-icon">
                        <svg viewBox="0 0 24 24" width="24" height="24" fill="#28A745">
                            <path d="M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16M2,11H4V13H2V11M20,11H22V13H20V11Z"></path>
                        </svg>
                    </span>
                    <div>
                        <div class="card-title">Benefits</div>
                        <div class="card-subtitle">Insurance Benefits</div>
                    </div>
                </div>
                <div class="info-grid">
                    ${coverage.benefits.map(benefit => html`
                        <div class="info-item">
                            <span class="info-label">${benefit.benefitTypeCode}</span>
                            <span class="info-value">${benefit.allowedMoney} ${benefit.allowedCurrency}</span>
                        </div>
                    `)}
                </div>
            </div>
        `;
    }

    renderInsuranceTable() {
        const coverage = this.coverageDetails;
        if (!coverage || !coverage.benefits || coverage.benefits.length === 0) return html``;
        return html`
            <div class="insurance-table">
                <h3>Insurance Analytics</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Benefit Type</th>
                            <th>Allowed</th>
                            <th>Used</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${coverage.benefits.map(benefit => html`
                            <tr>
                                <td>${benefit.benefitTypeCode}</td>
                                <td>${benefit.allowedMoney} ${benefit.allowedCurrency}</td>
                                <td>${benefit.usedMoney ? benefit.usedMoney + ' ' + benefit.usedCurrency : 'N/A'}</td>
                            </tr>
                        `)}
                    </tbody>
                </table>
            </div>
        `;
    }

    renderLimitsCard() {
        const coverage = this.coverageDetails;
        if (!coverage || !coverage.costToBeneficiaries || coverage.costToBeneficiaries.length === 0) return html`<div class="empty-state">No cost details available.</div>`;
        return html`
            <div class="eligibility-card">
                <div class="card-header">
                    <span class="card-icon">⚠️</span>
                    <div>
                        <div class="card-title">Cost to Beneficiary</div>
                        <div class="card-subtitle">Coverage Limits</div>
                    </div>
                </div>
                <div class="info-grid">
                    ${coverage.costToBeneficiaries.map(cost => html`
                        <div class="info-item">
                            <span class="info-label">${cost.typeCode}</span>
                            <span class="info-value">${cost.value} ${cost.currency}</span>
                        </div>
                    `)}
                </div>
            </div>
        `;
    }

    renderVerificationCards() {
        if (!this.verifications || this.verifications.length === 0) return html`<div class="empty-state">No verifications found.</div>`;
        return html`
            <div class="verification-cards">
                ${this.verifications.map(verification => html`
                    <div class="verification-card ${this.selectedVerificationId === verification.id ? 'selected' : ''}"
                         @click=${() => this.selectVerification(verification.id)}>
                        <div class="card-header">
                            <span class="card-icon">✅</span>
                            <div>
                                <div class="card-title">${verification.referenceId}</div>
                                <div class="card-subtitle">${new Date(verification.verificationDate).toLocaleString()}</div>
                            </div>
                        </div>
                        <div class="info-grid">
                            <div class="info-item">
                                <span class="info-label">Outcome</span>
                                <span class="info-value">${verification.outcome}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Status</span>
                                <span class="info-value">${verification.status}</span>
                            </div>
                        </div>
                    </div>
                `)}
            </div>
        `;
    }

    selectVerification(id) {
        this.selectedVerificationId = id;
        this.requestUpdate();
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