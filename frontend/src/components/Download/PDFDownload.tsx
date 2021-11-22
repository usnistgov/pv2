import React, {useCallback, useContext} from "react";
import {Button} from "@material-ui/core";
import {Icon as MdiIcon} from "@mdi/react";
import {mdiDownload} from "@mdi/js";
import html2canvas from "html2canvas";
import PdfGraph from "../PDF/components/PdfGraph";
import PdfReport from "../PDF/PdfReport";
import {pdf} from "@react-pdf/renderer";
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
    const store = useContext(Store);

    const generatePdf = useCallback(() => {
        const pdfGraph = document.getElementById("pdf-graph");

        if (pdfGraph == null)
            return;

        html2canvas(pdfGraph)
            .then(canvas => canvas.toDataURL("image/png"))
            .then(async graphSrc => {
                return pdf(<PdfReport graphSrc={graphSrc} result={result} store={store}/>).toBlob()
            })
            .then(blob => {
                const url = window.URL.createObjectURL(blob);

                const link = document.createElement("a");
                link.href = url;
                link.download = "PV2 Analysis Report.pdf";

                link.click();
            })
    }, []);

    return (
        <>
            <PdfGraph result={result}/>
            <Button variant={"contained"}
                    color={"primary"}
                    startIcon={<MdiIcon path={mdiDownload} size={1}/>}
                    onClick={generatePdf}>
                PDF
            </Button>
        </>
    );
}
