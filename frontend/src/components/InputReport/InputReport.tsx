import {Grid, Tab} from "@material-ui/core";
import {useContext, useState} from "react";
import {TabContext, TabList, TabPanel} from "@material-ui/lab";
import "./InputReport.sass";
import {CATEGORIES, LOAN_OR_CASH_OPTIONS, PPA_OPTIONS, SREC_PAYMENTS_OPTIONS} from "../../Strings";
import {Store} from "../../application/ApplicationStore";
import GoogleMap from "../GoogleMap/GoogleMap";

export default function InputReport() {
    const [tabPosition, setTabPosition] = useState(CATEGORIES[0]);

    return (
        <TabContext value={tabPosition}>
            <div className={"input-report-tab-list input-report-background"}>
                <TabList centered onChange={(_, value) => setTabPosition(value)}>
                    {CATEGORIES.map((value) => (
                        <Tab label={value} value={value}/>
                    ))}
                </TabList>
            </div>
            <div className={"input-report-address-container"}>
                <TabPanel value={CATEGORIES[0]}><AddressReport/></TabPanel>
                <TabPanel value={CATEGORIES[1]}><AnalysisAssumptionsReport/></TabPanel>
                <TabPanel value={CATEGORIES[2]}><ElectricalRateReport/></TabPanel>
                <TabPanel value={CATEGORIES[3]}><EscalationRateReport/></TabPanel>
                <TabPanel value={CATEGORIES[4]}><SolarPVSystemReport/></TabPanel>
                <TabPanel value={CATEGORIES[5]}><SolarPVCostsReport/></TabPanel>
                <TabPanel value={CATEGORIES[6]}><SRECReport/></TabPanel>
            </div>
        </TabContext>
    );
}

function AddressReport() {
    const store = useContext(Store).addressFormStore;

    // Google Maps embedded url query
    const wholeMap = !(store.address || store.city || store.state || store.zipcode) ? "&center=39.8097343,-98.5556199&zoom=3" : "";
    const query = `${store.address}, ${store.city}, ${store.state} ${store.zipcode}${wholeMap}`;

    return (
        <Grid container justifyContent={"space-evenly"}>
            <Grid container item spacing={4} xs={3}>
                <Grid item xs={6}>Address:</Grid>
                <Grid item xs={6}>{store.address ?? "NA"}</Grid>
                <Grid item xs={6}>City:</Grid>
                <Grid item xs={6}>{store.city ?? "NA"}</Grid>
                <Grid item xs={6}>State:</Grid>
                <Grid item xs={6}>{store.state ?? "NA"}</Grid>
                <Grid item xs={6}>ZIP Code:</Grid>
                <Grid item xs={6}>{store.zipcode ?? "NA"}</Grid>
            </Grid>
            <Grid item xs={4}>
                <GoogleMap query={query}/>
            </Grid>
        </Grid>
    );
}

function AnalysisAssumptionsReport() {
    const store = useContext(Store).analysisAssumptionsFormStore;

    return (
        <div className={"input-report-container"}>
            <Grid container spacing={4}>
                <Grid item xs={6}>Study Period:</Grid>
                <Grid item xs={6}>{store.studyPeriod}</Grid>
                <Grid item xs={6}>Real Discount Rate:</Grid>
                <Grid item xs={6}>{store.realDiscountRate}</Grid>
                <Grid item xs={6}>General Inflation Rate:</Grid>
                <Grid item xs={6}>{store.generalInflation}</Grid>
                <Grid item xs={6}>Residual Value Approach:</Grid>
                <Grid item xs={6}>{store.residualValueApproach}</Grid>
            </Grid>
        </div>
    );
}

function ElectricalRateReport() {
    const store = useContext(Store).electricalCostFormStore;

    return (
        <div className={"input-report-container"}>
            <Grid container spacing={4}>
                <Grid item xs={6}>Electrical Company Name:</Grid>
                <Grid item xs={6}>{store.electricalCompanyName}</Grid>
                <Grid item xs={6}>Net Metering or Feed-in Tariff:</Grid>
                <Grid item xs={6}>{store.netMeteringFeedTariff}</Grid>
                <Grid item xs={6}>Annual Consumption:</Grid>
                <Grid item xs={6}>{store.annualConsumption}</Grid>
                <Grid item xs={6}>Monthly Connection Fee:</Grid>
                <Grid item xs={6}>{store.monthlyFlatRateCharge}</Grid>
                <Grid item xs={6}>Electric Unit Price:</Grid>
                <Grid item xs={6}>{store.electricUnitPrice}</Grid>
                <Grid item xs={6}>Generation Unit Price:</Grid>
                <Grid item xs={6}>{store.excessGenerationUnitPrice}</Grid>
                <Grid item xs={6}>PV Grid Connection Fee:</Grid>
                <Grid item xs={6}>{store.pvGridConnectionRate}</Grid>
            </Grid>
        </div>
    );
}

function EscalationRateReport() {
    const store = useContext(Store).escalationRateFormStore;

    function ConsumptionRates() {
        return <>
            {store.escalationRateForYear.map((value, index) => <>
                    <Grid item xs={6}>{`Year ${index}:`}</Grid>
                    <Grid item xs={6}>{(value * 100).toFixed(2)}%</Grid>
                </>
            )}
        </>;
    }

    function ProductionRates() {
        return <>
            {store.productionEscalationRateForYear.map((value, index) => <>
                    <Grid item xs={6}>{`Year ${index}:`}</Grid>
                    <Grid item xs={6}>{(value * 100).toFixed(2)}%</Grid>
                </>
            )}
        </>;
    }

    return (
        <div className={"input-report-escalation-container"}>
            <Grid className={"center"} container spacing={4} justifyContent={"space-evenly"}>
                <Grid container item xs={6} spacing={2}>
                    <Grid item xs={12}><h3>Consumption Escalation Rates:</h3></Grid>
                    <ConsumptionRates/>
                </Grid>
                <Grid container item xs={6} spacing={2}>
                    <Grid item xs={12}><h3>Production Escalation Rates:</h3></Grid>
                    <ProductionRates/>
                </Grid>
            </Grid>
        </div>
    );
}

