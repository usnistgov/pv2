import {ReactElement} from "react";
import MaterialHeader from "../application/components/MaterialHeader/MaterialHeader";
import {Backdrop, Box, CircularProgress} from "@material-ui/core";

import "./results.sass";

export default function Results(): ReactElement {
    const result = {
        done: false
    } //TODO: replace with call to backend

    return <>
        <Backdrop open={!result.done}>
            <Box className={"loading-indicator"}>
                <CircularProgress/>
                <h1>Calculating Results</h1>
            </Box>
        </Backdrop>
        <MaterialHeader text={"Results"}/>
    </>;
}
