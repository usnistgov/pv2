import {ApplicationStore} from "../ApplicationStore";

export function gridConsumption(store: ApplicationStore): object {
    return {
        bcnType: "Cost",
        bcnSubType: "Direct",
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
        recurEndDate: store.analysisAssumptionsFormStore.studyPeriod,
        valuePerQ: store.electricalCostFormStore.electricUnitPrice,
        quant: store.electricalCostFormStore.annualConsumption ?? 0,
        quantVarRate: null,
        quantVarValue: null,
        quantUnit: "kWh"
    }
}

export function gridDemandCharge(store: ApplicationStore): object {
    return {
        bcnType: "Cost",
        bcnSubType: "Direct",
        bcnTag: "Electricity",
        initialOcc: 1,
        bcnInvestBool: false,
        bcnLife: null,
        rvBool: false,
        recurBool: true,
        recurInterval: 1,
        recurVarRate: "Percent Delta Timestep X-1",
        recurVarValue: 0.0,
        recurEndDate: store.analysisAssumptionsFormStore.studyPeriod,
        valuePerQ: (store.electricalCostFormStore.monthlyFlatRateCharge ?? 0) * 12, // Multiply monthly rate to get yearly rate
        quant: 1,
        quantVarRate: null,
        quantVarValue: null,
        quantUnit: null
    }
}

export function netGridConsumption(store: ApplicationStore): object {
    const studyPeriod = store.analysisAssumptionsFormStore.studyPeriod;

    const annualConsumption = Array(studyPeriod + 1).fill(store.electricalCostFormStore.annualConsumption ?? 0);
    const annualProduction = Array(studyPeriod + 1).fill(store.solarSystemFormStore.estimatedAnnualProduction ?? 0)
        .map((value, index) => value * (1.0 - index * store.solarSystemFormStore.degradationRate));

    const netElectricity = annualConsumption.map((value, index) => value - annualProduction[index]);

    const netGridConsumptionRates = netElectricity.map((value) => Math.max(0, value))
        .map((value) => {
            if (value === 0)
                return 0;

            return (store.electricalCostFormStore.annualConsumption ?? 0) / value
        });

    return {
        bcnType: "Cost",
        bcnSubType: "Direct",
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
        recurEndDate: studyPeriod, // Study Period
        valuePerQ: store.electricalCostFormStore.electricUnitPrice, // Consumption Rate
        quant: store.electricalCostFormStore.annualConsumption ?? 0,
        quantVarRate: "Percent Delta Timestep X-1",
        quantVarValue: netGridConsumptionRates,
        quantUnit: "kWh"
    }
}

export function panelProduction(store: ApplicationStore): object {
    const studyPeriod = store.analysisAssumptionsFormStore.studyPeriod;

    const annualProduction = Array(studyPeriod + 1).fill(store.solarSystemFormStore.estimatedAnnualProduction ?? 0)
        .map((value, index) => value * (1.0 - index * store.solarSystemFormStore.degradationRate))
        .map((value) => {
            if (value === 0)
                return 0;

            return (store.solarSystemFormStore.estimatedAnnualProduction ?? 0) / value;
        });

    return {
        bcnType: "Cost",
        bcnSubType: "Direct",
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
        quantVarValue: annualProduction,
        quantUnit: "kWh"
    }
}

export function netPanelProduction(store: ApplicationStore): object {
    const studyPeriod = store.analysisAssumptionsFormStore.studyPeriod;

    const annualConsumption = Array(studyPeriod + 1).fill(store.electricalCostFormStore.annualConsumption ?? 0);
    const annualProduction = Array(studyPeriod + 1).fill(store.solarSystemFormStore.estimatedAnnualProduction ?? 0)
        .map((value, index) => value * (1.0 - index * store.solarSystemFormStore.degradationRate));

    const netElectricity = annualConsumption.map((value, index) => value - annualProduction[index]);

    const netProductionRates = netElectricity.map((value) => Math.min(value, 0))
        .map((value) => {
            if (value === 0)
                return 0;

            return (store.solarSystemFormStore.estimatedAnnualProduction ?? 0) / value;
        });

    return {
        bcnType: "Cost",
        bcnSubType: "Direct",
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
    }
}

