import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { API_ENDPOINTS } from '../../config/api';
import { sharedStyles } from './shared-styles';
import './MedicationSection';
import './DiagnosisSection';
import './CareTeamSection';
import './VitalsSection';
import './PatientSection';
import './VisitSection';
import './EligibilitySection';
import './SupportingInfoSection';
import { PREAUTH_INSTITUTIONAL_INPATIENT } from '../fhir-jsons/preauth-institutional';
import createPreAuthPayload from '../fhir-jsons/preauth-payload';

@customElement('prior-auth-form-widget')
export class PriorAuthFormWidget extends LitElement {
    static get properties() {
        return {
            formData: { type: Object },
            selectedClaimType: { type: String },
            isLoading: { type: Boolean },
            activeSection: { type: String },
            selectedPatient: { type: Object },
            selectedVisit: { type: Object },
            fhirData: { type: Object }
        };
    }

    constructor() {
        super();
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
        this.activeSection = 'patient';
        this.fhirData = PREAUTH_INSTITUTIONAL_INPATIENT;
    }

    static get styles() {
        return [
            sharedStyles,
            css`
                :host {
                    display: block;
                }

                .card {
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    margin-bottom: 2rem;
                }

                .card-header {
                    padding: 1.5rem;
                    border-bottom: 1px solid var(--gray-200);
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

                .card-body {
                    padding: 1.5rem;
                }

                .sections-container {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .section {
                    position: relative;
                    opacity: 1;
                    pointer-events: auto;
                    transition: all 0.3s ease;
                }

                .section-disabled {
                    opacity: 0.6;
                    pointer-events: none;
                }

                .section-status {
                    position: absolute;
                    left: -2rem;
                    top: 1rem;
                    width: 24px;
                    height: 24px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.875rem;
                    font-weight: 500;
                }

                .status-pending {
                    background: var(--gray-200);
                    color: var(--gray-600);
                }

                .status-active {
                    background: var(--primary-light);
                    color: white;
                }

                .status-complete {
                    background: var(--success);
                    color: white;
                }

                .form-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 1rem;
                    margin-top: 2rem;
                    padding-top: 1.5rem;
                    border-top: 1px solid var(--gray-200);
                }

                .loading-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(255, 255, 255, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }

                .loading-content {
                    text-align: center;
                }

                .loading-spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid var(--gray-200);
                    border-top-color: var(--primary);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                .loading-text {
                    margin-top: 1rem;
                    color: var(--gray-700);
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `
        ];
    }

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
                        <div class="sections-container">
                            <patient-section
                                class="section ${this.activeSection === 'patient' ? 'section-active' : ''}"
                                .patient=${this.formData.patient}
                                @patient-selected=${this.handlePatientSelected}
                            >
                                <div class="section-status ${this.formData.patient ? 'status-complete' : 'status-active'}">
                                    ${this.formData.patient ? '✓' : '1'}
                                </div>
                            </patient-section>

                            <visit-section
                                class="section ${!this.formData.patient ? 'section-disabled' : this.activeSection === 'visit' ? 'section-active' : ''}"
                                .selectedPatient=${this.formData.patient}
                                .selectedVisit=${this.formData.visit}
                                .disabled=${!this.formData.patient}
                                @visit-selected=${this.handleVisitSelected}
                            >
                                <div class="section-status ${this.formData.visit ? 'status-complete' : this.formData.patient ? 'status-active' : 'status-pending'}">
                                    ${this.formData.visit ? '✓' : '2'}
                                </div>
                            </visit-section>

                            <vitals-section
                                .vitalsData=${this.formData?.vitals}
                                .visitDate=${this.formData?.visit?.visitDate}
                                ?disabled=${!this.formData?.visit || this.isLoading}
                            ></vitals-section>

                            <eligibility-section
                                class="section ${!this.formData.visit ? 'section-disabled' : this.activeSection === 'eligibility' ? 'section-active' : ''}"
                                .patient=${this.formData.patient}
                                .visit=${this.formData.visit}
                                .eligibility=${this.formData.eligibility}
                                .coverage=${this.formData.coverage}
                                @eligibility-checked=${this.handleEligibilityChecked}
                            >
                                <div class="section-status ${this.formData.eligibility ? 'status-complete' : this.formData.visit ? 'status-active' : 'status-pending'}">
                                    ${this.formData.eligibility ? '✓' : '3'}
                                </div>
                            </eligibility-section>

                            <diagnosis-section
                                class="section ${!this.formData.eligibility ? 'section-disabled' : this.activeSection === 'diagnoses' ? 'section-active' : ''}"
                                .diagnoses=${this.formData.diagnoses}
                                @diagnosis-selected=${this.handleDiagnosisSelected}
                                @diagnosis-updated=${this.handleDiagnosisUpdated}
                                @diagnosis-removed=${this.handleDiagnosisRemoved}
                            >
                                <div class="section-status ${this.formData.diagnoses.length > 0 ? 'status-complete' : this.formData.eligibility ? 'status-active' : 'status-pending'}">
                                    ${this.formData.diagnoses.length > 0 ? '✓' : '4'}
                                </div>
                            </diagnosis-section>

                            <medication-section
                                class="section ${!this.formData.diagnoses.length ? 'section-disabled' : this.activeSection === 'medications' ? 'section-active' : ''}"
                                .medications=${this.formData.medications}
                                @medication-selected=${this.handleMedicationSelected}
                                @medication-updated=${this.handleMedicationUpdated}
                                @medication-removed=${this.handleMedicationRemoved}
                            >
                                <div class="section-status ${this.formData.medications.length > 0 ? 'status-complete' : this.formData.diagnoses.length > 0 ? 'status-active' : 'status-pending'}">
                                    ${this.formData.medications.length > 0 ? '✓' : '5'}
                                </div>
                            </medication-section>

