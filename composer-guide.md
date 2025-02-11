# Healthcare API Integration Guide

## 1. Diagnosis Management

### 1.1 Search ICDs
**Endpoint:** `GET /api/Diagnosis/SearchICDs/{searchTerm}`
**Description:** Search for ICD codes using a search term
**Parameters:**
- `searchTerm` (string): Text to search for in ICD codes/descriptions

## 2. Medication Management

### 2.1 Search Medications
**Endpoint:** `POST /api/Medication/GetPagedAsync`
**Description:** Search medications with filtering and pagination
**Request Body:**

json
{
"filters": "string",
"sorts": "string",
"page": "integer",
"pageSize": "integer"
}


## 3. Care Team Management

### 3.1 Search Care Team Members
**Endpoint:** `POST /api/HrEmployee/GetPagedAsync`
**Description:** Search for healthcare providers/employees
**Request Body:**


**Filter Options:**
- `Fname`: First name
- `Lname`: Last name
- `Email`: Email address
- `DepartmentId`: Department filter

## 4. Vitals Management

### 4.1 Outpatient BMI Records
**Endpoint:** `POST /api/IclinicsBmi/GetPagedAsync`
**Description:** Search and filter BMI records for outpatients
**Request Body:**

{
"filters": "patientId==123,visitId==456",
"sorts": "-recordDate",
"page": 1,
"pageSize": 10
}


### 4.2 Inpatient BMI Records
**Endpoint:** `POST /api/IpdNursingBmi/GetPagedAsync`
**Description:** Search and filter BMI records for inpatients
**Request Body:**


# Healthcare API Integration Guide (Additional Endpoints)

## 5. Procedures and CPT Codes

### 5.1 Search Procedures
**Endpoint:** `GET /api/MasterPriceServiceDirectory/AutocompleteServices`
**Description:** Search for procedures and CPT codes
**Parameters:**
- `searchTerm` (string): Text to search in procedure names/descriptions
- `serviceType` (integer, optional): Filter by service type ID



### 5.2 Comprehensive Service Search
**Endpoint:** `GET /api/MasterPriceServiceDirectory/SearchServices/{searchTerm}`
**Description:** Detailed search across all service types
**Parameters:**
- `searchTerm` (string): Search term for services

## 6. Price Management

### 6.1 Service Prices
**Endpoint:** `POST /api/MpdirServiceprice/GetPagedAsync`
**Description:** Get service prices with filtering
**Request Body:**

json
{
"filters": "serviceId==123,isActive==true",
"sorts": "-effectiveFrom",
"page": 1,
"pageSize": 10
}

**Filter Options:**
- `serviceId`: Filter by service
- `pricingTypeId`: Filter by pricing type
- `price`: Filter by price amount
- `effectiveFrom`: Filter by effective date
- `isActive`: Filter by active status

### 6.2 Price Lists
**Endpoint:** `POST /api/MpdirServicedirectoryPricelist/GetPagedAsync`
**Description:** Get price lists for services
**Request Body:**

json
{
"filters": "serviceId==123,facilityId==456",
"sorts": "-effectiveDate",
"page": 1,
"pageSize": 10
}
Please use and implement all sections 
**Response:**# Healthcare API Integration Guide

## 1. Diagnosis Management

### 1.1 Search ICDs
**Endpoint:** `GET /api/Diagnosis/SearchICDs/{searchTerm}`
**Description:** Search for ICD codes using a search term
**Parameters:**
- `searchTerm` (string): Text to search for in ICD codes/descriptions

## 2. Medication Management

### 2.1 Search Medications
**Endpoint:** `POST /api/Medication/GetPagedAsync`
**Description:** Search medications with filtering and pagination
**Request Body:**

json
{
"filters": "string",
"sorts": "string",
"page": "integer",
"pageSize": "integer"
}


## 3. Care Team Management

### 3.1 Search Care Team Members
**Endpoint:** `POST /api/HrEmployee/GetPagedAsync`
**Description:** Search for healthcare providers/employees
**Request Body:**


