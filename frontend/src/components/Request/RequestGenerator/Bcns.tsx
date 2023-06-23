import {ApplicationStore} from "../../../application/ApplicationStore";
import {DEGRADATION_RATE, GENERAL_INFLATION, INVERTER_LIFETIME, PANEL_LIFETIME, STUDY_PERIOD} from "../../../Defaults";
import {getAnnualConsumption} from "./E3RequestGenerator";
import {BcnBuilder, BcnSubType, BcnType, RecurBuilder, VarRate} from "e3-sdk";
import "../../../Extensions";

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

export function gridConsumption(store: ApplicationStore): BcnBuilder {
    const recurBuilder = new RecurBuilder()
        .interval(1)
        .varRate(VarRate.PERCENT_DELTA)
        .addEscalationRateForYear(store)
        .end(store.analysisAssumptionsFormStore.studyPeriod ?? 25);

    return new BcnBuilder()
        .name("Grid Electricity Consumption")
        .type(BcnType.COST)
        .subType(BcnSubType.DIRECT)
        .addTag("Electricity")
        .initialOccurrence(1)
        .recur(recurBuilder)
        .quantityValue(store.electricalCostFormStore.electricUnitPrice ?? 1)
        .quantity(getAnnualConsumption(store))
        .quantityUnit("kWh");
}

export function gridDemandCharge(store: ApplicationStore): BcnBuilder {
    const recurBuilder = new RecurBuilder()
        .interval(1)
        .varRate(VarRate.PERCENT_DELTA)
        .varValue([0.0])
        .end(store.analysisAssumptionsFormStore.studyPeriod ?? 25);

    return new BcnBuilder()
        .name("Grid Electricity Demand Charge")
        .type(BcnType.COST)
        .subType(BcnSubType.DIRECT)
        .initialOccurrence(1)
        .recur(recurBuilder)
        .quantityValue((store.electricalCostFormStore.monthlyFlatRateCharge ?? 0) * 12)
        .quantity(1);
}

export function netGridConsumption(store: ApplicationStore): BcnBuilder {
    const studyPeriod = store.analysisAssumptionsFormStore.studyPeriod ?? STUDY_PERIOD;

    const annualConsumption = Array(studyPeriod + 1).fill(getAnnualConsumption(store));
    const production = annualProduction(store);

    const netElectricity = annualConsumption.map((value, index) => value - production[index]);

    const recurBuilder = new RecurBuilder()
        .interval(1)
        .varRate(VarRate.PERCENT_DELTA)
        .addEscalationRateForYear(store)
        .end(studyPeriod);

    return new BcnBuilder()
        .name("Net Grid Electricity Consumption")
        .type(BcnType.COST)
        .subType(BcnSubType.DIRECT)
        .addTag("Electricity")
        .initialOccurrence(1)
        .recur(recurBuilder)
        .quantityValue(store.electricalCostFormStore.electricUnitPrice ?? 1)
        .quantity(getAnnualConsumption(store))
        .quantityVarRate(VarRate.YEAR_BY_YEAR)
        .quantityVarValue(netElectricity.map(value => Math.max(0, value) / getAnnualConsumption(store)))
        .quantityUnit("kWh");
}

export function panelProduction(store: ApplicationStore): BcnBuilder {
    const studyPeriod = store.analysisAssumptionsFormStore.studyPeriod ?? STUDY_PERIOD;

    const recurBuilder = new RecurBuilder()
        .interval(1)
        .varRate(VarRate.PERCENT_DELTA)
        .addEscalationRateForYear(store)
        .end(studyPeriod);

    return new BcnBuilder()
        .name("Panel Electricity Production")
        .type(BcnType.COST)
        .subType(BcnSubType.DIRECT)
        .addTag("Electricity")
        .initialOccurrence(1)
        .recur(recurBuilder)
        .quantityValue(store.electricalCostFormStore.excessGenerationUnitPrice ?? 0)
        .quantity(-(store.solarSystemFormStore.estimatedAnnualProduction ?? 0))
        .quantityVarRate(VarRate.YEAR_BY_YEAR)
        .quantityVarValue(annualProduction(store).map(x => x / (store.solarSystemFormStore.estimatedAnnualProduction ?? 1)))
        .quantityUnit("kWh");
}

