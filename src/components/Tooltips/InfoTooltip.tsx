import React, {PropsWithChildren, ReactElement} from "react";

import {Tooltip} from "@material-ui/core";

import "./Tooltip.sass";

interface InfoTooltipProps {
    text: string | ReactElement;
}

export default function InfoTooltip({text, children}: PropsWithChildren<InfoTooltipProps>): ReactElement {
    return (
        <Tooltip title={<div className={"tooltip"}>{text}</div>} arrow interactive placement={"right"}>
            {children as ReactElement}
        </Tooltip>
    );
}
