import {Component} from "react";
import {Box} from "@material-ui/core";
import MaterialHeader from "../components/MaterialHeader";

class SrecForm extends Component {
    render() {
        return (
            <Box>
                <MaterialHeader text={"SREC Payments"}/>
            </Box>
        );
    }
}

export default SrecForm;