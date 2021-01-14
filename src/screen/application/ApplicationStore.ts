import {configureStore} from "@reduxjs/toolkit";
import {activeStepSlice} from "./components/StepperNavReducer";
import {addressSlice, citySlice, stateSlice, zipcodeSlice} from "./components/pages/AddressFormReducer";

export const rootStore = configureStore({
    reducer: {
        activeStep: activeStepSlice.reducer,
        address: addressSlice.reducer,
        city: citySlice.reducer,
        state: stateSlice.reducer,
        zipcode: zipcodeSlice.reducer,
    }
})

export type RootState = ReturnType<typeof rootStore.getState>
export type RootDispatch = ReturnType<typeof rootStore.dispatch>