import { v4 as uuidv4 } from 'uuid';

class CoverageEligibilityRequestMapper {
    static createRequest(params) {
        const bundleId = uuidv4();
        const messageHeaderId = uuidv4();

        // Create full URLs for resources
        const providerUrl = `http://provider.com/Organization/${params.provider.license}`;
        const insurerUrl = `http://provider.com/Organization/${params.insurer.license}`;
        const facilityUrl = `http://provider.com/Location/${params.facility.license}`;
        const patientUrl = `http://provider.com/Patient/${params.patient.id}`;
        const requestUrl = `http://provider.com/CoverageEligibilityRequest/${params.requestId}`;

        return {
            resourceType: "Bundle",
            id: bundleId,
            meta: {
                profile: [
                    "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/bundle|1.0.0"
                ]
            },
            type: "message",
            timestamp: new Date().toISOString(),
            entry: [
                // MessageHeader
                {
                    fullUrl: `urn:uuid:${messageHeaderId}`,
                    resource: {
                        resourceType: "MessageHeader",
                        id: messageHeaderId,
                        meta: {
                            profile: [
                                "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/message-header|1.0.0"
                            ]
                        },
                        eventCoding: {
                            system: "http://nphies.sa/terminology/CodeSystem/ksa-message-events",
                            code: "eligibility-request"
                        },
                        destination: [
                            {
                                endpoint: `http://nphies.sa/license/payer-license/${params.insurer.license}`,
                                receiver: {
                                    type: "Organization",
                                    identifier: {
                                        system: "http://nphies.sa/license/payer-license",
                                        value: params.insurer.license
                                    }
                                }
                            }
                        ],
                        sender: {
                            type: "Organization",
                            identifier: {
                                system: "http://nphies.sa/license/provider-license",
                                value: params.provider.license
                            }
                        },
                        source: {
                            endpoint: params.provider.endpoint
                        },
                        focus: [
                            {
                                reference: requestUrl
                            }
                        ]
                    }
                },
                // CoverageEligibilityRequest
                {
                    fullUrl: requestUrl,
                    resource: {
                        resourceType: "CoverageEligibilityRequest",
                        id: params.requestId,
                        meta: {
                            profile: [
                                "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/eligibility-request|1.0.0"
                            ]
                        },
                        identifier: [
                            {
                                system: "http://provider.com/identifier/coverageeligibilityrequest",
                                value: `req_${params.requestId}`
                            }
                        ],
                        status: "active",
                        priority: {
                            coding: [
                                {
                                    system: "http://terminology.hl7.org/CodeSystem/processpriority",
                                    code: "normal"
                                }
                            ]
                        },
                        purpose: [
                            "discovery"
                        ],
                        patient: {
                            reference: patientUrl
                        },
                        servicedPeriod: {
                            start: params.serviceDate.start.split('T')[0],
                            end: params.serviceDate.end.split('T')[0]
                        },
                        created: new Date().toISOString().split('T')[0],
                        provider: {
                            reference: providerUrl
                        },
                        insurer: {
                            reference: insurerUrl
                        },
                        facility: {
                            reference: facilityUrl
                        }
                    }
                },
                // Provider Organization
                {
                    fullUrl: providerUrl,
                    resource: {
                        resourceType: "Organization",
                        id: params.provider.license,
                        meta: {
                            profile: [
                                "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/provider-organization|1.0.0"
                            ]
                        },
                        extension: [
                            {
                                url: "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-provider-type",
                                valueCodeableConcept: {
                                    coding: [
                                        {
                                            system: "http://nphies.sa/terminology/CodeSystem/provider-type",
                                            code: "5",
                                            display: "Clinic"
                                        }
                                    ]
                                }
                            }
                        ],
                        identifier: [
                            {
                                system: "http://nphies.sa/license/provider-license",
                                value: params.provider.license
                            }
                        ],
                        active: true,
                        type: [
                            {
                                coding: [
                                    {
                                        system: "http://nphies.sa/terminology/CodeSystem/organization-type",
                                        code: "prov"
                                    }
                                ]
                            }
                        ],
                        name: params.provider.name
                    }
                },
                // Patient
                {
                    fullUrl: patientUrl,
                    resource: {
                        resourceType: "Patient",
                        id: params.patient.id,
                        meta: {
                            profile: [
                                "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/patient|1.0.0"
                            ]
                        },
                        extension: [
                            {
                                url: "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-occupation",
                                valueCodeableConcept: {
                                    coding: [
                                        {
                                            system: "http://nphies.sa/terminology/CodeSystem/occupation",
                                            code: "student"
                                        }
                                    ]
                                }
                            }
                        ],
                        identifier: [
                            {
                                type: {
                                    coding: [
                                        {
                                            system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                                            code: "PRC",
                                            display: "Permanent Resident Card Number"
                                        }
                                    ]
                                },
                                system: "http://nphies.sa/identifier/iqama",
                                value: params.patient.identifier
                            }
                        ],
                        active: true,
                        name: [
                            {
                                use: "official",
                                text: params.patient.fullName,
                                family: params.patient.familyName,
                                given: params.patient.givenNames
                            }
                        ],
                        telecom: [
                            {
                                system: "phone",
                                value: params.patient.phone
                            }
                        ],
                        gender: params.patient.gender,
                        _gender: {
                            extension: [
                                {
                                    url: "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-ksa-administrative-gender",
                                    valueCodeableConcept: {
                                        coding: [
                                            {
                                                system: "http://nphies.sa/terminology/CodeSystem/ksa-administrative-gender",
                                                code: params.patient.gender,
                                                display: params.patient.gender === "male" ? "Male" : "Female"
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        birthDate: params.patient.birthDate.split('T')[0],
                        maritalStatus: {
                            coding: [
                                {
                                    system: "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
                                    code: "U"
                                }
                            ]
                        }
                    }
                },
                // Insurer Organization
                {
                    fullUrl: insurerUrl,
                    resource: {
                        resourceType: "Organization",
                        id: params.insurer.license,
                        meta: {
                            profile: [
                                "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/insurer-organization|1.0.0"
                            ]
                        },
                        identifier: [
                            {
                                system: "http://nphies.sa/license/payer-license",
                                value: params.insurer.license
                            }
                        ],
                        active: true,
                        type: [
                            {
                                coding: [
                                    {
                                        system: "http://nphies.sa/terminology/CodeSystem/organization-type",
                                        code: "ins"
                                    }
                                ]
                            }
                        ],
                        name: params.insurer.name
                    }
                },
                // Facility Location
                {
                    fullUrl: facilityUrl,
                    resource: {
                        resourceType: "Location",
                        id: params.facility.license,
                        meta: {
                            profile: [
                                "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/location|1.0.0"
                            ]
                        },
                        identifier: [
                            {
                                system: "http://nphies.sa/license/location-license",
                                value: params.facility.license
                            }
                        ],
                        status: "active",
                        name: params.facility.name,
                        type: [
                            {
                                coding: [
                                    {
                                        system: "http://terminology.hl7.org/CodeSystem/v3-RoleCode",
                                        code: "GACH"
                                    }
                                ]
                            }
                        ],
                        managingOrganization: {
                            reference: providerUrl
                        }
                    }
                }
            ]
        };
    }
}

export default CoverageEligibilityRequestMapper; 