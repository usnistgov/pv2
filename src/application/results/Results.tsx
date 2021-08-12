import React, {useContext} from "react";

// Library imports
import {Button, Grid} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
import {CSVLink} from "react-csv";
import {Icon as MdiIcon} from "@mdi/react";
import {mdiDownload} from "@mdi/js";
import {Data} from "react-csv/components/CommonPropTypes";
import {Serie} from "@nivo/line";

// User Imports
import ResultCard from "../../components/ResultCard/ResultCard";
import MaterialHeader from "../../components/MaterialHeader/MaterialHeader";
import {GraphOption} from "./ResultData";

// Stylesheets
import "./Results.sass";
import {observer} from "mobx-react-lite";
import {Store} from "../ApplicationStore";

interface ResultsProps {
    result: any;

    downloadData: Data;
}

interface GraphData {
    graphData: Serie,
    graphMax: number
}

/**
 * Generates graph data for the given graph options and result object.
 *
 * @param graphOption
 * @param result
 */
function getGraphData(graphOption: GraphOption, result: any): GraphData {
    let graphMax = 0;
    let data: Serie = {id: "", data: []};

    if(!result) return {graphData: data, graphMax: 0};

    switch (graphOption) {
        case GraphOption.NET_VALUE:
            data = result[0].reqCashFlowObjects
                .map((cashFlowObject: any) => {
                    return {
                        id: "",
                        data: cashFlowObject.totCostDisc.map((value: number, year: number) => {
                            graphMax = Math.max(graphMax, Math.abs(value));

                            return {
                                x: year,
                                y: value
                            }
                        })
                    }
                });

            return {graphData: data, graphMax: graphMax};
        case GraphOption.SAVINGS:
            data = result[0].reqCashFlowObjects
                .map((cashFlowObject: any, index: number, array: any) => {
                    return {
                        id: "",
                        data: cashFlowObject.totCostDisc.map((value: number, year: number) => {
                            let saving = value - array[0].totCostDisc[year];

                            graphMax = Math.max(graphMax, Math.abs(saving));

                            return {
                                x: year,
                                y: saving
                            }
                        })
                    }
                });

            return {graphData: data, graphMax: graphMax};
        case GraphOption.CUMULATIVE:
            let accumulator = 0;
            data = result[0].reqCashFlowObjects
                .map((cashFlowObject: any, index: number, array: any) => {
                    return {
                        id: "",
                        data: cashFlowObject.totCostDisc.map((value: number, year: number) => {
                            let cumulativeSaving = accumulator + (value -  array[0].totCostDisc[year]);
                            accumulator = cumulativeSaving;

                            graphMax = Math.max(graphMax, Math.abs(cumulativeSaving));

                            return {
                                x: year,
                                y: cumulativeSaving
                            }
                        })
                    }
                });

            return {graphData: data, graphMax: graphMax};
    }
}

/**
 * This page requests calculations from the E3 API and displays the results. Results are shown in side-by-side
 * card form with some data and graphs. Finally the user can download a CSV file containing the E3 results. This
 * component takes not props since all necessary information for the E3 request is obtained from the redux store.
 */
const Results = observer(({result, downloadData}: ResultsProps) => {
    const uiStore = useContext(Store).resultUiStore;

    let graphData =  getGraphData(uiStore.graphOption, result);

    return (
        <>
            <MaterialHeader text={"Results"}/>
            <Grid container justify={"center"} spacing={2}>
                {result ? result[0].alternativeSummaryObjects.map((res: any, index: number) => {
                    return <Grid item key={index}>
                        <ResultCard
                            alt={res}
                            graphData={graphData.graphData[index]}
                            graphMax={graphData.graphMax}/>
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
});

export default Results;
