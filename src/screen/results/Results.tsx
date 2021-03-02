import {ReactElement, useState} from "react";
import MaterialHeader from "../application/components/MaterialHeader/MaterialHeader";
import {Backdrop, Box, CircularProgress} from "@material-ui/core";

import "./results.sass";
import {useStore} from "react-redux";
import {createE3Request} from "./E3RequestGenerator";

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

    console.log(JSON.stringify(createE3Request(store.getState())))

    return <>
        <Backdrop open={result === undefined}>
            <Box className={"loading-indicator"}>
                <CircularProgress/>
                <h1>Calculating Results</h1>
            </Box>
        </Backdrop>
        <MaterialHeader text={"Results"}/>
        { /*TODO: display result data*/ }
    </>;
}

