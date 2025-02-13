import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

const componentStyles = css`
  :host {
    display: block;
    --primary-color: #4F46E5;
    --secondary-color: #6B7280;
    --success-color: #059669;
    --danger-color: #DC2626;
    --warning-color: #D97706;
    --background-color: #F9FAFB;
    --border-color: #E5E7EB;
  }

  .claim-container {
    background: white;
    border-radius: 1rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    margin: 1.5rem;
    padding: 2rem;
  }

  .invoice-header {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    margin-bottom: 3rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid var(--border-color);
  }

  .company-info, .patient-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .company-name, .patient-name {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--primary-color);
  }

  .info-label {
    font-size: 0.875rem;
    color: var(--secondary-color);
    font-weight: 500;
  }

  .info-value {
    font-size: 1rem;
    color: #111827;
  }

  .section {
    margin-bottom: 2rem;
    background: var(--background-color);
    border-radius: 0.75rem;
    padding: 1.5rem;
  }

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .section-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #111827;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .section-title svg {
    width: 1.5rem;
    height: 1.5rem;
    color: var(--primary-color);
  }

  .line-items {
    border: 1px solid var(--border-color);
    border-radius: 0.5rem;
    overflow: hidden;
  }

  .line-item {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr auto;
    gap: 1rem;
    padding: 1rem;
    align-items: center;
    border-bottom: 1px solid var(--border-color);
  }

  .line-item:last-child {
    border-bottom: none;
  }

  .line-item-header {
    background: #F3F4F6;
    font-weight: 600;
    color: #374151;
  }

  .procedure-list {
    padding-left: 2rem;
    margin-top: 0.5rem;
    border-left: 2px solid var(--border-color);
  }

  .procedure-item {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 1rem;
    padding: 0.5rem;
    font-size: 0.875rem;
  }

  .currency {
    color: var(--primary-color);
    font-weight: 500;
  }

  .total-section {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem;
    padding: 1rem;
    background: #F8FAFC;
    border-radius: 0.5rem;
    margin-top: 1rem;
  }

  .total-row {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
  }

  .total-label {
    font-weight: 500;
    color: var(--secondary-color);
  }

  .total-value {
    font-weight: 600;
    color: var(--primary-color);
  }

  .remarks-section {
    background: #F8FAFC;
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin-top: 2rem;
  }

  .remarks-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 1rem;
  }

  .observation-list {
    display: grid;
    gap: 1rem;
  }

  .observation-item {
    background: white;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid var(--border-color);
  }

  .observation-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
  }

  .observation-title {
    font-weight: 500;
    color: #111827;
  }

  .observation-date {
    font-size: 0.875rem;
    color: var(--secondary-color);
  }

  .observation-value {
    font-size: 0.875rem;
    color: #4B5563;
    line-height: 1.5;
  }

  .action-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    justify-content: flex-end;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
  }

  .btn-primary {
    background: var(--primary-color);
    color: white;
  }

  .btn-secondary {
    background: white;
    border: 1px solid var(--border-color);
    color: var(--secondary-color);
  }

  .btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .btn:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    .invoice-header {
      grid-template-columns: 1fr;
    }

    .line-item {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }

    .procedure-item {
      grid-template-columns: 1fr;
    }
  }

  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
  }

  .modal {
    background: white;
    border-radius: 0.75rem;
    padding: 1.5rem;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .modal-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--primary-color);
  }

  .modal-close {
    background: none;
    border: none;
    color: var(--secondary-color);
    cursor: pointer;
    padding: 0.5rem;
  }

  .form-grid {
    display: grid;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .form-field {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .form-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--secondary-color);
  }

  .form-input {
    padding: 0.625rem;
    border: 1px solid var(--border-color);
    border-radius: 0.375rem;
    font-size: 0.875rem;
    transition: all 0.2s;
  }

  .form-input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }

  .form-input.error {
    border-color: var(--danger-color);
  }

  .error-message {
    font-size: 0.75rem;
    color: var(--danger-color);
    margin-top: 0.25rem;
  }

  /* Search Functionality */
  .search-container {
    position: relative;
    margin-bottom: 1rem;
  }

  .search-input {
    width: 100%;
    padding: 0.625rem 2.5rem 0.625rem 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 0.375rem;
    font-size: 0.875rem;
  }

  .search-results {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid var(--border-color);
    border-radius: 0.375rem;
    max-height: 200px;
    overflow-y: auto;
    z-index: 20;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .search-item {
    padding: 0.75rem;
    cursor: pointer;
    border-bottom: 1px solid var(--border-color);
  }

  .search-item:hover {
    background: var(--background-color);
  }

  .search-item:last-child {
    border-bottom: none;
  }

  /* Enhanced Line Items */
  .line-item {
    transition: all 0.2s;
  }

  .line-item:hover {
    background: #F8FAFC;
  }

  .line-item-actions {
    display: flex;
    gap: 0.5rem;
  }

  .btn-icon {
    padding: 0.375rem;
    border-radius: 0.375rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .btn-icon svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  /* Validation Styles */
  .invalid {
    border-color: var(--danger-color);
  }

  .validation-message {
    font-size: 0.75rem;
    color: var(--danger-color);
    margin-top: 0.25rem;
  }

  /* Loading States */
  .loading-state {
    position: relative;
    min-height: 100px;
  }

  .loading-overlay {
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

@customElement('claim-component')
export class Claim extends LitElement {
  static get properties() {
    return {
      claimData: { type: Object },
      loading: { type: Boolean },
      selectedDiagnosis: { type: Array },
      selectedProcedures: { type: Object },
      selectedMedications: { type: Array },
      observations: { type: Array },
      editingItem: { type: Object },
      showDiagnosisModal: { type: Boolean },
      showProcedureModal: { type: Boolean },
      showMedicationModal: { type: Boolean },
      showObservationModal: { type: Boolean },
      validationErrors: { type: Object },
      searchTerm: { type: String }
    };
  }

  static get styles() {
    return componentStyles;
  }

  constructor() {
    super();
    this.claimData = {
      provider: {
        id: 'PR-12345',
        name: 'Healthcare Provider',
        address: '123 Medical Center Drive',
        city: 'Riyadh',
        country: 'Saudi Arabia',
        contact: '+966 12 345 6789'
      },
      patient: {
        id: 'PT-67890',
        name: 'John Doe',
        insurance: 'Premium Health Insurance'
      }
    };
    this.loading = false;
    this.selectedDiagnosis = [];
    this.selectedProcedures = {};
    this.selectedMedications = [];
    this.observations = [];
    this.editingItem = null;
    this.showDiagnosisModal = false;
    this.showProcedureModal = false;
    this.showMedicationModal = false;
    this.showObservationModal = false;
    this.validationErrors = {};

    // Add sample data
    this.addSampleData();
  }

  addSampleData() {
    // Sample Diagnosis with Procedures
    this.selectedDiagnosis = [
      {
        id: 'D1',
        code: 'J20.9',
        description: 'Acute Bronchitis',
        date: new Date().toISOString(),
        amount: 600.00
      },
      {
        id: 'D2',
        code: 'I10',
        description: 'Essential (primary) hypertension',
        date: new Date().toISOString(),
        amount: 450.00
      }
    ];

    // Sample Procedures for each diagnosis
    this.selectedProcedures = {
      'D1': [
        {
          id: 'P1',
          name: 'Chest X-Ray',
          code: 'XR-123',
          quantity: 1,
          amount: 250.00
        },
        {
          id: 'P2',
          name: 'Pulmonary Function Test',
          code: 'PFT-456',
          quantity: 1,
          amount: 350.00
        }
      ],
      'D2': [
        {
          id: 'P3',
          name: 'Blood Pressure Monitoring',
          code: 'BP-789',
          quantity: 1,
          amount: 150.00
        }
      ]
    };

    // Sample Medications
    this.selectedMedications = [
      {
        id: 'M1',
        name: 'Amoxicillin',
        dosage: '500mg',
        quantity: 30,
        unit: 'tablets',
        amount: 120.00
      },
      {
        id: 'M2',
        name: 'Salbutamol Inhaler',
        dosage: '100mcg',
        quantity: 1,
        unit: 'inhaler',
        amount: 80.00
      },
      {
        id: 'M3',
        name: 'Amlodipine',
        dosage: '5mg',
        quantity: 30,
        unit: 'tablets',
        amount: 95.00
      }
    ];

    if (this.observations.length === 0) {
      this.observations = [
        {
          id: 'O1',
          title: 'Clinical Notes',
          date: new Date().toISOString(),
          value: 'Patient presents with symptoms of acute bronchitis and hypertension. Prescribed antibiotics and antihypertensive medication.'
        }
      ];
    }
  }

  handleDiagnosisAdd(diagnosis) {
    this.selectedDiagnosis = [...this.selectedDiagnosis, diagnosis];
    this.selectedProcedures = {
      ...this.selectedProcedures,
      [diagnosis.id]: []
    };
    this.requestUpdate();
  }

  handleDiagnosisRemove(diagnosisId) {
    this.selectedDiagnosis = this.selectedDiagnosis.filter(d => d.id !== diagnosisId);
    const { [diagnosisId]: removed, ...remainingProcedures } = this.selectedProcedures;
    this.selectedProcedures = remainingProcedures;
    this.requestUpdate();
  }

  handleProcedureAdd(diagnosisId) {
    const newProcedure = {
      id: `P${Object.values(this.selectedProcedures).flat().length + 1}`,
      name: 'New Procedure',
      code: 'PROC-123',
      quantity: 1,
      amount: 200.00
    };

    this.selectedProcedures = {
      ...this.selectedProcedures,
      [diagnosisId]: [...(this.selectedProcedures[diagnosisId] || []), newProcedure]
    };
    this.requestUpdate();
  }

  handleProcedureRemove(diagnosisId, procedureId) {
    this.selectedProcedures = {
      ...this.selectedProcedures,
      [diagnosisId]: this.selectedProcedures[diagnosisId].filter(p => p.id !== procedureId)
    };
    this.requestUpdate();
  }

  handleMedicationAdd(medication) {
    this.selectedMedications = [...this.selectedMedications, medication];
    this.requestUpdate();
  }

  handleMedicationRemove(medicationId) {
    this.selectedMedications = this.selectedMedications.filter(m => m.id !== medicationId);
    this.requestUpdate();
  }

  handleObservationAdd() {
    const newObservation = {
      id: `O${this.observations.length + 1}`,
      title: 'New Observation',
      date: new Date().toISOString(),
      value: 'Enter observation details here'
    };

    this.observations = [...this.observations, newObservation];
    this.requestUpdate();
  }

  handleObservationRemove(observationId) {
    this.observations = this.observations.filter(o => o.id !== observationId);
    this.requestUpdate();
  }

  calculateTotals() {
    // Calculate diagnosis and procedures total
    const diagnosisTotal = this.selectedDiagnosis.reduce((total, diagnosis) => {
      const proceduresTotal = (this.selectedProcedures[diagnosis.id] || [])
        .reduce((sum, proc) => sum + proc.amount, 0);
      return total + diagnosis.amount + proceduresTotal;
    }, 0);

    // Calculate medications total
    const medicationsTotal = this.selectedMedications
      .reduce((total, med) => total + med.amount, 0);

    const subtotal = diagnosisTotal + medicationsTotal;
    const vat = subtotal * 0.15; // 15% VAT
    const total = subtotal + vat;

    return {
      diagnosisTotal: diagnosisTotal.toFixed(2),
      proceduresTotal: Object.values(this.selectedProcedures)
        .flat()
        .reduce((total, proc) => total + proc.amount, 0)
        .toFixed(2),
      medicationsTotal: medicationsTotal.toFixed(2),
      subtotal: subtotal.toFixed(2),
      vat: vat.toFixed(2),
      total: total.toFixed(2)
    };
  }

  // Validation Methods
  validateDiagnosis(diagnosis) {
    const errors = {};
    if (!diagnosis.code) errors.code = 'Diagnosis code is required';
    if (!diagnosis.description) errors.description = 'Description is required';
    if (!diagnosis.amount || diagnosis.amount <= 0) errors.amount = 'Valid amount is required';
    return errors;
  }

  validateProcedure(procedure) {
    const errors = {};
    if (!procedure.name) errors.name = 'Procedure name is required';
    if (!procedure.code) errors.code = 'Procedure code is required';
    if (!procedure.quantity || procedure.quantity <= 0) errors.quantity = 'Valid quantity is required';
    if (!procedure.amount || procedure.amount <= 0) errors.amount = 'Valid amount is required';
    return errors;
  }

  validateMedication(medication) {
    const errors = {};
    if (!medication.name) errors.name = 'Medication name is required';
    if (!medication.dosage) errors.dosage = 'Dosage is required';
    if (!medication.quantity || medication.quantity <= 0) errors.quantity = 'Valid quantity is required';
    if (!medication.amount || medication.amount <= 0) errors.amount = 'Valid amount is required';
    return errors;
  }

  // Edit Methods
  handleEdit(type, item) {
    this.editingItem = { type, ...item };
    this.validationErrors = {};
    this.requestUpdate();
  }

  handleEditSave() {
    let errors = {};
    switch (this.editingItem.type) {
      case 'diagnosis':
        errors = this.validateDiagnosis(this.editingItem);
        if (Object.keys(errors).length === 0) {
          this.selectedDiagnosis = this.selectedDiagnosis.map(d => 
            d.id === this.editingItem.id ? { ...this.editingItem } : d
          );
        }
        break;

      case 'procedure':
        errors = this.validateProcedure(this.editingItem);
        if (Object.keys(errors).length === 0) {
          this.selectedProcedures = {
            ...this.selectedProcedures,
            [this.editingItem.diagnosisId]: this.selectedProcedures[this.editingItem.diagnosisId]
              .map(p => p.id === this.editingItem.id ? { ...this.editingItem } : p)
          };
        }
        break;

      case 'medication':
        errors = this.validateMedication(this.editingItem);
        if (Object.keys(errors).length === 0) {
          this.selectedMedications = this.selectedMedications.map(m => 
            m.id === this.editingItem.id ? { ...this.editingItem } : m
          );
        }
        break;
    }

    if (Object.keys(errors).length === 0) {
      this.editingItem = null;
      this.requestUpdate();
    } else {
      this.validationErrors = errors;
    }
  }

  // Search Methods
  async handleDiagnosisSearch(e) {
    const searchTerm = e.target.value;
    if (searchTerm.length < 2) {
      this.searchResults = [];
      return;
    }

    // Simulated API call - replace with actual API
    this.searchResults = [
      { code: 'J20.9', description: 'Acute Bronchitis' },
      { code: 'J45.901', description: 'Unspecified Asthma' },
      // Add more results
    ].filter(d => 
      d.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  async handleMedicationSearch(e) {
    const searchTerm = e.target.value;
    if (searchTerm.length < 2) {
      this.searchResults = [];
      return;
    }

    // Simulated API call - replace with actual API
    this.searchResults = [
      { name: 'Amoxicillin', dosage: '500mg', amount: 120.00 },
      { name: 'Azithromycin', dosage: '250mg', amount: 150.00 },
      // Add more results
    ].filter(m => 
      m.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  renderEditModal() {
    if (!this.editingItem) return '';

    return html`
      <div class="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <h3 class="modal-title">
              Edit ${this.editingItem.type.charAt(0).toUpperCase() + this.editingItem.type.slice(1)}
            </h3>
            <button class="modal-close" @click=${() => this.editingItem = null}>×</button>
          </div>
          <div class="form-grid">
            ${this.renderEditForm()}
          </div>
          <div class="action-buttons">
            <button class="btn btn-secondary" @click=${() => this.editingItem = null}>
              Cancel
            </button>
            <button class="btn btn-primary" @click=${this.handleEditSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderEditForm() {
    switch (this.editingItem.type) {
      case 'diagnosis':
        return html`
          <div class="form-field">
            <label class="form-label">Code</label>
            <div class="search-container">
              <input class="form-input ${this.validationErrors.code ? 'error' : ''}"
                type="text"
                .value=${this.editingItem.code}
                @input=${e => {
                  this.editingItem = { ...this.editingItem, code: e.target.value };
                  this.handleDiagnosisSearch(e);
                }}
              />
              ${this.searchResults.length > 0 ? html`
                <div class="search-results">
                  ${this.searchResults.map(result => html`
                    <div class="search-item" @click=${() => {
                      this.editingItem = { 
                        ...this.editingItem, 
                        code: result.code,
                        description: result.description
                      };
                      this.searchResults = [];
                    }}>
                      <strong>${result.code}</strong> - ${result.description}
                    </div>
                  `)}
                </div>
              ` : ''}
            </div>
            ${this.validationErrors.code ? html`
              <span class="error-message">${this.validationErrors.code}</span>
            ` : ''}
          </div>
          <div class="form-field">
            <label class="form-label">Description</label>
            <input class="form-input ${this.validationErrors.description ? 'error' : ''}"
              type="text"
              .value=${this.editingItem.description}
              @input=${e => this.editingItem = { ...this.editingItem, description: e.target.value }}
            />
            ${this.validationErrors.description ? html`
              <span class="error-message">${this.validationErrors.description}</span>
            ` : ''}
          </div>
          <div class="form-field">
            <label class="form-label">Amount (SAR)</label>
            <input class="form-input ${this.validationErrors.amount ? 'error' : ''}"
              type="number"
              step="0.01"
              .value=${this.editingItem.amount}
              @input=${e => this.editingItem = { ...this.editingItem, amount: parseFloat(e.target.value) }}
            />
            ${this.validationErrors.amount ? html`
              <span class="error-message">${this.validationErrors.amount}</span>
            ` : ''}
          </div>
        `;

      case 'procedure':
        return html`
          <div class="form-field">
            <label class="form-label">Name</label>
            <input class="form-input ${this.validationErrors.name ? 'error' : ''}"
              type="text"
              .value=${this.editingItem.name}
              @input=${e => this.editingItem = { ...this.editingItem, name: e.target.value }}
            />
            ${this.validationErrors.name ? html`
              <span class="error-message">${this.validationErrors.name}</span>
            ` : ''}
          </div>
          <div class="form-field">
            <label class="form-label">Code</label>
            <input class="form-input ${this.validationErrors.code ? 'error' : ''}"
              type="text"
              .value=${this.editingItem.code}
              @input=${e => this.editingItem = { ...this.editingItem, code: e.target.value }}
            />
            ${this.validationErrors.code ? html`
              <span class="error-message">${this.validationErrors.code}</span>
            ` : ''}
          </div>
          <div class="form-field">
            <label class="form-label">Quantity</label>
            <input class="form-input ${this.validationErrors.quantity ? 'error' : ''}"
              type="number"
              min="1"
              .value=${this.editingItem.quantity}
              @input=${e => this.editingItem = { ...this.editingItem, quantity: parseInt(e.target.value) }}
            />
            ${this.validationErrors.quantity ? html`
              <span class="error-message">${this.validationErrors.quantity}</span>
            ` : ''}
          </div>
          <div class="form-field">
            <label class="form-label">Amount (SAR)</label>
            <input class="form-input ${this.validationErrors.amount ? 'error' : ''}"
              type="number"
              step="0.01"
              .value=${this.editingItem.amount}
              @input=${e => this.editingItem = { ...this.editingItem, amount: parseFloat(e.target.value) }}
            />
            ${this.validationErrors.amount ? html`
              <span class="error-message">${this.validationErrors.amount}</span>
            ` : ''}
          </div>
        `;

      case 'medication':
        return html`
          <div class="form-field">
            <label class="form-label">Name</label>
            <div class="search-container">
              <input class="form-input ${this.validationErrors.name ? 'error' : ''}"
                type="text"
                .value=${this.editingItem.name}
                @input=${e => {
                  this.editingItem = { ...this.editingItem, name: e.target.value };
                  this.handleMedicationSearch(e);
                }}
              />
              ${this.searchResults.length > 0 ? html`
                <div class="search-results">
                  ${this.searchResults.map(result => html`
                    <div class="search-item" @click=${() => {
                      this.editingItem = { 
                        ...this.editingItem, 
                        name: result.name,
                        dosage: result.dosage,
                        amount: result.amount
                      };
                      this.searchResults = [];
                    }}>
                      <strong>${result.name}</strong> - ${result.dosage}
                    </div>
                  `)}
                </div>
              ` : ''}
            </div>
            ${this.validationErrors.name ? html`
              <span class="error-message">${this.validationErrors.name}</span>
            ` : ''}
          </div>
          <div class="form-field">
            <label class="form-label">Dosage</label>
            <input class="form-input ${this.validationErrors.dosage ? 'error' : ''}"
              type="text"
              .value=${this.editingItem.dosage}
              @input=${e => this.editingItem = { ...this.editingItem, dosage: e.target.value }}
            />
            ${this.validationErrors.dosage ? html`
              <span class="error-message">${this.validationErrors.dosage}</span>
            ` : ''}
          </div>
          <div class="form-field">
            <label class="form-label">Quantity</label>
            <input class="form-input ${this.validationErrors.quantity ? 'error' : ''}"
              type="number"
              min="1"
              .value=${this.editingItem.quantity}
              @input=${e => this.editingItem = { ...this.editingItem, quantity: parseInt(e.target.value) }}
            />
            ${this.validationErrors.quantity ? html`
              <span class="error-message">${this.validationErrors.quantity}</span>
            ` : ''}
          </div>
          <div class="form-field">
            <label class="form-label">Unit</label>
            <select class="form-input"
              .value=${this.editingItem.unit}
              @change=${e => this.editingItem = { ...this.editingItem, unit: e.target.value }}
            >
              <option value="tablets">Tablets</option>
              <option value="capsules">Capsules</option>
              <option value="ml">ML</option>
              <option value="mg">MG</option>
              <option value="units">Units</option>
            </select>
          </div>
          <div class="form-field">
            <label class="form-label">Amount (SAR)</label>
            <input class="form-input ${this.validationErrors.amount ? 'error' : ''}"
              type="number"
              step="0.01"
              .value=${this.editingItem.amount}
              @input=${e => this.editingItem = { ...this.editingItem, amount: parseFloat(e.target.value) }}
            />
            ${this.validationErrors.amount ? html`
              <span class="error-message">${this.validationErrors.amount}</span>
            ` : ''}
          </div>
        `;
    }
  }

  render() {
    const totals = this.calculateTotals();

    return html`
      <div class="claim-container">
        <!-- Invoice Header -->
        <div class="invoice-header">
          <div class="company-info">
            <div class="company-name">${this.claimData.provider.name}</div>
            <div class="info-group">
              <div class="info-label">Provider ID</div>
              <div class="info-value">${this.claimData.provider.id}</div>
            </div>
            <div class="info-group">
              <div class="info-label">Address</div>
              <div class="info-value">
                ${this.claimData.provider.address}<br>
                ${this.claimData.provider.city}, ${this.claimData.provider.country}
              </div>
            </div>
            <div class="info-group">
              <div class="info-label">Contact</div>
              <div class="info-value">${this.claimData.provider.contact}</div>
            </div>
          </div>

          <div class="patient-info">
            <div class="patient-name">Patient Information</div>
            <div class="info-group">
              <div class="info-label">Patient ID</div>
              <div class="info-value">${this.claimData.patient.id}</div>
            </div>
            <div class="info-group">
              <div class="info-label">Name</div>
              <div class="info-value">${this.claimData.patient.name}</div>
            </div>
            <div class="info-group">
              <div class="info-label">Insurance</div>
              <div class="info-value">${this.claimData.patient.insurance}</div>
            </div>
          </div>
        </div>

        <!-- Diagnosis Section -->
        <div class="section">
          <div class="section-header">
            <h2 class="section-title">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Diagnosis & Procedures
            </h2>
          </div>

          <div class="line-items">
            <div class="line-item line-item-header">
              <div>Description</div>
              <div>Code</div>
              <div>Quantity</div>
              <div>Amount (SAR)</div>
            </div>

            ${this.renderLineItems()}
          </div>
        </div>

        <!-- Medications Section -->
        <div class="section">
          <div class="section-header">
            <h2 class="section-title">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Medications
            </h2>
          </div>

          <div class="line-items">
            <div class="line-item line-item-header">
              <div>Medication</div>
              <div>Dosage</div>
              <div>Quantity</div>
              <div>Amount (SAR)</div>
            </div>

            ${this.renderMedications()}
          </div>
        </div>

        <!-- Detailed Totals Section -->
        <div class="total-section">
          <div>
            <div class="total-row">
              <span class="total-label">Diagnosis Total</span>
              <span class="total-value">SAR ${totals.diagnosisTotal}</span>
            </div>
            <div class="total-row">
              <span class="total-label">Procedures Total</span>
              <span class="total-value">SAR ${totals.proceduresTotal}</span>
            </div>
            <div class="total-row">
              <span class="total-label">Medications Total</span>
              <span class="total-value">SAR ${totals.medicationsTotal}</span>
            </div>
            <div class="total-row">
              <span class="total-label">Subtotal</span>
              <span class="total-value">SAR ${totals.subtotal}</span>
            </div>
            <div class="total-row">
              <span class="total-label">VAT (15%)</span>
              <span class="total-value">SAR ${totals.vat}</span>
            </div>
            <div class="total-row">
              <span class="total-label">Total</span>
              <span class="total-value">SAR ${totals.total}</span>
            </div>
          </div>
        </div>

        <!-- Remarks & Observations -->
        <div class="remarks-section">
          <div class="section-header">
            <h3 class="remarks-title">Remarks & Observations</h3>
            <button class="btn btn-primary" @click=${this.handleObservationAdd}>
              Add Observation
            </button>
          </div>
          
          <div class="observation-list">
            ${this.observations.map(observation => html`
              <div class="observation-item">
                <div class="observation-header">
                  <span class="observation-title">${observation.title}</span>
                  <span class="observation-date">
                    ${new Date(observation.date).toLocaleDateString()}
                  </span>
                </div>
                <div class="observation-value">
                  ${observation.value}
                </div>
                <button class="btn btn-danger" 
                  @click=${() => this.handleObservationRemove(observation.id)}>
                  Remove
                </button>
              </div>
            `)}
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
          <button class="btn btn-secondary" @click=${this.handleSaveAsDraft}>
            Save as Draft
          </button>
          <button class="btn btn-primary" @click=${this.handleSubmit}>
            Submit Claim
          </button>
        </div>

        ${this.renderEditModal()}
      </div>
    `;
  }

  handleSubmit() {
    // Prepare claim data
    const claimData = {
      provider: this.claimData.provider,
      patient: this.claimData.patient,
      diagnosis: this.selectedDiagnosis,
      procedures: this.selectedProcedures,
      medications: this.selectedMedications,
      observations: this.observations,
      totals: this.calculateTotals()
    };

    // Dispatch event with claim data
    this.dispatchEvent(new CustomEvent('claim-submit', {
      detail: claimData,
      bubbles: true,
      composed: true
    }));
  }

  handleSaveAsDraft() {
    const draftData = {
      provider: this.claimData.provider,
      patient: this.claimData.patient,
      diagnosis: this.selectedDiagnosis,
      procedures: this.selectedProcedures,
      medications: this.selectedMedications,
      observations: this.observations,
      totals: this.calculateTotals()
    };

    // Dispatch event with draft data
    this.dispatchEvent(new CustomEvent('save-draft', {
      detail: draftData,
      bubbles: true,
      composed: true
    }));
  }

  renderLineItems() {
    return this.selectedDiagnosis.map(diagnosis => html`
      <div class="line-item">
        <div>
          <strong>${diagnosis.description}</strong>
          <div class="procedure-list">
            ${(this.selectedProcedures[diagnosis.id] || []).map(procedure => html`
              <div class="procedure-item">
                <div>${procedure.name} (${procedure.code})</div>
                <div>${procedure.quantity}</div>
                <div class="currency">SAR ${procedure.amount.toFixed(2)}</div>
              </div>
            `)}
          </div>
        </div>
        <div>${diagnosis.code}</div>
        <div>1</div>
        <div class="currency">SAR ${diagnosis.amount.toFixed(2)}</div>
      </div>
    `);
  }

  renderMedications() {
    return this.selectedMedications.map(medication => html`
      <div class="line-item">
        <div>${medication.name}</div>
        <div>${medication.dosage}</div>
        <div>${medication.quantity} ${medication.unit}</div>
        <div class="currency">SAR ${medication.amount.toFixed(2)}</div>
      </div>
    `);
  }
}
