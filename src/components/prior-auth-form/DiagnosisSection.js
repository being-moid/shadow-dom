import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { API_ENDPOINTS } from '../../config/api';
import { sharedStyles } from './shared-styles';

@customElement('diagnosis-section')
export class DiagnosisSection extends LitElement {
    static get styles() {
        return [
            sharedStyles,
            css`
                :host {
                    display: block;
                }

                .diagnosis-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 1.5rem;
                    margin-top: 1rem;
                }

                .diagnosis-card {
                    background: white;
                    border: 1px solid var(--gray-200);
                    border-radius: 12px;
                    padding: 1.25rem;
                    transition: all 0.2s ease;
                    position: relative;
                }

                .diagnosis-card:hover {
                    border-color: var(--primary-light);
                    box-shadow: 0 2px 4px rgba(133, 0, 216, 0.1);
                }

                .diagnosis-header {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }

                .diagnosis-icon {
                    width: 40px;
                    height: 40px;
                    color: var(--primary);
                    padding: 8px;
                    background: var(--gray-50);
                    border-radius: 10px;
                }

                .diagnosis-info {
                    flex: 1;
                }

                .diagnosis-title {
                    color: var(--gray-900);
                    font-weight: 500;
                    margin-bottom: 0.25rem;
                }

                .diagnosis-code {
                    color: var(--primary);
                    font-family: monospace;
                    font-size: 0.875rem;
                    background: var(--gray-50);
                    padding: 0.25rem 0.5rem;
                    border-radius: 4px;
                    display: inline-block;
                }

                .diagnosis-meta {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                    margin-top: 1rem;
                    padding-top: 1rem;
                    border-top: 1px solid var(--gray-100);
                }

                .meta-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--gray-600);
                    font-size: 0.875rem;
                }

                .meta-icon {
                    width: 16px;
                    height: 16px;
                    color: var(--gray-400);
                }

                .diagnosis-actions {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    display: flex;
                    gap: 0.5rem;
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

                .add-diagnosis {
                    border: 2px dashed var(--gray-200);
                    border-radius: 12px;
                    padding: 2rem;
                    text-align: center;
                    transition: all 0.2s ease;
                    background: var(--gray-50);
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                }

                .add-diagnosis:hover {
                    border-color: var(--primary);
                    background: white;
                }

                .add-icon {
                    width: 48px;
                    height: 48px;
                    color: var(--primary);
                }

                .add-text {
                    color: var(--gray-700);
                    font-size: 1rem;
                }

                .badge {
                    padding: 0.25rem 0.75rem;
                    border-radius: 9999px;
                    font-size: 0.75rem;
                    font-weight: 500;
                    text-transform: uppercase;
                }

                .badge-primary {
                    background-color: var(--primary-light);
                    color: white;
                }

                .badge-secondary {
                    background-color: var(--gray-100);
                    color: var(--gray-700);
                }

                .search-results {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: white;
                    border: 1px solid var(--gray-200);
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    margin-top: 4px;
                    max-height: 300px;
                    overflow-y: auto;
                    z-index: 1000;
                }

                .search-result-item {
                    padding: 0.75rem 1rem;
                    cursor: pointer;
                    border-bottom: 1px solid var(--gray-100);
                    transition: all 0.2s ease;
                }

                .search-result-item:hover {
                    background: var(--gray-50);
                }

                .search-result-item:last-child {
                    border-bottom: none;
                }

                .result-code {
                    color: var(--primary);
                    font-family: monospace;
                    margin-right: 0.5rem;
                }

                .result-description {
                    color: var(--gray-700);
                }

                .diagnosis-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 1rem;
                    background: white;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                }

                .diagnosis-table th {
                    background: var(--gray-50);
                    padding: 1rem;
                    text-align: left;
                    font-weight: 500;
                    color: var(--gray-700);
                    border-bottom: 1px solid var(--gray-200);
                }

                .diagnosis-table td {
                    padding: 1rem;
                    border-bottom: 1px solid var(--gray-100);
                    vertical-align: middle;
                }

                .diagnosis-table tr:last-child td {
                    border-bottom: none;
                }

                .diagnosis-table .form-control {
                    width: 100%;
                    min-width: 120px;
                }

                .diagnosis-table .checkbox-cell {
                    text-align: center;
                }

                .diagnosis-table .actions-cell {
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

                .badge {
                    display: inline-block;
                    padding: 0.25rem 0.75rem;
                    border-radius: 9999px;
                    font-size: 0.75rem;
                    font-weight: 500;
                    text-align: center;
                }

                .badge-warning {
                    background-color: var(--warning-light);
                    color: var(--warning-dark);
                }

                .badge-success {
                    background-color: var(--success-light);
                    color: var(--success-dark);
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
    }

    static get properties() {
        return {
            diagnoses: { type: Array },
            diagnosisSearchResults: { type: Array, state: true },
            showDiagnosisResults: { type: Boolean, state: true },
            isLoadingDiagnosis: { type: Boolean, state: true }
        };
    }

    constructor() {
        super();
        this.diagnoses = [];
        this.diagnosisSearchResults = [];
        this.showDiagnosisResults = false;
        this.isLoadingDiagnosis = false;
        this.addEventListener('diagnosis-selected', () => this.requestUpdate());
    }

    updated(changedProperties) {
        if (changedProperties.has('diagnoses')) {
            console.log('Diagnoses updated:', this.diagnoses);
        }
    }

    render() {
        console.log('Rendering DiagnosisSection, diagnoses:', this.diagnoses);
        return html`
            <div class="form-section">
                <div class="search-section">
                    <div class="form-group">
                        <label class="form-label">Search Diagnosis</label>
                        <div class="search-container">
                            <input 
                                type="text" 
                                class="form-control" 
                                placeholder="Search by ICD code or description (minimum 3 characters)..."
                                @input=${this.handleDiagnosisSearch}
                                @focus=${() => this.showDiagnosisResults = true}
                                @blur=${() => setTimeout(() => this.showDiagnosisResults = false, 200)}
                            >
                            ${this.renderSearchResults()}
                        </div>
                    </div>
                </div>

                ${this.renderDiagnosisGrid()}
            </div>
        `;
    }

    renderSearchResults() {
        if (!this.showDiagnosisResults) return '';

        return html`
            <div class="search-results">
                ${this.isLoadingDiagnosis ? html`
                    <div class="search-status">Searching...</div>
                ` : this.diagnosisSearchResults?.length > 0 ? html`
                    ${this.diagnosisSearchResults.map(diagnosis => html`
                        <div class="search-result-item" @click=${() => this.selectDiagnosis(diagnosis)}>
                            <div class="patient-name">${diagnosis.shortDescription}</div>
                            <div class="patient-info">
                                <span class="highlight">ICD-${diagnosis.icdtype === 1 ? '9' : '10'}: ${diagnosis.code}</span>
                                ${diagnosis.preAuthReq ? html`
                                    <span class="badge badge-warning">Prior Auth Required</span>
                                ` : html`
                                    <span class="badge badge-success">No Auth Required</span>
                                `}
                            </div>
                            <div class="search-info">
                                ${diagnosis.description !== diagnosis.shortDescription ? diagnosis.description : ''}
                            </div>
                        </div>
                    `)}
                ` : html`
                    <div class="search-status">No diagnoses found</div>
                `}
            </div>
        `;
    }

    renderDiagnosisGrid() {
        console.log('Rendering diagnosis grid with:', this.diagnoses);
        
        if (!Array.isArray(this.diagnoses) || this.diagnoses.length === 0) {
            return html`
                <div class="empty-state">
                    <p>No diagnoses added yet. Use the search above to add diagnoses.</p>
                </div>
            `;
        }

        return html`
            <table class="diagnosis-table">
                <thead>
                    <tr>
                        <th>ICD Code</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Present On Admission</th>
                        <th>Auth Required</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.diagnoses.map(diagnosis => html`
                        <tr>
                            <td>
                                <span class="highlight">ICD-${diagnosis.icdtype === 1 ? '9' : '10'}: ${diagnosis.code}</span>
                            </td>
                            <td>${diagnosis.description}</td>
                            <td>
                                <select class="form-control"
                                        .value=${diagnosis.type || 'secondary'}
                                        ?disabled=${diagnosis.type === 'principal' && this.diagnoses.length > 1}
                                        @change=${(e) => this.updateDiagnosis(diagnosis, 'type', e.target.value)}>
                                    <option value="principal">Principal</option>
                                    <option value="secondary">Secondary</option>
                                    <option value="admitting">Admitting</option>
                                </select>
                            </td>
                            <td class="checkbox-cell">
                                <input 
                                    type="checkbox" 
                                    ?checked=${diagnosis.presentOnAdmission}
                                    @change=${(e) => this.updateDiagnosis(diagnosis, 'presentOnAdmission', e.target.checked)}
                                >
                            </td>
                            <td>
                                <span class="badge ${diagnosis.preAuthReq ? 'badge-warning' : 'badge-success'}">
                                    ${diagnosis.preAuthReq ? 'Required' : 'Not Required'}
                                </span>
                            </td>
                            <td class="actions-cell">
                                <button class="button button-secondary" 
                                        ?disabled=${diagnosis.type === 'principal' && this.diagnoses.length > 1}
                                        @click=${() => this.removeDiagnosis(diagnosis)}>
                                    Remove
                                </button>
                            </td>
                        </tr>
                    `)}
                </tbody>
            </table>
        `;
    }

    async handleDiagnosisSearch(e) {
        const searchTerm = e.target.value.trim();
        
        if (searchTerm.length < 3) {
            this.diagnosisSearchResults = [];
            this.showDiagnosisResults = false;
            return;
        }

        this.isLoadingDiagnosis = true;
        this.showDiagnosisResults = true;

        try {
            const response = await fetch(`${API_ENDPOINTS.DIAGNOSIS.SEARCH_ICDS}/${encodeURIComponent(searchTerm)}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch diagnoses');
            }
            
