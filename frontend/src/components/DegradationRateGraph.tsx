import {observer} from "mobx-react-lite";
import {ResponsiveLine} from "@nivo/line";
import {Paper} from "@material-ui/core";
import React, {useContext} from "react";
import {Store} from "../application/ApplicationStore";

export const DegradationRateGraph = observer(() => {
    const store = useContext(Store).solarSystemFormStore;

    return <div style={{width: "100%", height: 200}}>
        <ResponsiveLine
            animate
            enableArea
            useMesh={true}
            margin={{top: 24, right: 14, bottom: 35, left: 35}}
            data={[{
                id: "Panel Degradation",
                data: Array.from(Array((store.panelLifetime ?? 25) + 1).keys())
                    .map((year) => {
                        return {
                            x: year,
                            y: 100 - (year * (store.degradationRate ?? 0))
                        }
                    })
            }]}
            xScale={{type: 'linear'}}
            yScale={{type: 'linear', min: 0, max: 100}}
            axisLeft={{
                tickSize: 0,
                tickPadding: 5,
                legendPosition: "middle",
                legendOffset: -30,
                legend: "%"
            }}
            axisBottom={{
                tickSize: 0,
                tickPadding: 5,
                tickValues: 10,
                legend: 'year',
                legendOffset: 25,
                legendPosition: 'middle',
            }}
            tooltip={({point}) => <Paper style={{padding: 8}}>
                <div>{`Year ${point.data.xFormatted}: ${point.data.yFormatted}%`}</div>
            </Paper>}
        />
    </div>
})