**Filter Options:**
- `Fname`: First name
- `Lname`: Last name
- `Email`: Email address
- `DepartmentId`: Department filter

## 4. Vitals Management

### 4.1 Outpatient BMI Records
**Endpoint:** `POST /api/IclinicsBmi/GetPagedAsync`
**Description:** Search and filter BMI records for outpatients
**Request Body:**

{
"filters": "patientId==123,visitId==456",
"sorts": "-recordDate",
"page": 1,
"pageSize": 10
}


### 4.2 Inpatient BMI Records
**Endpoint:** `POST /api/IpdNursingBmi/GetPagedAsync`
**Description:** Search and filter BMI records for inpatients
**Request Body:**


# Healthcare API Integration Guide (Additional Endpoints)

## 5. Procedures and CPT Codes

### 5.1 Search Procedures
**Endpoint:** `GET /api/MasterPriceServiceDirectory/AutocompleteServices`
**Description:** Search for procedures and CPT codes
**Parameters:**
- `searchTerm` (string): Text to search in procedure names/descriptions
- `serviceType` (integer, optional): Filter by service type ID



### 5.2 Comprehensive Service Search
**Endpoint:** `GET /api/MasterPriceServiceDirectory/SearchServices/{searchTerm}`
**Description:** Detailed search across all service types
**Parameters:**
- `searchTerm` (string): Search term for services

## 6. Price Management

### 6.1 Service Prices
**Endpoint:** `POST /api/MpdirServiceprice/GetPagedAsync`
**Description:** Get service prices with filtering
**Request Body:**

json
{
"filters": "serviceId==123,isActive==true",
"sorts": "-effectiveFrom",
"page": 1,
"pageSize": 10
}

**Filter Options:**
- `serviceId`: Filter by service
- `pricingTypeId`: Filter by pricing type
- `price`: Filter by price amount
- `effectiveFrom`: Filter by effective date
- `isActive`: Filter by active status

### 6.2 Price Lists
**Endpoint:** `POST /api/MpdirServicedirectoryPricelist/GetPagedAsync`
**Description:** Get price lists for services
**Request Body:**

json
{
"filters": "serviceId==123,facilityId==456",
"sorts": "-effectiveDate",
"page": 1,
"pageSize": 10
}
Please use and implement all sections 
**Response:**

HEALTHCARE SERVICE AUTOCOMPLETE INTEGRATION GUIDE
================================================

Backend Integration
-------------------
Endpoint: GET /api/MasterPriceServiceDirectory/AutocompleteServices
Parameters:
  - searchTerm: string (required)
  - serviceType?: number (from ServiceTypeConstants)

Response Structure (ServiceDirectoryDTO):
json
{
"id": 123,
"serviceName": "Complete Blood Count",
"description": "Lab test for blood analysis",
"serviceTypeId": 1,
"serviceTypeName": "Lab",
"standardCharges": 150.00,
"serviceCategory": "Pathology",
"cptCode": "85025",
"facilityName": "Main Lab Center"
}

