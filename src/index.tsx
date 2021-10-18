import React from 'react';

// Library Imports
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {MuiThemeProvider} from "@material-ui/core";

// User Imports
import LandingPage from "./application/landingpage/LandingPage";
import Application from "./application/Application";
import {Store, store} from "./application/ApplicationStore";
import ResultData from "./application/results/ResultData";
import Header from "./components/Header/Header";
import Disclaimer from "./components/Disclaimer/Disclaimer";
import Config from "./Config";

// Stylesheets
import '@csstools/normalize.css'
import './main.sass';


// Render main application
ReactDOM.render(
    <MuiThemeProvider theme={Config.theme}>
        <Store.Provider value={store}>
            <BrowserRouter>
                <Header>
                    <Switch>
                        <Route exact path={"/"}><LandingPage/></Route>
                        <Route path={"/application"}><Application/></Route>
                        <Route path={"/results"}><ResultData/></Route>
                    </Switch>
                </Header>
            </BrowserRouter>
        </Store.Provider>

        <Disclaimer/>
    </MuiThemeProvider>,
    document.getElementById('root')
);
