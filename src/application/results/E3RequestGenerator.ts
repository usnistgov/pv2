export const altLabels = [
    "No Solar System",
    "Purchase Solar System",
    "PPA Solar System",
];

const NET_METERING = "Net Metering Tariff";
const CASH = "Cash";

export async function createE3Request(store: any): Promise<any> {
    const now = new Date();

    const nowString = `${now.getFullYear()}-${now.getMonth()}-${now.getDay()}`;

    const netConsumption = Array.from(Array(store.studyPeriod).keys())
        .map((_, index, array) => {
            if (index === 0)
                return 1;

            return array[index - 1] * (1.0 - store.degradationRate);
        })
        .map((modifier) => store.annualConsumption - modifier * store.estimatedAnnualProduction);

    const positiveNetConsumptionStart = netConsumption.findIndex((value) => value > 0) + 1;

    const negativeNetConsumption = netConsumption.filter((value) => value < 0);
    const positiveNetConsumption = netConsumption.filter((value) => value > 0);

    let escalationRateOrRates;

    switch (store.viewAnnualEscalationRates) {
        case "Yes, single value":
            escalationRateOrRates = store.escalationRateSingleValue;
            break;
        case "Yes, multiple values":
            const valuesAsString = store.escalationRateMultipleValues;
            const arr = valuesAsString.split(/\s*,?\s*/);
            arr.map((s: string) => parseFloat(s))
            escalationRateOrRates = arr;
            break;
        default:
            escalationRateOrRates = store.escalationRateForYear;
    }

    return [{
        analysisObject: {
            analysisType: "LCC",
            projectType: "Buildings",
            objToReport: ["FlowSummary","MeasureSummary"],
            studyPeriod: store.studyPeriod,
            baseDate: nowString,
            serviceDate: nowString,
            timestepVal: "1",
            timestepComp: 1,
            outputRealBool: false,
            interestRate: store.nominalInterestRate,
            dRateReal: store.realDiscountRate,
            dRateNom: (1 + store.generalInflation) * (1 + store.realDiscountRate),
            inflationRate: store.generalInflation,
            Marr: store.realDiscountRate,
            reinvestRate: store.realDiscountRate,
            incomeRateFed: {},
            incomeRateOther: {},
            //noAlt: 1,
            location: [store.address, store.city, store.state, store.zipcode]
        },
        alternativeObject: [
            {
                altID: 0,
                altName: altLabels[0],
                altBCNList: [0, 1],
                baselineBool: true,
            },
            {
                altID: 1,
                altName: altLabels[1],
                altBCNList: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                baselineBool: false,
            },
            {
                altID: 2,
                altName: altLabels[2],
                altBCNList: [12, 13, 14, 15, 16, 17, 18],
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
                bcnInvestBool: false,
                bcnLife: null,
                rvBool: false,
                recurBool: true,
                recurInterval: 1,
                recurVarRate: "percDelta",
                recurVarValue: escalationRateOrRates,
                recurEndDate: store.studyPeriod,
                valuePerQ: store.pvGridConnectionRate,
                quant: store.annualConsumption,
                quantVarRate: "percDelta",
                quantVarValue: 1.0,
                quantUnit: "kwh"
            },
            {
                bcnID: 1,
                altID: [0],
                bcnType: "Cost",
                bcnSubType: "Direct",
                bcnName: "Electricity Demand Charge",
                bcnTag: "Electricity",
                initialOcc: 1,
                bcnInvestBool: false,
                bcnLife: null,
                rvBool: false,
                recurBool: true,
                recurInterval: 1,
                recurVarRate: "percDelta",
                recurVarValue: 0.0,
                recurEndDate: store.studyPeriod,
                valuePerQ: store.monthlyFlatRateCharge * 12, // Multiply monthly rate to get yearly rate
                quant: 1,
                quantVarRate: "percDelta",
                quantVarValue: 1.0,
                quantUnit: null
            },
            {
                bcnID: 2,
                altID: [1],
                bcnType: "Cost",
                bcnSubType: "Direct",
                bcnName: "Electricity Consumption",
                bcnTag: "Electricity",
                initialOcc: store.netMeteringFeedTariff === NET_METERING ? positiveNetConsumptionStart : 1,
                bcnInvestBool: false,
                bcnLife: null,
                rvBool: false,
                recurBool: true,
                recurInterval: 1,
                recurVarRate: "percDelta",
                recurVarValue: escalationRateOrRates,
                recurEndDate: store.studyPeriod,		// Study Period
                valuePerQ: store.annualConsumption,     // Consumption Rate
                quant: store.annualConsumption - positiveNetConsumption[0],	// If Feed-In Tariff, =(Annual Consumption)-(Annual Production) in Year = initialOcc FIXME
                quantVarRate: "percDelta",
                quantVarValue: [1.00, ...positiveNetConsumption], //Percent change year over year FIXME
                quantUnit: "kwh"
            },
            {
                bcnID: 3,
                altID: [1],
                bcnType: "Cost",
                bcnSubType: "Direct",
                bcnName: "Electricity Demand Charge",
                bcnTag: "Electricity",
                initialOcc: 1,
                bcnInvestBool: false,
                bcnLife: null,
                rvBool: false,
                recurBool: true,
                recurInterval: 1,
                recurVarRate: "percDelta",
                recurVarValue: 0.0,
                recurEndDate: store.studyPeriod,	// Study Period
                valuePerQ: store.monthlyFlatRateCharge * 12, // Multiply monthly charge to get yearly charge
                quant: 1,
                quantVarRate: "percDelta",
                quantVarValue: 1.00,
                quantUnit: null
            },
            {
                bcnID: 4,
                altID: [1],
                bcnType: "Cost",
                bcnSubType: "Direct",
                bcnName: "Electricity Production",
                bcnTag: "Electricity",
                initialOcc: store.netMeteringFeedTariff === NET_METERING ? positiveNetConsumptionStart : 1,
                bcnInvestBool: false,
                bcnLife: null,
                rvBool: false,
                recurBool: true,
                recurInterval: 1,
                recurVarRate: "percDelta",
                recurVarValue: escalationRateOrRates,
                recurEndDate: positiveNetConsumptionStart === 1 ? 1 : positiveNetConsumptionStart - 1,//# If net metering, Last year production > consumption
                valuePerQ: 0.059,						//# Excess Production Rate
                quant: negativeNetConsumption[0],		//# =(Annual Consumption)-(Annual Production) in Year = initialOcc
                quantVarRate: "percDelta",
                quantVarValue: [1.00, ...negativeNetConsumption], //#QUESTION: If the value is negative, what is the right variability rate?
                quantUnit: "kwh"
            },
            {
                bcnID: 5,
                altID: [1],
                bcnType: "Cost",
                bcnSubType: "Direct",
                bcnName: "PV Grid Connection Fee",
                bcnTag: "Electricity",
                initialOcc: 1,
                bcnInvestBool: false,
                bcnLife: null,
                rvBool: false,
                recurBool: true,
                recurInterval: 1,
                recurVarRate: "percDelta",
                recurVarValue: 0.0,
                recurEndDate: store.studyPeriod,        // Study Period
                valuePerQ: store.pvGridConnectionRate,  // PV Connection Fee
                quant: 1,
                quantVarRate: "percDelta",
                quantVarValue: 1.00,
                quantUnit: null
            },
            {
                bcnID: 6,
                altID: [1],
                bcnType: "Cost",
                bcnSubType: "Direct",
                bcnName: "Total Installation Costs",
                bcnTag: "Investment Costs",
                initialOcc: 0,
                bcnInvestBool: true,
                bcnLife: 25,
                rvBool: false,
                recurBool: false,
                recurInterval: null,
                recurVarRate: null,
                recurVarValue: null,
                recurEndDate: null,
                valuePerQ: store.loanOrCash === CASH ? store.totalInstallationCosts : store.downPayment,
                quant: 1,
                quantVarRate: null,
                quantVarValue: null,
                quantUnit: null
            },
            {
                bcnID: 7,
                altID: [1],
                bcnType: "Cost",
                bcnSubType: "Direct",
                bcnName: "Total Installation Costs Residual Value",
                bcnTag: "Investment Costs",
                initialOcc: store.studyPeriod,	// Study Period FIXME
                bcnInvestBool: true,
                bcnLife: null,
                rvBool: false,
                recurBool: false,
                recurInterval: null,
                recurVarRate: null,
                recurVarValue: null,
                recurEndDate: store.loanOrCash === CASH ? null : store.downPayment, // FIXME
                valuePerQ: store.monthlyPayment, // FIXME
                quant: 1,
                quantVarRate: null,
                quantVarValue: null,
                quantUnit: null
            },
            {
                bcnID: 8,
                altID: [1],
                bcnType: "Cost",
                bcnSubType: "Direct",
                bcnName: "Federal Tax Credit",
                bcnTag: "Investment Costs",
                initialOcc: store.studyPeriod, //FIXME
                bcnInvestBool: 0,
                bcnLife: null,
                rvBool: false,
                recurBool: false,
                recurInterval: null,
                recurVarRate: null,
                recurVarValue: null,
                recurEndDate: null,
                valuePerQ: store.federalTaxCredit,
                quant: 1,
                quantVarRate: null,
                quantVarValue: null,
                quantUnit: null
            },
            {
                bcnID: 9,
                altID: [1],
                bcnType: "Cost",
                bcnSubType: "Direct",
                bcnName: "GrantsRebates",
                bcnTag: "Investment Costs",
                initialOcc: 0,
                bcnInvestBool: true,
                bcnLife: 25,
                rvBool: false,
                recurBool: false,
                recurInterval: null,
                recurVarRate: null,
                recurVarValue: null,
                recurEndDate: null,
                valuePerQ: store.stateOrLocalTaxCreditsOrGrantsOrRebates,
                quant: 1,
                quantVarRate: null,
                quantVarValue: null,
                quantUnit: null
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
                bcnLife: null,
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
                quantUnit: null
            },
            {
                bcnID: 11,
                altID: [1],
                bcnType: "Cost",
                bcnSubType: "Direct",
                bcnName: "Solar Renewable Energy Credits",
                bcnTag: "SRECs",
                initialOcc: store.netMeteringFeedTariff === NET_METERING ? positiveNetConsumptionStart : 1,
                bcnInvestBool: false,
                bcnLife: null,
                rvBool: false,
                recurBool: true,
                recurInterval: 1,
                recurVarRate: "percDelta",
                recurVarValue: store.srecPaymentsProductionBased,
                recurEndDate: 10,								// TODO (hard code 25 and list length of 25, and have 0s for filler) Assumes there is only value for Year 1-10.
                valuePerQ: store.annualConsumption,				// Consumption Rate
                quant: 10.3,									// TODO (pull value from user -> 10300/1000 check example) Quantity = MWh produced = kwh / 1000	//  If Feed-In Tariff, =(Annual Consumption)-(Annual Production) in Year = initialOcc
                quantVarRate: "percDelta",
                quantVarValue: -store.degradationRate,
                quantUnit: ""
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
                initialOcc: positiveNetConsumptionStart,	// Year that consumption > production
                bcnInvestBool: false,
                bcnLife: null,
                rvBool: false,
                recurBool: true,
                recurInterval: 1,
                recurVarRate: "percDelta",
                recurVarValue: escalationRateOrRates,		// Escalation Rate List or Constant Value for Consumption
                recurEndDate: store.studyPeriod,			// Study Period
                valuePerQ: store.annualConsumption,			// Consumption Rate
                quant: store.annualConsumption - positiveNetConsumption[0],		// =(Annual Consumption)-(Annual Production) in Year = initialOcc
                quantVarRate: "percDelta",
                quantVarValue: [1.00, 5.72, 0.85, 0.46, 0.31, 0.24, 0.19, 0.16, 0.14, 0.12, 0.11, 0.10, 0.09, 0.08, 0.07, 0.07, 0.06, 0.06], // TODO Percent change year over year
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
                bcnLife: null,
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
                quantUnit: null
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
                bcnLife: null,
                rvBool: false,
                recurBool: true,
                recurInterval: 1,
                recurVarRate: "percDelta",
                recurVarValue: escalationRateOrRates,		// Escalation Rate List or Constant Value for PPA
                recurEndDate: store.studyPeriod,			// double check Length of PPA Contract = Study Period in this case
                valuePerQ: 0.10,							// TODO PPA Rate
                quant: store.estimatedAnnualProduction,		//  = Annual Production
                quantVarRate: "percDelta",
                quantVarValue: (100 - store.degradationRate) / 100, 	//  0.05% degradation rate per year
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
                bcnLife: null,
                rvBool: false,
                recurBool: true,
                recurInterval: 1,
                recurVarRate: "percDelta",
                recurVarValue: escalationRateOrRates,		// Escalation Rate List or Constant Value for Excess Production
                recurEndDate: 6,							// TODO Last year production > consumption
                valuePerQ: -0.059,							// TODO Excess Production Rate
                quant: positiveNetConsumption[0] - store.annualConsumption,		// =(Annual Production)-(Annual Consumption) in Year = initialOcc
                quantVarRate: "percDelta",
                quantVarValue: [1.00, -0.17, -0.21, -0.26, -0.35, -0.55],
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
                bcnLife: null,
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
                quantUnit: null
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
                bcnLife: null,
                rvBool: false,
                recurBool: false,
                recurInterval: null,
                recurVarRate: null,
                recurVarValue: null,
                recurEndDate: null,
                valuePerQ: 0,				// TODO Includes (system minus inverter) and (inverter); RV = 0 because system has 25 year service life
                quant: 1,
                quantVarRate: null,
                quantVarValue: null,
                quantUnit: null
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
                bcnLife: null,
                rvBool: false,
                recurBool: false,
                recurInterval: null,
                recurVarRate: null,
                recurVarValue: null,
                recurEndDate: null,
                valuePerQ: 0,				// TODO PPA gives the system to the homeowner. Purchase Price = 0
                quant: 1,
                quantVarRate: null,
                quantVarValue: null,
                quantUnit: null
            }
        ],
        sensitivityObject: {},
        scenarioObject: {},
    }];
}

