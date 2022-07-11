import {ResponsiveLine, Serie} from "@nivo/line";
import React, {useContext, useEffect, useState} from "react";
import {Store} from "../../../application/ApplicationStore";
import {getGraphData} from "../../../GetGraphData";
import {GraphOption} from "../../../Strings";
import {Result} from "../../../typings/Result";
import {compactCurrencyFormatter} from "../../../Format";

interface PdfGraphProps {
    result: Result;
}

const PdfGraph = ({result}: PdfGraphProps) => {
    const store = useContext(Store).resultUiStore;
    const [data, setData] = useState<Serie[]>([]);

    async function getData(): Promise<Serie[]> {
        let res: Serie[] = [];

        const purchaseSerie = await getGraphData(GraphOption.CUMULATIVE, 1, result, store);
        purchaseSerie.id = "Purchase";
        res = res.concat(purchaseSerie);

        if(result.FlowSummary.length - 1 == 2){
            const ppaSerie = await getGraphData(GraphOption.CUMULATIVE, 2, result, store);
            ppaSerie.id = "PPA";
            res = res.concat(ppaSerie);
        }

        return res;
    }

    useEffect(() => {
        getData().then(data => setData(data));
    }, [])
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
                        direction: "row",
                        translateX: 10,
                        translateY: -4,
                        symbolShape: "circle",
                        itemWidth: 80,
                        itemHeight: 20,
                    }
                ]}
            />
        </div>
    );
}

export default PdfGraph;
