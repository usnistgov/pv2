import {ReactElement} from "react";

import "./ResultCard.scss";
import {Card, CardContent, Grid} from "@material-ui/core";
import {altLabels} from "../E3RequestGenerator";

export interface ResultCardProps {
    alt: any;
    cashFlows: any;
}

const getField = (results: any, field: string) => {
    return results[field] !== null ? results[field] : "N/A";
}

export default function ResultCard({alt}: ResultCardProps): ReactElement {
    const style: any = {
        textAlign: "right",
        backgroundColor: "#98ee99",
    }

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

                    {/* TODO: build relevant graphs, and include year by year cash flows */}
                </div>
            </CardContent>
        </Card>
    )
}

