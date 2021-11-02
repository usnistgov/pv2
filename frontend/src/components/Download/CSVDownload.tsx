import {Button} from "@material-ui/core";
import {Icon as MdiIcon} from "@mdi/react";
import {mdiDownload} from "@mdi/js";
import {CSVLink} from "react-csv";
import React, {useContext} from "react";
import {valid} from "../Request/Request";
import {observer} from "mobx-react-lite";
import {validOrNA} from "../../Utils";
import {Store} from "../../application/ApplicationStore";
import {STUDY_PERIOD} from "../../Defaults";
import {Result} from "../../typings/Result";

/**
 * Generates CSV data for the given results and study period.
 *
 * @param results The JSON results obtained from E3.
 * @param studyPeriod The study period defined in the redux store.
 */
function generateCsv(results: Result, studyPeriod: number): any {
    const altObjects = results.MeasureSummary;
    const cashFlowObjects = results.FlowSummary;

    const totalCosts = altObjects.map((x) => x.totalCosts).map(validOrNA);
    const netSavings = altObjects.map((x) => x.netSavings).map(validOrNA);
    const airr = altObjects.map((x) => x.AIRR).map(validOrNA);
    const spp = altObjects.map((x) => x.SPP).map((value: string | number | undefined) => {
        return valid(value) && value !== "Infinity" ? value : "NA"
    });
    const electricityReduction = altObjects.map((x) => -(x?.deltaQuant?.["Electricity"] ?? 0)).map(validOrNA);
    const data = Array.from(Array(studyPeriod + 1).keys())
        .map((index) => [index, ...cashFlowObjects.map((flow) => flow.totCostDisc[index])]);

    return [
        ["Results Summary"],
        ["Summary Results", "No Solar System", "Purchase Solar System", "PPA Solar System"],
        ["Total Costs", ...totalCosts],
        ["Net Savings", ...netSavings],
        ["AIRR", ...airr],
        ["SPP", ...spp],
        ["Electricity Reduction", ...electricityReduction],
        [],
        ["Cash Flow (NPV)"],
        ["Year", "No Solar System", "Purchase Solar System", "PPA Solar System"],
        ...data
    ];
}

interface CSVDownloadProps {
    result: Result;
}

/**
 * Generates a CSV file for the specified results and makes it available for download.
 *
 * @param results The results to generate a CSV file for.
 */
const CSVDownload = observer(({result}: CSVDownloadProps) => {
    const store = useContext(Store).analysisAssumptionsFormStore;

    return (
        <CSVLink data={generateCsv(result, store.studyPeriod ?? STUDY_PERIOD)}
                 filename={"PV2 Results.csv"}>
            <Button variant={"contained"}
                    color={"primary"}
                    startIcon={<MdiIcon path={mdiDownload} size={1}/>}>
                CSV
            </Button>
        </CSVLink>
    );
});

export default CSVDownload;
