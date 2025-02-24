import fhirClient from './FhirClient.js';

class PriorAuthRequestMapper {
    static createRequest(formData) {
        const bundleId = crypto.randomUUID();
        const messageHeaderId = crypto.randomUUID();
        const claimId = crypto.randomUUID();
        const encounterId = crypto.randomUUID();
        const now = new Date().toISOString();

        // Base bundle structure
        const bundle = {
            resourceType: "Bundle",
            id: bundleId,
            meta: {
                "profile": [
                    "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/oral-priorauth|1.0.0"
                ]
            },
            type: "message",
            timestamp: now,
            entry: []
        };

        // Add MessageHeader with full URL reference
        bundle.entry.push(this.createMessageHeader(messageHeaderId, claimId, formData));
        
        // Add Claim with encounter extension
        bundle.entry.push(this.createClaim(claimId, formData, encounterId));
        
        // Add extended resources
        bundle.entry.push(...this.createPatientResources(formData));
        bundle.entry.push(this.createCoverageResource(formData));
        bundle.entry.push(...this.createPractitionerResources(formData));
        bundle.entry.push(this.createEncounterResource(encounterId, formData));
        bundle.entry.push(this.createProviderOrganization(formData));
        bundle.entry.push(this.createInsurerOrganization(formData));
        bundle.entry.push(this.createPolicyHolderOrganization(formData));

        return bundle;
    }

    static createMessageHeader(id, claimId, formData) {
        return {
            fullUrl: `urn:uuid:${id}`,
            resource: {
                resourceType: "MessageHeader",
                id,
                meta: {
                    profile: ["http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/message-header|1.0.0"]
                },
                eventCoding: {
                    system: "http://nphies.sa/terminology/CodeSystem/ksa-message-events",
                    code: "priorauth-request"
                },
                destination: [{
                    endpoint: "http://nphies.sa/license/payer-license/INS-FHIR",
                    receiver: {
                        type: "Organization",
                        identifier: {
                            system: "http://nphies.sa/license/payer-license",
                            value: "INS-FHIR"
                        }
                    }
                }],
                sender: {
                    type: "Organization",
                    identifier: {
                        system: "http://nphies.sa/license/provider-license",
                        value: formData.provider.licenseNumber
                    }
                },
                source: {
                    endpoint: formData.provider.endpoint
                },
                focus: [{
                    reference: `https://provider.com.sa/Claim/${claimId}`
                }]
            }
        };
    }

