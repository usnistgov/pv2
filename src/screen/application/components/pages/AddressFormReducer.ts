import {createStringSlice} from "../../Utils";

export const [addressSlice, citySlice, stateSlice, zipcodeSlice] =
    ['address', 'city', 'state', 'zipcode'].map(createStringSlice)
