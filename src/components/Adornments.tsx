import {InputAdornment} from "@material-ui/core";
import React from "react";

export function createAdornment(pos: "start" | "end", content: string) {
    return { [`${pos}Adornment`]: <InputAdornment position={pos}>{content}</InputAdornment>};
}

export function endAdornment(content: string) {
    return createAdornment("end", content);
}

export function startAdornment(content: string) {
    return createAdornment("start", content);
}

export const kWhAdornment = endAdornment("kWh");
export const percentAdornment = endAdornment("%");
export const dollarAdornment = startAdornment("$");
export const dollarPerKWHAdornment = endAdornment("$/kWh");
export const yearAdornment = endAdornment("Years");
