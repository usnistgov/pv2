import React, {ReactElement} from "react";

// Library imports
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import {Icon as MdiIcon} from "@mdi/react";
import {mdiArrowRight} from "@mdi/js";

// Stylesheets
import './LandingPage.sass';

/**
 * The main component for the landing page. Displays some information about the app and a photo.
 */
export default function LandingPage(): ReactElement {
    return (
        <div className="landing-page-wrapper">
            <div className="landing-content">
                <h1>PV<sup>2</sup></h1>
                <hr/>
                <div>Present Value of PhotoVoltaics (PV<sup>2</sup>) is an app that allows homeowners to determine a
                    complete
                    cost of ownership for residential rooftop solar PV systems, helping homeowners make economically
                    wise decisions.
                </div>
                <hr/>
                <div>PV<sup>2</sup> uses the E3 API developed at NIST to run an economic analysis of rooftop solar
                    photovoltaics.
                </div>
                <hr/>
                <Button component={Link}
                        to={"/application"}
                        endIcon={<MdiIcon path={mdiArrowRight} size={1}/>}
                        variant={"contained"}
                        color={"primary"}>
                    Start
                </Button>
            </div>
            <div className="landing-image">
                <img src={"/images/house.jpg"} alt={"landing page"}/>
            </div>
        </div>
    );
}
