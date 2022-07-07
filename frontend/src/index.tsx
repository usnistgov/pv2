import React from 'react';

import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MuiThemeProvider} from "@material-ui/core";
import LandingPage from "./application/landingpage/LandingPage";
import Application from "./application/Application";
import {Store, store} from "./application/ApplicationStore";
import Request from "./components/Request/Request";
import Header from "./components/Header/Header";
import Disclaimer from "./components/Disclaimer/Disclaimer";
import Constants from "./Constants";
import '@csstools/normalize.css'
import './main.sass';
import NotFound from "./application/pages/NotFound/NotFound";
import FAQ from "./application/pages/FAQ/FAQ";
import {createRoot} from "react-dom/client";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
    <MuiThemeProvider theme={Constants.theme}>
        <Store.Provider value={store}>
            <BrowserRouter>
                <Header>
                    <Routes>
                        <Route path={Constants.routes.LANDING_PAGE}><LandingPage/></Route>
                        <Route path={Constants.routes.APPLICATION}><Application/></Route>
                        <Route path={Constants.routes.RESULTS}><Request/></Route>
                        <Route path={Constants.routes.FAQ}><FAQ/></Route>
                        <Route path={"*"}><NotFound/></Route>
                    </Routes>
                </Header>
            </BrowserRouter>
        </Store.Provider>

        <Disclaimer/>
    </MuiThemeProvider>
);