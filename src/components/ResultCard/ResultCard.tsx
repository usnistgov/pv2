import React, {ReactElement} from "react";

// Library Imports
import {Card, CardContent, FormControl, Grid, MenuItem, Select, Tooltip} from "@material-ui/core";
import {ResponsiveLine, Serie} from "@nivo/line";
import {Icon as MdiIcon} from "@mdi/react";
import {mdiInformation} from "@mdi/js";

// User Imports
import {altLabels} from "../../application/results/E3RequestGenerator";
import {GraphOption, valid} from "../../application/results/ResultData";
import {ReduxGetSet} from "../../Utils";

// Stylesheets
import "./ResultCard.sass";

const currencyFormatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
const numberFormatter = Intl.NumberFormat('en-US', {});
const graphAxisFormatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
})

export interface ResultCardProps {
    // The alternative objects
    alt: any;

    // The maximum absolute number to display on graph scale
    graphMax: number;

    // Current graph option getset
    graphOption: ReduxGetSet<GraphOption>;

    // Data to display in the graph
    graphData: Serie;
}

/**
 * Creates a card that displays the given E3 results.
 */
export default function ResultCard({alt, graphMax, graphOption, graphData}: ResultCardProps): ReactElement {
    return (
        <Card>
            <CardContent className={"result-card"}>
                <div className="result-title">
                    <div>{altLabels[alt.altID]}</div>
                </div>

                <Grid className={"result-table"} container spacing={2}>
                    <Grid item xs={5}>
                        <Tooltip title={"Total Net Present Value Costs"}>
                            <div>Total Cost</div>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={5}>
                        <div>{valid(alt.totalCosts) ? currencyFormatter.format(alt.totalCosts) : "NA"}</div>
                    </Grid>
                    <Grid item xs={1}>
                        <Tooltip title={"Total Net Present Value Costs"} >
                            <MdiIcon className={"icon"} path={mdiInformation} size={1} color={'#898989'}/>
                        </Tooltip>
                    </Grid>

                    <Grid item xs={5}>
                        <Tooltip title={"Net Present Value Savings relative to No Solar System"}>
                            <div>Net Savings</div>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={5}>
                        <div>{valid(alt.netSavings) ? currencyFormatter.format(alt.netSavings) : "NA"}</div>
                    </Grid>
                    <Grid item xs={1}>
                        <Tooltip title={"Net Present Value Savings relative to No Solar System"} >
                            <MdiIcon className={"icon"} path={mdiInformation} size={1} color={'#898989'}/>
                        </Tooltip>
                    </Grid>

                    <Grid item xs={5}>
                        <Tooltip title={"Adjusted Internal Rate of Return (AIRR) on Investment"}>
                            <div>AIRR</div>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={5}>
                        <div>{valid(alt.AIRR) ? alt.AIRR : "NA"}</div>
                    </Grid>
                    <Grid item xs={1}>
                        <Tooltip title={
                            "Adjusted Internal Rate of Return (AIRR) on Investment. This is a measure of return on " +
                            "investment that accounts for reinvestment of the annual savings"
                        } >
                            <MdiIcon className={"icon"} path={mdiInformation} size={1} color={'#898989'}/>
                        </Tooltip>
                    </Grid>

                    <Grid item xs={5}>
                        <Tooltip title={"Simple Payback Period (SPP)"}>
                            <div>SPP</div>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={5}>
                        <div>{valid(alt.SPP) ? alt.SPP : "NA"}</div>
                    </Grid>
                    <Grid item xs={1}>
                        <Tooltip title={
                            "Simple Payback Period (SPP) is the number of years it takes for cost savings to offset " +
                            "the initial investment costs"
                        } >
                            <MdiIcon className={"icon"} path={mdiInformation} size={1} color={'#898989'}/>
                        </Tooltip>
                    </Grid>

                    <Grid item xs={5}>
                        <Tooltip title={"Electricity reduction relative to No Solar System (kWh)"}>
                            <div>Electricity Reduction</div>
                        </Tooltip>
                    </Grid>
                    <Grid className={"vertical-center"} item xs={5}>
                        <div>{valid(alt.deltaQuant[0]) ? numberFormatter.format(-alt.deltaQuant[0]) : "NA"}</div>
                    </Grid>
                    <Grid item xs={1}>
                        <Tooltip title={"Electricity reduction relative to No Solar System"} >
                            <MdiIcon className={"icon"} path={mdiInformation} size={1} color={'#898989'}/>
                        </Tooltip>
                    </Grid>
                </Grid>

                <div className={"result-graph"}>
                    <div className={"result-graph-title"}>
                        <FormControl className={"result-graph-title"}>
                            <Select
                                id={"graph-option-select"}
                                value={graphOption.get()}
                                onChange={(event) => {
                                    graphOption.set(event.target.value as GraphOption);
                                }}>
                                <MenuItem value={GraphOption.NET_VALUE}>Cash Flow - Net Present Value</MenuItem>
                                <MenuItem value={GraphOption.SAVINGS}>Savings</MenuItem>
                                <MenuItem value={GraphOption.CUMULATIVE}>Cumulative Savings</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <ResponsiveLine
                        animate
                        enableArea
                        enableSlices={"x"}
                        margin={{top: 5, right: 5, bottom: 20, left: 35}}
                        data={[graphData]}
                        xScale={{type: 'linear'}}
                        yScale={{type: 'linear', min: -graphMax, max: graphMax, stacked: true}}
                        yFormat={">-$,.2f"}
                        axisLeft={{
                            tickSize: 0,
                            tickPadding: 5,
                            format: graphAxisFormatter.format,
                        }}
                        axisBottom={{
                            tickSize: 0,
                            tickPadding: 5,
                            tickValues: 10,
                            legend: 'year',
                            legendOffset: -5,
                            legendPosition: 'middle',
                        }}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

