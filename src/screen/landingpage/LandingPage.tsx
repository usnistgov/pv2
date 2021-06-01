import React from "react";
import './LandingPage.scss';
import {useHistory} from "react-router-dom";
import Button from "./components/Button/Button";

const LandingPage = () => {
    const history = useHistory();

    return (
        <div className="landing-page-wrapper">
            <div className="landing-content">
                <h1>PV<sup>2</sup></h1>
                <hr/>
                <div>Present Value of PhotoVoltaics (PV<sup>2</sup>) is an app that allows homeowners to determine a complete
                    cost of ownership for residential rooftop solar PV systems, helping homeowners make economically
                    wise decisions.
                </div>
                <hr/>
                <div>PV<sup>2</sup> uses the E3 API developed at NIST to run an economic analysis of rooftop solar
                    photovoltaics.
                </div>
                <hr/>
                <Button text={"Try it out!"} onClick={() => history.push("/application")}/>
            </div>
            <div className="landing-image">
                <img src={"/placeholder.jpeg"} alt={"landing page"}/>
            </div>
        </div>
    );
}

export default LandingPage;