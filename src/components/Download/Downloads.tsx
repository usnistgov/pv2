import CSVDownload from "./CSVDownload";
import PDFDownload from "./PDFDownload";
import React from "react";
import "./Downloads.sass";

interface DownloadsProps {
    result: any;
}

/**
 * Group component for result download buttons.
 *
 * @param result The results create downloads for.
 */
export default function Downloads({result}: DownloadsProps) {
    return (
        <div className={"download-results"}>
            <CSVDownload result={result}/>
            <PDFDownload result={result}/>
        </div>
    );
}