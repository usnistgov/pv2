import React, {useContext, useState} from "react";

// Library Imports
import {Box, FormControl, FormControlLabel, Switch} from "@material-ui/core";
import * as Yup from "yup";
import {observer} from "mobx-react-lite";
import {action} from "mobx";

// User Imports
import MaterialHeader from "../../../components/MaterialHeader/MaterialHeader";
import {
    DISCOUNT_RATES_EXPLANATION, ELECTRICITY_PRICE_STRUCTURE_LABEL,
    GENERAL_INFLATION_INFO,
    GENERAL_INFLATION_LABEL,
    GENERAL_INFLATION_TOOLTIP, NOMINAL_DISCOUNT_RATE_INFO, NOMINAL_DISCOUNT_RATE_LABEL, NOMINAL_DISCOUNT_RATE_TOOLTIP,
    REAL_DISCOUNT_RATE_INFO,
    REAL_DISCOUNT_RATE_LABEL,
    REAL_DISCOUNT_RATE_TOOLTIP, STUDY_PERIOD_EXPLANATION,
    STUDY_PERIOD_INFO,
    STUDY_PERIOD_LABEL,
    STUDY_PERIOD_TOOLTIP
} from "../../../Strings";
import {Store} from "../../ApplicationStore";
import ValidatedTextField from "../../../components/ValidatedTextField";
import Info from "../../../components/Info/Info";
import Adornment from "../../../components/Adornments";
import ResetButton from "../../../components/ResetButton/ResetButton";

// Stylesheets
import "../Form.sass";
import {calculateNominalDiscountRate, calculateRealDiscountRate, DecimalTest, defaultIfUndefined} from "../../../Utils";
import {GENERAL_INFLATION, NOMINAL_DISCOUNT_RATE} from "../../../Defaults";
import Explanation from "../../../components/Explanation/Explanation";

const AnalysisAssumptionsForm = observer(() => {
    const store = useContext(Store).analysisAssumptionsFormStore;
    const showDiscountRates = useState(false);

    return (
        <Box className={"form-page-container"}>
            <MaterialHeader text={"Analysis Assumptions"} right={<ResetButton onClick={() => store.reset()}/>}/>
            <Box className={"form-single-column-container"}>
                {STUDY_PERIOD_EXPLANATION}
                <Info tooltip={STUDY_PERIOD_TOOLTIP} info={STUDY_PERIOD_INFO}>
                    <ValidatedTextField
                        fullWidth
                        variant={"filled"}
                        label={STUDY_PERIOD_LABEL}
                        schema={Yup.number().required().max(40).min(1).integer()}
                        value={defaultIfUndefined(store.studyPeriod, '')}
                        onValidate={action((value: number) => store.studyPeriod = value)}
                        onError={action(() => store.studyPeriod = undefined)}
                        InputProps={Adornment.YEAR}
                        type={"number"}/>
                </Info>
                <div style={{height: "16px"}}></div>
                <Explanation title={"Explanation of Time Value of Money and Discount Rates"}
                             information={DISCOUNT_RATES_EXPLANATION}
                             expandable/>
                <FormControl>
                    <FormControlLabel
                        control={
                            <Switch checked={store.isAdvanced}
                                    onChange={action((change: any) => store.isAdvanced = change.target.checked)}
                                    color={"primary"}/>
                        }
                        label={"Use Custom Discount Rates"}/>
                </FormControl>
                {store.isAdvanced &&
                    <>
                       <Explanation title={"What is the Nominal Discount Rate?"} information={
                           <p>A nominal discount rate is the discount rate including general inflation, and is likely to be easier for a user to be aware. A common nominal discount rate value is either a homeowner's mortgage interest rate (3 % - 6 % on 30-year) or the expected average return on investing in the stock market (average of 8 % to 12 %) or bond market (currently 3% on 30-year treasury). These are "nominal" because it is the rate earned or paid including general inflation of overall prices.</p>
                       } expandable/>
                        <Info tooltip={NOMINAL_DISCOUNT_RATE_TOOLTIP} info={NOMINAL_DISCOUNT_RATE_INFO}>
                            <ValidatedTextField
                                fullWidth
                                variant={"filled"}
                                label={NOMINAL_DISCOUNT_RATE_LABEL}
                                schema={Yup.number().required().max(100).min(0).test(DecimalTest)}
                                value={defaultIfUndefined(store.nominalDiscountRate, '')}
                                onValidate={action((value: number) => {
                                    store.nominalDiscountRate = value;
                                    store.realDiscountRate = parseFloat((calculateRealDiscountRate(value / 100, (store.generalInflation ?? GENERAL_INFLATION) / 100) * 100).toFixed(2));
                                })}
                                onError={action(() => {
                                    store.nominalDiscountRate = undefined;
                                    store.realDiscountRate = undefined;
                                })}
                                InputProps={Adornment.PERCENT}
                                type={"number"}/>
                        </Info>
                        <div style={{height: "16px"}}></div>
                       <Explanation title={"What is the Inflation Rate?"} information={
                           <p>Inflation rate is the long-run general rate of inflation in the economy. The Federal Reserve has a long-run general inflation target of 2 %. Historically, inflation has been below this target with the exception of 2021 and 2022 with much higher rates (7 % +). Expectations are that inflation will decrease in the future back towards, but slightly higher than the 2 % target.</p>
                       } expandable/>
                        <Info tooltip={GENERAL_INFLATION_TOOLTIP} info={GENERAL_INFLATION_INFO}>
                            <ValidatedTextField
                                fullWidth
                                variant={"filled"}
                                label={GENERAL_INFLATION_LABEL}
                                schema={Yup.number().required().max(100).min(0).test(DecimalTest)}
                                value={defaultIfUndefined(store.generalInflation, '')}
                                onValidate={action((value: number) => {
                                    store.generalInflation = value;
                                    store.realDiscountRate = parseFloat((calculateRealDiscountRate((store.nominalDiscountRate ?? NOMINAL_DISCOUNT_RATE) / 100, value / 100) * 100).toFixed(2));
                                })}
                                onError={action(() => store.generalInflation = undefined)}
                                InputProps={Adornment.PERCENT}
                                type={"number"}/>
                        </Info>
                        <div style={{height: "16px"}}></div>
                        <Explanation title={"What is the Real Discount Rate?"} information={
                            <p>The real discount rate is the discount rate excluding general rate of inflation. Unless the user directly provides it, [PV]^2 calculates the real discount rate using the nominal discount rate and inflation rate.</p>
                        } expandable/>
                        <Info tooltip={REAL_DISCOUNT_RATE_TOOLTIP} info={REAL_DISCOUNT_RATE_INFO}>
                            <ValidatedTextField
                                fullWidth
                                variant={"filled"}
                                label={REAL_DISCOUNT_RATE_LABEL}
                                schema={Yup.number().required().max(100).min(0).test(DecimalTest)}
                                value={defaultIfUndefined(store.realDiscountRate, '')}
                                onValidate={action((value: number) => {
                                    store.nominalDiscountRate = parseFloat((calculateNominalDiscountRate(value / 100, (store.generalInflation ?? GENERAL_INFLATION) / 100) * 100).toFixed(2));
                                    store.realDiscountRate = value;
                                })}
                                onError={action(() => {
                                    store.nominalDiscountRate = undefined;
                                    store.realDiscountRate = undefined;
                                })}
                                InputProps={Adornment.PERCENT}
                                type={"number"}/>
                        </Info>
                    </>
                }
            </Box>
        </Box>
    );
});

export default AnalysisAssumptionsForm;
