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
                            >
                            ${this.isLoadingMedications ? html`<div class="loader"></div>` : ''}
                            ${this.showMedicationResults ? html`
                                <div class="search-results">
                                    ${this.isLoadingMedications ? html`
                                        <div class="search-status">Searching...</div>
                                    ` : this.medicationSearchResults && this.medicationSearchResults.length > 0 ? html`
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
                            ` : ''}
                        </div>
                    </div>
                </div>

                <div class="grid-container">
                    <div class="grid-header">
                        <div>Med Code</div>
                        <div>Name</div>
                        <div>Status</div>
                        <div>Intent</div>
                        <div>Dosage</div>
                        <div>Route</div>
                        <div>Actions</div>
                    </div>
                    <div class="grid-body">
                        ${this.medications.map(med => html`
                            <div class="grid-row">
                                <div>${med.code}</div>
                                <div>${med.name}</div>
                                <div>
                                    <select class="form-control" 
                                            .value=${med.status}
                                            @change=${(e) => this.updateMedication(med, 'status', e.target.value)}>
                                        <option value="active">Active</option>
                                        <option value="completed">Completed</option>
                                        <option value="stopped">Stopped</option>
                                    </select>
                                </div>
                                <div>
                                    <select class="form-control"
                                            .value=${med.intent}
                                            @change=${(e) => this.updateMedication(med, 'intent', e.target.value)}>
                                        <option value="proposal">Proposal</option>
                                        <option value="plan">Plan</option>
                                        <option value="order">Order</option>
                                    </select>
                                </div>
                                <div>
                                    <input type="text" 
                                           class="form-control"
                                           .value=${med.dosage}
                                           @change=${(e) => this.updateMedication(med, 'dosage', e.target.value)}
                                           placeholder="Enter dosage"
                                    >
                                </div>
                                <div>
                                    <select class="form-control"
                                            .value=${med.route}
                                            @change=${(e) => this.updateMedication(med, 'route', e.target.value)}>
                                        <option value="oral">Oral</option>
                                        <option value="intravenous">Intravenous</option>
                                        <option value="intramuscular">Intramuscular</option>
                                        <option value="subcutaneous">Subcutaneous</option>
                                    </select>
                                </div>
                                <div>
                                    <button class="button button-secondary" @click=${() => this.removeMedication(med)}>Remove</button>
                                </div>
                            </div>
                        `)}
                    </div>
                </div>
            </div>
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