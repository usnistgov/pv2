import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import './main.scss';

import LandingPage from "./screen/landingpage/LandingPage";
import Application from "./screen/application/Application";
import {Provider} from "react-redux";
import {rootStore} from "./screen/application/ApplicationStore";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import Results from "./screen/results/Results";

const theme = createMuiTheme({
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

ReactDOM.render(
    <Provider store={rootStore}>
        <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <Switch>
                    <Route path={"/results"}>
                        <Results/>
                    </Route>
                    <Route path={"/application"}>
                        <Application/>
                    </Route>
                    <Route path={"/"}>
                        <LandingPage/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);
