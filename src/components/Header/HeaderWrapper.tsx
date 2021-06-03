import {PropsWithChildren, ReactElement} from "react";

// Library Imports
import {Container} from "@material-ui/core";

// User Imports
import Header from "./Header";

/**
 * Component for wrapping the main page content with the header component.
 */
export default function  HeaderWrapper(props: PropsWithChildren<{}>): ReactElement {
    return (
        <Container maxWidth="lg">
            <Header/>
            {props.children}
        </Container>
    );
}
