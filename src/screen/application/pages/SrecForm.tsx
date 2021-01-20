import {ReactElement} from "react";

import {Box} from "@material-ui/core";

import MaterialHeader from "../components/MaterialHeader";


export default function SrecForm(): ReactElement {
    return (
        <Box>
            <MaterialHeader text={"SREC Payments"}/>
        </Box>
    );
}
