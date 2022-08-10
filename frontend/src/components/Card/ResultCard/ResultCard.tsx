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
import {
    RESULT_AIRR_TOOLTIP,
    RESULT_CARBON_FOOTPRINT_TOOLTIP,
    RESULT_ELECTRICAL_REDUCTION_TOOLTIP, RESULT_NET_SAVINGS_TOOLTIP, RESULT_SCC_TOOLTIP,
    RESULT_SPP_TOOLTIP, RESULT_TOTAL_COST_TOOLTIP
} from "../../../Strings";
import {currencyFormatter, numberFormatter, years} from "../../../Format";

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
            <Card className={"overflow-visible"} title={altLabels[alt.altID]}>
                <Grid className={"card-table"} container spacing={4}>
                    <Grid item xs={7}>
                        <FormTooltip text={"Total Net Present Value Costs"}>
                            <div>Total Cost (NPV)</div>
                        </FormTooltip>
                    </Grid>
                    <Grid item xs={5} className={"right"}>
                        <div className={"side-tooltip-container"}>
                            {
                                valid(alt.totalCosts) ? currencyFormatter.format(parseFloat(alt.totalCosts)) : "NA"
                            }
                            <div className={"side-tooltip"}>
                                <InfoTooltip text={RESULT_TOTAL_COST_TOOLTIP}>
                                    <MdiIcon path={mdiInformation} size={1} color={'#898989'}/>
                                </InfoTooltip>
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={7}>
                        <FormTooltip text={"Net Present Value Savings relative to No Solar System"}>
                            <div>Net Savings</div>
                        </FormTooltip>
                    </Grid>
                    <Grid item xs={5} className={"right"}>
                        <div className={"side-tooltip-container"}>
                            {
                                valid(alt.netSavings) ? currencyFormatter.format(parseFloat(alt.netSavings)) : "NA"
                            }
                            <div className={"side-tooltip"}>
                                <InfoTooltip text={RESULT_NET_SAVINGS_TOOLTIP}>
                                    <MdiIcon path={mdiInformation} size={1} color={'#898989'}/>
                                </InfoTooltip>
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={7}>
                        <FormTooltip text={"Adjusted Internal Rate of Return (AIRR) on Investment"}>
                            <div>AIRR</div>
                        </FormTooltip>
                    </Grid>
                    <Grid item xs={5} className={"right"}>
                        <div className={"side-tooltip-container"}>
                            {
                                valid(alt.AIRR) && alt.AIRR !== undefined ?
                                    `${(parseFloat(alt.AIRR) * 100).toFixed(2)} %` : "NA"
                            }
                            <div className={"side-tooltip"}>
                                <InfoTooltip text={RESULT_AIRR_TOOLTIP}>
                                    <MdiIcon path={mdiInformation} size={1} color={'#898989'}/>
                                </InfoTooltip>
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={7}>
                        <FormTooltip text={"Simple Payback Period (SPP)"}>
                            <div>Simple Payback Period</div>
                        </FormTooltip>
                    </Grid>
                    <Grid item xs={5} className={"right"}>
                        <div className={"side-tooltip-container"}>
                            {
                                valid(alt.SPP) && alt.SPP !== undefined && alt.SPP !== 'Infinity' ?
                                    years(Math.round(parseFloat(alt.SPP))) : "NA"
                            }
                            <div className={"side-tooltip"}>
                                <InfoTooltip text={RESULT_SPP_TOOLTIP}>
                                    <MdiIcon path={mdiInformation} size={1} color={'#898989'}/>
                                </InfoTooltip>
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={7}>
                        <FormTooltip text={"Electricity reduction relative to No Solar System (kWh)"}>
                            <div>Electricity Reduction</div>
                        </FormTooltip>
                    </Grid>
                    <Grid className={"vertical-center right"} item xs={5}>
                        <div className={"side-tooltip-container"}>
                            {
                                valid(alt.deltaQuant?.["Electricity"]) ?
                                    `${numberFormatter.format(-(alt.deltaQuant?.["Electricity"] ?? 0))} kWh` : "NA"
                            }
                            <div className={"side-tooltip"}>
                                <InfoTooltip text={RESULT_ELECTRICAL_REDUCTION_TOOLTIP}>
                                    <MdiIcon path={mdiInformation} size={1} color={'#898989'}/>
                                </InfoTooltip>
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={7}>
                        <FormTooltip text={"Carbon Footprint (GWP-100) – tons CO2e"}>
                            <div>Carbon Footprint</div>
                        </FormTooltip>
                    </Grid>
                    <Grid className={"vertical-center right"} item xs={5}>
                        <div className={"side-tooltip-container"}>
                            {valid(gwp) ? `${numberFormatter.format(gwp)} tons CO2e` : "NA"}
                            <div className={"side-tooltip"}>
                                <InfoTooltip text={RESULT_CARBON_FOOTPRINT_TOOLTIP}>
                                    <MdiIcon path={mdiInformation} size={1} color={'#898989'}/>
                                </InfoTooltip>
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={7}>
                        <FormTooltip text={"Social Cost of Carbon $51 per ton"}>
                            <div>Social Cost of Carbon</div>
                        </FormTooltip>
                    </Grid>
                    <Grid className={"vertical-center right"} item xs={5}>
                        <div className={"side-tooltip-container"}>
                            {
                                valid(gwp) ? `${currencyFormatter.format(gwp * Constants.SOCIAL_COST_OF_CARBON)}` : "NA"
                            }
                            <div className={"side-tooltip"}>
                                <InfoTooltip text={RESULT_SCC_TOOLTIP}>
                                    <MdiIcon path={mdiInformation} size={1} color={'#898989'}/>
                                </InfoTooltip>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}
