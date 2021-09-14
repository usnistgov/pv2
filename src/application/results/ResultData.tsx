import React, {useContext, useEffect, useState} from "react";

// Library Imports
import {useHistory} from "react-router-dom";
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

// User Imports
import {toJson} from "../../Utils";
import {createE3Request} from "./E3RequestGenerator";
import Results from "./Results";
import {Store} from "../ApplicationStore";
import {observer} from "mobx-react-lite";

const exampleResults = [{
    "alternativeSummaryObjects": [
        {
            "altID": 0,
            "totalBenefits": {},
            "totalCosts": 15791.20,
            "totalCostsInv": 0,
            "totalCostsNonInv": 15791.20,
            "netBenefits": {},
            "netSavings": 0,
            "SIR": {},
            "IRR": {},
            "AIRR": {},
            "SPP": {},
            "DPP": {},
            "BCR": {},
            "quantSum": [250000],
            "quantUnits": ["kwh"],
            "MARR": 0.06,
            "deltaQuant": {},
            "nsDeltaQuant": {},
            "nsPercQuant": {},
            "nsElasticityQuant": {}
        },
        {
            "altID": 1,
            "totalBenefits": {},
            "totalCosts": 511,
            "totalCostsInv": 25107,
            "totalCostsNonInv": -40388,
            "netBenefits": {},
            "netSavings": 15280,
            "SIR": 1.61,
            "AIRR": 0.083,
            "SPP": 5,
            "DPP": 7,
            "BCR": {},
            "quantSum": [7950],
            "quantUnits": ["kwh"],
            "MARR": 0.06,
            "deltaQuant": [-242050],
            "nsDeltaQuant": [-0.06],
            "nsPercQuant": [-157.82],
            "nsElasticityQuant": [-0.39]
        },
        {
            "altID": 2,
            "totalBenefits": {},
            "totalCosts": 11643.9,
            "totalCostsInv": 0,
            "totalCostsNonInv": 11643.9,
            "netBenefits": {},
            "netSavings": 4147.31,
            "SIR": {},
            "AIRR": {},
            "SPP": 0,
            "DPP": 0,
            "BCR": {},
            "quantSum": [7950],
            "quantUnits": ["kwh"],
            "MARR": 0.06,
            "deltaQuant": [-242050],
            "nsDeltaQuant": -0.02,
            "nsPercQuant": -42.84,
            "nsElasticityQuant": [-0.03]
        }
    ],
    "reqCashFlowObjects": [
        {
            "altID": 0,
            "totCostDisc": [0, 1165.37, 1099.41, 1037.18, 978.47, 923.08, 870.83, 821.54, 775.04, 731.17, 689.78, 650.74, 613.90, 579.15, 546.37, 515.45, 486.27, 458.74, 432.78, 408.28, 385.17, 363.37, 342.80, 323.40, 305.09, 287.82],
            /*"totCostsDiscInv" : [float, float, ..., float],
            "totCostsNonDiscInv" : [float, float, ..., float],
            "totBenefitsDisc" : {},
            "totCostsDirDisc" : [float, float, ..., float],
            "totCostsIndDisc" : [float, float, ..., float],
            "totCostsExtDisc" : [float, float, ..., float],*/
            "totBenefitsDirDisc": {},
            "totBenefitsIndDisc": {},
            "totBenefitsExtDisc": {}
        },
        {
            "altID": 1,
            "totCostDisc": [25107.20, -3826.95, -3519.57, -3236.76, -2605.33, -2395.55, -2202.55, -2024.62, -1859.19, -1707.09, -1567.25, 13.99, 16.36, 18.42, 20.19, 21.70, 22.98, 24.04, 24.91, 25.60, 26.13, 26.53, 26.79, 26.94, 26.99, 26.94],
            /*"totCostsDiscInv" : [float, float, ..., float],
            "totCostsNonDiscInv" : [float, float, ..., float],
            "totBenefitsDisc" : {},
            "totCostsDirDisc" : [float, float, ..., float],
            "totCostsIndDisc" : [float, float, ..., float],
            "totCostsExtDisc" : [float, float, ..., float],*/
            "totBenefitsDirDisc": {},
            "totBenefitsIndDisc": {},
            "totBenefitsExtDisc": {}
        },
        {
            "altID": 2,
            "totCostDisc": [0, 952.65, 885.46, 822.99, 764.92, 710.92, 660.71, 614.04, 570.64, 530.30, 492.80, 457.94, 425.53, 395.41, 367.40, 341.37, 317.18, 294.69, 273.79, 254.36, 236.30, 219.52, 203.93, 189.43, 175.97, 163.45],
            /*"totCostsDiscInv" : [float, float, ..., float],
            "totCostsNonDiscInv" : [float, float, ..., float],
            "totBenefitsDisc" : {},
            "totCostsDirDisc" : [float, float, ..., float],
            "totCostsIndDisc" : [float, float, ..., float],
            "totCostsExtDisc" : [float, float, ..., float],*/
            "totBenefitsDirDisc": {},
            "totBenefitsIndDisc": {},
            "totBenefitsExtDisc": {}
        }
    ],
    "optCashFlowObjects": [
        {
            "altID": 0,
            "bcnType": "string",
            "bcnSubType": "string",
            "tag": "string",
            /*"totTagFlowDisc" : [float, float, ..., float],
        "totTagQ" : [float, float, ..., float],*/
            "quantUnits": "string"
        },
        {
            "altID": 1,
            "bcnType": "string",
            "bcnSubType": "string",
            "tag": "string",
            /*"totTagFlowDisc" : [float, float, ..., float],
            "totTagQ" : [float, float, ..., float],*/
            "quantUnits": "string"
        },
        {
            "altID": 2,
            "bcnType": "string",
            "bcnSubType": "string",
            "tag": "string",
            /*"totTagFlowDisc" : [float, float, ..., float],
            "totTagQ" : [float, float, ..., float],*/
            "quantUnits": "string"
        }
    ]
}]

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

