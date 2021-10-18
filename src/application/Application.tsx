import React, {useContext, useState} from "react";

// Library Imports
import {Redirect} from "react-router-dom";

// User Imports
import StepperNav from "../components/StepperNav/StepperNav";
import StepperPage from "../components/StepperPage";
import SrecForm from "./pages/SrecForm/SrecForm";
import SolarSystemForm from "./pages/SolarSystemForm/SolarSystemForm";
import CostsForm from "./pages/CostsForm/CostsForm";
import ElectricalRateForm from "./pages/ElectricalRateForm/ElectricalRateForm";
import AddressForm from "./pages/AddressForm/AddressForm";
import AnalysisAssumptionsForm from "./pages/AnalysisAssumptionsForm/AnalysisAssumptionsForm";
import {Store} from "./ApplicationStore";
import {observer} from "mobx-react-lite";

/*
 * Wrapper component for the main form application. Redirects to results if finished.
 */
const Application = observer(() => {
    const store = useContext(Store);
    const [finished, setFinished] = useState(false);

    return (
        finished
            ? <Redirect to={"/results"}/>
            :
            <StepperNav onFinish={() => setFinished(true)}>
                <StepperPage label={"Address"} isDone={() => store.addressFormStore.isDone}>
                    <AddressForm/>
                </StepperPage>
                <StepperPage label={"Analysis Assumptions"}>
                    <AnalysisAssumptionsForm/>
                </StepperPage>
                <StepperPage label={"Electrical Rate"} isDone={() => store.electricalCostFormStore.isDone}>
                    <ElectricalRateForm/>
                </StepperPage>
                <StepperPage label={"Solar PV System"} isDone={() => store.solarSystemFormStore.isDone}>
                    <SolarSystemForm/>
                </StepperPage>
                <StepperPage label={"Solar PV Costs"} isDone={() => store.costsFormStore.isDone}>
                    <CostsForm/>
                </StepperPage>
                <StepperPage label={"SREC"} isDone={() => store.srecFormStore.isDone}>
                    <SrecForm/>
                </StepperPage>
            </StepperNav>
    );
});

export default Application;
