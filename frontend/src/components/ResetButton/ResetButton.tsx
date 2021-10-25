import {observer} from "mobx-react-lite";
import FormTooltip from "../Tooltips/FormTooltip";
import {IconButton} from "@material-ui/core";
import {mdiRestore} from "@mdi/js";
import {Icon as MdiIcon} from "@mdi/react";
import "./ResetButton.sass";

interface ResetButtonProps {
    onClick: () => void;
}

const ResetButton = observer(({onClick}: ResetButtonProps) => {
    return <div className={"reset-button"}>
        <FormTooltip text={"Reset to defaults"}>
            <IconButton onClick={onClick}>
                <MdiIcon path={mdiRestore} size={1}/>
            </IconButton>
        </FormTooltip>
    </div>
});

export default ResetButton;