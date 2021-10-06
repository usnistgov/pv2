/*
 * Helper function that converts a Response into JSON.
 */
export const toJson = (response: Response) => response.json();

/**
 * Creates a curried function that take a given number of elements from an array.
 */
export const take = (x: number) => <T>(array: Array<T>) => array.filter((_, index) => index < x);

export function fetchMap<A, B>(url: string, map: (input: A, json: any) => B): (input: A) => Promise<B> {
    const data = fetch(url).then(toJson);
    return async (input: A) => data.then(json => map(input, json));
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
