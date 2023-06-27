import {Backdrop, Box, Button, CircularProgress} from "@material-ui/core";
import {Icon as MdiIcon} from "@mdi/react";
import {mdiArrowLeft, mdiClose} from "@mdi/js";
import Constants from "../../Constants";
import React from "react";
import {Link, useNavigate} from "react-router-dom";

interface LoadingIndicatorProps {
    predicate: boolean;
    error: boolean;
}

export default function LoadingIndicator({predicate, error}: LoadingIndicatorProps) {
    const navigate = useNavigate();

    return (
        <Backdrop className={"result-loading-backdrop"} open={predicate}>
            <Box className={"loading-indicator"}>
                {(!error && <>
                    <CircularProgress/>
                    <h1>Calculating Results</h1>
                    <Button className={"cancel-calculation-button"}
                            onClick={() => navigate(-1)}
                            variant={"contained"}
                            color={"secondary"}
                            startIcon={<MdiIcon path={mdiClose} size={1}/>}>
                        Cancel
                    </Button>
                </>) || <>
                    <h1>An error occurred</h1>
                    <h1>Please try again later</h1>
                    <Button className={"cancel-calculation-button"}
                            onClick={() => navigate(-1)}
                            variant={"contained"}
                            color={"secondary"}
                            startIcon={<MdiIcon path={mdiArrowLeft} size={1}/>}>
                        Back
                    </Button>
                </>
                }
            </Box>
        </Backdrop>
    );
}
