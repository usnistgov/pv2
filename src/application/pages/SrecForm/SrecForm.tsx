import React, {useContext} from "react";

// Library Imports
import {Box, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import * as Yup from "yup";
import {observer} from "mobx-react-lite";

// User Imports
import MaterialHeader from "../../../components/MaterialHeader/MaterialHeader";
import Info from "../../../components/Info";
import {
    SREC_PAYMENT_YEARS,
    SREC_PAYMENTS_INFO,
    SREC_PAYMENTS_LABEL,
    SREC_PAYMENTS_OPTIONS,
    SREC_PAYMENTS_TOOLTIP,
    SREC_PAYMENTS_UP_FRONT_LABEL,
    SREC_PAYMENTS_UP_FRONT_TOOLTIP
} from "../../../Strings";
import {Store} from "../../ApplicationStore";
import ValidatedTextField from "../../../components/ValidatedTextField";
import Adornment from "../../../components/Adornments";

// Stylesheets
import "../Form.sass";
import {action} from "mobx";

/**
 * Form for SREC details.
 */
const SrecForm = observer(() => {
    const store = useContext(Store).srecFormStore;
    const studyPeriod = useContext(Store).analysisAssumptionsFormStore.studyPeriod;

    return (
        <Box className={"form-page-container"}>
            <MaterialHeader text={"SREC Payments"}/>
            <div className={"form-page-text"}>
                Provide information on the value of the Solar Renewable Energy Credits (SREC) generated from the solar
                PV system. A homeowner may be able to receive an upfront payment based on the size of the system or
                payments over time based on electricity production. All values should be available from the solar
                contract proposal and vary significantly by location. See User Guide for detailed guidance on how to
                populate the SREC information inputs.
            </div>

            <Box className={"form-single-column-container"}>
                <Info tooltip={SREC_PAYMENTS_TOOLTIP} info={SREC_PAYMENTS_INFO}>
                    <FormControl fullWidth variant={"filled"}>
                        <InputLabel id={SREC_PAYMENTS_LABEL}>{SREC_PAYMENTS_LABEL}</InputLabel>
                        <Select className={"form-select-left-align"}
                                fullWidth
                                labelId={SREC_PAYMENTS_LABEL}
                                value={store.srecPayments}
                                onChange={action((event) => {
                                    store.srecPayments = event.target.value as string
                                })}>
                            {
                                SREC_PAYMENTS_OPTIONS.map((option, index) =>
                                    <MenuItem value={option} key={index}>{option}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                </Info>
                {store.srecPayments === SREC_PAYMENTS_OPTIONS[1] &&
                <Info tooltip={SREC_PAYMENTS_UP_FRONT_TOOLTIP}>
                    <ValidatedTextField fullWidth
                                        variant={"filled"}
                                        label={SREC_PAYMENTS_UP_FRONT_LABEL}
                                        defaultValue={store.srecPaymentsUpFront}
                                        schema={Yup.number().required().min(0)}
                                        onValidate={action((value) => {
                                            store.srecPaymentsUpFront = value
                                        })}
                                        InputProps={Adornment.DOLLAR_PER_KW}
                                        type={"number"}/>
                </Info>
                }
                {store.srecPayments === SREC_PAYMENTS_OPTIONS[2] &&
                <>
                    <ValidatedTextField fullWidth
                                        variant={"filled"}
                                        label={SREC_PAYMENT_YEARS}
                                        defaultValue={store.srecContractLength}
                                        schema={Yup.number().required().min(0).max(studyPeriod)}
                                        onValidate={action((value) => store.srecContractLength = value)}
                                        onError={action(() => store.srecContractLength = 0)}
                                        InputProps={Adornment.YEAR}
                                        type={"number"}/>
                    <div className="form-two-column-container">
                        {store.srecPaymentsProductionBased
                            .filter((_, index) => index < store.srecContractLength)
                            .map((payment, i) => {
                                return (
                                    <ValidatedTextField fullWidth
                                                        variant={"filled"}
                                                        label={`Year ${i + 1}`}
                                                        key={i + 1}
                                                        defaultValue={store.srecPaymentsProductionBased[i + 1]}
                                                        schema={Yup.number().required().min(0)}
                                                        onValidate={action((value) => {
                                                            store.srecPaymentsProductionBased[i + 1] = value
                                                        })}
                                                        onError={action(() => {
                                                            store.srecPaymentsProductionBased[i + 1] = 0
                                                        })}
                                                        InputProps={Adornment.DOLLAR_PER_MWH}
                                                        type={"number"}/>
                                )
                            })}
                    </div>
                </>
                }
            </Box>
        </Box>
    );
});

export default SrecForm;