export function netPanelProduction(store: ApplicationStore): BcnBuilder {
    const studyPeriod = store.analysisAssumptionsFormStore.studyPeriod ?? STUDY_PERIOD;

    const annualConsumption = Array(studyPeriod + 1).fill(getAnnualConsumption(store));
    const production = annualProduction(store);

    const netElectricity = annualConsumption.map((value, index) => value - production[index]);

    const recurBuilder = new RecurBuilder()
        .interval(1)
        .varRate(VarRate.PERCENT_DELTA)
        .addEscalationRateForYear(store)
        .end(studyPeriod);

    return new BcnBuilder()
        .name("Net Panel Electricity Production")
        .type(BcnType.COST)
        .subType(BcnSubType.DIRECT)
        .addTag("Electricity")
        .initialOccurrence(1)
        .recur(recurBuilder)
        .quantityValue(store.electricalCostFormStore.excessGenerationUnitPrice ?? 0)
        .quantity(-(store.solarSystemFormStore.estimatedAnnualProduction ?? 0))
        .quantityVarRate(VarRate.YEAR_BY_YEAR)
        .quantityVarValue(netElectricity.map(
            value => Math.min(value, 0) / -(store.solarSystemFormStore.estimatedAnnualProduction ?? 1)
        ))
        .quantityUnit("kWh");
}

export function pvGridConnectionRate(store: ApplicationStore): BcnBuilder {
    const recurBuilder = new RecurBuilder()
        .interval(1)
        .varRate(VarRate.PERCENT_DELTA)
        .varValue([0.0])
        .end(store.analysisAssumptionsFormStore.studyPeriod ?? 25);

    return new BcnBuilder()
        .name("PV Grid Connection Fee")
        .type(BcnType.COST)
        .subType(BcnSubType.DIRECT)
        .initialOccurrence(1)
        .recur(recurBuilder)
        .quantityValue(store.electricalCostFormStore.pvGridConnectionRate ?? 1)
        .quantity(1);
}

export function totalInstallationCosts(store: ApplicationStore): BcnBuilder {
    return new BcnBuilder()
        .name("Total Installation Costs")
        .type(BcnType.COST)
        .subType(BcnSubType.DIRECT)
        .addTag("Installation Costs")
        .invest()
        .initialOccurrence(0)
        .life(store.solarSystemFormStore.panelLifetime ?? 0)
        .quantityValue(store.costsFormStore.totalInstallationCosts ?? 1)
        .quantity(1);
}

export function panelReplacement(store: ApplicationStore): BcnBuilder {
    const recurBuilder = new RecurBuilder()
        .interval(store.solarSystemFormStore.panelLifetime ?? 1);

    return new BcnBuilder()
        .name("Panel replacement")
        .type(BcnType.COST)
        .subType(BcnSubType.DIRECT)
        .addTag("System Replacement Costs")
        .initialOccurrence((store.solarSystemFormStore.panelLifetime ?? 25) + 1)
        .invest()
        .residualValue()
        .life(store.solarSystemFormStore.panelLifetime ?? 1)
        .recur(recurBuilder)
        .quantityValue(store.costsFormStore.totalInstallationCosts ?? 1)
        .quantity(1);
}

export function panelReplacementAfterPPA(store: ApplicationStore): BcnBuilder {
    const panelLifetime = store.solarSystemFormStore.panelLifetime ?? PANEL_LIFETIME;
    const ppaEnd = store.costsFormStore.ppaContractLength ?? 10;

    const recurBuilder = new RecurBuilder()
        .interval(store.solarSystemFormStore.panelLifetime ?? 1);

    return new BcnBuilder()
        .name("Panel Replacement")
        .type(BcnType.COST)
        .subType(BcnSubType.DIRECT)
        .addTag("System Replacement Costs")
        .initialOccurrence(Math.ceil(ppaEnd / panelLifetime) * panelLifetime + 1)
        .invest()
        .life(store.solarSystemFormStore.panelLifetime ?? 1)
        .residualValue()
        .recur(recurBuilder)
        .quantityValue(store.costsFormStore.totalInstallationCosts ?? 1)
        .quantity(1);
}

