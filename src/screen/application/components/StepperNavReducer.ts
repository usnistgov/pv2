import {createSlice} from "@reduxjs/toolkit";

export const activeStepSlice = createSlice({
    name: 'activeStep',
    initialState: 0,
    reducers: {
        increment: state => state + 1,
        decrement: state => state - 1,
    }
})

export const {increment, decrement} = activeStepSlice.actions;