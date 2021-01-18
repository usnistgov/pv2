import {createSlice, Slice} from "@reduxjs/toolkit";

export function createDefaultSlice<T>(name: string, initialValue: T): Slice {
    return createSlice({
        name: name,
        initialState: initialValue,
        reducers: {
            set: (state, action) => action.payload
        }
    })
}

export const createStringSlice = (name: string) => createDefaultSlice(name, "");

export const createNumberSlice = (name: string) => createDefaultSlice(name, 0);

export interface ReduxGetSet<T> {
    set: (arg: T) => void;
    get: () => T;
}