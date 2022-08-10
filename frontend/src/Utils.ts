/*
 * Helper function that converts a Response into JSON.
 */
import {valid} from "./components/Request/Request";

export const toJson = (response: Response) => response.json();

/**
 * Creates a curried function that take a given number of elements from an array.
 */
export const take = (x: number) => <T>(array: Array<T>) => array.filter((_, index) => index < x);

export function fetchMap<A, B, C>(url: string, map: (input: A, json: C) => B): (input: A) => Promise<B> {
    const data = fetch(url).then(toJson);
    return async (input: A) => data.then(json => map(input, json));
}

export const defaultIfUndefined = <A, B>(value: A, defaultValue: B): A | B  => {
    return value === undefined ? defaultValue : value
}

export function generateVarValue(array: number[], initial: number): number[] {
    let tmp = initial;

    return array.map((value) => {
        if (value === tmp)
            return 0;

        if (tmp === 0)
            tmp = initial;

        let result = (value - tmp) / tmp;
        tmp = value;
        return result;
    });
}

export const DecimalTest = {
    name: "Number of Decimals",
    message: "Too many decimals, can only have 4.",
    test: (value: any) => {
        // Must be defined
        if (value === undefined || value === null)
            return false;

        // Must not be an integer
        if (value.toString().split('.').length <= 1)
            return true;

        // Must have 4 or fewer decimals
        return value.toString().split('.')[1].length <= 4;
    }
}

export const HighElectricalCostTest = {
    name: "Electrical Cost is too high",
    message: "Price set unexpectedly high. Ensure your price is in $/kWh.",
    test: (value: any) => {
        // Must be defined
        if (value === undefined || value === null)
            return false;

        // Must be less than or equal to 1.
        return value <= 1;
    },
}

/**
 * Checks a value is valid and if so returns that value, otherwise it returns the string "NA".
 *
 * @param value the value to check.
 * @returns the value if it is valid, otherwise the string "NA".
 */
export function validOrNA(value: any): any {
    return valid(value) ? value : "NA"
}

export function scrollTo(amount: number) {
    return () => window.scrollTo({top: amount, behavior: 'smooth'})
}

export function calculateNominalDiscountRate(real: number, inflation: number): number {
    return (1 + real) * (1 + inflation) - 1;
}

export function calculateRealDiscountRate(nominal: number, inflation: number): number {
    return ((1 + nominal) / (1 + inflation)) - 1;
}