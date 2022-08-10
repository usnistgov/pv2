import React, {ReactNode, useContext} from "react";

// Library imports
import {Box, Button, Grid} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
import {Icon as MdiIcon} from "@mdi/react";
import {mdiArrowLeft} from "@mdi/js";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import ResultCard from "../Card/ResultCard/ResultCard";
import MaterialHeader from "../MaterialHeader/MaterialHeader";
import {Store} from "../../application/ApplicationStore";
import "./Results.sass";
import Downloads from "../Download/Downloads";
import InputReport from "../InputReport/InputReport";
import Card from "../Card/Card";
import GraphCard from "../Card/GraphCard/GraphCard";
import {GraphOption, LOAN_OR_CASH_OPTIONS, SREC_PAYMENTS_OPTIONS} from "../../Strings";
import {SREC_UPFRONT} from "../../Defaults";
import MeasureSummary from "../../typings/MeasureSummary";
import OptionalSummary from "../../typings/OptionalSummary";
import {Result} from "../../typings/Result";
import {currencyFormatter, numberFormatter, years} from "../../Format";

interface ResultsProps {
    result?: Result;
}

/**
 * This page requests calculations from the E3 API and displays the results. Results are shown in side-by-side
 * card form with some data and graphs. Finally, the user can download a CSV file containing the E3 results. This
 * component takes not props since all necessary information for the E3 request is obtained from the redux store.
 */
const Results = observer(({result}: ResultsProps) => {
    const store = useContext(Store);
    const upfront = store.srecFormStore.srecPaymentsUpFront ?? SREC_UPFRONT;
    const navigate = useNavigate();

    let srecUpfront = upfront / 1000 *
        (store.solarSystemFormStore.totalSystemSize ?? 0);

    function componentOrSkeleton(component: (result: Result) => ReactNode) {
        if (result !== undefined)
            return component(result);

        return Array.from({length: 3}).map((_, index) => {
            return <Grid item key={index}>
                <Skeleton className={"result-card"} height={400} variant={"rect"} animation={"wave"}/>
            </Grid>
        });
    }

    return <>
        <Box className="container">
            <MaterialHeader
                text={"System Summary"}
                left={
                    <div className={"result-back-button"}>
                        <Button onClick={() => navigate(-1)} startIcon={<MdiIcon path={mdiArrowLeft} size={1}/>}>
                            Back
                        </Button>
                    </div>
                }
                right={result !== undefined ? <Downloads result={result}/> : <></>}/>
            <Grid container justifyContent={"center"} spacing={2}>
                <Grid item key={0}>
                    <Card className={"result-card-size"} title={"System Summary"}>
                        <Grid className={"card-table"} container spacing={4}>
                            <Grid item xs={12} className={"system-description-label"}>System Description</Grid>
                            <Grid item xs={12} className={"system-description-text"}>
                                {store.solarSystemFormStore.systemDescription}
                            </Grid>
                            <Grid item xs={7}>System Size</Grid>
                            <Grid item xs={5}
                                  className={"right"}>{numberFormatter.format(store.solarSystemFormStore.totalSystemSize ?? 0)} W</Grid>
                            <Grid item xs={7}>System Efficiency</Grid>
                            <Grid item xs={5}
                                  className={"right"}>{store.solarSystemFormStore.panelEfficiency ?? 0} %</Grid>
                            <Grid item xs={7}>Panel Lifetime</Grid>
                            <Grid item xs={5}
                                  className={"right"}>{years(store.solarSystemFormStore.panelLifetime)}</Grid>
                            <Grid item xs={7}>Inverter Lifetime</Grid>
                            <Grid item xs={5}
                                  className={"right"}>{years(store.solarSystemFormStore.inverterLifetimeOrDefault)}</Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item key={1}>
                    <Card title={"Initial Costs"}>
                        <div className={"initial-cost-card vertical-center"}>
                            <Grid className={"card-table"} container spacing={4}>
                                <Grid item xs={7}>Total Installation Cost</Grid>
                                <Grid item xs={5} className={"right"}>
                                    {currencyFormatter.format(store.costsFormStore.totalInstallationCosts ?? 0)}
                                </Grid>
                                <Grid item xs={7}>Amount Financed</Grid>
                                <Grid item xs={5} className={"right"}>
                                    {
                                        store.costsFormStore.loanOrCash === LOAN_OR_CASH_OPTIONS[0] ?
                                            `-${currencyFormatter.format(
                                                (store.costsFormStore.totalInstallationCosts ?? 0) -
                                                (store.costsFormStore.downPayment ?? 0)
                                            )}` :
                                            currencyFormatter.format(0)
                                    }
                                </Grid>
                                <Grid item xs={7} className={"net-cost-line"}>Upfront Out-of-Pocket Cost</Grid>
                                <Grid item xs={5} className={"net-cost-line right"}>
                                    {store.costsFormStore.loanOrCash === LOAN_OR_CASH_OPTIONS[0] ?
                                        currencyFormatter.format(store.costsFormStore.downPayment ?? 0) :
                                        currencyFormatter.format(store.costsFormStore.totalInstallationCosts ?? 0)}
                                </Grid>
                                <Grid item xs={7}>Federal Tax Credit</Grid>
                                <Grid item xs={5} className={"right"}>
                                    -{currencyFormatter.format(parseFloat(store.costsFormStore.federalTaxCredit ?? "0"))}
                                </Grid>
                                <Grid item xs={7}>Grants or Rebates</Grid>
                                <Grid item xs={5} className={"right"}>
                                    -{currencyFormatter.format(
                                    store.costsFormStore.stateOrLocalTaxCreditsOrGrantsOrRebates ?? 0
                                )}
                                </Grid>
                                {
                                    store.srecFormStore.srecPayments === SREC_PAYMENTS_OPTIONS[1] &&
                                    <>
                                        <Grid item xs={7}>SREC Upfront Payment</Grid>
                                        <Grid item xs={5}
                                              className={"right"}>-{currencyFormatter.format(srecUpfront)}</Grid>
                                    </>
                                }
                                <Grid item xs={7} className={"net-cost-line"}>Net Initial Cost</Grid>
                                <Grid item xs={5} className={"net-cost-line right"}>
                                    {currencyFormatter.format(result?.FlowSummary[1]?.totCostDisc[0] ?? 0)}
                                </Grid>
                            </Grid>
                        </div>
                    </Card>
                </Grid>
            </Grid>

            <MaterialHeader text={"Results Summary"}/>
            <Grid container justifyContent={"center"} spacing={2}>
                {componentOrSkeleton((result) => result.MeasureSummary.map((res: MeasureSummary, index: number) => {
                    return <Grid item key={index}>
                        <ResultCard
                            alt={res}
                            optionalSummaries={result.OptionalSummary.filter((value: OptionalSummary) => value.altID === index)}/>
                    </Grid>
                }))}
            </Grid>

            <MaterialHeader text={"Graphs"}/>
            <Grid container spacing={2} justifyContent={"center"}>
                {Object.values(GraphOption).map(option => <Grid item xs={6} key={option}>
                    <GraphCard result={result} option={option}/>
                </Grid>)}
            </Grid>

            <MaterialHeader text={"All Inputs"} bottomMargin={false}/>
            <InputReport/>
        </Box>
    </>
});

export default Results;
