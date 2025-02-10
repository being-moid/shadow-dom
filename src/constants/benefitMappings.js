// NPHIES Benefit Categories
export const BENEFIT_CATEGORIES = {
  '1': { name: 'Medical Care', description: 'Medical Care.' },
  '2': { name: 'Surgical', description: 'Surgical.' },
  '3': { name: 'Consultation', description: 'Consultation.' },
  '4': { name: 'Diagnostic XRay', description: 'Diagnostic XRay.' },
  '5': { name: 'Diagnostic Lab', description: 'Diagnostic Lab.' },
  '6': { name: 'Renal Supplies', description: 'Renal Supplies excluding Dialysis.' },
  '7': { name: 'Diagnostic Dental', description: 'Diagnostic Dental.' },
  '8': { name: 'Periodontics', description: 'Periodontics.' },
  '9': { name: 'Restorative', description: 'Restorative.' },
  '10': { name: 'Endodontics', description: 'Endodontics.' },
  '11': { name: 'Maxillofacial Prosthetics', description: 'Maxillofacial Prosthetics.' },
  '12': { name: 'Adjunctive Dental Services', description: 'Adjunctive Dental Services.' },
  '13': { name: 'Health Benefit Plan Coverage', description: 'Health Benefit Plan Coverage.' },
  '14': { name: 'Dental Care', description: 'Dental Care.' },
  '15': { name: 'Dental Crowns', description: 'Dental Crowns.' },
  '16': { name: 'Dental Accident', description: 'Dental Accident.' },
  '17': { name: 'Hospital Room and Board', description: 'Hospital Room and Board.' },
  '18': { name: 'Major Medical', description: 'Major Medical.' },
  '19': { name: 'Medically Related Transportation', description: 'Medically Related Transportation.' },
  '20': { name: 'In-vitro Fertilization', description: 'In-vitro Fertilization.' },
  '21': { name: 'MRI Scan', description: 'MRI Scan.' },
  '22': { name: 'Donor Procedures', description: 'Donor Procedures such as organ harvest.' },
  '23': { name: 'Maternity', description: 'Maternity.' },
  '24': { name: 'Renal Dialysis', description: 'Renal dialysis.' },
  '25': { name: 'Medical Coverage', description: 'Medical Coverage.' },
  '26': { name: 'Dental Coverage', description: 'Dental Coverage.' },
  '27': { name: 'Hearing Coverage', description: 'Hearing Coverage.' },
  '28': { name: 'Vision Coverage', description: 'Vision Coverage.' },
  '29': { name: 'Mental Health', description: 'Mental Health' },
  '30': { name: 'OP Medical', description: 'OP Medical' },
  '31': { name: 'Max Copay', description: 'Max Copay' },
  '32': { name: 'Medical Equipment', description: 'Medical Equipment' },
  // ... rest of the categories
};

// Service Type to NPHIES Category Mapping
export const SERVICE_TYPE_TO_CATEGORY_MAPPING = {
  // Lab
  '1': ['5'], // Maps to Diagnostic Lab

  // Room & Board
  '3': ['17'], // Maps to Hospital Room and Board

  // CPT Services
  '6': ['1', '2', '18'], // Maps to Medical Care, Surgical, Major Medical

  // Pharmacy
  '7': ['56'], // Maps to Pharmacy

  // HCPCS
  '9': ['32'], // Maps to Medical Equipment

  // Radiology
  '13': ['4', '21'], // Maps to Diagnostic XRay, MRI Scan

  // Dental
  '14': ['7', '8', '9', '10', '11', '12', '14', '15', '16', '26'], // Maps to all dental categories

  // E & M Codes
  '15': ['1', '3', '30'], // Maps to Medical Care, Consultation, OP Medical

  // Endoscopy
  '16': ['2'], // Maps to Surgical

  // Orthodontic
  '19': ['37'], // Maps to Orthodontic Treatment

  // Maternity
  '20': ['23'], // Maps to Maternity

  // Surgical Packages
  '21': ['2', '18'] // Maps to Surgical, Major Medical
};

// Get category name from code
export const getCategoryName = (code) => {
  return BENEFIT_CATEGORIES[code]?.name || code;
};

// Get category description from code
export const getCategoryDescription = (code) => {
  return BENEFIT_CATEGORIES[code]?.description || '';
};

// Get suggested categories for a service type
export const getSuggestedCategories = (serviceTypeId) => {
  return SERVICE_TYPE_TO_CATEGORY_MAPPING[serviceTypeId] || [];
};

// Intelligent mapping function
export const getIntelligentMapping = (benefit, serviceTypeId) => {
  const suggestedCategories = getSuggestedCategories(serviceTypeId);
  
  // If benefit already has a category code that matches our suggestions, keep it
  if (benefit.categoryCode && suggestedCategories.includes(benefit.categoryCode)) {
    return true;
  }

  // Look for keyword matches in benefit name and description
  const benefitText = `${benefit.name} ${benefit.description}`.toLowerCase();
  
  for (const categoryCode of suggestedCategories) {
    const category = BENEFIT_CATEGORIES[categoryCode];
    if (category) {
      const categoryText = `${category.name} ${category.description}`.toLowerCase();
      if (benefitText.includes(categoryText) || categoryText.includes(benefitText)) {
        return true;
      }
    }
  }

  return false;
}; 