export function totalInstallationCostsResidualValue(store: ApplicationStore): BcnBuilder {
    const recurBuilder = new RecurBuilder()
        .interval(store.solarSystemFormStore.panelLifetime ?? 1)

    return new BcnBuilder()
        .name("Total Installation Costs Residual Value")
        .type(BcnType.COST)
        .subType(BcnSubType.DIRECT)
        .initialOccurrence(0)
        .invest()
        .life(store.solarSystemFormStore.panelLifetime ?? 1)
        .residualValue()
        .residualValueOnly()
        .recur(recurBuilder)
        .quantityValue(store.costsFormStore.totalInstallationCosts ?? 1)
        .quantity(1);
}

export function inverterReplacement(store: ApplicationStore): BcnBuilder[] {
    const studyPeriod = store.analysisAssumptionsFormStore.studyPeriod ?? STUDY_PERIOD;
    const panelLifetime = store.solarSystemFormStore.panelLifetime ?? PANEL_LIFETIME;
    const inverterLifetime = store.solarSystemFormStore.inverterLifetimeOrDefault ?? INVERTER_LIFETIME;

    const result: BcnBuilder[] = [];

    for (let i = 0; i < Math.round((studyPeriod / panelLifetime) - (1 / inverterLifetime) + (1 / panelLifetime)); i++) {
        const recurBuilder = new RecurBuilder()
            .interval(store.solarSystemFormStore.inverterLifetimeOrDefault ?? 1)
            .end((i + 1) * panelLifetime + 1);

        result.push(
            new BcnBuilder()
                .name(`Inverter Replacement Costs ${i}`)
                .type(BcnType.COST)
                .subType(BcnSubType.DIRECT)
                .addTag("Inverter Replacement Costs")
                .initialOccurrence(i === 0 ? inverterLifetime + 1 : i * panelLifetime + inverterLifetime + 1)
                .life(store.solarSystemFormStore.inverterLifetimeOrDefault ?? 1)
                .recur(recurBuilder)
                .quantityValue(parseFloat(store.costsFormStore.inverterReplacementCostsOrDefault?.toString() ?? '0'))
                .quantity(1)
        );
    }

    return result;
}

export function inverterReplacementResidualValue(store: ApplicationStore): BcnBuilder {
    const studyPeriod = store.analysisAssumptionsFormStore.studyPeriod ?? STUDY_PERIOD;
    const panelLifetime = store.solarSystemFormStore.panelLifetime ?? PANEL_LIFETIME;
    const inverterLifetime = store.solarSystemFormStore.inverterLifetimeOrDefault ?? INVERTER_LIFETIME;

    const index = Math.ceil(studyPeriod / panelLifetime) - 1;

    const recurBuilder = new RecurBuilder()
        .interval(inverterLifetime)
        .end((index + 1) * panelLifetime + 1);

    return new BcnBuilder()
        .name("Inverter Residual Value")
        .type(BcnType.COST)
        .subType(BcnSubType.DIRECT)
        .addTag("Resale Value")
        .initialOccurrence(index === 0 ? 0 : index * panelLifetime + 1)
        .life(inverterLifetime)
        .residualValue()
        .residualValueOnly()
        .recur(recurBuilder)
        .quantityValue(parseFloat(store.costsFormStore.inverterReplacementCostsOrDefault?.toString() ?? '0'))
        .quantity(1);
}

export function loanDownPayment(store: ApplicationStore): BcnBuilder {
    return new BcnBuilder()
        .name("Loan Down Payment")
        .type(BcnType.COST)
        .subType(BcnSubType.DIRECT)
        .addTag("Loan Down Payment")
        .initialOccurrence(0)
        .invest()
        .life(25)
        .quantityValue(store.costsFormStore.downPayment ?? 0)
        .quantity(1);
}

export function loanPayoff(store: ApplicationStore): BcnBuilder {
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

    const recurBuilder = new RecurBuilder()
        .interval(1)
        .varRate(VarRate.YEAR_BY_YEAR)
        .varValue(rates)
        .end(store.costsFormStore.loanLength ?? 1);

    return new BcnBuilder()
        .name("Monthly Loan Payments")
        .type(BcnType.COST)
        .subType(BcnSubType.DIRECT)
        .addTag("Future Loan Payments")
        .recur(recurBuilder)
        .quantityValue(yearlyAmount)
        .quantity(1);
}

