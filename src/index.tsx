import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import '@csstools/normalize.css'
import './main.scss';

import LandingPage from "./screen/landingpage/LandingPage";
import Application from "./screen/application/Application";
import {Provider} from "react-redux";
import {initializeStore} from "./screen/application/ApplicationStore";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import Results from "./screen/results/Results";
import HeaderWrapper from "./screen/components/HeaderWrapper";

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

const store = initializeStore();

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <Switch>
                    <Route path={"/results"}>
                        <HeaderWrapper>
                            <Results/>
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
