import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { sharedStyles } from './shared-styles';

@customElement('supporting-info-section')
export class SupportingInfoSection extends LitElement {
    static styles = [
        sharedStyles,
        css`
            :host {
                display: block;
            }

            .document-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 1.5rem;
                margin-top: 1rem;
            }

            .document-card {
                background: white;
                border: 1px solid var(--gray-200);
                border-radius: 12px;
                padding: 1.25rem;
                transition: all 0.2s ease;
            }

            .document-card:hover {
                border-color: var(--primary-light);
                box-shadow: 0 2px 4px rgba(133, 0, 216, 0.1);
            }

            .document-header {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 1rem;
            }

            .document-icon {
                width: 40px;
                height: 40px;
                color: var(--primary);
                padding: 8px;
                background: var(--gray-50);
                border-radius: 10px;
            }

            .document-info {
                flex: 1;
            }

            .document-title {
                color: var(--gray-900);
                font-weight: 500;
                margin-bottom: 0.25rem;
            }

            .document-meta {
                color: var(--gray-500);
                font-size: 0.875rem;
                display: flex;
                gap: 1rem;
            }

            .meta-item {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .meta-icon {
                width: 16px;
                height: 16px;
                color: var(--gray-400);
            }

            .document-actions {
                display: flex;
                gap: 0.75rem;
            }

            .action-button {
                background: var(--gray-50);
                border: none;
                border-radius: 8px;
                color: var(--gray-700);
                cursor: pointer;
                padding: 0.5rem;
                transition: all 0.2s ease;
            }

            .action-button:hover {
                background: var(--gray-100);
                color: var(--gray-900);
            }

            .action-icon {
                width: 20px;
                height: 20px;
            }

            .upload-zone {
                border: 2px dashed var(--gray-200);
                border-radius: 12px;
                padding: 2rem;
                text-align: center;
                transition: all 0.2s ease;
                background: var(--gray-50);
                cursor: pointer;
            }

            .upload-zone:hover,
            .upload-zone.dragging {
                border-color: var(--primary);
                background: white;
            }

            .upload-icon {
                width: 48px;
                height: 48px;
                color: var(--primary);
                margin-bottom: 1rem;
            }

            .upload-text {
                color: var(--gray-700);
                font-size: 1rem;
                margin-bottom: 0.5rem;
            }

            .upload-subtext {
                color: var(--gray-500);
                font-size: 0.875rem;
            }

            .progress-bar {
                height: 4px;
                background: var(--gray-100);
                border-radius: 2px;
                margin-top: 1rem;
                overflow: hidden;
            }

            .progress-fill {
                height: 100%;
                background: var(--primary);
                transition: width 0.3s ease;
            }

            .document-preview {
                margin-top: 1rem;
                padding-top: 1rem;
                border-top: 1px solid var(--gray-100);
            }

            .preview-image {
                width: 100%;
                height: auto;
                border-radius: 8px;
            }

            .error-message {
                color: var(--error);
                font-size: 0.875rem;
                margin-top: 0.5rem;
            }

            .success-message {
                color: var(--success);
                font-size: 0.875rem;
                margin-top: 0.5rem;
            }
        `
    ];

    static get properties() {
        return {
            vitalsData: { type: Object },
            selectedVitals: { type: Array },
            editingVital: { type: String, state: true },
            temporaryVitalValue: { type: String, state: true },
            showHistory: { type: Object, state: true },
            visitDate: { type: String },
            supportingInfo: { type: Array }
        };
    }

    constructor() {
        super();
        this.vitalsData = null;
        this.selectedVitals = [];
        this.editingVital = null;
        this.temporaryVitalValue = '';
        this.showHistory = {};
        this.visitDate = null;
        this.supportingInfo = [];
        
        // Bind event handlers
        this.handleVisitSelected = this.handleVisitSelected.bind(this);
        this.handleVitalsUpdate = this.handleVitalsUpdate.bind(this);
        this.handleSupportingInfoUpdate = this.handleSupportingInfoUpdate.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        // Subscribe to events
        window.addEventListener('visit-selected', this.handleVisitSelected);
        window.addEventListener('vitals-update', this.handleVitalsUpdate);
        window.addEventListener('supporting-info-update', this.handleSupportingInfoUpdate);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        // Cleanup event listeners
        window.removeEventListener('visit-selected', this.handleVisitSelected);
        window.removeEventListener('vitals-update', this.handleVitalsUpdate);
        window.removeEventListener('supporting-info-update', this.handleSupportingInfoUpdate);
    }

    handleVisitSelected(e) {
        const { visit, vitals } = e.detail;
        if (vitals) {
            this.vitalsData = vitals;
            this.visitDate = visit.visitDate;
            this.requestUpdate();
        }
    }

    handleVitalsUpdate(e) {
        const { vitals } = e.detail;
        if (vitals) {
            this.vitalsData = vitals;
            this.requestUpdate();
        }
    }

    handleSupportingInfoUpdate(e) {
        const { supportingInfo } = e.detail;
        if (supportingInfo) {
            this.supportingInfo = supportingInfo;
            this.mapSupportingInfoToVitals();
        }
    }

