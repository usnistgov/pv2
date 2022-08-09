import {ReactElement} from "react";

// Library Imports
import {Link, Outlet} from "react-router-dom";
import {Container} from "@material-ui/core";

// Stylesheets
import "./Header.sass";
import Constants from "../../Constants";

/**
 * Component for displaying a header with link options.
 */
export default function Header(): ReactElement {
    return (
        <Container maxWidth="lg">
            <div className="header-wrapper">
                <div className="options">
                    <Link className={"menu-option"} to={Constants.routes.LANDING_PAGE}>
                        Home
                    </Link>
                    <a className={"menu-option"} href={"docs/user-guide.pdf"} target={"_blank"}>
                        User Guide
                    </a>
                    <a className={"menu-option"} href={"docs/PV2 Example.pdf"} target={"_blank"}>
                        Example Quote & Electric Bill
                    </a>
                    <Link className={"menu-option"} to={Constants.routes.FAQ} target={"_blank"}>
                        FAQ
                    </Link>
                </div>
                <hr/>
            </div>
            <Outlet/>
        </Container>
    );
}