    static createClaim(id, formData, encounterId) {
        return {
            fullUrl: `https://provider.com.sa/Claim/${id}`,
            resource: {
                resourceType: "Claim",
                id,
                meta: {
                    profile: [
                        "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/oral-priorauth|1.0.0"
                    ]
                },
                extension: [{
                    url: "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-encounter",
                    valueReference: {
                        reference: `http://provider.com.sa/Encounter/${encounterId}`
                    }
                }],
                identifier: [{
                    system: "http://provider.com.sa/authorization",
                    value: `req_${id}`
                }],
                status: "active",
                type: {
                    coding: [{
                        system: "http://terminology.hl7.org/CodeSystem/claim-type",
                        code: "oral"
                    }]
                },
                subType: {
                    coding: [{
                        system: "http://nphies.sa/terminology/CodeSystem/claim-subtype",
                        code: "op"
                    }]
                },
                use: "preauthorization",
                patient: {
                    reference: `http://provider.com.sa/Patient/${formData.patient.id}`
                },
                created: new Date().toISOString(),
                insurer: {
                    reference: `http://provider.com.sa/Organization/${formData.insurer.id}`
                },
                provider: {
                    reference: `http://provider.com.sa/Organization/${formData.provider.id}`
                },
                priority: {
                    coding: [{
                        system: "http://terminology.hl7.org/CodeSystem/processpriority",
                        code: "normal"
                    }]
                },
                payee: {
                    type: {
                        coding: [{
                            system: "http://terminology.hl7.org/CodeSystem/payeetype",
                            code: "provider"
                        }]
                    }
                },
                careTeam: formData.careTeam.map((member, index) => ({
                    sequence: index + 1,
                    provider: {
                        reference: `http://provider.com.sa/Practitioner/${member.id}`
                    },
                    role: {
                        coding: [{
                            system: "http://terminology.hl7.org/CodeSystem/claimcareteamrole",
                            code: member.role
                        }]
                    },
                    qualification: {
                        coding: [{
                            system: "http://nphies.sa/terminology/CodeSystem/practice-codes",
                            code: member.qualificationCode
                        }]
                    }
                })),
                diagnosis: formData.diagnoses.map((d, i) => ({
                    sequence: i + 1,
                    diagnosisCodeableConcept: {
                        coding: [{
                            system: "http://hl7.org/fhir/sid/icd-10-am",
                            code: d.code,
                            display: d.description
                        }]
                    },
                    type: [{
                        coding: [{
                            system: "http://nphies.sa/terminology/CodeSystem/diagnosis-type",
                            code: "principal"
                        }]
                    }]
                })),
                insurance: [{
                    sequence: 1,
                    focal: true,
                    coverage: {
                        reference: `http://provider.com.sa/Coverage/${formData.coverage.id}`
                    }
                }],
                item: formData.items.map(item => ({
                    sequence: item.sequence,
                    careTeamSequence: Array.isArray(item.careTeamMembers) 
                        ? item.careTeamMembers.map(m => Number(m.sequence))
                        : [1],
                    diagnosisSequence: Array.isArray(item.diagnosisReferences)
                        ? item.diagnosisReferences.map(ref => Number(ref))
                        : [1],
                    extension: [
                        {
                            url: "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-patient-share",
                            valueMoney: {
                                value: item.patientShare,
                                currency: "SAR"
                            }
                        },
                        {
                            url: "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-package",
                            valueBoolean: item.isPackage || false
                        }
                    ],
                    productOrService: {
                        coding: [{
                            system: "http://nphies.sa/terminology/CodeSystem/oral-health-op",
                            code: item.serviceCode,
                            display: item.serviceName
                        }]
                    },
                    servicedDate: item.servicedDate || new Date().toISOString().split('T')[0],
                    quantity: {
                        value: item.quantity || 1
                    },
                    unitPrice: {
                        value: item.unitPrice,
                        currency: "SAR"
                    },
                    net: {
                        value: item.net.value,
                        currency: "SAR"
                    },
                    ...(item.bodySite ? {
                        bodySite: {
                            coding: [{
                                system: "http://nphies.sa/terminology/CodeSystem/fdi-oral-region",
                                code: item.bodySite.code,
                                display: item.bodySite.display
                            }]
                        }
                    } : {})
                })),
                supportingInfo: this.createSupportingInfo(formData.supportingInfo),
                total: {
                    value: formData.items.reduce((sum, item) => sum + item.net.value, 0),
                    currency: "SAR"
                }
            }
        };
    }

    static createPatientResources({ patient }) {
        return [{
            fullUrl: `https://provider.com.sa/Patient/${patient.id}`,
            resource: {
                resourceType: "Patient",
                id: patient.id,
                identifier: [{
                    type: {
                        coding: [{
                            system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                            code: "PRC",
                            display: "Permanent Resident Card Number"
                        }]
                    },
                    system: "http://nphies.sa/identifier/iqama",
                    value: patient.nationalId
                }],
                name: [{
                    family: patient.lastName,
                    given: [patient.firstName]
                }],
                gender: patient.gender,
                birthDate: patient.dob,
                telecom: [{
                    system: "phone",
                    value: patient.phone
                }],
                extension: [
                    {
                        url: "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-occupation",
                        valueCodeableConcept: {
                            coding: [{
                                system: "http://nphies.sa/terminology/CodeSystem/occupation",
                                code: patient.occupation
                            }]
                        }
                    },
                    {
                        url: "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-ksa-administrative-gender",
                        valueCodeableConcept: {
                            coding: [{
                                system: "http://nphies.sa/terminology/CodeSystem/ksa-administrative-gender",
                                code: patient.gender
                            }]
                        }
                    }
                ],
                maritalStatus: {
                    coding: [{
                        system: "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
                        code: patient.maritalStatus
                    }]
                },
                _gender: {
                    extension: [{
                        url: "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-ksa-administrative-gender",
                        valueCodeableConcept: {
                            coding: [{
                                system: "http://nphies.sa/terminology/CodeSystem/ksa-administrative-gender",
                                code: patient.gender
                            }]
                        }
                    }]
                }
            }
        }];
    }