Frontend Component Structure
----------------------------
typescript
@customElement('healthcare-service-autocomplete')
class HealthcareServiceAutocomplete extends LitElement {
@property({type: Array}) selectedServices: ServiceDirectoryDTO[] = [];
@state() private searchResults: ServiceDirectoryDTO[] = [];
// Style integration with project colors
static styles = css .medical-primary { color: #3B82F6; } .healthcare-bg { background-color: #F3F4F6; } ;
async searchServices(searchTerm: string) {
const response = await fetch(/api/MasterPriceServiceDirectory/AutocompleteServices?searchTerm=${encodeURIComponent(searchTerm)});
this.searchResults = await response.json();
}
render() {
return html <div class="healthcare-autocomplete space-y-2"> <!-- Search Input with Medical Icon --> <div class="relative"> <input type="text" @input=${this.debouncedSearch} placeholder="Search healthcare services..." class="w-full p-3 border-2 border-medical-primary rounded-lg focus:ring-2 focus:ring-healthcare-green"/> <span class="absolute right-3 top-3 text-medical-primary"> ${lucideIcon('stethoscope')} </span> </div> <!-- Search Results Dropdown --> <div class="healthcare-results bg-white shadow-xl rounded-md max-h-96 overflow-y-auto"> ${this._searchResults.map(service => html
<div class="p-3 hover:bg-healthcare-bg cursor-pointer flex items-center gap-3"
@click=${() => this.toggleService(service)}>
${this.getServiceIcon(service.serviceTypeId)}
<div class="flex-1">
<h3 class="font-semibold text-medical-primary">${service.serviceName}</h3>
<p class="text-sm text-gray-600">${service.description}</p>
<div class="flex gap-2 mt-1">
<span class="text-xs bg-healthcare-green text-white px-2 py-1 rounded">
${service.serviceTypeName}
</span>
${service.cptCode ? html<span class="text-xs bg-medical-primary text-white px-2 py-1 rounded"> CPT: ${service.cptCode} </span> : ''}
</div>
</div>
<span class="text-lg font-bold text-medical-primary">
$${service.standardCharges?.toFixed(2)}
</span>
</div>
)} </div> <!-- Selected Services Table --> <div class="healthcare-selected mt-4"> <table class="w-full border-collapse"> <thead class="bg-medical-primary text-white"> <tr> <th class="p-3 text-left">Service</th> <th class="p-3 text-right">Price</th> <th class="p-3 text-right">Actions</th> </tr> </thead> <tbody> ${this.selectedServices.map(service => html
<tr class="border-b hover:bg-healthcare-bg">
<td class="p-3">
<div class="flex items-center gap-2">
${this.getServiceIcon(service.serviceTypeId)}
<div>
<div class="font-medium">${service.serviceName}</div>
<div class="text-sm text-gray-500">${service.serviceTypeName}</div>
</div>
</div>
</td>
<td class="p-3 text-right">$${service.standardCharges?.toFixed(2)}</td>
<td class="p-3 text-right">
<button @click=${() => this.removeService(service.id)}
class="text-red-500 hover:text-red-700">
${lucideIcon('x-circle')}
</button>
</td>
</tr>
)} </tbody> </table> </div> </div> ;
}
}


UI/UX Implementation Notes
--------------------------
1. Icon Mapping Strategy:
typescript
private getServiceIcon(serviceTypeId: number) {
const icons = {
[ServiceTypeConstants.Lab]: 'test-tube',
[ServiceTypeConstants.Radiology]: 'scan',
[ServiceTypeConstants.Pharmacy]: 'pill',
// Add mappings for all 21 service types
};
return lucideIcon(icons[serviceTypeId] || 'stethoscope');
}



2. Color Implementation:
- Use Tailwind classes with medical color palette:
  - Primary: `bg-medical-primary` (#3B82F6)
  - Secondary: `bg-healthcare-green` (#10B981)
  - Background: `bg-healthcare-bg` (#F3F4F6)

3. Interaction Requirements:
- Debounced search (300ms)
- Keyboard navigation support
- Screen reader announcements
- Multi-select with clear visual feedback
- Responsive table with horizontal scroll on mobile

4. Validation Rules:
- Prevent duplicate service additions
- Show error state for unavailable services
- Validate network responses
- Handle empty states gracefully

Integration Checklist
--------------------
1. Add the web component to your form:
html
<healthcare-service-autocomplete></healthcare-service-autocomplete>

2. Implement the search handler:

private handleServiceUpdate(e: CustomEvent) {
this.selectedServices = e.detail.services;
this.calculateTotals();
}
private calculateTotals() {
this.netTotal = this.selectedServices.reduce((sum, s) => sum + (s.standardCharges || 0), 0);
this.grossTotal = this.netTotal 1.15; // Example VAT calculation
}

