import React, {useContext} from "react";

// Library Imports
import {Box, FormControl, InputLabel, MenuItem, Select, Checkbox, FormControlLabel, Switch} from "@material-ui/core";
import * as Yup from "yup";
import {observer} from "mobx-react-lite";
import {action} from "mobx";

// User Imports
import MaterialHeader from "../../../components/MaterialHeader/MaterialHeader";
import Info from "../../../components/Info/Info";
import {Store} from "../../ApplicationStore";
import ValidatedTextField from "../../../components/ValidatedTextField";
import {
    ANNUAL_CONSUMPTION_INFO,
    ANNUAL_CONSUMPTION_LABEL,
    ANNUAL_CONSUMPTION_TOOLTIP, AVERAGE_ELECTRICITY_PRICE_LABEL,
    ELECTRICAL_COMPANY_NAME_INFO,
    ELECTRICAL_COMPANY_NAME_LABEL,
    ELECTRICAL_COMPANY_NAME_TOOLTIP,
    ELECTRICAL_UNIT_PRICE_INFO,
    ELECTRICAL_UNIT_PRICE_LABEL,
    ELECTRICAL_UNIT_PRICE_TOOLTIP, ELECTRICITY_PRICE_STRUCTURE_INFO, ELECTRICITY_PRICE_STRUCTURE_LABEL,
    EXCESS_GENERATION_UNIT_PRICE_INFO,
    EXCESS_GENERATION_UNIT_PRICE_LABEL,
    EXCESS_GENERATION_UNIT_PRICE_TOOLTIP,
    FLAT_RATE_CHARGE_INFO,
    FLAT_RATE_CHARGE_LABEL,
    FLAT_RATE_CHARGE_TOOLTIP, KNOW_ANNUAL_CONSUMPTION_LABEL, KNOW_ANNUAL_CONSUMPTION_OPTIONS,
    NET_METERING_FEED_TARIFF_INFO,
    NET_METERING_FEED_TARIFF_LABEL,
    NET_METERING_FEED_TARIFF_OPTIONS,
    NET_METERING_FEED_TARIFF_TOOLTIP,
    PV_GRID_CONNECTION_RATE_INFO,
    PV_GRID_CONNECTION_RATE_LABEL,
    PV_GRID_CONNECTION_RATE_TOOLTIP, VIEW_ANNUAL_ESCALATION_RATES_LABEL, VIEW_ANNUAL_ESCALATION_RATES_OPTIONS
} from "../../../Strings";
import Adornment from "../../../components/Adornments";
import EscalationRateForm from "./EscalationRateForm";
import ResetButton from "../../../components/ResetButton/ResetButton";

// Stylesheets
import "../Form.sass";
import {DecimalTest, defaultIfUndefined, HighElectricalCostTest} from "../../../Utils";

/*
 * Displays the electrical rate form.
 */
