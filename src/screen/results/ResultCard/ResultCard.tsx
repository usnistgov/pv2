import {ReactElement} from "react";

import "./ResultCard.scss";
import {Card, CardContent, Grid} from "@material-ui/core";
import {altLabels} from "../E3RequestGenerator";
import {ResponsiveLine} from "@nivo/line";

export interface ResultCardProps {
    alt: any;
    cashFlows: number[];
}

export default function ResultCard({alt, cashFlows}: ResultCardProps): ReactElement {
    function valid(field: any): boolean {
        return field !== null && field !== undefined && typeof field !== 'object';
    }

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
                        {valid(alt.totalCosts) ? alt.totalCosts : "NA"}
                    </Grid>

                    <Grid item xs={6}>
                        Net Savings
                    </Grid>
                    <Grid item xs={6}>
                        {valid(alt.netSavings) ? alt.netSavings : "NA"}
                    </Grid>

                    <Grid item xs={6}>
                        AIRR
                    </Grid>
                    <Grid item xs={6}>
                        {valid(alt.AIRR) ? alt.AIRR : "NA"}
                    </Grid>

                    <Grid item xs={6}>
                        SPP
                    </Grid>
                    <Grid item xs={6}>
                        {valid(alt.SPP) ? alt.SPP : "NA"}
                    </Grid>

                    <Grid item xs={6}>
                        Electricity Reduction
                    </Grid>
                    <Grid className={"vertical-center"} item xs={6}>
                        <div>{valid(alt.deltaQuant) ? alt.deltaQuant : "NA"}</div>
                    </Grid>
                </Grid>

                <div className={"result-graph"}>
                    <ResponsiveLine
                        animate
                        enableSlices={"x"}
                        margin={{top: 0, right: 10, bottom: 10, left: 10}}
                        data={[{
                            id: "cash flows",
                            data: cashFlows
                                .filter((value, index) => index !== 0)
                                .map((value, year) => {
                                return {
                                    x: year,
                                    y: value
                                }
                            })
                        }]}
                        xScale={{type: 'point'}}
                        yScale={{type: 'linear', min: 'auto', max: 'auto', stacked: true}}
                        />
                    {/* TODO: build relevant graphs, and include year by year cash flows

                    axisLeft={{
                            tickSize: 50,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'dollars',
                            legendOffset: 0,
                            legendPosition: 'middle'
                        }}
                        axisBottom={{
                            tickSize: 50,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'year',
                            legendOffset: 0,
                            legendPosition: 'middle'
                        }}
                    */}
                </div>
            </CardContent>
        </Card>
    )
}

