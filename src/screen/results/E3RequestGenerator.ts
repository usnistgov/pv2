const assumptions = {
    escalationRate: 1.0
}

export function createE3Request(store: any) {
    const now = new Date();

    const nowString = `${now.getFullYear()}-${now.getMonth()}-${now.getDay()}`;

    return [{
        analysisObject: {
            analysisType: "LCC",
            projectType: "Buildings",
            objToReport: "MeasureSummary",
            studyPeriod: store.studyPeriod,
            baseDate: nowString,
            serviceDate: nowString,
            timestepVal: "Year",
            //timestepComp: int,
            //outputRealBool: boolean,
            interestRate: store.nominalInterestRate,
            dRateReal: store.realDiscountRate,
            dRateNom: (1 + store.generalInflation) * (1 + store.realDiscountRate),
            inflationRate: store.generalInflation,
            Marr: store.realDiscountRate,
            reinvestRate: store.realDiscountRate,
            //incomeRateFed: null,
            //incomeRateOther: null,
            //noAlt: int,
            //baseAlt: int,
            location: [store.address, store.city, store.state, store.zipcode]
        },
        alternativeObject: [
            {
                altID: 0,
                altName: "No Solar System",
                altBCNList: [0, 1],
                baselineBool: true,
            },
            {
                altID: 1,
                altName: "Purchase Solar System",
                altBCNList: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                baselineBool: false,
            },
            {
                altID: 2,
                altName: "PPA Solar System",
                altBCNList: [12, 13, 14, 15],
                baselineBool: false,
            },
        ],
        bcnObject: [
            {
                bcnID: 0,
                altID: [0],
                bcnType: "Cost",
                bcnSubType: "Direct",
                bcnName: "Electricity Consumption",
                bcnTag: "Electricity",
                initialOcc: 1,
                //bcnRealBool: true,
                bcnInvestBool: false,
                //rvBool: false,
                recurBool: true,
                recurInterval: 1,
                recurVarRate: "Percent Delta Timestep X-1",
                recurVarValue: [assumptions.escalationRate],
                recurEndDate: nowString,
                //TODO: valuePerQ: value is missing
                quant: store.annualConsumption,
                quantVarRate: "Percent Timestep 0",
                quantVarValue: [1.0],
                quantUnit: "Kwh"
            },
            {
                bcnID: 1,
                altID: [0],
                bcnType: "Cost",
                bcnSubType: "Direct",
                bcnName: "Electricity Demand Charge",
                bcnTag: "Electricity",
                initialOcc: 1,
                //bcnRealBool: true,
                bcnInvestBool: false,
                //rvBool: false,
                recurBool: true,
                recurInterval: 1,
                recurVarRate: "Percent Delta Timestep X-1",
                recurVarValue: [0.0],
                recurEndDate: nowString,
                //TODO: valuePerQ: value is missing
                quant: 1,
                //quantVarRate: "Percent Timestep 0",
                //quantVarValue: [1.0],
                //quantUnit: "Kwh"
            }
        ],
        scenarioObjects: [{}],
    }];
}

