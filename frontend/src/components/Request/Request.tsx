import React, {useContext, useEffect, useState} from "react";
import {Store} from "../../application/ApplicationStore";
import {observer} from "mobx-react-lite";
import {toJson} from "../../Utils";
import {createE3Request} from "./RequestGenerator/E3RequestGenerator";
import Results from "../Results/Results";
import ErrorDialog from "../ErrorDialog";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import {Result} from "../../typings/Result";

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

    const [result, setResult] = useState<Result | undefined>(undefined);
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
            .then((request) => {
                console.log(request.build());
                // Generate fetch post request
                const fetchOptions: RequestInit = {
                    method: "POST",
                    signal: controller.signal,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Api-Key ${import.meta.env.VITE_API_TOKEN}`
                    },
                    body: JSON.stringify(request.build())
                }

                // Fetch results from E3
                fetch(import.meta.env.VITE_REQUEST_URL ?? "", fetchOptions)
                    .then((response) => {
                        if (response.ok)
                            return response;

                        throw new FetchError("E3 fetch failed", response);
                    })
                    .then(toJson)
                    .then(setResult)
                    .catch(showError);
            });

        // If the component is unmounted, abort the request
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
