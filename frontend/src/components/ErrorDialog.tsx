import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import React, {useState} from "react";

interface ErrorDialogProps {
    predicate: boolean;

    error: any;

    errorDetails: any;
}

const ErrorMessages: {[key: string]: string} = {
    "0": '',
    "400": "Input was not accepted. Click 'Show Details' to view the error returned by the server.",
    "500": "An error occurred within the server. Please contact the system administrator."
}

export default function ErrorDialog({predicate, error, errorDetails}: ErrorDialogProps) {
    const [showErrorDetails, setShowErrorDetails] = useState(false);
    const [closed, setClosed] = useState(false);

    const status: string = error?.response?.status ?? '0';

    return (
        <Dialog open={predicate && !closed} onClose={() => setClosed(true)}>
            <DialogTitle>An error has occurred</DialogTitle>
            <DialogContent>
                <div>
                    {`${status} ${error?.response?.statusText}`}
                </div>
                <div>
                    {ErrorMessages[status] ?? ''}
                </div>
                <div>
                    {showErrorDetails && errorDetails && <pre>
                        {JSON.stringify(errorDetails)}
                    </pre>}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setShowErrorDetails(!showErrorDetails)} color={"primary"}>
                    {`${showErrorDetails ? 'Hide' : 'Show'} Details`}
                </Button>
                <Button onClick={() => setClosed(true)} color={"primary"}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
