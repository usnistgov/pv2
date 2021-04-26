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
            },
            {
                bcnID: 10,
                altID: [1],
                bcnType: "Cost",
                bcnSubType: "Direct",
                bcnName: "Maintenance Costs",
                bcnTag: "Maintenance Costs",
                initialOcc: 1,
                bcnInvestBool: false,
                bcnLife: {},
                rvBool: false,
                recurBool: true,
                recurInterval: 1,
                recurVarRate: "percDelta",
                recurVarValue: 0.0,
                recurEndDate: store.studyPeriod,			// Study Period
                valuePerQ: store.annualMaintenanceCosts,	// Maintenance Costs = 0 in this example
                quant: 1,
                quantVarRate: "percDelta",
                quantVarValue: 1.00,
                quantUnit: {}
            },
            {
                bcnID: 11,
                altID: [1],
                bcnType: "Cost",
                bcnSubType: "Direct",
                bcnName: "Solar Renewable Energy Credits",
                bcnTag: "SRECs",
                initialOcc: 1,								// TODO If net metering, then first year that consumption > production
                bcnInvestBool: false,
                bcnLife: {},
                rvBool: false,
                recurBool: true,
                recurInterval: 1,
                recurVarRate: "percDelta",
                recurVarValue: [0.00,0.00,0.00,-0.125,0,0,0,0,0,0],	// TODO Rate of Change for SREC Value
                recurEndDate: 10,								// TODO Assumes there is only value for Year 1-10.
                valuePerQ: store.annualConsumption,				//  Consumption Rate
                quant: 10.3,									// TODO Quantity = MWh produced = kwh / 1000										//  If Feed-In Tariff, =(Annual Consumption)-(Annual Production) in Year = initialOcc
                quantVarRate: "percDelta",	
                quantVarValue: -0.005, 						// TODO Percent change year over year for SREC quantity based on total production
                quantUnit: "kwh"
            },
    
            // TODO
            // Alternative 2 – PPA / Lease (Optional)
            // Lease to Own Solar PV System
            // The costs include Grid Consumption Costs from Net Consumption at a lower price and PV produced consumption at a lower price
            //  Total Consumption is a combination of grid and solar PV based electricity
            //  Instead of having a purchase cost, there are PPA payments for solar PV production
            //  Homeowner does not get the SREC value because its owned by the PPA company
            //  Grid costs are the same as in the purchase case.
            {
                bcnID: 12,
                altID: [2],
                bcnType: "Cost",
                bcnSubType: "Direct",
                bcnName: "Electricity Consumption - Grid",
                bcnTag: "Electricity",
                initialOcc: 7,								// TODO Year that consumption > production
                bcnInvestBool: false,
                bcnLife: {},
                rvBool: false,
                recurBool: true,
                recurInterval: 1,
                recurVarRate: "percDelta",
                recurVarValue: 0.0,							// TODO Escalation Rate List or Constant Value for Consumption
                recurEndDate: store.studyPeriod,			// Study Period
                valuePerQ: store.annualConsumption,			// Consumption Rate
                quant: 9,									// TODO =(Annual Consumption)-(Annual Production) in Year = initialOcc
                quantVarRate: "percDelta",	
                quantVarValue: [1.00,5.72,0.85,0.46,0.31,0.24,0.19,0.16,0.14,0.12,0.11,0.10,0.09,0.08,0.07,0.07,0.06,0.06], // TODO Percent change year over year
                quantUnit: "kwh"
            },
            {
                bcnID: 13,
                altID: [2],
                bcnType: "Cost",
                bcnSubType: "Direct",
                bcnName: "Electricity Demand Charge",
                bcnTag: "Electricity",
                initialOcc: 1,
                bcnInvestBool: false,
                bcnLife: {},
                rvBool: false,
                recurBool: true,
                recurInterval: 1,
                recurVarRate: "percDelta",
                recurVarValue: 0.0,
                recurEndDate: store.studyPeriod,			// Study Period
                valuePerQ: 96.12,							// TODO Demand Charge
                quant: 1,
                quantVarRate: "percDelta",
                quantVarValue: 1.00,
                quantUnit: {}
            },
            {
                bcnID: 14,
                altID: [1],
                bcnType: "Cost",
                bcnSubType: "Direct",
                bcnName: "Electricity Consumption - PPA",
                bcnTag: "Electricity",
                initialOcc: 1,								// TODO  First year production > consumption
                bcnInvestBool: false,
                bcnLife: {},
                rvBool: false,
                recurBool: true,
                recurInterval: 1,
                recurVarRate: "percDelta",
                recurVarValue: 0.0,							// TODO Escalation Rate List or Constant Value for PPA
                recurEndDate: store.studyPeriod,			// double check Length of PPA Contract = Study Period in this case
                valuePerQ: 0.10,							// TODO PPA Rate
                quant: store.estimatedAnnualProduction,		//  = Annual Production
                quantVarRate: "percDelta",	
                quantVarValue: (100 - store.degradationRate)/100, 	//  0.05% degradation rate per year
                quantUnit: "kwh"
            },
            {
                bcnID: 15,
                altID: [1],
                bcnType: "Cost",
                bcnSubType: "Direct",
                bcnName: "Electricity Production",
                bcnTag: "Electricity",
                initialOcc: 1,								// TODO First year production > consumption
                bcnInvestBool: false,
                bcnLife: {},
                rvBool: false,
                recurBool: true,
                recurInterval: 1,
                recurVarRate: "percDelta",
                recurVarValue: 0.01,							// TODO Escalation Rate List or Constant Value for Excess Production
                recurEndDate: 6,								// TODO Last year production > consumption
                valuePerQ: -0.059,							// TODO Excess Production Rate
                quant: 300,									// TODO =(Annual Production)-(Annual Consumption) in Year = initialOcc
                quantVarRate: "percDelta",	
                quantVarValue: [1.00,-0.17,-0.21,-0.26,-0.35,-0.55], 
                quantUnit: "kwh"
            },
            {
                bcnID: 16,
                altID: [1],
                bcnType: "Cost",
                bcnSubType: "Direct",
                bcnName: "PV Grid Connection Fee",
                bcnTag: "Electricity",
                initialOcc: 1,
                bcnInvestBool: false,
                bcnLife: {},
                rvBool: false,
                recurBool: true,
                recurInterval: 1,
                recurVarRate: "percDelta",
                recurVarValue: 0.0,
                recurEndDate: store.studyPeriod,			//  Study Period
                valuePerQ: store.pvGridConnectionRate,		//  PV Connection Fee
                quant: 1,
                quantVarRate: "percDelta",
                quantVarValue: 1.00,
                quantUnit: {}
            },
            {
                bcnID: 17,
                altID: [1],
                bcnType: "Cost",
                bcnSubType: "Direct",
                bcnName: "Solar PV Residual Value",
                bcnTag: "Investment Costs",
                initialOcc: store.studyPeriod,				//  Study Period
                bcnInvestBool: true,
                bcnLife: {},
                rvBool: false,
                recurBool: false,
                recurInterval: {},
                recurVarRate: {},
                recurVarValue: {},
                recurEndDate: {},								
                valuePerQ: 0,				// TODO Includes (system minus inverter) and (inverter); RV = 0 because system has 25 year service life
                quant: 1,
                quantVarRate: {},
                quantVarValue: {},
                quantUnit: {}
            },
            {
                bcnID: 18,
                altID: [1],
                bcnType: "Cost",
                bcnSubType: "Direct",
                bcnName: "Solar PV Purchase Price",
                bcnTag: "Investment Costs",
                initialOcc: store.studyPeriod,		//  Study Period
                bcnInvestBool: true,
                bcnLife: {},
                rvBool: false,
                recurBool: false,
                recurInterval: {},
                recurVarRate: {},
                recurVarValue: {},
                recurEndDate: {},								
                valuePerQ: 0,				// TODO PPA gives the system to the homeowner. Purchase Price = 0
                quant: 1,
                quantVarRate: {},
                quantVarValue: {},
                quantUnit: {}
            }
        ],
        sensitivityObject : {},
        scenarioObject: {},
    }];
}

