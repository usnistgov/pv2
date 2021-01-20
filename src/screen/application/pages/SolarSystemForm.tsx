import {ReactElement} from "react";

import {Box} from "@material-ui/core";

import MaterialHeader from "../components/MaterialHeader";


export default function SolarSystemForm(): ReactElement {
    return (
        <Box>
            <MaterialHeader text={"Solar PV System Information"}/>
            <MaterialHeader text={"Power Production Agreement (PPA) Details"}/>
        </Box>
    );
}
