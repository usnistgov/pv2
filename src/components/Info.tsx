import Pv2Tooltip from "./Pv2Tooltip/Pv2Tooltip";
import {Icon as MdiIcon} from "@mdi/react";
import {mdiInformation} from "@mdi/js";
import React, {PropsWithChildren, ReactElement} from "react";

interface InfoProps {
    // Text to display in tooltip
    tooltip?: string | ReactElement;

    // Information icon text
    info?: string | ReactElement;
}

export default function Info({children, tooltip, info}: PropsWithChildren<InfoProps>) {
    const withTooltip = tooltip ? <Pv2Tooltip text={tooltip}>{children}</Pv2Tooltip> : children as ReactElement;

    return (info ?
            <div className={"with-icon"}>
                {withTooltip}
                <Pv2Tooltip text={info}>
                    <MdiIcon className={"icon"} path={mdiInformation} size={1.2} color={'#898989'}/>
                </Pv2Tooltip>
            </div>
            : withTooltip
    );
}
