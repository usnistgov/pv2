import {PropsWithChildren, ReactElement} from "react";

// Library Imports
import {Link} from "react-router-dom";
import {Container} from "@material-ui/core";

// Stylesheets
import "./Header.sass";
import Constants from "../../Constants";

/**
 * Component for displaying a header with link options.
 */
export default function Header({children}: PropsWithChildren<{}>): ReactElement {
    return (
        <Container maxWidth="lg">
            <div className="header-wrapper">
                <div className="options">
                    <Link className={"menu-option"} to={Constants.routes.LANDING_PAGE}>
                        Home
                    </Link>
                    <a className={"menu-option"} href={"docs/user-guide.pdf"}>
                        User Guide
                    </a>
                    <a className={"menu-option"} href={"docs/PV2 Example.pdf"}>
                        Example Quote & Electric Bill
                    </a>
                </div>
                <hr/>
            </div>
            {children}
        </Container>
    );
}