export function federalTaxCredit(store: ApplicationStore): BcnBuilder {
    return new BcnBuilder()
        .name("Federal Tax Credit")
        .type(BcnType.COST)
        .subType(BcnSubType.DIRECT)
        .addTag("Upfront Financial Incentives")
        .invest()
        .quantity(1)
        .quantityValue(-store.costsFormStore.federalTaxCredit);
}

export function grantsRebates(store: ApplicationStore): BcnBuilder {
    return new BcnBuilder()
        .name("Grants Rebates")
        .type(BcnType.COST)
        .subType(BcnSubType.DIRECT)
        .addTag("Upfront Financial Incentives")
        .initialOccurrence(0)
        .invest()
        .quantity(1)
        .quantityValue(-(store.costsFormStore.stateOrLocalTaxCreditsOrGrantsOrRebates ?? 0));
}

export function maintenanceCosts(store: ApplicationStore): BcnBuilder {
    const recurBuilder = new RecurBuilder()
        .interval(1)
        .varRate(VarRate.PERCENT_DELTA)
        .varValue([0.0])
        .end(store.analysisAssumptionsFormStore.studyPeriod ?? 25);

    return new BcnBuilder()
        .name("Maintenance Costs")
        .type(BcnType.COST)
        .subType(BcnSubType.DIRECT)
        .addTag("Maintenance Costs")
        .initialOccurrence(1)
        .recur(recurBuilder)
        .quantityValue(store.costsFormStore.annualMaintenanceCosts ?? 1)
        .quantity(1);
}

export function ppaConsumption(store: ApplicationStore): BcnBuilder {
    const recurBuilder = new RecurBuilder()
        .interval(1)
        .varRate(VarRate.PERCENT_DELTA)
        .varValue([(store.costsFormStore.ppaEscalationRate ?? 0) / 100])
        .end(store.costsFormStore.ppaContractLength ?? 1);

    return new BcnBuilder()
        .name("Electricity Consumption - PPA")
        .type(BcnType.COST)
        .subType(BcnSubType.DIRECT)
        .initialOccurrence(1)
        .recur(recurBuilder)
        .quantityValue(store.costsFormStore.ppaElectricityRate ?? 1)
        .quantity(store.solarSystemFormStore.estimatedAnnualProduction ?? 0)
        .quantityVarRate(VarRate.YEAR_BY_YEAR)
        .quantityVarValue(annualProduction(store).map(
            value => value / (store.solarSystemFormStore.estimatedAnnualProduction ?? 1)
        ))
        .quantityUnit("kWh");
}

export function ppaSystemPurchasePrice(store: ApplicationStore): BcnBuilder {
    return new BcnBuilder()
        .name("Solar PV Purchase Price")
        .type(BcnType.COST)
        .subType(BcnSubType.DIRECT)
        .addTag("Future Purchase Costs")
        .initialOccurrence((store.costsFormStore.ppaContractLength ?? 0) + 1)
        .invest()
        .quantityValue(store.costsFormStore.ppaPurchasePrice ?? 1)
        .quantity(1);
}

export function upfrontSrec(store: ApplicationStore): BcnBuilder {
    return new BcnBuilder()
        .name("Up Front Solar Renewable Energy Credits")
        .type(BcnType.COST)
        .subType(BcnSubType.DIRECT)
        .addTag("SREC")
        .initialOccurrence(0)
        .invest()
        .quantityValue(-(store.srecFormStore.srecPaymentsUpFront ?? 0))
        .quantity((store.solarSystemFormStore.totalSystemSize ?? 0) / 1000);
}

export function productionBasedSrec(store: ApplicationStore): BcnBuilder {
    const recurBuilder = new RecurBuilder()
        .interval(1)
        .varRate(VarRate.YEAR_BY_YEAR)
        .varValue(store.srecFormStore.srecPaymentsProductionBased as number[] ?? [])
        .end(store.srecFormStore.srecContractLength ?? 15);

    return new BcnBuilder()
        .name("Production Based Solar Renewable Energy Credits")
        .type(BcnType.COST)
        .subType(BcnSubType.DIRECT)
        .addTag("SREC")
        .initialOccurrence(1)
        .recur(recurBuilder)
        .quantityValue(-1)
        .quantity((store.solarSystemFormStore.estimatedAnnualProduction ?? 0) / 1000)
        .quantityVarRate(VarRate.YEAR_BY_YEAR)
        .quantityVarValue(annualProduction(store).map(
            value => (value / 1000) / ((store.solarSystemFormStore.estimatedAnnualProduction ?? 1) / 1000)
        ));
}

