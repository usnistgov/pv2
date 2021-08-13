import {GraphOption} from "./results/ResultData";
import {autorun, makeAutoObservable, reaction} from "mobx";
import React from "react";
import {
    ESCALATION_RATES_SAME_OR_DIFF_OPTIONS,
    INVERTER_TYPE_OPTIONS,
    LOAN_OR_CASH_OPTIONS,
    NET_METERING_FEED_TARIFF_OPTIONS,
    PPA_OPTIONS,
    RESIDUAL_VALUE_APPROACH_OPTIONS,
    SREC_PAYMENTS_OPTIONS,
    VIEW_ANNUAL_ESCALATION_RATES_OPTIONS
} from "../Strings";
import {fetchMap, take} from "../Utils";
import Config from "../Config";

/**
 * Main application store. Contains all sub-stores that contain form data.
 */
export class ApplicationStore {
    addressFormStore: AddressFormStore;
    analysisAssumptionsFormStore: AnalysisAssumptionsFormStore;
    electricalCostFormStore: ElectricalCostFormStore;
    escalationRateFormStore: EscalationRateFormStore;
    solarSystemFormStore: SolarSystemFormStore;
    costsFormStore: CostsFormStore;
    srecFormStore: SrecFormStore;

    formUiStore: FormUiStore;
    resultUiStore: ResultUiStore;

    constructor() {
        this.addressFormStore = new AddressFormStore(this);
        this.analysisAssumptionsFormStore = new AnalysisAssumptionsFormStore(this);
        this.electricalCostFormStore = new ElectricalCostFormStore(this);
        this.escalationRateFormStore = new EscalationRateFormStore(this);
        this.solarSystemFormStore = new SolarSystemFormStore(this);
        this.costsFormStore = new CostsFormStore(this);
        this.srecFormStore = new SrecFormStore(this);

        this.formUiStore = new FormUiStore(this);
        this.resultUiStore = new ResultUiStore(this);
    }
}

/**
 * Contains the data for the address form.
 */
export class AddressFormStore {
    rootStore: ApplicationStore;

    address = "";
    city = "";
    state = "";
    zipcode = "";

    constructor(rootStore: ApplicationStore) {
        makeAutoObservable(this, {rootStore: false});
        this.rootStore = rootStore;
    }

    get isDone(): boolean {
        return this.state !== "" && this.state.length >= 2;
    }
}

export class AnalysisAssumptionsFormStore {
    rootStore: ApplicationStore;

    studyPeriod = 25;
    realDiscountRate = 3;
    generalInflation = 2.3;
    residualValueApproach = RESIDUAL_VALUE_APPROACH_OPTIONS[0];

    constructor(rootStore: ApplicationStore) {
        makeAutoObservable(this, {rootStore: false});
        this.rootStore = rootStore
    }
}

export class ElectricalCostFormStore {
    rootStore: ApplicationStore;

    electricalCompanyName = "";
    netMeteringFeedTariff = NET_METERING_FEED_TARIFF_OPTIONS[0];
    annualConsumption = undefined;
    monthlyFlatRateCharge = undefined;
    electricUnitPrice = undefined;
    excessGenerationUnitPrice = undefined;
    pvGridConnectionRate = undefined;

    constructor(rootStore: ApplicationStore) {
        makeAutoObservable(this, {rootStore: false});
        this.rootStore = rootStore;
    }

    get isDone(): boolean {
        return this.annualConsumption !== undefined &&
            this.monthlyFlatRateCharge !== undefined &&
            this.electricUnitPrice !== undefined &&
            this.excessGenerationUnitPrice !== undefined &&
            this.pvGridConnectionRate !== undefined;
    }
}

export class EscalationRateFormStore {
    rootStore: ApplicationStore;

    viewAnnualEscalationRates = VIEW_ANNUAL_ESCALATION_RATES_OPTIONS[1];
    escalationRatesSameOrDiff = ESCALATION_RATES_SAME_OR_DIFF_OPTIONS[0];
    escalationRateForYear: number[] = [];
    productionEscalationRateForYear: number[] = [];

    constructor(rootStore: ApplicationStore) {
        makeAutoObservable(this, {rootStore: false});
        this.rootStore = rootStore;
    }
}

export class SolarSystemFormStore {
    rootStore: ApplicationStore;

    panelEfficiency = undefined;
    inverterType = INVERTER_TYPE_OPTIONS[0];
    totalSystemSize = undefined;
    estimatedAnnualProduction = undefined;
    // Advanced
    panelLifetime = 25;
    inverterLifetime = 15;
    degradationRate = 0.05;

    constructor(rootStore: ApplicationStore) {
        makeAutoObservable(this, {rootStore: false});

        this.rootStore = rootStore;
        if (this.inverterType === INVERTER_TYPE_OPTIONS[2]) {
            this.inverterLifetime = this.panelLifetime;
        }
    }

    get isDone(): boolean {
        return this.panelEfficiency !== undefined &&
            this.totalSystemSize !== undefined &&
            this.estimatedAnnualProduction !== undefined;
    }
}

