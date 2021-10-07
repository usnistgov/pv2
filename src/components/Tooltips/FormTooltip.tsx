import React, {PropsWithChildren, ReactElement} from "react";

import {Tooltip} from "@material-ui/core";

import "./Tooltip.sass";

interface FormTooltipProps {
    text: string | ReactElement;
}

export default function FormTooltip({text, children}: PropsWithChildren<FormTooltipProps>): ReactElement {
    return (
        <Tooltip title={<div className={"tooltip"}>{text}</div>} arrow>
            {children as ReactElement}
        </Tooltip>
    );
}
