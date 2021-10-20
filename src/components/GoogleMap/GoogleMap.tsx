import {Paper} from "@material-ui/core";
import React from "react";
import config from "../../config.json";
import "./GoogleMap.sass";

interface GoogleMapProps {
    query: string;
}

export default function GoogleMap({query}: GoogleMapProps) {
    let completeQuery = `https://www.google.com/maps/embed/v1/place?key=${config.googleMapKey}&q=${query}`

    return (
        <Paper className={"map"} elevation={3}>
            <iframe title={"Google Address Map"} frameBorder="0" src={completeQuery} allowFullScreen/>
        </Paper>
    );
}
