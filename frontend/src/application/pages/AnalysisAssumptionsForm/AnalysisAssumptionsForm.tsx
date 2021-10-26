import React, {useContext} from "react";

// Library Imports
import {Box, FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import * as Yup from "yup";
import {observer} from "mobx-react-lite";
import {action} from "mobx";

// User Imports
import MaterialHeader from "../../../components/MaterialHeader/MaterialHeader";
import {
    GENERAL_INFLATION_INFO,
    GENERAL_INFLATION_LABEL,
    GENERAL_INFLATION_TOOLTIP,
    REAL_DISCOUNT_RATE_INFO,
    REAL_DISCOUNT_RATE_LABEL,
    REAL_DISCOUNT_RATE_TOOLTIP,
    RESIDUAL_VALUE_APPROACH_INFO,
    RESIDUAL_VALUE_APPROACH_LABEL,
    RESIDUAL_VALUE_APPROACH_OPTIONS,
    RESIDUAL_VALUE_APPROACH_TOOLTIP,
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
import {DecimalTest} from "../../../Utils";

const AnalysisAssumptionsForm = observer(() => {
    const store = useContext(Store).analysisAssumptionsFormStore;

    return (
        <Box className={"form-page-container"}>
            <MaterialHeader text={"Analysis Assumptions"} right={<ResetButton onClick={() => store.reset()}/>}/>
            <div className={"form-page-text"}>
                Provide general assumptions for the economic analysis. Default values are provided. See User Guide for
                detailed guidance on study period (timeframe of analysis), discount rate (time value of money),
                inflation rate (purchasing power over time), and residual value assumptions.
            </div>
            <Box className={"form-single-column-container"}>
                <Info tooltip={STUDY_PERIOD_TOOLTIP} info={STUDY_PERIOD_INFO}>
                    <ValidatedTextField
                        fullWidth
                        variant={"filled"}
                        label={STUDY_PERIOD_LABEL}
                        schema={Yup.number().required().max(40).min(1).integer()}
                        value={store.studyPeriod}
                        onValidate={action((value: number) => store.studyPeriod = value)}
                        InputProps={Adornment.YEAR}
                        type={"number"}/>
                </Info>
                <Info tooltip={REAL_DISCOUNT_RATE_TOOLTIP} info={REAL_DISCOUNT_RATE_INFO}>
                    <ValidatedTextField
                        fullWidth
                        variant={"filled"}
                        label={REAL_DISCOUNT_RATE_LABEL}
                        schema={Yup.number().required().max(100).min(0).test(DecimalTest)}
                        value={store.realDiscountRate}
                        onValidate={action((value: number) => store.realDiscountRate = value)}
                        InputProps={Adornment.PERCENT}
                        type={"number"}/>
                </Info>
                <Info tooltip={GENERAL_INFLATION_TOOLTIP} info={GENERAL_INFLATION_INFO}>
                    <ValidatedTextField
                        fullWidth
                        variant={"filled"}
                        label={GENERAL_INFLATION_LABEL}
                        schema={Yup.number().required().max(100).min(0).test(DecimalTest)}
                        value={store.generalInflation}
                        onValidate={action((value: number) => store.generalInflation = value)}
                        InputProps={Adornment.PERCENT}
                        type={"number"}/>
                </Info>
                <Info tooltip={RESIDUAL_VALUE_APPROACH_TOOLTIP} info={RESIDUAL_VALUE_APPROACH_INFO}>
                    <FormControl fullWidth variant={"filled"}>
                        <InputLabel id={RESIDUAL_VALUE_APPROACH_LABEL}>{RESIDUAL_VALUE_APPROACH_LABEL}</InputLabel>
                        <Select className={"form-select-left-align"}
                                fullWidth
                                labelId={RESIDUAL_VALUE_APPROACH_LABEL}
                                value={store.residualValueApproach}
                                onChange={action((event) => {
                                    store.residualValueApproach = event.target.value as string
                                })}>
                            {
                                RESIDUAL_VALUE_APPROACH_OPTIONS.map((option, index) =>
                                    <MenuItem value={option} key={index}>{option}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                </Info>

                {/* TODO: Add environmental dropdown */}
            </Box>
        </Box>
    );
});

export default AnalysisAssumptionsForm;