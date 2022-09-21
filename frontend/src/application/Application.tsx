import React, {useContext, useState} from "react";
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
import Constants from "../Constants";
import {useNavigate} from "react-router-dom";

/*
 * Wrapper component for the main form application. Redirects to results if finished.
 */
const Application = observer(() => {
    const navigate = useNavigate();
    const store = useContext(Store);
    const [finished, setFinished] = useState(false);

    if (finished)
        navigate(Constants.routes.RESULTS);

    return <StepperNav onFinish={() => setFinished(true)}>
        <StepperPage label={"Address"} isDone={() => store.addressFormStore.validate}>
            <AddressForm step={0}/>
        </StepperPage>
        <StepperPage label={"Analysis Assumptions"} isDone={() => store.analysisAssumptionsFormStore.validate}>
            <AnalysisAssumptionsForm step={1}/>
        </StepperPage>
        <StepperPage label={"Electrical Costs"} isDone={() => {
            return store.electricalCostFormStore.validate && store.escalationRateFormStore.validate;
        }}>
            <ElectricalRateForm step={2}/>
        </StepperPage>
        <StepperPage label={"Solar PV System"} isDone={() => store.solarSystemFormStore.validate}>
            <SolarSystemForm step={3}/>
        </StepperPage>
        <StepperPage label={"Solar PV Costs"} isDone={() => store.costsFormStore.validate}>
            <CostsForm step={4}/>
        </StepperPage>
        <StepperPage label={"SREC"} isDone={() => store.srecFormStore.validate}>
            <SrecForm step={5}/>
        </StepperPage>
    </StepperNav>
});

export default Application;
