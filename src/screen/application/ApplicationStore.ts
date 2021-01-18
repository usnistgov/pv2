import {configureStore, Slice} from "@reduxjs/toolkit";
import {activeStepSlice} from "./components/StepperNavReducer";
import {addressSlice, citySlice, stateSlice, zipcodeSlice} from "./components/pages/AddressFormReducer";
import {
    annualConsumptionSlice,
    electricalCompanyNameSlice,
    monthlyFlatRateChargeSlice,
    electricUnitPriceSlice,
    excessGenerationUnitPriceSlice,
    pvGridConnectionRateSlice,
    netMeteringFeedTariffSlice
} from "./components/pages/ElectricalRateFormReducer";

export const rootStore = configureStore({
    reducer: {
        activeStep: activeStepSlice.reducer,

        // Address Form
        address: addressSlice.reducer,
        city: citySlice.reducer,
        state: stateSlice.reducer,
        zipcode: zipcodeSlice.reducer,

        //Electrical Rate Information Form
        electricalCompanyName: electricalCompanyNameSlice.reducer,
        annualConsumption: annualConsumptionSlice.reducer,
        monthlyFlatRateCharge: monthlyFlatRateChargeSlice.reducer,
        electricUnitPrice: electricUnitPriceSlice.reducer,
        netMeteringFeedTariff: netMeteringFeedTariffSlice.reducer,
        excessGenerationUnitPrice: excessGenerationUnitPriceSlice.reducer,
        pvGridConnectionRate: pvGridConnectionRateSlice.reducer,
    }
})

export type RootState = ReturnType<typeof rootStore.getState>
export type RootDispatch = ReturnType<typeof rootStore.dispatch>