            const data = await response.json();
            
            if (data.messageType === 'success' && Array.isArray(data.dynamicResult)) {
                this.diagnosisSearchResults = data.dynamicResult.map(diagnosis => ({
                    id: diagnosis.id,
                    code: diagnosis.icdcode,
                    shortDescription: diagnosis.shortDescription,
                    description: diagnosis.description,
                    preAuthReq: diagnosis.preAuthReq === 1,
                    icdtype: diagnosis.icdtype
                }));
            } else {
                this.diagnosisSearchResults = [];
                console.error('No results in diagnosis search response');
            }
        } catch (error) {
            console.error('Error searching diagnoses:', error);
            this.dispatchEvent(new CustomEvent('show-notification', {
                detail: { message: 'Error searching diagnoses', type: 'error' },
                bubbles: true,
                composed: true
            }));
            this.diagnosisSearchResults = [];
        } finally {
            this.isLoadingDiagnosis = false;
        }
    }

    selectDiagnosis(diagnosis) {
        console.log('Selecting diagnosis:', diagnosis);
        
        // Prevent duplicate diagnoses
        const isDiagnosisExists = this.diagnoses.some(d => d.code === diagnosis.code);
        if (isDiagnosisExists) {
            this.dispatchEvent(new CustomEvent('show-notification', {
                detail: { message: 'This diagnosis has already been added', type: 'warning' },
                bubbles: true,
                composed: true
            }));
            return;
        }

        const newDiagnosis = {
            id: diagnosis.id,
            code: diagnosis.code,
            description: diagnosis.shortDescription || diagnosis.description,
            shortDescription: diagnosis.shortDescription,
            type: this.diagnoses.length === 0 ? 'principal' : 'secondary',
            presentOnAdmission: false,
            preAuthReq: diagnosis.preAuthReq,
            icdtype: diagnosis.icdtype,
            sequence: this.diagnoses.length + 1
        };

        // Update local array first
        this.diagnoses = [...this.diagnoses, newDiagnosis];
        
        // Then dispatch event
        this.dispatchEvent(new CustomEvent('diagnosis-selected', {
            detail: newDiagnosis,
            bubbles: true,
            composed: true
        }));

        this.showDiagnosisResults = false;
        this.diagnosisSearchResults = [];
        
        // Force update
        this.requestUpdate();
    }

    updateDiagnosis(diagnosis, field, value) {
        // Update local array first
        this.diagnoses = this.diagnoses.map(d => 
            d.id === diagnosis.id ? { ...d, [field]: value } : d
        );
        
        // Then dispatch event
        this.dispatchEvent(new CustomEvent('diagnosis-updated', {
            detail: { diagnosis, field, value },
            bubbles: true,
            composed: true
        }));
        
        // Force update
        this.requestUpdate();
    }

    removeDiagnosis(diagnosis) {
        // Update local array first
        this.diagnoses = this.diagnoses.filter(d => d.id !== diagnosis.id);
        
        // Then dispatch event
        this.dispatchEvent(new CustomEvent('diagnosis-removed', {
            detail: diagnosis,
            bubbles: true,
            composed: true
        }));
        
        // Force update
        this.requestUpdate();
    }
} 