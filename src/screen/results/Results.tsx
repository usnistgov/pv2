import {ReactElement, useState} from "react";
import MaterialHeader from "../application/components/MaterialHeader/MaterialHeader";
import {Backdrop, Box, CircularProgress} from "@material-ui/core";

import "./results.scss";
import {useStore} from "react-redux";
import {createE3Request} from "./E3RequestGenerator";
import ResultCard from "./ResultCard/ResultCard";
import PageWrapper from "../components/PageWrapper";

const exampleResults = [
    {
        "altID" : 0,
        "totalBenefits" : {},
        "totalCosts" : 15791.20,
        "totalCostsInv" : 0,
        "totalCostsNonInv" : 15791.20,
        "netBenefits" : {},
        "netSavings" : 0,
        "SIR" : {},
        "IRR" : {},
        "AIRR" : {},
        "SPP" : {},
        "DPP" : {},
        "BCR" : {},
        "quantSum" : [250000],
        "quantUnits" : ["kwh"],
        "MARR" : 0.06,
        "deltaQuant" : {},
        "nsDeltaQuant" : {},
        "nsPercQuant" : {},
        "nsElasticityQuant": {}
    },
    {
        "altID" : 1,
        "totalBenefits": {},
        "totalCosts": 511,
        "totalCostsInv": 25107,
        "totalCostsNonInv": -40388,
        "netBenefits": {},
        "netSavings": 15280,
        "SIR" : 1.61,
        "AIRR" : 0.083,
        "SPP" : 5,
        "DPP" : 7,
        "BCR" : {},
        "quantSum" : [7950],
        "quantUnits" : ["kwh"],
        "MARR" : 0.06,
        "deltaQuant": [-242050],
        "nsDeltaQuant": [-0.06],
        "nsPercQuant": [-157.82],
        "nsElasticityQuant": [-0.39]
    },
    {
        "altID" : 2,
        "totalBenefits": {},
        "totalCosts": 11643.9,
        "totalCostsInv": 0,
        "totalCostsNonInv": 11643.9,
        "netBenefits": {},
        "netSavings": 4147.31,
        "SIR" : {},
        "AIRR" : {},
        "SPP" : 0,
        "DPP" : 0,
        "BCR" : {},
        "quantSum" : [7950],
        "quantUnits" : ["kwh"],
        "MARR" : 0.06,
        "deltaQuant": [-242050],
        "nsDeltaQuant": -0.02,
        "nsPercQuant": -42.84,
        "nsElasticityQuant": [-0.03]
    },
    {
        "altID" : 0,
        "totalBenefits" : {},
        "totalCosts" : 15791.20,
        "totalCostsInv" : 0,
        "totalCostsNonInv" : 15791.20,
        "netBenefits" : {},
        "netSavings" : 0,
        "SIR" : {},
        "IRR" : {},
        "AIRR" : {},
        "SPP" : {},
        "DPP" : {},
        "BCR" : {},
        "quantSum" : [250000],
        "quantUnits" : ["kwh"],
        "MARR" : 0.06,
        "deltaQuant" : {},
        "nsDeltaQuant" : {},
        "nsPercQuant" : {},
        "nsElasticityQuant": {}
    },
    {
        "altID" : 1,
        "totalBenefits": {},
        "totalCosts": 511,
        "totalCostsInv": 25107,
        "totalCostsNonInv": -40388,
        "netBenefits": {},
        "netSavings": 15280,
        "SIR" : 1.61,
        "AIRR" : 0.083,
        "SPP" : 5,
        "DPP" : 7,
        "BCR" : {},
        "quantSum" : [7950],
        "quantUnits" : ["kwh"],
        "MARR" : 0.06,
        "deltaQuant": [-242050],
        "nsDeltaQuant": [-0.06],
        "nsPercQuant": [-157.82],
        "nsElasticityQuant": [-0.39]
    },
    {
        "altID" : 2,
        "totalBenefits": {},
        "totalCosts": 11643.9,
        "totalCostsInv": 0,
        "totalCostsNonInv": 11643.9,
        "netBenefits": {},
        "netSavings": 4147.31,
        "SIR" : {},
        "AIRR" : {},
        "SPP" : 0,
        "DPP" : 0,
        "BCR" : {},
        "quantSum" : [7950],
        "quantUnits" : ["kwh"],
        "MARR" : 0.06,
        "deltaQuant": [-242050],
        "nsDeltaQuant": -0.02,
        "nsPercQuant": -42.84,
        "nsElasticityQuant": [-0.03]
    }
]

export default function Results(): ReactElement {
    const store = useStore();
    const [result, setResult] = useState();

    /*const fetchOptions = {
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
        .then((data: any) => setResult(data));*/

    // console.log(JSON.stringify(createE3Request(store.getState())))

    return (
        <PageWrapper>
            {/* TODO LOADING */}
            {/* <Backdrop open={result === undefined}>
                <Box className={"loading-indicator"}>
                    <CircularProgress/>
                    <h1>Calculating Results</h1>
                </Box>
            </Backdrop> */}
            <MaterialHeader text={"Results"}/>
            <div className="results-display">
                {exampleResults.map(res => <ResultCard results={res}/>)}
            </div>
        </PageWrapper>
    )
}

