import React from "react";
import './LandingPage.scss'
import {useHistory} from "react-router-dom";
import Button from "../../components/Button/Button";

const LandingPage = () => {
  const history = useHistory();

  return (
    <div className="landing-page-wrapper">
      <div className="landing-content"> 
        <h1>PV2</h1>
        <hr />
        <div>Helping homeowners make economically wise decisions on residential solar PV systems.</div>
        <hr />
        <div>PV2 uses the E3 API developed at NIST to run an economic analysis of rooftop solar photovoltaics.</div>
        <hr/>
        <Button text={"Try it out!"} onClick={() => history.push("/application")}/>
      </div>
      <div className="landing-image">
        {/* todo: figure out what to show for the image */}
      </div>
    </div>
  );
}

export default LandingPage;