    mapSupportingInfoToVitals() {
        const vitalsMapping = {
            'vital-sign-systolic': 'systolic',
            'vital-sign-diastolic': 'diastolic',
            'vital-sign-height': 'height',
            'vital-sign-weight': 'weight',
            'pulse': 'pulseRate',
            'temperature': 'temperature',
            'oxygen-saturation': 'spo2',
            'respiratory-rate': 'respiratoryRate',
            'chief-complaint': 'chiefComplaint'
        };

        const mappedVitals = {};

        this.supportingInfo.forEach(info => {
            const category = info.category?.coding?.[0]?.code;
            if (category && vitalsMapping[category]) {
                const key = vitalsMapping[category];
                if (info.valueQuantity) {
                    mappedVitals[key] = info.valueQuantity.value;
                } else if (info.valueString) {
                    mappedVitals[key] = info.valueString;
                } else if (info.code?.coding?.[0]?.code) {
                    mappedVitals[key] = info.code.coding[0].code;
                }
            }
        });

        // Calculate BMI if height and weight are available
        if (mappedVitals.height && mappedVitals.weight) {
            const heightInMeters = mappedVitals.height / 100;
            mappedVitals.bmi = +(mappedVitals.weight / (heightInMeters * heightInMeters)).toFixed(2);
        }

        this.vitalsData = mappedVitals;
        this.requestUpdate();
    }

    getFHIRSupportingInfo() {
        const vitalsConfig = this.getVitalsConfig();
        const supportingInfo = [];
        let sequence = 1;

        Object.entries(this.vitalsData || {}).forEach(([key, value]) => {
            if (value === undefined || value === null) return;

            const config = vitalsConfig[key];
            if (!config || !config.code) return;

            const info = {
                sequence: sequence++,
                category: {
                    coding: [{
                        system: "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                        code: config.code
                    }]
                }
            };

            if (key === 'chiefComplaint') {
                info.code = {
                    coding: [{
                        system: "http://hl7.org/fhir/sid/icd-10-am",
                        code: value
                    }]
                };
            } else {
                info.valueQuantity = {
                    value: parseFloat(value),
                    system: "http://unitsofmeasure.org",
                    code: config.unit
                };
            }

            supportingInfo.push(info);
        });

        return supportingInfo;
    }

    render() {
        return html`
            <div class="form-section">
                <h3 class="section-title">
                    Supporting Information
                    <button class="button button-secondary add-vital-btn" @click=${this.handleAddVital}>
                        + Add Info
                    </button>
                </h3>
                <div class="document-grid">
                    ${Object.entries(this.getVitalsConfig()).map(([key, config]) => {
                        const value = this.vitalsData?.[key];
                        const isSelected = this.selectedVitals.includes(key);
                        return html`
                            <div class="document-card ${isSelected ? 'selected' : ''}">
                                <div class="document-header">
                                    <span class="document-icon">${config.icon}</span>
                                    <span class="document-info">
                                        <span class="document-title">${config.label}</span>
                                        <div class="document-meta">
                                            <span class="meta-item">
                                                <span class="meta-icon">${config.unit ? '📏' : '⚖️'}</span>
                                                ${config.unit || ''}
                                            </span>
                                            ${this.visitDate ? html`
                                                <span class="meta-item">
                                                    <span class="meta-icon">📅</span>
                                                    ${this.formatDate(this.visitDate)}
                                                </span>
                                            ` : ''}
                                        </div>
                                    </span>
                                    ${value !== undefined ? html`
                                        <button class="action-button" @click=${(e) => this.handleVitalEdit(e, key, value, config)}>
                                            ✏️
                                        </button>
                                    ` : ''}
                                </div>
                                <div class="document-content">
                                    ${this.editingVital === key ? html`
                                        <div class="vital-edit-form">
                                            <input type="text" 
                                                   class="form-control" 
                                                   .value=${value || ''} 
                                                   @change=${(e) => this.handleVitalUpdate(key, e.target.value, config)}
                                            >
                                            <div class="edit-actions">
                                                <button class="button button-primary" 
                                                        @click=${() => this.saveVitalEdit(key)}>
                                                    Save
                                                </button>
                                                <button class="button button-secondary" 
                                                        @click=${this.cancelVitalEdit}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ` : html`
                                        <div class="vital-value">
                                            ${value !== undefined ? html`
                                                ${value} ${config.unit || ''}
                                            ` : html`
                                                <button class="button button-secondary" 
                                                        @click=${(e) => this.handleVitalEdit(e, key, '', config)}>
                                                    Add Value
                                                </button>
                                            `}
                                        </div>
                                    `}
                                </div>
                            </div>
                        `;
                    })}
                </div>
            </div>
        `;
    }

