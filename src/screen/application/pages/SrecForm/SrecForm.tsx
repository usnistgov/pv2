import {ReactElement} from "react";
import './SrecForm.scss';

import {Box} from "@material-ui/core";
import * as Yup from "yup";

import MaterialHeader from "../../components/MaterialHeader/MaterialHeader";
import FormSelect from "../../components/FormSelect/FormSelect";
import {useReduxGetSet} from "../../Utils";
import FormField from "../../components/FormField/FormField";

export default function SrecForm(): ReactElement {
    const srecPayments = useReduxGetSet<string>("srecPayments", "");
    const srecPaymentsUpFront = useReduxGetSet<number>("srecPaymentsUpFront", 0)
    const srecPaymentsProductionBased = useReduxGetSet<string>("srecPaymentsProductionBased", "0 0 0 0 0");

    return (
        <Box className={"srec-page-container"}>
            <MaterialHeader text={"SREC Payments"}/>
            PV^2 allows a user to input dollar values from Solar Renewable Energy Credit (SREC) sales. A homeowner may be able to receive an upfront payment based on the size of the system or payments over time based on production.

            <Box className={"srec-form-container"}>
                <FormSelect
                    label={"SREC Payments"}
                    value={srecPayments}
                    options={[
                        "Up-front Payment",
                        "Production-based Payments",
                    ]}/>
                {srecPayments.get() === "Up-front Payment" &&
                    <FormField label={"SREC Payments - Up-front payment"}
                        schema={Yup.number()}
                        value={srecPaymentsUpFront}
                        startAdornment={"$"}
                        type={"number"}/>
                }
                {srecPayments.get() === "Production-based Payments" &&
                    <FormField label={"SREC Payments - Production-based Payments"}
                        schema={Yup.string().matches(/^[0-9\s]*$/, "must be numbers separated by spaces")}
                        value={srecPaymentsProductionBased}
                        startAdornment={"$"}
                        type={"string"}/>
                }
            </Box>
        </Box>
    );
}
