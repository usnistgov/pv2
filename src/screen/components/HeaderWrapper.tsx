import {PropsWithChildren} from "react";
import Header from "./Header/Header";
import {Container} from "@material-ui/core";

interface PageWrapperProps {
}

const HeaderWrapper = (props: PropsWithChildren<PageWrapperProps>) => {
    return (
        <Container maxWidth="lg">
            <Header/>
            {props.children}
        </Container>
    );
}

export default HeaderWrapper;
