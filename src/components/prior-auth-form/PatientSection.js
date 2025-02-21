import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { API_ENDPOINTS } from '../../config/api';
import { sharedStyles } from './shared-styles';

@customElement('patient-section')
export class PatientSection extends LitElement {
    static styles = [
        sharedStyles,
        css`
            :host {
                display: block;
            }

            .patient-details-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
                margin-top: 1rem;
            }

            .dependent-section {
                margin-top: 2rem;
                padding-top: 1rem;
                border-top: 1px solid var(--gray-200);
            }

            .dependent-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1rem;
                margin-top: 1rem;
            }

            .dependent-card {
                border: 1px solid var(--gray-200);
                border-radius: 6px;
                padding: 1rem;
                cursor: pointer;
                transition: all 0.2s ease-in-out;
            }

            .dependent-card:hover {
                border-color: var(--primary);
                background-color: var(--gray-50);
            }

            .dependent-card.selected {
                border-color: var(--primary);
                background-color: var(--gray-50);
            }

            .dependent-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0.5rem;
            }

            .dependent-name {
                font-weight: 500;
                color: var(--gray-900);
            }

            .relationship-badge {
                background-color: var(--primary-light);
                color: white;
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
                font-size: 0.75rem;
            }

            .dependent-details {
                color: var(--gray-600);
                font-size: 0.875rem;
            }

            .loading-indicator {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                color: var(--gray-600);
            }

            .error-message {
                color: var(--error);
                padding: 1rem;
                text-align: center;
            }

            .dependent-check {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .checkbox-label {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                cursor: pointer;
                user-select: none;
            }

            /* Enhanced Autocomplete Styles */
            .search-container {
                position: relative;
            }

            .search-input-wrapper {
                position: relative;
                display: flex;
                align-items: center;
            }

            .search-icon {
                position: absolute;
                left: 12px;
                color: var(--gray-400);
                display: flex;
                align-items: center;
                justify-content: center;
                pointer-events: none;
            }

            .search-input {
                padding-left: 40px !important;
                padding-right: 40px;
                transition: all 0.2s ease;
            }

            .search-input:focus {
                box-shadow: 0 0 0 3px rgba(133, 0, 216, 0.1);
            }

            .loader-container {
                position: absolute;
                right: 12px;
                display: flex;
                align-items: center;
            }

            .search-loader {
                width: 20px;
                height: 20px;
                border: 2px solid var(--gray-200);
                border-top-color: var(--primary);
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
            }

            .search-results {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                border: 1px solid var(--gray-200);
                border-radius: 12px;
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
                margin-top: 8px;
                max-height: 400px;
                overflow-y: auto;
                z-index: 1000;
            }

            .search-results-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(255, 255, 255, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1;
            }

            .search-result-item {
                padding: 16px;
                border-bottom: 1px solid var(--gray-100);
                cursor: pointer;
                transition: all 0.2s ease;
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .search-result-item:hover {
                background-color: var(--gray-50);
            }

            .search-result-item:last-child {
                border-bottom: none;
            }

            .result-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .patient-name {
                color: var(--gray-900);
                font-weight: 600;
                font-size: 1rem;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .patient-info {
                display: flex;
                flex-wrap: wrap;
                gap: 16px;
                margin-top: 4px;
            }

            .info-item {
                display: flex;
                align-items: center;
                gap: 6px;
                color: var(--gray-700);
                font-size: 0.875rem;
            }

            .info-icon {
                color: var(--gray-500);
                font-size: 1rem;
            }

            .insurance-info {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-top: 4px;
            }

            .badge {
                display: inline-flex;
                align-items: center;
                gap: 4px;
                padding: 4px 12px;
                border-radius: 9999px;
                font-size: 0.75rem;
                font-weight: 500;
            }

            .badge-success {
                background-color: var(--success);
                color: white;
            }

            .badge-warning {
                background-color: var(--warning);
                color: white;
            }

            .search-status {
                padding: 24px;
                text-align: center;
                color: var(--gray-600);
            }

            .loader {
                width: 24px;
                height: 24px;
                border: 2px solid var(--gray-200);
                border-top-color: var(--primary);
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
                margin: 0 auto;
            }

            .loading-text {
                margin-top: 8px;
                font-size: 0.875rem;
            }

            .no-results-icon {
                font-size: 24px;
                margin-bottom: 8px;
            }

            .no-results-text {
                font-size: 0.9rem;
                margin-bottom: 4px;
            }

            .no-results-hint {
                font-size: 0.8rem;
                color: var(--gray-400);
            }

            @keyframes spin {
                to { transform: rotate(360deg); }
            }

            /* Enhanced Form Control Styles */
            .form-control-group {
                position: relative;
                display: flex;
                flex-direction: column;
            }

            .form-control-icon {
                position: absolute;
                left: 12px;
                top: 50%;
                transform: translateY(-50%);
                width: 20px;
                height: 20px;
                color: var(--gray-400);
            }

            .form-control-icon svg {
                width: 100%;
                height: 100%;
            }

            .form-control-with-icon {
                padding-left: 40px !important;
            }

            .form-control {
                background-color: var(--gray-50);
                border: 1px solid var(--gray-200);
                border-radius: 8px;
                color: var(--gray-900);
                font-size: 0.875rem;
                line-height: 1.5;
                padding: 0.625rem 1rem;
                transition: all 0.2s ease;
                width: 100%;
            }

            .form-control:focus {
                background-color: white;
                border-color: var(--primary);
                box-shadow: 0 0 0 3px rgba(133, 0, 216, 0.1);
                outline: none;
            }

            .form-control:read-only {
                background-color: var(--gray-100);
                border-color: var(--gray-200);
                color: var(--gray-700);
                cursor: not-allowed;
            }

            .form-label {
                color: var(--gray-700);
                font-size: 0.875rem;
                font-weight: 500;
                margin-bottom: 0.5rem;
            }

            .form-group {
                margin-bottom: 1.25rem;
            }

            /* Healthcare specific form styling */
            .patient-info-field {
                position: relative;
                background-color: white;
                border-radius: 8px;
                transition: all 0.2s ease;
            }

            .patient-info-field:hover {
                background-color: var(--gray-50);
            }

            .patient-info-label {
                font-size: 0.75rem;
                color: var(--gray-500);
                margin-bottom: 0.25rem;
            }

            .patient-info-value {
                font-size: 0.875rem;
                color: var(--gray-900);
                font-weight: 500;
            }

            .patient-info-empty {
                color: var(--gray-400);
                font-style: italic;
            }

            /* Healthcare Icons */
            .healthcare-icon {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 20px;
                height: 20px;
                color: var(--gray-400);
            }
        `
    ];

