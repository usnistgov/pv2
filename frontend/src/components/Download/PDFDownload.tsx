import PdfReport from "../PDF/PdfReport";
import React, {useContext} from "react";
import {Store} from "../../application/ApplicationStore";
import {Button} from "@material-ui/core";
import {Icon as MdiIcon} from "@mdi/react";
import {mdiDownload} from "@mdi/js";
import {PDFDownloadLink} from "@react-pdf/renderer";

interface PDFDownloadProps {
    result: any;
}

/**
 * Generates a PDF file and makes it available for download.
 *
 * @param result The results to generate a PDF for.
 */
export default function PDFDownload({result}: PDFDownloadProps) {
    return (
        <PDFDownloadLink document={
            <PdfReport result={result} store={useContext(Store)}/>} fileName={"PV2 Report"
        }>
            <Button variant={"contained"}
                    color={"primary"}
                    startIcon={<MdiIcon path={mdiDownload} size={1}/>}>
                PDF
            </Button>
        </PDFDownloadLink>
    );
}
