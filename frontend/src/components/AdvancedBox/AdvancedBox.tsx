import {PropsWithChildren, ReactElement} from "react";

// Library Imports
import {Box} from "@material-ui/core";

// Stylesheets
import "./AdvancedBox.sass"

/*
 * A header displaying "Advanced" with a colored underline in a material design like way.
 */
export default function AdvancedBox(props: PropsWithChildren<{}>): ReactElement {
    return (
        <Box className={"advanced-box"}>
            {props.children}
        </Box>
    );
}
