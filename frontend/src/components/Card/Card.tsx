import "./Card.sass";
import {Card as MUICard, CardContent} from "@material-ui/core";
import React, {PropsWithChildren} from "react";

interface CardProps {
    title?: string;
}

export default function Card({title, children}: PropsWithChildren<CardProps>) {
    return (
        <MUICard>
            <CardContent className={"card card-size"}>
                {title && <div className="card-title">
                    <div>{title}</div>
                </div>}
                {children}
            </CardContent>
        </MUICard>
    );
}
