import {Backdrop, Box, Button, CircularProgress} from "@material-ui/core";
import {Icon as MdiIcon} from "@mdi/react";
import {mdiClose} from "@mdi/js";
import Constants from "../../Constants";
import React from "react";
import {Link} from "react-router-dom";

interface LoadingIndicatorProps {
    predicate: boolean;
}

export default function LoadingIndicator({predicate}: LoadingIndicatorProps) {
    return (
        <Backdrop className={"result-loading-backdrop"} open={predicate}>
            <Box className={"loading-indicator"}>
                <CircularProgress/>
                <h1>Calculating Results</h1>
                <Button className={"cancel-calculation-button"}
                        component={Link}
                        to={Constants.routes.APPLICATION}
                        variant={"contained"}
                        color={"secondary"}
                        startIcon={<MdiIcon path={mdiClose} size={1}/>}>
                    Cancel
                </Button>
            </Box>
        </Backdrop>
    );
}
