import React, {ReactElement, useState} from "react";

// Library Imports
import {Redirect} from "react-router-dom";

// User Imports
import StepperNav from "../components/StepperNav/StepperNav";
import StepperPage from "../components/StepperPage/StepperPage";
import SrecForm from "./pages/SrecForm/SrecForm";
import SolarSystemForm from "./pages/SolarSystemForm/SolarSystemForm";
import CostsForm from "./pages/CostsForm/CostsForm";
import ElectricalRateForm from "./pages/ElectricalRateForm/ElectricalRateForm";
import AddressForm from "./pages/AddressForm/AddressForm";

/*
 * Wrapper component for the main form application. Redirects to results if finished.
 */
export default function Application(): ReactElement {
    const [finished, setFinished] = useState(false);

    return (
        finished
            ? <Redirect to={"/results"}/>
            :
            <StepperNav onFinish={() => setFinished(true)}>
                <StepperPage label={"Address"}>
                    <AddressForm/>
                </StepperPage>
                <StepperPage label={"Electrical Rate"}>
                    <ElectricalRateForm/>
                </StepperPage>
                <StepperPage label={"Solar PV System"}>
                    <SolarSystemForm/>
                </StepperPage>
                <StepperPage label={"Solar PV Costs"}>
                    <CostsForm/>
                </StepperPage>
                <StepperPage label={"SREC"}>
                    <SrecForm/>
                </StepperPage>
            </StepperNav>
    );
}