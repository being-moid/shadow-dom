import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { API_ENDPOINTS } from '../../config/api';
import { sharedStyles } from './shared-styles';

@customElement('medication-section')
export class MedicationSection extends LitElement {
    static styles = [
        sharedStyles,
        css`
            :host {
                display: block;
            }

            .medication-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 1rem;
                background: white;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }

            .medication-table th {
                background: var(--gray-50);
                padding: 1rem;
                text-align: left;
                font-weight: 500;
                color: var(--gray-700);
                border-bottom: 1px solid var(--gray-200);
            }

            .medication-table td {
                padding: 1rem;
                border-bottom: 1px solid var(--gray-100);
                vertical-align: middle;
            }

            .medication-table tr:last-child td {
                border-bottom: none;
            }

            .medication-table .form-control {
                width: 100%;
                min-width: 120px;
            }

            .medication-table .actions-cell {
                text-align: right;
                white-space: nowrap;
            }

            .highlight {
                font-family: monospace;
                padding: 0.25rem 0.5rem;
                background: var(--gray-50);
                border-radius: 4px;
                color: var(--primary);
            }

            .empty-state {
                text-align: center;
                padding: 2rem;
                background: white;
                border-radius: 8px;
                border: 2px dashed var(--gray-200);
                color: var(--gray-500);
                margin-top: 1rem;
            }
        `
    ];

    static get properties() {
        return {
            medications: { type: Array },
            medicationSearchResults: { type: Array, state: true },
            showMedicationResults: { type: Boolean, state: true },
            isLoadingMedications: { type: Boolean, state: true }
        };
    }

    constructor() {
        super();
        this.medications = [];
        this.medicationSearchResults = [];
        this.showMedicationResults = false;
        this.isLoadingMedications = false;
    }

    render() {
        return html`
            <div class="form-section">
                <div class="search-section">
                    <div class="form-group">
                        <label class="form-label">Search Medication</label>
                        <div class="search-container">
                            <input 
                                type="text" 
                                class="form-control" 
                                placeholder="Search by medication code or name..."
                                @input=${this.handleMedicationSearch}
                                @focus=${() => this.showMedicationResults = true}
                                @blur=${() => setTimeout(() => this.showMedicationResults = false, 200)}
                            >
                            ${this.renderSearchResults()}
                        </div>
                    </div>
                </div>

                ${this.renderMedicationTable()}
            </div>
        `;
    }

    renderSearchResults() {
        if (!this.showMedicationResults) return '';

        return html`
            <div class="search-results">
                ${this.isLoadingMedications ? html`
                    <div class="search-status">Searching...</div>
                ` : this.medicationSearchResults?.length > 0 ? html`
                    ${this.medicationSearchResults.map(med => html`
                        <div class="search-result-item" @click=${() => this.selectMedication(med)}>
                            <div class="patient-name">${med.description}</div>
                            <div class="patient-info">
                                <span class="highlight">Code: ${med.serviceName}</span> | 
                                Price: SAR ${med.standardCharges?.toFixed(2) || '0.00'}
                            </div>
                            <div class="search-info">
                                Facility: ${med.facilityName || 'N/A'}
                            </div>
                        </div>
                    `)}
                ` : html`
                    <div class="search-status">No medications found</div>
                `}
            </div>
        `;
    }