                            <care-team-section
                                class="section ${!this.formData.medications.length ? 'section-disabled' : this.activeSection === 'careTeam' ? 'section-active' : ''}"
                                .careTeam=${this.formData.careTeam}
                                @care-team-member-selected=${this.handleCareTeamMemberSelected}
                                @care-team-member-updated=${this.handleCareTeamMemberUpdated}
                                @care-team-member-removed=${this.handleCareTeamMemberRemoved}
                            >
                                <div class="section-status ${this.formData.careTeam.length > 0 ? 'status-complete' : this.formData.medications.length > 0 ? 'status-active' : 'status-pending'}">
                                    ${this.formData.careTeam.length > 0 ? '✓' : '6'}
                                </div>
                            </care-team-section>

                            <supporting-info-section
                                class="section ${!this.formData.visit ? 'section-disabled' : ''}"
                                .supportingInfo=${this.formData.supportingInfo}
                                .vitalsData=${this.formData.vitals}
                                .visitDate=${this.formData.visit?.visitDate}
                                @vital-updated=${this.handleVitalUpdated}
                                @supporting-info-update=${this.handleSupportingInfoUpdate}
                            >
                                <div class="section-status ${this.formData.supportingInfo.length > 0 ? 'status-complete' : this.formData.visit ? 'status-active' : 'status-pending'}">
                                    ${this.formData.supportingInfo.length > 0 ? '✓' : '7'}
                                </div>
                            </supporting-info-section>
                        </div>

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
                    </form>
                </div>
            </div>

            ${this.isLoading ? html`
                <div class="loading-overlay">
                    <div class="loading-content">
                        <div class="loading-spinner"></div>
                        <div class="loading-text">Processing your request...</div>
                    </div>
                </div>
            ` : ''}
        `;
    }

    handleClaimTypeChange(e) {
        this.selectedClaimType = e.target.value;
    }

    handlePatientSelected(e) {
        const patientData = e.detail.patient;
        
        // Reset form data when new patient is selected
        this.formData = {
            ...this.formData,
            patient: patientData,
            visit: null,
            eligibility: null,
            coverage: null,
            medications: [],
            diagnoses: [],
            careTeam: [],
            supportingInfo: [],
            vitals: {}
        };

        // Dispatch an event to notify other components about patient selection
        this.dispatchEvent(new CustomEvent('patient-update', {
            detail: { patient: patientData },
            bubbles: true,
            composed: true
        }));
        
        // Automatically switch to visit section after patient selection
        this.activeSection = 'visit';
    }

    handleVisitSelected(e) {
        const { visit, vitals } = e.detail;
        this.selectedVisit = visit;
        this.formData = {
            ...this.formData,
            visit: visit,
            vitals: vitals
        };

        // Extract supporting info from FHIR data if available
        if (this.fhirData?.CLAIM?.resource?.supportingInfo) {
            this.formData.supportingInfo = this.fhirData.CLAIM.resource.supportingInfo;
            
            // Dispatch supporting info update event
            this.dispatchEvent(new CustomEvent('supporting-info-update', {
                detail: { supportingInfo: this.formData.supportingInfo },
                bubbles: true,
                composed: true
            }));
        }

        // Update vitals section
        const vitalsSection = this.shadowRoot.querySelector('vitals-section');
        if (vitalsSection) {
            vitalsSection.vitalsData = vitals;
            vitalsSection.visitDate = visit.visitDate;
        }

        // Update supporting info section
        const supportingInfoSection = this.shadowRoot.querySelector('supporting-info-section');
        if (supportingInfoSection) {
            supportingInfoSection.supportingInfo = this.formData.supportingInfo;
            supportingInfoSection.vitalsData = vitals;
            supportingInfoSection.visitDate = visit.visitDate;
        }

        // Enable subsequent sections
        this.updateSectionStates();

        // Dispatch form update event
        this.dispatchFormUpdateEvent();
    }

    handleEligibilityChecked(e) {
        this.formData = {
            ...this.formData,
            eligibility: e.detail.eligibility,
            coverage: e.detail.coverage
        };
    }

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

    handleSupportingInfoUpdate(e) {
        const { supportingInfo } = e.detail;
        this.formData = {
            ...this.formData,
            supportingInfo
        };

        // Update FHIR data
        if (this.fhirData?.CLAIM?.resource) {
            this.fhirData.CLAIM.resource.supportingInfo = supportingInfo;
        }

        this.dispatchFormUpdateEvent();
    }

    handleVitalUpdated(e) {
        const { key, value } = e.detail;
        this.formData = {
            ...this.formData,
            vitals: {
                ...this.formData.vitals,
                [key]: value
            }
        };
        this.dispatchFormUpdateEvent();
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
            this.formData.patient && 
            this.formData.visit && 
            this.formData.diagnoses.length > 0 && 
            this.formData.eligibility
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
        try {
            return createPreAuthPayload(this.formData);
        } catch (error) {
            console.error('Error creating FHIR bundle:', error);
            this.handleNotification({
                detail: {
                    message: 'Error creating FHIR bundle: ' + error.message,
                    type: 'error'
                }
            });
            return null;
        }
    }

    updateSectionStates() {
        // Implementation of updateSectionStates method
    }

    dispatchFormUpdateEvent() {
        // Implementation of dispatchFormUpdateEvent method
    }
} 