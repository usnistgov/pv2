import {
    AnalysisAssumptionsFormStore,
    ApplicationStore, CostsFormStore,
    ElectricalCostFormStore,
    EscalationRateFormStore,
    SolarSystemFormStore, SrecFormStore
} from "../ApplicationStore";
import {PPA_OPTIONS} from "../../Strings";

export const altLabels = [
    "No Solar System",
    "Purchase Solar System",
    "PPA Solar System",
];

const NET_METERING = "Net Metering Tariff";
const CASH = "Cash";

function ppaRequest(alternativeID: number, alternativeName: string, bcnIDStart: number, netProductionRates: number[],
                    store: ApplicationStore) {
    const bcnIDs = Array.from(Array(2), (_, i) => bcnIDStart + i);

    return {
        alternativeObjects: [{
            altID: alternativeID,
            altName: alternativeName,
            altBCNList: [1, 2, 6, ...bcnIDs],
            baselineBool: false,
        }],
        bcnObjects: [
            {
                bcnID: bcnIDs[0],
                altID: [2],
                bcnType: "Cost",
                bcnSubType: "Direct",
                bcnName: "Electricity Consumption - PPA",
                bcnTag: "Electricity",
                initialOcc: 1,
                bcnInvestBool: false,
                bcnLife: null,
                rvBool: false,
                recurBool: true,
                recurInterval: 1,
                recurVarRate: "Percent Delta Timestep X-1",
                recurVarValue: store.costsFormStore.ppaEscalationRate, // Escalation Rate List or Constant Value for PPA
                recurEndDate: store.costsFormStore.ppaContractLength, // PPA contract length
                valuePerQ: store.costsFormStore.ppaElectricityRate, // PPA Rate
                quant: store.solarSystemFormStore.estimatedAnnualProduction ?? 0,		//  = Annual Production
                quantVarRate: "Percent Delta Timestep X-1",
                quantVarValue: netProductionRates, 	//  0.05% degradation rate per year
                quantUnit: "kWh"
            },
            {
                bcnID: bcnIDs[1],
                altID: [2],
                bcnType: "Cost",
                bcnSubType: "Direct",
                bcnName: "Solar PV Purchase Price",
                bcnTag: "Investment Costs",
                initialOcc: store.costsFormStore.ppaContractLength, // End of PPA contract
                bcnInvestBool: true,
                bcnLife: null,
                rvBool: false,
                recurBool: false,
                recurInterval: null,
                recurVarRate: null,
                recurVarValue: null,
                recurEndDate: null,
                valuePerQ: store.costsFormStore.ppaPurchasePrice, // PPA purchase price
                quant: 1,
                quantVarRate: null,
                quantVarValue: null,
                quantUnit: null
            }
        ]
    };
}


