import {Paper} from "@material-ui/core";
import React from "react";
import "./GoogleMap.sass";

interface GoogleMapProps {
    query: string;
}

export default function GoogleMap({query}: GoogleMapProps) {
    let completeQuery =
        `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAP_KEY}&q=${query}`;

    return (
        <Paper className={"map"} elevation={3}>
            <iframe title={"Google Address Map"} frameBorder="0" src={completeQuery} allowFullScreen/>
        </Paper>
    );
}
