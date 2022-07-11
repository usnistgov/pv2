import Card from "../Card";
import {altLabels} from "../../Request/RequestGenerator/E3RequestGenerator";
import {ResponsiveLine, Serie} from "@nivo/line";
import React, {useContext, useEffect, useState} from "react";
import "./GraphCard.sass";
import {GraphOption} from "../../../Strings";
import {Store} from "../../../application/ApplicationStore";
import {observer} from "mobx-react-lite";
import {getGraphData} from "../../../GetGraphData";
import {runInAction} from "mobx";
import {compactCurrencyFormatter, compactNumberFormatter} from "../../../Format";
import {Box, Paper} from "@material-ui/core";

const GraphCard = observer(({altId, result}: any) => {
    const store = useContext(Store).resultUiStore;
    const [graphData, setGraphData] = useState<Serie>({id: "", data: []});

    useEffect(() => {
        runInAction(() => getGraphData(store.graphOption, altId, result, store).then(setGraphData));
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
                        format: useDollarSign() ? compactCurrencyFormatter.format : compactNumberFormatter.format,
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
                    sliceTooltip={({slice}) => <Paper className={"graph-tooltip"}>{slice.points[0].data.yFormatted}</Paper>}
                />
            </div>
        </Card>
    )
});

export default GraphCard;
