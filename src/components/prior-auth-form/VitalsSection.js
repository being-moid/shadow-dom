import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { sharedStyles } from './shared-styles';

@customElement('vitals-section')
export class VitalsSection extends LitElement {
    static styles = [
        sharedStyles,
        css`
            :host {
                display: block;
            }

            .vitals-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1.5rem;
                margin-top: 1rem;
            }

            .vital-card {
                background: white;
                border: 1px solid var(--gray-200);
                border-radius: 12px;
                padding: 1.25rem;
                transition: all 0.2s ease;
            }

            .vital-card:hover {
                border-color: var(--primary-light);
                box-shadow: 0 2px 4px rgba(133, 0, 216, 0.1);
            }

            .vital-card.selected {
                border-color: var(--primary);
                background-color: var(--gray-50);
            }

            .vital-header {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                margin-bottom: 1rem;
            }

            .vital-icon {
                width: 32px;
                height: 32px;
                color: var(--primary);
                padding: 6px;
                background: var(--gray-50);
                border-radius: 8px;
            }

            .vital-title {
                color: var(--gray-700);
                font-size: 0.875rem;
                font-weight: 500;
            }

            .vital-value {
                color: var(--gray-900);
                font-size: 1.5rem;
                font-weight: 600;
                margin-bottom: 0.5rem;
                display: flex;
                align-items: baseline;
                gap: 0.25rem;
            }

            .vital-unit {
                color: var(--gray-500);
                font-size: 0.875rem;
                font-weight: normal;
            }

            .vital-meta {
                color: var(--gray-500);
                font-size: 0.75rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .vital-date {
                display: flex;
                align-items: center;
                gap: 0.25rem;
            }

            .vital-status {
                display: flex;
                align-items: center;
                gap: 0.25rem;
                font-size: 0.875rem;
            }

            .status-normal {
                color: var(--success);
            }

            .status-warning {
                color: var(--warning);
            }

            .status-critical {
                color: var(--error);
            }

            .empty-state {
                text-align: center;
                padding: 2rem;
                color: var(--gray-500);
            }
        `
    ];

    static get properties() {
        return {
            vitalsData: { type: Object },
            visitDate: { type: String }
        };
    }

    constructor() {
        super();
        this.vitalsData = null;
        this.visitDate = null;
    }

    getVitalsConfig() {
        return {
            height: {
                icon: '📏',
                label: 'Height',
                unit: 'cm',
                normalRange: { min: 0, max: 300 }
            },
            weight: {
                icon: '⚖️',
                label: 'Weight',
                unit: 'kg',
                normalRange: { min: 0, max: 500 }
            },
            bmi: {
                icon: '📊',
                label: 'BMI',
                unit: 'kg/m²',
                normalRange: { min: 18.5, max: 24.9 }
            },
            systolic: {
                icon: '❤️',
                label: 'Blood Pressure (Systolic)',
                unit: 'mmHg',
                normalRange: { min: 90, max: 120 }
            },
            diastolic: {
                icon: '💗',
                label: 'Blood Pressure (Diastolic)',
                unit: 'mmHg',
                normalRange: { min: 60, max: 80 }
            },
            pulseRate: {
                icon: '💓',
                label: 'Pulse Rate',
                unit: 'bpm',
                normalRange: { min: 60, max: 100 }
            },
            temperature: {
                icon: '🌡️',
                label: 'Temperature',
                unit: '°C',
                normalRange: { min: 36.1, max: 37.2 }
            },
            spo2: {
                icon: '🫁',
                label: 'SpO2',
                unit: '%',
                normalRange: { min: 95, max: 100 }
            },
            respRate: {
                icon: '🫁',
                label: 'Respiratory Rate',
                unit: '/min',
                normalRange: { min: 12, max: 20 }
            },
            bloodSugar: {
                icon: '🩸',
                label: 'Blood Sugar',
                unit: 'mg/dL',
                normalRange: { min: 70, max: 140 }
            }
        };
    }

    getVitalStatus(value, normalRange) {
        if (!value || value === 0) return { class: '', label: 'Not Recorded' };
        
        if (value < normalRange.min) {
            return { class: 'status-warning', label: 'Low' };
        }
        if (value > normalRange.max) {
            return { class: 'status-critical', label: 'High' };
        }
        return { class: 'status-normal', label: 'Normal' };
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

    render() {
        if (!this.vitalsData) {
            return html`
                <div class="empty-state">
                    <p>No vitals data available for this visit.</p>
                </div>
            `;
        }

        const vitalsConfig = this.getVitalsConfig();
        const vitalKeys = Object.keys(vitalsConfig).filter(key => 
            key in this.vitalsData && 
            typeof this.vitalsData[key] === 'number'
        );

        return html`
            <div class="vitals-grid">
                ${vitalKeys.map(key => {
                    const config = vitalsConfig[key];
                    const value = this.vitalsData[key];
                    const status = this.getVitalStatus(value, config.normalRange);

                    return html`
                        <div class="vital-card">
                            <div class="vital-header">
                                <span class="vital-icon">${config.icon}</span>
                                <span class="vital-title">${config.label}</span>
                            </div>
                            <div class="vital-value">
                                ${value === 0 ? '—' : value}
                                ${value !== 0 ? html`<span class="vital-unit">${config.unit}</span>` : ''}
                            </div>
                            <div class="vital-meta">
                                <div class="vital-date">
                                    📅 ${this.formatDate(this.vitalsData.creationDate)}
                                </div>
                                <div class="vital-status ${status.class}">
                                    • ${status.label}
                                </div>
                            </div>
                        </div>
                    `;
                })}
            </div>

            ${this.vitalsData.chiefComplaint ? html`
                <div class="vital-card" style="margin-top: 1.5rem;">
                    <div class="vital-header">
                        <span class="vital-icon">🏥</span>
                        <span class="vital-title">Chief Complaint</span>
                    </div>
                    <div class="vital-value" style="font-size: 1rem;">
                        ${this.vitalsData.chiefComplaint}
                    </div>
                    <div class="vital-meta">
                        <div class="vital-date">
                            📅 ${this.formatDate(this.vitalsData.creationDate)}
                        </div>
                    </div>
                </div>
            ` : ''}
        `;
    }
} 