import React, {useContext} from "react";
import {Box, FormControl, FormControlLabel, Switch} from "@material-ui/core";
import {observer} from "mobx-react-lite";
import {action} from "mobx";
import MaterialHeader from "../../../components/MaterialHeader/MaterialHeader";
import {
    CUSTOMIZE_DISCOUNT_RATE_SWITCH,
    DISCOUNT_RATES_EXPLANATION,
    DISCOUNT_RATES_EXPLANATION_TITLE,
    INFLATION_RATE_EXPLANATION,
    INFLATION_RATE_EXPLANATION_LABEL,
    INFLATION_RATE_INFO,
    INFLATION_RATE_LABEL,
    INFLATION_RATE_TOOLTIP,
    NOMINAL_DISCOUNT_RATE_EXPLANATION,
    NOMINAL_DISCOUNT_RATE_EXPLANATION_TITLE,
    NOMINAL_DISCOUNT_RATE_INFO,
    NOMINAL_DISCOUNT_RATE_LABEL,
    NOMINAL_DISCOUNT_RATE_TOOLTIP,
    REAL_DISCOUNT_RATE_EXPLANATION,
    REAL_DISCOUNT_RATE_EXPLANATION_LABEL,
    REAL_DISCOUNT_RATE_INFO,
    REAL_DISCOUNT_RATE_LABEL,
    REAL_DISCOUNT_RATE_TOOLTIP,
    STUDY_PERIOD_EXPLANATION,
    STUDY_PERIOD_EXPLANATION_TITLE,
    STUDY_PERIOD_INFO,
    STUDY_PERIOD_LABEL,
    STUDY_PERIOD_TOOLTIP
} from "../../../Strings";
import {Store} from "../../ApplicationStore";
import ValidatedTextField from "../../../components/ValidatedTextField";
import Info from "../../../components/Info/Info";
import Adornment from "../../../components/Adornments";
import ResetButton from "../../../components/ResetButton/ResetButton";
import "../Form.sass";
import {calculateNominalDiscountRate, calculateRealDiscountRate, defaultIfUndefined} from "../../../Utils";
import {GENERAL_INFLATION, NOMINAL_DISCOUNT_RATE} from "../../../Defaults";
import Explanation from "../../../components/Explanation/Explanation";

const AnalysisAssumptionsForm = observer(() => {
    const store = useContext(Store).analysisAssumptionsFormStore;

    return (
        <Box className={"form-page-container"}>
            <MaterialHeader text={"Analysis Assumptions"} right={<ResetButton onClick={() => store.reset()}/>}/>
            <Box className={"form-single-column-container"}>
                <div>
                    <Explanation title={STUDY_PERIOD_EXPLANATION_TITLE} information={STUDY_PERIOD_EXPLANATION}/>
                    <Info tooltip={STUDY_PERIOD_TOOLTIP} info={STUDY_PERIOD_INFO}>
                        <ValidatedTextField
                            fullWidth
                            variant={"filled"}
                            label={STUDY_PERIOD_LABEL}
                            schema={store.studyPeriodSchema}
                            value={defaultIfUndefined(store.studyPeriod, '')}
                            action={(value: number) => store.studyPeriod = value}
                            InputProps={Adornment.YEAR}
                            type={"number"}/>
                    </Info>
                </div>

                <div>
                    <p><strong>Do you want to modify the default discount and/or inflation rates?</strong></p>
                    <FormControl>
                        <FormControlLabel
                            control={
                                <Switch checked={store.isAdvanced}
                                        onChange={action((change: any) => store.isAdvanced = change.target.checked)}
                                        color={"primary"}/>
                            }
                            label={CUSTOMIZE_DISCOUNT_RATE_SWITCH}/>
                    </FormControl>
                </div>
                {store.isAdvanced &&
                    <>
                        <Explanation title={DISCOUNT_RATES_EXPLANATION_TITLE}
                                     information={DISCOUNT_RATES_EXPLANATION}/>
                        <div style={{height: "16px"}}></div>
                        <div>
                            <Explanation title={NOMINAL_DISCOUNT_RATE_EXPLANATION_TITLE}
                                         information={NOMINAL_DISCOUNT_RATE_EXPLANATION} expandable/>
                            <Info tooltip={NOMINAL_DISCOUNT_RATE_TOOLTIP} info={NOMINAL_DISCOUNT_RATE_INFO}>
                                <ValidatedTextField
                                    fullWidth
                                    variant={"filled"}
                                    label={NOMINAL_DISCOUNT_RATE_LABEL}
                                    schema={store.nominalDiscountRateSchema}
                                    value={defaultIfUndefined(store.nominalDiscountRate, '')}
                                    action={(value: number) => {
                                        store.nominalDiscountRate = value;
                                        store.realDiscountRate = parseFloat((calculateRealDiscountRate(value / 100, (store.generalInflation ?? GENERAL_INFLATION) / 100) * 100).toFixed(2));
                                    }}
                                    InputProps={Adornment.PERCENT}
                                    type={"number"}/>
                            </Info>
                        </div>
                        <div style={{height: "16px"}}></div>
                        <div>
                            <Explanation title={INFLATION_RATE_EXPLANATION_LABEL}
                                         information={INFLATION_RATE_EXPLANATION} expandable/>
                            <Info tooltip={INFLATION_RATE_TOOLTIP} info={INFLATION_RATE_INFO}>
                                <ValidatedTextField
                                    fullWidth
                                    variant={"filled"}
                                    label={INFLATION_RATE_LABEL}
                                    schema={store.inflationRateSchema}
                                    value={defaultIfUndefined(store.generalInflation, '')}
                                    action={(value: number) => {
                                        store.generalInflation = value;
                                        store.realDiscountRate = parseFloat((calculateRealDiscountRate((store.nominalDiscountRate ?? NOMINAL_DISCOUNT_RATE) / 100, value / 100) * 100).toFixed(2));
                                    }}
                                    InputProps={Adornment.PERCENT}
                                    type={"number"}/>
                            </Info>
                        </div>
                        <div style={{height: "16px"}}></div>
                        <div>
                            <Explanation title={REAL_DISCOUNT_RATE_EXPLANATION_LABEL}
                                         information={REAL_DISCOUNT_RATE_EXPLANATION} expandable/>
                            <Info tooltip={REAL_DISCOUNT_RATE_TOOLTIP} info={REAL_DISCOUNT_RATE_INFO}>
                                <ValidatedTextField
                                    fullWidth
                                    variant={"filled"}
                                    label={REAL_DISCOUNT_RATE_LABEL}
                                    schema={store.realDiscountRateSchema}
                                    value={defaultIfUndefined(store.realDiscountRate, '')}
                                    action={(value: number) => {
                                        store.nominalDiscountRate = parseFloat((calculateNominalDiscountRate(value / 100, (store.generalInflation ?? GENERAL_INFLATION) / 100) * 100).toFixed(2));
                                        store.realDiscountRate = value;
                                    }}
                                    InputProps={Adornment.PERCENT}
                                    type={"number"}/>
                            </Info>
                        </div>
                    </>
                }
            </Box>
        </Box>
    )
        ;
});

export default AnalysisAssumptionsForm;
