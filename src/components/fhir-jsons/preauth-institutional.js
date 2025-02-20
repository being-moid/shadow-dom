import { Claim } from "../Claim";

export const PREAUTH_INSTITUTIONAL_INPATIENT = {
 BUNDLE:
 {
	"resourceType": "Bundle",
	"id": `${Date.now()}`,
	"meta": {
		"profile": [
			"http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/bundle|1.0.0"
		]
	},
	"type": "message",
	"timestamp": "2023-12-04T07:40:00+03:00",
	"entry": [
		{
			"fullUrl": "urn:uuid:a7e4caf2-0441-40e5-97d2-5ae1802730ff",
			"resource": {
				"resourceType": "MessageHeader",
				"id": "a7e4caf2-0441-40e5-97d2-5ae1802730ff",
				"meta": {
					"profile": [
						"http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/message-header|1.0.0"
					]
				},
				"eventCoding": {
					"system": "http://nphies.sa/terminology/CodeSystem/ksa-message-events",
					"code": "priorauth-request"
				},
				"destination": [
					{
						"endpoint": "http://nphies.sa/license/payer-license/INS-FHIR",
						"receiver": {
							"type": "Organization",
							"identifier": {
								"system": "http://nphies.sa/license/payer-license",
								"value": "INS-FHIR"
							}
						}
					}
				],
				"sender": {
					"type": "Organization",
					"identifier": {
						"system": "http://nphies.sa/license/provider-license",
						"value": "PR-FHIR"
					}
				},
				"source": {
					"endpoint": "http://provider.com"
				},
				"focus": [
					{
						"reference": "http://provider.com/Claim/483070"
					}
				]
			}
		}

	]
},
CLAIM:		{
    "fullUrl": "http://provider.com/Claim/483070",
    "resource": {
        "resourceType": "Claim",
        "id": "483070",
        "meta": {
            "profile": [
                "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/institutional-priorauth|1.0.0"
            ]
        },
        "extension": [
            {
                "url": "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-eligibility-offline-reference",
                "valueString": "EligResp-31212432"
            },
            {
                "url": "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-eligibility-offline-date",
                "valueDateTime": "2023-12-04"
            },
            {
                "url": "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-encounter",
                "valueReference": {
                    "reference": "http://provider.com/Encounter/1"
                }
            }
        ],
        "identifier": [
            {
                "system": "http://provider.com/authorization",
                "value": "req_1188070"
            }
        ],
        "status": "active",
        "type": {
            "coding": [
                {
                    "system": "http://terminology.hl7.org/CodeSystem/claim-type",
                    "code": "institutional"
                }
            ]
        },
        "subType": {
            "coding": [
                {
                    "system": "http://nphies.sa/terminology/CodeSystem/claim-subtype",
                    "code": "ip"
                }
            ]
        },
        "use": "preauthorization",
        "patient": {
            "reference": "http://provider.com/Patient/173826788"
        },
        "created": "2023-12-04T07:40:00+03:00",
        "insurer": {
            "reference": "http://provider.com/Organization/bff3aa1fbd3648619ac082357bf135db"
        },
        "provider": {
            "reference": "http://provider.com/Organization/b1b3432921324f97af3be9fd0b1a14ae"
        },
        "priority": {
            "coding": [
                {
                    "system": "http://terminology.hl7.org/CodeSystem/processpriority",
                    "code": "normal"
                }
            ]
        },
        "payee": {
            "type": {
                "coding": [
                    {
                        "system": "http://terminology.hl7.org/CodeSystem/payeetype",
                        "code": "provider"
                    }
                ]
            }
        },
        "careTeam": [
            {
                "sequence": 1,
                "provider": {
                    "reference": "http://provider.com/Practitioner/7"
                },
                "role": {
                    "coding": [
                        {
                            "system": "http://terminology.hl7.org/CodeSystem/claimcareteamrole",
                            "code": "primary"
                        }
                    ]
                },
                "qualification": {
                    "coding": [
                        {
                            "system": "http://nphies.sa/terminology/CodeSystem/practice-codes",
                            "code": "08.11",
                            "display": "Oncology"
                        }
                    ]
                }
            }
        ],
        "supportingInfo": [
            {
                "sequence": 1,
                "category": {
                    "coding": [
                        {
                            "system": "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                            "code": "vital-sign-systolic"
                        }
                    ]
                },
                "valueQuantity": {
                    "value": 120,
                    "system": "http://unitsofmeasure.org",
                    "code": "mm[Hg]"
                }
            },
            {
                "sequence": 2,
                "category": {
                    "coding": [
                        {
                            "system": "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                            "code": "vital-sign-diastolic"
                        }
                    ]
                },
                "valueQuantity": {
                    "value": 80,
                    "system": "http://unitsofmeasure.org",
                    "code": "mm[Hg]"
                }
            },
            {
                "sequence": 3,
                "category": {
                    "coding": [
                        {
                            "system": "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                            "code": "vital-sign-height"
                        }
                    ]
                },
                "valueQuantity": {
                    "value": 160,
                    "system": "http://unitsofmeasure.org",
                    "code": "cm"
                }
            },
            {
                "sequence": 4,
                "category": {
                    "coding": [
                        {
                            "system": "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                            "code": "vital-sign-weight"
                        }
                    ]
                },
                "valueQuantity": {
                    "value": 129,
                    "system": "http://unitsofmeasure.org",
                    "code": "kg"
                }
            },
            {
                "sequence": 5,
                "category": {
                    "coding": [
                        {
                            "system": "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                            "code": "pulse"
                        }
                    ]
                },
                "valueQuantity": {
                    "value": 100,
                    "system": "http://unitsofmeasure.org",
                    "code": "/min"
                }
            },
            {
                "sequence": 6,
                "category": {
                    "coding": [
                        {
                            "system": "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                            "code": "temperature"
                        }
                    ]
                },
                "valueQuantity": {
                    "value": 37.5,
                    "system": "http://unitsofmeasure.org",
                    "code": "Cel"
                }
            },
            {
                "sequence": 7,
                "category": {
                    "coding": [
                        {
                            "system": "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                            "code": "chief-complaint"
                        }
                    ]
                },
                "code": {
                    "coding": [
                        {
                            "system": "http://hl7.org/fhir/sid/icd-10-am",
                            "code": "C25.4"
                        }
                    ]
                }
            },
            {
                "sequence": 8,
                "category": {
                    "coding": [
                        {
                            "system": "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                            "code": "oxygen-saturation"
                        }
                    ]
                },
                "valueQuantity": {
                    "value": 100,
                    "system": "http://unitsofmeasure.org",
                    "code": "%"
                }
            },
            {
                "sequence": 9,
                "category": {
                    "coding": [
                        {
                            "system": "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                            "code": "respiratory-rate"
                        }
                    ]
                },
                "valueQuantity": {
                    "value": 70,
                    "system": "http://unitsofmeasure.org",
                    "code": "/min"
                }
            },
            {
                "sequence": 11,
                "category": {
                    "coding": [
                        {
                            "system": "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                            "code": "estimated-Length-of-Stay"
                        }
                    ]
                },
                "valueQuantity": {
                    "value": 14,
                    "system": "http://unitsofmeasure.org",
                    "code": "d"
                }
            },
            {
                "sequence": 12,
                "category": {
                    "coding": [
                        {
                            "system": "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                            "code": "patient-history"
                        }
                    ]
                },
                "valueString": "pancreatic cancer stage 1"
            },
            {
                "sequence": 13,
                "category": {
                    "coding": [
                        {
                            "system": "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                            "code": "investigation-result"
                        }
                    ]
                },
                "code": {
                    "coding": [
                        {
                            "system": "http://nphies.sa/terminology/CodeSystem/investigation-result",
                            "code": "INP"
                        }
                    ]
                }
            },
            {
                "sequence": 14,
                "category": {
                    "coding": [
                        {
                            "system": "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                            "code": "treatment-plan"
                        }
                    ]
                },
                "valueString": "Surgical excision of lesion of pancreas"
            },
            {
                "sequence": 15,
                "category": {
                    "coding": [
                        {
                            "system": "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                            "code": "physical-examination"
                        }
                    ]
                },
                "valueString": "Stable"
            },
            {
                "sequence": 16,
                "category": {
                    "coding": [
                        {
                            "system": "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                            "code": "history-of-present-illness"
                        }
                    ]
                },
                "valueString": "adenocarcinoma of pancreas diagnosed one year ago"
            },
            {
                "sequence": 17,
                "category": {
                    "coding": [
                        {
                            "system": "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                            "code": "morphology"
                        }
                    ]
                },
                "code": {
                    "coding": [
                        {
                            "system": "http://nphies.sa/terminology/CodeSystem/morphology-code",
                            "code": "M8002/3",
                            "display": "Malignant tumour, small cell type"
                        }
                    ]
                }
            }
        ],
        "diagnosis": [
            {
                "sequence": 1,
                "onAdmission": {
                    "coding": [
                        {
                            "system": "http://nphies.sa/terminology/CodeSystem/diagnosis-on-admission",
                            "code": "y"
                        }
                    ]
                },
                "diagnosisCodeableConcept": {
                    "coding": [
                        {
                            "system": "http://hl7.org/fhir/sid/icd-10-am",
                            "code": "C25.4",
                            "display": "Malignant neoplasm of endocrine pancreas"
                        }
                    ]
                },
                "type": [
                    {
                        "coding": [
                            {
                                "system": "http://nphies.sa/terminology/CodeSystem/diagnosis-type",
                                "code": "principal"
                            }
                        ]
                    }
                ]
            }
        ],
        "insurance": [
            {
                "sequence": 1,
                "focal": true,
                "coverage": {
                    "reference": "http://provider.com/Coverage/1333"
                }
            }
        ],
        "item": [
            {
                "extension": [
                    {
                        "url": "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-maternity",
                        "valueBoolean": false
                    },
                    {
                        "url": "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-patient-share",
                        "valueMoney": {
                            "value": 0,
                            "currency": "SAR"
                        }
                    },
                    {
                        "url": "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-package",
                        "valueBoolean": true
                    }
                ],
                "sequence": 2,
                "careTeamSequence": [
                    1
                ],
                "diagnosisSequence": [
                    1
                ],
                "informationSequence": [
                    1,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    9,
                    11,
                    12,
                    13,
                    14,
                    15,
                    16
                ],
                "productOrService": {
                    "coding": [
                        {
                            "system": "http://nphies.sa/terminology/CodeSystem/procedures",
                            "code": "30578-00-00",
                            "display": "Excision of lesion of pancreas or pancreatic duct"
                        }
                    ]
                },
                "servicedDate": "2023-12-15",
                "quantity": {
                    "value": 1
                },
                "unitPrice": {
                    "value": 5000,
                    "currency": "SAR"
                },
                "net": {
                    "value": 5000,
                    "currency": "SAR"
                }
            }
        ],
        "total": {
            "value": 5000,
            "currency": "SAR"
        }
    }
},
ENCOUNTER:
{
    "fullUrl": "http://provider.com/Encounter/1",
    "resource": {
        "resourceType": "Encounter",
        "id": "1",
        "meta": {
            "profile": [
                "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/encounter|1.0.0"
            ]
        },
        "identifier": [
            {
                "system": "http://provider.com/encounter",
                "value": "Encounter1"
            }
        ],
        "status": "planned",
        "class": {
            "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
            "code": "IMP",
            "display": "inpatient encounter"
        },
        "serviceType": {
            "coding": [
                {
                    "system": "http://nphies.sa/terminology/CodeSystem/service-type",
                    "code": "sub-acute-care"
                }
            ]
        },
        "subject": {
            "reference": "http://provider.com/Patient/173826788"
        },
        "period": {
            "start": "2023-12-15T09:25:00+03:00"
        },
        "hospitalization": {
            "extension": [
                {
                    "url": "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-admissionSpecialty",
                    "valueCodeableConcept": {
                        "coding": [
                            {
                                "system": "http://nphies.sa/terminology/CodeSystem/practice-codes",
                                "code": "19.08",
                                "display": "General Surgery"
                            }
                        ]
                    }
                }
            ],
            "origin": {
                "reference": "http://provider.com/Organization/070bdd8e753a4cf9b2e64db808dfd9dc"
            },
            "admitSource": {
                "coding": [
                    {
                        "system": "http://nphies.sa/terminology/CodeSystem/admit-source",
                        "code": "WKIN",
                        "display": "Walk-in"
                    }
                ]
            }
        },
        "serviceProvider": {
            "reference": "http://provider.com/Organization/b1b3432921324f97af3be9fd0b1a14ae"
        }
    }
},
PROVIDER:{
    "fullUrl": "http://provider.com/Organization/b1b3432921324f97af3be9fd0b1a14ae",
    "resource": {
        "resourceType": "Organization",
        "id": "b1b3432921324f97af3be9fd0b1a14ae",
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
                            "code": "1",
                            "display": "Hospital"
                        }
                    ]
                }
            }
        ],
        "identifier": [
            {
                "system": "http://nphies.sa/license/provider-license",
                "value": "PR-FHIR"
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
        ]
    }
},
PATIENT:{
    "fullUrl": "http://provider.com/Patient/173826788",
    "resource": {
        "resourceType": "Patient",
        "id": "173826788",
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
                            "code": "student"
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
                "value": "2000000002"
            }
        ],
        "active": true,
        "name": [
            {
                "use": "official",
                "text": "Muhammad Ali Abbas",
                "family": "Abbas",
                "given": [
                    "Muhammad",
                    "Ali"
                ]
            }
        ],
        "telecom": [
            {
                "system": "phone",
                "value": "+966517382691"
            }
        ],
        "gender": "male",
        "_gender": {
            "extension": [
                {
                    "url": "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-ksa-administrative-gender",
                    "valueCodeableConcept": {
                        "coding": [
                            {
                                "system": "http://nphies.sa/terminology/CodeSystem/ksa-administrative-gender",
                                "code": "male",
                                "display": "Male"
                            }
                        ]
                    }
                }
            ]
        },
        "birthDate": "2010-08-21",
        "maritalStatus": {
            "coding": [
                {
                    "system": "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
                    "code": "U"
                }
            ]
        }
    }
},
INSURER:{
    "fullUrl": "http://provider.com/Organization/bff3aa1fbd3648619ac082357bf135db",
    "resource": {
        "resourceType": "Organization",
        "id": "bff3aa1fbd3648619ac082357bf135db",
        "meta": {
            "profile": [
                "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/insurer-organization|1.0.0"
            ]
        },
        "identifier": [
            {
                "system": "http://nphies.sa/license/payer-license",
                "value": "INS-FHIR"
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
        "name": "Test Payer"
    }
},
POLICYHOLDER:{
    "fullUrl": "http://provider.com/Organization/13",
    "resource": {
        "resourceType": "Organization",
        "id": "13",
        "meta": {
            "profile": [
                "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/policyholder-organization|1.0.0"
            ]
        },
        "identifier": [
            {
                "system": "http://nphies.sa/identifier/organization",
                "value": "5009"
            }
        ],
        "active": true,
        "name": "Policy Holder Organization"
    }
},
COVERAGE:{
    "fullUrl": "http://provider.com/Coverage/1333",
    "resource": {
        "resourceType": "Coverage",
        "id": "1333",
        "meta": {
            "profile": [
                "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/coverage|1.0.0"
            ]
        },
        "identifier": [
            {
                "system": "http://pseudo-payer.com.sa/memberid",
                "value": "0000000002"
            }
        ],
        "status": "active",
        "type": {
            "coding": [
                {
                    "system": "http://nphies.sa/terminology/CodeSystem/coverage-type",
                    "code": "EHCPOL",
                    "display": "extended healthcare"
                }
            ]
        },
        "policyHolder": {
            "reference": "http://provider.com/Organization/13"
        },
        "subscriber": {
            "reference": "http://provider.com/Patient/3662364643"
        },
        "beneficiary": {
            "reference": "http://provider.com/Patient/173826788"
        },
        "relationship": {
            "coding": [
                {
                    "system": "http://terminology.hl7.org/CodeSystem/subscriber-relationship",
                    "code": "child",
                    "display": "Child"
                }
            ]
        },
        "payor": [
            {
                "reference": "http://provider.com/Organization/bff3aa1fbd3648619ac082357bf135db"
            }
        ],
        "class": [
            {
                "type": {
                    "coding": [
                        {
                            "system": "http://terminology.hl7.org/CodeSystem/coverage-class",
                            "code": "plan"
                        }
                    ]
                },
                "value": "CB135",
                "name": "Insurance Plan A"
            }
        ],
        "network": "Golden C"
    }
},
PRACTITIONER:{
    "fullUrl": "http://provider.com/Practitioner/7",
    "resource": {
        "resourceType": "Practitioner",
        "id": "7",
        "meta": {
            "profile": [
                "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/practitioner|1.0.0"
            ]
        },
        "identifier": [
            {
                "type": {
                    "coding": [
                        {
                            "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
                            "code": "MD"
                        }
                    ]
                },
                "system": "http://nphies.sa/license/practitioner-license",
                "value": "N-P-00001"
            }
        ],
        "active": true,
        "name": [
            {
                "use": "official",
                "text": "Dr. Ameera Hassan",
                "family": "Hassan",
                "given": [
                    "Ameera"
                ]
            }
        ]
    }
},
PATIENT:{
    "fullUrl": "http://provider.com/Patient/3662364643",
    "resource": {
        "resourceType": "Patient",
        "id": "3662364643",
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
                            "code": "business"
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
                "value": "2000000001"
            }
        ],
        "active": true,
        "name": [
            {
                "use": "official",
                "text": "Ahmad Khaled Abbas",
                "family": "Abbas",
                "given": [
                    "Ahmad",
                    "Khaled"
                ]
            }
        ],
        "telecom": [
            {
                "system": "phone",
                "value": "+966517382643"
            }
        ],
        "gender": "male",
        "_gender": {
            "extension": [
                {
                    "url": "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-ksa-administrative-gender",
                    "valueCodeableConcept": {
                        "coding": [
                            {
                                "system": "http://nphies.sa/terminology/CodeSystem/ksa-administrative-gender",
                                "code": "male",
                                "display": "Male"
                            }
                        ]
                    }
                }
            ]
        },
        "birthDate": "1984-12-25",
        "maritalStatus": {
            "coding": [
                {
                    "system": "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
                    "code": "M"
                }
            ]
        }
    }
},
PROVIDER:{
    "fullUrl": "http://provider.com/Organization/070bdd8e753a4cf9b2e64db808dfd9dc",
    "resource": {
        "resourceType": "Organization",
        "id": "070bdd8e753a4cf9b2e64db808dfd9dc",
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
                            "code": "1",
                            "display": "Hospital"
                        }
                    ]
                }
            }
        ],
        "identifier": [
            {
                "system": "http://nphies.sa/license/provider-license",
                "value": "PR-FHIR"
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
        "name": "Test Provider"
    }
}


};

