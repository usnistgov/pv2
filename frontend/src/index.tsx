import React from 'react';

// Library Imports
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {MuiThemeProvider} from "@material-ui/core";

// User Imports
import LandingPage from "./application/landingpage/LandingPage";
import Application from "./application/Application";
import {Store, store} from "./application/ApplicationStore";
import Request from "./components/Request/Request";
import Header from "./components/Header/Header";
import Disclaimer from "./components/Disclaimer/Disclaimer";
import Constants from "./Constants";

// Stylesheets
import '@csstools/normalize.css'
import './main.sass';
import NotFound from "./application/pages/NotFound/NotFound";


// Render main application
ReactDOM.render(
    <MuiThemeProvider theme={Constants.theme}>
        <Store.Provider value={store}>
            <BrowserRouter>
                <Header>
                    <Switch>
                        <Route exact path={Constants.routes.LANDING_PAGE}><LandingPage/></Route>
                        <Route path={Constants.routes.APPLICATION}><Application/></Route>
                        <Route path={Constants.routes.RESULTS}><Request/></Route>
                        <Route path={"*"}><NotFound/></Route>
                    </Switch>
                </Header>
            </BrowserRouter>
        </Store.Provider>

        <Disclaimer/>
    </MuiThemeProvider>,
    document.getElementById('root')
);
