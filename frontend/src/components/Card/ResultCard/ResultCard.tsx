import React, {ReactElement} from "react";

// Library Imports
import {Grid} from "@material-ui/core";
import {Icon as MdiIcon} from "@mdi/react";
import {mdiInformation} from "@mdi/js";

// User Imports
import {altLabels} from "../../Request/RequestGenerator/E3RequestGenerator";
import {valid} from "../../Request/Request";
import FormTooltip from "../../Tooltips/FormTooltip";
import InfoTooltip from "../../Tooltips/InfoTooltip";
import Card from "../Card";

// Stylesheets
import "./ResultCard.sass";

const currencyFormatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
const numberFormatter = Intl.NumberFormat('en-US', {});

export interface ResultCardProps {
    // The alternative objects
    alt: any;
}

/**
 * Creates a card that displays the given E3 results.
 */
export default function ResultCard({alt}: ResultCardProps): ReactElement {
    return (
        <div className={"side-tooltip-container result-card"}>
            <Card title={altLabels[alt.altID]}>
                <Grid className={"card-table"} container spacing={4}>
                    <Grid item xs={7}>
                        <FormTooltip text={"Total Net Present Value Costs"}>
                            <div>Total Cost (NPV)</div>
                        </FormTooltip>
                    </Grid>
                    <Grid item xs={5}>
                        <div>{valid(alt.totalCosts) ? currencyFormatter.format(alt.totalCosts) : "NA"}</div>
                    </Grid>

                    <Grid item xs={7}>
                        <FormTooltip text={"Net Present Value Savings relative to No Solar System"}>
                            <div>Net Savings</div>
                        </FormTooltip>
                    </Grid>
                    <Grid item xs={5}>
                        <div>{valid(alt.netSavings) ? currencyFormatter.format(alt.netSavings) : "NA"}</div>
                    </Grid>

                    <Grid item xs={7}>
                        <FormTooltip text={"Adjusted Internal Rate of Return (AIRR) on Investment"}>
                            <div>AIRR</div>
                        </FormTooltip>
                    </Grid>
                    <Grid item xs={5}>
                        <div>{valid(alt.AIRR) ? `${(alt.AIRR * 100).toFixed(2)}%` : "NA"}</div>
                    </Grid>

                    <Grid item xs={7}>
                        <FormTooltip text={"Simple Payback Period (SPP)"}>
                            <div>Simple Payback Period</div>
                        </FormTooltip>
                    </Grid>
                    <Grid item xs={5}>
                        <div>{valid(alt.SPP) && alt.SPP !== "Infinity" ? `${Math.round(alt.SPP)}yr` : "NA"}</div>
                    </Grid>

                    <Grid item xs={7}>
                        <FormTooltip text={"Electricity reduction relative to No Solar System (kWh)"}>
                            <div>Electricity Reduction</div>
                        </FormTooltip>
                    </Grid>
                    <Grid className={"vertical-center"} item xs={5}>
                        <div>{valid(alt.deltaQuant?.["Electricity"]) ? `${numberFormatter.format(-alt.deltaQuant?.["Electricity"])} kWh` : "NA"}</div>
                    </Grid>
                </Grid>
            </Card>
            <div className={"side-tooltips"}>
                <InfoTooltip text={"Total Net Present Value Costs"}>
                    <MdiIcon className={"icon"} path={mdiInformation} size={1} color={'#898989'}/>
                </InfoTooltip>
                <InfoTooltip text={"Net Present Value Savings relative to No Solar System"}>
                    <MdiIcon className={"icon"} path={mdiInformation} size={1} color={'#898989'}/>
                </InfoTooltip>
                <InfoTooltip text={
                    "Adjusted Internal Rate of Return (AIRR) on Investment. This is a measure of return on " +
                    "investment that accounts for reinvestment of the annual savings"
                }>
                    <MdiIcon className={"icon"} path={mdiInformation} size={1} color={'#898989'}/>
                </InfoTooltip>
                <InfoTooltip text={
                    "Simple Payback Period (SPP) is the number of years it takes for cost savings to offset " +
                    "the initial investment costs"
                }>
                    <MdiIcon className={"icon"} path={mdiInformation} size={1} color={'#898989'}/>
                </InfoTooltip>
                <InfoTooltip text={"Electricity reduction relative to No Solar System"}>
                    <MdiIcon className={"icon"} path={mdiInformation} size={1} color={'#898989'}/>
                </InfoTooltip>
            </div>
        </div>
    )
}