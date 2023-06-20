import React, {useContext, useEffect, useState} from "react";
import {Store} from "../../application/ApplicationStore";
import {observer} from "mobx-react-lite";
import {toJson} from "../../Utils";
import {createE3Request} from "./RequestGenerator/E3RequestGenerator";
import Results from "../Results/Results";
import ErrorDialog from "../ErrorDialog";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import {E3, Output} from "e3-sdk";

/**
 * Checks if a value is valid, in other words is not null, undefined, etc.
 *
 * @param value the value to check for validity.
 * @returns true if the field is valid, false otherwise.
 */
export function valid(value: any): boolean {
    return value !== null && value !== undefined && typeof value !== 'object' && !isNaN(value);
}

class FetchError extends Error {
    response: Response;

    constructor(message: string, response: Response) {
        super(message);
        this.response = response;
    }
}

const Request = observer(() => {
    const store = useContext(Store);

    const [result, setResult] = useState<Output | undefined>(undefined);
    const [error, setError] = useState<FetchError | null>(null);
    const [errorDetails, setErrorDetails] = useState<string | null>(null);

    function showError(e: FetchError) {
        if (e.response)
            e.response.json().then(setErrorDetails);

        setError(e);
    }

    // Fetches results from E3 API
    useEffect(() => {
        const controller = new AbortController();

        createE3Request(store)
            .then(request => {
                console.log(request.build());
                return request;
            })
            .then(request => E3.analyze(import.meta.env.VITE_REQUEST_URL, request, import.meta.env.VITE_API_TOKEN, controller.signal))
            .then(x => {
                console.log(x);
                return x;
            })
            .then(setResult)
            .catch(showError)

        return () => controller.abort();
    }, [store]);

    return (
        <>
            <ErrorDialog predicate={error !== null} error={error} errorDetails={errorDetails}/>
            <LoadingIndicator predicate={(result === undefined || result === null)}/>
            <Results result={result}/>
        </>
    );
});

export default Request;
