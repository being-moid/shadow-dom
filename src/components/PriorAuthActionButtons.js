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
      "requestId": "DENTAL-2024-001",
      "encounter": {
        "id": "ENC-2024-001",
        "startDate": "2024-03-20T10:00:00Z",
        "endDate": "2024-03-20T11:00:00Z",
        "type": "outpatient",
        "class": "AMB",
        "classDisplay": "Ambulatory",
        "serviceEventCode": "ICSE",
        "serviceEventDescription": "Initial Consultation Service Event",
        "status": "planned"
      },
      "providerLicense": {
        "id": "PROV-123",
        "name": "Dental Clinic",
        "licenseNumber": "PR-FHIR",
        "specialtyCode": "DENT",
        "effectiveDate": "2024-01-01T00:00:00Z",
        "expiryDate": "2024-12-31T23:59:59Z"
      },
      "payerLicense": {
        "id": "PAYER-456",
        "name": "Dental Insurance Co",
        "licenseNumber": "INS-FHIR",
        "registrationNumber": "REG-456",
        "effectiveDate": "2024-01-01T00:00:00Z",
        "expiryDate": "2024-12-31T23:59:59Z"
      },
      "practitionerLicense": {
        "id": "DENT-789",
        "name": "Dr. Sarah Smith",
        "licenseNumber": "DDS-345678",
        "specialtyCode": "GDP",
        "effectiveDate": "2024-01-01T00:00:00Z",
        "expiryDate": "2024-12-31T23:59:59Z"
      },
      "patient": {
        "identifier": "PAT-001",
        "identifierSystem": "urn:system:patient",
        "firstName": "John",
        "lastName": "Doe",
        "gender": "male",
        "dateOfBirth": "1990-01-01T00:00:00Z",
        "maritalStatus": "married",
        "phoneNumber": "+966500000000"
      },
      "coverage": {
        "policyHolderId": "PH-001",
        "payorId": "PAY-001",
        "coverageType": "dental",
        "subscriberId": "SUB-001",
        "relation": "self",
        "relationDisplay": "Self",
        "coverageStartDate": "2024-01-01T00:00:00Z",
        "coverageEndDate": "2024-12-31T23:59:59Z",
        "coverageId": "COV-001",
        "beneficiaryId": "BEN-001",
        "coverageClassCode": "CLASS-001",
        "planCode": "DENTAL-PLAN-001",
        "planName": "Premium Dental Plan",
        "network": "in-network",
        "coverageTypeDisplay": "Dental Coverage",
        "memberId": "MEM-001",
        "policyNumber": "POL-001"
      },
      "claimType": "professional",
      "claimSubType": "dental",
      "priority": "normal",
      "payeeType": "provider",
      "claimID": "CLM-2024-001",
      "primaryPractitioner": {
        "practitionerId": "DENT-789",
        "role": "primary",
        "qualification": "DDS",
        "specialty": "General Dentistry"
      },
      "careTeam": [
        {
          "practitionerId": "DENT-789",
          "role": "primary",
          "qualification": "DDS",
          "specialty": "General Dentistry"
        }
      ],
      "diagnoses": [
        {
          "code": "K02.9",
          "system": "http://hl7.org/fhir/sid/icd-10",
          "type": "principal",
          "display": "Dental caries, unspecified"
        }
      ],
      "eligibilityResponseId": "ELIG-001",
      "isOfflineEligibility": false,
      "isTransfer": false,
      "isNewborn": false,
      "procedureType": "restorative",
      "procedures": [
        {
          "procedureCode": "D2391",
          "system": "http://nphies.sa/terminology/CodeSystem/oral-health-op",
          "quantity": 1,
          "unitPrice": 300.00,
          "serviceDate": "2024-03-20T10:00:00Z",
          "ToothCode": "1",
          "ToothSiteCode": "M",
          "toothNumber": "17"
        }
      ],
      "isFollowUp": false
    };
  }

  async handleSubmit() {
    console.log('Starting handleSubmit with selectedPatient:', this.selectedPatient);

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
      
      // Map only the patient data, keeping the exact structure from dp.json
      dentalPriorAuth.patient = {
        identifier: this.selectedPatient.id ? this.selectedPatient.id.toString() : "PAT-001",
        identifierSystem: "urn:system:patient",
        firstName: this.selectedPatient.firstName || this.selectedPatient.fname || "John",
        lastName: this.selectedPatient.lastName || this.selectedPatient.lname || "Doe",
        gender: this.selectedPatient.gender?.genderName?.toLowerCase() || "male",
        dateOfBirth: this.selectedPatient.dateOfBirth || "1990-01-01T00:00:00Z",
        maritalStatus: "married",
        phoneNumber: this.selectedPatient.cellPhoneNo || this.selectedPatient.phoneNumber || "+966500000000"
      };

      console.log('Submitting prior auth request with body:', JSON.stringify(dentalPriorAuth, null, 2));

      // Submit the prior authorization request
      const response = await fetch(API_ENDPOINTS.PRIOR_AUTH.DENTAL_SUBMIT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dentalPriorAuth)
      });

      console.log('Received response:', response);
      const result = await response.json();
      console.log('Parsed response result:', result);

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
      console.error('Error in handleSubmit:', error);
      console.error('Error stack:', error.stack);
      this.dispatchEvent(new CustomEvent('notification', {
        detail: {
          message: `Error submitting prior authorization: ${error.message}`,
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