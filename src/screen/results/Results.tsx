import {ReactElement, useEffect, useState} from "react";
import MaterialHeader from "../application/components/MaterialHeader/MaterialHeader";
import {Backdrop, Box, Button, CircularProgress, Grid} from "@material-ui/core";
import {CSVLink} from "react-csv";

import "./Results.scss";
import {useStore} from "react-redux";
import {createE3Request} from "./E3RequestGenerator";
import ResultCard from "./ResultCard/ResultCard";
import {Icon as MdiIcon} from "@mdi/react";
import {mdiClose, mdiDownload} from "@mdi/js";
import {useHistory} from "react-router-dom";

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

export default function Results(): ReactElement {
    const store = useStore();
    const [result, setResult] = useState<undefined | {}>({}); //TODO replace with results object
    const history = useHistory();

    useEffect(() => {
        const controller = new AbortController();

        // Generate fetch post request
        const fetchOptions = {
            method: "POST",
            signal: controller.signal,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(createE3Request(store.getState()))
        }

        // TODO replace with E3 url once that is set up
        // Fetch results from E3
        fetch("", fetchOptions)
            .then((response: Response) => response.json())
            .then((data: any) => setResult(data));

        // If the component is unmounted, abort the request
        return () => controller.abort()
    })

    return (
        <>
            <Backdrop className={"result-loading-backdrop"} open={result === undefined}>
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
            <MaterialHeader text={"Results"}/>
            <Grid container justify={"center"} spacing={2}>
                {exampleResults[0].alternativeSummaryObjects.map((res, index) => {
                    return <Grid item key={index}>
                        <ResultCard alt={res} cashFlows={exampleResults[0].reqCashFlowObjects[index].totCostDisc}/>
                    </Grid>
                })}
            </Grid>
            <div className={"download-results"}>
                <CSVLink data={exampleResults}>
                    <Button variant={"contained"}
                            color={"primary"}
                            startIcon={<MdiIcon path={mdiDownload} size={1}/>}>
                        Download Results
                    </Button>
                </CSVLink>
            </div>
        </>
    )
}

