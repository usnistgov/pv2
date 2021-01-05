import React from "react";
import {Button, Container} from "@material-ui/core";
import StepperNav from "./StepperNav";
import StepperPage from "./StepperPage";
import SrecForm from "./pages/SrecForm";
import SolarSystemForm from "./pages/SolarSystemForm";
import ElectricalRateForm from "./pages/ElectricalRateForm";
import AddressForm from "./pages/AddressForm";

class Application extends React.Component {
    render(): React.ReactNode {
        return (
            <Container>
                <StepperNav>
                    <StepperPage label={"Address"}>
                        <AddressForm/>
                    </StepperPage>
                    <StepperPage label={"Electrical Rate"}>
                        <ElectricalRateForm/>
                    </StepperPage>
                    <StepperPage label={"Solar PV System"}>
                        <SolarSystemForm/>
                    </StepperPage>
                    <StepperPage label={"SREC"}>
                        <SrecForm/>
                    </StepperPage>
                </StepperNav>
            </Container>
        );
    }
}

export default Application;