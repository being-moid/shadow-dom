import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { API_ENDPOINTS } from '../../config/api';
import { sharedStyles } from './shared-styles';

@customElement('visit-section')
export class VisitSection extends LitElement {
    static styles = [
        sharedStyles,
        css`
            :host {
                display: block;
            }

            .visit-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 1rem;
                margin-top: 1rem;
            }

            .visit-card {
                background: white;
                border: 1px solid var(--gray-200);
                border-radius: 12px;
                padding: 1.25rem;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .visit-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }

            .visit-card.selected {
                border-color: var(--primary);
                box-shadow: 0 0 0 2px var(--primary-light);
            }

            .visit-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }

            .visit-date {
                font-weight: 600;
                color: var(--gray-900);
            }

            .visit-type {
                padding: 0.25rem 0.75rem;
                border-radius: 0.25rem;
                font-size: 0.875rem;
                background: var(--gray-100);
                color: var(--gray-700);
            }

            .visit-details {
                display: grid;
                gap: 0.75rem;
            }

            .detail-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .detail-label {
                color: var(--gray-600);
                font-size: 0.875rem;
            }

            .detail-value {
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

            .status-completed {
                background-color: var(--gray-500);
                color: white;
            }

            .status-scheduled {
                background-color: var(--primary-light);
                color: white;
            }

            .loading-container {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 200px;
            }

            .empty-state {
                text-align: center;
                padding: 2rem;
                color: var(--gray-500);
            }

            .section-disabled {
                opacity: 0.5;
                pointer-events: none;
            }

            .episode-tag {
                display: inline-flex;
                align-items: center;
                padding: 0.25rem 0.5rem;
                background: var(--gray-100);
                border-radius: 4px;
                font-size: 0.75rem;
                color: var(--gray-700);
                margin-top: 0.5rem;
            }
        `
    ];

    static get properties() {
        return {
            selectedPatient: { type: Object },
            selectedVisit: { type: Object },
            visits: { type: Array },
            isLoading: { type: Boolean },
            disabled: { type: Boolean }
        };
    }

    constructor() {
        super();
        this.selectedPatient = null;
        this.selectedVisit = null;
        this.visits = [];
        this.isLoading = false;
        this.disabled = true;
    }

