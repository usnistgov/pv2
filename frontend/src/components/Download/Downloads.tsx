import CSVDownload from "./CSVDownload";
import PDFDownload from "./PDFDownload";
import React from "react";
import "./Downloads.sass";
import {Output} from "e3-sdk";

interface DownloadsProps {
    result: Output;
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