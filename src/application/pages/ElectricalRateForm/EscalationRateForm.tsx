import React, {useContext} from "react";

// Library Imports
import * as Yup from "yup";
import {observer} from "mobx-react-lite";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";

// User Imports
import AdvancedBox from "../../../components/AdvancedBox/AdvancedBox";
import CollapseContainer from "../../../components/CollapseContainer/CollapseContainer";
import {Store} from "../../ApplicationStore";
import ValidatedTextField from "../../../components/ValidatedTextField";
import {
    ESCALATION_RATES_SAME_OR_DIFF_LABEL,
    ESCALATION_RATES_SAME_OR_DIFF_OPTIONS,
    VIEW_ANNUAL_ESCALATION_RATES_INFO,
    VIEW_ANNUAL_ESCALATION_RATES_LABEL,
    VIEW_ANNUAL_ESCALATION_RATES_OPTIONS,
    VIEW_ANNUAL_ESCALATION_RATES_TOOLTIP
} from "../../../Strings";
import {percentAdornment} from "../../../components/Adornments";
import Info from "../../../components/Info";

const EscalationRateForm = observer(() => {
    const store = useContext(Store).escalationRateFormStore;

    function createFields(values: number[]): JSX.Element[] {
        return values.map((rate, i) => {
            return (
                <ValidatedTextField fullWidth
                                    required
                                    label={`Year ${i + 1}`}
                                    key={`Year ${i + 1}`}
                                    defaultValue={values[i]}
                                    variant={"filled"}
                                    schema={Yup.number().max(1.0).min(-1.0)}
                                    onValidate={(value) => values[i] = value}
                                    InputProps={percentAdornment}
                                    type={"number"}/>
            )
        })
    }

    return (
        <CollapseContainer text={"Advanced"}>
            <AdvancedBox>
                <Info tooltip={VIEW_ANNUAL_ESCALATION_RATES_TOOLTIP} info={VIEW_ANNUAL_ESCALATION_RATES_INFO}>
                    <FormControl fullWidth variant={"filled"}>
                        <InputLabel id={VIEW_ANNUAL_ESCALATION_RATES_LABEL}>{VIEW_ANNUAL_ESCALATION_RATES_LABEL}</InputLabel>
                        <Select className={"form-select-left-align"}
                                fullWidth
                                labelId={VIEW_ANNUAL_ESCALATION_RATES_LABEL}
                                value={store.viewAnnualEscalationRates}
                                onChange={(event) => {
                                    store.viewAnnualEscalationRates = event.target.value as string
                                }}>
                            {
                                VIEW_ANNUAL_ESCALATION_RATES_OPTIONS.map((option, index) =>
                                    <MenuItem value={option} key={index}>{option}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                </Info>
                {store.viewAnnualEscalationRates === VIEW_ANNUAL_ESCALATION_RATES_OPTIONS[0] &&
                <>
                    <div className="form-two-column-container">
                        {createFields(store.escalationRateForYear)}
                    </div>
                    <FormControl fullWidth variant={"filled"}>
                        <InputLabel id={ESCALATION_RATES_SAME_OR_DIFF_LABEL}>{ESCALATION_RATES_SAME_OR_DIFF_LABEL}</InputLabel>
                        <Select className={"form-select-left-align"}
                                fullWidth
                                labelId={ESCALATION_RATES_SAME_OR_DIFF_LABEL}
                                value={store.escalationRatesSameOrDiff}
                                onChange={(event) => {
                                    store.escalationRatesSameOrDiff = event.target.value as string
                                }}>
                            {
                                ESCALATION_RATES_SAME_OR_DIFF_OPTIONS.map((option, index) =>
                                    <MenuItem value={option} key={index}>{option}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                    {store.escalationRatesSameOrDiff === ESCALATION_RATES_SAME_OR_DIFF_OPTIONS[1] &&
                    <div className="form-two-column-container">
                        {createFields(store.productionEscalationRateForYear)}
                    </div>
                    }
                </>
                }
            </AdvancedBox>
        </CollapseContainer>
    );
});

export default EscalationRateForm;
