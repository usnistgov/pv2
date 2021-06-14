import React from 'react';

// Library Imports
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Provider} from "react-redux";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";

// User Imports
import LandingPage from "./application/landingpage/LandingPage";
import Application from "./application/Application";
import {store} from "./application/ApplicationStore";
import ResultData from "./application/results/ResultData";
import HeaderWrapper from "./components/Header/HeaderWrapper";

// Stylesheets
import '@csstools/normalize.css'
import './main.sass';

// Material UI theme definition
const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#98ee99',
            main: '#66bb6a',
            dark: '#338a3e',
            contrastText: '#000000',
        },
        secondary: {
            light: '#e57373',
            main: '#f44336',
            dark: '#d32f2f',
            contrastText: '#ffffff',
        },
    }
})

// Render main application
ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <Switch>
                    <Route path={"/results"}>
                        <HeaderWrapper>
                            <ResultData/>
                        </HeaderWrapper>
                    </Route>
                    <Route path={"/application"}>
                        <HeaderWrapper>
                            <Application/>
                        </HeaderWrapper>
                    </Route>
                    <Route path={"/"}>
                        <HeaderWrapper>
                            <LandingPage/>
                        </HeaderWrapper>
                    </Route>
                </Switch>
            </BrowserRouter>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);