    static createCoverageResource({ coverage }) {
        return {
            fullUrl: `https://provider.com.sa/Coverage/${coverage.id}`,
            resource: {
                resourceType: "Coverage",
                id: coverage.id,
                status: "active",
                type: {
                    coding: [{
                        system: "http://nphies.sa/terminology/CodeSystem/coverage-type",
                        code: "EHCPOL",
                        display: "extended healthcare"
                    }]
                },
                beneficiary: { reference: `https://provider.com.sa/Patient/${coverage.beneficiaryId}` },
                payor: [{ reference: `https://provider.com.sa/Organization/${coverage.payorId}` }],
                policyHolder: {
                    reference: `https://provider.com.sa/Organization/${coverage.policyHolderId}`
                },
                subscriber: {
                    reference: `https://provider.com.sa/Patient/${coverage.subscriberId}`
                },
                relationship: {
                    coding: [{
                        system: "http://terminology.hl7.org/CodeSystem/subscriber-relationship",
                        code: coverage.relationship,
                        display: this.relationshipDisplayMap[coverage.relationship]
                    }]
                },
                class: [{
                    type: {
                        coding: [{
                            system: "http://terminology.hl7.org/CodeSystem/coverage-class",
                            code: "plan"
                        }]
                    },
                    value: coverage.planNumber,
                    name: coverage.planName
                }],
                network: coverage.network
            }
        };
    }

    static createEncounterResource(id, { visit, patient }) {
        return {
            fullUrl: `https://provider.com.sa/Encounter/${id}`,
            resource: {
                resourceType: "Encounter",
                id,
                meta: {
                    profile: ["http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/encounter|1.0.0"]
                },
                status: "planned",
                class: {
                    system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                    code: "AMB",
                    display: "ambulatory"
                },
                serviceType: {
                    coding: [{
                        system: "http://nphies.sa/terminology/CodeSystem/service-type",
                        code: "dental-care"
                    }]
                },
                subject: { reference: `Patient/${patient.id}` },
                period: {
                    start: visit.startDate,
                    end: visit.endDate
                },
                serviceProvider: {
                    reference: `https://provider.com.sa/Organization/${formData.provider.id}`
                },
                extension: [{
                    url: "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-serviceEventType",
                    valueCodeableConcept: {
                        coding: [{
                            system: "http://nphies.sa/terminology/CodeSystem/service-event-type",
                            code: "ICSE"
                        }]
                    }
                }]
            }
        };
    }

    static createProviderOrganization(formData) {
        return {
            fullUrl: `https://provider.com.sa/Organization/${formData.provider.id}`,
            resource: {
                resourceType: "Organization",
                id: formData.provider.id,
                meta: {
                    profile: ["http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/provider-organization|1.0.0"]
                },
                identifier: [{
                    system: "http://nphies.sa/license/provider-license",
                    value: "PR-FHIR"
                }],
                type: [{
                    coding: [{
                        system: "http://nphies.sa/terminology/CodeSystem/organization-type",
                        code: "prov"
                    }]
                }],
                name: "Test Provider",
                extension: [{
                    url: "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-provider-type",
                    valueCodeableConcept: {
                        coding: [{
                            system: "http://nphies.sa/terminology/CodeSystem/provider-type",
                            code: "5",
                            display: "Clinic"
                        }]
                    }
                }]
            }
        };
    }

