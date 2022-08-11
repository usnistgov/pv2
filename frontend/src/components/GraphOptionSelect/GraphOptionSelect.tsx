import {FormControl, MenuItem, Select} from "@material-ui/core";
import {action} from "mobx";
import {GraphOption} from "../../Strings";
import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import {Store} from "../../application/ApplicationStore";
import "./GraphOptionSelect.sass";

const GraphOptionSelect = observer(() => {
    const uiStore = useContext(Store).resultUiStore;

    return <div className={"graph-control"}>
        <FormControl className={"graph-control"}>
            <Select
                id={"graph-option-select"}
                value={uiStore.graphOption}
                onChange={action((event) => {
                    uiStore.graphOption = event.target.value as GraphOption;
                })}>
                <MenuItem value={GraphOption.CUMULATIVE}>{GraphOption.CUMULATIVE}</MenuItem>
                <MenuItem value={GraphOption.NET_VALUE}>{GraphOption.NET_VALUE}</MenuItem>
                <MenuItem value={GraphOption.ANNUAL_NET_ELECTRICAL_CONSUMPTION}>
                    {GraphOption.ANNUAL_NET_ELECTRICAL_CONSUMPTION}
                </MenuItem>
                <MenuItem value={GraphOption.CUMULATIVE_ELECTRICAL_REDUCTION}>{GraphOption.CUMULATIVE_ELECTRICAL_REDUCTION}</MenuItem>
            </Select>
        </FormControl>
    </div>
})

export default GraphOptionSelect;
