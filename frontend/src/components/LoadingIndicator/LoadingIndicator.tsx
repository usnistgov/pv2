import {Backdrop, Box, Button, CircularProgress} from "@material-ui/core";
import {Icon as MdiIcon} from "@mdi/react";
import {mdiClose} from "@mdi/js";
import Constants from "../../Constants";
import React from "react";
import {Link, useNavigate} from "react-router-dom";

interface LoadingIndicatorProps {
    predicate: boolean;
}

export default function LoadingIndicator({predicate}: LoadingIndicatorProps) {
    const navigate = useNavigate();

    return (
        <Backdrop className={"result-loading-backdrop"} open={predicate}>
            <Box className={"loading-indicator"}>
                <CircularProgress/>
                <h1>Calculating Results</h1>
                <Button className={"cancel-calculation-button"}
                        onClick={() => navigate(-1)}
                        variant={"contained"}
                        color={"secondary"}
                        startIcon={<MdiIcon path={mdiClose} size={1}/>}>
                    Cancel
                </Button>
            </Box>
        </Backdrop>
    );
}
