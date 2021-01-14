import React from "react";
import StepperNav from "./components/StepperNav";
import StepperPage from "./components/StepperPage";
import SrecForm from "./components/pages/SrecForm";
import SolarSystemForm from "./components/pages/SolarSystemForm";
import ElectricalRateForm from "./components/pages/ElectricalRateForm";
import AddressForm from "./components/pages/AddressForm";
import {Provider} from 'react-redux';

import {Container, createMuiTheme, MuiThemeProvider} from "@material-ui/core";
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

class Application extends React.Component {
    render(): React.ReactNode {
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
}

export default Application;