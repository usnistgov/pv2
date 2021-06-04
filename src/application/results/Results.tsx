import React, {ReactElement} from "react";

// Library imports
import {Button, Grid} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
import {CSVLink} from "react-csv";
import {Icon as MdiIcon} from "@mdi/react";
import {mdiDownload} from "@mdi/js";
import {Data} from "react-csv/components/CommonPropTypes";

// User Imports
import ResultCard from "../../components/ResultCard/ResultCard";
import MaterialHeader from "../../components/MaterialHeader/MaterialHeader";
import {useReduxGetSet} from "../../Utils";
import {GraphOption} from "./ResultData";

// Stylesheets
import "./Results.sass";

interface ResultsProps {
    result: any;

    downloadData: Data;
}

/**
 * This page requests calculations from the E3 API and displays the results. Results are shown in side-by-side
 * card form with some data and graphs. Finally the user can download a CSV file containing the E3 results. This
 * component takes not props since all necessary information for the E3 request is obtained from the redux store.
 */
export default function Results({result, downloadData}: ResultsProps): ReactElement {
    const graphOption = useReduxGetSet("graphOption", GraphOption.NET_VALUE);

    let graphMax = 0;

    const graphData = !result ? null : result[0].reqCashFlowObjects
        .map((cashFlowObject: any) => {
            return {
                id: "cash flow",
                data: cashFlowObject.totCostDisc.map((value: number, year: number) => {
                    graphMax = Math.max(graphMax, value);

                    return {
                        x: year,
                        y: value
                    }
                })
            }
        })

    graphMax = graphMax / 100 * 100;

    // Generates the maximum absolute value for the graphs so they have the same scale.
    /*const graphMax = !result ? 100 : Math.ceil(result[0]
        .reqCashFlowObjects
        .flatMap((x: any) => x.totCostDisc)
        .map(Math.abs)
        .reduce((x: number, y: number) => Math.max(x, y)) / 100) * 100;*/

    return (
        <>
            <MaterialHeader text={"Results"}/>
            <Grid container justify={"center"} spacing={2}>
                {result ? result[0].alternativeSummaryObjects.map((res: any, index: number) => {
                    return <Grid item key={index}>
                        <ResultCard
                            alt={res}
                            graphData={graphData[index]}
                            graphMax={graphMax}
                            graphOption={graphOption}/>
                    </Grid>
                }) : Array.from({length: 3}).map((_, index) => {
                        return <Grid item key={index}>
                            <Skeleton className={"result-card"} height={500} variant={"rect"} animation={"wave"}/>
                        </Grid>
                    }
                )}
            </Grid>
            <div className={"download-results"}>
                <CSVLink data={downloadData} filename={"PV2 Results.csv"}>
                    <Button variant={"contained"}
                            color={"primary"}
                            startIcon={<MdiIcon path={mdiDownload} size={1}/>}>
                        Download CSV
                    </Button>
                </CSVLink>
            </div>
        </>
    )
}

