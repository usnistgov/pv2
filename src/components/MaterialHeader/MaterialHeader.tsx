import {ReactElement} from "react";

// User Imports
import {Box} from "@material-ui/core";

// Stylesheets
import "./MaterialHeader.sass"

export interface MaterialHeaderProps {
    // The text to be displayed in this header.
    text: string;
}

/*
 * A large header with a colored underline in a material design like way.
 */
export default function MaterialHeader({text}: MaterialHeaderProps): ReactElement {
    return (
        <Box className={"material-header"}>
            <h1>{text}</h1>
        </Box>
    );
}
