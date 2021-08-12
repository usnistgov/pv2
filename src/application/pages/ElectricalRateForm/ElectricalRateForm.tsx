import React, {useContext} from "react";

// Library Imports
import {Box, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import * as Yup from "yup";
import {observer} from "mobx-react-lite";

// User Imports
import MaterialHeader from "../../../components/MaterialHeader/MaterialHeader";
import Info from "../../../components/Info";
import {Store} from "../../ApplicationStore";
import ValidatedTextField from "../../../components/ValidatedTextField";
import {
    ANNUAL_CONSUMPTION_INFO,
    ANNUAL_CONSUMPTION_LABEL,
    ANNUAL_CONSUMPTION_TOOLTIP,
    ELECTRICAL_COMPANY_NAME_INFO,
    ELECTRICAL_COMPANY_NAME_LABEL,
    ELECTRICAL_COMPANY_NAME_TOOLTIP,
    ELECTRICAL_UNIT_PRICE_INFO,
    ELECTRICAL_UNIT_PRICE_LABEL,
    ELECTRICAL_UNIT_PRICE_TOOLTIP,
    EXCESS_GENERATION_UNIT_PRICE_INFO,
    EXCESS_GENERATION_UNIT_PRICE_LABEL,
    EXCESS_GENERATION_UNIT_PRICE_TOOLTIP,
    FLAT_RATE_CHARGE_INFO,
    FLAT_RATE_CHARGE_LABEL,
    FLAT_RATE_CHARGE_TOOLTIP,
    NET_METERING_FEED_TARIFF_INFO,
    NET_METERING_FEED_TARIFF_LABEL,
    NET_METERING_FEED_TARIFF_OPTIONS,
    NET_METERING_FEED_TARIFF_TOOLTIP,
    PV_GRID_CONNECTION_RATE_INFO,
    PV_GRID_CONNECTION_RATE_LABEL,
    PV_GRID_CONNECTION_RATE_TOOLTIP
} from "../../../Strings";
import Adornment from "../../../components/Adornments";
import EscalationRateForm from "./EscalationRateForm";

// Stylesheets
import "../Form.sass";

/*
 * Displays the electrical rate form.
 */
const ElectricalRateForm = observer(() => {
    const store = useContext(Store).electricalCostFormStore;

    return (
        <Box className={"form-page-container"}>
            <MaterialHeader text={"Electrical Rate Information"}/>
            <Box className={"form-single-column-container"}>
                <Info tooltip={ELECTRICAL_COMPANY_NAME_TOOLTIP} info={ELECTRICAL_COMPANY_NAME_INFO}>
                    <ValidatedTextField fullWidth
                                        variant={"filled"}
                                        label={ELECTRICAL_COMPANY_NAME_LABEL}
                                        defaultValue={store.electricalCompanyName}
                                        schema={Yup.string()}
                                        onValidate={(value) => {
                                            store.electricalCompanyName = value
                                        }}/>
                </Info>
                <Info tooltip={ANNUAL_CONSUMPTION_TOOLTIP} info={ANNUAL_CONSUMPTION_INFO}>
                    <ValidatedTextField fullWidth
                                        required
                                        variant={"filled"}
                                        label={ANNUAL_CONSUMPTION_LABEL}
                                        defaultValue={store.annualConsumption}
                                        schema={Yup.number().required()}
                                        onValidate={(value) => {
                                            store.annualConsumption = value
                                        }}
                                        InputProps={Adornment.KWH}
                                        type={"number"}/>
                </Info>
                <Info tooltip={FLAT_RATE_CHARGE_TOOLTIP} info={FLAT_RATE_CHARGE_INFO}>
                    <ValidatedTextField fullWidth
                                        required
                                        variant={"filled"}
                                        label={FLAT_RATE_CHARGE_LABEL}
                                        defaultValue={store.monthlyFlatRateCharge}
                                        schema={Yup.number().required()}
                                        onValidate={(value) => {
                                            store.monthlyFlatRateCharge = value
                                        }}
                                        InputProps={Adornment.DOLLAR}
                                        type={"number"}/>
                </Info>
                <Info tooltip={ELECTRICAL_UNIT_PRICE_TOOLTIP} info={ELECTRICAL_UNIT_PRICE_INFO}>
                    <ValidatedTextField fullWidth
                                        required
                                        variant={"filled"}
                                        label={ELECTRICAL_UNIT_PRICE_LABEL}
                                        defaultValue={store.electricUnitPrice}
                                        schema={Yup.number().required()}
                                        onValidate={(value) => {
                                            store.electricUnitPrice = value
                                        }}
                                        InputProps={Adornment.DOLLAR_PER_KWH}
                                        type={"number"}/>
                </Info>
                <Info tooltip={NET_METERING_FEED_TARIFF_TOOLTIP} info={NET_METERING_FEED_TARIFF_INFO}>
                    <FormControl fullWidth variant={"filled"}>
                        <InputLabel id={NET_METERING_FEED_TARIFF_LABEL}>{NET_METERING_FEED_TARIFF_LABEL}</InputLabel>
                        <Select className={"form-select-left-align"}
                                fullWidth
                                labelId={NET_METERING_FEED_TARIFF_LABEL}
                                value={store.netMeteringFeedTariff}
                                onChange={(event) => {
                                    store.netMeteringFeedTariff = event.target.value as string
                                }}>
                            {
                                NET_METERING_FEED_TARIFF_OPTIONS.map((option, index) =>
                                    <MenuItem value={option} key={index}>{option}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                </Info>
                <Info tooltip={EXCESS_GENERATION_UNIT_PRICE_TOOLTIP} info={EXCESS_GENERATION_UNIT_PRICE_INFO}>
                    <ValidatedTextField fullWidth
                                        required
                                        variant={"filled"}
                                        label={EXCESS_GENERATION_UNIT_PRICE_LABEL}
                                        defaultValue={store.excessGenerationUnitPrice}
                                        schema={Yup.number().required()}
                                        onValidate={(value) => {
                                            store.excessGenerationUnitPrice = value
                                        }}
                                        InputProps={Adornment.DOLLAR_PER_KWH}
                                        type={"number"}/>
                </Info>
                <Info tooltip={PV_GRID_CONNECTION_RATE_TOOLTIP} info={PV_GRID_CONNECTION_RATE_INFO}>
                    <ValidatedTextField fullWidth
                                        required
                                        variant={"filled"}
                                        label={PV_GRID_CONNECTION_RATE_LABEL}
                                        defaultValue={store.pvGridConnectionRate}
                                        schema={Yup.number().required()}
                                        onValidate={(value) => {
                                            store.pvGridConnectionRate = value
                                        }}
                                        InputProps={Adornment.DOLLAR_PER_KWH}
                                        type={"number"}/>
                </Info>

                <EscalationRateForm/>
            </Box>
        </Box>
    );
});

export default ElectricalRateForm;
