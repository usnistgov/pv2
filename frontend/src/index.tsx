import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ThemeProvider} from "@material-ui/core";
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

function App() {
    return <Routes>
        <Route element={<Header/>}>
            <Route index element={<LandingPage/>}/>
            <Route path={Constants.routes.RESULTS} element={<Request/>}/>
            <Route path={Constants.routes.APPLICATION} element={<Application/>}/>
            <Route path={Constants.routes.FAQ} element={<FAQ/>}/>
            <Route path={"*"} element={<NotFound/>}/>
        </Route>
    </Routes>
}

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <ThemeProvider theme={Constants.theme}>
            <Store.Provider value={store}>
                <App/>
            </Store.Provider>

            <Disclaimer/>
        </ThemeProvider>
    </BrowserRouter>
);