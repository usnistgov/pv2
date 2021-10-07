import FormTooltip from "./Tooltips/FormTooltip";
import {Icon as MdiIcon} from "@mdi/react";
import {mdiInformation} from "@mdi/js";
import React, {PropsWithChildren, ReactElement} from "react";
import InfoTooltip from "./Tooltips/InfoTooltip";

interface InfoProps {
    // Text to display in tooltip
    tooltip?: string | ReactElement;

    // Information icon text
    info?: string | ReactElement;
}

export default function Info({children, tooltip, info}: PropsWithChildren<InfoProps>) {
    const withTooltip = tooltip ? <FormTooltip text={tooltip}>{children}</FormTooltip> : children as ReactElement;

    return (info ?
            <div className={"with-icon"}>
                {withTooltip}
                <InfoTooltip text={info}>
                    <MdiIcon className={"icon"} path={mdiInformation} size={1.2} color={'#898989'}/>
                </InfoTooltip>
            </div>
            : withTooltip
    );
}
