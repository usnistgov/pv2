import {autorun, makeAutoObservable, reaction} from "mobx";
import React from "react";
import {
    ESCALATION_RATES_SAME_OR_DIFF_OPTIONS, GraphOption,
    INVERTER_TYPE_OPTIONS,
    LOAN_OR_CASH_OPTIONS,
    NET_METERING_FEED_TARIFF_OPTIONS,
    PPA_OPTIONS,
    RESIDUAL_VALUE_APPROACH_OPTIONS,
    SREC_PAYMENTS_OPTIONS,
    VIEW_ANNUAL_ESCALATION_RATES_OPTIONS
} from "../Strings";
import {take, toJson} from "../Utils";
import Constants from "../Constants";

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

        this.initReactions();
    }

    reset() {
        this.addressFormStore = new AddressFormStore(this);
        this.analysisAssumptionsFormStore = new AnalysisAssumptionsFormStore(this);
        this.electricalCostFormStore = new ElectricalCostFormStore(this);
        this.escalationRateFormStore = new EscalationRateFormStore(this);
        this.solarSystemFormStore = new SolarSystemFormStore(this);
        this.costsFormStore = new CostsFormStore(this);
        this.srecFormStore = new SrecFormStore(this);

        this.formUiStore = new FormUiStore(this);
        this.resultUiStore = new ResultUiStore(this);

        this.initReactions();
    }

    //FIXME: dispose of these reactions when reset is called.
    initReactions() {
        reaction(() => this.analysisAssumptionsFormStore.studyPeriod, (value) => {
            this.srecFormStore.srecPaymentsProductionBased = Array(value).fill(0);
        });

        autorun(() => this.calculateEscalationRates(this.addressFormStore.zipcode));
    }

    calculateEscalationRates(zipcode: string) {
        if(zipcode.length <= 0)
            return;

        fetch(`/api/escalation-rates/${zipcode}`)
            .then(toJson)
            .then((result) => result[0].rates)
            .then<number[]>(take(this.analysisAssumptionsFormStore.studyPeriod + 1))
            .then((result) => {
                this.escalationRateFormStore.productionEscalationRateForYear = result;
                this.escalationRateFormStore.escalationRateForYear = result;
            })
            .catch((reason: any) => {
                console.log(reason);
            });
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
        return this.zipcode !== "";
    }

    reset() {
        this.address = "";
        this.city = "";
        this.state = "";
        this.zipcode = "";
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

    reset() {
        this.studyPeriod = 25;
        this.realDiscountRate = 3;
        this.generalInflation = 2.3
        this.residualValueApproach = RESIDUAL_VALUE_APPROACH_OPTIONS[0];
    }
}

export class ElectricalCostFormStore {
    rootStore: ApplicationStore;

    electricalCompanyName = "";
    netMeteringFeedTariff = NET_METERING_FEED_TARIFF_OPTIONS[0];
    annualConsumption: number | undefined = undefined;
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
            this.excessGenerationUnitPrice !== undefined;
    }

    reset() {
        this.electricalCompanyName = "";
        this.netMeteringFeedTariff = NET_METERING_FEED_TARIFF_OPTIONS[0];
        this.annualConsumption = undefined;
        this.monthlyFlatRateCharge = undefined;
        this.electricUnitPrice = undefined;
        this.excessGenerationUnitPrice = undefined;
        this.pvGridConnectionRate = undefined;

        this.rootStore.escalationRateFormStore.reset()
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

    reset() {
        this.viewAnnualEscalationRates = VIEW_ANNUAL_ESCALATION_RATES_OPTIONS[1];
        this.escalationRatesSameOrDiff = ESCALATION_RATES_SAME_OR_DIFF_OPTIONS[0];
        this.escalationRateForYear = [];
        this.productionEscalationRateForYear = [];

        this.rootStore.calculateEscalationRates(this.rootStore.addressFormStore.zipcode);
    }
}

export class SolarSystemFormStore {
    rootStore: ApplicationStore;

    systemDescription = undefined;
    panelEfficiency = undefined;
    inverterType = INVERTER_TYPE_OPTIONS[0];
    totalSystemSize = undefined;
    estimatedAnnualProduction = undefined;
    // Advanced
    panelLifetime = 25;
    inverterLifetime: number = 15;
    degradationRate = 0.5;

    lifetimeDefault: boolean = true;

    constructor(rootStore: ApplicationStore) {
        makeAutoObservable(this, {rootStore: false});

        this.rootStore = rootStore;
    }

    get isDone(): boolean {
        return this.systemDescription !== undefined &&
            this.totalSystemSize !== undefined &&
            this.estimatedAnnualProduction !== undefined;
    }

    get inverterLifetimeOrDefault() {
        if (!this.lifetimeDefault) {
            return this.inverterLifetime;
        }

        switch (this.inverterType) {
            case INVERTER_TYPE_OPTIONS[0]:
            case INVERTER_TYPE_OPTIONS[1]:
                return 15;

            case INVERTER_TYPE_OPTIONS[2]:
                return this.panelLifetime;

            default:
                return 0;
        }
    }

    set inverterLifetimeOrDefault(value) {
        this.lifetimeDefault = false;
        this.inverterLifetime = value;
    }

    get inverterOption() {
        return this.inverterType
    }

    set inverterOption(option) {
        this.lifetimeDefault = true;
        this.rootStore.costsFormStore.inverterReplacementCostsDefault = true;
        this.inverterType = option;
    }