export function pvGridConnectionRate(store: ApplicationStore): object {
    return {
        bcnType: "Cost",
        bcnSubType: "Direct",
        bcnTag: "Electricity",
        initialOcc: 1,
        bcnInvestBool: false,
        bcnLife: null,
        rvBool: false,
        recurBool: true,
        recurInterval: 1,
        recurVarRate: "Percent Delta Timestep X-1",
        recurVarValue: 0.0,
        recurEndDate: store.analysisAssumptionsFormStore.studyPeriod, // Study Period
        valuePerQ: store.electricalCostFormStore.pvGridConnectionRate, // PV Connection Fee
        quant: 1,
        quantVarRate: null,
        quantVarValue: null,
        quantUnit: null
    }
}

export function totalInstallationCosts(store: ApplicationStore): object {
    return {
        bcnType: "Cost",
        bcnSubType: "Direct",
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
        valuePerQ: store.costsFormStore.totalInstallationCosts,
        quant: 1,
        quantVarRate: null,
        quantVarValue: null,
        quantUnit: null
    }
}

export function totalInstallationCostsResidualValue(store: ApplicationStore): object {
    return {
        bcnType: "Cost",
        bcnSubType: "Direct",
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
    }
}

export function loanDownPayment(store: ApplicationStore): object {
    return {
        bcnType: "Cost",
        bcnSubType: "Direct",
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
        valuePerQ: store.costsFormStore.downPayment,
        quant: 1,
        quantVarRate: null,
        quantVarValue: null,
        quantUnit: null
    }
}

export function loanPayoff(store: ApplicationStore): object {
    return {
        bcnType: "Cost",
        bcnSubType: "Direct",
        bcnTag: "Investment Costs",
        initialOcc: 0,
        bcnInvestBool: true,
        bcnLife: null,
        rvBool: true,
        rvOnly: false,
        recurBool: true,
        recurInterval: 1,
        recurVarRate: null,
        recurVarValue: null,
        recurEndDate: store.costsFormStore.loanLength,
        valuePerQ: store.costsFormStore.monthlyPayment ?? 0,
        quant: 1,
        quantVarRate: null,
        quantVarValue: null,
        quantUnit: null
    }
}

export function federalTaxCredit(store: ApplicationStore): object {
    return {
        bcnType: "Cost",
        bcnSubType: "Direct",
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
    }
}

export function grantsRebates(store: ApplicationStore): object {
    return {
        bcnType: "Cost",
        bcnSubType: "Direct",
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
    }
}

export function maintenanceCosts(store: ApplicationStore): object {
    return {
        bcnType: "Cost",
        bcnSubType: "Direct",
        bcnTag: "Maintenance Costs",
        initialOcc: 1,
        bcnInvestBool: false,
        bcnLife: null,
        rvBool: false,
        recurBool: true,
        recurInterval: 1,
        recurVarRate: "Percent Delta Timestep X-1",
        recurVarValue: 0.0,
        recurEndDate: store.analysisAssumptionsFormStore.studyPeriod, // Study Period
        valuePerQ: store.costsFormStore.annualMaintenanceCosts,	// Maintenance Costs = 0 in this example
        quant: 1,
        quantVarRate: null,
        quantVarValue: null,
        quantUnit: null
    }
}

export function ppaConsumption(store: ApplicationStore): object {
    const studyPeriod = store.analysisAssumptionsFormStore.studyPeriod;

    const annualConsumption = Array(studyPeriod + 1).fill(store.electricalCostFormStore.annualConsumption ?? 0)
    const annualProduction = Array(studyPeriod + 1).fill(store.solarSystemFormStore.estimatedAnnualProduction ?? 0)
        .map((value, index) => value * (1.0 - index * store.solarSystemFormStore.degradationRate))

    const netElectricity = annualConsumption.map((value, index) => value - annualProduction[index])

    const netProductionRates = netElectricity.map((value) => Math.min(value, 0))
        .map((value) => {
            if (value === 0)
                return 0;

            return (store.solarSystemFormStore.estimatedAnnualProduction ?? 0) / value
        });

    return {
        bcnType: "Cost",
        bcnSubType: "Direct",
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
    }
}