function SolarPVSystemReport() {
    const store = useContext(Store).solarSystemFormStore;

    return (
        <div className={"input-report-container"}>
            <Grid container spacing={4}>
                <Grid item xs={6}>System Description:</Grid>
                <Grid item xs={6}>{store.systemDescription}</Grid>
                <Grid item xs={6}>Panel Efficiency:</Grid>
                <Grid item xs={6}>{store.panelEfficiency}</Grid>
                <Grid item xs={6}>Inverter Type:</Grid>
                <Grid item xs={6}>{store.inverterType}</Grid>
                <Grid item xs={6}>Total System Size:</Grid>
                <Grid item xs={6}>{store.totalSystemSize}</Grid>
                <Grid item xs={6}>Annual Production:</Grid>
                <Grid item xs={6}>{store.estimatedAnnualProduction}</Grid>
                <Grid item xs={6}>Panel Lifetime:</Grid>
                <Grid item xs={6}>{store.panelLifetime}</Grid>
                <Grid item xs={6}>Inverter Lifetime:</Grid>
                <Grid item xs={6}>{store.inverterLifetime}</Grid>
                <Grid item xs={6}>Degradation Rate:</Grid>
                <Grid item xs={6}>{store.degradationRate}</Grid>
            </Grid>
        </div>
    );
}

function SolarPVCostsReport() {
    const store = useContext(Store).costsFormStore;

    function PPAOption() {
        if (store.ppaOption !== PPA_OPTIONS[0])
            return <></>;

        return <>
            <Grid item xs={6}>PPA Contract Length:</Grid>
            <Grid item xs={6}>{store.ppaContractLength}</Grid>
            <Grid item xs={6}>PPA Electricity Rate:</Grid>
            <Grid item xs={6}>{store.ppaElectricityRate}</Grid>
            <Grid item xs={6}>PPA Escalation Rate:</Grid>
            <Grid item xs={6}>{store.ppaEscalationRate}</Grid>
            <Grid item xs={6}>PPA Purchase Price:</Grid>
            <Grid item xs={6}>{store.ppaPurchasePrice}</Grid>
        </>;
    }

    function LoanOrCash() {
        if (store.loanOrCash !== LOAN_OR_CASH_OPTIONS[0])
            return <></>;

        return <>
            <Grid item xs={6}>Down Payment:</Grid>
            <Grid item xs={6}>{store.downPayment}</Grid>
            <Grid item xs={6}>Nominal Interest Rate:</Grid>
            <Grid item xs={6}>{store.nominalInterestRate}</Grid>
            <Grid item xs={6}>Monthly Payment:</Grid>
            <Grid item xs={6}>{store.monthlyPayment}</Grid>
            <Grid item xs={6}>Loan Length:</Grid>
            <Grid item xs={6}>{store.loanLength}</Grid>
        </>;
    }

    return (
        <div className={"input-report-container"}>
            <Grid container spacing={4}>
                <Grid item xs={6}>Total Installation Costs:</Grid>
                <Grid item xs={6}>{store.totalInstallationCosts}</Grid>
                <Grid item xs={6}>Grants or Rebates:</Grid>
                <Grid item xs={6}>{store.stateOrLocalTaxCreditsOrGrantsOrRebates}</Grid>
                <Grid item xs={6}>Inverter Replacement Costs:</Grid>
                <Grid item xs={6}>{store.inverterReplacementCosts}</Grid>
                <Grid item xs={6}>Annual Maintenance Costs:</Grid>
                <Grid item xs={6}>{store.annualMaintenanceCosts}</Grid>
                <Grid item xs={6}>Include PPA:</Grid>
                <Grid item xs={6}>{store.ppaOption}</Grid>
                <PPAOption/>
                <Grid item xs={6}>Loan Or Cash:</Grid>
                <Grid item xs={6}>{store.loanOrCash}</Grid>
                <LoanOrCash/>
            </Grid>
        </div>
    );
}

function SRECReport() {
    const store = useContext(Store).srecFormStore;

    function SRECUpfront() {
        if (store.srecPayments !== SREC_PAYMENTS_OPTIONS[1])
            return <></>;

        return <>
            <Grid item xs={6}>SREC Upfront Payments:</Grid>
            <Grid item xs={6}>{store.srecPaymentsUpFront}</Grid>
        </>;
    }

    function SRECProductionPayments() {
        if (store.srecPayments !== SREC_PAYMENTS_OPTIONS[2])
            return <></>;

        return <>
            <Grid item xs={6}>SREC Payment Length:</Grid>
            <Grid item xs={6}>{store.srecContractLength}</Grid>
            {store.srecPaymentsProductionBased
                .filter((_, index) => index > 0 && index <= (store.srecContractLength ?? 0))
                .map((value, index) => <>
                        <Grid item xs={6}>{`Year ${index + 1}:`}</Grid>
                        <Grid item xs={6}>{value}</Grid>
                    </>
                )}
        </>;
    }

    return (
        <div className={"input-report-container"}>
            <Grid container spacing={4}>
                <Grid item xs={6}>SREC Type:</Grid>
                <Grid item xs={6}>{store.srecPayments}</Grid>
                <SRECUpfront/>
                <SRECProductionPayments/>
            </Grid>
        </div>
    );
}
