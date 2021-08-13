import React from 'react';

// Library Imports
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";

// User Imports
import LandingPage from "./application/landingpage/LandingPage";
import Application from "./application/Application";
import {Store, store} from "./application/ApplicationStore";
import ResultData from "./application/results/ResultData";
import HeaderWrapper from "./components/Header/HeaderWrapper";

// Stylesheets
import '@csstools/normalize.css'
import './main.sass';
import "./components/Info.sass"

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
});

// Render main application
ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Store.Provider value={store}>
        <BrowserRouter>
            <HeaderWrapper>
                <Switch>
                    <Route exact path={"/"}><LandingPage/></Route>
                    <Route path={"/application"}><Application/></Route>
                    <Route path={"/results"}><ResultData/></Route>
                </Switch>
            </HeaderWrapper>
        </BrowserRouter>
        </Store.Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);
