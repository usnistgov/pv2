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
                <FormField
                    tooltip={"Electricity Provider Name"}
                    info={"Electricity Provider Name. For informational purposes only."}
                    label={"Electricity Utility Company"}
                    schema={Yup.string()}
                    value={electricalCompanyName}/>
                <FormField
                    tooltip={"Annual consumption of the household"}
                    info={
                        "Annual consumption of the household. Can use previous year’s bills or obtain consumption " +
                        "data from the users online account at the electricity provider."
                    }
                    label={"Annual Consumption"}
                    schema={Yup.number().required()}
                    value={annualConsumption}
                    endAdornment={"kWH"}
                    type={"number"}/>
                <FormField
                    tooltip={"Demand charge is a fixed costs for having an account"}
                    info={"Demand charge is a fixed cost for having an account. Can find this value from monthly bills"}
                    label={"Monthly Flat Rate Charge"}
                    schema={Yup.number().required()}
                    value={monthlyFlatRateCharge}
                    startAdornment={"$"}
                    type={"number"}/>
                <FormField
                    tooltip={"Price per unit of electricity consumed ($/kWh)"}
                    info={
                        "Cost per unit of electricity consumed ($/kWh). This is the sum of all costs associated with " +
                        "a unit of electricity, such as generation, transmission, and distribution charges, taxes, " +
                        "fees, environmental fund payments."
                    }
                    label={"Electricity Unit Price"}
                    schema={Yup.number().required()}
                    value={electricUnitPrice}
                    endAdornment={"$/kWH"}
                    type={"number"}/>
                <FormSelect
                    tooltip={"Net metering for Gross metering (i.e., feed in tariff)"}
                    info={
                        "Net metering means that the homeowner is charged (or paid) for the net difference in " +
                        "electricity consumption and electricity production. Typically, the price paid for excess " +
                        "consumption is different than the price paid to the homeowner for excess production.\n" +
                        "Gross metering (i.e., feed in tariff) means that the homeowner is paid for all production " +
                        "and is charged for all consumption, typically at different rates."
                    }
                    label={"Net Metering or Feed In Tariff (FiT)"}
                    value={netMeteringFeedTariff}
                    options={[
                        "Net Metering Tariff",
                        "Feed in Tariff (Gross Metering)"
                    ]}/>
                <FormField
                    tooltip={"Price per unit of electricity produced ($/kWh)"}
                    info={
                        "Price per unit of electricity produced ($/kWh), which is typically different than the " +
                        "consumption price."
                    }
                    label={"Excess Generation / FiT Unit Price"}
                    schema={Yup.number().required()}
                    value={excessGenerationUnitPrice}
                    endAdornment={"$/kWH"}
                    type={"number"}/>
                <FormField
                    tooltip={"Annual charge for connecting a solar PV system to the grid"}
                    info={
                        "Annual escalation rates for electricity prices. The default values are based on EIA " +
                        "projections for each Census Region and published in the Annual Supplement to NIST Handbook " +
                        "135 (add hyperlink)."
                    }
                    label={"PV Grid Connection Rate (Monthly)"}
                    schema={Yup.number().required()}
                    value={pvGridConnectionRate}
                    endAdornment={"$/kWH"}
                    type={"number"}/>
                <EscalationRateForm/>
            </Box>
        </Box>
    );
}
