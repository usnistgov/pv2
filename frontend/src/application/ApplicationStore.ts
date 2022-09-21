import {autorun, makeAutoObservable, reaction} from "mobx";
import React from "react";
import {
    ESCALATION_RATES_SAME_OR_DIFF_OPTIONS,
    GraphOption,
    INVERTER_TYPE_OPTIONS,
    KNOW_ANNUAL_CONSUMPTION_OPTIONS,
    LOAN_OR_CASH_OPTIONS,
    NET_METERING_FEED_TARIFF_OPTIONS,
    PPA_OPTIONS,
    RESIDUAL_VALUE_APPROACH_OPTIONS,
    SREC_PAYMENTS_OPTIONS,
    VIEW_ANNUAL_ESCALATION_RATES_OPTIONS
} from "../Strings";
import {
    DecimalTest,
    HighElectricalCostTest,
    MustBeHighWattage, PPAContractLengthLTEPanelLifetime,
    PVEfficiencyRealistic,
    take,
    toJson,
    validateFields
} from "../Utils";
import Constants from "../Constants";
import {
    ANNUAL_MAINTENANCE,
    DEGRADATION_RATE,
    GENERAL_INFLATION,
    INVERTER_LIFETIME,
    INVERTER_REPLACEMENT,
    NOMINAL_DISCOUNT_RATE,
    PANEL_LIFETIME,
    REAL_DISCOUNT_RATE,
    SREC_CONTRACT_LENGTH,
    SREC_UPFRONT,
    STUDY_PERIOD,
    SYSTEM_DESCRIPTION
} from "../Defaults";
import {Environment} from "../typings/Environment";
import _ from "lodash";
import {number, object, string} from "yup";

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
        autorun(() => this.getEnvironmentVariables(this.addressFormStore.zipcode));
        autorun(() => this.getAverageElectricityPrice(this.addressFormStore.zipcode));
        autorun(() => this.getNormalizedState(this.addressFormStore.zipcode));
    }

    getEnvironmentVariables(zipcode: string) {
        if (zipcode.length <= 0)
            return;

        fetch(`/api/environment/${zipcode}`)
            .then(toJson)
            .then((value) => value[0])
            .then((value) => _.mapKeys(value, (v, k) => _.camelCase(k)))
            .then((value) => this.analysisAssumptionsFormStore.environmentalVariables = (value as Environment));
    }

    calculateEscalationRates(zipcode: string) {
        if (zipcode.length <= 0)
            return;

        fetch(`/api/escalation-rates/${zipcode}`)
            .then(toJson)
            .then((result) => result[0].rates)
            .then<number[]>(take((this.analysisAssumptionsFormStore.studyPeriod ?? STUDY_PERIOD) + 1))
            .then((result) => {
                this.escalationRateFormStore.productionEscalationRateForYear = result;
                this.escalationRateFormStore.escalationRateForYear = result;
            });
    }

    getAverageElectricityPrice(zipcode: string) {
        if (zipcode.length <= 0)
            return;

        fetch(`/api/average-electricity-price/zipcode/${zipcode}`)
            .then(toJson)
            .then((value) => value[0]?.average_electricity_price)
            .then((value) => {
                this.electricalCostFormStore.electricUnitPrice = value;
                this.electricalCostFormStore.excessGenerationUnitPrice = value;
            });
    }

    getNormalizedState(zipcode: string) {
        if (zipcode.length <= 0)
            return;

        fetch(`/api/state/${zipcode}`)
            .then(toJson)
            .then((value) => value[0]?.state)
            .then((value) => {
                this.addressFormStore.normalizedState = value;
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

    normalizedState = "";

    //Validation Schemas
    addressSchema = string();
    citySchema = string();
    stateSchema = string();
    zipcodeSchema = string().required();

    constructor(rootStore: ApplicationStore) {
        makeAutoObservable(this, {rootStore: false});
        this.rootStore = rootStore;
    }

    get validate(): boolean {
        return validateFields(object({
            address: this.addressSchema,
            city: this.citySchema,
            state: this.stateSchema,
            zipcode: this.zipcodeSchema
        }), {
            address: this.address,
            city: this.city,
            state: this.state,
            zipcode: this.zipcode
        });
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

    isAdvanced = false;

    studyPeriod?: number = STUDY_PERIOD;
    nominalDiscountRate?: number = NOMINAL_DISCOUNT_RATE;
    realDiscountRate?: number = REAL_DISCOUNT_RATE;
    generalInflation?: number = GENERAL_INFLATION;
    residualValueApproach = RESIDUAL_VALUE_APPROACH_OPTIONS[0];

    environmentalVariables?: Environment;

    //Validation Schemas
    studyPeriodSchema = number().typeError("Must be a number").required().max(40).min(1).integer();
    nominalDiscountRateSchema = number().typeError("Must be a number").required().max(100).min(0).test(DecimalTest);
    inflationRateSchema = number().typeError("Must be a number").required().max(100).min(0).test(DecimalTest);
    realDiscountRateSchema = number().typeError("Must be a number").required().max(100).min(0).test(DecimalTest);

    constructor(rootStore: ApplicationStore) {
        makeAutoObservable(this, {rootStore: false});
        this.rootStore = rootStore
    }

    get validate() {
        return validateFields(object({
            studyPeriod: this.studyPeriodSchema,
            nominalDiscountRate: this.nominalDiscountRateSchema,
            inflationRate: this.inflationRateSchema,
            realDiscountRate: this.realDiscountRateSchema
        }), {
            studyPeriod: this.studyPeriod,
            nominalDiscountRate: this.nominalDiscountRate,
            inflationRate: this.generalInflation,
            realDiscountRate: this.realDiscountRate
        });
    }

    reset() {
        this.isAdvanced = false;

        this.studyPeriod = STUDY_PERIOD;
        this.nominalDiscountRate = NOMINAL_DISCOUNT_RATE;
        this.realDiscountRate = REAL_DISCOUNT_RATE;
        this.generalInflation = GENERAL_INFLATION;
        this.residualValueApproach = RESIDUAL_VALUE_APPROACH_OPTIONS[0];
    }
}

export class ElectricalCostFormStore {
    rootStore: ApplicationStore;

    isAdvanced = false;

    electricalCompanyName = "";
    netMeteringFeedTariff = NET_METERING_FEED_TARIFF_OPTIONS[0];
    knowAnnualConsumption: string = KNOW_ANNUAL_CONSUMPTION_OPTIONS[0];
    annualConsumption: number | undefined = undefined;
    monthlyFlatRateCharge: number | undefined = 0;
    electricUnitPrice: number | undefined = undefined;
    excessGenerationUnitPrice: number | undefined = undefined;
    pvGridConnectionRate: number | undefined = 0;

    //Validation Schemas
    electricalCompanyNameSchema = string();
    annualConsumptionSchema = number().typeError("Must be a number").required().min(0).test(DecimalTest);
    averageElectricityPriceSchema = number().typeError("Must be a number").required().min(0).test(HighElectricalCostTest).test(DecimalTest);
    flatRateChargeSchema = number().typeError("Must be a number").required().min(0).test(DecimalTest);
    electricalUnitPriceSchema = number().typeError("Must be a number").required().min(0).test(DecimalTest).test(HighElectricalCostTest);
    excessGenerationUnitPriceSchema = number().typeError("Must be a number").required().min(0).test(DecimalTest).test(HighElectricalCostTest);
    pvGridConnectionRateSchema = number().typeError("Must be a number").min(0).test(DecimalTest);

    constructor(rootStore: ApplicationStore) {
        makeAutoObservable(this, {rootStore: false});
        this.rootStore = rootStore;
    }

    get validate(): boolean {
        if (this.knowAnnualConsumption === KNOW_ANNUAL_CONSUMPTION_OPTIONS[0]) {
            return validateFields(object({
                electricalCompanyName: this.electricalCompanyNameSchema,
                electricUnitPrice: this.averageElectricityPriceSchema,
                flatRateCharge: this.flatRateChargeSchema,
                excessGenerationUntiPrice: this.averageElectricityPriceSchema,
                pvGridConnectionRate: this.pvGridConnectionRateSchema
            }), {
                electricalCompanyName: this.electricalCompanyName,
                electricUnitPrice: this.electricUnitPrice,
                flatRateCharge: this.monthlyFlatRateCharge,
                excessGenerationUntiPrice: this.excessGenerationUnitPrice,
                pvGridConnectionRate: this.pvGridConnectionRate
            });
        }

        return validateFields(object({
            annualConsumption: this.annualConsumptionSchema,
            electricalCompanyName: this.electricalCompanyNameSchema,
            electricUnitPrice: this.electricalUnitPriceSchema,
            flatRateCharge: this.flatRateChargeSchema,
            excessGenerationUntiPrice: this.excessGenerationUnitPriceSchema,
            pvGridConnectionRate: this.pvGridConnectionRateSchema
        }), {
            annualConsumption: this.annualConsumption,
            electricalCompanyName: this.electricalCompanyName,
            electricUnitPrice: this.electricUnitPrice,
            flatRateCharge: this.monthlyFlatRateCharge,
            excessGenerationUntiPrice: this.excessGenerationUnitPrice,
            pvGridConnectionRate: this.pvGridConnectionRate
        });
    }

    reset() {
        this.isAdvanced = false;

        this.electricalCompanyName = "";
        this.netMeteringFeedTariff = NET_METERING_FEED_TARIFF_OPTIONS[0];
        this.knowAnnualConsumption = KNOW_ANNUAL_CONSUMPTION_OPTIONS[0];
        this.annualConsumption = undefined;
        this.monthlyFlatRateCharge = 0;
        this.pvGridConnectionRate = 0;

        this.rootStore.getAverageElectricityPrice(this.rootStore.addressFormStore.zipcode);

        this.rootStore.escalationRateFormStore.reset()
    }
}

export class EscalationRateFormStore {
    rootStore: ApplicationStore;

    viewAnnualEscalationRates = VIEW_ANNUAL_ESCALATION_RATES_OPTIONS[1];
    escalationRatesSameOrDiff = ESCALATION_RATES_SAME_OR_DIFF_OPTIONS[0];
    escalationRateForYear: number[] = [];
    productionEscalationRateForYear: number[] = [];

    //Validation Schemas
    escalationRateSchema = number().typeError("Must be a number").required().max(100).min(-100).test(DecimalTest);

    constructor(rootStore: ApplicationStore) {
        makeAutoObservable(this, {rootStore: false});
        this.rootStore = rootStore;
    }

    get validate(): boolean {
        if (this.viewAnnualEscalationRates === VIEW_ANNUAL_ESCALATION_RATES_OPTIONS[0]) {
            for (let rate of this.escalationRateForYear) {
                if (!validateFields(this.escalationRateSchema, rate))
                    return false;
            }
        }

        if (this.escalationRatesSameOrDiff === ESCALATION_RATES_SAME_OR_DIFF_OPTIONS[1]) {
            for (let rate of this.productionEscalationRateForYear) {
                if (!validateFields(this.escalationRateSchema, rate))
                    return false;
            }
        }

        return true;
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

    systemDescription: string | undefined = SYSTEM_DESCRIPTION;
    panelEfficiency = undefined;
    inverterType = INVERTER_TYPE_OPTIONS[0];
    totalSystemSize = undefined;
    estimatedAnnualProduction = undefined;
    // Advanced
    panelLifetime? = PANEL_LIFETIME;
    inverterLifetime?: number = INVERTER_LIFETIME;
    degradationRate? = DEGRADATION_RATE;

    lifetimeDefault: boolean = true;

    //Validation Schemas
    systemDescriptionSchema = string().required();
    panelEfficiencySchema = number().typeError("Must be a number").test(PVEfficiencyRealistic).test(DecimalTest);
    totalSystemSizeSchema = number().typeError("Must be a number").required().test(MustBeHighWattage).test(DecimalTest);
    estimatedAnnualProductionSchema = number().typeError("Must be a number").required().min(1000).test(DecimalTest);
    panelLifetimeSchema = number().typeError("Must be a number").required().max(40).min(10).integer();
    inverterLifetimeSchema = number().typeError("Must be a number").required().max(40).min(5).integer();
    degradationRateSchema = number().typeError("Must be a number").required().max(2.5).min(0).test(DecimalTest);

    constructor(rootStore: ApplicationStore) {
        makeAutoObservable(this, {rootStore: false});

        this.rootStore = rootStore;
    }

    get validate(): boolean {
        return validateFields(object({
            systemDescription: this.systemDescriptionSchema,
            totalSystemSize: this.totalSystemSizeSchema,
            estimatedAnnualProduction: this.estimatedAnnualProductionSchema,
            inverterLifetime: this.inverterLifetimeSchema,
            degradationRate: this.degradationRateSchema
        }), {
            systemDescription: this.systemDescription,
            totalSystemSize: this.totalSystemSize,
            estimatedAnnualProduction: this.estimatedAnnualProduction,
            inverterLifetime: this.inverterLifetime,
            degradationRate: this.degradationRate
        });
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
        this.systemDescription = SYSTEM_DESCRIPTION;
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
    inverterReplacementCosts?: string | number = INVERTER_REPLACEMENT;
    annualMaintenanceCosts? = ANNUAL_MAINTENANCE;

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

    //Validation Schemas
    totalInstallationCostsSchema = number().typeError("Must be a number").required().min(0).test(DecimalTest);
    stateOrLocalTaxCreditsOrGrantsOrRebatesSchema = number().typeError("Must be a number").required().min(0).test(DecimalTest);
    inverterReplacementCostsSchema = number().typeError("Must be a number").required().min(0).test(DecimalTest);
    annualMaintenanceCostsSchema = number().typeError("Must be a number").required().min(0).test(DecimalTest);

    downPaymentSchema = number().typeError("Must be a number").required().min(0).test(DecimalTest);
    nominalInterestRateSchema = number().typeError("Must be a number").required().max(100).min(0).test(DecimalTest);
    monthlyPaymentSchema = number().typeError("Must be a number").required().moreThan(0).test(DecimalTest);
    loanLengthSchema = number().typeError("Must be a number").required().min(0).integer();

    get ppaContractLengthSchema() {
        return number().typeError("Must be a number")
            .required()
            .test(PPAContractLengthLTEPanelLifetime(this.rootStore.solarSystemFormStore.panelLifetime ?? PANEL_LIFETIME))
            .min(1)
            .integer()
    }

    ppaElectricityRateSchema = number().typeError("Must be a number").required().min(0).test(DecimalTest);
    ppaEscalationRateSchema = number().typeError("Must be a number").required().min(0).test(DecimalTest);
    ppaPurcahsePriceSchema = number().typeError("Must be a number").required().min(0).test(DecimalTest);

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
                return ((this.rootStore.solarSystemFormStore.totalSystemSize ?? 0) * 0.18).toFixed(2);

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

    get validate(): boolean {
        let loan = true;
        let ppa = true;

        const base = validateFields(object({
            totalInstallationCosts: this.totalInstallationCostsSchema,
            stateOrLocalTaxCreditOrGrantsOrRebates: this.stateOrLocalTaxCreditsOrGrantsOrRebatesSchema,
            inverterReplacementCosts: this.inverterReplacementCostsSchema,
            annualMaintenance: this.annualMaintenanceCostsSchema
        }), {
            totalInstallationCosts: this.totalInstallationCosts,
            stateOrLocalTaxCreditOrGrantsOrRebates: this.stateOrLocalTaxCreditsOrGrantsOrRebates,
            inverterReplacementCosts: this.inverterReplacementCosts,
            annualMaintenance: this.annualMaintenanceCosts
        });

        if (this.loanOrCash === LOAN_OR_CASH_OPTIONS[0]) {
            loan = validateFields(object({
                loanLength: this.loanLengthSchema,
                downPayment: this.downPaymentSchema,
                monthlyPayment: this.monthlyPaymentSchema
            }), {
                loanLength: this.loanLength,
                downPayment: this.downPayment,
                monthlyPayment: this.monthlyPayment
            });
        }

        if (this.ppaOption === PPA_OPTIONS[0]) {
            ppa = validateFields(object({
                ppaContractLength: this.ppaContractLengthSchema,
                ppaElectricityRate: this.ppaElectricityRateSchema,
                ppaEscalationRate: this.ppaEscalationRateSchema,
                ppaPurchasePrice: this.ppaPurcahsePriceSchema
            }), {
                ppaContractLength: this.ppaContractLength,
                ppaElectricityRate: this.ppaElectricityRate,
                ppaEscalationRate: this.ppaEscalationRate,
                ppaPurchasePrice: this.ppaPurchasePrice
            });
        }

        return base && loan && ppa;
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
    srecPaymentsUpFront? = SREC_UPFRONT;
    srecPaymentsProductionBased: (number | undefined)[] = [];
    srecContractLength? = SREC_CONTRACT_LENGTH;

    //Validation Schemas
    srecPaymentsUpFrontSchema = number().typeError("Must be a number").required().min(0).test(DecimalTest);

    get srecContractLengthSchema() {
        return number()
            .typeError("Must be a number")
            .required()
            .min(0)
            .max(this.rootStore.analysisAssumptionsFormStore.studyPeriod ?? STUDY_PERIOD)
            .integer();
    }

    srecPaymentsProductionBasedSchema = number().typeError("Must be a number").required().min(0).test(DecimalTest);

    constructor(rootStore: ApplicationStore) {
        makeAutoObservable(this, {rootStore: false});

        this.rootStore = rootStore;
        this.srecPaymentsProductionBased = Array(
            (rootStore.analysisAssumptionsFormStore.studyPeriod ?? STUDY_PERIOD) + 1
        )
            .fill(0);
    }

    get validate(): boolean {
        if (this.srecPayments === SREC_PAYMENTS_OPTIONS[0])
            return true;

        if (this.srecPayments === SREC_PAYMENTS_OPTIONS[1])
            return validateFields(this.srecPaymentsUpFrontSchema, this.srecPaymentsUpFront);

        if (this.srecPayments === SREC_PAYMENTS_OPTIONS[2]) {
            for(let payment of this.srecPaymentsProductionBased){
                if(!validateFields(this.srecPaymentsProductionBasedSchema, payment))
                    return false;
            }

            return validateFields(this.srecContractLengthSchema, this.srecContractLength);
        }

        return false;
    }

    reset() {
        this.srecPayments = SREC_PAYMENTS_OPTIONS[0];
        this.srecPaymentsUpFront = 0;
        this.srecPaymentsProductionBased = Array(
            (this.rootStore.analysisAssumptionsFormStore.studyPeriod ?? STUDY_PERIOD) + 1
        )
            .fill(0);
        this.srecContractLength = 10;
    }
}

export class ResultUiStore {
    rootStore: ApplicationStore;

    mGraphOption: GraphOption = GraphOption.CUMULATIVE;
    mGraphMax: number = 0;

    constructor(rootStore: ApplicationStore) {
        makeAutoObservable(this, {rootStore: false});
        this.rootStore = rootStore;
    }

    set graphOption(option: GraphOption) {
        if (option !== this.mGraphOption) {
            this.resetGraphMax();
            this.mGraphOption = option;
        }
    }

    get graphOption() {
        return this.mGraphOption;
    }

    resetGraphMax() {
        this.mGraphMax = 0;
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

    validate(): boolean {
        return this.rootStore.addressFormStore.validate &&
            this.rootStore.electricalCostFormStore.validate &&
            this.rootStore.solarSystemFormStore.validate &&
            this.rootStore.costsFormStore.validate &&
            this.rootStore.srecFormStore.validate
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
