import {ReactElement} from "react";

// Library Imports
import {Box} from "@material-ui/core";
import * as Yup from "yup";

// User Imports
import MaterialHeader from "../../../components/MaterialHeader/MaterialHeader";
import FormField from "../../../components/FormField/FormField";
import FormSelect from "../../../components/FormSelect/FormSelect";
import {useReduxGetSet} from "../../../Utils";

// Stylesheets
import "../Form.sass";

export default function AnalysisAssumptionsForm(): ReactElement {
    // Analysis Assumptions
    const residualValueApproach = useReduxGetSet<string>("residualValueApproach");
    const studyPeriod = useReduxGetSet<number>("studyPeriod");
    const realDiscountRate = useReduxGetSet<number>("realDiscountRate");
    const generalInflation = useReduxGetSet<number>("generalInflation");

    return (
        <Box className={"form-page-container"}>
            <MaterialHeader text={"Analysis Assumptions"}/>
            <Box className={"form-single-column-container"}>
                <FormField
                    tooltip={"Study period is the analysis time frame"}
                    info={"Study period is the length of the time period covered by the economic evaluation Can select a study period between 1 year and 40 years"}
                    label={"Study Period"}
                    schema={Yup.number().required().max(40).min(1)}
                    value={studyPeriod}
                    endAdornment={"Years"}
                    type={"number"}/>
                <FormField
                    tooltip={"Time value of money excluding inflation"}
                    info={"Real Discount Rates reflect Time Value of Money apart from changes in the purchasing power of the dollar (i.e., general inflation)"}
                    label={"Real Discount Rate"}
                    schema={Yup.number().required().max(100).min(0)}
                    value={realDiscountRate}
                    endAdornment={"%"}
                    type={"number"}/>
                <FormField
                    tooltip={"General rate of price changes over time"}
                    info={"General inflation rate is the rate of rise in the general price level, or, put another way, a decline in the general purchasing power of the dollar."}
                    label={"General Inflation Rate"}
                    schema={Yup.number().required().max(100).min(0)}
                    value={generalInflation}
                    endAdornment={"%"}
                    type={"number"}/>
                <FormSelect
                    tooltip={"Approach to estimate value at the end of the study period"}
                    info={"Residual Value is the estimated value, net of any Disposal Costs, of any building or building system removed or replaced during the Study Period, or remaining at the end of the Study Period, or recovered through resale or reuse at the end of the Study Period\n" +
                    "Approach Options:\n" +
                    "The Linear Depreciation approach assumes that the residual value is a linear function of the installation cost for an investment.\n" +
                    "Note: If the study period and the service life of the solar PC system are the same, the residual value will be zero."}
                    label={"Residual Value Approach"}
                    value={residualValueApproach}
                    options={["Linear Depreciation"]}/>
            </Box>
        </Box>
    );
}