import React, {useContext} from "react";

// Library Imports
import {Box, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {observer} from "mobx-react-lite";

// User Imports
import MaterialHeader from "../../../components/MaterialHeader/MaterialHeader";
import CollapseContainer from "../../../components/CollapseContainer/CollapseContainer";
import AdvancedBox from "../../../components/AdvancedBox/AdvancedBox";
import Info from "../../../components/Info/Info";
import {
    ANNUAL_PRODUCTION_INFO,
    ANNUAL_PRODUCTION_LABEL,
    ANNUAL_PRODUCTION_TOOLTIP,
    DEGRADATION_RATE_INFO,
    DEGRADATION_RATE_LABEL,
    DEGRADATION_RATE_TOOLTIP,
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
    SOLAR_SYSTEM_ADVANCED_LABEL,
    SYSTEM_DESCRIPTION_INFO,
    SYSTEM_DESCRIPTION_LABEL,
    SYSTEM_DESCRIPTION_TOOLTIP,
    TOTAL_SYSTEM_SIZE_INFO,
    TOTAL_SYSTEM_SIZE_LABEL,
    TOTAL_SYSTEM_SIZE_TOOLTIP
} from "../../../Strings";
import ValidatedTextField from "../../../components/ValidatedTextField";
import Adornment, {endAdornment} from "../../../components/Adornments";
import {Store} from "../../ApplicationStore";

// Stylesheets
import "../Form.sass";
import {action} from "mobx";
import ResetButton from "../../../components/ResetButton/ResetButton";
import {defaultIfUndefined} from "../../../Utils";
import {DegradationRateGraph} from "../../../components/DegradationRateGraph";

/**
 * Form for details about the output of the PV system.
 */
const SolarSystemForm = observer(() => {
    const store = useContext(Store).solarSystemFormStore;

    return (
        <Box className={"form-page-container"}>
            <MaterialHeader text={"Solar PV System Information"} right={<ResetButton onClick={() => store.reset()}/>}/>
            <div className={"form-page-text"}>
                Provide information on the solar PV system, which are available from the solar installer contract
                proposal. Default values are provided for advanced inputs (i.e., equipment lifetimes and degradation
                rate). See User Guide for detailed guidance on how to populate the solar PV system information inputs.
            </div>
            <Box className={"form-single-column-container"}>
                <Info tooltip={SYSTEM_DESCRIPTION_TOOLTIP} info={SYSTEM_DESCRIPTION_INFO}>
                    <ValidatedTextField fullWidth
                                        required
                                        multiline
                                        maxRows={4}
                                        variant={"filled"}
                                        label={SYSTEM_DESCRIPTION_LABEL}
                                        value={defaultIfUndefined(store.systemDescription, '')}
                                        action={(value) => store.systemDescription = value}
                                        schema={store.systemDescriptionSchema}/>
                </Info>
                <Info tooltip={PANEL_EFFICIENCY_TOOLTIP} info={PANEL_EFFICIENCY_INFO}>
                    <ValidatedTextField fullWidth
                                        variant={"filled"}
                                        label={PANEL_EFFICIENCY_LABEL}
                                        value={defaultIfUndefined(store.panelEfficiency, '')}
                                        schema={store.panelEfficiencySchema}
                                        action={(value) => store.panelEfficiency = value}
                                        InputProps={Adornment.PERCENT}
                                        type={"number"}/>
                </Info>
                <Info tooltip={INVERTER_TYPE_TOOLTIP} info={INVERTER_TYPE_INFO}>
                    <FormControl fullWidth variant={"filled"}>
                        <InputLabel id={INVERTER_TYPE_LABEL}>{INVERTER_TYPE_LABEL}</InputLabel>
                        <Select className={"form-select-left-align"}
                                fullWidth
                                labelId={INVERTER_TYPE_LABEL}
                                value={store.inverterOption}
                                onChange={action((event) => {
                                    store.inverterOption = event.target.value as string
                                })}>
                            {
                                INVERTER_TYPE_OPTIONS.map((option, index) =>
                                    <MenuItem value={option} key={index}>{option}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                </Info>
                <Info tooltip={TOTAL_SYSTEM_SIZE_TOOLTIP} info={TOTAL_SYSTEM_SIZE_INFO}>
                    <ValidatedTextField fullWidth
                                        required
                                        variant={"filled"}
                                        label={TOTAL_SYSTEM_SIZE_LABEL}
                                        value={defaultIfUndefined(store.totalSystemSize, '')}
                                        schema={store.totalSystemSizeSchema}
                                        action={(value) => store.totalSystemSize = value}
                                        InputProps={endAdornment("Watts")}
                                        type={"number"}/>
                </Info>
                <Info tooltip={ANNUAL_PRODUCTION_TOOLTIP} info={ANNUAL_PRODUCTION_INFO}>
                    <ValidatedTextField fullWidth
                                        required
                                        variant={"filled"}
                                        label={ANNUAL_PRODUCTION_LABEL}
                                        value={defaultIfUndefined(store.estimatedAnnualProduction, '')}
                                        schema={store.estimatedAnnualProductionSchema}
                                        action={(value) => store.estimatedAnnualProduction = value}
                                        InputProps={Adornment.KWH}
                                        type={"number"}/>
                </Info>
                <CollapseContainer text={SOLAR_SYSTEM_ADVANCED_LABEL}>
                    <AdvancedBox>
                        <Info tooltip={PANEL_LIFETIME_TOOLTIP} info={PANEL_LIFETIME_INFO}>
                            <ValidatedTextField fullWidth
                                                variant={"filled"}
                                                label={PANEL_LIFETIME_LABEL}
                                                value={defaultIfUndefined(store.panelLifetime, '')}
                                                schema={store.panelLifetimeSchema}
                                                action={(value) => store.panelLifetime = value}
                                                InputProps={Adornment.YEAR}
                                                type={"number"}/>
                        </Info>
                        <Info tooltip={INVERTER_LIFETIME_TOOLTIP} info={INVERTER_LIFETIME_INFO}>
                            <ValidatedTextField fullWidth
                                                variant={"filled"}
                                                label={INVERTER_LIFETIME_LABEL}
                                                value={defaultIfUndefined(store.inverterLifetimeOrDefault, '')}
                                                schema={store.inverterLifetimeSchema}
                                                action={(value) => store.inverterLifetimeOrDefault = value}
                                                InputProps={Adornment.YEAR}
                                                type={"number"}/>
                        </Info>
                        <Info tooltip={DEGRADATION_RATE_TOOLTIP} info={DEGRADATION_RATE_INFO}>
                            <ValidatedTextField fullWidth
                                                variant={"filled"}
                                                label={DEGRADATION_RATE_LABEL}
                                                value={defaultIfUndefined(store.degradationRate, '')}
                                                schema={store.degradationRateSchema}
                                                action={(value) => store.degradationRate = value}
                                                InputProps={Adornment.PERCENT}
                                                type={"number"}/>
                        </Info>
                        <DegradationRateGraph/>
                    </AdvancedBox>
                </CollapseContainer>
            </Box>
        </Box>
    );
});

export default SolarSystemForm;