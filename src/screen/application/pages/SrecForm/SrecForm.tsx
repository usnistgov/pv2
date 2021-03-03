import {ReactElement} from "react";
import './SrecForm.scss';

import {Box} from "@material-ui/core";

import MaterialHeader from "../../components/MaterialHeader/MaterialHeader";
import FormSelect from "../../components/FormSelect/FormSelect";
import {useReduxGetSet} from "../../Utils";

export default function SrecForm(): ReactElement {
    const srecPayments = useReduxGetSet<string>("srecPayments", "");

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
            </Box>
        </Box>
    );
}
