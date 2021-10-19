import Card from "../Card";
import {altLabels} from "../../Request/RequestGenerator/E3RequestGenerator";
import {ResponsiveLine} from "@nivo/line";
import React from "react";
import "./GraphCard.sass";

const graphAxisFormatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
});

export function GraphCard({altId, graphMax, graphData}: any) {
    return (
        <Card title={altLabels[altId]}>
            <div className={"result-graph"}>
                <ResponsiveLine
                    animate
                    enableArea
                    enableSlices={"x"}
                    useMesh={true}
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
        </Card>
    )
}
