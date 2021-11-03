import React, {ReactElement} from "react";

// Library Imports
import {Grid} from "@material-ui/core";
import {Icon as MdiIcon} from "@mdi/react";
import {mdiInformation} from "@mdi/js";
import _ from "lodash";

// User Imports
import {altLabels} from "../../Request/RequestGenerator/E3RequestGenerator";
import {valid} from "../../Request/Request";
import FormTooltip from "../../Tooltips/FormTooltip";
import InfoTooltip from "../../Tooltips/InfoTooltip";
import Card from "../Card";

// Stylesheets
import "./ResultCard.sass";
import OptionalSummary from "../../../typings/OptionalSummary";
import MeasureSummary from "../../../typings/MeasureSummary";
import Constants from "../../../Constants";

const currencyFormatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
const numberFormatter = Intl.NumberFormat('en-US', {});

export interface ResultCardProps {
    // The alternative objects
    alt: MeasureSummary;

    // List of optional summaries associated with this alternative
    optionalSummaries: OptionalSummary[];
}

/**
 * Creates a card that displays the given E3 results.
 */
export default function ResultCard({alt, optionalSummaries}: ResultCardProps): ReactElement {
    const gwpOptional = optionalSummaries.find((summary) => summary.tag === "LCIA-Global-Warming-Potential");
    const gwp = _.sum(gwpOptional?.totTagQ.map((v) => v / 1000) ?? []);

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
                        <div>{
                            valid(alt.totalCosts) ? currencyFormatter.format(parseFloat(alt.totalCosts)) : "NA"
                        }</div>
                    </Grid>

                    <Grid item xs={7}>
                        <FormTooltip text={"Net Present Value Savings relative to No Solar System"}>
                            <div>Net Savings</div>
                        </FormTooltip>
                    </Grid>
                    <Grid item xs={5}>
                        <div>{
                            valid(alt.netSavings) ? currencyFormatter.format(parseFloat(alt.netSavings)) : "NA"
                        }</div>
                    </Grid>

                    <Grid item xs={7}>
                        <FormTooltip text={"Adjusted Internal Rate of Return (AIRR) on Investment"}>
                            <div>AIRR</div>
                        </FormTooltip>
                    </Grid>
                    <Grid item xs={5}>
                        <div>{
                            valid(alt.AIRR) && alt.AIRR !== undefined ?
                                `${(parseFloat(alt.AIRR) * 100).toFixed(2)}%` : "NA"
                        }</div>
                    </Grid>

                    <Grid item xs={7}>
                        <FormTooltip text={"Simple Payback Period (SPP)"}>
                            <div>Simple Payback Period</div>
                        </FormTooltip>
                    </Grid>
                    <Grid item xs={5}>
                        <div>{
                            valid(alt.SPP) && alt.SPP !== undefined && alt.SPP !== 'Infinity' ?
                                `${Math.round(parseFloat(alt.SPP))}yr` : "NA"
                        }</div>
                    </Grid>

                    <Grid item xs={7}>
                        <FormTooltip text={"Electricity reduction relative to No Solar System (kWh)"}>
                            <div>Electricity Reduction</div>
                        </FormTooltip>
                    </Grid>
                    <Grid className={"vertical-center"} item xs={5}>
                        <div>{
                            valid(alt.deltaQuant?.["Electricity"]) ?
                                `${numberFormatter.format(-(alt.deltaQuant?.["Electricity"] ?? 0))} kWh` : "NA"
                        }</div>
                    </Grid>

                    <Grid item xs={7}>
                        <FormTooltip text={"Carbon Footprint (GWP-100) – tons CO2e"}>
                            <div>Carbon Footprint</div>
                        </FormTooltip>
                    </Grid>
                    <Grid className={"vertical-center"} item xs={5}>
                        <div>{valid(gwp) ? `${numberFormatter.format(gwp)} tons CO2e` : "NA"}</div>
                    </Grid>

                    <Grid item xs={7}>
                        <FormTooltip text={"Social Cost of Carbon $51 per ton"}>
                            <div>Social Cost of Carbon</div>
                        </FormTooltip>
                    </Grid>
                    <Grid className={"vertical-center"} item xs={5}>
                        <div>{
                            valid(gwp) ? `${currencyFormatter.format(gwp * Constants.SOCIAL_COST_OF_CARBON)}` : "NA"
                        }</div>
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