export async function createE3Request(store: ApplicationStore): Promise<any> {
    const now = new Date();
    const nowString = `${now.getFullYear()}-${now.getMonth()}-${now.getDay()}`;

    const studyPeriod = store.analysisAssumptionsFormStore.studyPeriod;

    const includePPA = store.costsFormStore.ppaOption == PPA_OPTIONS[0]

    const annualConsumption = Array(studyPeriod + 1).fill(store.electricalCostFormStore.annualConsumption ?? 0)
    const annualProduction = Array(studyPeriod + 1).fill(store.solarSystemFormStore.estimatedAnnualProduction ?? 0)
        .map((value, index) => value * (1.0 - index * store.solarSystemFormStore.degradationRate))

    const netElectricity = annualConsumption.map((value, index) => value - annualProduction[index])

    const netGridConsumptionRates = netElectricity.map((value) => Math.max(0, value))
        .map((value) => {
            if (value == 0)
                return 0;

            return (store.electricalCostFormStore.annualConsumption ?? 0) / value
        });
    const netProductionRates = netElectricity.map((value) => Math.min(value, 0))
        .map((value) => {
            if (value == 0)
                return 0;

            return (store.solarSystemFormStore.estimatedAnnualProduction ?? 0) / value
        });

    const ppaObjects = ppaRequest(2, "PPA", 10, netProductionRates, store);

    return {
        analysisObject: {
            analysisType: "LCCA",
            projectType: "Buildings",
            objToReport: ["FlowSummary", "MeasureSummary"],
            studyPeriod: studyPeriod,
            baseDate: nowString,
            serviceDate: nowString,
            timestepVal: "Year",
            timestepComp: 1,
            outputRealBool: true,
            interestRate: store.costsFormStore.nominalInterestRate,
            dRateReal: store.analysisAssumptionsFormStore.realDiscountRate,
            dRateNom: (1 + store.analysisAssumptionsFormStore.generalInflation) *
                (1 + store.analysisAssumptionsFormStore.realDiscountRate),
            inflationRate: store.analysisAssumptionsFormStore.generalInflation,
            Marr: store.analysisAssumptionsFormStore.realDiscountRate,
            reinvestRate: store.analysisAssumptionsFormStore.realDiscountRate,
            incomeRateFed: 0.26,
            incomeRateOther: 0.26,
            noAlt: store.costsFormStore.ppaOption == PPA_OPTIONS[0] ? 3 : 2,
            baseAlt: 0,
            location: [
                "118 Poppy Rd",
                "Paxinos",
                "PA",
                "17860"
                //store.addressFormStore.address,
                //store.addressFormStore.city,
                //store.addressFormStore.state,
                //store.addressFormStore.zipcode
            ]
        },
        alternativeObjects: [
            {
                altID: 0,
                altName: altLabels[0],
                altBCNList: [0, 1],
                baselineBool: true,
            },
            {
                altID: 1,
                altName: altLabels[1],
                altBCNList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                baselineBool: false,
            },
            ...ppaObjects.alternativeObjects
        ],
        bcnObjects: [
            // Baseline
            {
                bcnID: 0,
                altID: [0],
                bcnType: "Cost",
                bcnSubType: "Direct",
                bcnName: "Grid Electricity Consumption",
                bcnTag: "Electricity",
                initialOcc: 1,
                bcnInvestBool: false,
                bcnLife: null,
                rvBool: false,
                recurBool: true,
                recurInterval: 1,
                recurVarRate: "Percent Delta Timestep X-1",
                recurVarValue: store.escalationRateFormStore.escalationRateForYear.length === 0 ?
                    null : store.escalationRateFormStore.escalationRateForYear,
                recurEndDate: studyPeriod,
                valuePerQ: store.electricalCostFormStore.electricUnitPrice,
                quant: store.electricalCostFormStore.annualConsumption ?? 0,
                quantVarRate: null,
                quantVarValue: null,
                quantUnit: "kWh"
            },
            {
                bcnID: 1,
                altID: includePPA ? [0, 1, 2] : [0, 1],
                bcnType: "Cost",
                bcnSubType: "Direct",
                bcnName: "Grid Electricity Demand Charge",
                bcnTag: "Electricity",
                initialOcc: 1,
                bcnInvestBool: false,
                bcnLife: null,
                rvBool: false,
                recurBool: true,
                recurInterval: 1,
                recurVarRate: "Percent Delta Timestep X-1",
                recurVarValue: 0.0,
                recurEndDate: studyPeriod,
                valuePerQ: (store.electricalCostFormStore.monthlyFlatRateCharge ?? 0) * 12, // Multiply monthly rate to get yearly rate
                quant: 1,
                quantVarRate: null,
                quantVarValue: null,
                quantUnit: null
            },

            // Alternative 1
            {
                bcnID: 2,
                altID: includePPA ? [1, 2] :[1],
                bcnType: "Cost",
                bcnSubType: "Direct",
                bcnName: "Net Grid Electricity Consumption",
                bcnTag: "Electricity",
                initialOcc: 1,
                bcnInvestBool: false,
                bcnLife: null,
                rvBool: false,
                recurBool: true,
                recurInterval: 1,
                recurVarRate: "Percent Delta Timestep X-1",
                recurVarValue: store.escalationRateFormStore.escalationRateForYear.length === 0 ?
                    null : store.escalationRateFormStore.escalationRateForYear,
                recurEndDate: studyPeriod,		// Study Period
                valuePerQ: store.electricalCostFormStore.electricUnitPrice, // Consumption Rate
                quant: store.electricalCostFormStore.annualConsumption ?? 0,
                quantVarRate: "Percent Delta Timestep X-1",
                quantVarValue: netGridConsumptionRates,
                quantUnit: "kWh"
            },
            {
                bcnID: 3,
                altID: [1],
                bcnType: "Cost",
                bcnSubType: "Direct",
                bcnName: "Net Panel Electricity Production",
                bcnTag: "Electricity",
                initialOcc: 1,
                bcnInvestBool: false,
                bcnLife: null,
                rvBool: false,
                recurBool: true,
                recurInterval: 1,
                recurVarRate: "Percent Delta Timestep X-1",
                recurVarValue: store.escalationRateFormStore.escalationRateForYear.length === 0 ?
                    null : store.escalationRateFormStore.escalationRateForYear,
                recurEndDate: studyPeriod,
                valuePerQ: store.electricalCostFormStore.excessGenerationUnitPrice,	//Excess Production Rate
                quant: store.solarSystemFormStore.estimatedAnnualProduction ?? 0,
                quantVarRate: "Percent Delta Timestep X-1",
                quantVarValue: netProductionRates,
                quantUnit: "kWh"
            },
            {
                bcnID: 4,
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
                recurVarRate: "Percent Delta Timestep X-1",
                recurVarValue: 0.0,
                recurEndDate: studyPeriod, // Study Period
                valuePerQ: store.electricalCostFormStore.pvGridConnectionRate, // PV Connection Fee
                quant: 1,
                quantVarRate: null,
                quantVarValue: null,
                quantUnit: null
            },
            {
                bcnID: 5,
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
                valuePerQ: store.costsFormStore.loanOrCash === CASH ?
                    store.costsFormStore.totalInstallationCosts : store.costsFormStore.downPayment,
                quant: 1,
                quantVarRate: null,
                quantVarValue: null,
                quantUnit: null
            },
            {
                bcnID: 6,
                altID: [1, 2],
                bcnType: "Cost",
                bcnSubType: "Direct",
                bcnName: "Total Installation Costs Residual Value",
                bcnTag: "Investment Costs",
                initialOcc: 0,
                bcnInvestBool: true,
                bcnLife: store.solarSystemFormStore.panelLifetime,
                rvBool: true,
                rvOnly: true,
                recurBool: false,
                recurInterval: null,
                recurVarRate: null,
                recurVarValue: null,
                recurEndDate: null,
                valuePerQ: store.costsFormStore.totalInstallationCosts,
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
                bcnName: "Federal Tax Credit",
                bcnTag: "Investment Costs",
                initialOcc: 0,
                bcnInvestBool: true,
                bcnLife: null,
                rvBool: false,
                recurBool: false,
                recurInterval: null,
                recurVarRate: null,
                recurVarValue: null,
                recurEndDate: null,
                valuePerQ: store.costsFormStore.federalTaxCredit,
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
                bcnName: "GrantsRebates",
                bcnTag: "Investment Costs",
                initialOcc: 0,
                bcnInvestBool: true,
                bcnLife: null,
                rvBool: false,
                recurBool: false,
                recurInterval: null,
                recurVarRate: null,
                recurVarValue: null,
                recurEndDate: null,
                valuePerQ: store.costsFormStore.stateOrLocalTaxCreditsOrGrantsOrRebates,
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
                bcnName: "Maintenance Costs",
                bcnTag: "Maintenance Costs",
                initialOcc: 1,
                bcnInvestBool: false,
                bcnLife: null,
                rvBool: false,
                recurBool: true,
                recurInterval: 1,
                recurVarRate: "Percent Delta Timestep X-1",
                recurVarValue: 0.0,
                recurEndDate: studyPeriod, // Study Period
                valuePerQ: store.costsFormStore.annualMaintenanceCosts,	// Maintenance Costs = 0 in this example
                quant: 1,
                quantVarRate: null,
                quantVarValue: null,
                quantUnit: null
            },
            ...ppaObjects.bcnObjects
        ]
    };
}

