import {ReactElement, useEffect} from "react";

// Library Imports
import {Box} from "@material-ui/core";
import * as Yup from "yup";
import {useStore} from "react-redux";

// User Imports
import FormField from "../../../components/FormField/FormField";
import MaterialHeader from "../../../components/MaterialHeader/MaterialHeader";
import FormSelect from "../../../components/FormSelect/FormSelect";
import {take, toJson, useReduxGetSet} from "../../../Utils";
import CollapseContainer from "../../../components/CollapseContainer/CollapseContainer";
import AdvancedBox from "../../../components/AdvancedBox/AdvancedBox";

// Stylesheets
import "../Form.sass";

const defaultState = "Maryland";

async function getEscalationRateList(storeState: string): Promise<Array<number>> {
    const stateAbbreviations = await fetch("escalation-rates/state-abbreviation.json").then(toJson);
    const regionEscalationRates = await fetch("escalation-rates/region-escalation-rates.json").then(toJson);
    const stateRegionMapping = await fetch("escalation-rates/state-region-mapping.json").then(toJson);

    const state = storeState === "" || !storeState ? defaultState : storeState;

    return regionEscalationRates[
        stateRegionMapping[
            state.length === 2 ? stateAbbreviations[state.toUpperCase()] : state
            ].Region
        ]
}

/*
 * Displays the electrical rate form.
 */
export default function ElectricalRateForm(): ReactElement {
    const store: any = useStore();

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
    const escalationRatesSameOrDiff = useReduxGetSet<string>("escalationRatesSameOrDiff", "");

    const escalationRateForYear = useReduxGetSet<number[]>("escalationRateForYear", []);

    useEffect(() => {
        getEscalationRateList(store.getState().state)
            .then(Object.values)
            .then(take(store.getState().studyPeriod))
            .then(escalationRateForYear.set);
    }, [store])

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
                <CollapseContainer text={"Advanced"}>
                    <AdvancedBox>
                        <FormSelect label={"Do you want to view/edit annual escalation rates?"}
                                    value={viewAnnualEscalationRates}
                                    options={[
                                        "Yes",
                                        "No"
                                    ]}/>
                        {viewAnnualEscalationRates.get() === "Yes" &&
                        <div className="form-two-column-container">
                            {escalationRateForYear.get()
                                .map((rate, i) => {
                                    const getSet = {
                                        get: () => escalationRateForYear.get()[i],
                                        set: (value: number) => {
                                            let result = [...escalationRateForYear.get()];
                                            result[i] = value;
                                            escalationRateForYear.set(result);
                                        }
                                    }

                                    return (
                                        <FormField label={`Year ${i + 1}`}
                                                   schema={Yup.number().max(1.0).min(-1.0)}
                                                   value={getSet}
                                                   endAdornment={"%"}
                                                   type={"string"}
                                                   key={`Year ${i + 1}`}/>
                                    )
                                })}
                        </div>
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
