import { LitElement, html, css } from 'lit';
import { API_ENDPOINTS } from '../config/api.js';

export class PriorAuthActionButtons extends LitElement {
  static get properties() {
    return {
      selectedPatient: { type: Object },
      isLoading: { type: Boolean }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .action-buttons {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        margin-top: 2rem;
        padding: 1.25rem;
        background: white;
        border-radius: 0.75rem;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
        border: 1px solid #E5E7EB;
        position: sticky;
        bottom: -24px;
      }

      .btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 0.5rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        font-size: 14px;
      }

      .btn svg {
        width: 1.25rem;
        height: 1.25rem;
      }

      .btn-secondary {
        background: white;
        border: 1.5px solid #D1D5DB;
        color: #4B5563;
      }

      .btn-secondary:hover {
        border-color: #9CA3AF;
        color: #1F2937;
        transform: translateY(-1px);
      }

      .btn-primary {
        background: #8500d8;
        color: white;
      }

      .btn-primary:hover {
        background: #6a00ac;
      }

      .btn[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }
    `;
  }

  render() {
    return html`
      <div class="action-buttons">
        <button class="btn btn-secondary" @click="${this.handleSaveAsDraft}" ?disabled="${this.isLoading}">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          Save as Draft
        </button>
        <button class="btn btn-secondary" @click="${this.handleValidate}" ?disabled="${this.isLoading}">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Validate
        </button>
        <button class="btn btn-primary" @click="${this.handleSubmit}" ?disabled="${this.isLoading}">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
          Submit
        </button>
      </div>
    `;
  }

  // Dental Prior Auth Template
  getDentalPriorAuthTemplate() {
    return {
      "ClaimableAmount": 120.00,
      "RequestId": "DENTAL-2024-001",
      "ProviderLicense": {
        "Id": "b1b3432921324f97af3be9fd0b1a14ae",
        "LicenseNumber": "PR-FHIR",
        "System": "http://nphies.sa/license/provider-license",
        "Name": "Test Dental Provider",
        "TypeNameProvider": "Dental Clinic",
        "TypeCodeOfProvider": "5",
        "FullName": "Test Dental Provider"
      },
      "PayerLicense": {
        "Id": "bff3aa1fbd3648619ac082357bf135db",
        "LicenseNumber": "INS-FHIR",
        "System": "http://nphies.sa/license/payer-license",
        "Name": "Test Payer",
        "FullName": "Test Payer Organization"
      },
      "PractitionerLicense": {
        "Id": "7",
        "LicenseNumber": "N-P-00003",
        "System": "http://nphies.sa/license/practitioner-license",
        "Title": "Dr.",
        "Name": "Amar Moustafa",
        "FullName": "Dr. Amar Moustafa"
      },
      "Patient": {
        "Identifier": "",
        "IdentifierSystem": "http://nphies.sa/identifier/iqama",
        "FirstName": "",
        "LastName": "",
        "Gender": "",
        "DateOfBirth": "",
        "MaritalStatus": "",
        "Occupation": "",
        "PhoneNumber": "",
        "NationalIdentity": ""
      },
      "Coverage": {
        "MemberId": "0000000001",
        "PolicyHolderId": "13",
        "PolicyNumber": "5009",
        "PayorId": "bff3aa1fbd3648619ac082357bf135db",
        "CoverageType": "EHCPOL",
        "SubscriberId": "123454186",
        "BeneficiaryId": "123454186",
        "Relation": "self",
        "RelationDisplay": "Self",
        "CoverageTypeDisplay": "extended healthcare",
        "CoverageStartDate": "2023-01-01",
        "CoverageEndDate": "2029-12-31",
        "CoverageId": "1333",
        "CoverageClassCode": "plan",
        "PlanCode": "CB135",
        "PlanName": "Dental Insurance Plan",
        "Network": "Golden C"
      },
      "Encounter": {
        "Id": "1",
        "ServiceEventCode": "DENTAL",
        "ServiceEventDescription": "Dental restoration procedure",
        "Status": "planned",
        "Class": "AMB",
        "ClassDisplay": "ambulatory",
        "Type": "DENTAL",
        "ServiceType": "Dental restoration service",
        "StartDate": "2025-01-08T10:25:00+03:00",
        "EndDate": "2025-01-08T12:30:00+03:00",
        "PatientId": "123454186",
        "Facility": {
          "Identifier": "b1b3432921324f97af3be9fd0b1a14ae",
          "Name": "Test Dental Provider",
          "Address": {
            "Line1": "123 Main St",
            "City": "Riyadh",
            "State": "Riyadh",
            "PostalCode": "12345",
            "Country": "SA"
          }
        }
      },
      "ClaimType": "professional",
      "ClaimID": "DENTAL-2113071",
      "ClaimSubType": "dental",
      "Priority": "normal",
      "PayeeType": "provider",
      "PrimaryPractitioner": {
        "PractitionerId": "7",
        "Role": "primary",
        "Qualification": "DDS",
        "Specialty": "General Dentistry"
      },
      "CareTeam": [
        {
          "PractitionerId": "7",
          "Role": "primary",
          "Qualification": "DDS",
          "Specialty": "General Dentistry"
        }
      ],
      "Diagnoses": [
        {
          "Code": "K02.1",
          "System": "http://hl7.org/fhir/sid/icd-10",
          "Display": "Dental caries of dentine",
          "Type": "principal",
          "OnsetDate": "2024-01-01"
        }
      ],
      "Procedures": [
        {
          "Code": "D2391",
          "System": "http://nphies.sa/terminology/CodeSystem/oral-health-op",
          "Information": "Resin-based composite - one surface, posterior",
          "Quantity": 1,
          "UnitPrice": 300.00,
          "NetPrice": 300.00,
          "Category": "restorative",
          "RequestedDate": "2025-01-05",
          "Location": "Dental Office",
          "ServiceDate": "2025-01-05"
        }
      ],
      "SupportingInformation": {
        "supportingInfoElements": [
          {
            "sequence": 1,
            "code": "vital-sign-systolic",
            "value": "120"
          },
          {
            "sequence": 2,
            "code": "vital-sign-diastolic",
            "value": "80"
          },
          {
            "sequence": 3,
            "code": "vital-sign-height",
            "value": "170"
          },
          {
            "sequence": 4,
            "code": "vital-sign-weight",
            "value": "75"
          },
          {
            "sequence": 5,
            "code": "pulse",
            "value": "72"
          },
          {
            "sequence": 6,
            "code": "temperature",
            "value": "37"
          },
          {
            "sequence": 7,
            "code": "chief-complaint",
            "value": "Tooth pain in upper right molar"
          },
          {
            "sequence": 8,
            "code": "oxygen-saturation",
            "value": "98"
          },
          {
            "sequence": 9,
            "code": "respiratory-rate",
            "value": "16"
          },
          {
            "sequence": 10,
            "code": "patient-history",
            "value": "No previous dental work on tooth 17"
          },
          {
            "sequence": 11,
            "code": "treatment-plan",
            "value": "Composite restoration on tooth 17"
          },
          {
            "sequence": 12,
            "code": "physical-examination",
            "value": "Visible cavity on distal surface of tooth 17"
          },
          {
            "sequence": 13,
            "code": "history-of-present-illness",
            "value": "Patient reports tooth sensitivity for 2 weeks"
          }
        ]
      },
      "ClaimVisitID": "DENTAL-2113071",
      "PreAuthRef": "req_13705",
      "toothNumber": "17",
      "procedureType": "restorative",
      "procedures": [
        {
          "procedureCode": "D2391",
          "procedureSystem": "http://nphies.sa/terminology/CodeSystem/oral-health-op",
          "serviceDate": "2025-01-05T10:25:00+03:00",
          "surfaceCount": 1,
          "unitPrice": 300.00
        }
      ],
      "isFollowUp": false
    };
  }

  async handleSubmit() {
    if (!this.selectedPatient) {
      this.dispatchEvent(new CustomEvent('notification', {
        detail: {
          message: 'Please select a patient first',
          type: 'error'
        }
      }));
      return;
    }

    try {
      const dentalPriorAuth = this.getDentalPriorAuthTemplate();
      
      // Update only the Patient object with selected patient's information
      dentalPriorAuth.Patient = {
        Identifier: this.selectedPatient.id?.toString() || '',
        IdentifierSystem: "http://nphies.sa/identifier/iqama",
        FirstName: this.selectedPatient.fname || '',
        LastName: this.selectedPatient.lname || '',
        Gender: (typeof this.selectedPatient.gender === 'string' ? this.selectedPatient.gender.toLowerCase() : 'unknown'),
        DateOfBirth: this.selectedPatient.dateOfBirth || '',
        MaritalStatus: this.selectedPatient.maritalStatus || 'U',
        Occupation: this.selectedPatient.occupation || '',
        PhoneNumber: this.selectedPatient.phoneNumber || '',
        NationalIdentity: this.selectedPatient.nationalId || ''
      };

      // Submit the prior authorization request
      const response = await fetch(API_ENDPOINTS.PRIOR_AUTH.DENTAL_SUBMIT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dentalPriorAuth)
      });

      const result = await response.json();
      if (result.isSuccessfull) {
        this.dispatchEvent(new CustomEvent('notification', {
          detail: {
            message: 'Prior authorization submitted successfully',
            type: 'success'
          }
        }));
        this.dispatchEvent(new CustomEvent('close'));
      } else {
        throw new Error(result.errorMessage || 'Submission failed');
      }
    } catch (error) {
      console.error('Error submitting prior auth:', error);
      this.dispatchEvent(new CustomEvent('notification', {
        detail: {
          message: error.message || 'Error submitting prior authorization',
          type: 'error'
        }
      }));
    }
  }

  async handleValidate() {
    // Implement validation logic
    this.dispatchEvent(new CustomEvent('notification', {
      detail: {
        message: 'Validation in progress...',
        type: 'info'
      }
    }));
  }

  async handleSaveAsDraft() {
    // Implement save as draft logic
    this.dispatchEvent(new CustomEvent('notification', {
      detail: {
        message: 'Draft saved successfully',
        type: 'success'
      }
    }));
  }
}

customElements.define('prior-auth-action-buttons', PriorAuthActionButtons); 