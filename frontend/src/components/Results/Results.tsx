import React, {ReactNode, useContext} from "react";

// Library imports
import {Box, Button, Grid} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";
import {Icon as MdiIcon} from "@mdi/react";
import {mdiArrowLeft} from "@mdi/js";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";
import ResultCard from "../Card/ResultCard/ResultCard";
import MaterialHeader from "../MaterialHeader/MaterialHeader";
import {Store} from "../../application/ApplicationStore";
import "./Results.sass";
import Downloads from "../Download/Downloads";
import Constants from "../../Constants";
import InputReport from "../InputReport/InputReport";
import Card from "../Card/Card";
import GraphCard from "../Card/GraphCard/GraphCard";
import {SREC_PAYMENTS_OPTIONS} from "../../Strings";
import GraphOptionSelect from "../GraphOptionSelect/GraphOptionSelect";

const currencyFormatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

interface ResultsProps {
    result: any;
}
/**
 * This page requests calculations from the E3 API and displays the results. Results are shown in side-by-side
 * card form with some data and graphs. Finally the user can download a CSV file containing the E3 results. This
 * component takes not props since all necessary information for the E3 request is obtained from the redux store.
 */
const Results = observer(({result}: ResultsProps) => {
    const store = useContext(Store);
    const uiStore = useContext(Store).resultUiStore;

    let srecUpfront = store.srecFormStore.srecPaymentsUpFront / 1000 *
        (store.solarSystemFormStore.totalSystemSize ?? 0);

    function componentOrSkeleton(component: () => ReactNode) {
        if (result)
            return component();

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
                        <Button component={Link}
                                to={Constants.routes.APPLICATION}
                                startIcon={<MdiIcon path={mdiArrowLeft} size={1}/>}>
                            Back
                        </Button>
                    </div>
                }
                right={<Downloads result={result}/>}/>
            <Grid container justifyContent={"center"} spacing={2}>
                <Grid item key={0}>
                    <Card title={"System Summary"}>
                        <Grid className={"card-table"} container spacing={4}>
                            <Grid item xs={7}>System Description</Grid>
                            <Grid item xs={5}>{store.solarSystemFormStore.systemDescription}</Grid>
                            <Grid item xs={7}>System Size</Grid>
                            <Grid item xs={5}>{store.solarSystemFormStore.totalSystemSize} W</Grid>
                            <Grid item xs={7}>System Efficiency</Grid>
                            <Grid item xs={5}>{store.solarSystemFormStore.panelEfficiency ?? 0}%</Grid>
                            <Grid item xs={7}>Panel Lifetime</Grid>
                            <Grid item xs={5}>{store.solarSystemFormStore.panelLifetime}yr</Grid>
                            <Grid item xs={7}>Inverter Lifetime</Grid>
                            <Grid item xs={5}>{store.solarSystemFormStore.inverterLifetime}yr</Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item key={1}>
                    <Card title={"Initial Costs"}>
                        <Grid className={"card-table"} container spacing={4}>
                            <Grid item xs={7}>Total Installation Cost</Grid>
                            <Grid item xs={5}>
                                {currencyFormatter.format(store.costsFormStore.totalInstallationCosts ?? 0)}
                            </Grid>
                            <Grid item xs={7}>Federal Tax Credit</Grid>
                            <Grid item xs={5}>${store.costsFormStore.federalTaxCredit}</Grid>
                            <Grid item xs={7}>Grants or Rebates</Grid>
                            <Grid item xs={5}>
                                {currencyFormatter.format(
                                    store.costsFormStore.stateOrLocalTaxCreditsOrGrantsOrRebates ?? 0
                                )}
                            </Grid>
                            <Grid item xs={7}>SREC Upfront Payment</Grid>
                            <Grid item xs={5}>{currencyFormatter.format(
                                store.srecFormStore.srecPayments === SREC_PAYMENTS_OPTIONS[1] ?
                                    srecUpfront : 0
                            )}</Grid>
                            <Grid item xs={7}>Net Installation Cost</Grid>
                            <Grid item xs={5}>
                                {currencyFormatter.format(result?.FlowSummary[1]?.totCostDisc[0] ?? 0)}
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>

            <MaterialHeader text={"Results Summary"}/>
            <Grid container justifyContent={"center"} spacing={2}>
                {componentOrSkeleton(() => result.MeasureSummary.map((res: any, index: number) => {
                    return <Grid item key={index}>
                        <ResultCard alt={res}/>
                    </Grid>
                }))}
            </Grid>

            <MaterialHeader text={"Graphs"}/>
            <GraphOptionSelect/>
            <Grid container justifyContent={"center"} spacing={2}>
                {componentOrSkeleton(() => result.MeasureSummary.map((res: any, index: number) => {
                    return <Grid item key={index}>
                        <GraphCard
                            altId={res.altID}
                            result={result}/>
                    </Grid>
                }))}
            </Grid>

            <MaterialHeader text={"All Inputs"} bottomMargin={false}/>
            <InputReport/>
        </Box>
    </>
});

export default Results;
