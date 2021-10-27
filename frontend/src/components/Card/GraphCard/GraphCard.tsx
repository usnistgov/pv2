import Card from "../Card";
import {altLabels} from "../../Request/RequestGenerator/E3RequestGenerator";
import {ResponsiveLine, Serie} from "@nivo/line";
import React, {useContext, useEffect, useState} from "react";
import "./GraphCard.sass";
import {GraphOption} from "../../../Strings";
import {ResultUiStore, Store} from "../../../application/ApplicationStore";
import {observer} from "mobx-react-lite";

const currencyFormatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
});
const numberFormatter = Intl.NumberFormat('en-US', {
    notation: 'compact',
});

/**
 * Generates graph data for the given graph options and result object.
 *
 * @param graphOption
 * @param index
 * @param result
 * @param store
 */
async function getGraphData(graphOption: GraphOption, index: number, result: any, store: ResultUiStore): Promise<Serie> {
    let initial: any = null;
    let accumulator: number = 0;
    let data: Serie = {id: "", data: []};

    if (!result) return data;

    switch (graphOption) {
        case GraphOption.NET_VALUE:
            return {
                id: "",
                data: result.FlowSummary[index].totCostDisc.map((value: number, year: number) => {
                    store.graphMax = value;

                    return {x: year, y: value};
                })
            };
        case GraphOption.SAVINGS:
            initial = result.FlowSummary[0];

            return {
                id: "",
                data: result.FlowSummary[index].totCostDisc.map((value: number, year: number) => {
                    let saving = initial.totCostDisc[year] - value;

                    store.graphMax = saving;

                    return {x: year, y: saving};
                })
            };
        case GraphOption.CUMULATIVE:
            initial = result.FlowSummary[0];
            accumulator = 0;

            return {
                id: "",
                data: result.FlowSummary[index].totCostDisc.map((value: number, year: number) => {
                    let cumulativeSaving = accumulator + (initial.totCostDisc[year] - value);
                    accumulator = cumulativeSaving;

                    store.graphMax = cumulativeSaving;

                    return {x: year, y: cumulativeSaving};
                })
            };
        case GraphOption.NET_ELECTRICAL_CONSUMPTION:
            return {
                id: "",
                data: result.OptionalSummary
                    .filter((value: any) => value.tag === "Electricity" && value.altID == index)[0]
                    .totTagQ
                    .map((value: number, year: number) => {
                        store.graphMax = value;

                        return {x: year, y: value};
                    })
            };
        case GraphOption.ELECTRICAL_REDUCTION:
            initial = result.OptionalSummary.filter((value: any) => value.tag === "Electricity" && value.altID == 0)[0];
            accumulator = 0;

            return {
                id: "",
                data: result.OptionalSummary
                    .filter((value: any) => value.tag === "Electricity" && value.altID == index)[0]
                    .totTagQ
                    .map((value: number, year: number) => {
                        let cumulativeReduction = accumulator + (initial.totTagQ[year] - value);
                        accumulator = cumulativeReduction;

                        store.graphMax = cumulativeReduction;

                        return {x: year, y: cumulativeReduction};
                    })
            };
    }
}

const GraphCard = observer(({altId, result}: any) => {
    const store = useContext(Store).resultUiStore;
    const [graphData, setGraphData] = useState<Serie>({id: "", data: []});

    useEffect(() => {
        console.log("RECALCULATING GRAPH!!!!!!")

        getGraphData(store.graphOption, altId, result, store).then(setGraphData);
    }, [store.graphOption, result]);

    function useDollarSign() {
        switch (store.graphOption) {
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
                    margin={{top: 5, right: 5, bottom: 35, left: 40}}
                    data={[graphData]}
                    xScale={{type: 'linear'}}
                    yScale={{type: 'linear', min: -store.graphMax, max: store.graphMax, stacked: true}}
                    yFormat={useDollarSign() ? ">-$,.2f" : ">-,.2f"}
                    axisLeft={{
                        tickSize: 0,
                        tickPadding: 5,
                        legendPosition: "middle",
                        legendOffset: -35,
                        format: useDollarSign() ? currencyFormatter.format : numberFormatter.format,
                        legend: useDollarSign() ? "" : "kWh"
                    }}
                    axisBottom={{
                        tickSize: 0,
                        tickPadding: 5,
                        tickValues: 10,
                        legend: 'year',
                        legendOffset: 25,
                        legendPosition: 'middle',
                    }}
                />
            </div>
        </Card>
    )
});

export default GraphCard;
