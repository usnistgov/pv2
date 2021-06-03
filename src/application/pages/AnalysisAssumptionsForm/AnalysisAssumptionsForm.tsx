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
    const residualValueApproach = useReduxGetSet<string>("residualValueApproach", "Linear Depreciation");
    const studyPeriod = useReduxGetSet<number>("studyPeriod", 25);
    const realDiscountRate = useReduxGetSet<number>("realDiscountRate", 20);
    const generalInflation = useReduxGetSet<number>("generalInflation", 10);

    return (
        <Box className={"form-page-container"}>
            <MaterialHeader text={"Analysis Assumptions"}/>
            <Box className={"form-single-column-container"}>
                <FormField
                    label={"Study Period"}
                    schema={Yup.number().required().max(40).min(1)}
                    value={studyPeriod}
                    endAdornment={"Years"}
                    type={"number"}/>
                <FormField
                    label={"Real Discount Rate"}
                    schema={Yup.number().required().max(100).min(0)}
                    value={realDiscountRate}
                    endAdornment={"%"}
                    type={"number"}/>
                <FormField
                    label={"General Inflation Rate"}
                    schema={Yup.number().required().max(100).min(0)}
                    value={generalInflation}
                    endAdornment={"%"}
                    type={"number"}/>
                <FormSelect
                    label={"Residual Value Approach"}
                    value={residualValueApproach}
                    options={[
                        "Remaining Production Value",
                        "Linear Depreciation"
                    ]}/>
            </Box>
        </Box>
    );
}