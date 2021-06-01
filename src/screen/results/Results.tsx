import {ReactElement, useState} from "react";
import MaterialHeader from "../application/components/MaterialHeader/MaterialHeader";
import {Button, Container, Grid} from "@material-ui/core";
import {CSVLink} from "react-csv";

import "./Results.scss";
import {useStore} from "react-redux";
import {createE3Request} from "./E3RequestGenerator";
import ResultCard from "./ResultCard/ResultCard";

const exampleResults = [
    {
        "altID": 0,
        "totalBenefits": null,
        "totalCosts": 15791.20,
        "totalCostsInv": 0,
        "totalCostsNonInv": 15791.20,
        "netBenefits": null,
        "netSavings": 0,
        "SIR": null,
        "IRR": null,
        "AIRR": null,
        "SPP": null,
        "DPP": null,
        "BCR": null,
        "quantSum": [250000],
        "quantUnits": ["kwh"],
        "MARR": 0.06,
        "deltaQuant": null,
        "nsDeltaQuant": null,
        "nsPercQuant": null,
        "nsElasticityQuant": null
    },
    {
        "altID": 1,
        "totalBenefits": null,
        "totalCosts": 511,
        "totalCostsInv": 25107,
        "totalCostsNonInv": -40388,
        "netBenefits": null,
        "netSavings": 15280,
        "SIR": 1.61,
        "AIRR": 0.083,
        "SPP": 5,
        "DPP": 7,
        "BCR": null,
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
        "totalBenefits": null,
        "totalCosts": 11643.9,
        "totalCostsInv": 0,
        "totalCostsNonInv": 11643.9,
        "netBenefits": null,
        "netSavings": 4147.31,
        "SIR": null,
        "AIRR": null,
        "SPP": 0,
        "DPP": 0,
        "BCR": null,
        "quantSum": [7950],
        "quantUnits": ["kwh"],
        "MARR": 0.06,
        "deltaQuant": [-242050],
        "nsDeltaQuant": -0.02,
        "nsPercQuant": -42.84,
        "nsElasticityQuant": [-0.03]
    }
]

// TODO: add as needed.
const tableLabels = {
    totalCosts: "Life Cycle Costs",
    netSavings: "Net Savings",
    AIRR: "AIRR",
    SPP: "Simple Payback Period",
    deltaQuant: "Electricity Reduction"
}

export default function Results(): ReactElement {
    const store = useStore();
    const [result, setResult] = useState();

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(createE3Request(store.getState()))
    }

    // Fetch results from E3
    const promise = fetch("", fetchOptions)
        .then((response: Response) => response.json())
        .then((data: any) => setResult(data));

    console.log(JSON.stringify(createE3Request(store.getState())))

    return (
        <>
            {/* TODO LOADING */}
            {/* <Backdrop open={result === undefined}>
                    <Box className={"loading-indicator"}>
                        <CircularProgress/>
                        <h1>Calculating Results</h1>
                    </Box>
                </Backdrop> */}
            <MaterialHeader text={"Results"}/>
            <Grid container justify={"center"} spacing={2}>
                {exampleResults.map(res => {
                    return <Grid item>
                        <ResultCard results={res} isLabels={false}/>
                    </Grid>
                })}
            </Grid>
            <div className={"download-results"}>
                <CSVLink data={exampleResults}>
                    <Button variant={"contained"} color={"primary"}>
                        Download Results
                    </Button>
                </CSVLink>
            </div>
        </>
    )
}

