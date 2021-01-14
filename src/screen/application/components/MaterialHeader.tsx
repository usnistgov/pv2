import {Component} from "react";
import {Box} from "@material-ui/core";
import "./MaterialHeader.css"

interface Props {
    text: string;
}

class MaterialHeader extends Component<Props, never> {
    render() {
        return (
            <Box className={"material-header"}>
                <h1>{this.props.text}</h1>
            </Box>
        );
    }
}

export default MaterialHeader;