    reset() {
        this.systemDescription = undefined;
        this.panelEfficiency = undefined;
        this.inverterType = INVERTER_TYPE_OPTIONS[0];
        this.totalSystemSize = undefined;
        this.estimatedAnnualProduction = undefined;
        // Advanced
        this.panelLifetime = 25;
        this.inverterLifetime = 15;
        this.degradationRate = 0.5;

        this.lifetimeDefault = true;
    }
}

export class CostsFormStore {
    rootStore: ApplicationStore;

    // Standard options
    totalInstallationCosts = undefined;
    stateOrLocalTaxCreditsOrGrantsOrRebates = undefined;
    // Advanced
    inverterReplacementCosts = 0;
    annualMaintenanceCosts = 150;

    inverterReplacementCostsDefault: boolean = true;

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
    loanLength = undefined;

    constructor(rootStore: ApplicationStore) {
        makeAutoObservable(this, {rootStore: false});
        this.rootStore = rootStore;
    }

    get inverterReplacementCostsOrDefault() {
        if (!this.inverterReplacementCostsDefault) {
            return this.inverterReplacementCosts;
        }

        switch (this.rootStore.solarSystemFormStore.inverterType) {
            case INVERTER_TYPE_OPTIONS[0]:
            case INVERTER_TYPE_OPTIONS[1]:
                return (this.rootStore.solarSystemFormStore.totalSystemSize ?? 0) * 0.18;

            case INVERTER_TYPE_OPTIONS[2]:
            default:
                return 0;
        }
    }

    set inverterReplacementCostsOrDefault(value) {
        this.inverterReplacementCostsDefault = false;
        this.inverterReplacementCosts = value;
    }

    get federalTaxCredit(): string {
        return ((this.totalInstallationCosts ?? 0) * Constants.FEDERAL_TAX_CREDIT).toFixed(2);
    }

    get isDone(): boolean {
        return (
                this.totalInstallationCosts !== undefined &&
                this.stateOrLocalTaxCreditsOrGrantsOrRebates !== undefined
            ) &&
            (
                this.loanOrCash === LOAN_OR_CASH_OPTIONS[1] || (
                    this.loanLength !== undefined &&
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

    resetPvCost() {
        this.totalInstallationCosts = undefined;
        this.stateOrLocalTaxCreditsOrGrantsOrRebates = undefined;

        this.inverterReplacementCosts = 0;
        this.annualMaintenanceCosts = 150;

        this.inverterReplacementCostsDefault = true;
    }

    resetCashLoan() {
        this.loanOrCash = LOAN_OR_CASH_OPTIONS[1];
        this.downPayment = undefined;
        this.nominalInterestRate = undefined;
        this.monthlyPayment = undefined;
        this.loanLength = undefined;
    }

    resetPpa() {
        this.ppaOption = PPA_OPTIONS[1];
        this.ppaContractLength = undefined;
        this.ppaElectricityRate = undefined;
        this.ppaEscalationRate = undefined;
        this.ppaPurchasePrice = undefined;
    }
}

export class SrecFormStore {
    rootStore: ApplicationStore;

    srecPayments = SREC_PAYMENTS_OPTIONS[0];
    srecPaymentsUpFront = 0;
    srecPaymentsProductionBased: (number | undefined)[] = [];
    srecContractLength = 10;

    constructor(rootStore: ApplicationStore) {
        makeAutoObservable(this, {rootStore: false});

        this.rootStore = rootStore;
        this.srecPaymentsProductionBased = Array(rootStore.analysisAssumptionsFormStore.studyPeriod + 1)
            .fill(0);
    }

    get isDone(): boolean {
        return this.srecPayments === SREC_PAYMENTS_OPTIONS[0] || (
            this.srecPayments === SREC_PAYMENTS_OPTIONS[1] &&
            this.srecPaymentsUpFront !== undefined
        ) || (
            this.srecPayments === SREC_PAYMENTS_OPTIONS[2] &&
            this.srecPaymentsProductionBased.every((value) => value !== undefined) &&
            this.srecContractLength !== undefined
        )
    }

    reset() {
        this.srecPayments = SREC_PAYMENTS_OPTIONS[0];
        this.srecPaymentsUpFront = 0;
        this.srecPaymentsProductionBased = Array(this.rootStore.analysisAssumptionsFormStore.studyPeriod + 1)
            .fill(0);
        this.srecContractLength = 10;
    }
}

export class ResultUiStore {
    rootStore: ApplicationStore;

    graphOption: GraphOption = GraphOption.NET_VALUE;
    mGraphMax: number = 0;

    constructor(rootStore: ApplicationStore) {
        makeAutoObservable(this, {rootStore: false});
        this.rootStore = rootStore;
    }

    resetGraphMax() {
        this.graphMax = 0;
    }

    get graphMax() {
        return this.mGraphMax;
    }

    set graphMax(value: number) {
        this.mGraphMax = Math.max(this.mGraphMax, Math.abs(value));
    }
}

export class FormUiStore {
    rootStore: ApplicationStore;

    _current = 0;
    seen = new Set();

    constructor(rootStore: ApplicationStore) {
        makeAutoObservable(this, {rootStore: false});
        this.rootStore = rootStore;

        this.seen.add(0);
    }

    isDone(): boolean {
        return this.rootStore.addressFormStore.isDone &&
            this.rootStore.electricalCostFormStore.isDone &&
            this.rootStore.solarSystemFormStore.isDone &&
            this.rootStore.costsFormStore.isDone &&
            this.rootStore.srecFormStore.isDone
    }

    get current(): number {
        return this._current;
    }

    set current(value: number) {
        this._current = value;
        this.seen.add(value);
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