export function maintenanceCostsAfterPpa(store: ApplicationStore): BcnBuilder {
    const studyPeriod = store.analysisAssumptionsFormStore.studyPeriod ?? STUDY_PERIOD;

    const recurBuilder = new RecurBuilder()
        .interval(1)
        .varRate(VarRate.PERCENT_DELTA)
        .varValue([0.0])
        .end(store.analysisAssumptionsFormStore.studyPeriod ?? 1);

    return new BcnBuilder()
        .name("Maintenance Costs After PPA")
        .type(BcnType.COST)
        .subType(BcnSubType.DIRECT)
        .addTag("Maintenance Costs")
        .initialOccurrence((store.costsFormStore.ppaContractLength ?? studyPeriod) + 1)
        .recur(recurBuilder)
        .quantityValue(store.costsFormStore.annualMaintenanceCosts ?? 1)
        .quantity(1);
}

export function productionBasedSrecAfterPpa(store: ApplicationStore): BcnBuilder {
    const studyPeriod = store.analysisAssumptionsFormStore.studyPeriod ?? STUDY_PERIOD;

    const recurBuilder = new RecurBuilder()
        .interval(1)
        .varRate(VarRate.YEAR_BY_YEAR)
        .varValue(store.srecFormStore.srecPaymentsProductionBased as number[])
        .end(store.srecFormStore.srecContractLength ?? 1);

    return new BcnBuilder()
        .name("Production Based Solar Renewable Energy Credits After Purchase")
        .type(BcnType.COST)
        .subType(BcnSubType.DIRECT)
        .addTag("SREC")
        .initialOccurrence((store.costsFormStore.ppaContractLength ?? studyPeriod) + 1)
        .recur(recurBuilder)
        .quantityValue(-1)
        .quantity((store.solarSystemFormStore.estimatedAnnualProduction ?? 0) / 1000)
        .quantityVarRate(VarRate.YEAR_BY_YEAR)
        .quantityVarValue(annualProduction(store).map(
            value => (value / 1000) / ((store.solarSystemFormStore.estimatedAnnualProduction ?? 1) / 1000)
        ));
}

export function inverterReplacementAfterPpa(store: ApplicationStore): BcnBuilder[] {
    const panelLifetime = store.solarSystemFormStore.panelLifetime ?? PANEL_LIFETIME;
    const studyPeriod = store.analysisAssumptionsFormStore.studyPeriod ?? STUDY_PERIOD;
    const inverterLifetime = store.solarSystemFormStore.inverterLifetime ?? INVERTER_LIFETIME;

    const ppaEnd = store.costsFormStore.ppaContractLength ?? 10;

    const result: BcnBuilder[] = [];

    //Calculate first replacement after PPA ends
    const initialOccurrence = Math.ceil(ppaEnd / inverterLifetime) * inverterLifetime;

    const skipped = Math.floor(ppaEnd / panelLifetime);

    for (let i = 0; i < Math.round((studyPeriod / panelLifetime) - (1 / inverterLifetime) + (1 / panelLifetime)) - skipped; i++) {
        const recurBuilder = new RecurBuilder()
            .interval(store.solarSystemFormStore.inverterLifetimeOrDefault ?? 1)
            .end(((i + skipped + 1) * panelLifetime) + 1);

        result.push(new BcnBuilder()
            .name(`Inverter Replacement Costs After PPA ${i}`)
            .type(BcnType.COST)
            .subType(BcnSubType.DIRECT)
            .addTag("Inverter Replacement Costs")
            .initialOccurrence(i === 0 ? initialOccurrence + 1 : ((i + skipped) * panelLifetime) + inverterLifetime + 1)
            .life(store.solarSystemFormStore.inverterLifetimeOrDefault ?? 1)
            .recur(recurBuilder)
            .quantityValue(parseFloat(store.costsFormStore.inverterReplacementCostsOrDefault?.toString() ?? '0'))
            .quantity(1)
        );
    }

    return result;
}

