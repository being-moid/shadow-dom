import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { API_ENDPOINTS } from '../config/api';
import { sharedStyles } from './prior-auth-form/shared-styles';
import './prior-auth-form/MedicationSection';
import './prior-auth-form/DiagnosisSection';
import './prior-auth-form/CareTeamSection';
import './prior-auth-form/SupportingInfoSection';
import './prior-auth-form/PatientSection';
import './prior-auth-form/VisitSection';
import './prior-auth-form/EligibilitySection';

@customElement('prior-auth-form-widget')
export class PriorAuthFormWidget extends LitElement {
    static get properties() {
        return {
            activeTab: { type: String },
            formData: { type: Object },
            selectedClaimType: { type: String },
            isLoading: { type: Boolean }
        };
    }

    constructor() {
        super();
        this.activeTab = 'patient';
        this.formData = {
            patient: null,
            visit: null,
            eligibility: null,
            coverage: null,
            medications: [],
            diagnoses: [],
            careTeam: [],
            supportingInfo: [],
            vitals: {}
        };
        this.selectedClaimType = 'institutional';
        this.isLoading = false;
    }

    static styles = [
        sharedStyles,
        css`
        :host {
            display: block;
        }

        .card {
            background: white;
                border-radius: 8px;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                margin: 1rem;
                padding: 1.5rem;
        }

        .card-header {
                margin-bottom: 1.5rem;
            }

            .header-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
        }

        .card-title {
            color: var(--gray-900);
                font-size: 1.5rem;
            font-weight: 600;
            margin: 0;
        }

        .tab-container {
            margin-bottom: 1.5rem;
        }

        .tab-list {
                border-bottom: 1px solid var(--gray-200);
            display: flex;
                gap: 1rem;
                margin-bottom: 1.5rem;
        }

        .tab {
            color: var(--gray-600);
            cursor: pointer;
                font-weight: 500;
                padding: 0.5rem 0;
                position: relative;
        }

        .tab.active {
            color: var(--primary);
            }

            .tab.active::after {
            background-color: var(--primary);
                bottom: -1px;
                content: '';
                height: 2px;
            left: 0;
            position: absolute;
                width: 100%;
            }

            .form-actions {
            border-top: 1px solid var(--gray-200);
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
            margin-top: 2rem;
            padding-top: 1.5rem;
            }

            .form-actions button {
                min-width: 120px;
            }

            .form-actions button[disabled] {
                cursor: not-allowed;
                opacity: 0.5;
            }
        `
    ];

    render() {
        return html`
            <div class="card">
                <div class="card-header">
                    <div class="header-content">
                        <h2 class="card-title">Prior Authorization Request</h2>
                        <div class="claim-type-selector">
                            <select class="form-control" 
                                    @change=${this.handleClaimTypeChange}
                                    .value=${this.selectedClaimType}>
                                <option value="institutional">Institutional</option>
                                <option value="dental">Dental</option>
                                <option value="vision">Vision</option>
                                <option value="professional">Professional</option>
                                <option value="prescription">Prescription</option>
                                <option value="pharmacy">Pharmacy</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <form @submit=${this.handleSubmit}>
                        ${this.renderTabs()}
                        ${this.renderTabContent()}
                        ${this.renderActions()}
                    </form>
                </div>
            </div>
        `;
    }

    renderTabs() {
        return html`
            <div class="tab-container">
                <div class="tab-list">
                    <div 
                        class="tab ${this.activeTab === 'patient' ? 'active' : ''}"
                        @click=${() => this.activeTab = 'patient'}
                    >
                        Patient
                                                </div>
                    <div 
                        class="tab ${this.activeTab === 'visit' ? 'active' : ''}"
                        @click=${() => this.activeTab = 'visit'}
                    >
                        Visit
                                                </div>
                    <div 
                        class="tab ${this.activeTab === 'eligibility' ? 'active' : ''}"
                        @click=${() => this.activeTab = 'eligibility'}
                    >
                        Eligibility
                                            </div>
                    <div 
                        class="tab ${this.activeTab === 'medications' ? 'active' : ''}"
                        @click=${() => this.activeTab = 'medications'}
                    >
                        Medications
                    </div>
                    <div 
                        class="tab ${this.activeTab === 'diagnoses' ? 'active' : ''}"
                        @click=${() => this.activeTab = 'diagnoses'}
                    >
                        Diagnoses
                    </div>
                    <div 
                        class="tab ${this.activeTab === 'careTeam' ? 'active' : ''}"
                        @click=${() => this.activeTab = 'careTeam'}
                    >
                        Care Team
                    </div>
                    <div 
                        class="tab ${this.activeTab === 'supporting' ? 'active' : ''}"
                        @click=${() => this.activeTab = 'supporting'}
                    >
                        Supporting Info
                    </div>
                </div>
            </div>
        `;
    }

