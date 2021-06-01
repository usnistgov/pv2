import {PropsWithChildren} from "react";
import Header from "./Header/Header";

interface PageWrapperProps {
}

const HeaderWrapper = (props: PropsWithChildren<PageWrapperProps>) => {
    return (
        <>
            <Header/>
            {props.children}
        </>
    );
}

export default HeaderWrapper;
