import {ApplicationStore} from "./application/ApplicationStore";
import {AlternativeBuilder, RecurBuilder} from "e3-sdk";
import {
    gridConsumption,
    inverterReplacement,
    inverterReplacementAfterPpa,
    inverterReplacementResidualValue,
    loanDownPayment,
    loanPayoff,
    maintenanceCostsAfterPpa,
    panelProduction,
    panelReplacement,
    panelReplacementAfterPPA,
    productionBasedSrec,
    productionBasedSrecAfterPpa,
    totalInstallationCosts,
    totalInstallationCostsResidualValue,
    upfrontSrec
} from "./components/Request/RequestGenerator/Bcns";
import {
    INVERTER_TYPE_OPTIONS,
    LOAN_OR_CASH_OPTIONS,
    NET_METERING_FEED_TARIFF_OPTIONS,
    SREC_PAYMENTS_OPTIONS
} from "./Strings";
import {STUDY_PERIOD} from "./Defaults";

import {BcnBuilder} from "e3-sdk";

declare module "e3-sdk" {
    export interface AlternativeBuilder {
        addTotalInstallationCostsResidualValue(totalInstallationCostsResidualValueBcn: BcnBuilder, store: ApplicationStore): AlternativeBuilder;

        addPanelReplacement(store: ApplicationStore): AlternativeBuilder;

        addConsumptionAndProduction(netGridConsumption: BcnBuilder, netPanelProduction: BcnBuilder, gridConsumptionBcn: BcnBuilder, store: ApplicationStore): AlternativeBuilder;

        addLoanOrCosts(store: ApplicationStore): AlternativeBuilder;

        addSrecPayments(store: ApplicationStore): AlternativeBuilder;

        addSolarSystemCosts(store: ApplicationStore): AlternativeBuilder;

        addPanelReplacementAfterPpa(store: ApplicationStore): AlternativeBuilder;

        addOtherPpaCosts(store: ApplicationStore): AlternativeBuilder;

        addProductionBasedSrecAfterPpa(store: ApplicationStore): AlternativeBuilder;

        addInverterReplacementAfterPpa(store: ApplicationStore): AlternativeBuilder;
    }

    export interface RecurBuilder {
        addEscalationRateForYear(store: ApplicationStore): RecurBuilder;
    }
}

AlternativeBuilder.prototype.addTotalInstallationCostsResidualValue = function (
    totalInstallationCostsResidualValueBcn: BcnBuilder, store: ApplicationStore
): AlternativeBuilder {
    if ((store.solarSystemFormStore.panelLifetime ?? 25) > (store.analysisAssumptionsFormStore.studyPeriod ?? 25))
        return this.addBcn(totalInstallationCostsResidualValueBcn)

    return this
}

AlternativeBuilder.prototype.addPanelReplacement = function (store: ApplicationStore): AlternativeBuilder {
    if ((store.solarSystemFormStore.panelLifetime ?? 25) < (store.analysisAssumptionsFormStore.studyPeriod ?? 25))
        return this.addBcn(panelReplacement(store))

    return this;
}

AlternativeBuilder.prototype.addConsumptionAndProduction = function (
    netGridConsumption: BcnBuilder, netPanelProduction: BcnBuilder, gridConsumptionBcn: BcnBuilder, store: ApplicationStore
): AlternativeBuilder {
    switch (store.electricalCostFormStore.netMeteringFeedTariff) {
        case NET_METERING_FEED_TARIFF_OPTIONS[0]:
            return this.addBcn(netGridConsumption, netPanelProduction);
        case NET_METERING_FEED_TARIFF_OPTIONS[1]:
            return this.addBcn(gridConsumptionBcn, panelProduction(store));
        default:
            return this;
    }
}

AlternativeBuilder.prototype.addLoanOrCosts = function (store: ApplicationStore): AlternativeBuilder {
    switch (store.costsFormStore.loanOrCash) {
        case LOAN_OR_CASH_OPTIONS[0]:
            return this.addBcn(loanDownPayment(store), loanPayoff(store));
        case LOAN_OR_CASH_OPTIONS[1]:
            return this.addBcn(totalInstallationCosts(store));
        default:
            return this;
    }
}

AlternativeBuilder.prototype.addSrecPayments = function (store: ApplicationStore): AlternativeBuilder {
    switch (store.srecFormStore.srecPayments) {
        case SREC_PAYMENTS_OPTIONS[1]:
            return this.addBcn(upfrontSrec(store));
        case SREC_PAYMENTS_OPTIONS[2]:
            return this.addBcn(productionBasedSrec(store));
        default:
            return this;
    }
}

AlternativeBuilder.prototype.addSolarSystemCosts = function (store: ApplicationStore): AlternativeBuilder {
    switch (store.solarSystemFormStore.inverterType) {
        case INVERTER_TYPE_OPTIONS[0]:
        case INVERTER_TYPE_OPTIONS[1]:
            return this.addBcn(...inverterReplacement(store))
                .addBcn(inverterReplacementResidualValue(store));
        default:
            return this;
    }
}

AlternativeBuilder.prototype.addPanelReplacementAfterPpa = function (store: ApplicationStore): AlternativeBuilder {
    if ((store.solarSystemFormStore.panelLifetime ?? 25) < (store.analysisAssumptionsFormStore.studyPeriod ?? 25))
        return this.addBcn(panelReplacementAfterPPA(store));

    return this;
}

AlternativeBuilder.prototype.addProductionBasedSrecAfterPpa = function (store: ApplicationStore): AlternativeBuilder {
    if (store.srecFormStore.srecPayments === SREC_PAYMENTS_OPTIONS[2])
        return this.addBcn(productionBasedSrecAfterPpa(store));

    return this;
}

AlternativeBuilder.prototype.addInverterReplacementAfterPpa = function (store: ApplicationStore): AlternativeBuilder {
    switch (store.solarSystemFormStore.inverterType) {
        case INVERTER_TYPE_OPTIONS[0]:
        case INVERTER_TYPE_OPTIONS[1]:
            return this.addBcn(...inverterReplacementAfterPpa(store))
                .addBcn(inverterReplacementResidualValue(store));
        default:
            return this;
    }
}

AlternativeBuilder.prototype.addOtherPpaCosts = function (store: ApplicationStore): AlternativeBuilder {
    const studyPeriod = store.analysisAssumptionsFormStore.studyPeriod ?? STUDY_PERIOD;
    const ppaContractLength = store.costsFormStore.ppaContractLength ?? studyPeriod;

    if (ppaContractLength < studyPeriod)
        this.addBcn(maintenanceCostsAfterPpa(store))
            .addProductionBasedSrecAfterPpa(store)
            .addInverterReplacementAfterPpa(store);

    return this;
}

RecurBuilder.prototype.addEscalationRateForYear = function (store: ApplicationStore): RecurBuilder {
    if(store.escalationRateFormStore.escalationRateForYear.length !== 0)
        return this.varValue(store.escalationRateFormStore.escalationRateForYear);

    return this;
}