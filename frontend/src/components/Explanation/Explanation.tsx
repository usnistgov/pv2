import {IconButton} from "@material-ui/core";
import {Icon} from "@mdi/react";
import {mdiMinus, mdiPlus} from "@mdi/js";
import {ReactNode, useState} from "react";
import "./Explanation.sass";

interface ExplanationProps {
    title: string | ReactNode;
    information: string | ReactNode;
    expandable?: boolean;
}

export default function Explanation({title, information, expandable = false}: ExplanationProps) {
    const [expanded, setExpanded] = useState(false);

    return <div className={"explanation"}>
        <div className={"title"}>
        {expandable &&
            <IconButton onClick={() => setExpanded(!expanded)}>
                <Icon path={expanded ? mdiMinus : mdiPlus} size={1}/>
            </IconButton>
        }
        <h4>{title}</h4>
        </div>
        <div style={{display: !expandable || expanded ? "block" : "none"}}>
            {information}
        </div>
    </div>
}