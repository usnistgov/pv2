import {ReactElement, ReactNode} from "react";

// User Imports
import {Box} from "@material-ui/core";

// Stylesheets
import "./MaterialHeader.sass"

export interface MaterialHeaderProps {
    // The text to be displayed in this header.
    text: string;

    // React element to put on the left side of the header.
    left?: ReactNode

    // React element to put on the right side of the header.
    right?: ReactNode
}

/*
 * A large header with a colored underline in a material design like way.
 */
export default function MaterialHeader({text, left, right}: MaterialHeaderProps): ReactElement {
    return (
        <Box className={"material-header"}>
            <div className={"side-container"}>{left}</div>
            <h1>{text}</h1>
            <div className={"side-container"}>{right}</div>
        </Box>
    );
}
