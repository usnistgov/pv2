import React, {ReactElement, useState} from "react";

// Library Imports
import {Box, Collapse} from "@material-ui/core";
import {ArrowDropDown, ArrowDropUp} from "@material-ui/icons"

//Stylesheets
import "./CollapseContainer.sass"

export interface CollapseContainerProps {
    // The label to display
    text: string
}

/*
 * A collapsable container
 */
export default function CollapseContainer(props: React.PropsWithChildren<CollapseContainerProps>): ReactElement {
    const [open, setOpen] = useState(false)

    const handleOnClick = () => {
        setOpen((prev) => !prev)
    }

    return (
        <Box className={"collapse-container"}>
            <div className="collapse-container-text" onClick={handleOnClick}>
                <div>{props.text}</div>
                {open ? <ArrowDropUp/> : <ArrowDropDown/>}
            </div>
            <Collapse in={open}>
                {props.children}
            </Collapse>
        </Box>
    );
}
