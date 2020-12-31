import React from "react";
import {Link} from "react-router-dom";

class LandingPage extends React.Component {
    render(): React.ReactNode {
        return (
            <div>
                <h1>Landing Page</h1>
                <Link to={"/application"}>Application</Link>
            </div>
        );
    }
}

export default LandingPage;