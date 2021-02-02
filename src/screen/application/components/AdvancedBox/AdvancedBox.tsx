import {PropsWithChildren, ReactElement} from "react";

import {Box} from "@material-ui/core";

import "./AdvancedBox.scss"

export interface AdvancedBoxProps {
}


/*
 * A header displaying "Advanced" with a colored underline in a material design like way.
 */
export default function AdvancedBox(props: PropsWithChildren<AdvancedBoxProps>): ReactElement {
    return (
        <Box className={"advanced-box"}>
            {props.children}
        </Box>
    );
}
