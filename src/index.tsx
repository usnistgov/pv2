import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import './main.scss';
import reportWebVitals from './reportWebVitals';

import LandingPage from "./screen/LandingPage/LandingPage";
import Application from "./screen/application/Application";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path={"/application"}>
                <Application/>
            </Route>
            <Route path={"/"}>
                <LandingPage/>
            </Route>
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
