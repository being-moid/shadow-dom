export const createPreAuthPayload = (formData) => {
    const {
        patient,
        visit,
        eligibility,
        coverage,
        medications,
        diagnoses,
        careTeam,
        supportingInfo,
        vitals
    } = formData;

    return {
        resourceType: "Bundle",
        type: "collection",
        entry: [
            {
                resource: {
                    resourceType: "Claim",
                    status: "active",
                    type: {
                        coding: [
                            {
                                system: "http://terminology.hl7.org/CodeSystem/claim-type",
                                code: "institutional",
                                display: "Institutional"
                            }
                        ]
                    },
                    use: "preauthorization",
                    patient: {
                        reference: `Patient/${patient?.id}`,
                        display: patient?.name
                    },
                    created: new Date().toISOString(),
                    provider: careTeam?.find(member => member.role.code === "primary")?.reference || null,
                    priority: {
                        coding: [
                            {
                                system: "http://terminology.hl7.org/CodeSystem/processpriority",
                                code: "normal"
                            }
                        ]
                    },
                    insurance: [
                        {
                            sequence: 1,
                            focal: true,
                            coverage: {
                                reference: `Coverage/${coverage?.id}`
                            }
                        }
                    ],
                    diagnosis: diagnoses?.map((diagnosis, index) => ({
                        sequence: index + 1,
                        diagnosisCodeableConcept: {
                            coding: [
                                {
                                    system: diagnosis.icdtype === 1 ? 
                                        "http://hl7.org/fhir/sid/icd-9-cm" : 
                                        "http://hl7.org/fhir/sid/icd-10",
                                    code: diagnosis.code,
                                    display: diagnosis.description
                                }
                            ]
                        },
                        type: [
                            {
                                coding: [
                                    {
                                        system: "http://terminology.hl7.org/CodeSystem/ex-diagnosistype",
                                        code: diagnosis.type,
                                        display: diagnosis.type.charAt(0).toUpperCase() + diagnosis.type.slice(1)
                                    }
                                ]
                            }
                        ],
                        onAdmission: diagnosis.presentOnAdmission ? {
                            coding: [
                                {
                                    system: "http://terminology.hl7.org/CodeSystem/diagnosis-on-admission",
                                    code: "y",
                                    display: "Yes"
                                }
                            ]
                        } : null
                    })),
                    careTeam: careTeam?.map((member, index) => ({
                        sequence: index + 1,
                        provider: {
                            reference: `Practitioner/${member.id}`,
                            display: member.name.text
                        },
                        role: {
                            coding: [
                                {
                                    system: "http://terminology.hl7.org/CodeSystem/claimcareteamrole",
                                    code: member.role.code,
                                    display: member.role.display
                                }
                            ]
                        },
                        qualification: {
                            coding: [
                                {
                                    system: member.qualification.system,
                                    code: member.qualification.code,
                                    display: member.qualification.display
                                }
                            ]
                        }
                    })),
                    supportingInfo: [
                        // Visit Information
                        {
                            sequence: 1,
                            category: {
                                coding: [
                                    {
                                        system: "http://terminology.hl7.org/CodeSystem/claiminformationcategory",
                                        code: "info",
                                        display: "Information"
                                    }
                                ]
                            },
                            valueReference: {
                                reference: `Encounter/${visit?.id}`,
                                display: `Visit on ${visit?.visitDate}`
                            }
                        },
                        // Vitals
                        ...Object.entries(vitals || {}).map(([key, value], index) => ({
                            sequence: index + 2,
                            category: {
                                coding: [
                                    {
                                        system: "http://terminology.hl7.org/CodeSystem/claiminformationcategory",
                                        code: "vital",
                                        display: "Vital Sign"
                                    }
                                ]
                            },
                            code: {
                                coding: [
                                    {
                                        system: "http://loinc.org",
                                        code: getLoincCode(key),
                                        display: getVitalDisplay(key)
                                    }
                                ]
                            },
                            valueQuantity: {
                                value: parseFloat(value) || 0,
                                unit: getVitalUnit(key),
                                system: "http://unitsofmeasure.org",
                                code: getVitalUnitCode(key)
                            },
                            timingDateTime: vitals?.creationDate
                        }))
                    ],
                    item: medications?.map((medication, index) => ({
                        sequence: index + 1,
                        productOrService: {
                            coding: [
                                {
                                    system: "http://snomed.info/sct",
                                    code: medication.code,
                                    display: medication.name
                                }
                            ]
                        },
                        servicedPeriod: {
                            start: visit?.startTime,
                            end: visit?.endTime
                        },
                        quantity: {
                            value: 1
                        },
                        unitPrice: {
                            value: medication.price || 0,
                            currency: "SAR"
                        }
                    }))
                }
            }
        ]
    };
};

const getLoincCode = (vitalKey) => {
    const loincCodes = {
        height: "8302-2",
        weight: "29463-7",
        bmi: "39156-5",
        systolic: "8480-6",
        diastolic: "8462-4",
        pulseRate: "8867-4",
        temperature: "8310-5",
        spo2: "59408-5",
        respRate: "9279-1",
        bloodSugar: "2339-0"
    };
    return loincCodes[vitalKey] || "";
};

const getVitalDisplay = (vitalKey) => {
    const displays = {
        height: "Body height",
        weight: "Body weight",
        bmi: "Body mass index",
        systolic: "Systolic blood pressure",
        diastolic: "Diastolic blood pressure",
        pulseRate: "Heart rate",
        temperature: "Body temperature",
        spo2: "Oxygen saturation",
        respRate: "Respiratory rate",
        bloodSugar: "Glucose [Mass/volume] in Blood"
    };
    return displays[vitalKey] || "";
};

const getVitalUnit = (vitalKey) => {
    const units = {
        height: "cm",
        weight: "kg",
        bmi: "kg/m2",
        systolic: "mmHg",
        diastolic: "mmHg",
        pulseRate: "/min",
        temperature: "Cel",
        spo2: "%",
        respRate: "/min",
        bloodSugar: "mg/dL"
    };
    return units[vitalKey] || "";
};

const getVitalUnitCode = (vitalKey) => {
    const unitCodes = {
        height: "cm",
        weight: "kg",
        bmi: "kg/m2",
        systolic: "mm[Hg]",
        diastolic: "mm[Hg]",
        pulseRate: "/min",
        temperature: "Cel",
        spo2: "%",
        respRate: "/min",
        bloodSugar: "mg/dL"
    };
    return unitCodes[vitalKey] || "";
};

export default createPreAuthPayload; 