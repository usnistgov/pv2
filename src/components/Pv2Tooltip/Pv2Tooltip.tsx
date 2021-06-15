import React, {PropsWithChildren, ReactElement} from "react";

import {Tooltip} from "@material-ui/core";

import "./Pv2Tooltip.sass";

interface Pv2TooltipProps {
    text: string | ReactElement;
}

export default function Pv2Tooltip({text, children}: PropsWithChildren<Pv2TooltipProps>): ReactElement {
    return (
        <Tooltip title={<div className={"tooltip"}>{text}</div>}>
            {children as ReactElement}
        </Tooltip>
    );
}
