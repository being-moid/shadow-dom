import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { sharedStyles } from './shared-styles';

@customElement('floating-footer')
export class FloatingFooter extends LitElement {
    static get properties() {
        return {
            subtotal: { type: Number },
            vat: { type: Number },
            total: { type: Number },
            diagnosisCount: { type: Number },
            encounterCount: { type: Number },
            primaryPractitionerCount: { type: Number },
            priorAuthType: { type: String },
            isSubmitEnabled: { type: Boolean },
            itemCount: { type: Number },
        };
    }

    constructor() {
        super();
        this.subtotal = 0;
        this.vat = 0;
        this.total = 0;
        this.itemCount = 0;
        this.diagnosisCount = 0;
        this.encounterCount = 0;
        this.primaryPractitionerCount = 0;
        this.priorAuthType = 'Not Selected';
        this.isSubmitEnabled = false;
    }

    static styles = [
        sharedStyles,
        css`
            :host {
                display: block;
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                z-index: 1000;
            }

            .floating-footer {
                background: white;
                border-top: 1px solid var(--gray-200);
                box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
                padding: 1rem 1.5rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .analytics-section, .totals-section, .action-section, .auth-type-selector-container {
                display: flex;
                align-items: center;
            }

            .analytics-section {
                gap: 1.5rem;
            }

            .analytics-item {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .analytics-label {
                font-size: 0.75rem;
                color: var(--gray-600);
            }

            .analytics-value {
                font-size: 0.875rem;
                font-weight: 600;
                color: var(--gray-900);
            }

            .totals-section {
                flex-direction: column;
                align-items: flex-end;
            }

            .total-item {
                text-align: right;
            }

            .total-label {
                font-size: 0.75rem;
                color: var(--gray-600);
            }

            .total-value {
                font-size: 1rem;
                font-weight: 600;
                color: var(--gray-900);
            }

            .total-value.grand-total {
                color: var(--primary);
            }

            .action-section {
                margin-left: auto;
            }

            .submit-button {
                background: var(--primary);
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                font-size: 1rem;
                font-weight: 600;
                border-radius: 8px;
                cursor: pointer;
                transition: background 0.3s ease;
            }

            .submit-button:disabled {
                background: var(--gray-300);
                cursor: not-allowed;
            }

            .icon {
                width: 20px;
                height: 20px;
                fill: var(--primary);
            }

            .auth-type-selector {
                display: flex;
                gap: 0.5rem;
            }

            .auth-option {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 0.5rem;
                border: 2px solid transparent;
                border-radius: 8px;
                cursor: pointer;
                transition: border-color 0.3s ease;
                font-size: 0.75rem;
                color: var(--gray-700);
            }

            .auth-option[selected] {
                border-color: var(--primary);
            }
        `
    ];

    render() {
        return html`
            <div class="floating-footer">
                <div class="analytics-section">
                    ${this.renderAnalyticsItem(this.renderDiagnosisIcon(), 'Diagnoses', this.diagnosisCount)}
                    ${this.renderAnalyticsItem(this.renderEncounterIcon(), 'Encounter', this.encounterCount)}
                    ${this.renderAnalyticsItem(this.renderPrimaryIcon(), 'Primary', this.primaryPractitionerCount)}
                </div>
                <div class="auth-type-selector-container">
                    ${this.renderAuthTypeSelector()}
                </div>
                <div class="totals-section">
                    <div class="total-item">
                        <span class="total-label">Subtotal</span>
                        <span class="total-value">SAR ${this.subtotal.toFixed(2)}</span>
                    </div>
                    <div class="total-item">
                        <span class="total-label">VAT (15%)</span>
                        <span class="total-value">SAR ${this.vat.toFixed(2)}</span>
                    </div>
                    <div class="total-item">
                        <span class="total-label">Total</span>
                        <span class="total-value grand-total">SAR ${this.total.toFixed(2)}</span>
                    </div>
                </div>
                <div class="action-section">
                    <button class="submit-button" ?disabled=${!this.isSubmitEnabled} @click=${this.submitPriorAuth}>
                        Submit Prior Auth
                    </button>
                </div>
            </div>
        `;
    }

