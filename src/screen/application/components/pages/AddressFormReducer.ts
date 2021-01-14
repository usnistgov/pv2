import {createSlice, Slice} from "@reduxjs/toolkit";

function createAddressFormSlice(name: string): Slice {
    return createSlice({
        name: name,
        initialState: "",
        reducers: {
            set: (state, action) => action.payload
        }
    })
}

export const [addressSlice, citySlice, stateSlice, zipcodeSlice] =
    ['address', 'city', 'state', 'zipcode'].map(createAddressFormSlice)
