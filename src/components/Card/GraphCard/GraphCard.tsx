import Card from "../Card";
import {altLabels} from "../../Request/RequestGenerator/E3RequestGenerator";
import {ResponsiveLine} from "@nivo/line";
import React from "react";
import "./GraphCard.sass";
import {GraphOption} from "../../Results/Results";

const currencyFormatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
});
const numberFormatter = Intl.NumberFormat('en-US', {
    notation: 'compact',
});

export function GraphCard({altId, graphMax, graphData, graphOption}: any) {
    function useDollarSign() {
        switch(graphOption){
            case GraphOption.SAVINGS:
            case GraphOption.CUMULATIVE:
            case GraphOption.NET_VALUE:
                return true;
            case GraphOption.NET_ELECTRICAL_CONSUMPTION:
            case GraphOption.ELECTRICAL_REDUCTION:
                return false;
        }
    }

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
                    yFormat={useDollarSign() ? ">-$,.2f" : ">-,.2f"}
                    axisLeft={{
                        tickSize: 0,
                        tickPadding: 5,
                        legendPosition: "middle",
                        legendOffset: -30,
                        format: useDollarSign() ? currencyFormatter.format : numberFormatter.format,
                        legend: useDollarSign() ? "" : "Watt-hour"
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
