import {PropsWithChildren, ReactElement} from "react";

// Library Imports
import {Link} from "react-router-dom";
import {Container} from "@material-ui/core";

// Stylesheets
import "./Header.sass";
import Config from "../../Config";

/**
 * Component for displaying a header with link options.
 */
export default function Header({children}: PropsWithChildren<{}>): ReactElement {
    return (
        <Container maxWidth="lg">
            <div className="header-wrapper">
                <div className="options">
                    <Link className={"menu-option"} to={Config.routes.LANDING_PAGE}>
                        Home
                    </Link>
                    <a className={"menu-option"} href={"docs/user-guide.pdf"}>
                        User Guide
                    </a>
                    <a className={"menu-option"} href={"docs/tutorial.pdf"}>
                        Tutorial
                    </a>
                </div>
                <hr/>
            </div>
            {children}
        </Container>
    );
}