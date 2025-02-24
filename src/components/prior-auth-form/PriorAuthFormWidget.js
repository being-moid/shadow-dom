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
import './ProcedureSection';
import './FloatingFooter';
import './BodySiteSection';
import { PREAUTH_INSTITUTIONAL_INPATIENT } from '../fhir-jsons/preauth-institutional';
import createPreAuthPayload from '../fhir-jsons/preauth-payload';
import { PriorAuthRequestTest } from '../../services/PriorAuthRequestTest';
import PriorAuthRequestMapper from '../../services/PriorAuthRequestMapper';
import fhirClient from '../../services/FhirClient';

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
            fhirData: { type: Object },
            diagnoses: { type: Array },
            medications: { type: Array },
            careTeam: { type: Array },
            procedures: { type: Array },
            procedureTotals: { type: Object, state: true }
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
            procedures: [],
            supportingInfo: [],
            vitals: {},
            bodySite: null
        };
        this.selectedClaimType = 'institutional';
        this.isLoading = false;
        this.fhirData = PREAUTH_INSTITUTIONAL_INPATIENT;

        // Initialize empty arrays for the sections
        this.diagnoses = [];
        this.medications = [];
        this.careTeam = [];
        this.procedures = [];
        this.procedureTotals = {
            subtotal: 0,
            vat: 0,
            total: 0
        };
    }

    static get styles() {
        return [
            sharedStyles,
            css`
                :host {
                    display: block;
                    position: relative;
                    padding-bottom: 80px; /* Space for floating footer */
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

                .test-button {
                    background-color: var(--warning);
                    color: white;
                    margin-right: 1rem;
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
                                class="section"
                                .diagnoses=${this.diagnoses}
                                @diagnosis-selected=${this.handleDiagnosisSelected}
                                @diagnosis-updated=${this.handleDiagnosisUpdated}
                                @diagnosis-removed=${this.handleDiagnosisRemoved}
                                @show-notification=${this.handleNotification}
                            >
                                <div class="section-status ${this.formData.diagnoses.length > 0 ? 'status-complete' : 'status-active'}">
                                    ${this.formData.diagnoses.length > 0 ? '✓' : '4'}
                                </div>
                            </diagnosis-section>

                            <medication-section
                                class="section"
                                .medications=${this.medications}
                                @medication-selected=${this.handleMedicationSelected}
                                @medication-updated=${this.handleMedicationUpdated}
                                @medication-removed=${this.handleMedicationRemoved}
                                @show-notification=${this.handleNotification}
                            >
                                <div class="section-status ${this.formData.medications.length > 0 ? 'status-complete' : 'status-active'}">
                                    ${this.formData.medications.length > 0 ? '✓' : '5'}
                                </div>
                            </medication-section>

                            <care-team-section
                                class="section"
                                .careTeam=${this.careTeam}
                                @care-team-member-selected=${this.handleCareTeamMemberSelected}
                                @care-team-member-updated=${this.handleCareTeamMemberUpdated}
                                @care-team-member-removed=${this.handleCareTeamMemberRemoved}
                                @show-notification=${this.handleNotification}
                            >
                                <div class="section-status ${this.formData.careTeam.length > 0 ? 'status-complete' : 'status-active'}">
                                    ${this.formData.careTeam.length > 0 ? '✓' : '6'}
                                </div>
                            </care-team-section>

                            <body-site-section
                                class="section ${this.activeSection === 'body-site' ? 'section-active' : ''}"
                                @body-site-changed=${this.handleBodySiteChanged}
                            >
                                <div class="section-status ${this.formData.bodySite ? 'status-complete' : 'status-active'}">
                                    ${this.formData.bodySite ? '✓' : '7'}
                                </div>
                            </body-site-section>

                            <procedure-section
                                class="section"
                                .procedures=${this.procedures}
                                @procedures-changed=${this.handleProceduresChanged}
                                @show-notification=${this.handleNotification}
                            >
                                <div class="section-status ${this.formData.procedures.length > 0 ? 'status-complete' : 'status-active'}">
                                    ${this.formData.procedures.length > 0 ? '✓' : '8'}
                                </div>
                            </procedure-section>

                            <supporting-info-section
                                class="section ${!this.formData.visit ? 'section-disabled' : ''}"
                                .supportingInfo=${this.formData.supportingInfo}
                                .vitalsData=${this.formData.vitals}
                                .visitDate=${this.formData.visit?.visitDate}
                                @vital-updated=${this.handleVitalUpdated}
                                @supporting-info-update=${this.handleSupportingInfoUpdate}
                            >
                                <div class="section-status ${this.formData.supportingInfo.length > 0 ? 'status-complete' : this.formData.visit ? 'status-active' : 'status-pending'}">
                                    ${this.formData.supportingInfo.length > 0 ? '✓' : '9'}
                                </div>
                            </supporting-info-section>
                        </div>

                        <div class="form-actions">
                            <button 
                                type="button" 
                                class="button test-button"
                                ?disabled=${this.isLoading}
                                @click=${this.runMapperTest}
                            >
                                Run Mapper Test
                            </button>
                            <button 
                                type="button" 
                                class="button test-button"
                                ?disabled=${this.isLoading}
                                @click=${this.runStaticDentalTest}
                            >
                                Run Static Dental Test
                            </button>
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

            <floating-footer
                .subtotal=${this.procedureTotals?.subtotal || 0}
                .vat=${this.procedureTotals?.vat || 0}
                .total=${this.procedureTotals?.total || 0}
                .itemCount=${this.procedures?.length || 0}
                .isVisible=${(this.procedures?.length || 0) > 0}
            ></floating-footer>
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
            procedures: [],
            supportingInfo: [],
            vitals: {},
            bodySite: null
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
        this.medications = [...this.medications, e.detail];
        this.formData = {
            ...this.formData,
            medications: this.medications
        };
        this.requestUpdate();
    }

    handleMedicationUpdated(e) {
        const { medication, field, value } = e.detail;
        this.medications = this.medications.map(med =>
            med.id === medication.id ? { ...med, [field]: value } : med
        );
        this.formData = {
            ...this.formData,
            medications: this.medications
        };
        this.requestUpdate();
    }

    handleMedicationRemoved(e) {
        this.medications = this.medications.filter(med => med.id !== e.detail.id);
        this.formData = {
            ...this.formData,
            medications: this.medications
        };
        this.requestUpdate();
    }

    handleDiagnosisSelected(e) {
        this.diagnoses = [...this.diagnoses, e.detail];
        this.formData = {
            ...this.formData,
            diagnoses: this.diagnoses
        };
        this.requestUpdate();
    }

    handleDiagnosisUpdated(e) {
        const { diagnosis, field, value } = e.detail;
        this.diagnoses = this.diagnoses.map(diag =>
            diag.id === diagnosis.id ? { ...diag, [field]: value } : diag
        );
        this.formData = {
            ...this.formData,
            diagnoses: this.diagnoses
        };
        this.requestUpdate();
    }

    handleDiagnosisRemoved(e) {
        this.diagnoses = this.diagnoses.filter(diag => diag.id !== e.detail.id);
        this.formData = {
            ...this.formData,
            diagnoses: this.diagnoses
        };
        this.requestUpdate();
    }

    handleCareTeamMemberSelected(e) {
        this.careTeam = [...this.careTeam, e.detail];
        this.formData = {
            ...this.formData,
            careTeam: this.careTeam
        };
        this.requestUpdate();
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

        this.careTeam = this.careTeam.map(m => 
            m.id === member.id ? {...updateNestedValue({...m}, path, value)} : m
        );
        this.formData = {
            ...this.formData,
            careTeam: this.careTeam
        };
        this.requestUpdate();
    }

    handleCareTeamMemberRemoved(e) {
        this.careTeam = this.careTeam.filter(member => member.id !== e.detail.id);
        this.formData = {
            ...this.formData,
            careTeam: this.careTeam
        };
        this.requestUpdate();
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
                detail: { message: 'Please fill in all required fields', type: 'error' }
            });
            return;
        }

        try {
            this.isLoading = true;
            const payload = this.preparePayload();
            console.log('Submitting payload:', payload);

            const response = await this.submitPriorAuth(payload);
            
            if (response.success) {
                this.handleNotification({
                    detail: { message: 'Prior authorization submitted successfully', type: 'success' }
                });
                // Optional: Reset form or redirect
            } else {
                throw new Error(response.message || 'Submission failed');
            }
            
        } catch (error) {
            console.error('Error submitting prior auth:', error);
            this.handleNotification({
                detail: { message: error.message, type: 'error' }
            });
        } finally {
            this.isLoading = false;
        }
    }

    preparePayload() {
        const now = new Date().toISOString();
        const visitDates = this.formData.visit?.visitDate ? {
            billablePeriodStart: this.formData.visit.visitDate,
            billablePeriodEnd: this.formData.visit.visitDate
        } : {};

        // Base payload structure
        const payload = {
            identifier: crypto.randomUUID(),
            status: "active",
            type: this.selectedClaimType || "Institutional",
            subType: "Outpatient", // Could be dynamic based on visit type
            use: "Pre-authorization",
            patientId: this.formData.patient?.id,
            patientDemographics: this.formatPatientDemographics(),
            created: now,
            insurerId: this.formData.coverage?.payerId,
            insurerDemographics: this.formatInsurerDemographics(),
            providerId: this.formData.visit?.facilityId,
            providerDemographics: this.formatProviderDemographics(),
            priority: "normal",
            payeeType: "provider",
            total: this.calculateTotal(),
            ...visitDates
        };

        // Add care team if present
        if (this.formData.careTeam?.length > 0) {
            payload.careTeam = this.formData.careTeam.map((member, index) => ({
                sequence: index + 1,
                provider: member.id,
                role: member.role?.code || "primary",
                qualification: member.qualification?.code,
                specialty: member.specialty
            }));
        }

        // Add diagnoses if present
        if (this.formData.diagnoses?.length > 0) {
            payload.diagnoses = this.formData.diagnoses.map((diagnosis, index) => ({
                sequence: index + 1,
                diagnosis: diagnosis.code,
                type: diagnosis.type || "principal",
                packageCode: diagnosis.packageCode
            }));
        }

        // Add procedures/items if present
        if (this.formData.procedures?.length > 0) {
            payload.items = this.formData.procedures.map((procedure, index) => ({
                sequence: index + 1,
                revenue: procedure.revenueCode,
                category: procedure.category,
                productOrService: procedure.cptCode,
                modifier: procedure.modifier,
                programCode: procedure.programCode,
                quantity: procedure.quantity || 1,
                unitPrice: procedure.charges,
                net: procedure.charges * (procedure.quantity || 1)
            }));
        }

        // Add medications if present
        if (this.formData.medications?.length > 0) {
            payload.medicationRequests = this.formData.medications.map((medication, index) => ({
                sequence: index + 1,
                medicationReference: medication.code,
                authoredOn: now,
                requester: this.formData.careTeam?.[0]?.id,
                reasonCode: this.formData.diagnoses?.[0]?.code,
                dosageInstructions: medication.dosage
            }));
        }

        // Add supporting info if present
        if (this.formData.supportingInfo?.length > 0) {
            payload.supportingInformation = this.formData.supportingInfo.map((info, index) => ({
                sequence: index + 1,
                category: info.category?.coding?.[0]?.code,
                code: info.code?.coding?.[0]?.code,
                value: info.valueString || info.valueQuantity?.value?.toString(),
                type: info.type,
                dateTime: now
            }));
        }

        // Add insurance if present
        if (this.formData.coverage) {
            payload.insurances = [{
                sequence: 1,
                focal: true,
                coverage: this.formData.coverage.id,
                businessArrangement: this.formData.coverage.businessArrangement,
                preAuthRef: this.formData.coverage.preAuthRef
            }];
        }

        // Add body site if present
        if (this.formData.bodySite) {
            payload.supportingInformation = [
                ...(payload.supportingInformation || []),
                {
                    sequence: (payload.supportingInformation?.length || 0) + 1,
                    category: "bodysite",
                    code: this.formData.bodySite.bodySite,
                    value: this.formData.bodySite.subSite,
                    type: "location",
                    dateTime: now
                }
            ];
        }

        return payload;
    }

    formatPatientDemographics() {
        const patient = this.formData.patient;
        if (!patient) return '';
        return `${patient.firstName} ${patient.lastName}, ${patient.gender}, ${patient.dateOfBirth}`;
    }

    formatInsurerDemographics() {
        const coverage = this.formData.coverage;
        if (!coverage) return '';
        return coverage.payerName || '';
    }

    formatProviderDemographics() {
        const visit = this.formData.visit;
        if (!visit) return '';
        return visit.facilityName || '';
    }

    calculateTotal() {
        return this.formData.procedures?.reduce((sum, proc) => 
            sum + (proc.charges * (proc.quantity || 1)), 0) || 0;
    }

    async submitPriorAuth(payload) {
        try {
            const response = await fetch(`${API_ENDPOINTS.PRE_AUTH_REQ}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit prior authorization');
            }

            const result = await response.json();
            return {
                success: true,
                data: result
            };

        } catch (error) {
            console.error('Error submitting prior auth:', error);
            return {
                success: false,
                message: error.message || 'Failed to submit prior authorization'
            };
        }
    }

    updateSectionStates() {
        // Remove section dependencies
        const sections = this.shadowRoot.querySelectorAll('.section');
        sections.forEach(section => {
            section.classList.remove('section-disabled');
        });
    }

    dispatchFormUpdateEvent() {
        // Implementation of dispatchFormUpdateEvent method
    }

    async runMapperTest() {
        this.isLoading = true;
        try {
            // Create test data
            const testData = {
                patient: {
                    id: "test-patient-001",
                    nationalId: "1234567890",
                    firstName: "Test",
                    lastName: "Patient",
                    gender: "male",
                    dob: "1990-01-01",
                    phone: "+966500000000",
                    occupation: "student",
                    maritalStatus: "U"
                },
                provider: {
                    id: "PR-FHIR",
                    licenseNumber: "PR-FHIR",
                    name: "Test Provider Organization",
                    endpoint: "http://provider.com"
                },
                insurer: {
                    id: "INS-FHIR",
                    name: "Test Insurance Company"
                },
                policyHolder: {
                    id: "POL-001"
                },
                coverage: {
                    id: "COV-001",
                    beneficiaryId: "test-patient-001",
                    payorId: "INS-FHIR",
                    policyHolderId: "POL-001",
                    subscriberId: "test-patient-001",
                    relationship: "self",
                    planNumber: "PLAN-001",
                    planName: "Test Insurance Plan",
                    network: "Test Network"
                },
                visit: {
                    startDate: new Date().toISOString(),
                    endDate: new Date(Date.now() + 86400000).toISOString()
                },
                diagnoses: [
                    {
                        code: "K02.9",
                        description: "Dental caries, unspecified"
                    }
                ],
                items: [
                    {
                        sequence: 1,
                        serviceCode: "D2391",
                        serviceName: "Resin-based composite - one surface, posterior",
                        bodySite: {
                            code: "46",
                            display: "Mandibular Right First Molar"
                        },
                        patientShare: 0,
                        isPackage: false,
                        careTeamMembers: [{ sequence: 1 }],
                        diagnosisReferences: [1],
                        net: { value: 500 }
                    }
                ],
                careTeam: [
                    {
                        id: "PRACT-001",
                        licenseNumber: "MD12345",
                        firstName: "Doctor",
                        lastName: "Test",
                        title: "Dr",
                        name: "Dr. Test Doctor",
                        role: "primary",
                        qualificationCode: "DEN"
                    }
                ],
                supportingInfo: [
                    {
                        sequence: 1,
                        category: "info",
                        valueString: "Test supporting information"
                    }
                ]
            };

            // Generate FHIR Bundle using the mapper
            const fhirBundle = PriorAuthRequestMapper.createRequest(testData);
            console.log('Generated Test Prior Auth Bundle:', fhirBundle);

            // Send the bundle using fhirClient
            const response = await fhirClient.processMessage(fhirBundle);
            console.log('Test Prior Auth Response:', response);

            // Show success notification
            this.dispatchEvent(new CustomEvent('show-notification', {
                detail: {
                    message: 'Prior Auth Mapper test completed successfully',
                    type: 'success'
                },
                bubbles: true,
                composed: true
            }));

        } catch (error) {
            console.error('Error in Prior Auth Mapper test:', error);
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
        }
    }

    async runStaticDentalTest() {
        this.isLoading = true;
        try {
            // Call the static test method from PriorAuthRequestMapper
            const response = await PriorAuthRequestMapper.sendStaticTestRequest();
            
            // Show success notification
            this.dispatchEvent(new CustomEvent('show-notification', {
                detail: {
                    message: 'Static Dental Prior Auth test completed successfully',
                    type: 'success'
                },
                bubbles: true,
                composed: true
            }));

            // Log the response for debugging
            console.log('Static Dental Test Response:', response);

        } catch (error) {
            console.error('Error in Static Dental test:', error);
            this.dispatchEvent(new CustomEvent('show-notification', {
                detail: {
                    message: `Static Dental Test Error: ${error.message}`,
                    type: 'error'
                },
                bubbles: true,
                composed: true
            }));
        } finally {
            this.isLoading = false;
        }
    }

    handleProceduresChanged(e) {
        const { procedures, totals } = e.detail;
        this.procedures = procedures;
        this.procedureTotals = totals || { subtotal: 0, vat: 0, total: 0 };
        this.formData = {
            ...this.formData,
            procedures: this.procedures
        };
        this.requestUpdate();
    }

    handleBodySiteChanged(e) {
        const { bodySite, subSite } = e.detail;
        this.formData = { ...this.formData, bodySite: { bodySite, subSite } };
    }
} 