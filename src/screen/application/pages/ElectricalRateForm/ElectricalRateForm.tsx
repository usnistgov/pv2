import {ReactElement} from "react";

import {Box} from "@material-ui/core";
import * as Yup from "yup";

import FormField from "../../components/FormField/FormField";
import MaterialHeader from "../../components/MaterialHeader/MaterialHeader";
import FormSelect from "../../components/FormSelect/FormSelect";
import {createNumberSlice, createStringSlice, useReduxGetSet} from "../../Utils";

import "./ElectricalRateForm.css"
import CollapseContainer from "../../components/CollapseContainer/CollapseContainer";
import AdvancedBox from "../../components/AdvancedBox/AdvancedBox";


// Redux string slices
export const [
    electricalCompanyNameSlice,
    netMeteringFeedTariffSlice,
    viewAnnualEscalationRatesSlice,
    escalationRatesSameOrDiffSlice
] = [
    "electricalCompanyName",
    "netMeteringFeedTariff",
    "viewAnnualEscalationRates",
    "escalationRatesSameOrDiff"
].map(createStringSlice);

// Redux number slices
export const [
    annualConsumptionSlice,
    monthlyFlatRateChargeSlice,
    electricUnitPriceSlice,
    excessGenerationUnitPriceSlice,
    pvGridConnectionRateSlice
] = [
    "annualConsumption",
    "monthlyFlatRateCharge",
    "electricUnitPrice",
    "excessGenerationUnitPrice",
    "pvGridConnectionRate"
].map(createNumberSlice);

/*
 * Displays the electrical rate form.
 */
export default function ElectricalRateForm(): ReactElement {
    // Redux state objects
    const electricalCompanyName = useReduxGetSet<string>("electricalCompanyName", electricalCompanyNameSlice);
    const netMeteringFeedTariff = useReduxGetSet<string>("netMeteringFeedTariff", netMeteringFeedTariffSlice);
    const annualConsumption = useReduxGetSet<number>("annualConsumption", annualConsumptionSlice);
    const monthlyFlatRateCharge = useReduxGetSet<number>("monthlyFlatRateCharge", monthlyFlatRateChargeSlice);
    const electricUnitPrice = useReduxGetSet<number>("electricUnitPrice", electricUnitPriceSlice);
    const excessGenerationUnitPrice = useReduxGetSet<number>("excessGenerationUnitPrice", excessGenerationUnitPriceSlice);
    const pvGridConnectionRate = useReduxGetSet<number>("pvGridConnectionRate", pvGridConnectionRateSlice);

    // Advanced
    const viewAnnualEscalationRates = useReduxGetSet<string>("viewAnnualEscalationRates", viewAnnualEscalationRatesSlice);
    const escalationRatesSameOrDiff = useReduxGetSet<string>("escalationRatesSameOrDiff", escalationRatesSameOrDiffSlice);

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
                                "Yes",
                                "No"
                            ]}/>
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
