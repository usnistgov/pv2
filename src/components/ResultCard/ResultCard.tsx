import React, {ReactElement} from "react";

// Library Imports
import {Card, CardContent, Grid} from "@material-ui/core";
import {ResponsiveLine} from "@nivo/line";

// User Imports
import {altLabels} from "../../application/results/E3RequestGenerator";
import {valid} from "../../application/results/Results";

// Stylesheets
import "./ResultCard.sass";

const currencyFormatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
const numberFormatter = Intl.NumberFormat('en-US', {});

export interface ResultCardProps {
    // The alternative objects
    alt: any;

    // The cashflow array
    cashFlows: number[];

    // The maximum absolute number to display on graph scale
    graphMax: number;
}

/**
 * Creates a card that displays the given E3 results.
 */
export default function ResultCard({alt, cashFlows, graphMax}: ResultCardProps): ReactElement {
    return (
        <Card>
            <CardContent className={"result-card"}>
                <div className="result-title">
                    <div>{altLabels[alt.altID]}</div>
                </div>

                <Grid className={"result-table"} container spacing={2}>
                    <Grid item xs={6}>
                        Total Cost
                    </Grid>
                    <Grid item xs={6}>
                        <div>{valid(alt.totalCosts) ? currencyFormatter.format(alt.totalCosts) : "NA"}</div>
                    </Grid>

                    <Grid item xs={6}>
                        Net Savings
                    </Grid>
                    <Grid item xs={6}>
                        <div>{valid(alt.netSavings) ? currencyFormatter.format(alt.netSavings) : "NA"}</div>
                    </Grid>

                    <Grid item xs={6}>
                        AIRR
                    </Grid>
                    <Grid item xs={6}>
                        <div>{valid(alt.AIRR) ? alt.AIRR : "NA"}</div>
                    </Grid>

                    <Grid item xs={6}>
                        SPP
                    </Grid>
                    <Grid item xs={6}>
                        <div>{valid(alt.SPP) ? alt.SPP : "NA"}</div>
                    </Grid>

                    <Grid item xs={6}>
                        Electricity Reduction
                    </Grid>
                    <Grid className={"vertical-center"} item xs={6}>
                        <div>{valid(alt.deltaQuant[0]) ? numberFormatter.format(-alt.deltaQuant[0]) : "NA"}</div>
                    </Grid>
                </Grid>

                <div className={"result-graph"}>
                    <div className={"result-graph-title"}>
                        Cash Flow - Net Present Value
                    </div>
                    <ResponsiveLine
                        animate
                        enableArea
                        enableSlices={"x"}
                        margin={{top: 5, right: 5, bottom: 20, left: 35}}
                        data={[{
                            id: "cash flow",
                            data: cashFlows
                                .filter((value, index) => index !== 0)
                                .map((value, year) => {
                                    return {
                                        x: year,
                                        y: value
                                    }
                                })
                        }]}
                        xScale={{type: 'linear'}}
                        yScale={{type: 'linear', min: -graphMax, max: graphMax, stacked: true}}
                        yFormat={">-$,.2f"}
                        axisLeft={{
                            tickSize: 0,
                            tickPadding: 5,
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