export const PREAUTH_INSTITUTIONAL = 
    {
        "resourceType": "Bundle",
        "id": "9e4dbafa-1263-407d-ba38-f8879b0b30ff",
        "meta": {
            "profile": [
                "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/bundle|1.0.0"
            ]
        },
        "type": "message",
        "timestamp": "2023-12-04T07:40:00+03:00",
        "entry": [
            {
                "fullUrl": "urn:uuid:a7e4caf2-0441-40e5-97d2-5ae1802730ff",
                "resource": {
                    "resourceType": "MessageHeader",
                    "id": "a7e4caf2-0441-40e5-97d2-5ae1802730ff",
                    "meta": {
                        "profile": [
                            "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/message-header|1.0.0"
                        ]
                    },
                    "eventCoding": {
                        "system": "http://nphies.sa/terminology/CodeSystem/ksa-message-events",
                        "code": "priorauth-request"
                    },
                    "destination": [
                        {
                            "endpoint": "http://nphies.sa/license/payer-license/INS-FHIR",
                            "receiver": {
                                "type": "Organization",
                                "identifier": {
                                    "system": "http://nphies.sa/license/payer-license",
                                    "value": "INS-FHIR"
                                }
                            }
                        }
                    ],
                    "sender": {
                        "type": "Organization",
                        "identifier": {
                            "system": "http://nphies.sa/license/provider-license",
                            "value": "PR-FHIR"
                        }
                    },
                    "source": {
                        "endpoint": "http://provider.com"
                    },
                    "focus": [
                        {
                            "reference": "http://provider.com/Claim/483070"
                        }
                    ]
                }
            },
            {
                "fullUrl": "http://provider.com/Claim/483070",
                "resource": {
                    "resourceType": "Claim",
                    "id": "483070",
                    "meta": {
                        "profile": [
                            "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/institutional-priorauth|1.0.0"
                        ]
                    },
                    "extension": [
                        {
                            "url": "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-eligibility-offline-reference",
                            "valueString": "EligResp-31212432"
                        },
                        {
                            "url": "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-eligibility-offline-date",
                            "valueDateTime": "2023-12-04"
                        },
                        {
                            "url": "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-encounter",
                            "valueReference": {
                                "reference": "http://provider.com/Encounter/1"
                            }
                        }
                    ],
                    "identifier": [
                        {
                            "system": "http://provider.com/authorization",
                            "value": "req_1188070"
                        }
                    ],
                    "status": "active",
                    "type": {
                        "coding": [
                            {
                                "system": "http://terminology.hl7.org/CodeSystem/claim-type",
                                "code": "institutional"
                            }
                        ]
                    },
                    "subType": {
                        "coding": [
                            {
                                "system": "http://nphies.sa/terminology/CodeSystem/claim-subtype",
                                "code": "ip"
                            }
                        ]
                    },
                    "use": "preauthorization",
                    "patient": {
                        "reference": "http://provider.com/Patient/173826788"
                    },
                    "created": "2023-12-04T07:40:00+03:00",
                    "insurer": {
                        "reference": "http://provider.com/Organization/bff3aa1fbd3648619ac082357bf135db"
                    },
                    "provider": {
                        "reference": "http://provider.com/Organization/b1b3432921324f97af3be9fd0b1a14ae"
                    },
                    "priority": {
                        "coding": [
                            {
                                "system": "http://terminology.hl7.org/CodeSystem/processpriority",
                                "code": "normal"
                            }
                        ]
                    },
                    "payee": {
                        "type": {
                            "coding": [
                                {
                                    "system": "http://terminology.hl7.org/CodeSystem/payeetype",
                                    "code": "provider"
                                }
                            ]
                        }
                    },
                    "careTeam": [
                        {
                            "sequence": 1,
                            "provider": {
                                "reference": "http://provider.com/Practitioner/7"
                            },
                            "role": {
                                "coding": [
                                    {
                                        "system": "http://terminology.hl7.org/CodeSystem/claimcareteamrole",
                                        "code": "primary"
                                    }
                                ]
                            },
                            "qualification": {
                                "coding": [
                                    {
                                        "system": "http://nphies.sa/terminology/CodeSystem/practice-codes",
                                        "code": "08.11",
                                        "display": "Oncology"
                                    }
                                ]
                            }
                        }
                    ],
                    "supportingInfo": [
                        {
                            "sequence": 1,
                            "category": {
                                "coding": [
                                    {
                                        "system": "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                                        "code": "vital-sign-systolic"
                                    }
                                ]
                            },
                            "valueQuantity": {
                                "value": 120,
                                "system": "http://unitsofmeasure.org",
                                "code": "mm[Hg]"
                            }
                        },
                        {
                            "sequence": 2,
                            "category": {
                                "coding": [
                                    {
                                        "system": "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                                        "code": "vital-sign-diastolic"
                                    }
                                ]
                            },
                            "valueQuantity": {
                                "value": 80,
                                "system": "http://unitsofmeasure.org",
                                "code": "mm[Hg]"
                            }
                        },
                        {
                            "sequence": 3,
                            "category": {
                                "coding": [
                                    {
                                        "system": "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                                        "code": "vital-sign-height"
                                    }
                                ]
                            },
                            "valueQuantity": {
                                "value": 160,
                                "system": "http://unitsofmeasure.org",
                                "code": "cm"
                            }
                        },
                        {
                            "sequence": 4,
                            "category": {
                                "coding": [
                                    {
                                        "system": "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                                        "code": "vital-sign-weight"
                                    }
                                ]
                            },
                            "valueQuantity": {
                                "value": 129,
                                "system": "http://unitsofmeasure.org",
                                "code": "kg"
                            }
                        },
                        {
                            "sequence": 5,
                            "category": {
                                "coding": [
                                    {
                                        "system": "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                                        "code": "pulse"
                                    }
                                ]
                            },
                            "valueQuantity": {
                                "value": 100,
                                "system": "http://unitsofmeasure.org",
                                "code": "/min"
                            }
                        },
                        {
                            "sequence": 6,
                            "category": {
                                "coding": [
                                    {
                                        "system": "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                                        "code": "temperature"
                                    }
                                ]
                            },
                            "valueQuantity": {
                                "value": 37.5,
                                "system": "http://unitsofmeasure.org",
                                "code": "Cel"
                            }
                        },
                        {
                            "sequence": 7,
                            "category": {
                                "coding": [
                                    {
                                        "system": "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                                        "code": "chief-complaint"
                                    }
                                ]
                            },
                            "code": {
                                "coding": [
                                    {
                                        "system": "http://hl7.org/fhir/sid/icd-10-am",
                                        "code": "C25.4"
                                    }
                                ]
                            }
                        },
                        {
                            "sequence": 8,
                            "category": {
                                "coding": [
                                    {
                                        "system": "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                                        "code": "oxygen-saturation"
                                    }
                                ]
                            },
                            "valueQuantity": {
                                "value": 100,
                                "system": "http://unitsofmeasure.org",
                                "code": "%"
                            }
                        },
                        {
                            "sequence": 9,
                            "category": {
                                "coding": [
                                    {
                                        "system": "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                                        "code": "respiratory-rate"
                                    }
                                ]
                            },
                            "valueQuantity": {
                                "value": 70,
                                "system": "http://unitsofmeasure.org",
                                "code": "/min"
                            }
                        },
                        {
                            "sequence": 11,
                            "category": {
                                "coding": [
                                    {
                                        "system": "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                                        "code": "estimated-Length-of-Stay"
                                    }
                                ]
                            },
                            "valueQuantity": {
                                "value": 14,
                                "system": "http://unitsofmeasure.org",
                                "code": "d"
                            }
                        },
                        {
                            "sequence": 12,
                            "category": {
                                "coding": [
                                    {
                                        "system": "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                                        "code": "patient-history"
                                    }
                                ]
                            },
                            "valueString": "pancreatic cancer stage 1"
                        },
                        {
                            "sequence": 13,
                            "category": {
                                "coding": [
                                    {
                                        "system": "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                                        "code": "investigation-result"
                                    }
                                ]
                            },
                            "code": {
                                "coding": [
                                    {
                                        "system": "http://nphies.sa/terminology/CodeSystem/investigation-result",
                                        "code": "INP"
                                    }
                                ]
                            }
                        },
                        {
                            "sequence": 14,
                            "category": {
                                "coding": [
                                    {
                                        "system": "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                                        "code": "treatment-plan"
                                    }
                                ]
                            },
                            "valueString": "Surgical excision of lesion of pancreas"
                        },
                        {
                            "sequence": 15,
                            "category": {
                                "coding": [
                                    {
                                        "system": "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                                        "code": "physical-examination"
                                    }
                                ]
                            },
                            "valueString": "Stable"
                        },
                        {
                            "sequence": 16,
                            "category": {
                                "coding": [
                                    {
                                        "system": "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                                        "code": "history-of-present-illness"
                                    }
                                ]
                            },
                            "valueString": "adenocarcinoma of pancreas diagnosed one year ago"
                        },
                        {
                            "sequence": 17,
                            "category": {
                                "coding": [
                                    {
                                        "system": "http://nphies.sa/terminology/CodeSystem/claim-information-category",
                                        "code": "morphology"
                                    }
                                ]
                            },
                            "code": {
                                "coding": [
                                    {
                                        "system": "http://nphies.sa/terminology/CodeSystem/morphology-code",
                                        "code": "M8002/3",
                                        "display": "Malignant tumour, small cell type"
                                    }
                                ]
                            }
                        }
                    ],
                    "diagnosis": [
                        {
                            "sequence": 1,
                            "onAdmission": {
                                "coding": [
                                    {
                                        "system": "http://nphies.sa/terminology/CodeSystem/diagnosis-on-admission",
                                        "code": "y"
                                    }
                                ]
                            },
                            "diagnosisCodeableConcept": {
                                "coding": [
                                    {
                                        "system": "http://hl7.org/fhir/sid/icd-10-am",
                                        "code": "C25.4",
                                        "display": "Malignant neoplasm of endocrine pancreas"
                                    }
                                ]
                            },
                            "type": [
                                {
                                    "coding": [
                                        {
                                            "system": "http://nphies.sa/terminology/CodeSystem/diagnosis-type",
                                            "code": "principal"
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    "insurance": [
                        {
                            "sequence": 1,
                            "focal": true,
                            "coverage": {
                                "reference": "http://provider.com/Coverage/1333"
                            }
                        }
                    ],
                    "item": [
                        {
                            "extension": [
                                {
                                    "url": "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-maternity",
                                    "valueBoolean": false
                                },
                                {
                                    "url": "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-patient-share",
                                    "valueMoney": {
                                        "value": 0,
                                        "currency": "SAR"
                                    }
                                },
                                {
                                    "url": "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-package",
                                    "valueBoolean": true
                                }
                            ],
                            "sequence": 2,
                            "careTeamSequence": [
                                1
                            ],
                            "diagnosisSequence": [
                                1
                            ],
                            "informationSequence": [
                                1,
                                2,
                                3,
                                4,
                                5,
                                6,
                                7,
                                8,
                                9,
                                11,
                                12,
                                13,
                                14,
                                15,
                                16
                            ],
                            "productOrService": {
                                "coding": [
                                    {
                                        "system": "http://nphies.sa/terminology/CodeSystem/procedures",
                                        "code": "30578-00-00",
                                        "display": "Excision of lesion of pancreas or pancreatic duct"
                                    }
                                ]
                            },
                            "servicedDate": "2023-12-15",
                            "quantity": {
                                "value": 1
                            },
                            "unitPrice": {
                                "value": 5000,
                                "currency": "SAR"
                            },
                            "net": {
                                "value": 5000,
                                "currency": "SAR"
                            }
                        }
                    ],
                    "total": {
                        "value": 5000,
                        "currency": "SAR"
                    }
                }
            },
            {
                "fullUrl": "http://provider.com/Encounter/1",
                "resource": {
                    "resourceType": "Encounter",
                    "id": "1",
                    "meta": {
                        "profile": [
                            "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/encounter|1.0.0"
                        ]
                    },
                    "identifier": [
                        {
                            "system": "http://provider.com/encounter",
                            "value": "Encounter1"
                        }
                    ],
                    "status": "planned",
                    "class": {
                        "system": "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                        "code": "IMP",
                        "display": "inpatient encounter"
                    },
                    "serviceType": {
                        "coding": [
                            {
                                "system": "http://nphies.sa/terminology/CodeSystem/service-type",
                                "code": "sub-acute-care"
                            }
                        ]
                    },
                    "subject": {
                        "reference": "http://provider.com/Patient/173826788"
                    },
                    "period": {
                        "start": "2023-12-15T09:25:00+03:00"
                    },
                    "hospitalization": {
                        "extension": [
                            {
                                "url": "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-admissionSpecialty",
                                "valueCodeableConcept": {
                                    "coding": [
                                        {
                                            "system": "http://nphies.sa/terminology/CodeSystem/practice-codes",
                                            "code": "19.08",
                                            "display": "General Surgery"
                                        }
                                    ]
                                }
                            }
                        ],
                        "origin": {
                            "reference": "http://provider.com/Organization/070bdd8e753a4cf9b2e64db808dfd9dc"
                        },
                        "admitSource": {
                            "coding": [
                                {
                                    "system": "http://nphies.sa/terminology/CodeSystem/admit-source",
                                    "code": "WKIN",
                                    "display": "Walk-in"
                                }
                            ]
                        }
                    },
                    "serviceProvider": {
                        "reference": "http://provider.com/Organization/b1b3432921324f97af3be9fd0b1a14ae"
                    }
                }
            },
            {
                "fullUrl": "http://provider.com/Organization/b1b3432921324f97af3be9fd0b1a14ae",
                "resource": {
                    "resourceType": "Organization",
                    "id": "b1b3432921324f97af3be9fd0b1a14ae",
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
                                        "code": "1",
                                        "display": "Hospital"
                                    }
                                ]
                            }
                        }
                    ],
                    "identifier": [
                        {
                            "system": "http://nphies.sa/license/provider-license",
                            "value": "PR-FHIR"
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
                    ]
                }
            },
            {
                "fullUrl": "http://provider.com/Patient/173826788",
                "resource": {
                    "resourceType": "Patient",
                    "id": "173826788",
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
                                        "code": "student"
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
                            "value": "2000000002"
                        }
                    ],
                    "active": true,
                    "name": [
                        {
                            "use": "official",
                            "text": "Muhammad Ali Abbas",
                            "family": "Abbas",
                            "given": [
                                "Muhammad",
                                "Ali"
                            ]
                        }
                    ],
                    "telecom": [
                        {
                            "system": "phone",
                            "value": "+966517382691"
                        }
                    ],
                    "gender": "male",
                    "_gender": {
                        "extension": [
                            {
                                "url": "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-ksa-administrative-gender",
                                "valueCodeableConcept": {
                                    "coding": [
                                        {
                                            "system": "http://nphies.sa/terminology/CodeSystem/ksa-administrative-gender",
                                            "code": "male",
                                            "display": "Male"
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    "birthDate": "2010-08-21",
                    "maritalStatus": {
                        "coding": [
                            {
                                "system": "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
                                "code": "U"
                            }
                        ]
                    }
                }
            },
            {
                "fullUrl": "http://provider.com/Organization/bff3aa1fbd3648619ac082357bf135db",
                "resource": {
                    "resourceType": "Organization",
                    "id": "bff3aa1fbd3648619ac082357bf135db",
                    "meta": {
                        "profile": [
                            "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/insurer-organization|1.0.0"
                        ]
                    },
                    "identifier": [
                        {
                            "system": "http://nphies.sa/license/payer-license",
                            "value": "INS-FHIR"
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
                    "name": "Test Payer"
                }
            },
            {
                "fullUrl": "http://provider.com/Organization/13",
                "resource": {
                    "resourceType": "Organization",
                    "id": "13",
                    "meta": {
                        "profile": [
                            "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/policyholder-organization|1.0.0"
                        ]
                    },
                    "identifier": [
                        {
                            "system": "http://nphies.sa/identifier/organization",
                            "value": "5009"
                        }
                    ],
                    "active": true,
                    "name": "Policy Holder Organization"
                }
            },
            {
                "fullUrl": "http://provider.com/Coverage/1333",
                "resource": {
                    "resourceType": "Coverage",
                    "id": "1333",
                    "meta": {
                        "profile": [
                            "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/coverage|1.0.0"
                        ]
                    },
                    "identifier": [
                        {
                            "system": "http://pseudo-payer.com.sa/memberid",
                            "value": "0000000002"
                        }
                    ],
                    "status": "active",
                    "type": {
                        "coding": [
                            {
                                "system": "http://nphies.sa/terminology/CodeSystem/coverage-type",
                                "code": "EHCPOL",
                                "display": "extended healthcare"
                            }
                        ]
                    },
                    "policyHolder": {
                        "reference": "http://provider.com/Organization/13"
                    },
                    "subscriber": {
                        "reference": "http://provider.com/Patient/3662364643"
                    },
                    "beneficiary": {
                        "reference": "http://provider.com/Patient/173826788"
                    },
                    "relationship": {
                        "coding": [
                            {
                                "system": "http://terminology.hl7.org/CodeSystem/subscriber-relationship",
                                "code": "child",
                                "display": "Child"
                            }
                        ]
                    },
                    "payor": [
                        {
                            "reference": "http://provider.com/Organization/bff3aa1fbd3648619ac082357bf135db"
                        }
                    ],
                    "class": [
                        {
                            "type": {
                                "coding": [
                                    {
                                        "system": "http://terminology.hl7.org/CodeSystem/coverage-class",
                                        "code": "plan"
                                    }
                                ]
                            },
                            "value": "CB135",
                            "name": "Insurance Plan A"
                        }
                    ],
                    "network": "Golden C"
                }
            },
            {
                "fullUrl": "http://provider.com/Practitioner/7",
                "resource": {
                    "resourceType": "Practitioner",
                    "id": "7",
                    "meta": {
                        "profile": [
                            "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/practitioner|1.0.0"
                        ]
                    },
                    "identifier": [
                        {
                            "type": {
                                "coding": [
                                    {
                                        "system": "http://terminology.hl7.org/CodeSystem/v2-0203",
                                        "code": "MD"
                                    }
                                ]
                            },
                            "system": "http://nphies.sa/license/practitioner-license",
                            "value": "N-P-00001"
                        }
                    ],
                    "active": true,
                    "name": [
                        {
                            "use": "official",
                            "text": "Dr. Ameera Hassan",
                            "family": "Hassan",
                            "given": [
                                "Ameera"
                            ]
                        }
                    ]
                }
            },
            {
                "fullUrl": "http://provider.com/Patient/3662364643",
                "resource": {
                    "resourceType": "Patient",
                    "id": "3662364643",
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
                                        "code": "business"
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
                            "value": "2000000001"
                        }
                    ],
                    "active": true,
                    "name": [
                        {
                            "use": "official",
                            "text": "Ahmad Khaled Abbas",
                            "family": "Abbas",
                            "given": [
                                "Ahmad",
                                "Khaled"
                            ]
                        }
                    ],
                    "telecom": [
                        {
                            "system": "phone",
                            "value": "+966517382643"
                        }
                    ],
                    "gender": "male",
                    "_gender": {
                        "extension": [
                            {
                                "url": "http://nphies.sa/fhir/ksa/nphies-fs/StructureDefinition/extension-ksa-administrative-gender",
                                "valueCodeableConcept": {
                                    "coding": [
                                        {
                                            "system": "http://nphies.sa/terminology/CodeSystem/ksa-administrative-gender",
                                            "code": "male",
                                            "display": "Male"
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    "birthDate": "1984-12-25",
                    "maritalStatus": {
                        "coding": [
                            {
                                "system": "http://terminology.hl7.org/CodeSystem/v3-MaritalStatus",
                                "code": "M"
                            }
                        ]
                    }
                }
            },
            {
                "fullUrl": "http://provider.com/Organization/070bdd8e753a4cf9b2e64db808dfd9dc",
                "resource": {
                    "resourceType": "Organization",
                    "id": "070bdd8e753a4cf9b2e64db808dfd9dc",
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
                                        "code": "1",
                                        "display": "Hospital"
                                    }
                                ]
                            }
                        }
                    ],
                    "identifier": [
                        {
                            "system": "http://nphies.sa/license/provider-license",
                            "value": "PR-FHIR"
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
                    "name": "Test Provider"
                }
            }
        ]
    }
;