export class CostsFormStore {
    rootStore: ApplicationStore;

    // Standard options
    totalInstallationCosts = undefined;
    stateOrLocalTaxCreditsOrGrantsOrRebates = undefined;
    // Advanced
    inverterReplacementCosts = undefined;
    annualMaintenanceCosts = undefined;

    // PPA Options
    ppaOption = PPA_OPTIONS[1];
    ppaContractLength = undefined;
    ppaElectricityRate = undefined;
    ppaEscalationRate = undefined;
    ppaPurchasePrice = undefined;
    //Advanced
    loanOrCash = LOAN_OR_CASH_OPTIONS[1];
    downPayment = undefined;
    nominalInterestRate = undefined;
    monthlyPayment = undefined;


    constructor(rootStore: ApplicationStore) {
        makeAutoObservable(this, {rootStore: false});
        this.rootStore = rootStore;
    }

    get federalTaxCredit(): string {
        return ((this.totalInstallationCosts ?? 0) * Config.FEDERAL_TAX_CREDIT).toFixed(2);
    }

    get isDone(): boolean {
        return (
                this.totalInstallationCosts !== undefined &&
                this.stateOrLocalTaxCreditsOrGrantsOrRebates !== undefined
            ) &&
            (
                this.loanOrCash === LOAN_OR_CASH_OPTIONS[1] || (
                    this.nominalInterestRate !== undefined &&
                    this.downPayment !== undefined &&
                    this.monthlyPayment !== undefined
                )
            ) && (
                this.ppaOption === PPA_OPTIONS[1] || (
                    this.ppaContractLength !== undefined &&
                    this.ppaElectricityRate !== undefined &&
                    this.ppaEscalationRate !== undefined &&
                    this.ppaPurchasePrice !== undefined
                )
            )
    }
}

export class SrecFormStore {
    rootStore: ApplicationStore;

    srecPayments = SREC_PAYMENTS_OPTIONS[0];
    srecPaymentsUpFront = undefined;
    srecPaymentsProductionBased: number[] = [];

    constructor(rootStore: ApplicationStore) {
        makeAutoObservable(this, {rootStore: false});

        this.rootStore = rootStore;
        this.srecPaymentsProductionBased = Array(rootStore.analysisAssumptionsFormStore.studyPeriod)
            .fill(undefined);
    }

    get isDone(): boolean {
        return (
            this.srecPayments === SREC_PAYMENTS_OPTIONS[0] &&
            this.srecPaymentsUpFront !== undefined
        ) || (
            this.srecPayments === SREC_PAYMENTS_OPTIONS[1] &&
            this.srecPaymentsProductionBased.every((value) => value !== undefined)
        )
    }
}

export class ResultUiStore {
    rootStore: ApplicationStore;

    graphOption: GraphOption = GraphOption.NET_VALUE;
    shouldCalculate = true;
    resultCache: any = null;

    constructor(rootStore: ApplicationStore) {
        makeAutoObservable(this, {rootStore: false});
        this.rootStore = rootStore;
    }
}

export class FormUiStore {
    rootStore: ApplicationStore;

    current = 0;

    constructor(rootStore: ApplicationStore) {
        makeAutoObservable(this, {rootStore: false});
        this.rootStore = rootStore;
    }

    next() {
        this.current = this.current + 1;
    }

    previous() {
        this.current = this.current - 1;
    }
}

export const Store = React.createContext(new ApplicationStore());
export const store = new ApplicationStore();

reaction(() => store.analysisAssumptionsFormStore.studyPeriod, (value) => {
    store.srecFormStore.srecPaymentsProductionBased = Array(value).fill(0);
});


const stateIdToName = fetchMap<string, string>(
    "escalation-rates/state-abbreviation.json",
    (input, json) => {
        if (input.length < 2)
            return "";

        const state = input === "" || !input ? "MD" : input;
        return state.length === 2 ? json[state.toUpperCase()] : state
    }
);

const stateToRegion = fetchMap<string, string>(
    "escalation-rates/state-region-mapping.json",
    (state, json) => {
        if (!state || !json[state])
            return "";

        return json[state];
    }
);

const regionToEscalationRateList = fetchMap<string, number[]>(
    "escalation-rates/region-escalation-rates.json",
    (region, json) => {
        if (!region)
            return [];

        return Object.values(json[region]);
    }
);

const zipToState = fetchMap<string, string>(
    "data/zip-state-mapping.json",
    (zipcode, json) => json[zipcode.padStart(5, "0")]
);

autorun(() => {
    const zipcode = store.addressFormStore.zipcode;
    const state = store.addressFormStore.state;

    if (!zipcode || state.length < 2)
        return;

    let region = zipcode ? zipToState(zipcode) : stateIdToName(state);

    region.then(stateToRegion)
        .then(regionToEscalationRateList)
        .then(take(store.analysisAssumptionsFormStore.studyPeriod))
        .then((result) => {
            store.escalationRateFormStore.productionEscalationRateForYear = result;
            store.escalationRateFormStore.escalationRateForYear = result;
        });
});
