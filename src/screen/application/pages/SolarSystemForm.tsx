import {Component} from "react";
import {Box} from "@material-ui/core";
import MaterialHeader from "../components/MaterialHeader";

class SolarSystemForm extends Component {
    render() {
        return (
            <Box>
                <MaterialHeader text={"Solar PV System Information"}/>
                <MaterialHeader text={"Power Production Agreement (PPA) Details"}/>
            </Box>
        );
    }
}

export default SolarSystemForm;