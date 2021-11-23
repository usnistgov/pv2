import "./Card.sass";
import {Card as MUICard, CardContent} from "@material-ui/core";
import React, {PropsWithChildren} from "react";

interface CardProps {
    title?: string;
    className?: string;
}

export default function Card({title, children, className}: PropsWithChildren<CardProps>) {
    return (
        <MUICard className={className}>
            <CardContent className={"card card-size"}>
                {title && <div className="card-title">
                    <div>{title}</div>
                </div>}
                {children}
            </CardContent>
        </MUICard>
    );
}