export function ppaSystemPurchasePrice(store: ApplicationStore): object {
    return {
        bcnType: "Cost",
        bcnSubType: "Direct",
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
}

export function upfrontSrec(store: ApplicationStore): object {
    return {
        bcnType: "Cost",
        bcnSubType: "Direct",
        bcnTag: "SREC",
        initialOcc: 0,
        bcnInvestBool: true,
        bcnLife: null,
        rvBool: false,
        recurBool: false,
        recurInterval: null,
        recurVarRate: null,
        recurVarValue: null,
        recurEndDate: null,
        valuePerQ: store.srecFormStore.srecPaymentsUpFront ?? 0,
        quant: store.solarSystemFormStore.totalSystemSize,
        quantVarRate: null,
        quantVarValue: null,
        quantUnit: null
    }
}

export function productionBasedSrec(store: ApplicationStore): object {
    const studyPeriod = store.analysisAssumptionsFormStore.studyPeriod;

    const annualProduction = Array(studyPeriod + 1).fill(store.solarSystemFormStore.estimatedAnnualProduction ?? 0)
        .map((value, index) => value * (1.0 - index * store.solarSystemFormStore.degradationRate))
        .map((value) => {
            if (value === 0)
                return 0;

            return ((store.solarSystemFormStore.estimatedAnnualProduction ?? 0) / 1000) / (value / 1000);
        });

    const srecPaymentRates = store.srecFormStore.srecPaymentsProductionBased
        .filter((_, index) => index < store.srecFormStore.srecContractLength)
        .map((value, index) => {
            if (index === 0)
                return 0;

            return store.srecFormStore.srecPaymentsProductionBased[0] / value;
        });

    return {
        bcnType: "Cost",
        bcnSubType: "Direct",
        bcnTag: "SREC",
        initialOcc: 1,
        bcnInvestBool: true,
        bcnLife: null,
        rvBool: false,
        recurBool: true,
        recurInterval: 1,
        recurVarRate: "Percent Delta Timestep X-1",
        recurVarValue: srecPaymentRates,
        recurEndDate: store.srecFormStore.srecContractLength,
        valuePerQ: store.srecFormStore.srecPaymentsProductionBased[0],
        quant: (store.solarSystemFormStore.estimatedAnnualProduction ?? 0) / 1000, // Divide by 1000 to get MWh.
        quantVarRate: "Percent Delta Timestep X-1",
        quantVarValue: annualProduction,
        quantUnit: null
    }
}

export function productionBasedSrecAfterPpa(store: ApplicationStore): object {
    const studyPeriod = store.analysisAssumptionsFormStore.studyPeriod;

    const annualProduction = Array(studyPeriod + 1).fill(store.solarSystemFormStore.estimatedAnnualProduction ?? 0)
        .map((value, index) => value * (1.0 - index * store.solarSystemFormStore.degradationRate))
        .map((value) => {
            if (value === 0)
                return 0;

            return ((store.solarSystemFormStore.estimatedAnnualProduction ?? 0) / 1000) / (value / 1000);
        });

    const srecPaymentRates = store.srecFormStore.srecPaymentsProductionBased
        .filter((_, index) => index < store.srecFormStore.srecContractLength)
        .map((value) => {
            if (value === 0)
                return 0;

            return store.srecFormStore.srecPaymentsProductionBased[0] / value;
        });

    return {
        bcnType: "Cost",
        bcnSubType: "Direct",
        bcnTag: "SREC",
        initialOcc: store.costsFormStore.ppaContractLength,
        bcnInvestBool: true,
        bcnLife: null,
        rvBool: false,
        recurBool: true,
        recurInterval: 1,
        recurVarRate: "Percent Delta Timestep X-1",
        recurVarValue: srecPaymentRates,
        recurEndDate: store.srecFormStore.srecContractLength,
        valuePerQ: store.srecFormStore.srecPaymentsProductionBased[0],
        quant: (store.solarSystemFormStore.estimatedAnnualProduction ?? 0) / 1000, // Divide by 1000 to get MWh.
        quantVarRate: "Percent Delta Timestep X-1",
        quantVarValue: annualProduction,
        quantUnit: null
    }
}
