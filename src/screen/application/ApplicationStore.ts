import {configureStore} from "@reduxjs/toolkit";
import {addressSlice, citySlice, stateSlice, zipcodeSlice} from "./pages/AddressFormReducer";
import {
    annualConsumptionSlice,
    electricalCompanyNameSlice,
    electricUnitPriceSlice,
    excessGenerationUnitPriceSlice,
    monthlyFlatRateChargeSlice,
    netMeteringFeedTariffSlice,
    pvGridConnectionRateSlice
} from "./pages/ElectricalRateFormReducer";
import {activeStepSlice} from "./components/StepperNav";

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