import { LitElement, html, css } from 'lit';
import './MultiSelect.js';

const componentStyles = css`
  :host {
    display: block;
    background: white;
    border-radius: 0.5rem;
    overflow: hidden;
  }

  .table-container {
    width: 100%;
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    background-color: #E9D5FF;
    color: #4B5563;
    font-weight: 600;
    text-align: left;
    padding: 0.75rem 1rem;
  }

  td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #E5E7EB;
  }

  tr:nth-child(even) {
    background-color: #F9FAFB;
  }

  .number-column {
    width: 50px;
  }

  .service-column {
    width: 200px;
  }

  .select-column {
    width: 400px;
  }

  .amount-column {
    width: 150px;
  }

  .amount-input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #D1D5DB;
    border-radius: 0.25rem;
    text-align: right;
  }
`;

export class ServiceTable extends LitElement {
  static get properties() {
    return {
      services: { type: Array }
    };
  }

  static get styles() {
    return componentStyles;
  }

  constructor() {
    super();
    this.services = [
      { id: 1, name: 'E & M Codes', items: ['Item 1', 'Item 2', 'Item 3'] },
      { id: 2, name: 'CPT Services', items: ['Service 1', 'Service 2', 'Service 3'] },
      { id: 3, name: 'Laboratory', items: ['Lab 1', 'Lab 2', 'Lab 3'] },
      { id: 4, name: 'Radiology', items: ['X-Ray', 'MRI', 'CT Scan'] },
      { id: 5, name: 'Dental', items: ['Cleaning', 'Filling', 'Crown'] },
      { id: 6, name: 'HCPCS', items: ['Code 1', 'Code 2', 'Code 3'] },
      { id: 7, name: 'Room & Board', items: ['Single', 'Double', 'Suite'] },
      { id: 8, name: 'Pharmacy', items: ['Med 1', 'Med 2', 'Med 3'] },
      { id: 9, name: 'HA Service Codes', items: ['HA1', 'HA2', 'HA3'] },
      { id: 10, name: 'DRG', items: ['DRG1', 'DRG2', 'DRG3'] },
      { id: 11, name: 'Kitchen Services', items: ['Meal 1', 'Meal 2', 'Meal 3'] },
      { id: 12, name: 'Endoscopy', items: ['Endo 1', 'Endo 2', 'Endo 3'] },
      { id: 13, name: 'Orthodontic', items: ['Ortho 1', 'Ortho 2', 'Ortho 3'] },
      { id: 14, name: 'Maternity', items: ['Mat 1', 'Mat 2', 'Mat 3'] },
      { id: 15, name: 'Surgical Packages', items: ['Surgery 1', 'Surgery 2', 'Surgery 3'] }
    ];
  }

  handleSelectionChange(id, e) {
    console.log(`Service ${id} selection changed:`, e.detail.value);
  }

  handleAmountChange(id, e) {
    console.log(`Service ${id} amount changed:`, e.target.value);
  }

  render() {
    return html`
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th class="number-column">No.</th>
              <th class="service-column">Service Types</th>
              <th class="select-column"></th>
              <th class="amount-column">Out Deductible</th>
            </tr>
          </thead>
          <tbody>
            ${this.services.map(service => html`
              <tr>
                <td>${service.id}</td>
                <td>${service.name}</td>
                <td>
                  <multi-select
                    .options="${service.items}"
                    placeholder="MULTI SELECT OF ITEMS WHICH WILL CALCULATE SUM AT NEXT COL"
                    .name="${service.id}"
                    @change="${(e) => this.handleSelectionChange(service.id, e)}"
                  ></multi-select>
                </td>
                <td>
                  <input
                    type="number"
                    class="amount-input"
                    value="0.00"
                    step="0.01"
                    @input="${(e) => this.handleAmountChange(service.id, e)}"
                  />
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }
}

// Prevent double registration
if (!customElements.get('service-table')) {
  customElements.define('service-table', ServiceTable);
} 