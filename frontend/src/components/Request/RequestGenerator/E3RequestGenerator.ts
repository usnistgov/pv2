import {ApplicationStore} from "../../../application/ApplicationStore";
import {
    federalTaxCredit,
    globalWarmingPotentialBaseline,
    globalWarmingPotentialConsumption,
    globalWarmingPotentialProduction,
    grantsRebates,
    gridConsumption,
    gridDemandCharge,
    maintenanceCosts,
    netGridConsumption,
    netPanelProduction,
    ppaConsumption,
    ppaSystemPurchasePrice,
    pvGridConnectionRate, totalInstallationCostsResidualValue
} from "./Bcns";
import {KNOW_ANNUAL_CONSUMPTION_OPTIONS, PPA_OPTIONS} from "../../../Strings";
import {GENERAL_INFLATION, REAL_DISCOUNT_RATE} from "../../../Defaults";
import {
    AlternativeBuilder,
    AnalysisBuilder,
    AnalysisType, BcnBuilder,
    LocationBuilder,
    OutputType,
    ProjectType,
    RequestBuilder,
    TimestepComp,
    TimestepValue
} from "e3-sdk";
import "../../../Extensions";

export const altLabels = [
    "No Solar System",
    "Purchase Solar System",
    "PPA Solar System",
];

function addPpaAlternative(
    requestBuilder: RequestBuilder,
    gridDemandChargeBcn: BcnBuilder,
    pvGridConnectionRateBcn: BcnBuilder,
    globalWarmingPotentialConsumptionBcn: BcnBuilder,
    globalWarmingPotentialProductionBcn: BcnBuilder,
    netGridConsumption: BcnBuilder,
    netPanelProduction: BcnBuilder,
    totalInstallationCostsResidualValueBcn: BcnBuilder,
    store: ApplicationStore
): RequestBuilder {
    if (store.costsFormStore.ppaOption !== PPA_OPTIONS[0])
        return requestBuilder;

    const ppaAlternative = new AlternativeBuilder()
        .name(altLabels[2])
        .addBcn(
            gridDemandChargeBcn,
            pvGridConnectionRateBcn,
            netGridConsumption,
            netPanelProduction,
            ppaConsumption(store),
            ppaSystemPurchasePrice(store),
            globalWarmingPotentialConsumptionBcn,
            globalWarmingPotentialProductionBcn
        )
        .addTotalInstallationCostsResidualValue(totalInstallationCostsResidualValueBcn, store)
        .addPanelReplacementAfterPpa(store)
        .addOtherPpaCosts(store);

    return requestBuilder.addAlternative(ppaAlternative);
}

export async function createE3Request(store: ApplicationStore): Promise<RequestBuilder> {
    // General variables
    const realDiscountRate = store.analysisAssumptionsFormStore.realDiscountRate ?? REAL_DISCOUNT_RATE;
    const generalInflation = store.analysisAssumptionsFormStore.generalInflation ?? GENERAL_INFLATION;

    // Potentially shared BCNs
    const gridDemandChargeBcn = gridDemandCharge(store);
    const pvGridConnectionRateBcn = pvGridConnectionRate(store);
    const globalWarmingPotentialConsumptionBcn = globalWarmingPotentialConsumption(store);
    const globalWarmingPotentialProductionBcn = globalWarmingPotentialProduction(store);
    const netGridConsumptionBcn = netGridConsumption(store);
    const netPanelProductionBcn = netPanelProduction(store);
    const gridConsumptionBcn = gridConsumption(store);
    const totalInstallationCostsResidualValueBcn = totalInstallationCostsResidualValue(store);

    const baselineAlternative = new AlternativeBuilder()
        .baseline()
        .name(altLabels[0])
        .addBcn(
            gridConsumptionBcn,
            gridDemandChargeBcn,
            globalWarmingPotentialBaseline(store)
        );

    const firstAlternative = new AlternativeBuilder()
        .name(altLabels[1])
        .addBcn(
            gridDemandChargeBcn,
            pvGridConnectionRateBcn,
            federalTaxCredit(store),
            grantsRebates(store),
            maintenanceCosts(store),
            globalWarmingPotentialConsumptionBcn,
            globalWarmingPotentialProductionBcn
        )
        .addTotalInstallationCostsResidualValue(totalInstallationCostsResidualValueBcn, store)
        .addPanelReplacement(store)
        .addConsumptionAndProduction(netGridConsumptionBcn, netPanelProductionBcn, gridConsumptionBcn, store)
        .addLoanOrCosts(store)
        .addSrecPayments(store)
        .addSolarSystemCosts(store);

    const locationBuilder = new LocationBuilder()
        .address(store.addressFormStore.address)
        .city(store.addressFormStore.city)
        .state(store.addressFormStore.state)
        .zip(store.addressFormStore.zipcode);

    const analysisBuilder = new AnalysisBuilder()
        .type(AnalysisType.LCCA)
        .projectType(ProjectType.BUILDING)
        .addOutputType(OutputType.REQUIRED, OutputType.OPTIONAL, OutputType.MEASURES)
        .studyPeriod(store.analysisAssumptionsFormStore.studyPeriod ?? 25)
        .timestepValue(TimestepValue.YEAR)
        .timestepComp(TimestepComp.END_OF_YEAR)
        .outputReal()
        .interestRate(store.costsFormStore.nominalInterestRate ?? 0.06)
        .discountRateReal(realDiscountRate / 100)
        .discountRateNominal((1 + (generalInflation / 100)) * (1 + (realDiscountRate / 100)) - 1)
        .inflationRate(generalInflation / 100)
        .marr(realDiscountRate / 100)
        .reinvestRate(realDiscountRate / 100)
        .federalIncomeRate(0.26)
        .otherIncomeRate(0.26)
        .location(locationBuilder);

    return addPpaAlternative(
        new RequestBuilder()
            .analysis(analysisBuilder)
            .addAlternative(baselineAlternative, firstAlternative),
        gridDemandChargeBcn,
        pvGridConnectionRateBcn,
        globalWarmingPotentialConsumptionBcn,
        globalWarmingPotentialProductionBcn,
        netGridConsumptionBcn,
        netPanelProductionBcn,
        totalInstallationCostsResidualValueBcn,
        store
    );
}

export function getAnnualConsumption(store: ApplicationStore) {
    if (store.electricalCostFormStore.knowAnnualConsumption == KNOW_ANNUAL_CONSUMPTION_OPTIONS[0])
        return store.solarSystemFormStore.estimatedAnnualProduction ?? 0;

    return store.electricalCostFormStore.annualConsumption ?? 0;
}
