import {ApplicationStore} from "../ApplicationStore";
import {
    federalTaxCredit,
    grantsRebates,
    gridConsumption,
    gridDemandCharge, loanPayoff,
    maintenanceCosts,
    netGridConsumption,
    netPanelProduction,
    panelProduction,
    ppaConsumption,
    ppaSystemPurchasePrice, productionBasedSrec, productionBasedSrecAfterPpa,
    pvGridConnectionRate,
    totalInstallationCosts,
    totalInstallationCostsResidualValue, upfrontSrec
} from "./Bcns";
import {
    LOAN_OR_CASH_OPTIONS,
    NET_METERING_FEED_TARIFF_OPTIONS,
    PPA_OPTIONS,
    SREC_PAYMENTS_OPTIONS
} from "../../Strings";

export const altLabels = [
    "No Solar System",
    "Purchase Solar System",
    "PPA Solar System",
];

let nextAltId = 0;

function baselineAlternative(store: ApplicationStore) {
    let altId = nextAltId++;

    let bcns = [];
    bcns.push(createBcn("Grid Electricity Consumption", altId, () => gridConsumption(store)));
    bcns.push(createBcn("Grid Electricity Demand Charge", altId, () => gridDemandCharge(store)));

    return {
        altID: altId,
        altName: altLabels[0],
        altBCNList: bcns.map(bcn => bcn.id),
        baselineBool: true,
    }
}

function firstAlternative(store: ApplicationStore) {
    let altId = nextAltId++;

    let bcns = [];
    bcns.push(createBcn("Grid Electricity Demand Charge", altId, () => gridDemandCharge(store)));
    bcns.push(createBcn("PV Grid Connection Fee", altId, () => pvGridConnectionRate(store)))
    bcns.push(createBcn("Total Installation Costs Residual Value", altId, () => totalInstallationCostsResidualValue(store)));
    bcns.push(createBcn("Federal Tax Credit", altId, () => federalTaxCredit(store)));
    bcns.push(createBcn("Grants Rebates", altId, () => grantsRebates(store)));
    bcns.push(createBcn("Maintenance Costs", altId, () => maintenanceCosts(store)));

    switch (store.electricalCostFormStore.netMeteringFeedTariff) {
        case NET_METERING_FEED_TARIFF_OPTIONS[0]:
            bcns.push(createBcn("Net Grid Electricity Consumption", altId, () => netGridConsumption(store)));
            bcns.push(createBcn("Net Panel Electricity Production", altId, () => netPanelProduction(store)));
            break;
        case NET_METERING_FEED_TARIFF_OPTIONS[1]:
            bcns.push(createBcn("Grid Electricity Consumption", altId, () => gridConsumption(store)));
            bcns.push(createBcn("Panel Electricity Production", altId, () => panelProduction(store)));
            break;
    }

    switch (store.costsFormStore.loanOrCash) {
        case LOAN_OR_CASH_OPTIONS[0]:
            bcns.push(createBcn("Loan Down Payment", altId, () => totalInstallationCosts(store)));
            bcns.push(createBcn("Monthly Loan Payments", altId, () => loanPayoff(store)))
            break;
        case LOAN_OR_CASH_OPTIONS[1]:
            bcns.push(createBcn("Total Installation Costs", altId, () => totalInstallationCosts(store)));
            break;
    }

    switch (store.srecFormStore.srecPayments) {
        case SREC_PAYMENTS_OPTIONS[1]:
            bcns.push(createBcn("Up Front Solar Renewable Energy Credits", altId, () => upfrontSrec(store)));
            break;
        case SREC_PAYMENTS_OPTIONS[2]:
            bcns.push(createBcn("Production Based Solar Renewable Energy Credits", altId, () => productionBasedSrec(store)))
            break;
    }

    return {
        altID: altId,
        altName: altLabels[1],
        altBCNList: bcns.map(bcn => bcn.id),
    }
}

function ppaAlternative(store: ApplicationStore) {
    let altId = nextAltId++;

    let bcns = [];
    bcns.push(createBcn("Net Grid Electricity Consumption", altId, () => netGridConsumption(store)));
    bcns.push(createBcn("Electricity Consumption - PPA", altId, () => ppaConsumption(store)));
    bcns.push(createBcn("Solar PV Purchase Price", altId, () => ppaSystemPurchasePrice(store)));
    bcns.push(createBcn("Total Installation Costs Residual Value", altId, () => totalInstallationCostsResidualValue(store)));

    if (store.srecFormStore.srecPayments === SREC_PAYMENTS_OPTIONS[2]) {
        bcns.push(createBcn("Production Based Solar Renewable Energy Credits After Purchase", altId, () => productionBasedSrecAfterPpa(store)))
    }

    return {
        altID: altId,
        altName: altLabels[2],
        altBCNList: bcns.map(bcn => bcn.id),
    }
}

let nextBcnId = 0;

class BCN {
    id: number;
    name: string;
    alts: number[] = [];
    options: object;

    constructor(name: string, options: object) {
        this.id = nextBcnId++;
        this.name = name;
        this.options = options;
    }

    addAlt(id: number): void {
        this.alts.push(id)
    }

    output(): object {
        return {
            bcnID: this.id,
            altID: this.alts,
            bcnName: this.name,
            ...this.options,
        }
    }
}

let bcnCache = new Map();

function createBcn(name: string, alternative: number, options: () => object): BCN {
    let bcn = bcnCache.get(name) ?? new BCN(name, options());
    bcn.addAlt(alternative);

    if (!bcnCache.has(name))
        bcnCache.set(name, bcn);

    return bcn;
}

export async function createE3Request(store: ApplicationStore): Promise<any> {
    const now = new Date();
    const nowString = `${now.getFullYear()}-${now.getMonth()}-${now.getDay()}`;

    const alternativeObjects = [];
    alternativeObjects.push(baselineAlternative(store));
    alternativeObjects.push(firstAlternative(store));
    if (store.costsFormStore.ppaOption === PPA_OPTIONS[0])
        alternativeObjects.push(ppaAlternative(store));

    let result = {
        analysisObject: {
            analysisType: "LCCA",
            projectType: "Buildings",
            objToReport: ["FlowSummary", "MeasureSummary"],
            studyPeriod: store.analysisAssumptionsFormStore.studyPeriod,
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
            noAlt: alternativeObjects.length,
            baseAlt: 0,
            location: [
                store.addressFormStore.address,
                store.addressFormStore.city,
                store.addressFormStore.state,
                store.addressFormStore.zipcode
            ]
        },
        alternativeObjects: alternativeObjects,
        bcnObjects: Array.from(bcnCache.values()).map(bcn => bcn.output())
    }

    console.log(result);
    return result;
}