const ElectricalRateForm = observer(() => {
    const store = useContext(Store).electricalCostFormStore;

    return (
        <Box className={"form-page-container"}>
            <MaterialHeader text={"Electrical Cost Information"} right={<ResetButton onClick={() => store.reset()}/>}/>
            <div className={"form-page-text"}>
                Provide information on the household’s electricity consumption and prices, which are available from
                utility electricity bills or online account. Default values are provided for advanced inputs (i.e.,
                energy price escalation projections). See User Guide for detailed guidance on how to populate the
                electrical rate information inputs.
            </div>
            <Box className={"form-single-column-container"}>
                <Info tooltip={ELECTRICAL_COMPANY_NAME_TOOLTIP} info={ELECTRICAL_COMPANY_NAME_INFO}>
                    <ValidatedTextField fullWidth
                                        variant={"filled"}
                                        label={ELECTRICAL_COMPANY_NAME_LABEL}
                                        value={defaultIfUndefined(store.electricalCompanyName, '')}
                                        schema={Yup.string()}
                                        onValidate={action((value) => store.electricalCompanyName = value)}/>
                </Info>
                <FormControl fullWidth variant={"filled"}>
                    <InputLabel
                        id={KNOW_ANNUAL_CONSUMPTION_LABEL}>{KNOW_ANNUAL_CONSUMPTION_LABEL}</InputLabel>
                    <Select className={"form-select-left-align"}
                            fullWidth
                            labelId={KNOW_ANNUAL_CONSUMPTION_LABEL}
                            value={store.knowAnnualConsumption}
                            onChange={action((event) => {
                                store.knowAnnualConsumption = event.target.value as string;
                            })}>
                        {
                            KNOW_ANNUAL_CONSUMPTION_OPTIONS.map((option, index) =>
                                <MenuItem value={option} key={index}>{option}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
                {store.knowAnnualConsumption === KNOW_ANNUAL_CONSUMPTION_OPTIONS[1] &&
                    <Info tooltip={ANNUAL_CONSUMPTION_TOOLTIP} info={ANNUAL_CONSUMPTION_INFO}>
                        <ValidatedTextField fullWidth
                                            required
                                            variant={"filled"}
                                            label={ANNUAL_CONSUMPTION_LABEL}
                                            value={defaultIfUndefined(store.annualConsumption, '')}
                                            schema={Yup.number().required().min(0).test(DecimalTest)}
                                            onValidate={action((value) => store.annualConsumption = value)}
                                            onError={action(() => store.annualConsumption = undefined)}
                                            InputProps={Adornment.KWH}
                                            type={"number"}/>
                    </Info>
                }
                <Info info={ELECTRICITY_PRICE_STRUCTURE_INFO}>
                    <FormControl>
                        <FormControlLabel
                            control={
                                <Switch checked={store.isAdvanced}
                                        onChange={action((change: any) => {
                                            store.isAdvanced = change.target.checked;

                                            if (!store.isAdvanced) {
                                                store.excessGenerationUnitPrice = store.electricUnitPrice;
                                            }
                                        })}
                                        color={"primary"}
                                />
                            }
                            label={ELECTRICITY_PRICE_STRUCTURE_LABEL}/>
                    </FormControl>
                </Info>
                {
                    !store.isAdvanced &&
                    <>
                        <ValidatedTextField fullWidth
                                            required
                                            variant={"filled"}
                                            label={AVERAGE_ELECTRICITY_PRICE_LABEL}
                                            value={defaultIfUndefined(store.electricUnitPrice, '')}
                                            schema={Yup.number().required().min(0).test(HighElectricalCostTest).test(DecimalTest)}
                                            onValidate={action((value) => {
                                                store.electricUnitPrice = value;
                                                store.excessGenerationUnitPrice = value;
                                            })}
                                            onError={action(() => store.electricUnitPrice = undefined)}
                                            InputProps={Adornment.DOLLAR_PER_KWH}
                                            type={"number"}/>
                    </>
                }
                {
                    store.isAdvanced &&
                    <>
                        <Info tooltip={FLAT_RATE_CHARGE_TOOLTIP} info={FLAT_RATE_CHARGE_INFO}>
                            <ValidatedTextField fullWidth
                                                required
                                                variant={"filled"}
                                                label={FLAT_RATE_CHARGE_LABEL}
                                                value={defaultIfUndefined(store.monthlyFlatRateCharge, '')}
                                                schema={Yup.number().required().min(0).test(DecimalTest)}
                                                onValidate={action((value) => store.monthlyFlatRateCharge = value)}
                                                onError={action(() => store.monthlyFlatRateCharge = undefined)}
                                                InputProps={Adornment.DOLLAR}
                                                type={"number"}/>
                        </Info>
                        <Info tooltip={ELECTRICAL_UNIT_PRICE_TOOLTIP} info={ELECTRICAL_UNIT_PRICE_INFO}>
                            <ValidatedTextField fullWidth
                                                required
                                                variant={"filled"}
                                                label={ELECTRICAL_UNIT_PRICE_LABEL}
                                                value={defaultIfUndefined(store.electricUnitPrice, '')}
                                                schema={Yup.number().required().min(0).test(DecimalTest).test(HighElectricalCostTest)}
                                                onValidate={action((value) => store.electricUnitPrice = value)}
                                                onError={action(() => store.electricUnitPrice = undefined)}
                                                InputProps={Adornment.DOLLAR_PER_KWH}
                                                type={"number"}/>
                        </Info>
                        <Info tooltip={NET_METERING_FEED_TARIFF_TOOLTIP} info={NET_METERING_FEED_TARIFF_INFO}>
                            <FormControl fullWidth variant={"filled"}>
                                <InputLabel
                                    id={NET_METERING_FEED_TARIFF_LABEL}>{NET_METERING_FEED_TARIFF_LABEL}</InputLabel>
                                <Select className={"form-select-left-align"}
                                        fullWidth
                                        labelId={NET_METERING_FEED_TARIFF_LABEL}
                                        value={store.netMeteringFeedTariff}
                                        onChange={action((event) => {
                                            store.netMeteringFeedTariff = event.target.value as string
                                        })}>
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
                                                value={defaultIfUndefined(store.excessGenerationUnitPrice, '')}
                                                schema={Yup.number().required().min(0).test(DecimalTest).test(HighElectricalCostTest)}
                                                onValidate={action((value) => store.excessGenerationUnitPrice = value)}
                                                onError={action(() => store.excessGenerationUnitPrice = undefined)}
                                                InputProps={Adornment.DOLLAR_PER_KWH}
                                                type={"number"}/>
                        </Info>
                        <Info tooltip={PV_GRID_CONNECTION_RATE_TOOLTIP} info={PV_GRID_CONNECTION_RATE_INFO}>
                            <ValidatedTextField fullWidth
                                                variant={"filled"}
                                                label={PV_GRID_CONNECTION_RATE_LABEL}
                                                value={defaultIfUndefined(store.pvGridConnectionRate, '')}
                                                schema={Yup.number().min(0).test(DecimalTest)}
                                                onValidate={action((value) => store.pvGridConnectionRate = value)}
                                                onError={action(() => store.pvGridConnectionRate = undefined)}
                                                InputProps={Adornment.DOLLAR_PER_KW}
                                                type={"number"}/>
                        </Info>
                    </>
                }
                <EscalationRateForm/>
            </Box>
        </Box>
    );
});

export default ElectricalRateForm;
