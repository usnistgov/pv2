import {Link} from "react-router-dom";
import "./Header.sass";

const Header = () => {
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

export default Header;