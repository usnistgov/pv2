import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import React, {useState} from "react";

interface ErrorDialogProps {
    predicate: boolean;

    error: any;

    errorDetails: any;
}

export default function ErrorDialog({predicate, error, errorDetails}: ErrorDialogProps) {
    const [showErrorDetails, setShowErrorDetails] = useState(false);
    const [closed, setClosed] = useState(false);

    return (
        <Dialog open={predicate && !closed} onClose={() => setClosed(true)}>
            <DialogTitle>An error has occurred</DialogTitle>
            <DialogContent>
                <div>
                    {`${error?.response?.status} ${error?.response?.statusText}`}
                </div>
                {showErrorDetails && errorDetails && <code>
                    {JSON.stringify(errorDetails)}
                </code>}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setShowErrorDetails(!showErrorDetails)} color={"primary"}>
                    Show Details
                </Button>
                <Button onClick={() => setClosed(false)} color={"primary"}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
