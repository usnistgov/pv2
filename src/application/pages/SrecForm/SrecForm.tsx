import {ReactElement, useEffect} from "react";

// Library Imports
import {Box} from "@material-ui/core";
import * as Yup from "yup";
import {useStore} from "react-redux";

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
    const store = useStore();

    const srecPayments = useReduxGetSet<string>("srecPayments");
    const srecPaymentsUpFront = useReduxGetSet<number>("srecPaymentsUpFront")
    const srecPaymentsProductionBased = useReduxGetSet<number[]>("srecPaymentsProductionBased");

    useEffect(() => {
        srecPaymentsProductionBased.set(Array(store.getState().studyPeriod).fill(0));
    }, [store]);

    return (
        <Box className={"form-page-container"}>
            <MaterialHeader text={"SREC Payments"}/>
            <div className={"form-page-text"}>
                PV^2 allows a user to input dollar values from Solar Renewable Energy Credit (SREC) sales. A homeowner
                may be able to receive an upfront payment based on the size of the system or payments over time based on
                production.
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
                           schema={Yup.number().min(0)}
                           value={srecPaymentsUpFront}
                           endAdornment={"$/kWh"}
                           type={"number"}/>
                }
                {srecPayments.get() === "Production-based Payments" &&
                <div className="form-two-column-container">
                    {srecPaymentsProductionBased.get()
                        .map((payment, i) => {
                            let getSet = {
                                get: () => srecPaymentsProductionBased.get()[i],
                                set: (value: number) => {
                                    let result = [...srecPaymentsProductionBased.get()];
                                    result[i] = value;
                                    srecPaymentsProductionBased.set(result);
                                },
                            }

                            return (
                                <FormField
                                    label={`Year ${i + 1}`}
                                    schema={Yup.number().min(0)}
                                    value={getSet}
                                    endAdornment={"$/mWh"}
                                    type={"string"}
                                    key={i + 1}/>
                            )
                        })}
                </div>
                }
            </Box>
        </Box>
    );
}