    renderTabContent() {
        switch (this.activeTab) {
            case 'patient':
                return html`
                    <patient-section
                        .patient=${this.formData.patient}
                        @patient-selected=${this.handlePatientSelected}
                        @dependent-check-changed=${this.handleDependentCheckChanged}
                        @dependent-selected=${this.handleDependentSelected}
                        @show-notification=${this.handleNotification}
                    ></patient-section>
                `;
            case 'visit':
                return html`
                    <visit-section
                        .selectedVisit=${this.formData.visit}
                        @visit-type-changed=${this.handleVisitTypeChanged}
                        @visit-selected=${this.handleVisitSelected}
                        @show-notification=${this.handleNotification}
                    ></visit-section>
                `;
            case 'eligibility':
                return html`
                    <eligibility-section
                        .patient=${this.formData.patient}
                        .visit=${this.formData.visit}
                        .eligibility=${this.formData.eligibility}
                        .coverage=${this.formData.coverage}
                        @eligibility-checked=${this.handleEligibilityChecked}
                        @show-notification=${this.handleNotification}
                    ></eligibility-section>
                `;
            case 'medications':
                return html`
                    <medication-section
                        .medications=${this.formData.medications}
                        @medication-selected=${this.handleMedicationSelected}
                        @medication-updated=${this.handleMedicationUpdated}
                        @medication-removed=${this.handleMedicationRemoved}
                        @show-notification=${this.handleNotification}
                    ></medication-section>
                `;
            case 'diagnoses':
                return html`
                    <diagnosis-section
                        .diagnoses=${this.formData.diagnoses}
                        @diagnosis-selected=${this.handleDiagnosisSelected}
                        @diagnosis-updated=${this.handleDiagnosisUpdated}
                        @diagnosis-removed=${this.handleDiagnosisRemoved}
                        @show-notification=${this.handleNotification}
                    ></diagnosis-section>
                `;
            case 'careTeam':
                return html`
                    <care-team-section
                        .careTeam=${this.formData.careTeam}
                        @care-team-member-selected=${this.handleCareTeamMemberSelected}
                        @care-team-member-updated=${this.handleCareTeamMemberUpdated}
                        @care-team-member-removed=${this.handleCareTeamMemberRemoved}
                        @show-notification=${this.handleNotification}
                    ></care-team-section>
                `;
            case 'supporting':
                return html`
                    <supporting-info-section
                        .vitalsData=${this.formData.vitals}
                        .selectedVitals=${this.formData.supportingInfo.map(info => info.category.coding[0].code)}
                        @vital-selected=${this.handleVitalSelected}
                        @vital-deselected=${this.handleVitalDeselected}
                        @vital-updated=${this.handleVitalUpdated}
                        @add-vital=${this.handleAddVital}
                        @show-notification=${this.handleNotification}
                    ></supporting-info-section>
                `;
            default:
                return '';
        }
    }

    renderActions() {
        return html`
            <div class="form-actions">
                <button 
                    type="button" 
                    class="button button-secondary"
                    @click=${this.handleCancel}
                >
                    Cancel
                </button>
                <button 
                    type="submit" 
                    class="button button-primary"
                    ?disabled=${!this.isFormValid()}
                >
                    Submit Prior Authorization
                </button>
            </div>
        `;
    }

    handleClaimTypeChange(e) {
        this.selectedClaimType = e.target.value;
    }

    // Event handlers for patient section
    handlePatientSelected(e) {
        this.formData = {
            ...this.formData,
            patient: e.detail
        };
    }

    handleDependentCheckChanged(e) {
        // Handle dependent check change
    }

    handleDependentSelected(e) {
        // Handle dependent selection
    }

    // Event handlers for visit section
    handleVisitTypeChanged(e) {
        // Handle visit type change
    }

    handleVisitSelected(e) {
        this.formData = {
            ...this.formData,
            visit: e.detail
        };
    }

    // Event handlers for eligibility section
    handleEligibilityChecked(e) {
        this.formData = {
            ...this.formData,
            eligibility: e.detail.eligibility,
            coverage: e.detail.coverage
        };
    }

    // Event handlers for medications
    handleMedicationSelected(e) {
        this.formData = {
            ...this.formData,
            medications: [...this.formData.medications, e.detail]
        };
    }

    handleMedicationUpdated(e) {
        const { medication, field, value } = e.detail;
        this.formData = {
            ...this.formData,
            medications: this.formData.medications.map(med =>
                med.id === medication.id ? { ...med, [field]: value } : med
            )
        };
    }

    handleMedicationRemoved(e) {
        this.formData = {
            ...this.formData,
            medications: this.formData.medications.filter(med => med.id !== e.detail.id)
        };
    }

    // Event handlers for diagnoses
    handleDiagnosisSelected(e) {
        this.formData = {
            ...this.formData,
            diagnoses: [...this.formData.diagnoses, e.detail]
        };
    }