    static get icons() {
        return {
            user: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/></svg>`,
            calendar: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
            id: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h10M7 16h10"/></svg>`,
            passport: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M7 21v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2"/></svg>`,
            phone: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
            gender: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M14.83 14.83L19 19M9.17 14.83L5 19"/><circle cx="12" cy="8" r="2"/></svg>`,
            ring: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8"/><path d="M16 12a4 4 0 0 1-8 0"/></svg>`,
            globe: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
            briefcase: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`
        };
    }

    static get properties() {
        return {
            patient: { type: Object },
            familyMembers: { type: Array },
            selectedDependent: { type: Object },
            hasDependent: { type: Boolean },
            patientSearchResults: { type: Array, state: true },
            showPatientResults: { type: Boolean, state: true },
            isLoading: { type: Boolean, state: true },
            isDependentLoading: { type: Boolean, state: true },
            dependentError: { type: String, state: true }
        };
    }

    constructor() {
        super();
        this.patient = null;
        this.familyMembers = [];
        this.selectedDependent = null;
        this.hasDependent = false;
        this.patientSearchResults = [];
        this.showPatientResults = false;
        this.isLoading = false;
        this.isDependentLoading = false;
        this.dependentError = '';
    }

    render() {
        return html`
            <div class="form-section">
                <div class="search-section">
                    <div class="form-group">
                        <label class="form-label">Search Patient</label>
                        <div class="search-container">
                            <input 
                                type="text" 
                                class="form-control" 
                                placeholder="Search by patient PIN, name or national ID..."
                                @input=${this.handlePatientSearch}
                                @focus=${() => this.showPatientResults = true}
                            >
                            ${this.showPatientResults ? html`
                                <div class="search-results">
                                    ${this.isLoading ? html`
                                        <div class="search-status">
                                            <div class="loader"></div>
                                            <div class="loading-text">Searching patients...</div>
                                        </div>
                                    ` : this.patientSearchResults && this.patientSearchResults.length > 0 ? html`
                                        ${this.patientSearchResults.map(patient => html`
                                            <div class="search-result-item" @click=${() => this.selectPatient(patient)}>
                                                <div class="result-header">
                                                    <div class="patient-name">
                                                        <span class="info-icon">👤</span>
                                                        ${this.formatPatientName(patient)}
                                                    </div>
                                                    ${patient.patientInsurances?.length > 0 ? html`
                                                        <span class="badge badge-success">
                                                            <span>✓</span>
                                                            Insured
                                                        </span>
                                                    ` : html`
                                                        <span class="badge badge-warning">
                                                            <span>⚠</span>
                                                            Self Pay
                                                        </span>
                                                    `}
                                                </div>
                                                <div class="patient-info">
                                                    <div class="info-item">
                                                        <span class="info-icon">🏥</span>
                                                        <span>MRN:</span>
                                                        <strong>${patient.pinNo}</strong>
                                                    </div>
                                                    <div class="info-item">
                                                        <span class="info-icon">🪪</span>
                                                        <span>National ID:</span>
                                                        <strong>${patient.nic}</strong>
                                                    </div>
                                                    ${patient.cellPhoneNo ? html`
                                                        <div class="info-item">
                                                            <span class="info-icon">📱</span>
                                                            <span>Mobile:</span>
                                                            <strong>${patient.cellPhoneNo}</strong>
                                                        </div>
                                                    ` : ''}
                                                </div>
                                                ${patient.patientInsurances?.length > 0 ? html`
                                                    <div class="insurance-info">
                                                        <div class="info-item">
                                                            <span class="info-icon">🏢</span>
                                                            <span>Insurance:</span>
                                                            <strong>${patient.patientInsurances[0].payer?.companyName || 'N/A'}</strong>
                                                        </div>
                                                        <div class="info-item">
                                                            <span class="info-icon">📋</span>
                                                            <span>Plan:</span>
                                                            <strong>${patient.patientInsurances[0].fkPlan?.planName || 'N/A'}</strong>
                                                        </div>
                                                    </div>
                                                ` : ''}
                                            </div>
                                        `)}
                                    ` : html`
                                        <div class="search-status">
                                            <div class="no-results-icon">🔍</div>
                                            <div class="no-results-text">No matching patients found</div>
                                            <div class="no-results-hint">Try searching with a different term</div>
                                        </div>
                                    `}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>

                ${this.patient ? html`
                    <div class="patient-details">
                        <h3 class="section-title">Patient Information</h3>
                        <div class="details-grid">
                            ${this.renderFormControl('Patient Name', this.formatPatientName(this.patient), '👤')}
                            ${this.renderFormControl('MRN', this.patient.pinNo, '🏥')}
                            ${this.renderFormControl('National ID', this.patient.nic, '🪪')}
                            ${this.renderFormControl('Mobile', this.patient.cellPhoneNo || 'N/A', '📱')}
                            ${this.renderFormControl('Gender', this.patient.gender?.genderName || 'N/A', '⚧')}
                            ${this.renderFormControl('Date of Birth', this.formatDate(this.patient.dateOfBirth), '📅')}
                        </div>

                        <div class="insurance-section">
                            <h3 class="section-title">Insurance Information</h3>
                            ${this.patient.patientInsurances?.length > 0 ? html`
                                <div class="details-grid">
                                    ${this.renderFormControl('Insurance Provider', 
                                        this.patient.patientInsurances[0].payer?.companyName || 'N/A', '🏢')}
                                    ${this.renderFormControl('Member ID', 
                                        this.patient.patientInsurances[0].memberId || 'N/A', '🆔')}
                                    ${this.renderFormControl('Plan Name', 
                                        this.patient.patientInsurances[0].fkPlan?.planName || 'N/A', '📋')}
                                    ${this.renderFormControl('Start Date', 
                                        this.formatDate(this.patient.patientInsurances[0].startDate), '📅')}
                                    ${this.renderFormControl('Expiry Date', 
                                        this.formatDate(this.patient.patientInsurances[0].expiryDate), '📅')}
                                </div>
                            ` : html`
                                <div class="self-pay-notice">
                                    <span class="icon">⚠️</span>
                                    <span class="message">Self Pay Patient</span>
                                </div>
                            `}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    renderDependentSection() {
        if (!this.hasDependent) return '';

        return html`
            <div class="dependent-section">
                <h3 class="subsection-title">Dependent Information</h3>
                ${this.isDependentLoading ? html`
                    <div class="loading-indicator">
                        <div class="loader"></div>
                        <p>Loading dependents...</p>
                    </div>
                ` : this.dependentError ? html`
                    <div class="error-message">
                        ${this.dependentError}
                    </div>
                ` : this.familyMembers.length === 0 ? html`
                    <div class="notice">
                        No dependents found for this patient.
                    </div>
                ` : html`
                    <div class="dependent-grid">
                        ${this.familyMembers.map(member => html`
                            <div class="dependent-card ${this.selectedDependent?.id === member.id ? 'selected' : ''}"
                                 @click=${() => this.selectDependent(member)}>
                                <div class="dependent-header">
                                    <span class="dependent-name">${member.fullName}</span>
                                    <span class="relationship-badge">${member.relationship}</span>
                                </div>
                                <div class="dependent-details">
                                    <div>DOB: ${this.formatDate(member.dateOfBirth)}</div>
                                    <div>Gender: ${member.gender}</div>
                                    <div>Nationality: ${member.nationality}</div>
                                </div>
                            </div>
                        `)}
                    </div>
                `}
            </div>
        `;
    }

    async handlePatientSearch(e) {
        const searchTerm = e.target.value.trim();
        
        if (searchTerm.length < 3) {
            this.patientSearchResults = [];
            this.showPatientResults = false;
            return;
        }

        this.isLoading = true;
        this.showPatientResults = true;

        try {
            const response = await fetch(API_ENDPOINTS.PATIENT.PAGED, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    filters: `(pinNo|firstName|middleName|lastName|nic|cellPhoneNo)_=${searchTerm}`,
                    page: 1,
                    pageSize: 50
                })
            });
            
            if (!response.ok) throw new Error('Failed to fetch patients');
            
            const data = await response.json();
            
            if (data.messageType === 'success' && Array.isArray(data.dynamicResult)) {
                this.patientSearchResults = data.dynamicResult;
            } else {
                this.patientSearchResults = [];
                console.error('No results in patient search response');
            }
        } catch (error) {
            console.error('Error searching patients:', error);
            this.dispatchEvent(new CustomEvent('show-notification', {
                detail: { message: 'Error searching patients', type: 'error' },
                bubbles: true,
                composed: true
            }));
            this.patientSearchResults = [];
        } finally {
            this.isLoading = false;
        }
    }