export function globalWarmingPotentialBaseline(store: ApplicationStore): BcnBuilder {
    const globalWarmingPotential = store.analysisAssumptionsFormStore.environmentalVariables?.globalWarmingPotential ?? 0;

    const recurBuilder = new RecurBuilder()
        .interval(1)
        .varRate(VarRate.PERCENT_DELTA)
        .addEscalationRateForYear(store)
        .end(store.analysisAssumptionsFormStore.studyPeriod ?? 25);

    return new BcnBuilder()
        .name("Grid Consumption Global Warming Potential")
        .type(BcnType.NON_MONETARY)
        .subType(BcnSubType.DIRECT)
        .addTag("LCIA-Global-Warming-Potential")
        .initialOccurrence(1)
        .recur(recurBuilder)
        .quantityValue(1)
        .quantity((getAnnualConsumption(store)) * (globalWarmingPotential / 1000))
        .quantityUnit("kg");
}

export function globalWarmingPotentialConsumption(store: ApplicationStore): BcnBuilder {
    const studyPeriod = store.analysisAssumptionsFormStore.studyPeriod ?? STUDY_PERIOD;
    const globalWarmingPotential = store.analysisAssumptionsFormStore.environmentalVariables?.globalWarmingPotential ?? 0;

    const annualConsumption = Array(studyPeriod + 1).fill(getAnnualConsumption(store));
    const production = annualProduction(store);

    const netGlobalWarmingPotential = annualConsumption.map((value, index) => value - production[index])
        .map((value) => value * (globalWarmingPotential / 1000));

    const recurBuilder = new RecurBuilder()
        .interval(1)
        .varRate(VarRate.PERCENT_DELTA)
        .addEscalationRateForYear(store)
        .end(studyPeriod);

    return new BcnBuilder()
        .name("Consumption Global Warming Potential")
        .type(BcnType.NON_MONETARY)
        .subType(BcnSubType.DIRECT)
        .addTag("LCIA-Global-Warming-Potential")
        .recur(recurBuilder)
        .quantityValue(store.electricalCostFormStore.electricUnitPrice ?? 1)
        .quantity(getAnnualConsumption(store))
        .quantityVarRate(VarRate.YEAR_BY_YEAR)
        .quantityVarValue(netGlobalWarmingPotential.map(
            value => Math.max(0, value) / getAnnualConsumption(store)
        ))
        .quantityUnit("kg");
}

export function globalWarmingPotentialProduction(store: ApplicationStore): BcnBuilder {
    const studyPeriod = store.analysisAssumptionsFormStore.studyPeriod ?? STUDY_PERIOD;
    const globalWarmingPotential = store.analysisAssumptionsFormStore.environmentalVariables?.globalWarmingPotential ?? 0;

    const annualConsumption = Array(studyPeriod + 1).fill(getAnnualConsumption(store));
    const production = annualProduction(store);

    const netGlobalWarmingPotential = annualConsumption.map((value, index) => value - production[index])
        .map((value) => value * (globalWarmingPotential / 1000));

    const recurBuilder = new RecurBuilder()
        .interval(1)
        .varRate(VarRate.PERCENT_DELTA)
        .addEscalationRateForYear(store)
        .end(studyPeriod);

    return new BcnBuilder()
        .name("Production Global Warming Potential")
        .type(BcnType.NON_MONETARY)
        .subType(BcnSubType.DIRECT)
        .addTag("LCIA-Global-Warming-Potential")
        .initialOccurrence(1)
        .recur(recurBuilder)
        .quantityValue(store.electricalCostFormStore.electricUnitPrice ?? 1)
        .quantity(-(store.solarSystemFormStore.estimatedAnnualProduction ?? 0))
        .quantityVarRate(VarRate.YEAR_BY_YEAR)
        .quantityVarValue(netGlobalWarmingPotential.map(
            value => Math.min(value, 0) / -(store.solarSystemFormStore.estimatedAnnualProduction ?? 1)
        ))
        .quantityUnit("kg");
}