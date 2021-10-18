import React, {useContext, useEffect, useState} from "react";

// Library Imports
import {
    Backdrop,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@material-ui/core";
import {Icon as MdiIcon} from "@mdi/react";
import {mdiClose} from "@mdi/js";
import {Store} from "../ApplicationStore";
import {observer} from "mobx-react-lite";

// User Imports
import {toJson} from "../../Utils";
import {createE3Request} from "./E3RequestGenerator";
import Results from "./Results";
import RedirectWhen from "../../components/RedirectWhen";
import Config from "../../Config";

export enum GraphOption {
    NET_VALUE, SAVINGS, CUMULATIVE
}

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

const ResultData = observer(() => {
    const store = useContext(Store);

    const [result, setResult] = useState<object | null>(null);
    const [shouldCancel, setCancel] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [error, setError] = useState<FetchError | null>(null);
    const [showErrorDetails, setShowErrorDetails] = useState(false);
    const [errorDetails, setErrorDetails] = useState<string | null>(null);

    function showError(e: FetchError) {
        if(e.response) {
            e.response.json()
                .then((details) => {
                    console.log(details);
                    return details;
                })
                .then(setErrorDetails);
        }

        setError(e);
        setShowErrorDialog(true);
    }

    // Fetches results from E3 API
    useEffect(() => {
        const controller = new AbortController();

        createE3Request(store)
            .then((request) => {
                // Generate fetch post request
                const fetchOptions: RequestInit = {
                    method: "POST",
                    signal: controller.signal,
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(request)
                }

                // TODO replace with E3 url once that is set up
                // Fetch results from E3
                // "http://localhost/api/v1/analysis/?key=CFXFTKIq.5lAaGLvjWDvh6heyfmZeAsbF2bz0Ow8S"
                // "http://e3test.el.nist.gov/api/v1/analysis/?key=ysSq34WU.xq04WeLQ3qMqLF8mhka839ad7KUqEKRb"
                fetch("http://localhost/api/v1/analysis/?key=CFXFTKIq.5lAaGLvjWDvh6heyfmZeAsbF2bz0Ow8S", fetchOptions)
                    .then((response) => {
                        if (response.ok)
                            return response;

                        throw new FetchError("E3 fetch failed", response);
                    })
                    .then(toJson)
                    .then((result) => {
                        console.log(result);
                        return result;
                    })
                    .then(setResult)
                    .catch(showError);
            });

        // If the component is unmounted, abort the request
        return () => controller.abort();
    }, [store]);

    return (
        <>
            <RedirectWhen predicate={shouldCancel} to={Config.routes.APPLICATION}/>
            <Dialog open={showErrorDialog} onClose={() => setShowErrorDialog(false)}>
                <DialogTitle>An error has occurred</DialogTitle>
                <DialogContent>
                    <div>
                        {`${error?.response?.status} ${error?.response?.statusText}`}
                    </div>
                    {showErrorDetails && errorDetails && <code>
                        {JSON.stringify(errorDetails)}
                    </code>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowErrorDetails(!showErrorDetails)} color={"primary"}>
                        Show Details
                    </Button>
                    <Button onClick={() => setShowErrorDialog(false)} color={"primary"}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <Backdrop className={"result-loading-backdrop"} open={result === null}>
                <Box className={"loading-indicator"}>
                    <CircularProgress/>
                    <h1>Calculating Results</h1>
                    <Button className={"cancel-calculation-button"}
                            variant={"contained"}
                            color={"secondary"}
                            startIcon={<MdiIcon path={mdiClose} size={1}/>}
                            onClick={() => setCancel(true)}>
                        Cancel
                    </Button>
                </Box>
            </Backdrop>
            <Results result={result}/>
        </>
    );
});

export default ResultData;
