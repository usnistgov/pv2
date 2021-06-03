import {ReactElement} from "react";

// Library Imports
import {Box} from "@material-ui/core";
import * as Yup from "yup";

// User Imports
import MaterialHeader from "../../../components/MaterialHeader/MaterialHeader";
import FormSelect from "../../../components/FormSelect/FormSelect";
import {useReduxGetSet} from "../../../Utils";
import FormField from "../../../components/FormField/FormField";

// Stylesheets
import "../Form.sass";

/**
 * Form for SREC details.
 */
export default function SrecForm(): ReactElement {
    const srecPayments = useReduxGetSet<string>("srecPayments", "");
    const srecPaymentsUpFront = useReduxGetSet<number>("srecPaymentsUpFront", 0)
    const srecPaymentsProductionBased = useReduxGetSet<string>("srecPaymentsProductionBased", "0 0 0 0 0");

    // TODO: fetch studyPeriod from redux store, and fetch default values
    const studyPeriod = 25;
    const srecPaymentsPerYear = [];
    for (let i = 0; i < studyPeriod; i++) {
        // TODO: push the default value instead of i, when available
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const srecPaymentForYear = useReduxGetSet<number>("srecPaymentsProdBased_" + i, i);
        srecPaymentsPerYear.push(srecPaymentForYear);
    }
    
    return (
        <Box className={"form-page-container"}>
            <MaterialHeader text={"SREC Payments"}/>
            <div className={"form-page-text"}>
                PV^2 allows a user to input dollar values from Solar Renewable Energy Credit (SREC) sales. A homeowner may be able to receive an upfront payment based on the size of the system or payments over time based on production.
            </div>

            <Box className={"form-single-column-container"}>
                <FormSelect
                    label={"SREC Payments"}
                    value={srecPayments}
                    options={[
                        "Up-front Payment",
                        "Production-based Payments",
                    ]}/>
                {srecPayments.get() === "Up-front Payment" &&
                    <FormField label={"SREC Payments - Up-front Payment"}
                        schema={Yup.number()}
                        value={srecPaymentsUpFront}
                        endAdornment={"$/kWh"}
                        type={"number"}/>
                }
                {srecPayments.get() === "Production-based Payments" &&
                    <div className="form-two-column-container">
                        {srecPaymentsPerYear.map((payment, i) => {
                            return (
                                <FormField label={"Year " + i}
                                    schema={Yup.number()}
                                    value={payment}
                                    endAdornment={"$/mWh"}
                                    type={"string"}/>
                            )
                        })}
                    </div>
                    
                }
            </Box>
        </Box>
    );
}
