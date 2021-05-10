import {ReactElement} from "react";

import {Box} from "@material-ui/core";
import * as Yup from "yup";

import FormField from "../../components/FormField/FormField";
import MaterialHeader from "../../components/MaterialHeader/MaterialHeader";
import FormSelect from "../../components/FormSelect/FormSelect";
import {useReduxGetSet} from "../../Utils";

import "./ElectricalRateForm.css"
import CollapseContainer from "../../components/CollapseContainer/CollapseContainer";
import AdvancedBox from "../../components/AdvancedBox/AdvancedBox";

/*
 * Displays the electrical rate form.
 */
export default function ElectricalRateForm(): ReactElement {
    // Redux state objects
    const electricalCompanyName = useReduxGetSet<string>("electricalCompanyName", "");
    const netMeteringFeedTariff = useReduxGetSet<string>("netMeteringFeedTariff", "");
    const annualConsumption = useReduxGetSet<number>("annualConsumption", 0);
    const monthlyFlatRateCharge = useReduxGetSet<number>("monthlyFlatRateCharge", 0);
    const electricUnitPrice = useReduxGetSet<number>("electricUnitPrice", 0);
    const excessGenerationUnitPrice = useReduxGetSet<number>("excessGenerationUnitPrice", 0);
    const pvGridConnectionRate = useReduxGetSet<number>("pvGridConnectionRate", 0);

    // Advanced
    const viewAnnualEscalationRates = useReduxGetSet<string>("viewAnnualEscalationRates", "No");
    const escalationRateSingleValue = useReduxGetSet<number>("escalationRateValue", 0);
    const escalationRateMultipleValues = useReduxGetSet<string>("escalationRateMultipleValues", "0 0 0 0 0 0 0 0 0 0"); // default value here?
    const escalationRatesSameOrDiff = useReduxGetSet<string>("escalationRatesSameOrDiff", "");

    return (
        <Box>
            <MaterialHeader text={"Electrical Rate Information"}/>
            <Box className={"electrical-form-container"}>
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
                <CollapseContainer text={"Advanced"}>
                    <AdvancedBox>
                        <FormSelect label={"Do you want to view/edit annual escalation rates?"}
                            value={viewAnnualEscalationRates}
                            options={[
                                "Yes, single value",
                                "Yes, multiple values",
                                "No"
                            ]}/>
                        {viewAnnualEscalationRates.get() === "Yes, single value" &&
                            <FormField label={"Escalation Rate - Single Value"}
                                schema={Yup.number()}
                                value={escalationRateSingleValue}
                                endAdornment={"%"}
                                type={"number"}/>
                        }
                        {viewAnnualEscalationRates.get() === "Yes, multiple values" &&
                            <FormField label={"Escalation Rate - Multiple Values"}
                                schema={Yup.string()}
                                value={escalationRateMultipleValues}
                                endAdornment={"%"}
                                type={"string"}/>
                        }
                        <FormSelect label={"Are escalation rates the same for consumption and production?"}
                            value={escalationRatesSameOrDiff}
                            options={[
                                "Same",
                                "Different"
                            ]}/>
                    </AdvancedBox>
                </CollapseContainer>
            </Box>
        </Box>
    );
}
