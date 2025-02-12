import { LitElement, html, css } from 'lit';

const componentStyles = css`
  :host {
    display: block;
  }

  .grid-container {
    width: 100%;
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 1000px;
  }

  th, td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid #E5E7EB;
  }

  th {
    background-color: #F9FAFB;
    font-weight: 600;
    color: #374151;
  }

  tr:hover {
    background-color: #F9FAFB;
  }

  .status-cell {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .status-pending {
    background-color: #FEF3C7;
    color: #92400E;
  }

  .status-approved {
    background-color: #D1FAE5;
    color: #065F46;
  }

  .status-denied {
    background-color: #FEE2E2;
    color: #991B1B;
  }

  .action-cell {
    display: flex;
    gap: 0.5rem;
  }

  .action-button {
    padding: 0.25rem 0.5rem;
    border-radius: 0.375rem;
    background-color: #4F46E5;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 0.875rem;
  }

  .action-button:hover {
    background-color: #4338CA;
  }
`;

export class PriorAuthGrid extends LitElement {
  static get styles() {
    return componentStyles;
  }

  // Sample static data
  get sampleData() {
    return [
      {
        id: 'PA001',
        caseType: 'Inpatient',
        mrn: 'MRN123456',
        patientName: 'John Doe',
        doctorName: 'Dr. Smith',
        visitDate: '2024-03-15',
        startDate: '2024-03-20',
        diagnosisDate: '2024-03-10',
        status: 'Pending'
      },
      {
        id: 'PA002',
        caseType: 'Outpatient',
        mrn: 'MRN789012',
        patientName: 'Jane Smith',
        doctorName: 'Dr. Johnson',
        visitDate: '2024-03-14',
        startDate: '2024-03-18',
        diagnosisDate: '2024-03-12',
        status: 'Approved'
      },
      {
        id: 'PA003',
        caseType: 'Emergency',
        mrn: 'MRN345678',
        patientName: 'Robert Brown',
        doctorName: 'Dr. Williams',
        visitDate: '2024-03-13',
        startDate: '2024-03-13',
        diagnosisDate: '2024-03-13',
        status: 'Denied'
      }
    ];
  }

  getStatusClass(status) {
    return `status-cell status-${status.toLowerCase()}`;
  }

  render() {
    return html`
      <div class="grid-container">
        <table>
          <thead>
            <tr>
              <th>Prior Auth ID</th>
              <th>Case Type</th>
              <th>MRN</th>
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>Visit Date</th>
              <th>Start Date</th>
              <th>Diagnosis Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${this.sampleData.map(row => html`
              <tr>
                <td>${row.id}</td>
                <td>${row.caseType}</td>
                <td>${row.mrn}</td>
                <td>${row.patientName}</td>
                <td>${row.doctorName}</td>
                <td>${row.visitDate}</td>
                <td>${row.startDate}</td>
                <td>${row.diagnosisDate}</td>
                <td>
                  <span class="${this.getStatusClass(row.status)}">
                    ${row.status}
                  </span>
                </td>
                <td class="action-cell">
                  <button class="action-button">View</button>
                  <button class="action-button">Edit</button>
                </td>
              </tr>
            `)}
          </tbody>
        </table>
      </div>
    `;
  }
}

if (!customElements.get('prior-auth-grid')) {
  customElements.define('prior-auth-grid', PriorAuthGrid);
} 