import {ReactElement} from "react";

// Library Imports
import {Box} from "@material-ui/core";
import * as Yup from "yup";

// User Imports
import FormField from "../../../components/FormField/FormField";
import MaterialHeader from "../../../components/MaterialHeader/MaterialHeader";
import FormSelect from "../../../components/FormSelect/FormSelect";
import {useReduxGetSet} from "../../../Utils";

// Stylesheets
import "../Form.sass";
import EscalationRateForm from "./EscalationRateForm";

/*
 * Displays the electrical rate form.
 */
export default function ElectricalRateForm(): ReactElement {
    // Redux state objects
    const electricalCompanyName = useReduxGetSet<string>("electricalCompanyName");
    const netMeteringFeedTariff = useReduxGetSet<string>("netMeteringFeedTariff");
    const annualConsumption = useReduxGetSet<number>("annualConsumption");
    const monthlyFlatRateCharge = useReduxGetSet<number>("monthlyFlatRateCharge");
    const electricUnitPrice = useReduxGetSet<number>("electricUnitPrice");
    const excessGenerationUnitPrice = useReduxGetSet<number>("excessGenerationUnitPrice");
    const pvGridConnectionRate = useReduxGetSet<number>("pvGridConnectionRate");

    return (
        <Box className={"form-page-container"}>
            <MaterialHeader text={"Electrical Rate Information"}/>
            <Box className={"form-single-column-container"}>
                <FormField label={"Electricity Utility Company"}
                           schema={Yup.string()}
                           value={electricalCompanyName}/>
                <FormField label={"Annual Consumption"}
                           schema={Yup.number().required()}
                           value={annualConsumption}
                           endAdornment={"kWH"}
                           type={"number"}/>
                <FormField label={"Monthly Flat Rate Charge"}
                           schema={Yup.number().required()}
                           value={monthlyFlatRateCharge}
                           startAdornment={"$"}
                           type={"number"}/>
                <FormField label={"Electricity Unit Price"}
                           schema={Yup.number().required()}
                           value={electricUnitPrice}
                           endAdornment={"$/kWH"}
                           type={"number"}/>
                <FormSelect label={"Net Metering or Feed In Tariff (FiT)"}
                            value={netMeteringFeedTariff}
                            options={[
                                "Net Metering Tariff",
                                "Feed in Tariff (Gross Metering)"
                            ]}/>
                <FormField label={"Excess Generation / FiT Unit Price"}
                           schema={Yup.number().required()}
                           value={excessGenerationUnitPrice}
                           endAdornment={"$/kWH"}
                           type={"number"}/>
                <FormField label={"PV Grid Connection Rate (Monthly)"}
                           schema={Yup.number().required()}
                           value={pvGridConnectionRate}
                           endAdornment={"$/kWH"}
                           type={"number"}/>
                <EscalationRateForm/>
            </Box>
        </Box>
    );
}
