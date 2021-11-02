import CSVDownload from "./CSVDownload";
import PDFDownload from "./PDFDownload";
import React from "react";
import "./Downloads.sass";
import {Result} from "../../typings/Result";

interface DownloadsProps {
    result: Result;
}

/**
 * Group component for result download buttons.
 *
 * @param result The results create downloads for.
 */
export default function Downloads({result}: DownloadsProps) {
    return (
        <div className={"downloads"}>
            <CSVDownload result={result}/>
            <PDFDownload result={result}/>
        </div>
    );
}