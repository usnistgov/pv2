import {configureStore, createSlice, CreateSliceOptions, PayloadAction} from "@reduxjs/toolkit";
import {GraphOption} from "./results/ResultData";
import {makeAutoObservable, reaction} from "mobx";
import React from "react";
import {
    ESCALATION_RATES_SAME_OR_DIFF_OPTIONS,
    INVERTER_TYPE_OPTIONS, LOAN_OR_CASH_OPTIONS,
    NET_METERING_FEED_TARIFF_OPTIONS, PPA_OPTIONS,
    RESIDUAL_VALUE_APPROACH_OPTIONS, SREC_PAYMENTS_OPTIONS, VIEW_ANNUAL_ESCALATION_RATES_OPTIONS
} from "../Strings";
import {take, toJson} from "../Utils";

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

    resultUiStore: ResultUiStore;

    constructor() {
        this.addressFormStore = new AddressFormStore(this);
        this.analysisAssumptionsFormStore = new AnalysisAssumptionsFormStore(this);
        this.electricalCostFormStore = new ElectricalCostFormStore(this);
        this.escalationRateFormStore = new EscalationRateFormStore(this);
        this.solarSystemFormStore = new SolarSystemFormStore(this);
        this.costsFormStore = new CostsFormStore(this);
        this.srecFormStore = new SrecFormStore(this);

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
        makeAutoObservable(this, { rootStore: false });
        this.rootStore = rootStore;
    }
}

export class AnalysisAssumptionsFormStore {
    rootStore: ApplicationStore;

    studyPeriod = 25;
    realDiscountRate = 3;
    generalInflation = 2.3;
    residualValueApproach = RESIDUAL_VALUE_APPROACH_OPTIONS[0];

    constructor(rootStore: ApplicationStore) {
        makeAutoObservable(this, { rootStore: false });
        this.rootStore = rootStore
    }
}

export class ElectricalCostFormStore {
    rootStore: ApplicationStore;

    electricalCompanyName = "";
    netMeteringFeedTariff = NET_METERING_FEED_TARIFF_OPTIONS[0];
    annualConsumption = 0;
    monthlyFlatRateCharge = 0;
    electricUnitPrice = 0;
    excessGenerationUnitPrice = 0;
    pvGridConnectionRate = 0;

    constructor(rootStore: ApplicationStore) {
        makeAutoObservable(this, { rootStore: false });
        this.rootStore = rootStore;
    }
}

export class EscalationRateFormStore {
    rootStore: ApplicationStore;

    viewAnnualEscalationRates = VIEW_ANNUAL_ESCALATION_RATES_OPTIONS[1];
    escalationRatesSameOrDiff = ESCALATION_RATES_SAME_OR_DIFF_OPTIONS[0];
    escalationRateForYear: number[] = [];
    productionEscalationRateForYear: number[] = [];

    constructor(rootStore: ApplicationStore) {
        makeAutoObservable(this, { rootStore: false });
        this.rootStore = rootStore;
    }
}

export class SolarSystemFormStore {
    rootStore: ApplicationStore;

    panelEfficiency = 0;
    inverterType = INVERTER_TYPE_OPTIONS[0];
    totalSystemSize = 0;
    estimatedAnnualProduction = 0;
    // Advanced
    panelLifetime = 0;
    inverterLifetime = 0;
    degradationRate = 0;

    constructor(rootStore: ApplicationStore) {
        makeAutoObservable(this, { rootStore: false});
        this.rootStore = rootStore;
    }
}

export class CostsFormStore {
    rootStore: ApplicationStore;

    // Standard options
    totalInstallationCosts = 0;
    stateOrLocalTaxCreditsOrGrantsOrRebates = 0;
    // Advanced
    inverterReplacementCosts = 0;
    annualMaintenanceCosts = 0;

    // PPA Options
    ppaOption = PPA_OPTIONS[1];
    //Advanced
    loanOrCash = LOAN_OR_CASH_OPTIONS[1];
    downPayment = 0;
    nominalInterestRate = 0;
    monthlyPayment = 0;


    constructor(rootStore: ApplicationStore) {
        makeAutoObservable(this, { rootStore: false });
        this.rootStore = rootStore;
    }

    get federalTaxCredit() {
        return this.totalInstallationCosts * 0.26 // TODO: replace this with a config variable
    }
}

export class SrecFormStore {
    rootStore: ApplicationStore;

    srecPayments = SREC_PAYMENTS_OPTIONS[0];
    srecPaymentsUpFront = 0;
    srecPaymentsProductionBased: number[] = [];

    constructor(rootStore: ApplicationStore) {
        makeAutoObservable(this, { rootStore: false });

        this.rootStore = rootStore;
        this.srecPaymentsProductionBased =  Array(rootStore.analysisAssumptionsFormStore.studyPeriod).fill(0);
    }
}

export class ResultUiStore {
    rootStore: ApplicationStore;

    graphOption: GraphOption = GraphOption.NET_VALUE;

    constructor(rootStore: ApplicationStore) {
        makeAutoObservable(this, { rootStore: false });
        this.rootStore = rootStore;
    }
}

export const Store = React.createContext(new ApplicationStore());

export const store = new ApplicationStore();

reaction(() => store.analysisAssumptionsFormStore.studyPeriod, (value) => {
    store.srecFormStore.srecPaymentsProductionBased = Array(value).fill(0);
});

reaction(() => store.addressFormStore.state, (value: string) => {
    if(value.length < 2)
        return;

    async function sanitizeState(input: string): Promise<string> {
        if(input.length < 2)
            return "";

        const stateAbbreviations = await fetch("escalation-rates/state-abbreviation.json").then(toJson);
        const state = input === "" || !input ? "MD" : input;

        return state.length === 2 ? stateAbbreviations[state.toUpperCase()] : state
    }

    async function getRegion(state: string): Promise<string> {
        if(!state)
            return "";

        const stateRegionMapping = await fetch("escalation-rates/state-region-mapping.json").then(toJson);

        if(!stateRegionMapping[state])
            return "";

        return stateRegionMapping[state].Region
    }

    async function getEscalationRateList(region: string): Promise<Array<number>> {
        if(!region)
            return []

        const regionEscalationRates = await fetch("escalation-rates/region-escalation-rates.json").then(toJson);
        return Object.values(regionEscalationRates[region])
    }

    sanitizeState(value)
        .then(getRegion)
        .then(getEscalationRateList)
        .then(take(store.analysisAssumptionsFormStore.studyPeriod))
        .then((result) => {
            store.escalationRateFormStore.productionEscalationRateForYear = result;
            store.escalationRateFormStore.escalationRateForYear = result;
        });
})
