import {ReactElement} from "react";

import {Box} from "@material-ui/core";

import "./AdvancedHeader.scss"


/*
 * A header displaying "Advanced" with a colored underline in a material design like way.
 */
export default function AdvancedHeader(): ReactElement {
    return (
        <Box className={"advanced-header"}>
            <h3>Advanced</h3>
        </Box>
    );
}
