import {ResponsiveLine, Serie} from "@nivo/line";
import React, {useContext, useEffect, useState} from "react";
import {Store} from "../../../application/ApplicationStore";
import {getGraphData} from "../../../GetGraphData";
import {GraphOption} from "../../../Strings";
import {compactCurrencyFormatter} from "../../../Format";
import {Output} from "e3-sdk";

interface PdfGraphProps {
    result: Output;
}

const PdfGraph = ({result}: PdfGraphProps) => {
    const store = useContext(Store).resultUiStore;
    const [data, setData] = useState<Serie[]>([]);

    useEffect(() => {
        getGraphData(GraphOption.CUMULATIVE, result, store).then(data => setData(data));
    }, [result, store])
    //TODO: generate result data

    return (
        <div style={{position: "absolute", left: 0, top: "-100vh", width: 500, height: 500, backgroundColor: "#FFFFFF"}}
             id={"pdf-graph"}>
            <ResponsiveLine
                enableArea
                enableSlices={"x"}
                useMesh={true}
                margin={{top: 5, right: 5, bottom: 35, left: 40}}
                data={data}
                xScale={{type: 'linear'}}
                yScale={{type: 'linear', min: "auto", max: "auto", stacked: false}}
                yFormat={">-$,.2f"}
                animate={false}
                axisLeft={{
                    tickSize: 0,
                    tickPadding: 5,
                    legendPosition: "middle",
                    legendOffset: -35,
                    format: compactCurrencyFormatter.format
                }}
                axisBottom={{
                    tickSize: 0,
                    tickPadding: 5,
                    tickValues: 10,
                    legend: 'year',
                    legendOffset: 25,
                    legendPosition: 'middle',
                }}
                legends = {[
                    {
                        anchor: "bottom-right",
                        direction: "column",
                        translateX: 20,
                        translateY: -4,
                        symbolShape: "circle",
                        itemWidth: 150,
                        itemHeight: 24,
                    }
                ]}
            />
        </div>
    );
}

export default PdfGraph;
