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

            .team-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 1.5rem;
                margin-top: 1rem;
            }

            .member-card {
                background: white;
                border: 1px solid var(--gray-200);
                border-radius: 12px;
                padding: 1.25rem;
                transition: all 0.2s ease;
                position: relative;
            }

            .member-card:hover {
                border-color: var(--primary-light);
                box-shadow: 0 2px 4px rgba(133, 0, 216, 0.1);
            }

            .member-header {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 1rem;
            }

            .member-avatar {
                width: 48px;
                height: 48px;
                border-radius: 24px;
                background: var(--gray-100);
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--primary);
                font-size: 1.5rem;
                font-weight: 500;
            }

            .member-info {
                flex: 1;
            }

            .member-name {
                color: var(--gray-900);
                font-weight: 500;
                margin-bottom: 0.25rem;
            }

            .member-role {
                color: var(--gray-600);
                font-size: 0.875rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .role-icon {
                width: 16px;
                height: 16px;
                color: var(--gray-400);
            }

            .member-meta {
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

            .member-actions {
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

            .add-member {
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

            .add-member:hover {
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
                        <label class="form-label">Search Practitioners</label>
                        <div class="search-container">
                            <input 
                                type="text" 
                                class="form-control" 
                                placeholder="Search by name, license number, or specialty..."
                                @input=${this.handlePractitionerSearch}
                                @focus=${() => this.showPractitionerResults = true}
                            >
                            ${this.isLoadingPractitioners ? html`<div class="loader"></div>` : ''}
                            ${this.showPractitionerResults ? html`
                                <div class="search-results">
                                    ${this.isLoadingPractitioners ? html`
                                        <div class="search-status">Searching...</div>
                                    ` : this.practitionerSearchResults && this.practitionerSearchResults.length > 0 ? html`
                                        ${this.practitionerSearchResults.map(practitioner => html`
                                            <div class="search-result-item" @click=${() => this.selectPractitioner(practitioner)}>
                                                <div class="patient-name">${practitioner.name}</div>
                                                <div class="patient-info">
                                                    <span class="highlight">License: ${practitioner.licenseNumber}</span> | 
                                                    Specialty: ${practitioner.specialty}
                                                </div>
                                                <div class="search-info">
                                                    ${practitioner.department || ''} ${practitioner.facility ? `| ${practitioner.facility}` : ''}
                                                </div>
                                            </div>
                                        `)}
                                    ` : html`
                                        <div class="search-status">No practitioners found</div>
                                    `}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>

                <div class="care-team-list">
                    ${this.careTeam.map(member => html`
                        <div class="practitioner-card">
                            <div class="practitioner-header">
                                <h3 class="section-title">${member.name.text}</h3>
                                <span class="role-badge">${this.getRoleDisplay(member.role.code)}</span>
                            </div>
                            <div class="practitioner-details">
                                <div class="form-group">
                                    <label class="form-label">Role</label>
                                    <select class="form-control"
                                            .value=${member.role.code}
                                            @change=${(e) => this.updateMember(member, 'role.code', e.target.value)}>
                                        <option value="primary">Primary</option>
                                        <option value="secondary">Secondary</option>
                                        <option value="consulting">Consulting</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Qualification</label>
                                    <select class="form-control"
                                            .value=${member.qualification.code}
                                            @change=${(e) => this.updateMember(member, 'qualification.code', e.target.value)}>
                                        ${this.getQualificationOptions().map(option => html`
                                            <option value=${option.code}>${option.display}</option>
                                        `)}
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">License Number</label>
                                    <input type="text" 
                                           class="form-control" 
                                           .value=${member.identifier.value}
                                           readonly>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Contact</label>
                                    <input type="text" 
                                           class="form-control" 
                                           .value=${member.contact.phone}
                                           @change=${(e) => this.updateMember(member, 'contact.phone', e.target.value)}>
                                </div>
                                <div class="form-group">
                                    <button class="button button-secondary" 
                                            ?disabled=${member.role.code === 'primary' && this.careTeam.length > 1}
                                            @click=${() => this.removeMember(member)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    `)}
                </div>
            </div>
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