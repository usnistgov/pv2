import React, {ReactElement, useContext, useEffect} from "react";

// Library imports
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import {Icon as MdiIcon} from "@mdi/react";
import {mdiArrowRight, mdiArrowUp} from "@mdi/js";
import {Store} from "../ApplicationStore";

// Stylesheets
import './LandingPage.sass';

/**
 * The main component for the landing page. Displays some information about the app and a photo.
 */
export default function LandingPage(): ReactElement {
    const store = useContext(Store);
    useEffect(() => store.reset());
    return (
        <>
            <div className={"landing-page-title"} id={"title"}>
                <h1>Present Value of PhotoVoltaics – [PV]<sup>2</sup></h1>
            </div>
            <div className={"start-button"}>
                <Button
                    component={Link}
                    to={"/application"}
                    endIcon={<MdiIcon path={mdiArrowRight} size={1}/>}
                    variant={"contained"}
                    color={"primary"}
                    size={"large"}>
                    Start
                </Button>
            </div>
            <div className="landing-page-section">
                <div className="landing-content">
                    <hr/>
                    <div>
                        [PV]<sup>2</sup> is a web application that allows homeowners to determine a complete cost of
                        ownership for residential rooftop solar photovoltaic (PV) systems including purchase and
                        operation
                        through the system’s service life. The goal of [PV]<sup>2</sup> is to assist homeowners in
                        making
                        economical decisions related to solar PV. The current version is focused on allowing a homeowner
                        to evaluate the cost-effectiveness of a specific solar PV system from a proposed contact from a
                        solar installer. The homeowner will need information from the solar installer contract and their
                        electricity bill.
                    </div>
                    <hr/>
                </div>
                <div className="landing-image">
                    <img src={"/images/PV2 Logo.png"} alt={"PV2 logo"}/>
                </div>
            </div>
            <div className="landing-page-section">
                <div className="landing-image">
                    <img src={"/images/E3 Logo.png"} alt={"E3 logo"}/>
                </div>
                <div className="landing-content">
                    <hr/>
                    <div>
                        [PV]<sup>2</sup> uses the Economic Evaluation Engine (E3) API developed under the&nbsp;
                        <a href={"https://www.nist.gov/programs-projects/metrics-and-tools-sustainable-buildings"}>
                            Metrics and Tools for Sustainable Buildings Project
                        </a>
                        &nbsp;in the&nbsp;
                        <a href={"https://www.nist.gov/programs-projects/net-zero-energy-high-performance-buildings-program"}>
                            Net Zero Energy High Performance Building Program
                        </a>
                        &nbsp;overseen by the&nbsp;
                        <a href={"https://www.nist.gov/el/applied-economics-office"}>
                            Applied Economics Office (AEO)
                        </a>
                        &nbsp;in the&nbsp;
                        <a href={"https://www.nist.gov/el"}>
                            Engineering Laboratory (EL)
                        </a>
                        &nbsp;at the&nbsp;
                        <a href={"https://www.nist.gov/"}>
                            National Institute of Standards and Technology (NIST)
                        </a>
                        . E3 provides ASTM standards-based economic evaluation across a range of analysis types,
                        including
                        life cycle cost analysis (LCCA) and benefit-cost analysis (BCA).
                    </div>
                    <hr/>
                </div>
            </div>
            <div className="landing-page-section">
                <div className="landing-content">
                    <hr/>
                    <div>
                        For additional information on either [PV]<sup>2</sup> or E3, please contact&nbsp;
                        <a href={"https://www.nist.gov/people/joshua-d-kneifel"}>
                            Joshua Kneifel
                        </a>
                        &nbsp;at&nbsp;
                        <a href={"mailto:Joshua.Kneifel@nist.gov"}>
                            Joshua.Kneifel@nist.gov
                        </a>
                        .
                    </div>
                    <hr/>
                </div>
                <div className="landing-image" style={{"height": "500px"}}>
                    <img src={"/images/example.png"} alt={"example result"}/>
                </div>
            </div>
            <div className={"start-button"}>
                <Button
                    onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                    endIcon={<MdiIcon path={mdiArrowUp} size={1}/>}
                    variant={"contained"}
                    size={"large"}>
                    Top
                </Button>
            </div>
        </>
    );
}
