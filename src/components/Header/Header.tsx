import {ReactElement} from "react";

// Library Imports
import {Link} from "react-router-dom";

// Stylesheets
import "./Header.sass";

/**
 * Component for displaying a header with link options.
 */
export default function Header(): ReactElement {
    return (
        <div className="header-wrapper">
            <div className="options">
                <Link className={"menu-option"} to={"/"}>
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
    );
}