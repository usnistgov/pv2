import {ReactElement} from "react";
import './SrecForm.scss';

import {Box} from "@material-ui/core";

import MaterialHeader from "../../components/MaterialHeader/MaterialHeader";
import FormSelect from "../../components/FormSelect/FormSelect";
import { createStringSlice, useReduxGetSet } from "../../Utils";

// Redux string slices
export const [
    srecPaymentsSlice
] = [
    "srecPayments"
].map(createStringSlice)

export default function SrecForm(): ReactElement {
    const srecPayments = useReduxGetSet<string>("srecPayments", srecPaymentsSlice);

    return (
        <Box>
            <MaterialHeader text={"SREC Payments"}/>
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
