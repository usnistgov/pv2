import React from "react";
import './LandingPage.scss'
import {useHistory} from "react-router-dom";
import Button from "../../components/Button/Button";
import LandingImage from '../../assets/images/landing-image.png';
import Header from "../../components/Header/Header";

const LandingPage = () => {
  const history = useHistory();

  return (
    <>
      <Header />
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
          <img src={LandingImage} alt={"landing page"} />
        </div>
      </div>
    </>
  );
}

export default LandingPage;