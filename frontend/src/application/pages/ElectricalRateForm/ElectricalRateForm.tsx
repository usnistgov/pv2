import React, {useContext} from "react";

// Library Imports
import {Box, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch} from "@material-ui/core";
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
    ANNUAL_CONSUMPTION_TOOLTIP,
    AVERAGE_ELECTRICITY_PRICE_LABEL,
    ELECTRICAL_COMPANY_NAME_INFO,
    ELECTRICAL_COMPANY_NAME_LABEL,
    ELECTRICAL_COMPANY_NAME_TOOLTIP,
    ELECTRICAL_UNIT_PRICE_INFO,
    ELECTRICAL_UNIT_PRICE_LABEL,
    ELECTRICAL_UNIT_PRICE_TOOLTIP,
    ELECTRICITY_PRICE_STRUCTURE_INFO,
    ELECTRICITY_PRICE_STRUCTURE_LABEL,
    EXCESS_GENERATION_UNIT_PRICE_INFO,
    EXCESS_GENERATION_UNIT_PRICE_LABEL,
    EXCESS_GENERATION_UNIT_PRICE_TOOLTIP,
    FLAT_RATE_CHARGE_INFO,
    FLAT_RATE_CHARGE_LABEL,
    FLAT_RATE_CHARGE_TOOLTIP,
    KNOW_ANNUAL_CONSUMPTION_INFO,
    KNOW_ANNUAL_CONSUMPTION_LABEL,
    KNOW_ANNUAL_CONSUMPTION_OPTIONS,
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
import ResetButton from "../../../components/ResetButton/ResetButton";

// Stylesheets
import "../Form.sass";
import {defaultIfUndefined} from "../../../Utils";

interface ElectricalRateFormProps {
    step: number;
}

/*
 * Displays the electrical rate form.
 */
const ElectricalRateForm = observer(({step}: ElectricalRateFormProps) => {
    const store = useContext(Store).electricalCostFormStore;
    const uiStore = useContext(Store).formUiStore;

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
                                        schema={store.electricalCompanyNameSchema}
                                        action={(value) => store.electricalCompanyName = value}
                                        shouldUpdate={() => uiStore.newStep !== step}/>
                </Info>
                <Info info={KNOW_ANNUAL_CONSUMPTION_INFO}>
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
                </Info>
                {store.knowAnnualConsumption === KNOW_ANNUAL_CONSUMPTION_OPTIONS[1] &&
                    <Info tooltip={ANNUAL_CONSUMPTION_TOOLTIP} info={ANNUAL_CONSUMPTION_INFO}>
                        <ValidatedTextField fullWidth
                                            required
                                            variant={"filled"}
                                            label={ANNUAL_CONSUMPTION_LABEL}
                                            value={defaultIfUndefined(store.annualConsumption, '')}
                                            schema={store.annualConsumptionSchema}
                                            action={(value) => store.annualConsumption = value}
                                            InputProps={Adornment.KWH}
                                            type={"number"}
                                            shouldUpdate={() => uiStore.newStep !== step}/>
                    </Info>
                }
                <div>
                    <p>
                        <strong>Do you want to use a simple (average) or advanced electricity price structure?</strong>
                    </p>
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
                </div>
                {
                    !store.isAdvanced &&
                    <>
                        <ValidatedTextField fullWidth
                                            required
                                            variant={"filled"}
                                            label={AVERAGE_ELECTRICITY_PRICE_LABEL}
                                            value={defaultIfUndefined(store.electricUnitPrice, '')}
                                            schema={store.averageElectricityPriceSchema}
                                            action={(value) => {
                                                store.electricUnitPrice = value;
                                                store.excessGenerationUnitPrice = value;
                                            }}
                                            InputProps={Adornment.DOLLAR_PER_KWH}
                                            type={"number"}
                                            shouldUpdate={() => uiStore.newStep !== step}/>
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
                                                schema={store.flatRateChargeSchema}
                                                action={(value) => store.monthlyFlatRateCharge = value}
                                                InputProps={Adornment.DOLLAR}
                                                type={"number"}
                                                shouldUpdate={() => uiStore.newStep !== step}/>
                        </Info>
                        <Info tooltip={ELECTRICAL_UNIT_PRICE_TOOLTIP} info={ELECTRICAL_UNIT_PRICE_INFO}>
                            <ValidatedTextField fullWidth
                                                required
                                                variant={"filled"}
                                                label={ELECTRICAL_UNIT_PRICE_LABEL}
                                                value={defaultIfUndefined(store.electricUnitPrice, '')}
                                                schema={store.electricalUnitPriceSchema}
                                                action={(value) => store.electricUnitPrice = value}
                                                InputProps={Adornment.DOLLAR_PER_KWH}
                                                type={"number"}
                                                shouldUpdate={() => uiStore.newStep !== step}/>
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
                                                schema={store.excessGenerationUnitPriceSchema}
                                                action={(value) => store.excessGenerationUnitPrice = value}
                                                InputProps={Adornment.DOLLAR_PER_KWH}
                                                type={"number"}
                                                shouldUpdate={() => uiStore.newStep !== step}/>
                        </Info>
                        <Info tooltip={PV_GRID_CONNECTION_RATE_TOOLTIP} info={PV_GRID_CONNECTION_RATE_INFO}>
                            <ValidatedTextField fullWidth
                                                variant={"filled"}
                                                label={PV_GRID_CONNECTION_RATE_LABEL}
                                                value={defaultIfUndefined(store.pvGridConnectionRate, '')}
                                                schema={store.pvGridConnectionRateSchema}
                                                action={(value) => store.pvGridConnectionRate = value}
                                                InputProps={Adornment.DOLLAR_PER_KW}
                                                type={"number"}
                                                shouldUpdate={() => uiStore.newStep !== step}/>
                        </Info>
                    </>
                }
                <EscalationRateForm step={step}/>
            </Box>
        </Box>
    );
});

export default ElectricalRateForm;