    formatDate(dateString) {
        if (!dateString) return '';
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    getVitalsConfig() {
        return {
            height: { 
                icon: '📏', 
                label: 'Height',
                unit: 'cm',
                code: 'vital-sign-height'
            },
            weight: { 
                icon: '⚖️', 
                label: 'Weight',
                unit: 'kg',
                code: 'vital-sign-weight'
            },
            bmi: { 
                icon: '📊', 
                label: 'BMI',
                unit: 'kg/m²',
                code: 'bmi'
            },
            systolic: { 
                icon: '❤️', 
                label: 'Systolic',
                unit: 'mm[Hg]',
                code: 'vital-sign-systolic'
            },
            diastolic: { 
                icon: '💗', 
                label: 'Diastolic',
                unit: 'mm[Hg]',
                code: 'vital-sign-diastolic'
            },
            pulseRate: { 
                icon: '💓', 
                label: 'Pulse Rate',
                unit: '/min',
                code: 'pulse'
            },
            temperature: { 
                icon: '🌡️', 
                label: 'Temperature',
                unit: 'Cel',
                code: 'temperature'
            },
            spo2: { 
                icon: '🫁', 
                label: 'SpO2',
                unit: '%',
                code: 'oxygen-saturation'
            },
            respiratoryRate: { 
                icon: '↔️', 
                label: 'Respiratory Rate',
                unit: '/min',
                code: 'respiratory-rate'
            },
            chiefComplaint: { 
                icon: '🏥', 
                label: 'Chief Complaint',
                code: 'chief-complaint'
            },
            bloodSugar: { 
                icon: '🩸', 
                label: 'Blood Sugar',
                unit: 'mg/dL',
                code: 'blood-sugar'
            },
            info: {
                icon: 'ℹ️',
                label: 'Information',
                code: 'info'
            },
            patient_history: {
                icon: '📜',
                label: 'Patient History',
                code: 'patient-history'
            },
            treatment_plan: {
                icon: '🗒️',
                label: 'Treatment Plan',
                code: 'treatment-plan'
            },
            physical_examination: {
                icon: '🩺',
                label: 'Physical Exam',
                code: 'physical-examination'
            },
            history_of_present_illness: {
                icon: '📋',
                label: 'History of Present Illness',
                code: 'history-of-present-illness'
            },
            onset: {
                icon: '⏰',
                label: 'Onset',
                code: 'onset'
            },
            attachment: {
                icon: '📎',
                label: 'Attachment',
                code: 'attachment'
            },
            missingtooth: {
                icon: '🦷',
                label: 'Missing Tooth',
                code: 'missingtooth'
            },
            hospitalized: {
                icon: '🏥',
                label: 'Hospitalized',
                code: 'hospitalized'
            },
            employmentImpacted: {
                icon: '💼',
                label: 'Employment Impact',
                code: 'employmentImpacted'
            },
            reason_for_visit: {
                icon: '❓',
                label: 'Reason for Visit',
                code: 'reason-for-visit'
            },
            investigation_result: {
                icon: '🔬',
                label: 'Investigation Result',
                code: 'investigation-result'
            },
            icu_hours: {
                icon: '⏱️',
                label: 'ICU Hours',
                unit: 'hrs',
                code: 'icu-hours'
            },
            days_supply: {
                icon: '📅',
                label: 'Days Supply',
                unit: 'days',
                code: 'days-supply'
            },
            ventilation_hours: {
                icon: '💨',
                label: 'Ventilation Hours',
                unit: 'hrs',
                code: 'ventilation-hours'
            },
            lab_test: {
                icon: '🧪',
                label: 'Lab Test',
                code: 'lab-test'
            },
            morphology: {
                icon: '🔍',
                label: 'Morphology',
                code: 'morphology'
            }
        };
    }

    handleVitalSelect(key, value, config) {
        if (!this.selectedVitals.includes(key)) {
            this.dispatchEvent(new CustomEvent('vital-selected', {
                detail: { key, value, config },
                bubbles: true,
                composed: true
            }));
        } else {
            this.dispatchEvent(new CustomEvent('vital-deselected', {
                detail: { key },
                bubbles: true,
                composed: true
            }));
        }
    }

    handleVitalEdit(e, key, value, config) {
        e.stopPropagation();
        this.editingVital = key;
        this.temporaryVitalValue = value;
    }

    handleVitalUpdate(key, value, config) {
        this.temporaryVitalValue = value;
    }

    saveVitalEdit(key) {
        if (this.temporaryVitalValue !== undefined) {
            const value = this.temporaryVitalValue;
            this.vitalsData = {
                ...this.vitalsData,
                [key]: value
            };

            // Dispatch both events
            this.dispatchEvent(new CustomEvent('vital-updated', {
                detail: { key, value },
                bubbles: true,
                composed: true
            }));

            // Update FHIR supportingInfo
            const supportingInfo = this.getFHIRSupportingInfo();
            this.dispatchEvent(new CustomEvent('supporting-info-update', {
                detail: { supportingInfo },
                bubbles: true,
                composed: true
            }));
        }
        this.editingVital = null;
        this.temporaryVitalValue = '';
    }

    cancelVitalEdit() {
        this.editingVital = null;
        this.temporaryVitalValue = '';
    }

    handleAddVital() {
        this.dispatchEvent(new CustomEvent('add-vital', {
            bubbles: true,
            composed: true
        }));
    }
} 