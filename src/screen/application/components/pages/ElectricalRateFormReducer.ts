import {createNumberSlice, createStringSlice} from "../../Utils";

export const [
    electricalCompanyNameSlice,
    netMeteringFeedTariffSlice
] = [
    "electricalCompanyName",
    "netMeteringFeedTariff"
].map(createStringSlice);

export const [
    annualConsumptionSlice,
    monthlyFlatRateChargeSlice,
    electricUnitPriceSlice,
    excessGenerationUnitPriceSlice,
    pvGridConnectionRateSlice
] = [
    "annualConsumption",
    "monthlyFlatRateCharge",
    "electricUnitPrice",
    "excessGenerationUnitPrice",
    "pvGridConnectionRate"
].map(createNumberSlice);