/**
 * Checks a value is valid and if so returns that value, otherwise it returns the string "NA".
 *
 * @param value the value to check.
 * @returns the value if it is valid, otherwise the string "NA".
 */
function validOrNA(value: any): any {
    return valid(value) ? value : "NA"
}

/**
 * Generates CSV data for the given results and study period.
 *
 * @param results The JSON results obtained from E3.
 * @param studyPeriod The study period defined in the redux store.
 */
function generateCsv(results: any, studyPeriod: number): any {
    const altObjects = results.alternativeSummaryObjects;
    const cashFlowObjects = results.reqCashFlowObjects;
    return [
        ["Summary Results", "No Solar System", "Purchase Solar System", "PPA Solar System"],
        ["Total Costs", ...altObjects.map((x: any) => x.totalCosts).map(validOrNA)],
        ["Net Savings", ...altObjects.map((x: any) => x.netSavings).map(validOrNA)],
        ["AIRR", ...altObjects.map((x: any) => x.AIRR).map(validOrNA)],
        ["SPP", ...altObjects.map((x: any) => x.SPP).map(validOrNA)],
        ["Electricity Reduction", ...altObjects.map((x: any) => -x.deltaQuant[0]).map(validOrNA)],
        [],
        ["Year", "No Solar System", "Purchase Solar System", "PPA Solar System"],
        ...Array.from(Array(studyPeriod + 1).keys())
            .map((index) => [index, ...cashFlowObjects.map((flow: any) => flow.totCostDisc[index])])
    ];
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

    const history = useHistory();
    const [downloadData] = useState(generateCsv(exampleResults[0], store.analysisAssumptionsFormStore.studyPeriod));

    const [showErrorDialog, setShowErrorDialog] = useState(false);
    const [error, setError] = useState<FetchError | null>(null);
    const [showErrorDetails, setShowErrorDetails] = useState(false);
    const [errorDetails, setErrorDetails] = useState<string | null>(null);

    function showError(e: FetchError) {
        setError(e);
        e.response.json()
            .then((e) => {
                console.log(e);
                return e;
            })
            .then(setErrorDetails);
        setShowErrorDialog(true);
    }

    //store.resultUiStore.resultCache = exampleResults;

    // Fetches results from E3 API
    useEffect(() => {
        const controller = new AbortController();

        if (!store.resultUiStore.resultCache) {
            createE3Request(store)
                .then((request) => {
                    console.log(request);

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
                    fetch("http://localhost:8000/api/v1/analysis/?key=CFXFTKIq.5lAaGLvjWDvh6heyfmZeAsbF2bz0Ow8S", fetchOptions)
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
                        .then((result) => store.resultUiStore.resultCache = result)
                        .catch(showError);
                });
        }

        // If the component is unmounted, abort the request
        return () => controller.abort()
    }, []);

    return (
        <>
            <Dialog open={showErrorDialog} onClose={() => setShowErrorDialog(false)}>
                <DialogTitle>An error has occurred</DialogTitle>
                <DialogContent>
                    <div>
                        {`${error?.response.status} ${error?.response.statusText}`}
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
            <Backdrop className={"result-loading-backdrop"} open={store.resultUiStore.resultCache === null}>
                <Box className={"loading-indicator"}>
                    <CircularProgress/>
                    <h1>Calculating Results</h1>
                    <Button className={"cancel-calculation-button"}
                            variant={"contained"}
                            color={"secondary"}
                            startIcon={<MdiIcon path={mdiClose} size={1}/>}
                            onClick={history.goBack}>
                        Cancel
                    </Button>
                </Box>
            </Backdrop>
            <Results downloadData={downloadData}/>
        </>
    );
});

export default ResultData;
