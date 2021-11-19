import React, {useCallback, useContext, useState} from "react";
import {Button} from "@material-ui/core";
import {Icon as MdiIcon} from "@mdi/react";
import {mdiDownload} from "@mdi/js";
import html2canvas from "html2canvas";
import PdfGraph from "../PDF/components/PdfGraph";
import PdfReport from "../PDF/PdfReport";
import {PDFDownloadLink} from "@react-pdf/renderer";
import {Store} from "../../application/ApplicationStore";

interface PDFDownloadProps {
    result: any;
}

/**
 * Generates a PDF file and makes it available for download.
 *
 * @param result The results to generate a PDF for.
 */
export default function PDFDownload({result}: PDFDownloadProps) {
    const [graphSrc, setGraphSrc] = useState("");

    const generatePdf = useCallback(() => {
        const pdfGraph = document.getElementById("pdf-graph");

        if (pdfGraph == null)
            return;

        html2canvas(pdfGraph).then(canvas => {
            setGraphSrc(canvas.toDataURL("image/png"));
        });
    }, []);

    return (
        <>
            <PdfGraph result={result}/>
            <PDFDownloadLink document={<PdfReport graphSrc={graphSrc} result={result} store={useContext(Store)}/>}>
                <Button variant={"contained"}
                        color={"primary"}
                        startIcon={<MdiIcon path={mdiDownload} size={1}/>}
                        onClick={generatePdf}>
                    PDF
                </Button>
            </PDFDownloadLink>
        </>
    );
}
