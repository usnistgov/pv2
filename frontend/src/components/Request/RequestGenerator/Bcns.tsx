import {ApplicationStore, store} from "../../../application/ApplicationStore";
import {generateVarValue} from "../../../Utils";
import {DEGRADATION_RATE, GENERAL_INFLATION, INVERTER_LIFETIME, PANEL_LIFETIME, STUDY_PERIOD} from "../../../Defaults";
import {getAnnualConsumption} from "./E3RequestGenerator";
import solarSystemForm from "../../../application/pages/SolarSystemForm/SolarSystemForm";

function annualProduction(store: ApplicationStore): number[] {
    const degradationRate = store.solarSystemFormStore.degradationRate ?? DEGRADATION_RATE;
    const studyPeriod = store.analysisAssumptionsFormStore.studyPeriod ?? STUDY_PERIOD;
    const panelLifetime = store.solarSystemFormStore.panelLifetime ?? PANEL_LIFETIME;

    return Array(studyPeriod + 1)
        .fill(store.solarSystemFormStore.estimatedAnnualProduction ?? 0)
        .map((value, index) => {
            const modifier = index - (panelLifetime + 1) < 0 ? index : (index - panelLifetime - 1) % panelLifetime;
            return value * (1.0 - modifier * (degradationRate / 100))
        })
}

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
        quant: getAnnualConsumption(store),
        quantVarRate: null,
        quantVarValue: null,
        quantUnit: "kWh"
    }
}

export function gridDemandCharge(store: ApplicationStore): object {
    return {
        bcnType: "Cost",
        bcnSubType: "Direct",
        bcnTag: null,
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
    const studyPeriod = store.analysisAssumptionsFormStore.studyPeriod ?? STUDY_PERIOD;

    const annualConsumption = Array(studyPeriod + 1).fill(getAnnualConsumption(store));
    const production = annualProduction(store);

    const netElectricity = annualConsumption.map((value, index) => value - production[index]);

    const netGridConsumptionRates = generateVarValue(
        netElectricity.map((value) => Math.max(0, value)),
        getAnnualConsumption(store)
    );

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
        quant: getAnnualConsumption(store),
        quantVarRate: "Percent Delta Timestep X-1",
        quantVarValue: netGridConsumptionRates,
        quantUnit: "kWh"
    }
}

export function panelProduction(store: ApplicationStore): object {
    const studyPeriod = store.analysisAssumptionsFormStore.studyPeriod ?? STUDY_PERIOD;

    const production = generateVarValue(
        annualProduction(store),
        store.solarSystemFormStore.estimatedAnnualProduction ?? 0
    );

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
        valuePerQ: store.electricalCostFormStore.excessGenerationUnitPrice ?? 0, //Excess Production Rate
        quant: -(store.solarSystemFormStore.estimatedAnnualProduction ?? 0),
        quantVarRate: "Percent Delta Timestep X-1",
        quantVarValue: production,
        quantUnit: "kWh"
    }
}

export function netPanelProduction(store: ApplicationStore): object {
    const studyPeriod = store.analysisAssumptionsFormStore.studyPeriod ?? STUDY_PERIOD;

    const annualConsumption = Array(studyPeriod + 1).fill(getAnnualConsumption(store));
    const production = annualProduction(store);

    const netElectricity = annualConsumption.map((value, index) => value - production[index]);

    const netProductionRates = generateVarValue(
        netElectricity.map((value) => Math.min(value, 0)),
        -(store.solarSystemFormStore.estimatedAnnualProduction ?? 0)
    );

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
        valuePerQ: store.electricalCostFormStore.excessGenerationUnitPrice ?? 0, //Excess Production Rate
        quant: -(store.solarSystemFormStore.estimatedAnnualProduction ?? 0),
        quantVarRate: "Percent Delta Timestep X-1",
        quantVarValue: netProductionRates,
        quantUnit: "kWh"
    }
}