    renderAnalyticsItem(icon, label, value) {
        return html`
            <div class="analytics-item">
                <div class="icon-container">${icon}</div>
                <div>
                    <div class="analytics-label">${label}</div>
                    <div class="analytics-value">${value}</div>
                </div>
            </div>
        `;
    }

    renderDiagnosisIcon() {
        return html`
            <svg class="icon" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z" />
            </svg>
        `;
    }

    renderEncounterIcon() {
        return html`
            <svg class="icon" viewBox="0 0 24 24">
                <path d="M21 8V7l-3 2-2-1-2 1-2-1-2 1-2-1-2 1-1-1V8l1 1 2-1 2 1 2-1 2 1 2-1 2 1 1-1 1 1z" />
            </svg>
        `;
    }

    renderPrimaryIcon() {
        return html`
            <svg class="icon" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
        `;
    }

    renderAuthTypeSelector() {
        const options = [
            { value: 'institutional', label: 'Institutional', icon: this.renderInstitutionalIcon() },
            { value: 'dental', label: 'Dental', icon: this.renderDentalIcon() },
            { value: 'vision', label: 'Vision', icon: this.renderVisionIcon() },
            { value: 'professional', label: 'Professional', icon: this.renderProfessionalIcon() },
            { value: 'prescription', label: 'Prescription', icon: this.renderPrescriptionIcon() },
            { value: 'pharmacy', label: 'Pharmacy', icon: this.renderPharmacyIcon() }
        ];

        return html`
            <div class="auth-type-selector">
                ${options.map(opt => html`
                    <div class="auth-option" ?selected=${this.priorAuthType === opt.value}
                         @click=${() => this.selectAuthType(opt.value)}>
                        ${opt.icon}
                        <span>${opt.label}</span>
                    </div>
                `)}
            </div>
        `;
    }

    selectAuthType(value) {
        this.priorAuthType = value;
        this.requestUpdate();
        this.dispatchEvent(new CustomEvent('auth-type-changed', {
            detail: { authType: value },
            bubbles: true,
            composed: true
        }));
    }

    renderInstitutionalIcon() {
        return html`
            <svg class="icon" viewBox="0 0 24 24">
                <path d="M4 22V10h16v12H4z M6 18h12v-8H6v8z" />
            </svg>
        `;
    }

    renderDentalIcon() {
        return html`
            <svg class="icon" viewBox="0 0 24 24">
                <path d="M12 2C8 2 6 7 6 10c0 3 2 6 6 9 4-3 6-6 6-9 0-3-2-7-6-7z" />
            </svg>
        `;
    }

    renderVisionIcon() {
        return html`
            <svg class="icon" viewBox="0 0 24 24">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z M12 16a4 4 0 110-8 4 4 0 010 8z" />
            </svg>
        `;
    }

    renderProfessionalIcon() {
        return html`
            <svg class="icon" viewBox="0 0 24 24">
                <path d="M7 4h10v4h3v2H4V8h3V4z M4 10h16v10H4V10z" />
            </svg>
        `;
    }

    renderPrescriptionIcon() {
        return html`
            <svg class="icon" viewBox="0 0 24 24">
                <path d="M7 15l10-10M17 7h4v4" />
            </svg>
        `;
    }

    renderPharmacyIcon() {
        return html`
            <svg class="icon" viewBox="0 0 24 24">
                <path d="M8 2h8v4H8V2z M4 8h16v12H4V8z" />
            </svg>
        `;
    }

    submitPriorAuth() {
        this.dispatchEvent(new CustomEvent('submit-prior-auth', {
            detail: {},
            bubbles: true,
            composed: true
        }));
    }

    updated(changedProperties) {
        // Additional logic if needed
    }
} 