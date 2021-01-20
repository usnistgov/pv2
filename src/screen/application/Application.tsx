import React, {ReactElement} from "react";

import {Provider} from 'react-redux';
import {Container, createMuiTheme, MuiThemeProvider} from "@material-ui/core";

import StepperNav from "./components/StepperNav/StepperNav";
import StepperPage from "./components/StepperPage/StepperPage";
import SrecForm from "./pages/SrecForm/SrecForm";
import SolarSystemForm from "./pages/SolarSystemForm/SolarSystemForm";
import ElectricalRateForm from "./pages/ElectricalRateForm/ElectricalRateForm";
import AddressForm from "./pages/AddressForm/AddressForm";
import {rootStore} from "./ApplicationStore";


export const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#98ee99',
            main: '#66bb6a',
            dark: '#338a3e',
            contrastText: '#000000',
        },
        secondary: {
            light: '#5e92f3',
            main: '#1565c0',
            dark: '#003c8f',
            contrastText: '#ffffff',
        }
    }
})

/*
 * Wrapper component for the main form application.
 */
export default function Application(): ReactElement {
    return (
        <Provider store={rootStore}>
            <MuiThemeProvider theme={theme}>
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
            </MuiThemeProvider>
        </Provider>
    );
}