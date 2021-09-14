import React, {useContext} from "react";

// Library Imports
import {Box, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import * as Yup from "yup";
import {observer} from "mobx-react-lite";

// User Imports
import MaterialHeader from "../../../components/MaterialHeader/MaterialHeader";
import Info from "../../../components/Info";
import {
    SREC_PAYMENTS_INFO,
    SREC_PAYMENTS_LABEL,
    SREC_PAYMENTS_OPTIONS,
    SREC_PAYMENTS_TOOLTIP,
    SREC_PAYMENTS_UP_FRONT_INFO,
    SREC_PAYMENTS_UP_FRONT_LABEL,
    SREC_PAYMENTS_UP_FRONT_TOOLTIP
} from "../../../Strings";
import {Store} from "../../ApplicationStore";
import ValidatedTextField from "../../../components/ValidatedTextField";
import Adornment from "../../../components/Adornments";

// Stylesheets
import "../Form.sass";

/**
 * Form for SREC details.
 */
const SrecForm = observer(() => {
    const store = useContext(Store).srecFormStore;

    return (
        <Box className={"form-page-container"}>
            <MaterialHeader text={"SREC Payments"}/>
            <div className={"form-page-text"}>
                PV^2 allows a user to input dollar values from Solar Renewable Energy Credit (SREC) sales. A homeowner
                may be able to receive an upfront payment based on the size of the system or payments over time based on
                production.
            </div>

            <Box className={"form-single-column-container"}>
                <Info tooltip={SREC_PAYMENTS_TOOLTIP} info={SREC_PAYMENTS_INFO}>
                    <FormControl fullWidth variant={"filled"}>
                        <InputLabel id={SREC_PAYMENTS_LABEL}>{SREC_PAYMENTS_LABEL}</InputLabel>
                        <Select className={"form-select-left-align"}
                                fullWidth
                                labelId={SREC_PAYMENTS_LABEL}
                                value={store.srecPayments}
                                onChange={(event) => {
                                    store.srecPayments = event.target.value as string
                                }}>
                            {
                                SREC_PAYMENTS_OPTIONS.map((option, index) =>
                                    <MenuItem value={option} key={index}>{option}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                </Info>
                {store.srecPayments === SREC_PAYMENTS_OPTIONS[0] &&
                <Info tooltip={SREC_PAYMENTS_UP_FRONT_TOOLTIP} info={SREC_PAYMENTS_UP_FRONT_INFO}>
                    <ValidatedTextField fullWidth
                                        variant={"filled"}
                                        label={SREC_PAYMENTS_UP_FRONT_LABEL}
                                        defaultValue={store.srecPaymentsUpFront}
                                        schema={Yup.number().min(0)}
                                        onValidate={(value) => {
                                            store.srecPaymentsUpFront = value
                                        }}
                                        onError={() => store.srecPaymentsUpFront = undefined}
                                        InputProps={Adornment.DOLLAR_PER_MWH}
                                        type={"number"}/>
                </Info>
                }
                {store.srecPayments === SREC_PAYMENTS_OPTIONS[1] &&
                <div className="form-two-column-container">
                    {store.srecPaymentsProductionBased
                        .map((payment, i) => {
                            return (
                                <ValidatedTextField fullWidth
                                                    variant={"filled"}
                                                    label={`Year ${i + 1}`}
                                                    key={i + 1}
                                                    defaultValue={store.srecPaymentsProductionBased[i]}
                                                    schema={Yup.number().min(0)}
                                                    onValidate={(value) => {
                                                        store.srecPaymentsProductionBased[i] = value
                                                    }}
                                                    onError={() => store.srecPaymentsProductionBased[i] = 0}
                                                    InputProps={Adornment.DOLLAR_PER_MWH}
                                                    type={"number"}/>
                            )
                        })}
                </div>
                }
            </Box>
        </Box>
    );
});

export default SrecForm;
