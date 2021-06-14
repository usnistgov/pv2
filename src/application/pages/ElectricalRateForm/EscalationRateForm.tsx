import {ReactElement, useEffect} from "react";

// Library Imports
import * as Yup from "yup";
import {useSelector} from "react-redux";

// User Imports
import AdvancedBox from "../../../components/AdvancedBox/AdvancedBox";
import FormSelect from "../../../components/FormSelect/FormSelect";
import FormField from "../../../components/FormField/FormField";
import {RootState} from "../../ApplicationStore";
import CollapseContainer from "../../../components/CollapseContainer/CollapseContainer";
import {take, toJson, useReduxGetSet} from "../../../Utils";

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

export default function EscalationRateForm(): ReactElement {
    const state = useSelector((store: RootState) => store.state);
    const studyPeriod = useSelector((store: RootState) => store.studyPeriod);

    const viewAnnualEscalationRates = useReduxGetSet<string>("viewAnnualEscalationRates");
    const escalationRatesSameOrDiff = useReduxGetSet<string>("escalationRatesSameOrDiff");

    const escalationRateForYear = useReduxGetSet<number[]>("escalationRateForYear");
    const productionEscalationRateForYear = useReduxGetSet<number[]>("productionEscalationRateForYear");

    useEffect(() => {
        getEscalationRateList(state)
            .then(Object.values)
            .then(take(studyPeriod))
            .then((result) => {
                productionEscalationRateForYear.set(result);
                escalationRateForYear.set(result);
            });
    }, [])

    function createFields(values: number[]): JSX.Element[] {
        return values.map((rate, i) => {
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
        })
    }

    return (
        <CollapseContainer text={"Advanced"}>
            <AdvancedBox>
                <FormSelect label={"Do you want to view/edit annual escalation rates?"}
                            value={viewAnnualEscalationRates}
                            options={[
                                "Yes",
                                "No"
                            ]}/>
                {viewAnnualEscalationRates.get() === "Yes" &&
                <>
                    <div className="form-two-column-container">
                        {createFields(escalationRateForYear.get())}
                    </div>
                    <FormSelect label={"Are escalation rates the same for consumption and production?"}
                                value={escalationRatesSameOrDiff}
                                options={[
                                    "Same",
                                    "Different"
                                ]}/>
                    {escalationRatesSameOrDiff.get() === "Different" &&
                    <div className="form-two-column-container">
                        {createFields(productionEscalationRateForYear.get())}
                    </div>
                    }
                </>
                }
            </AdvancedBox>
        </CollapseContainer>
    );
}