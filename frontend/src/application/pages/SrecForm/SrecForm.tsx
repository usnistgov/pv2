import React, {useContext} from "react";

// Library Imports
import {Box, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import * as Yup from "yup";
import {observer} from "mobx-react-lite";

// User Imports
import MaterialHeader from "../../../components/MaterialHeader/MaterialHeader";
import Info from "../../../components/Info/Info";
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
import ResetButton from "../../../components/ResetButton/ResetButton";
import {DecimalTest, defaultIfUndefined} from "../../../Utils";
import {STUDY_PERIOD} from "../../../Defaults";
import Constants from "../../../Constants";

/**
 * Form for SREC details.
 */
const SrecForm = observer(() => {
    const store = useContext(Store).srecFormStore;
    const addressStore = useContext(Store).addressFormStore;

    const studyPeriod = useContext(Store).analysisAssumptionsFormStore.studyPeriod ?? STUDY_PERIOD;

    function getSRECStateText(state: string) {
        if(Constants.SREC_STATES.includes(state)) {
            return <p>
                Your state {state} has an SREC market. See&nbsp;
                <a href={"https://www.srectrade.com/markets/rps/srec/"}>
                    SREC Trade
                </a>
                &nbsp;for recent SREC prices.
            </p>
        }

        if(Constants.ADJACENT_SREC_STATES.includes(state)) {
            return <p>
                Your state {state} does not have an SREC market, but you might be able to sell your SRECs in a
                surrounding state. See&nbsp;
                <a href={"https://www.srectrade.com/markets/rps/srec/"}>
                    SREC Trade
                </a>
                &nbsp;for information on which state market(s) you can register in and their recent SREC prices.
            </p>
        }

        return <p>Your state {state} does not have an SREC market. Leave SREC Payment Type as 'None'.</p>;
    }

    return (
        <Box className={"form-page-container"}>
            <MaterialHeader text={"SREC Payments"} right={<ResetButton onClick={() => store.reset()}/>}/>
            <div className={"form-page-text"}>
                <p>
                Provide information on the value of the Solar Renewable Energy Credits (SREC) generated from the solar
                PV system. A homeowner may be able to receive an upfront payment based on the size of the system or
                payments over time based on electricity production. All values should be available from the solar
                contract proposal and vary significantly by location. See User Guide for detailed guidance on how to
                populate the SREC information inputs. For additional information about potential SREC values in
                your state, go to <a href={"https://www.srectrade.com/markets/rps/srec/"} target={"_blank"}>
                SREC Trade</a>.
                </p>
                {getSRECStateText(addressStore.normalizedState)}
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
                                        value={defaultIfUndefined(store.srecPaymentsUpFront, '')}
                                        schema={Yup.number().required().min(0).test(DecimalTest)}
                                        onValidate={action((value) => store.srecPaymentsUpFront = value)}
                                        onError={action(() => store.srecPaymentsUpFront = undefined)}
                                        InputProps={Adornment.DOLLAR_PER_KW}
                                        type={"number"}/>
                </Info>
                }
                {store.srecPayments === SREC_PAYMENTS_OPTIONS[2] &&
                <>
                    <ValidatedTextField fullWidth
                                        variant={"filled"}
                                        label={SREC_PAYMENT_YEARS}
                                        value={defaultIfUndefined(store.srecContractLength, '')}
                                        schema={Yup.number().required().min(0).max(studyPeriod).integer()}
                                        onValidate={action((value) => store.srecContractLength = value)}
                                        onError={action(() => store.srecContractLength = undefined)}
                                        InputProps={Adornment.YEAR}
                                        type={"number"}/>
                    <div className="form-two-column-container">
                        {store.srecPaymentsProductionBased
                            .filter((_, index) => index < (store.srecContractLength ?? 0))
                            .map((payment, i) => {
                                return (
                                    <ValidatedTextField fullWidth
                                                        variant={"filled"}
                                                        label={`Year ${i + 1}`}
                                                        key={i + 1}
                                                        value={defaultIfUndefined(
                                                            store.srecPaymentsProductionBased[i + 1],
                                                            ''
                                                        )}
                                                        schema={Yup.number().required().min(0).test(DecimalTest)}
                                                        onValidate={action((value) => {
                                                            store.srecPaymentsProductionBased[i + 1] = value
                                                        })}
                                                        onError={action(() => {
                                                            store.srecPaymentsProductionBased[i + 1] = undefined
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
