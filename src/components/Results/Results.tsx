import React, {ReactNode, useContext} from "react";

// Library imports
import {Box, Button, FormControl, Grid, MenuItem, Select} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
import {Icon as MdiIcon} from "@mdi/react";
import {mdiArrowLeft} from "@mdi/js";
import {Serie} from "@nivo/line";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";

// User Imports
import ResultCard, {ResultGraphCard} from "../ResultCard/ResultCard";
import MaterialHeader from "../MaterialHeader/MaterialHeader";
import {GraphOption} from "../Request/Request";
import {Store} from "../../application/ApplicationStore";

// Stylesheets
import "./Results.sass";
import Downloads from "../Download/Downloads";
import Config from "../../Config";

interface ResultsProps {
    result: any;
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

    if (!result) return {graphData: data, graphMax: 0};

    switch (graphOption) {
        case GraphOption.NET_VALUE:
            data = result.FlowSummary
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
            data = result.FlowSummary
                .map((cashFlowObject: any, index: number, array: any) => {
                    return {
                        id: "",
                        data: cashFlowObject.totCostDisc.map((value: number, year: number) => {
                            let saving = array[0].totCostDisc[year] - value;

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
            data = result.FlowSummary
                .map((cashFlowObject: any, index: number, array: any) => {
                    accumulator = 0;

                    return {
                        id: "",
                        data: cashFlowObject.totCostDisc.map((value: number, year: number) => {
                            let cumulativeSaving = accumulator + (array[0].totCostDisc[year] - value);
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
const Results = observer(({result}: ResultsProps) => {
    const uiStore = useContext(Store).resultUiStore;

    let graphData = getGraphData(uiStore.graphOption, result);

    function componentOrSkeleton(component: () => ReactNode) {
        if (result)
            return component();

        return Array.from({length: 3}).map((_, index) => {
            return <Grid item key={index}>
                <Skeleton className={"result-card"} height={400} variant={"rect"} animation={"wave"}/>
            </Grid>
        });
    }

    return <>
        <Box className="container">
            <div className={"result-back-button"}>
                <Button component={Link}
                        to={Config.routes.APPLICATION}
                        startIcon={<MdiIcon path={mdiArrowLeft} size={1}/>}>
                    Back
                </Button>
            </div>
            <MaterialHeader text={"Results"}/>
            <Downloads result={result}/>
            <Grid container justifyContent={"center"} spacing={2}>
                {componentOrSkeleton(() => result.MeasureSummary.map((res: any, index: number) => {
                    return <Grid item key={index}>
                        <ResultCard alt={res}/>
                    </Grid>
                }))}
            </Grid>
        </Box>
        <Box className={"container"}>
            <MaterialHeader text={"Graphs"}/>
            <div className={"graph-control"}>
                <FormControl className={"graph-control"}>
                    <Select
                        id={"graph-option-select"}
                        value={uiStore.graphOption}
                        onChange={(event) => {
                            uiStore.graphOption = event.target.value as GraphOption;
                        }}>
                        <MenuItem value={GraphOption.NET_VALUE}>Cash Flow - Net Present Value</MenuItem>
                        <MenuItem value={GraphOption.SAVINGS}>Annual Net Savings</MenuItem>
                        <MenuItem value={GraphOption.CUMULATIVE}>Cumulative Net Savings</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <Grid container justifyContent={"center"} spacing={2}>
                {componentOrSkeleton(() => result.MeasureSummary.map((res: any, index: number) => {
                    return <Grid item key={index}>
                        <ResultGraphCard
                            altId={res.altID}
                            graphData={graphData.graphData[index]}
                            graphMax={graphData.graphMax}/>
                    </Grid>
                }))}
            </Grid>
        </Box>
    </>
});

export default Results;