export function pvGridConnectionRate(store: ApplicationStore): object {
    return {
        bcnType: "Cost",
        bcnSubType: "Direct",
        bcnTag: null,
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
        bcnTag: "Installation Costs",
        initialOcc: 0,
        bcnInvestBool: true,
        bcnLife: store.solarSystemFormStore.panelLifetime,
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

export function panelReplacement(store: ApplicationStore): object {
    return {
        bcnType: "Cost",
        bcnSubType: "Direct",
        bcnTag: "System Replacement Costs",
        initialOcc: (store.solarSystemFormStore.panelLifetime ?? 25) + 1,
        bcnInvestBool: true,
        bcnLife: store.solarSystemFormStore.panelLifetime,
        rvBool: true,
        recurBool: true,
        recurInterval: store.solarSystemFormStore.panelLifetime,
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

export function panelReplacementAfterPPA(store: ApplicationStore): object {
    const panelLifetime = store.solarSystemFormStore.panelLifetime ?? PANEL_LIFETIME;
    const ppaEnd = store.costsFormStore.ppaContractLength ?? 10;

    return {
        bcnType: "Cost",
        bcnSubType: "Direct",
        bcnTag: "System Replacement Costs",
        initialOcc: Math.ceil(ppaEnd / panelLifetime) * panelLifetime + 1,
        bcnInvestBool: true,
        bcnLife: store.solarSystemFormStore.panelLifetime,
        rvBool: true,
        recurBool: true,
        recurInterval: store.solarSystemFormStore.panelLifetime,
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
    const studyPeriod = store.analysisAssumptionsFormStore.studyPeriod ?? 25;
    const panelLifetime = store.solarSystemFormStore.panelLifetime ?? 25;

    return {
        bcnType: "Cost",
        bcnSubType: "Direct",
        bcnTag: "Resale Value",
        initialOcc: 0,
        bcnInvestBool: true,
        bcnLife: store.solarSystemFormStore.panelLifetime,
        rvBool: true,
        rvOnly: true,
        recurBool: true,
        recurInterval: store.solarSystemFormStore.panelLifetime,
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

export function inverterReplacement(store: ApplicationStore): object[] {
    const studyPeriod = store.analysisAssumptionsFormStore.studyPeriod ?? STUDY_PERIOD;
    const panelLifetime = store.solarSystemFormStore.panelLifetime ?? PANEL_LIFETIME;
    const inverterLifetime = store.solarSystemFormStore.inverterLifetimeOrDefault ?? INVERTER_LIFETIME;

    const result: object[] = [];

    for (let i = 0; i < studyPeriod / panelLifetime; i++) {
        result.push({
            bcnType: "Cost",
            bcnSubType: "Direct",
            bcnTag: "Inverter Replacement Costs",
            initialOcc: i === 0 ? inverterLifetime + 1 : i * panelLifetime + inverterLifetime + 1,
            bcnInvestBool: false,
            bcnLife: store.solarSystemFormStore.inverterLifetimeOrDefault,
            rvBool: false,
            rvOnly: false,
            recurBool: true,
            recurInterval: store.solarSystemFormStore.inverterLifetimeOrDefault,
            recurVarRate: null,
            recurVarValue: null,
            recurEndDate: (i + 1) * panelLifetime + 1,
            valuePerQ: parseFloat(store.costsFormStore.inverterReplacementCostsOrDefault?.toString() ?? '0'),
            quant: 1,
            quantVarRate: null,
            quantVarValue: null,
            quantUnit: null
        })
    }

    return result;
}

export function inverterReplacementResidualValue(store: ApplicationStore): object {
    const studyPeriod = store.analysisAssumptionsFormStore.studyPeriod ?? STUDY_PERIOD;
    const panelLifetime = store.solarSystemFormStore.panelLifetime ?? PANEL_LIFETIME;
    const inverterLifetime = store.solarSystemFormStore.inverterLifetimeOrDefault ?? INVERTER_LIFETIME;

    const index = Math.ceil(studyPeriod / panelLifetime) - 1;

    return {
        bcnType: "Cost",
        bcnSubType: "Direct",
        bcnTag: "Resale Value",
        initialOcc: index === 0 ? inverterLifetime + 1 : index * panelLifetime + inverterLifetime + 1,
        bcnInvestBool: false,
        bcnLife: store.solarSystemFormStore.inverterLifetimeOrDefault,
        rvBool: true,
        rvOnly: true,
        recurBool: true,
        recurInterval: store.solarSystemFormStore.inverterLifetimeOrDefault,
        recurVarRate: null,
        recurVarValue: null,
        recurEndDate: (index + 1) * panelLifetime + 1,
        valuePerQ: parseFloat(store.costsFormStore.inverterReplacementCostsOrDefault?.toString() ?? '0'),
        quant: 1,
        quantVarRate: null,
        quantVarValue: null,
        quantUnit: null
    };
}

export function loanDownPayment(store: ApplicationStore): object {
    return {
        bcnType: "Cost",
        bcnSubType: "Direct",
        bcnTag: "Loan Down Payment",
        initialOcc: 0,
        bcnInvestBool: true,
        bcnLife: 25,
        rvBool: false,
        recurBool: false,
        recurInterval: null,
        recurVarRate: null,
        recurVarValue: null,
        recurEndDate: null,
        valuePerQ: store.costsFormStore.downPayment ?? 0,
        quant: 1,
        quantVarRate: null,
        quantVarValue: null,
        quantUnit: null
    }
}

export function loanPayoff(store: ApplicationStore): object {
    let generalInflation = store.analysisAssumptionsFormStore.generalInflation ?? GENERAL_INFLATION;

    let studyPeriod = store.analysisAssumptionsFormStore.studyPeriod ?? STUDY_PERIOD;
    let yearlyAmount = (store.costsFormStore.monthlyPayment ?? 0) * 12;
    let loanLength = store.costsFormStore.loanLength ?? 1
    let length = studyPeriod <= loanLength ? studyPeriod : loanLength;

    let payments = Array(studyPeriod + 1).fill(0);
    for (let i = 1; i <= length; i++) {
        payments[i] = yearlyAmount / Math.pow(1 + (generalInflation / 100), i);
    }
    let rates = payments.map((value) => value / yearlyAmount);


    return {
        bcnType: "Cost",
        bcnSubType: "Direct",
        bcnTag: "Future Loan Payments",
        initialOcc: 1,
        bcnInvestBool: false,
        bcnLife: null,
        rvBool: false,
        rvOnly: false,
        recurBool: true,
        recurInterval: 1,
        recurVarRate: "Year by Year",
        recurVarValue: rates,
        recurEndDate: store.costsFormStore.loanLength ?? 1,
        valuePerQ: yearlyAmount,
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
        bcnTag: "Upfront Financial Incentives",
        initialOcc: 0,
        bcnInvestBool: true,
        bcnLife: null,
        rvBool: false,
        recurBool: false,
        recurInterval: null,
        recurVarRate: null,
        recurVarValue: null,
        recurEndDate: null,
        valuePerQ: -store.costsFormStore.federalTaxCredit,
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
        bcnTag: "Upfront Financial Incentives",
        initialOcc: 0,
        bcnInvestBool: true,
        bcnLife: null,
        rvBool: false,
        recurBool: false,
        recurInterval: null,
        recurVarRate: null,
        recurVarValue: null,
        recurEndDate: null,
        valuePerQ: -(store.costsFormStore.stateOrLocalTaxCreditsOrGrantsOrRebates ?? 0),
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
    const netProductionRates = generateVarValue(
        annualProduction(store),
        store.solarSystemFormStore.estimatedAnnualProduction ?? 0
    );

    return {
        bcnType: "Cost",
        bcnSubType: "Direct",
        bcnTag: null,
        initialOcc: 1,
        bcnInvestBool: false,
        bcnLife: null,
        rvBool: false,
        recurBool: true,
        recurInterval: 1,
        recurVarRate: "Percent Delta Timestep X-1",
        recurVarValue: (store.costsFormStore.ppaEscalationRate ?? 0) / 100, // Escalation Rate List or Constant Value for PPA
        recurEndDate: store.costsFormStore.ppaContractLength, // PPA contract length
        valuePerQ: store.costsFormStore.ppaElectricityRate, // PPA Rate
        quant: store.solarSystemFormStore.estimatedAnnualProduction ?? 0, //  = Annual Production
        quantVarRate: "Percent Delta Timestep X-1",
        quantVarValue: netProductionRates, 	//  0.05% degradation rate per year
        quantUnit: "kWh"
    }
}

export function ppaSystemPurchasePrice(store: ApplicationStore): object {
    return {
        bcnType: "Cost",
        bcnSubType: "Direct",
        bcnTag: "Future Purchase Costs",
        initialOcc: (store.costsFormStore.ppaContractLength ?? 0) + 1, // End of PPA contract
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
        valuePerQ: -(store.srecFormStore.srecPaymentsUpFront ?? 0),
        quant: (store.solarSystemFormStore.totalSystemSize ?? 0) / 1000,
        quantVarRate: null,
        quantVarValue: null,
        quantUnit: null
    }
}

export function productionBasedSrec(store: ApplicationStore): object {
    const production = generateVarValue(
        annualProduction(store).map((value) => value / 1000),
        (store.solarSystemFormStore.estimatedAnnualProduction ?? 0) / 1000
    );

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
        recurVarRate: "Year by Year",
        recurVarValue: store.srecFormStore.srecPaymentsProductionBased,
        recurEndDate: store.srecFormStore.srecContractLength,
        valuePerQ: -1,
        quant: (store.solarSystemFormStore.estimatedAnnualProduction ?? 0) / 1000, // Divide by 1000 to get MWh.
        quantVarRate: "Percent Delta Timestep X-1",
        quantVarValue: production,
        quantUnit: null
    }
}

export function maintenanceCostsAfterPpa(store: ApplicationStore): object {
    const studyPeriod = store.analysisAssumptionsFormStore.studyPeriod ?? STUDY_PERIOD;

    return {
        bcnType: "Cost",
        bcnSubType: "Direct",
        bcnTag: "Maintenance Costs",
        initialOcc: (store.costsFormStore.ppaContractLength ?? studyPeriod) + 1,
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

export function productionBasedSrecAfterPpa(store: ApplicationStore): object {
    const studyPeriod = store.analysisAssumptionsFormStore.studyPeriod ?? STUDY_PERIOD;

    const production = generateVarValue(
        annualProduction(store).map((value) => value / 1000),
        (store.solarSystemFormStore.estimatedAnnualProduction ?? 0) / 1000
    );

    return {
        bcnType: "Cost",
        bcnSubType: "Direct",
        bcnTag: "SREC",
        initialOcc: (store.costsFormStore.ppaContractLength ?? studyPeriod) + 1,
        bcnInvestBool: true,
        bcnLife: null,
        rvBool: false,
        recurBool: true,
        recurInterval: 1,
        recurVarRate: "Year by Year",
        recurVarValue: store.srecFormStore.srecPaymentsProductionBased,
        recurEndDate: store.srecFormStore.srecContractLength,
        valuePerQ: -1,
        quant: (store.solarSystemFormStore.estimatedAnnualProduction ?? 0) / 1000, // Divide by 1000 to get MWh.
        quantVarRate: "Percent Delta Timestep X-1",
        quantVarValue: production,
        quantUnit: null
    }
}

export function inverterReplacementAfterPpa(store: ApplicationStore): object[] {
    const panelLifetime = store.solarSystemFormStore.panelLifetime ?? PANEL_LIFETIME;
    const studyPeriod = store.analysisAssumptionsFormStore.studyPeriod ?? STUDY_PERIOD;
    const inverterLifetime = store.solarSystemFormStore.inverterLifetime ?? INVERTER_LIFETIME;

    const ppaEnd = store.costsFormStore.ppaContractLength ?? 10;

    const result: object[] = [];

    //Calculate first replacement after PPA ends
    const initialOccurrence = Math.ceil(ppaEnd / inverterLifetime) * inverterLifetime;

    const skipped = Math.floor(ppaEnd / panelLifetime);

    for (let i = 0; i < Math.ceil(studyPeriod / panelLifetime) - skipped; i++) {
        result.push({
            bcnType: "Cost",
            bcnSubType: "Direct",
            bcnTag: "Inverter Replacement Costs",
            initialOcc: i === 0 ? initialOccurrence + 1 : ((i + skipped) * panelLifetime) + inverterLifetime + 1,
            bcnInvestBool: false,
            bcnLife: store.solarSystemFormStore.inverterLifetimeOrDefault,
            rvBool: false,
            rvOnly: false,
            recurBool: true,
            recurInterval: store.solarSystemFormStore.inverterLifetimeOrDefault,
            recurVarRate: null,
            recurVarValue: null,
            recurEndDate: ((i + skipped + 1) * panelLifetime) + 1,
            valuePerQ: parseFloat(store.costsFormStore.inverterReplacementCostsOrDefault?.toString() ?? '0'),
            quant: 1,
            quantVarRate: null,
            quantVarValue: null,
            quantUnit: null
        })
    }

    return result;
}

export function acidificationPotentialConsumption(store: ApplicationStore): object {
    const studyPeriod = store.analysisAssumptionsFormStore.studyPeriod ?? STUDY_PERIOD;
    const acidificationPotential = store.analysisAssumptionsFormStore.environmentalVariables?.acidificationPotential ?? 0;

    const annualConsumption = Array(studyPeriod + 1).fill(getAnnualConsumption(store));
    const production = annualProduction(store);

    const netAcidification = annualConsumption.map((value, index) => value - production[index])
        .map((value) => value * (acidificationPotential / 1000));

    const netAcidificationRates = generateVarValue(
        netAcidification.map((value) => Math.max(0, value)),
        getAnnualConsumption(store)
    );

    return {
        bcnType: "Non-Monetary",
        bcnSubType: "Direct",
        bcnTag: "LCIA-Acidification-Potential",
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
        quant: getAnnualConsumption(store),
        quantVarRate: "Percent Delta Timestep X-1",
        quantVarValue: netAcidificationRates,
        quantUnit: "kg"
    }
}

export function acidificationPotentialProduction(store: ApplicationStore): object {
    const studyPeriod = store.analysisAssumptionsFormStore.studyPeriod ?? STUDY_PERIOD;
    const acidificationPotential = store.analysisAssumptionsFormStore.environmentalVariables?.acidificationPotential ?? 0;

    const annualConsumption = Array(studyPeriod + 1).fill(getAnnualConsumption(store));
    const production = annualProduction(store);

    const netAcidification = annualConsumption.map((value, index) => value - production[index])
        .map((value) => value * (acidificationPotential / 1000));

    const netAcidificationRates = generateVarValue(
        netAcidification.map((value) => Math.min(value, 0)),
        -(store.solarSystemFormStore.estimatedAnnualProduction ?? 0)
    );

    return {
        bcnType: "Non-Monetary",
        bcnSubType: "Direct",
        bcnTag: "LCIA-Acidification-Potential",
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
        quant: -(store.solarSystemFormStore.estimatedAnnualProduction ?? 0),
        quantVarRate: "Percent Delta Timestep X-1",
        quantVarValue: netAcidificationRates,
        quantUnit: "kg"
    }
}

export function globalWarmingPotentialBaseline(store: ApplicationStore): object {
    const globalWarmingPotential = store.analysisAssumptionsFormStore.environmentalVariables?.globalWarmingPotential ?? 0;

    return {
        bcnType: "Non-Monetary",
        bcnSubType: "Direct",
        bcnTag: "LCIA-Global-Warming-Potential",
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
        valuePerQ: 1,
        quant: (getAnnualConsumption(store)) * (globalWarmingPotential / 1000),
        quantVarRate: null,
        quantVarValue: null,
        quantUnit: "kg"
    }
}

export function globalWarmingPotentialConsumption(store: ApplicationStore): object {
    const studyPeriod = store.analysisAssumptionsFormStore.studyPeriod ?? STUDY_PERIOD;
    const globalWarmingPotential = store.analysisAssumptionsFormStore.environmentalVariables?.globalWarmingPotential ?? 0;

    const annualConsumption = Array(studyPeriod + 1).fill(getAnnualConsumption(store));
    const production = annualProduction(store);

    const netGlobalWarmingPotential = annualConsumption.map((value, index) => value - production[index])
        .map((value) => value * (globalWarmingPotential / 1000));

    const netGlobalWarmingPotentialRates = generateVarValue(
        netGlobalWarmingPotential.map((value) => Math.max(0, value)),
        getAnnualConsumption(store)
    );

    return {
        bcnType: "Non-Monetary",
        bcnSubType: "Direct",
        bcnTag: "LCIA-Global-Warming-Potential",
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
        quant: getAnnualConsumption(store),
        quantVarRate: "Percent Delta Timestep X-1",
        quantVarValue: netGlobalWarmingPotentialRates,
        quantUnit: "kg"
    }
}

export function globalWarmingPotentialProduction(store: ApplicationStore): object {
    const studyPeriod = store.analysisAssumptionsFormStore.studyPeriod ?? STUDY_PERIOD;
    const globalWarmingPotential = store.analysisAssumptionsFormStore.environmentalVariables?.globalWarmingPotential ?? 0;

    const annualConsumption = Array(studyPeriod + 1).fill(getAnnualConsumption(store));
    const production = annualProduction(store);

    const netGlobalWarmingotential = annualConsumption.map((value, index) => value - production[index])
        .map((value) => value * (globalWarmingPotential / 1000));

    const netGlobalWarmingPotentialRates = generateVarValue(
        netGlobalWarmingotential.map((value) => Math.min(value, 0)),
        -(store.solarSystemFormStore.estimatedAnnualProduction ?? 0)
    );

    return {
        bcnType: "Non-Monetary",
        bcnSubType: "Direct",
        bcnTag: "LCIA-Global-Warming-Potential",
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
        quant: -(store.solarSystemFormStore.estimatedAnnualProduction ?? 0),
        quantVarRate: "Percent Delta Timestep X-1",
        quantVarValue: netGlobalWarmingPotentialRates,
        quantUnit: "kg"
    }
}