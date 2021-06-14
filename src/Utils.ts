import {useDispatch, useSelector} from "react-redux";
import {actions, RootState} from "./application/ApplicationStore";


/**
 * React hook to create a ReduxGetSet for the given slice and variable name.
 *
 * @param name The name of the variable in the slice.
 */
export function useReduxGetSet<T>(name: string): ReduxGetSet<T> {
    const selector = useSelector((store: RootState) => store[name]);
    const dispatch = useDispatch();

    return {
        set: (arg: T) => dispatch((actions as any)[name].set(arg)),
        get: () => selector,
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
