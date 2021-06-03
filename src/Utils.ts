import {createSlice, Slice} from "@reduxjs/toolkit";
import {useDispatch, useSelector, useStore} from "react-redux";


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

/**
 * React hook to create a ReduxGetSet for the given slice and variable name.
 *
 * @param name The name of the variable in the slice.
 * @param initialValue The initial value of the redux slice.
 */
export function useReduxGetSet<T>(name: string, initialValue: T): ReduxGetSet<T> {
    const store: any = useStore();
    const slice = createDefaultSlice(name, initialValue);

    store.injectReducer(name, slice.reducer)

    const value = useSelector((state: any) => state[name]);
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

/*
 * Helper function that converts a Response into JSON.
 */
export const toJson = (response: Response) => response.json();

/**
 * Creates a curried function that take a given number of elements from an array.
 */
export const take = (x: number) => (array: Array<any>) => array.filter((_, index) => index < x);