    handleDiagnosisUpdated(e) {
        const { diagnosis, field, value } = e.detail;
        this.formData = {
            ...this.formData,
            diagnoses: this.formData.diagnoses.map(diag =>
                diag.id === diagnosis.id ? { ...diag, [field]: value } : diag
            )
        };
    }

    handleDiagnosisRemoved(e) {
        this.formData = {
            ...this.formData,
            diagnoses: this.formData.diagnoses.filter(diag => diag.id !== e.detail.id)
        };
    }

    // Event handlers for care team
    handleCareTeamMemberSelected(e) {
        this.formData = {
            ...this.formData,
            careTeam: [...this.formData.careTeam, e.detail]
        };
    }

    handleCareTeamMemberUpdated(e) {
        const { member, path, value } = e.detail;
        const updateNestedValue = (obj, path, value) => {
            const keys = path.split('.');
            const lastKey = keys.pop();
            const lastObj = keys.reduce((obj, key) => obj[key], obj);
            lastObj[lastKey] = value;
            return obj;
        };

        this.formData = {
            ...this.formData,
            careTeam: this.formData.careTeam.map(m => 
                m.id === member.id ? {...updateNestedValue({...m}, path, value)} : m
            )
        };
    }

    handleCareTeamMemberRemoved(e) {
        this.formData = {
            ...this.formData,
            careTeam: this.formData.careTeam.filter(member => member.id !== e.detail.id)
        };
    }

    // Event handlers for supporting info
    handleVitalSelected(e) {
        const { key, value, config } = e.detail;
        const supportingInfo = {
            sequence: this.formData.supportingInfo.length + 1,
            category: {
                coding: [{
                    system: "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                    code: config.code
                }]
            }
        };

        if (config.unit) {
            supportingInfo.valueQuantity = {
                value: parseFloat(value) || 0,
                system: "http://unitsofmeasure.org",
                code: config.unit
            };
        } else {
            supportingInfo.valueString = value || '';
        }

        this.formData = {
            ...this.formData,
            supportingInfo: [...this.formData.supportingInfo, supportingInfo]
        };
    }

    handleVitalDeselected(e) {
        const { key } = e.detail;
        this.formData = {
            ...this.formData,
            supportingInfo: this.formData.supportingInfo.filter(
                info => info.category.coding[0].code !== key
            )
        };
    }

    handleVitalUpdated(e) {
        const { key, value } = e.detail;
        this.formData = {
            ...this.formData,
            vitals: {
                ...this.formData.vitals,
                [key]: value
            },
            supportingInfo: this.formData.supportingInfo.map(info => {
                if (info.category.coding[0].code === key) {
                    if (info.valueQuantity) {
                        return {
                            ...info,
                            valueQuantity: {
                                ...info.valueQuantity,
                                value: parseFloat(value) || 0
                            }
                        };
                    } else {
                        return {
                            ...info,
                            valueString: value
                        };
                    }
                }
                return info;
            })
        };
    }

    handleAddVital() {
        // Implementation for adding a new vital
    }

    handleNotification(e) {
        const { message, type } = e.detail;
        this.dispatchEvent(new CustomEvent('show-notification', {
            detail: { message, type },
            bubbles: true,
            composed: true
        }));
    }

    handleCancel() {
        this.dispatchEvent(new CustomEvent('cancel', {
            bubbles: true,
            composed: true
        }));
    }

    isFormValid() {
        return (
            this.formData.patient && // Has patient
            this.formData.visit && // Has visit
            this.formData.diagnoses.length > 0 && // Has at least one diagnosis
            this.formData.eligibility // Has eligibility info
        );
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.isFormValid()) {
            this.handleNotification({
                detail: {
                    message: 'Please fill in all required fields',
                    type: 'error'
                }
            });
            return;
        }

        try {
            this.isLoading = true;
            
            // Create FHIR bundle
            const bundle = this.createFhirBundle();
            
            if (!bundle) {
                throw new Error('Failed to create FHIR bundle');
            }

            // Submit the prior authorization request
            const response = await fetch(API_ENDPOINTS.PRIOR_AUTH.SUBMIT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bundle)
            });

            if (!response.ok) {
                throw new Error('Failed to submit prior authorization');
            }

            const data = await response.json();
            
            if (data.messageType === 'success') {
                this.handleNotification({
                    detail: {
                        message: 'Prior authorization submitted successfully',
                        type: 'success'
                    }
                });
                this.dispatchEvent(new CustomEvent('submit-success', {
                    detail: data,
            bubbles: true,
            composed: true
                }));
            } else {
                throw new Error(data.message || 'Failed to submit prior authorization');
            }
        } catch (error) {
            console.error('Error submitting prior authorization:', error);
            this.handleNotification({
                detail: {
                    message: error.message,
                    type: 'error'
                }
            });
        } finally {
            this.isLoading = false;
        }
    }

    createFhirBundle() {
        // Implementation remains the same as before
        // This method creates the FHIR bundle based on the form data
    }
} 