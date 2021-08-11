import React, {ReactElement, useContext} from "react";

// Library Imports
import {Box, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import * as Yup from "yup";
import {observer} from "mobx-react-lite";

// User Imports
import MaterialHeader from "../../../components/MaterialHeader/MaterialHeader";
import CollapseContainer from "../../../components/CollapseContainer/CollapseContainer";
import AdvancedBox from "../../../components/AdvancedBox/AdvancedBox";
import Info from "../../../components/Info";
import {
    ANNUAL_PRODUCTION_INFO,
    ANNUAL_PRODUCTION_LABEL,
    ANNUAL_PRODUCTION_TOOLTIP, DEGRADATION_RATE_INFO,
    DEGRADATION_RATE_LABEL, DEGRADATION_RATE_TOOLTIP,
    INVERTER_LIFETIME_INFO,
    INVERTER_LIFETIME_LABEL,
    INVERTER_LIFETIME_TOOLTIP,
    INVERTER_TYPE_INFO,
    INVERTER_TYPE_LABEL,
    INVERTER_TYPE_OPTIONS,
    INVERTER_TYPE_TOOLTIP,
    PANEL_EFFICIENCY_INFO,
    PANEL_EFFICIENCY_LABEL,
    PANEL_EFFICIENCY_TOOLTIP,
    PANEL_LIFETIME_INFO,
    PANEL_LIFETIME_LABEL,
    PANEL_LIFETIME_TOOLTIP,
    TOTAL_SYSTEM_SIZE_LABEL,
    TOTAL_SYSTEM_SIZE_TOOLTIP
} from "../../../Strings";
import ValidatedTextField from "../../../components/ValidatedTextField";
import {endAdornment, kWhAdornment, percentAdornment, yearAdornment} from "../../../components/Adornments";
import {Store} from "../../ApplicationStore";

// Stylesheets
import "../Form.sass";

/**
 * Form for details about the output of the PV system.
 */
const SolarSystemForm = observer(() => {
    const store = useContext(Store).solarSystemFormStore;

    return (
        <Box className={"form-page-container"}>
            <MaterialHeader text={"Solar PV System Information"}/>
            Fill in the system information for the Solar PV quote you received.
            <Box className={"form-single-column-container"}>
                <Info tooltip={PANEL_EFFICIENCY_TOOLTIP} info={PANEL_EFFICIENCY_INFO}>
                    <ValidatedTextField fullWidth
                                        variant={"filled"}
                                        label={PANEL_EFFICIENCY_LABEL}
                                        defaultValue={store.panelEfficiency}
                                        schema={Yup.number().max(100).min(0)}
                                        onValidate={(value) => {
                                            store.panelEfficiency = value
                                        }}
                                        InputProps={percentAdornment}
                                        type={"number"}/>
                </Info>
                <Info tooltip={INVERTER_TYPE_TOOLTIP} info={INVERTER_TYPE_INFO}>
                    <FormControl fullWidth variant={"filled"}>
                        <InputLabel id={INVERTER_TYPE_LABEL}>{INVERTER_TYPE_LABEL}</InputLabel>
                        <Select className={"form-select-left-align"}
                                fullWidth
                                labelId={INVERTER_TYPE_LABEL}
                                value={store.inverterType}
                                onChange={(event) => {
                                    store.inverterType = event.target.value as string
                                }}>
                            {
                                INVERTER_TYPE_OPTIONS.map((option, index) =>
                                    <MenuItem value={option} key={index}>{option}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                </Info>
                <Info tooltip={TOTAL_SYSTEM_SIZE_TOOLTIP}>
                    <ValidatedTextField fullWidth
                                        variant={"filled"}
                                        label={TOTAL_SYSTEM_SIZE_LABEL}
                                        defaultValue={store.totalSystemSize}
                                        schema={Yup.number().required()}
                                        onValidate={(value) => {
                                            store.totalSystemSize = value
                                        }}
                                        InputProps={endAdornment("Watts")}
                                        type={"number"}/>
                </Info>
                <Info tooltip={ANNUAL_PRODUCTION_TOOLTIP} info={ANNUAL_PRODUCTION_INFO}>
                    <ValidatedTextField fullWidth
                                        variant={"filled"}
                                        label={ANNUAL_PRODUCTION_LABEL}
                                        defaultValue={store.estimatedAnnualProduction}
                                        schema={Yup.number().required()}
                                        onValidate={(value) => {
                                            store.estimatedAnnualProduction = value
                                        }}
                                        InputProps={kWhAdornment}
                                        type={"number"}/>
                </Info>
                <CollapseContainer text={"Advanced"}>
                    <AdvancedBox>
                        <Info tooltip={PANEL_LIFETIME_TOOLTIP} info={PANEL_LIFETIME_INFO}>
                            <ValidatedTextField fullWidth
                                                variant={"filled"}
                                                label={PANEL_LIFETIME_LABEL}
                                                defaultValue={store.panelLifetime}
                                                schema={Yup.number().required().max(40).min(1)}
                                                onValidate={(value) => {
                                                    store.panelLifetime = value
                                                }}
                                                InputProps={yearAdornment}
                                                type={"number"}/>
                        </Info>
                        <Info tooltip={INVERTER_LIFETIME_TOOLTIP} info={INVERTER_LIFETIME_INFO}>
                            <ValidatedTextField fullWidth
                                                variant={"filled"}
                                                label={INVERTER_LIFETIME_LABEL}
                                                defaultValue={store.inverterLifetime}
                                                schema={Yup.number().required().max(40).min(1)}
                                                onValidate={(value) => {
                                                    store.inverterLifetime = value
                                                }}
                                                InputProps={yearAdornment}
                                                type={"number"}/>
                        </Info>
                         <Info tooltip={DEGRADATION_RATE_TOOLTIP} info={DEGRADATION_RATE_INFO}>
                            <ValidatedTextField fullWidth
                                                variant={"filled"}
                                                label={DEGRADATION_RATE_LABEL}
                                                defaultValue={store.degradationRate}
                                                schema={Yup.number().required().max(100).min(0)}
                                                onValidate={(value) => {
                                                    store.degradationRate = value
                                                }}
                                                InputProps={percentAdornment}
                                                type={"number"}/>
                        </Info>
                    </AdvancedBox>
                </CollapseContainer>
            </Box>
        </Box>
    );
});

export default SolarSystemForm;