    renderMedicationTable() {
        if (!Array.isArray(this.medications) || this.medications.length === 0) {
            return html`
                <div class="empty-state">
                    <p>No medications added yet. Use the search above to add medications.</p>
                </div>
            `;
        }

        return html`
            <table class="medication-table">
                <thead>
                    <tr>
                        <th>Med Code</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Intent</th>
                        <th>Dosage</th>
                        <th>Route</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.medications.map(med => html`
                        <tr>
                            <td>
                                <span class="highlight">${med.code}</span>
                            </td>
                            <td>${med.name}</td>
                            <td>
                                <select class="form-control" 
                                        .value=${med.status}
                                        @change=${(e) => this.updateMedication(med, 'status', e.target.value)}>
                                    <option value="active">Active</option>
                                    <option value="completed">Completed</option>
                                    <option value="stopped">Stopped</option>
                                </select>
                            </td>
                            <td>
                                <select class="form-control"
                                        .value=${med.intent}
                                        @change=${(e) => this.updateMedication(med, 'intent', e.target.value)}>
                                    <option value="proposal">Proposal</option>
                                    <option value="plan">Plan</option>
                                    <option value="order">Order</option>
                                </select>
                            </td>
                            <td>
                                <input type="text" 
                                       class="form-control"
                                       .value=${med.dosage}
                                       @change=${(e) => this.updateMedication(med, 'dosage', e.target.value)}
                                       placeholder="Enter dosage"
                                >
                            </td>
                            <td>
                                <select class="form-control"
                                        .value=${med.route}
                                        @change=${(e) => this.updateMedication(med, 'route', e.target.value)}>
                                    <option value="oral">Oral</option>
                                    <option value="intravenous">Intravenous</option>
                                    <option value="intramuscular">Intramuscular</option>
                                    <option value="subcutaneous">Subcutaneous</option>
                                </select>
                            </td>
                            <td class="actions-cell">
                                <button class="button button-secondary" 
                                        @click=${() => this.removeMedication(med)}>
                                    Remove
                                </button>
                            </td>
                        </tr>
                    `)}
                </tbody>
            </table>
        `;
    }

    async handleMedicationSearch(e) {
        const searchTerm = e.target.value.trim().toUpperCase();
        
        if (searchTerm.length < 2) {
            this.medicationSearchResults = [];
            this.showMedicationResults = false;
            return;
        }

        this.isLoadingMedications = true;
        this.showMedicationResults = true;

        try {
            const response = await fetch(`${API_ENDPOINTS.MASTER_PRICE_SERVICE_DIRECTORY.AUTOCOMPLETE_SERVICES}?searchTerm=${encodeURIComponent(searchTerm)}&serviceTypeId=7`);
            if (!response.ok) throw new Error('Failed to fetch medications');
            
            const data = await response.json();
            
            if (data.messageType === 'success' && Array.isArray(data.dynamicResult)) {
                this.medicationSearchResults = data.dynamicResult;
            } else {
                this.medicationSearchResults = [];
                console.error('No results in medication search response');
            }
        } catch (error) {
            console.error('Error searching medications:', error);
            this.dispatchEvent(new CustomEvent('show-notification', {
                detail: { message: 'Error searching medications', type: 'error' },
                bubbles: true,
                composed: true
            }));
            this.medicationSearchResults = [];
        } finally {
            this.isLoadingMedications = false;
        }
    }

    selectMedication(medication) {
        const newMedication = {
            id: medication.id,
            code: medication.serviceName,
            name: medication.description,
            status: 'active',
            intent: 'proposal',
            dosage: this.extractDosageFromDescription(medication.description),
            route: 'oral',
            price: medication.standardCharges,
            facility: medication.facilityName
        };

        this.dispatchEvent(new CustomEvent('medication-selected', {
            detail: newMedication,
            bubbles: true,
            composed: true
        }));

        this.showMedicationResults = false;
        this.medicationSearchResults = [];
    }

    extractDosageFromDescription(description) {
        const dosageMatch = description.match(/\d+(\.\d+)?(\s*)(MG|MCG|G|ML)/i);
        return dosageMatch ? dosageMatch[0] : '';
    }

    updateMedication(medication, field, value) {
        this.dispatchEvent(new CustomEvent('medication-updated', {
            detail: { medication, field, value },
            bubbles: true,
            composed: true
        }));
    }

    removeMedication(medication) {
        this.dispatchEvent(new CustomEvent('medication-removed', {
            detail: medication,
            bubbles: true,
            composed: true
        }));
    }
} 