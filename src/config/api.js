// const API_URL = process.env.API_URL || 'https://80.238.230.182:8081';
export const API_URL = `http://localhost:5263`;
export const FHIR_URL = `https://4f8d-80-238-230-182.ngrok-free.app/$process-message`;
const git="https://github.com/AhmedNassar147/exsys-web-naphies-server";
export const API_ENDPOINTS = {  
    // Insurance Company endpoints
    BASEURL: API_URL,
    INSURANCE_COMPANY: {
        BASE: `${API_URL}/api/insurancecompany`,
        PAGED: `${API_URL}/api/insurancecompany/getpagedasync`,
        CONTRACTS: (id) => `${API_URL}/api/insurancecompany/contracts/${id}`,
        CONTRACT_PLANS: (contractId) => `${API_URL}/api/insurancecompany/contracts/${contractId}/plans`
    },  
    INSURANCE_PLAN:{
        BASE: `${API_URL}/api/InsurancePlan`,
        MapNPHIESCoverageBenefit: `${API_URL}/api/InsurancePlan/MapNPHIESCoverageBenefit`,
        BULK_INSERT: `${API_URL}/api/InsuranceSlab/BulkInsert`,
        
    },
    FHIR:{
        SendMessage: `${API_URL}/api/fhir/send`
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
        PAGED: `${API_URL}/api/PatientPatientInformation/getpagedasync`,
        SEARCH: `${API_URL}/api/PatientPatientInformation/Search`,
        Eligblities :`${API_URL}/api/PatientCoverageEligiblityVerfication/patient`,
        Family :`${API_URL}/api/PatientPatientinformation/family`,
        LoadCoverage :`${API_URL}/api/InsuranceCoverage/patient/`,
        
    },
    
    // Visit Management endpoints
    VISIT: {
        PAGED: `${API_URL}/api/Visitmanagementvisit/getpagedasync`,
        DETAILS: `${API_URL}/api/Visitmanagementvisit/GetDetails`,
        EPISODE_OF_CARE: `${API_URL}/api/VisitmanagementEpisode`
    },
    
    // Facility Management endpoints
    FACILITY: {
        PAGED: `${API_URL}/api/buildingmanagementfacility/getpagedasync`
    },
    PREAUTHORIZATION: {
        PAGED: `${API_URL}/api/PreAuthorization/GetPagedAsync`
    },
    // Eligibility endpoints
    ELIGIBILITY: {
        VERIFY: `${API_URL}/api/Eligibility/VerifyCoverage/secondstep`
    },
    
    // Prior Auth endpoints
    PRIOR_AUTH: {
        SUBMIT: `${API_URL}/api/PriorAuth/Submit`,
        DENTAL_SUBMIT: `${API_URL}/api/priorauth/dental/submit`,
        PRE_AUTH_REQ:`${API_URL}/api/preauthorizationrequest/`               
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
    },
    DIAGNOSIS: {
        SEARCH_ICDS: `${API_URL}/api/Diagnosis/SearchICDs`,
        PAGED: `${API_URL}/api/Diagnosis/GetPagedAsync`
    },
    MEDICATION: {
        PAGED: `${API_URL}/api/IclinicsPlanofcarePrescriptiondetailsitem/GetPagedAsync`,
        SEARCH: `${API_URL}/api/Medication/Search`
    },
    CARE_TEAM: {
        PAGED: `${API_URL}/api/HrEmployee/GetPagedAsync`,
        SEARCH: `${API_URL}/api/HrEmployee/Search`
    },
    VITALS: {
        OUTPATIENT_BMI: `${API_URL}/api/IclinicsBmi/GetPagedAsync`,
        INPATIENT_BMI: `${API_URL}/api/IpdNursingBmi/GetPagedAsync`
    },
    MASTER_PRICE_SERVICE_DIRECTORY: {
        AUTOCOMPLETE_SERVICES: `${API_URL}/api/MasterPriceServiceDirectory/AutocompleteServices`,
        SEARCH_SERVICES: `${API_URL}/api/MasterPriceServiceDirectory/SearchServices`
    },
    MPDIR_SERVICE_PRICE: {
        PAGED: `${API_URL}/api/MpdirServiceprice/GetPagedAsync`
    },
    MPDIR_SERVICE_DIRECTORY_PRICELIST: {
        PAGED: `${API_URL}/api/MpdirServicedirectoryPricelist/GetPagedAsync`
    }
};

export default API_ENDPOINTS; 