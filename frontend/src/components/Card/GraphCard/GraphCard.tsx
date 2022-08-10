import {ResponsiveLine, Serie} from "@nivo/line";
import React, {useContext, useEffect, useState} from "react";
import "./GraphCard.sass";
import {GraphOption} from "../../../Strings";
import {Store} from "../../../application/ApplicationStore";
import {observer} from "mobx-react-lite";
import {getGraphData} from "../../../GetGraphData";
import {runInAction} from "mobx";
import {compactCurrencyFormatter, compactNumberFormatter} from "../../../Format";
import {Paper} from "@material-ui/core";
import {altLabels} from "../../Request/RequestGenerator/E3RequestGenerator";

const GraphCard = observer(({result, option}: any) => {
    const store = useContext(Store).resultUiStore;
    const [graphData, setGraphData] = useState<Serie[]>([{id: "", data: []}]);

    useEffect(() => {
        runInAction(() => getGraphData(option, result, store).then(setGraphData));
    }, [option, result]);

    function useDollarSign() {
        switch (option) {
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
        <Paper className={"graph-card"}>
            <div className={"graph-card-title"}>
                <div>{option.toString()}</div>
            </div>
            <div className={"result-graph"}>
                <ResponsiveLine
                    animate
                    enableArea
                    useMesh={true}
                    margin={{top: 30, right: 5, bottom: 35, left: 40}}
                    data={graphData}
                    xScale={{type: 'linear'}}
                    yScale={{type: 'linear', min: "auto", max: "auto"}}
                    yFormat={useDollarSign() ? ">-$,.2f" : ">-,.2f"}
                    legends={[{
                        anchor: "top",
                        direction: "row",
                        itemWidth: 150,
                        itemHeight: 24,
                        translateY: -30,
                        symbolShape: "circle",
                        symbolSize: 12
                    }]}
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
                    tooltip={({point}) => <Paper className={"graph-tooltip"}>
                        <div className={"label"}>
                            <div className={"dot"} style={{background: point.color}}></div>
                            {point.serieId}
                        </div>
                        <div>{`Year ${point.data.xFormatted}: ${point.data.yFormatted}`}</div>
                    </Paper>}
                />
            </div>
        </Paper>
    )
});

export default GraphCard;
