import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { API_ENDPOINTS } from '../../config/api';
import { sharedStyles } from './shared-styles';

@customElement('care-team-section')
export class CareTeamSection extends LitElement {
    static styles = [
        sharedStyles,
        css`
            :host {
                display: block;
            }

            .care-team-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 1rem;
                background: white;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            }

            .care-team-table th {
                background: var(--gray-50);
                padding: 1rem;
                text-align: left;
                font-weight: 500;
                color: var(--gray-700);
                border-bottom: 1px solid var(--gray-200);
            }

            .care-team-table td {
                padding: 1rem;
                border-bottom: 1px solid var(--gray-100);
                vertical-align: middle;
            }

            .care-team-table tr:last-child td {
                border-bottom: none;
            }

            .care-team-table .form-control {
                width: 100%;
                min-width: 120px;
            }

            .care-team-table .actions-cell {
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
            careTeam: { type: Array },
            practitionerSearchResults: { type: Array, state: true },
            showPractitionerResults: { type: Boolean, state: true },
            isLoadingPractitioners: { type: Boolean, state: true }
        };
    }

    constructor() {
        super();
        this.careTeam = [];
        this.practitionerSearchResults = [];
        this.showPractitionerResults = false;
        this.isLoadingPractitioners = false;
    }

    render() {
        return html`
            <div class="form-section">
                <div class="search-section">
                    <div class="form-group">
                        <label class="form-label">Search Care Team Member</label>
                        <div class="search-container">
                            <input 
                                type="text" 
                                class="form-control" 
                                placeholder="Search by provider name or ID..."
                                @input=${this.handleProviderSearch}
                                @focus=${() => this.showProviderResults = true}
                                @blur=${() => setTimeout(() => this.showProviderResults = false, 200)}
                            >
                            ${this.renderSearchResults()}
                        </div>
                    </div>
                </div>

                ${this.renderCareTeamTable()}
            </div>
        `;
    }

    renderSearchResults() {
        if (!this.showProviderResults) return '';

        return html`
            <div class="search-results">
                ${this.isLoadingProviders ? html`
                    <div class="search-status">Searching...</div>
                ` : this.providerSearchResults?.length > 0 ? html`
                    ${this.providerSearchResults.map(provider => html`
                        <div class="search-result-item" @click=${() => this.selectProvider(provider)}>
                            <div class="patient-name">${provider.name}</div>
                            <div class="patient-info">
                                <span class="highlight">ID: ${provider.id}</span> | 
                                Specialty: ${provider.specialty || 'N/A'}
                            </div>
                            <div class="search-info">
                                Facility: ${provider.facilityName || 'N/A'}
                            </div>
                        </div>
                    `)}
                ` : html`
                    <div class="search-status">No providers found</div>
                `}
            </div>
        `;
    }

    renderCareTeamTable() {
        if (!Array.isArray(this.careTeam) || this.careTeam.length === 0) {
            return html`
                <div class="empty-state">
                    <p>No care team members added yet. Use the search above to add providers.</p>
                </div>
            `;
        }

        return html`
            <table class="care-team-table">
                <thead>
                    <tr>
                        <th>Provider ID</th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Specialty</th>
                        <th>Facility</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.careTeam.map(provider => html`
                        <tr>
                            <td>
                                <span class="highlight">${provider.id}</span>
                            </td>
                            <td>${provider.name}</td>
                            <td>
                                <select class="form-control" 
                                        .value=${provider.role}
                                        @change=${(e) => this.updateProvider(provider, 'role', e.target.value)}>
                                    <option value="primary">Primary</option>
                                    <option value="secondary">Secondary</option>
                                    <option value="consulting">Consulting</option>
                                </select>
                            </td>
                            <td>${provider.specialty || 'N/A'}</td>
                            <td>${provider.facilityName || 'N/A'}</td>
                            <td class="actions-cell">
                                <button class="button button-secondary" 
                                        @click=${() => this.removeProvider(provider)}>
                                    Remove
                                </button>
                            </td>
                        </tr>
                    `)}
                </tbody>
            </table>
        `;
    }

    async handlePractitionerSearch(e) {
        const searchTerm = e.target.value.trim();
        
        if (searchTerm.length < 2) {
            this.practitionerSearchResults = [];
            this.showPractitionerResults = false;
            return;
        }

        this.isLoadingPractitioners = true;
        this.showPractitionerResults = true;

        try {
            const response = await fetch(`${API_ENDPOINTS.PRACTITIONER.SEARCH}?term=${encodeURIComponent(searchTerm)}`);
            if (!response.ok) throw new Error('Failed to fetch practitioners');
            
            const data = await response.json();
            
            if (data.messageType === 'success' && Array.isArray(data.dynamicResult)) {
                this.practitionerSearchResults = data.dynamicResult;
            } else {
                this.practitionerSearchResults = [];
                console.error('No results in practitioner search response');
            }
        } catch (error) {
            console.error('Error searching practitioners:', error);
            this.dispatchEvent(new CustomEvent('show-notification', {
                detail: { message: 'Error searching practitioners', type: 'error' },
                bubbles: true,
                composed: true
            }));
            this.practitionerSearchResults = [];
        } finally {
            this.isLoadingPractitioners = false;
        }
    }

    selectPractitioner(practitioner) {
        const newMember = {
            id: practitioner.id,
            identifier: {
                system: "http://nphies.sa/license/practitioner-license",
                value: practitioner.licenseNumber
            },
            name: {
                text: practitioner.name,
                family: practitioner.lastName,
                given: [practitioner.firstName]
            },
            role: {
                system: "http://terminology.hl7.org/CodeSystem/claimcareteamrole",
                code: this.careTeam.length === 0 ? "primary" : "secondary"
            },
            qualification: {
                system: "http://nphies.sa/terminology/CodeSystem/practice-codes",
                code: practitioner.specialtyCode,
                display: practitioner.specialty
            },
            contact: {
                phone: practitioner.phone || '',
                email: practitioner.email || ''
            }
        };

        this.dispatchEvent(new CustomEvent('care-team-member-selected', {
            detail: newMember,
            bubbles: true,
            composed: true
        }));

        this.showPractitionerResults = false;
        this.practitionerSearchResults = [];
    }

    updateMember(member, path, value) {
        this.dispatchEvent(new CustomEvent('care-team-member-updated', {
            detail: { member, path, value },
            bubbles: true,
            composed: true
        }));
    }

    removeMember(member) {
        this.dispatchEvent(new CustomEvent('care-team-member-removed', {
            detail: member,
            bubbles: true,
            composed: true
        }));
    }

    getRoleDisplay(roleCode) {
        const roles = {
            primary: 'Primary Care Provider',
            secondary: 'Secondary Provider',
            consulting: 'Consulting Provider'
        };
        return roles[roleCode] || roleCode;
    }

    getQualificationOptions() {
        return [
            { code: "08.11", display: "Oncology" },
            { code: "19.08", display: "General Surgery" },
            { code: "15.02", display: "Cardiology" },
            { code: "13.01", display: "Internal Medicine" },
            { code: "19.01", display: "General Practice" }
        ];
    }
} 