import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { sharedStyles } from './shared-styles';
import { API_ENDPOINTS } from '../../config/api';

@customElement('procedure-section')
export class ProcedureSection extends LitElement {
    static get properties() {
        return {
            procedures: { type: Array },
            procedureSearchResults: { type: Array, state: true },
            isLoadingProcedures: { type: Boolean, state: true },
            showProcedureResults: { type: Boolean, state: true },
            isTestMode: { type: Boolean },
            totalAmount: { type: Number, state: true },
            vatAmount: { type: Number, state: true }
        };
    }

    constructor() {
        super();
        this.procedures = [];
        this.procedureSearchResults = [];
        this.isLoadingProcedures = false;
        this.showProcedureResults = false;
        this.isTestMode = false;
        this.totalAmount = 0;
        this.vatAmount = 0;
    }

    static styles = [
        sharedStyles,
        css`
            :host {
                display: block;
                position: relative;
                padding-bottom: 80px; /* Space for floating footer */
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
                max-height: 300px;
                overflow-y: auto;
                z-index: 1000;
            }

            .search-status {
                padding: 1rem;
                text-align: center;
                color: var(--gray-600);
            }

            .loading-spinner {
                display: inline-block;
                width: 20px;
                height: 20px;
                border: 2px solid var(--gray-200);
                border-top-color: var(--primary);
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
                margin-right: 0.5rem;
                vertical-align: middle;
            }

            .loading-text {
                display: inline-block;
                vertical-align: middle;
            }

            @keyframes spin {
                to { transform: rotate(360deg); }
            }

            .search-result-item {
                padding: 1rem;
                border-bottom: 1px solid var(--gray-100);
                cursor: pointer;
            }

            .search-result-item:hover {
                background: var(--gray-50);
            }

            .dropdown-item-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0.5rem;
            }

            .dropdown-item-title {
                font-weight: 500;
                color: var(--primary);
            }

            .dropdown-item-badge {
                background: var(--gray-100);
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
                font-size: 0.75rem;
                color: var(--gray-700);
            }

            .dropdown-item-short-desc {
                display: block;
                font-weight: 500;
                margin-bottom: 0.25rem;
            }

            .dropdown-item-description {
                display: block;
                font-size: 0.875rem;
                color: var(--gray-600);
                margin-bottom: 0.25rem;
            }

            .dropdown-item-category {
                display: block;
                font-size: 0.75rem;
                color: var(--gray-500);
            }

            .procedure-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 1rem;
                background: white;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }

            .procedure-table th {
                background: var(--gray-50);
                padding: 1rem;
                text-align: left;
                font-weight: 500;
                color: var(--gray-700);
                border-bottom: 1px solid var(--gray-200);
            }

            .procedure-table td {
                padding: 1rem;
                border-bottom: 1px solid var(--gray-100);
                vertical-align: middle;
            }

            .procedure-table tr:last-child td {
                border-bottom: none;
            }

            .procedure-table .form-control {
                width: 100%;
                min-width: 120px;
            }

            .procedure-table .actions-cell {
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

    render() {
        return html`
            <div class="form-section">
                <div class="search-section">
                    <div class="form-group">
                        <label class="form-label">Search Procedure</label>
                        <div class="search-container">
                            <input 
                                type="text" 
                                class="form-control" 
                                placeholder="Search by CPT code or procedure name..."
                                @input=${this.handleProcedureSearch}
                                @focus=${() => this.showProcedureResults = true}
                                @blur=${() => setTimeout(() => this.showProcedureResults = false, 200)}
                            >
                            ${this.renderSearchResults()}
                        </div>
                    </div>
                </div>

                ${this.renderProcedureTable()}

                <floating-footer
                    .subtotal=${this.totalAmount}
                    .vat=${this.vatAmount}
                    .total=${this.totalAmount + this.vatAmount}
                    .itemCount=${this.procedures.length}
                    .isVisible=${this.procedures.length > 0}
                ></floating-footer>
            </div>
        `;
    }

    renderSearchResults() {
        if (!this.showProcedureResults) {
            return '';
        }

        return html`
            <div class="search-results">
                ${this.isLoadingProcedures ? html`
                    <div class="search-status">
                        <span class="loading-spinner"></span>
                        <span class="loading-text">Searching procedures...</span>
                    </div>
                ` : this.procedureSearchResults.length > 0 ? html`
                    ${this.procedureSearchResults.map(procedure => html`
                        <div class="search-result-item" @click=${() => this.selectProcedure(procedure)}>
                            <div class="dropdown-item-header">
                                <span class="dropdown-item-title">${procedure.cptCode || 'No CPT Code'}</span>
                                <span class="dropdown-item-badge">${procedure.type}</span>
                            </div>
                            <span class="dropdown-item-short-desc">${procedure.name}</span>
                            <span class="dropdown-item-description">${procedure.description}</span>
                            <span class="dropdown-item-category">
                                ${procedure.facility} - ${procedure.unitType}
                                ${procedure.charges ? ` - SAR ${procedure.charges.toFixed(2)}` : ''}
                            </span>
                        </div>
                    `)}
                ` : html`
                    <div class="search-status">No procedures found</div>
                `}
            </div>
        `;
    }

    renderProcedureTable() {
        if (!this.procedures.length) {
            return html`
                <div class="empty-state">
                    No procedures added. Search and select procedures above.
                </div>
            `;
        }

        return html`
            <table class="procedure-table">
                <thead>
                    <tr>
                        <th>CPT Code</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Facility</th>
                        <th>Type</th>
                        <th>Charges</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.procedures.map((procedure, index) => html`
                        <tr>
                            <td><span class="highlight">${procedure.cptCode}</span></td>
                            <td>${procedure.name}</td>
                            <td>${procedure.description}</td>
                            <td>
                                <select class="form-control" @change=${(e) => this.updateProcedureFacility(index, e.target.value)}>
                                    <option value="inpatient" ?selected=${procedure.facility === 'inpatient'}>Inpatient</option>
                                    <option value="outpatient" ?selected=${procedure.facility === 'outpatient'}>Outpatient</option>
                                </select>
                            </td>
                            <td>
                                <select class="form-control" @change=${(e) => this.updateProcedureType(index, e.target.value)}>
                                    <option value="primary" ?selected=${procedure.type === 'primary'}>Primary</option>
                                    <option value="secondary" ?selected=${procedure.type === 'secondary'}>Secondary</option>
                                </select>
                            </td>
                            <td>SAR ${procedure.charges?.toFixed(2) || '0.00'}</td>
                            <td class="actions-cell">
                                <button class="btn btn-icon" @click=${() => this.removeProcedure(index)}>
                                    <span class="material-icons">delete</span>
                                </button>
                            </td>
                        </tr>
                    `)}
                </tbody>
            </table>
        `;
    }

    async handleProcedureSearch(e) {
        const searchTerm = e.target.value.trim();
        this.showProcedureResults = true;
        
        if (searchTerm.length < 3) {
            this.procedureSearchResults = [];
            return;
        }

        this.isLoadingProcedures = true;
        this.requestUpdate();  // Force update to show loading state immediately

        try {
            const response = await fetch(`${API_ENDPOINTS.MASTER_PRICE_SERVICE_DIRECTORY.AUTOCOMPLETE_SERVICES}?searchTerm=${encodeURIComponent(searchTerm)}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) throw new Error('Failed to fetch procedures');
            
            const result = await response.json();
            
            if (result.isSuccessfull && result.dynamicResult) {
                this.procedureSearchResults = result.dynamicResult.map(procedure => ({
                    id: procedure.id,
                    cptCode: procedure.cptCode,
                    name: procedure.serviceName,
                    description: procedure.description || procedure.cptDescription || 'No description available',
                    type: procedure.serviceTypeName || 'Procedure',
                    category: procedure.serviceCategory || 'Procedure',
                    status: procedure.serviceStatus || 'Unknown',
                    facility: procedure.facilityName || 'Unknown Facility',
                    unitType: procedure.unitTypeName || 'Per Service',
                    charges: typeof procedure.standardCharges === 'number' ? 
                            procedure.standardCharges : 
                            parseFloat(procedure.standardCharges) || 0,
                    isActive: procedure.isActive
                }));
            }
        } catch (error) {
            console.error('Error searching procedures:', error);
            this.dispatchEvent(new CustomEvent('show-notification', {
                detail: { message: 'Error searching procedures', type: 'error' }
            }));
            this.procedureSearchResults = [];
        } finally {
            this.isLoadingProcedures = false;
            this.requestUpdate();  // Force update after state changes
        }
    }

    selectProcedure(procedure) {
        if (this.procedures.some(p => p.cptCode === procedure.cptCode)) {
            this.dispatchEvent(new CustomEvent('show-notification', {
                detail: { message: 'Procedure already added', type: 'warning' }
            }));
            return;
        }

        const newProcedure = {
            ...procedure,
            facility: 'outpatient',
            type: this.procedures.length === 0 ? 'primary' : 'secondary'
        };

        this.procedures = [...this.procedures, newProcedure];
        
        const totals = this.calculateTotals();
        this.dispatchEvent(new CustomEvent('procedures-changed', {
            detail: { 
                procedures: this.procedures,
                totals
            }
        }));
    }

    updateProcedureFacility(index, facility) {
        this.procedures = this.procedures.map((p, i) => 
            i === index ? { ...p, facility } : p
        );
        this.requestUpdate();
        const totals = this.calculateTotals();
        this.dispatchEvent(new CustomEvent('procedures-changed', {
            detail: { 
                procedures: this.procedures,
                totals
            }
        }));
    }

    updateProcedureType(index, type) {
        this.procedures = this.procedures.map((p, i) => 
            i === index ? { ...p, type } : p
        );
        this.requestUpdate();
        const totals = this.calculateTotals();
        this.dispatchEvent(new CustomEvent('procedures-changed', {
            detail: { 
                procedures: this.procedures,
                totals
            }
        }));
    }

    removeProcedure(index) {
        this.procedures = this.procedures.filter((_, i) => i !== index);
        this.requestUpdate();
        const totals = this.calculateTotals();
        this.dispatchEvent(new CustomEvent('procedures-changed', {
            detail: { 
                procedures: this.procedures,
                totals
            }
        }));
    }

    calculateTotals() {
        const subtotal = this.procedures.reduce((sum, proc) => sum + (proc.charges || 0), 0);
        const vat = subtotal * 0.15; // 15% VAT
        return {
            subtotal,
            vat,
            total: subtotal + vat
        };
    }

    updated(changedProperties) {
        if (changedProperties.has('procedures')) {
            this.calculateTotals();
        }
    }
} 