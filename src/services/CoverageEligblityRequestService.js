export class CoverageEligibilityRequestMapper {
    static createRequest(params) {
        const bundleId = crypto.randomUUID();
        const timestamp = new Date().toISOString();
        
        return {
            "resourceType": "Bundle",
            "id": bundleId,
            "meta": {
                "profile": [
                    params.meta?.profile?.[0] || "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/bundle|1.0.0"
                ]
            },
            "type": "message",
            "timestamp": timestamp,
            "entry": [
                this.createMessageHeader(params),
                this.createCoverageEligibilityRequest(params),
                this.createProviderOrganization(params),
                this.createPatient(params),
                this.createInsurerOrganization(params),
                this.createLocation(params)
            ]
        };
    }

    static createMessageHeader(params) {
        return {
            "fullUrl": `urn:uuid:${params.messageHeaderId}`,
            "resource": {
                "resourceType": "MessageHeader",
                "id": params.messageHeaderId,
                "meta": {
                    "profile": [
                        params.meta?.profile?.[1] || "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/message-header|1.0.0"
                    ]
                },
                "eventCoding": params.meta?.eventCoding || {
                    "system": "http://nphies.sa/terminology/CodeSystem/ksa-message-events",
                    "code": "eligibility-request"
                },
                "destination": [
                    {
                        "endpoint": params.insurer?.endpoint || "http://nphies.sa/license/payer-license/INS-FHIR",
                        "receiver": {
                            "type": "Organization",
                            "identifier": {
                                "system": "http://nphies.sa/license/payer-license",
                                "value": params.insurer?.license
                            }
                        }
                    }
                ],
                "sender": {
                    "type": "Organization",
                    "identifier": {
                        "system": "http://nphies.sa/license/provider-license",
                        "value": params.provider?.license
                    }
                },
                "source": {
                    "endpoint": params.provider?.endpoint || "http://provider.com"
                },
                "focus": [
                    {
                        "reference": params.focusReference
                    }
                ]
            }
        };
    }

    static createCoverageEligibilityRequest(params) {
        return {
            "fullUrl": params.focusReference,
            "resource": {
                "resourceType": "CoverageEligibilityRequest",
                "id": params.requestId,
                "meta": {
                    "profile": [
                        params.meta?.profile?.[2] || "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/eligibility-request|1.0.0"
                    ]
                },
                "identifier": [
                    {
                        "system": "http://provider.com/identifier/coverageeligibilityrequest",
                        "value": `req_${params.requestId}`
                    }
                ],
                "status": "active",
                "priority": {
                    "coding": [
                        {
                            "system": "http://terminology.hl7.org/CodeSystem/processpriority",
                            "code": "normal"
                        }
                    ]
                },
                "purpose": [
                    "discovery"
                ],
                "patient": {
                    "reference": params.patient?.reference
                },
                "servicedPeriod": {
                    "start": params.serviceDate?.start,
                    "end": params.serviceDate?.end
                },
                "created": params.created || new Date().toISOString(),
                "provider": {
                    "reference": params.provider?.reference
                },
                "insurer": {
                    "reference": params.insurer?.reference
                },
                "facility": {
                    "reference": params.facility?.reference
                }
            }
        };
    }

    static createProviderOrganization(params) {
        return {
            "fullUrl": `http://provider.com/${params.provider?.reference}`,
            "resource": {
                "resourceType": "Organization",
                "id": params.provider?.id,
                "meta": {
                    "profile": [
                        "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/provider-organization|1.0.0"
                    ]
                },
                "extension": [
                    {
                        "url": "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-provider-type",
                        "valueCodeableConcept": {
                            "coding": [
                                {
                                    "system": "http://nphies.sa/terminology/CodeSystem/provider-type",
                                    "code": params.provider?.typeCode || "5",
                                    "display": params.provider?.typeDisplay || "Clinic"
                                }
                            ]
                        }
                    }
                ],
                "identifier": [
                    {
                        "system": "http://nphies.sa/license/provider-license",
                        "value": params.provider?.license
                    }
                ],
                "active": true,
                "type": [
                    {
                        "coding": [
                            {
                                "system": "http://nphies.sa/terminology/CodeSystem/organization-type",
                                "code": "prov"
                            }
                        ]
                    }
                ],
                "name": params.provider?.name
            }
        };
    }

    static createPatient(params) {
        return {
            "fullUrl": `http://provider.com/${params.patient?.reference}`,
            "resource": {
                "resourceType": "Patient",
                "id": params.patient?.id,
                "meta": {
                    "profile": [
                        "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/patient|1.0.0"
                    ]
                },
                "extension": [
                    {
                        "url": "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-occupation",
                        "valueCodeableConcept": {
                            "coding": [
                                {
                                    "system": "http://nphies.sa/terminology/CodeSystem/occupation",
                                    "code": params.patient?.occupation || "student"
                                }
                            ]
                        }
                    }
                ],
                "identifier": [
                    {
                        "type": {
                            "coding": [
                                {
                                    "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
                                    "code": "PRC",
                                    "display": "Permanent Resident Card Number"
                                }
                            ]
                        },
                        "system": "http://nphies.sa/identifier/iqama",
                        "value": params.patient?.identifier
                    }
                ],
                "active": true,
                "name": [
                    {
                        "use": "official",
                        "text": params.patient?.fullName,
                        "family": params.patient?.familyName,
                        "given": params.patient?.givenNames
                    }
                ],
                "telecom": [
                    {
                        "system": "phone",
                        "value": params.patient?.phone
                    }
                ],
                "gender": params.patient?.gender,
                "_gender": {
                    "extension": [
                        {
                            "url": "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-ksa-administrative-gender",
                            "valueCodeableConcept": {
                                "coding": [
                                    {
                                        "system": "http://nphies.sa/terminology/CodeSystem/ksa-administrative-gender",
                                        "code": params.patient?.gender,
                                        "display": params.patient?.gender === "male" ? "Male" : "Female"
                                    }
                                ]
                            }
                        }
                    ]
                },
                "birthDate": params.patient?.birthDate,
                "maritalStatus": {
                    "coding": [
                        {
                            "system": "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
                            "code": params.patient?.maritalStatus || "U"
                        }
                    ]
                }
            }
        };
    }

    static createInsurerOrganization(params) {
        return {
            "fullUrl": `http://provider.com/${params.insurer?.reference}`,
            "resource": {
                "resourceType": "Organization",
                "id": params.insurer?.id,
                "meta": {
                    "profile": [
                        "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/insurer-organization|1.0.0"
                    ]
                },
                "identifier": [
                    {
                        "system": "http://nphies.sa/license/payer-license",
                        "value": params.insurer?.license
                    }
                ],
                "active": true,
                "type": [
                    {
                        "coding": [
                            {
                                "system": "http://nphies.sa/terminology/CodeSystem/organization-type",
                                "code": "ins"
                            }
                        ]
                    }
                ],
                "name": params.insurer?.name
            }
        };
    }

    static createLocation(params) {
        return {
            "fullUrl": `http://provider.com/${params.facility?.reference}`,
            "resource": {
                "resourceType": "Location",
                "id": params.facility?.id,
                "meta": {
                    "profile": [
                        "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/location|1.0.0"
                    ]
                },
                "identifier": [
                    {
                        "system": "http://nphies.sa/license/location-license",
                        "value": params.facility?.license
                    }
                ],
                "status": "active",
                "name": params.facility?.name,
                "type": [
                    {
                        "coding": [
                            {
                                "system": "http://terminology.hl7.org/CodeSystem/v3-RoleCode",
                                "code": params.facility?.type || "GACH"
                            }
                        ]
                    }
                ],
                "managingOrganization": {
                    "reference": params.provider?.reference
                }
            }
        };
    }

    static mapRequestParams(formData) {
        return {
            messageHeaderId: formData.messageHeaderId,
            requestId: formData.requestId,
            focusReference: formData.focusReference,
            patient: formData.patient,
            provider: formData.provider,
            insurer: formData.insurer,
            facility: formData.facility,
            serviceDate: formData.serviceDate,
            created: new Date().toISOString(),
            meta: formData.meta
        };
    }
}

export const createCoverageEligibilityRequest = (formData) => {
    const mappedParams = CoverageEligibilityRequestMapper.mapRequestParams(formData);
    return CoverageEligibilityRequestMapper.createRequest(mappedParams);
};

export default CoverageEligibilityRequestMapper;