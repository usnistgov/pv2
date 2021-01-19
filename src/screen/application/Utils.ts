import {createSlice, Slice} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";

import {RootState} from "./ApplicationStore";


/**
 * Creates a slice with the given name, value and a setter.
 *
 * @param name The name of the variable.
 * @param initialValue The initial value of the variable.
 */
export function createDefaultSlice<T>(name: string, initialValue: T): Slice {
    return createSlice({
        name: name,
        initialState: initialValue,
        reducers: {
            set: (state, action) => action.payload
        }
    })
}

// Convenience function to create default string slices.
export const createStringSlice = (name: string) => createDefaultSlice(name, "");

// Convenience function to create default number slices.
export const createNumberSlice = (name: string) => createDefaultSlice(name, 0);

/**
 * React hook to create a ReduxGetSet for the given slice and variable name.
 *
 * @param name The name of the variable in the slice.
 * @param slice The slice to get the actions from.
 */
export function useReduxGetSet<T>(name: string, slice: Slice): ReduxGetSet<T> {
    const value = useSelector((state: RootState) => state[name as keyof RootState]);
    const dispatch = useDispatch();

    return {
        set: (arg: T) => dispatch(slice.actions.set(arg)),
        get: () => value,
    }
}

/*
 * ReduxGetSet defines a getter and setter to be used to access a redux object that
 * can be easily passed to other components.
 */
export interface ReduxGetSet<T> {
    set: (arg: T) => void;
    get: () => T;
}