    static createInsurerOrganization(formData) {
        return {
            fullUrl: `https://provider.com.sa/Organization/${formData.insurer.id}`,
            resource: {
                resourceType: "Organization",
                id: formData.insurer.id,
                meta: {
                    profile: ["http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/insurer-organization|1.0.0"]
                },
                identifier: [{
                    system: "http://nphies.sa/license/payer-license",
                    value: "INS-FHIR"
                }],
                type: [{
                    coding: [{
                        system: "http://nphies.sa/terminology/CodeSystem/organization-type",
                        code: "ins"
                    }]
                }],
                name: "Test Payer"
            }
        };
    }

    static createPractitionerResources({ careTeam }) {
        return careTeam.map(member => ({
            fullUrl: `https://provider.com.sa/Practitioner/${member.id}`,
            resource: {
                resourceType: "Practitioner",
                id: member.id,
                identifier: [{
                    type: {
                        coding: [{
                            system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                            code: "MD"
                        }]
                    },
                    system: "http://nphies.sa/license/practitioner-license",
                    value: member.licenseNumber
                }],
                name: [{
                    text: member.name,
                    family: member.lastName,
                    given: [member.firstName, member.title]
                }]
            }
        }));
    }

    static createPolicyHolderOrganization(formData) {
        return {    
            fullUrl: `https://provider.com.sa/Organization/${formData.policyHolder.id}`,
            resource: {
                resourceType: "Organization",
                id: formData.policyHolder.id,
                meta: {
                    profile: ["http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/policyholder-organization|1.0.0"]
                },
                identifier: [{
                    system: "http://nphies.sa/identifier/organization",
                    value: `${formData.insurer.id}`
                }],
                active: true,
                name: "Policy Holder Organization"
            }
        };
    }

    static createSupportingInfo(supportingInfo) {
        return supportingInfo.map(info => ({
            sequence: info.sequence,
            category: {
                coding: [{
                    system: "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                    code: info.category
                }]
            },
            ...(info.code ? { code: { coding: [info.code] } } : {}),
            ...(info.valueString ? { valueString: info.valueString } : {})
        }));
    }

