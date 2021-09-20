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

const Adornment = {
    KWH: endAdornment("kWh"),
    PERCENT: endAdornment("%"),
    DOLLAR: startAdornment("$"),
    DOLLAR_PER_KWH: endAdornment("$/kWh"),
    DOLLAR_PER_KW: endAdornment("$/kW"),
    DOLLAR_PER_MWH: endAdornment("$/MWh"),
    YEAR: endAdornment("Years"),
}

export default Adornment;
