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
import Adornment from "../../../components/Adornments";
import Info from "../../../components/Info/Info";
import {action} from "mobx";
import {DecimalTest} from "../../../Utils";

const EscalationRateForm = observer(() => {
    const store = useContext(Store).escalationRateFormStore;

    function createFields(values: number[]): JSX.Element[] {
        return values.map((rate, i) => {
            return (
                <ValidatedTextField fullWidth
                                    required
                                    label={`Year ${i + 1}`}
                                    key={`Year ${i + 1}`}
                                    defaultValue={(values[i] * 100).toFixed(2)}
                                    variant={"filled"}
                                    schema={Yup.number().max(100).min(-100).test(DecimalTest)}
                                    onValidate={action((value) =>  values[i] = value / 100)}
                                    InputProps={Adornment.PERCENT}
                                    type={"number"}/>
            )
        })
    }

    return (
        <CollapseContainer text={"Advanced"}>
            <AdvancedBox>
                <div className={"form-advanced-header"}>
                    Consumption Escalation Rates
                </div>
                <Info tooltip={VIEW_ANNUAL_ESCALATION_RATES_TOOLTIP} info={VIEW_ANNUAL_ESCALATION_RATES_INFO}>
                    <FormControl fullWidth variant={"filled"}>
                        <InputLabel
                            id={VIEW_ANNUAL_ESCALATION_RATES_LABEL}>{VIEW_ANNUAL_ESCALATION_RATES_LABEL}</InputLabel>
                        <Select className={"form-select-left-align"}
                                fullWidth
                                labelId={VIEW_ANNUAL_ESCALATION_RATES_LABEL}
                                value={store.viewAnnualEscalationRates}
                                onChange={action((event) => {
                                    store.viewAnnualEscalationRates = event.target.value as string
                                })}>
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
                    <div className={"form-advanced-header"}>
                        Production Escalation Rates
                    </div>
                    <FormControl fullWidth variant={"filled"}>
                        <InputLabel
                            id={ESCALATION_RATES_SAME_OR_DIFF_LABEL}>{ESCALATION_RATES_SAME_OR_DIFF_LABEL}</InputLabel>
                        <Select className={"form-select-left-align"}
                                fullWidth
                                labelId={ESCALATION_RATES_SAME_OR_DIFF_LABEL}
                                value={store.escalationRatesSameOrDiff}
                                onChange={action((event) => {
                                    store.escalationRatesSameOrDiff = event.target.value as string
                                })}>
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