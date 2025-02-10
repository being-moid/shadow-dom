const API_URL = 'https://localhost:7006';

export const API_ENDPOINTS = {
    // Insurance Company endpoints
    INSURANCE_COMPANY: {
        BASE: `${API_URL}/api/insurancecompany`,
        PAGED: `${API_URL}/api/insurancecompany/getpagedasync`,
        CONTRACTS: (id) => `${API_URL}/api/insurancecompany/contracts/${id}`,
        CONTRACT_PLANS: (contractId) => `${API_URL}/api/insurancecompany/contracts/${contractId}/plans`
    },  
    INSURANCE_PLAN:{
        BASE: `${API_URL}/api/InsurancePlan`,
        MapNPHIESCoverageBenefit: `${API_URL}/api/InsurancePlan/MapNPHIESCoverageBenefit`,
        BULK_INSERT: `${API_URL}/api/InsuranceSlab/BulkInsert`
    },
    // Insurance Contract endpoints

    INSURANCE_CONTRACT: {
        BASE: `${API_URL}/api/InsuranceContract`,
        BULK_INSERT: `${API_URL}/api/InsuranceSlab/BulkInsert`
    },

    
    // Insurance Policy endpoints
    INSURANCE_POLICY: {
        PAGED: `${API_URL}/api/InsurancePolicy/getpagedasync`
    },
    
    // Patient endpoints
    PATIENT: {
        PAGED: `${API_URL}/api/PatientPatientInformation/getpagedasync`
    },
    
    // Visit Management endpoints
    VISIT: {
        PAGED: `${API_URL}/api/visitmanagementvisit/getpagedasync`
    },
    
    // Facility Management endpoints
    FACILITY: {
        PAGED: `${API_URL}/api/buildingmanagementfacility/getpagedasync`
    },
    
    // Eligibility endpoints
    ELIGIBILITY: {
        VERIFY: `${API_URL}/api/Eligibility/VerifyCoverage/secondstep`
    },
    
    // Prior Auth endpoints
    PRIOR_AUTH: {
        SUBMIT: `${API_URL}/api/priorauth/submit`
    },
    
    // Service Type endpoints
    SERVICE_TYPE: {
        PAGED: `${API_URL}/api/listofvaluesservicetype/getpagedasync`
    },
    
    // Service Directory endpoints
    SERVICE_DIRECTORY: {
        PAGED: `${API_URL}/api/mpdirservicedirectory/getpagedasync`
    },
    
    // ICD-10 endpoints
    ICD10: {
        PAGED: `${API_URL}/api/listofvaluesicd10/getpagedasync`
    }
};

export default API_ENDPOINTS; 