    static createStaticTestRequest() {
        const bundle = {
            resourceType: "Bundle",
            id: "c0fb859a-3e83-4e3b-9b85-ec2f64383093",
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
                    fullUrl: "urn:uuid:d2f4ecea-e519-4f65-b21b-979ff7c33093",
                    resource: {
                        resourceType: "MessageHeader",
                        id: "d2f4ecea-e519-4f65-b21b-979ff7c33093",
                        meta: {
                            profile: [
                                "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/message-header|1.0.0"
                            ]
                        },
                        eventCoding: {
                            system: "http://nphies.sa/terminology/CodeSystem/ksa-message-events",
                            code: "priorauth-request"
                        },
                        destination: [
                            {
                                endpoint: "http://nphies.sa/license/payer-license/INS-FHIR",
                                receiver: {
                                    type: "Organization",
                                    identifier: {
                                        system: "http://nphies.sa/license/payer-license",
                                        value: "INS-FHIR"
                                    }
                                }
                            }
                        ],
                        sender: {
                            type: "Organization",
                            identifier: {
                                system: "http://nphies.sa/license/provider-license",
                                value: "PR-FHIR"
                            }
                        },
                        source: {
                            endpoint: "http://provider.com.sa/PR-FHIR"
                        },
                        focus: [
                            {
                                reference: "http://provider.com.sa/Claim/293093"
                            }
                        ]
                    }
                },
                // Claim
                {
                    fullUrl: "http://provider.com.sa/Claim/293093",
                    resource: {
                        resourceType: "Claim",
                        id: "293093",
                        meta: {
                            profile: [
                                "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/oral-priorauth|1.0.0"
                            ]
                        },
                        extension: [
                            {
                                url: "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-encounter",
                                valueReference: {
                                    reference: "http://provider.com.sa/Encounter/1"
                                }
                            }
                        ],
                        identifier: [
                            {
                                system: "http://provider.com.sa/authorization",
                                value: "req_293093"
                            }
                        ],
                        status: "active",
                        type: {
                            coding: [
                                {
                                    system: "http://terminology.hl7.org/CodeSystem/claim-type",
                                    code: "oral"
                                }
                            ]
                        },
                        subType: {
                            coding: [
                                {
                                    system: "http://nphies.sa/terminology/CodeSystem/claim-subtype",
                                    code: "op"
                                }
                            ]
                        },
                        use: "preauthorization",
                        patient: {
                            reference: "http://provider.com.sa/Patient/3"
                        },
                        created: new Date().toISOString(),
                        insurer: {
                            reference: "http://provider.com.sa/Organization/bff3aa1fbd3648619ac082357bf135db"
                        },
                        provider: {
                            reference: "http://provider.com.sa/Organization/b1b3432921324f97af3be9fd0b1a14ae"
                        },
                        priority: {
                            coding: [
                                {
                                    system: "http://terminology.hl7.org/CodeSystem/processpriority",
                                    code: "normal"
                                }
                            ]
                        },
                        payee: {
                            type: {
                                coding: [
                                    {
                                        system: "http://terminology.hl7.org/CodeSystem/payeetype",
                                        code: "provider"
                                    }
                                ]
                            }
                        },
                        careTeam: [
                            {
                                sequence: 1,
                                provider: {
                                    reference: "http://provider.com.sa/Practitioner/7"
                                },
                                role: {
                                    coding: [
                                        {
                                            system: "http://terminology.hl7.org/CodeSystem/claimcareteamrole",
                                            code: "primary"
                                        }
                                    ]
                                },
                                qualification: {
                                    coding: [
                                        {
                                            system: "http://nphies.sa/terminology/CodeSystem/practice-codes",
                                            code: "22.00"
                                        }
                                    ]
                                }
                            }
                        ],
                        diagnosis: [
                            {
                                sequence: 1,
                                diagnosisCodeableConcept: {
                                    coding: [
                                        {
                                            system: "http://hl7.org/fhir/sid/icd-10-am",
                                            code: "K02.0"
                                        }
                                    ]
                                },
                                type: [
                                    {
                                        coding: [
                                            {
                                                system: "http://nphies.sa/terminology/CodeSystem/diagnosis-type",
                                                code: "principal"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        insurance: [
                            {
                                sequence: 1,
                                focal: true,
                                coverage: {
                                    reference: "http://provider.com.sa/Coverage/3"
                                }
                            }
                        ],
                        supportingInfo: [
                            {
                                sequence: 7,
                                category: {
                                    coding: [
                                        {
                                            system: "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                                            code: "chief-complaint"
                                        }
                                    ]
                                },
                                code: {
                                    coding: [
                                        {
                                            system: "http://hl7.org/fhir/sid/icd-10-am",
                                            code: "K02.0",
                                            display: "Caries limited to enamel"
                                        }
                                    ]
                                }
                            },
                            {
                                sequence: 12,
                                category: {
                                    coding: [
                                        {
                                            system: "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                                            code: "patient-history"
                                        }
                                    ]
                                },
                                valueString: "No systemic disease"
                            },
                            {
                                sequence: 13,
                                category: {
                                    coding: [
                                        {
                                            system: "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                                            code: "investigation-result"
                                        }
                                    ]
                                },
                                code: {
                                    coding: [
                                        {
                                            system: "http://nphies.sa/terminology/CodeSystem/investigation-result",
                                            code: "INP",
                                            display: "Investigation(s) not performed"
                                        }
                                    ]
                                }
                            },
                            {
                                sequence: 14,
                                category: {
                                    coding: [
                                        {
                                            system: "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                                            code: "treatment-plan"
                                        }
                                    ]
                                },
                                valueString: "Composite Restoration"
                            },
                            {
                                sequence: 15,
                                category: {
                                    coding: [
                                        {
                                            system: "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                                            code: "physical-examination"
                                        }
                                    ]
                                },
                                valueString: "Stable"
                            },
                            {
                                sequence: 16,
                                category: {
                                    coding: [
                                        {
                                            system: "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                                            code: "history-of-present-illness"
                                        }
                                    ]
                                },
                                valueString: "No history"
                            }
                        ],
                        item: [
                            {
                                sequence: 1,
                                careTeamSequence: [1],
                                diagnosisSequence: [1],
                                extension: [
                                    {
                                        url: "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-patient-share",
                                        valueMoney: {
                                            value: 40,
                                            currency: "SAR"
                                        }
                                    },
                                    {
                                        url: "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-package",
                                        valueBoolean: false
                                    }
                                ],
                                productOrService: {
                                    coding: [
                                        {
                                            system: "http://nphies.sa/terminology/CodeSystem/oral-health-op",
                                            code: "97011-00-00",
                                            display: "Comprehensive oral examination"
                                        }
                                    ]
                                },
                                servicedDate: "2023-12-04",
                                quantity: {
                                    value: 1
                                },
                                unitPrice: {
                                    value: 200,
                                    currency: "SAR"
                                },
                                net: {
                                    value: 200,
                                    currency: "SAR"
                                }
                            },
                            {
                                sequence: 2,
                                careTeamSequence: [1],
                                diagnosisSequence: [1],
                                extension: [
                                    {
                                        url: "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-patient-share",
                                        valueMoney: {
                                            value: 60,
                                            currency: "SAR"
                                        }
                                    },
                                    {
                                        url: "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-package",
                                        valueBoolean: false
                                    }
                                ],
                                productOrService: {
                                    coding: [
                                        {
                                            system: "http://nphies.sa/terminology/CodeSystem/oral-health-op",
                                            code: "97043-00-00",
                                            display: "Dental antibiotic sensitivity test"
                                        }
                                    ]
                                },
                                servicedDate: "2023-12-04",
                                quantity: {
                                    value: 1
                                },
                                unitPrice: {
                                    value: 300,
                                    currency: "SAR"
                                },
                                net: {
                                    value: 300,
                                    currency: "SAR"
                                },
                                bodySite: {
                                    coding: [
                                        {
                                            system: "http://nphies.sa/terminology/CodeSystem/fdi-oral-region",
                                            code: "13",
                                            display: "UPPER RIGHT; PERMANENT TEETH # 3"
                                        }
                                    ]
                                }
                            },
                            {
                                sequence: 3,
                                careTeamSequence: [1],
                                diagnosisSequence: [1],
                                extension: [
                                    {
                                        url: "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-patient-share",
                                        valueMoney: {
                                            value: 100,
                                            currency: "SAR"
                                        }
                                    },
                                    {
                                        url: "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-package",
                                        valueBoolean: false
                                    }
                                ],
                                productOrService: {
                                    coding: [
                                        {
                                            system: "http://nphies.sa/terminology/CodeSystem/oral-health-op",
                                            code: "97613-07-00",
                                            display: "Lithium disilicate ceramic crown (e max), indirect; per crown"
                                        }
                                    ]
                                },
                                servicedDate: "2023-12-04",
                                quantity: {
                                    value: 1
                                },
                                unitPrice: {
                                    value: 1300,
                                    currency: "SAR"
                                },
                                net: {
                                    value: 1300,
                                    currency: "SAR"
                                },
                                bodySite: {
                                    coding: [
                                        {
                                            system: "http://nphies.sa/terminology/CodeSystem/fdi-oral-region",
                                            code: "37",
                                            display: "LOWER LEFT; PERMANENT TEETH # 7"
                                        }
                                    ]
                                }
                            }
                        ],
                        total: {
                            value: 1800,
                            currency: "SAR"
                        }
                    }
                },
                // Encounter
                {
                    fullUrl: "http://provider.com.sa/Encounter/1",
                    resource: {
                        resourceType: "Encounter",
                        id: "1",
                        meta: {
                            profile: [
                                "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/encounter|1.0.0"
                            ]
                        },
                        extension: [
                            {
                                url: "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-serviceEventType",
                                valueCodeableConcept: {
                                    coding: [
                                        {
                                            system: "http://nphies.sa/terminology/CodeSystem/service-event-type",
                                            code: "ICSE"
                                        }
                                    ]
                                }
                            }
                        ],
                        identifier: [
                            {
                                system: "http://provider.com.sa/encounter",
                                value: "Encounter1"
                            }
                        ],
                        status: "planned",
                        class: {
                            system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                            code: "AMB",
                            display: "ambulatory"
                        },
                        serviceType: {
                            coding: [
                                {
                                    system: "http://nphies.sa/terminology/CodeSystem/service-type",
                                    code: "dental-care"
                                }
                            ]
                        },
                        subject: {
                            reference: "http://provider.com.sa/Patient/3"
                        },
                        period: {
                            start: "2023-12-04T11:38:00+03:00",
                            end: "2023-12-04T13:38:00+03:00"
                        },
                        serviceProvider: {
                            reference: "http://provider.com.sa/Organization/b1b3432921324f97af3be9fd0b1a14ae"
                        }
                    }
                },
                // Provider Organization
                {
                    fullUrl: "http://provider.com.sa/Organization/b1b3432921324f97af3be9fd0b1a14ae",
                    resource: {
                        resourceType: "Organization",
                        id: "b1b3432921324f97af3be9fd0b1a14ae",
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
                                value: "PR-FHIR"
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
                        name: "Test Provider"
                    }
                },
                // Patient
                {
                    fullUrl: "http://provider.com.sa/Patient/3",
                    resource: {
                        resourceType: "Patient",
                        id: "3",
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
                                            code: "housewife"
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
                                            code: "PRC"
                                        }
                                    ]
                                },
                                system: "http://nphies.sa/identifier/iqama",
                                value: "2000000003"
                            }
                        ],
                        active: true,
                        name: [
                            {
                                text: "Sara Khan",
                                family: "Khan",
                                given: [
                                    "Sara"
                                ]
                            }
                        ],
                        gender: "female",
                        _gender: {
                            extension: [
                                {
                                    url: "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-ksa-administrative-gender",
                                    valueCodeableConcept: {
                                        coding: [
                                            {
                                                system: "http://nphies.sa/terminology/CodeSystem/ksa-administrative-gender",
                                                code: "female"
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        birthDate: "1974-03-13",
                        maritalStatus: {
                            coding: [
                                {
                                    system: "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
                                    code: "M"
                                }
                            ]
                        }
                    }
                },
                // Subscriber Patient
                {
                    fullUrl: "http://provider.com.sa/Patient/123454186",
                    resource: {
                        resourceType: "Patient",
                        id: "123454186",
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
                                            code: "business"
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
                                value: "2000000001"
                            }
                        ],
                        active: true,
                        name: [
                            {
                                use: "official",
                                text: "Ahmad Khaled Abbas",
                                family: "Ahmad",
                                given: [
                                    "Khaled",
                                    "Abbas"
                                ]
                            }
                        ],
                        telecom: [
                            {
                                system: "phone",
                                value: "+966512345691"
                            }
                        ],
                        gender: "male",
                        _gender: {
                            extension: [
                                {
                                    url: "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-ksa-administrative-gender",
                                    valueCodeableConcept: {
                                        coding: [
                                            {
                                                system: "http://nphies.sa/terminology/CodeSystem/ksa-administrative-gender",
                                                code: "male",
                                                display: "Male"
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        birthDate: "1984-12-25",
                        maritalStatus: {
                            coding: [
                                {
                                    system: "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
                                    code: "M"
                                }
                            ]
                        }
                    }
                },
                // Insurer Organization
                {
                    fullUrl: "http://provider.com.sa/Organization/bff3aa1fbd3648619ac082357bf135db",
                    resource: {
                        resourceType: "Organization",
                        id: "bff3aa1fbd3648619ac082357bf135db",
                        meta: {
                            profile: [
                                "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/insurer-organization|1.0.0"
                            ]
                        },
                        identifier: [
                            {
                                system: "http://nphies.sa/license/payer-license",
                                value: "INS-FHIR"
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
                        name: "Test Payer"
                    }
                },
                // Coverage
                {
                    fullUrl: "http://provider.com.sa/Coverage/3",
                    resource: {
                        resourceType: "Coverage",
                        id: "3",
                        meta: {
                            profile: [
                                "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/coverage|1.0.0"
                            ]
                        },
                        identifier: [
                            {
                                system: "http://pseudo-payer.com.sa/memberid",
                                value: "0000000003"
                            }
                        ],
                        status: "active",
                        type: {
                            coding: [
                                {
                                    system: "http://nphies.sa/terminology/CodeSystem/coverage-type",
                                    code: "EHCPOL",
                                    display: "extended healthcare"
                                }
                            ]
                        },
                        policyHolder: {
                            reference: "http://provider.com.sa/Organization/13"
                        },
                        subscriber: {
                            reference: "http://provider.com.sa/Patient/123454186"
                        },
                        beneficiary: {
                            reference: "http://provider.com.sa/Patient/3"
                        },
                        relationship: {
                            coding: [
                                {
                                    system: "http://terminology.hl7.org/CodeSystem/subscriber-relationship",
                                    code: "spouse",
                                    display: "Spouse"
                                }
                            ]
                        },
                        payor: [
                            {
                                reference: "http://provider.com.sa/Organization/bff3aa1fbd3648619ac082357bf135db"
                            }
                        ],
                        class: [
                            {
                                type: {
                                    coding: [
                                        {
                                            system: "http://terminology.hl7.org/CodeSystem/coverage-class",
                                            code: "plan"
                                        }
                                    ]
                                },
                                value: "ABC123",
                                name: "Insurance Plan A"
                            }
                        ],
                        network: "Golden C"
                    }
                },
                // PolicyHolder Organization
                {
                    fullUrl: "http://provider.com.sa/Organization/13",
                    resource: {
                        resourceType: "Organization",
                        id: "13",
                        meta: {
                            profile: [
                                "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/policyholder-organization|1.0.0"
                            ]
                        },
                        identifier: [
                            {
                                system: "http://nphies.sa/identifier/organization",
                                value: "5009"
                            }
                        ],
                        active: true,
                        name: "Policy Holder Organization"
                    }
                },
                // Practitioner
                {
                    fullUrl: "http://provider.com.sa/Practitioner/7",
                    resource: {
                        resourceType: "Practitioner",
                        id: "7",
                        meta: {
                            profile: [
                                "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/practitioner|1.0.0"
                            ]
                        },
                        identifier: [
                            {
                                type: {
                                    coding: [
                                        {
                                            system: "http://terminology.hl7.org/CodeSystem/v2-0203",
                                            code: "MD"
                                        }
                                    ]
                                },
                                system: "http://nphies.sa/license/practitioner-license",
                                value: "N-P-00002"
                            }
                        ],
                        active: true,
                        name: [
                            {
                                use: "official",
                                text: "Dr. Yasser Mahfooz",
                                family: "Yasser",
                                given: [
                                    "Dr.",
                                    "Mahfooz"
                                ]
                            }
                        ]
                    }
                }
            ]
        };

        return bundle;
    }

    /**
     * Sends a static test request using the FhirClient
     * @returns {Promise<Object>} The response from the FHIR server
     */
    static async sendStaticTestRequest() {
        try {
            const bundle = this.createStaticTestRequest();
            console.log('Sending static test bundle:', bundle);
            
            const response = await fhirClient.processMessage(bundle);
            console.log('Static test response:', response);
            
            return response;
        } catch (error) {
            console.error('Error sending static test request:', error);
            throw error;
        }
    }
}

export default PriorAuthRequestMapper; 