    selectPatient(patient) {
        // The patient data is directly on the patient object, not in fullData
        const patientInsurance = patient?.patientInsurances?.length > 0 
            ? patient.patientInsurances[0] 
            : null;

        // Check for NPHIES verification
        const isNphiesVerified = patient?.insuranceCoverages?.length > 0;

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
            lastEligibilityVerificationDate: patient.insuranceCoverages?.length > 0 
                ? patient.insuranceCoverages[0].lastEligiblityVerifcationDate 
                : null,
            isNphiesVerified: isNphiesVerified
        };

        // Dispatch the patient selected event with all necessary details
        this.dispatchEvent(new CustomEvent('patient-selected', {
            detail: {
                patient: {
                    ...patient,
                    insuranceInfo: insuranceDetails,
                    coverageDetails: coverageDetails,
                    patientType: patient.patientType?.patientTypeName || 'Self Pay',
                    isNphiesVerified: isNphiesVerified,
                    insuranceCoverages: patient.insuranceCoverages || []
                }
            },
            bubbles: true,
            composed: true
        }));

        // Clear the search results
        this.showPatientResults = false;
        this.patientSearchResults = [];
    }

    async handleDependentCheck(e) {
        const hasDependent = e.target.checked;
        this.dispatchEvent(new CustomEvent('dependent-check-changed', {
            detail: { hasDependent },
            bubbles: true,
            composed: true
        }));
    }

    selectDependent(member) {
        this.dispatchEvent(new CustomEvent('dependent-selected', {
            detail: member,
            bubbles: true,
            composed: true
        }));
    }

    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    formatPatientName(patient) {
        const nameParts = [
            patient.firstName,
            patient.middleName,
            patient.lastName
        ].filter(part => part && part.trim() !== '');
        return nameParts.join(' ');
    }

    renderFormControl(label, value, icon, readonly = true) {
        return html`
            <div class="form-group">
                <label class="form-label">${label}</label>
                <div class="form-control-group">
                    <div class="form-control-icon">
                        ${typeof icon === 'string' ? html`<span class="emoji-icon">${icon}</span>` : icon}
                    </div>
                    <input 
                        type="text" 
                        class="form-control form-control-with-icon" 
                        .value=${this.formatValue(value)}
                        ?readonly=${readonly}
                    >
                </div>
            </div>
        `;
    }

    formatValue(value) {
        if (value === null || value === undefined) return '';
        if (typeof value === 'object') {
            return value.toString() || '';
        }
        return value;
    }
} 