    async fetchVisits() {
        if (!this.selectedPatient) return;

        this.isLoading = true;
        try {
            const response = await fetch(API_ENDPOINTS.VISIT.PAGED, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    page: 1,
                    pageSize: 10,
                    filters: "patientId==" + this.selectedPatient.id
                })
            });

            const result = await response.json();
            if (result.isSuccessfull && result.dynamicResult) {
                this.visits = result.dynamicResult;
                if (this.visits.length > 0) {
                    this.selectVisit(this.visits[0]);
                }
            }
        } catch (error) {
            console.error('Error fetching visits:', error);
            this.dispatchEvent(new CustomEvent('show-notification', {
                detail: { message: 'Error loading visits', type: 'error' },
                bubbles: true,
                composed: true
            }));
        } finally {
            this.isLoading = false;
        }
    }

    updated(changedProperties) {
        if (changedProperties.has('selectedPatient') && this.selectedPatient) {
            this.disabled = false;
            this.fetchVisits();
        }
    }

    async selectVisit(visit) {
        this.selectedVisit = visit;

        // Prepare visit details
        const visitDetails = {
            id: visit.id,
            clinicalSessionId: visit.clinicalSessionId,
            startTime: visit.startTime,
            endTime: visit.endTime,
            visitDate: visit.visitDate,
            type: visit.fkVisitSubType?.subTypeName || this.getVisitTypeName(visit.fkVisitSubTypeId),
            status: visit.fkPatientVisitStatus?.statusName || this.getVisitStatusName(visit.fkPatientVisitStatusId),
            facility: visit.fkFacilityId,
            episodeId: visit.episodeId,
            transactionId: visit.transactionIdno,
            reasonOfVisit: visit.reasonOfVisit,
            doctor: visit.doctor ? {
                id: visit.doctor.id,
                name: `${visit.doctor.fname} ${visit.doctor.lname}`.trim(),
                department: visit.doctor.departmentId,
                designation: visit.doctor.designationId,
                licenseNumber: visit.doctor.pinNo
            } : null,
            episode: visit.episode ? {
                id: visit.episode.id,
                number: visit.episode.epNumber,
                status: visit.episode.epStatus,
                isInsuranceApplied: visit.episode.isInsuranceApplied === 1
            } : null
        };

        // Fetch vitals for the selected visit
        const vitals = await this.fetchVitals(visit.id);

        // Dispatch visit selection event with vitals
        this.dispatchEvent(new CustomEvent('visit-selected', {
            detail: { 
                visit: visitDetails,
                vitals: vitals?.[0] || null
            },
            bubbles: true,
            composed: true
        }));

        // Dispatch vitals update event if vitals exist
        if (vitals?.length > 0) {
            this.dispatchEvent(new CustomEvent('vitals-update', {
                detail: { vitals: vitals[0] },
                bubbles: true,
                composed: true
            }));
        }

        // Dispatch doctor/care team event if doctor info exists
        if (visit.doctor) {
            this.dispatchEvent(new CustomEvent('care-team-update', {
                detail: {
                    provider: {
                        id: visit.doctor.id,
                        name: `${visit.doctor.fname} ${visit.doctor.lname}`.trim(),
                        type: 'primary',
                        department: visit.doctor.departmentId,
                        designation: visit.doctor.designationId,
                        licenseNumber: visit.doctor.pinNo
                    }
                },
                bubbles: true,
                composed: true
            }));
        }

        // Dispatch episode update event if episode exists
        if (visit.episode) {
            this.dispatchEvent(new CustomEvent('episode-update', {
                detail: {
                    episode: {
                        id: visit.episode.id,
                        number: visit.episode.epNumber,
                        status: visit.episode.epStatus,
                        isInsuranceApplied: visit.episode.isInsuranceApplied === 1
                    }
                },
                bubbles: true,
                composed: true
            }));
        }
    }

    async fetchVitals(visitId) {
        try {
            // Try outpatient BMI records first
            const outpatientResponse = await fetch(API_ENDPOINTS.VITALS.OUTPATIENT_BMI, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    page: 1,
                    pageSize: 10,
                    filters: 'visitId==' + visitId
                })
            });

            let vitalsData = null;
            const outpatientResult = await outpatientResponse.json();
            
            if (outpatientResult.isSuccessfull && outpatientResult.dynamicResult?.length > 0) {
                vitalsData = this.processVitalsData(outpatientResult.dynamicResult[0]);
            } else {
                // If no outpatient records, try inpatient records
                const inpatientResponse = await fetch(API_ENDPOINTS.VITALS.INPATIENT_BMI, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        page: 1,
                        pageSize: 10,
                        filters: 'NurseVisitId==' + visitId
                    })
                });

                const inpatientResult = await inpatientResponse.json();
                if (inpatientResult.isSuccessfull && inpatientResult.dynamicResult?.length > 0) {
                    vitalsData = this.processVitalsData(inpatientResult.dynamicResult[0]);
                }
            }

            return vitalsData ? [vitalsData] : [];
        } catch (error) {
            console.error('Error fetching vitals:', error);
            this.dispatchEvent(new CustomEvent('show-notification', {
                detail: { message: 'Error fetching vitals information', type: 'error' },
                bubbles: true,
                composed: true
            }));
            return [];
        }
    }

    processVitalsData(rawData) {
        // Process and normalize the vitals data
        return {
            height: parseFloat(rawData.height) || 0,
            weight: parseFloat(rawData.weight) || 0,
            bmi: parseFloat(rawData.bmi) || 0,
            systolic: parseFloat(rawData.systolicBP) || 0,
            diastolic: parseFloat(rawData.diastolicBP) || 0,
            pulseRate: parseFloat(rawData.pulseRate) || 0,
            temperature: parseFloat(rawData.temperature) || 0,
            spo2: parseFloat(rawData.spo2) || 0,
            respRate: parseFloat(rawData.respiratoryRate) || 0,
            bloodSugar: parseFloat(rawData.bloodSugar) || 0,
            chiefComplaint: rawData.chiefComplaint || '',
            creationDate: rawData.creationDate || rawData.createdDate || new Date().toISOString()
        };
    }

    getVisitTypeName(typeId) {
        const types = {
            1: 'New Patient Consultation',
            2: 'Follow Up',
            3: 'Emergency',
            4: 'Day Care'
        };
        return types[typeId] || 'Unknown';
    }

    getVisitStatusName(statusId) {
        const statuses = {
            1: 'New',
            2: 'In Progress',
            3: 'Completed',
            4: 'Cancelled'
        };
        return statuses[statusId] || 'Unknown';
    }

    getStatusClass(status) {
        const classes = {
            'New': 'status-scheduled',
            'In Progress': 'status-active',
            'Completed': 'status-completed'
        };
        return classes[status] || '';
    }

    formatDate(date) {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    render() {
        if (this.disabled) {
            return html`
                <div class="section-content">
                    <div class="notice">
                        Please select a patient first to view visits.
                    </div>
                </div>
            `;
        }

        return html`
            <div class="section-content">
                <h3 class="section-title">Visit Information</h3>
                
                ${this.isLoading ? html`
                    <div class="loading-container">
                        <div class="loading-spinner"></div>
                    </div>
                ` : this.visits.length === 0 ? html`
                    <div class="empty-state">
                        No visits found for this patient.
                    </div>
                ` : html`
                    <div class="visit-grid">
                        ${this.visits.map(visit => html`
                            <div class="visit-card ${this.selectedVisit?.id === visit.id ? 'selected' : ''}"
                                 @click=${() => this.selectVisit(visit)}>
                                <div class="visit-header">
                                    <span class="visit-date">${this.formatDate(visit.visitDate)}</span>
                                    <span class="visit-type">
                                        ${visit.fkVisitSubType?.subTypeName || this.getVisitTypeName(visit.fkVisitSubTypeId)}
                                    </span>
                                </div>
                                <div class="visit-details">
                                    <div class="detail-item">
                                        <span class="detail-label">Status:</span>
                                        <span class="status-badge ${this.getStatusClass(visit.fkPatientVisitStatus?.statusName || this.getVisitStatusName(visit.fkPatientVisitStatusId))}">
                                            ${visit.fkPatientVisitStatus?.statusName || this.getVisitStatusName(visit.fkPatientVisitStatusId)}
                                        </span>
                                    </div>
                                    ${visit.doctor ? html`
                                        <div class="detail-item">
                                            <span class="detail-label">Doctor:</span>
                                            <span class="detail-value">Dr. ${visit.doctor.fname} ${visit.doctor.lname}</span>
                                        </div>
                                    ` : ''}
                                    ${visit.reasonOfVisit ? html`
                                        <div class="detail-item">
                                            <span class="detail-label">Reason:</span>
                                            <span class="detail-value">${visit.reasonOfVisit}</span>
                                        </div>
                                    ` : ''}
                                    ${visit.episode ? html`
                                        <div class="episode-tag">
                                            Episode #${visit.episode.epNumber || visit.episodeId}
                                            ${visit.episode.isInsuranceApplied === 1 ? ' (Insurance Applied)' : ''}
                                        </div>
                                    ` : ''}
                                </div>
                            </div>
                        `)}
                    </div>
                `}
            </div>
        `;
    }
} 