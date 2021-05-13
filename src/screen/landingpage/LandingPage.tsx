import React from "react";
import './LandingPage.scss';
import {useHistory} from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import Button from "./components/Button/Button";

const LandingPage = () => {
  const history = useHistory();

  return (
    <PageWrapper>
      <div data-testid="landing-page">
        <link rel="stylesheet" type="text/css" href={"https://pages.nist.gov/nist-header-footer/css/nist-combined.css"} />
        <div className="landing-page-wrapper">
          <div className="landing-content"> 
            <h1>PV2</h1>
            <hr />
            <div>Present Value of PhotoVoltaics (PV2) is an app that allows homeowners to determine a complete cost of ownership for residential rooftop solar PV systems, helping homeowners make economically wise decisions.</div>
            <hr />
            <div>PV2 uses the E3 API developed at NIST to run an economic analysis of rooftop solar photovoltaics.</div>
            <hr/>
            <Button text={"Try it out!"} onClick={() => history.push("/application")}/>
          </div>
          <div className="landing-image">
            <img src={""} alt={"landing page"} />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default LandingPage;