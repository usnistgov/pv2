import {Canvas, Document, Image, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import {ReactNode} from "react";
import {altLabels} from "./Request/RequestGenerator/E3RequestGenerator";
import {valid} from "./Request/Request";
import {ApplicationStore} from "../application/ApplicationStore";
import {ESCALATION_RATES_SAME_OR_DIFF_OPTIONS, SREC_PAYMENTS_OPTIONS} from "../Strings";

interface ReactChildren {
    children?: ReactNode
}

const currencyFormatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
const numberFormatter = Intl.NumberFormat('en-US', {});

const styles = StyleSheet.create({
    page: {
        padding: 16
    },
    section: {
        marginTop: 16,
        marginBottom: 8
    },
    columns: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap"
    },
    column: {
        marginHorizontal: "auto"
    },
    altTitle: {
        marginTop: 8,
        marginLeft: 8,
        marginBottom: 4
    },
    altColumn: {
        margin: 8
    },
    title: {
        margin: 8,
        fontSize: "20pt",
        textAlign: "center"
    },
    text: {
        fontSize: "10pt",
        lineHeight: 1.4
    },
    subTitle: {
        fontSize: "14pt",
        textAlign: "center",
    },
    nistLogo: {
        width: 140,
        height: "auto"
    },
    pv2Logo: {
        width: 80,
        height: "auto"
    },
    separator: {
        width: "100%",
        height: 1
    },
    inputColumn: {
        width: 260
    },
    infoColumn: {
        width: 100
    },
    spacer: {
        margin: 4
    },
    bigSpacer: {
        margin: 16
    }
})

const PdfReport = ({result, store}: { result: any, store: ApplicationStore }) => {
    if (!result)
        return <Document/>

    const now = new Date().toLocaleDateString();

    return (
        <Document>
            <Page size={"A4"} style={styles.page}>
                <View style={[styles.columns, styles.section]}>
                    <Image style={styles.nistLogo} src={"/images/645px-nist_logo-svg_1.png"}/>
                    <Image style={styles.pv2Logo} src={"/images/PV2 Logo.png"}/>
                </View>
                <Separator/>
                <View style={styles.section}>
                    <Text style={styles.title}>PV2 Analysis Report</Text>
                    <Text style={styles.subTitle}>{now}</Text>
                </View>
                <Header>
                    <Text style={styles.title}>Results</Text>
                </Header>
                <View style={[styles.section, styles.columns]}>
                    {result.MeasureSummary.map((res: any, index: number) => <AltResult alt={res} key={index}/>)}
                </View>
                <Header>
                    <Text style={styles.title}>Inputs</Text>
                </Header>
                <Inputs store={store}/>
            </Page>
        </Document>
    )
};

export default PdfReport;

const Spacer = () => <View style={styles.spacer}/>;
const BigSpacer = () => <View style={styles.bigSpacer}/>;

const Inputs = ({store}: { store: ApplicationStore }) => {

    function getSrecInfo() {
        if (store.srecFormStore.srecPayments === SREC_PAYMENTS_OPTIONS[1]) {
            return <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>Up Front Payment:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>{store.srecFormStore.srecPaymentsUpFront ?? "NA"}</Text>
                </View>
            </View>
        } else if (store.srecFormStore.srecPayments === SREC_PAYMENTS_OPTIONS[2]) {
            return <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    {
                        Array(store.srecFormStore.srecContractLength)
                            .fill(0)
                            .map((_, index) => {
                                return <Text style={styles.text}>{`Year ${index + 1}:`}</Text>
                            })
                    }
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    {
                        store.srecFormStore.srecPaymentsProductionBased
                            .filter((_, index) => index > 0 && index <= store.srecFormStore.srecContractLength)
                            .map((value) => <Text style={styles.text}>{value}</Text>)
                    }
                </View>
            </View>
        }
    }

    function getConsumptionEscalationRates() {
        return Array(store.analysisAssumptionsFormStore.studyPeriod)
            .fill(0)
            .map((_, index) =>
                <View style={styles.columns}>
                    <View style={[styles.column, styles.infoColumn]}>
                        <Text style={styles.text}>{`Year ${index + 1}:`}</Text>
                    </View>
                    <View style={[styles.column, styles.infoColumn]}>
                        <Text style={styles.text}>
                            {store.escalationRateFormStore.escalationRateForYear[index + 1]}
                        </Text>
                    </View>
                </View>
            );
    }

    function getProductionEscalationRates() {
        if (store.escalationRateFormStore.escalationRatesSameOrDiff === ESCALATION_RATES_SAME_OR_DIFF_OPTIONS[0])
            return <></>

        return <View style={[styles.column, styles.inputColumn]}>
            <Text style={styles.altTitle}>Production Escalation Rates</Text>
            <Separator/>
            <Spacer/>
            {
                Array(store.analysisAssumptionsFormStore.studyPeriod)
                .fill(0)
                .map((_, index) =>
                    <View style={styles.columns}>
                        <View style={[styles.column, styles.infoColumn]}>
                            <Text style={styles.text}>{`Year ${index + 1}:`}</Text>
                        </View>
                        <View style={[styles.column, styles.infoColumn]}>
                            <Text style={styles.text}>
                                {store.escalationRateFormStore.productionEscalationRateForYear[index + 1]}
                            </Text>
                        </View>
                    </View>
                )
            }
            <BigSpacer/>
        </View>
    }

    return <View style={styles.columns}>
        <View style={[styles.column, styles.inputColumn]}>
            <Text style={styles.altTitle}>Address</Text>
            <Separator/>
            <Spacer/>
            <Text style={styles.text}>{store.addressFormStore.address}</Text>
            <Text style={styles.text}>{`${store.addressFormStore.city}, ${store.addressFormStore.state}`}</Text>
            <Text style={styles.text}>{store.addressFormStore.zipcode}</Text>
            <BigSpacer/>
        </View>
        <View style={[styles.column, styles.inputColumn]}>
            <Text style={styles.altTitle}>Analysis Assumptions</Text>
            <Separator/>
            <Spacer/>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>Study Period:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>{store.analysisAssumptionsFormStore.studyPeriod ?? "NA"}</Text>
                </View>
            </View>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>Real Discount Rate:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>{store.analysisAssumptionsFormStore.realDiscountRate ?? "NA"}</Text>
                </View>
            </View>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>General Inflation Rate:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>{store.analysisAssumptionsFormStore.generalInflation ?? "NA"}</Text>
                </View>
            </View>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>Residual Value Approach:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>
                        {store.analysisAssumptionsFormStore.residualValueApproach ?? "NA"}
                    </Text>
                </View>
            </View>
            <BigSpacer/>
        </View>
        <View style={[styles.column, styles.inputColumn]}>
            <Text style={styles.altTitle}>Electrical Costs</Text>
            <Separator/>
            <Spacer/>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>Electrical Company Name:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>
                        {store.electricalCostFormStore.electricalCompanyName ?? "NA"}
                    </Text>
                </View>
            </View>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>Net Metering Or Feed-in Tariff:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>
                        {store.electricalCostFormStore.netMeteringFeedTariff ?? "NA"}
                    </Text>
                </View>
            </View>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>Annual Consumption:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>
                        {store.electricalCostFormStore.annualConsumption ?? "NA"}
                    </Text>
                </View>
            </View>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>Monthly Flat Rate Charge:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>
                        {store.electricalCostFormStore.monthlyFlatRateCharge ?? "NA"}
                    </Text>
                </View>
            </View>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>Electrical Unit Price:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>
                        {store.electricalCostFormStore.electricUnitPrice ?? "NA"}
                    </Text>
                </View>
            </View>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>Excess Generation Price:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>
                        {store.electricalCostFormStore.excessGenerationUnitPrice ?? "NA"}
                    </Text>
                </View>
            </View>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>PV Grid Connection Fee:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>{store.electricalCostFormStore.pvGridConnectionRate ?? "NA"}</Text>
                </View>
            </View>
            <BigSpacer/>
        </View>
        <View style={[styles.column, styles.inputColumn]}>
            <Text style={styles.altTitle}>Consumption Escalation Rates</Text>
            <Separator/>
            <Spacer/>
            {getConsumptionEscalationRates()}
            <BigSpacer/>
        </View>
        {getProductionEscalationRates()}
        <View style={[styles.column, styles.inputColumn]}>
            <Text style={styles.altTitle}>Solar System Info</Text>
            <Separator/>
            <Spacer/>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>Panel Efficiency:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>{store.solarSystemFormStore.panelEfficiency ?? "NA"}</Text>
                </View>
            </View>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>Inverter Type:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>{store.solarSystemFormStore.inverterType ?? "NA"}</Text>
                </View>
            </View>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>Total System Size:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>{store.solarSystemFormStore.totalSystemSize ?? "NA"}</Text>
                </View>
            </View>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>Estimated Annual Production:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>{store.solarSystemFormStore.estimatedAnnualProduction ?? "NA"}</Text>
                </View>
            </View>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>Panel Lifetime:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>{store.solarSystemFormStore.panelLifetime ?? "NA"}</Text>
                </View>
            </View>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>Inverter Lifetime:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>{store.solarSystemFormStore.inverterLifetime ?? "NA"}</Text>
                </View>
            </View>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>Degradation Rate:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>{store.solarSystemFormStore.degradationRate ?? "NA"}</Text>
                </View>
            </View>
            <BigSpacer/>
        </View>
        <View style={[styles.column, styles.inputColumn]}>
            <Text style={styles.altTitle}>Costs</Text>
            <Separator/>
            <Spacer/>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>Total Installation Costs:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>{store.costsFormStore.totalInstallationCosts ?? "NA"}</Text>
                </View>
            </View>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>Grants or Rebates:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text
                        style={styles.text}>{store.costsFormStore.stateOrLocalTaxCreditsOrGrantsOrRebates ?? "NA"}</Text>
                </View>
            </View>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>Inverter Replacement Costs:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>{store.costsFormStore.inverterReplacementCosts ?? "NA"}</Text>
                </View>
            </View>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>Annual Maintenance Costs:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>{store.costsFormStore.annualMaintenanceCosts ?? "NA"}</Text>
                </View>
            </View>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>PPA Option:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>{store.costsFormStore.ppaOption}</Text>
                </View>
            </View>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>PPA Contract Length:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>{store.costsFormStore.ppaContractLength ?? "NA"}</Text>
                </View>
            </View>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>PPA Electricity Rate:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>{store.costsFormStore.ppaElectricityRate ?? "NA"}</Text>
                </View>
            </View>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>PPA Escalation Rate:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>{store.costsFormStore.ppaEscalationRate ?? "NA"}</Text>
                </View>
            </View>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>PPA Purchase Price:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>{store.costsFormStore.ppaPurchasePrice ?? "NA"}</Text>
                </View>
            </View>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>Loan Or Cash:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>{store.costsFormStore.loanOrCash ?? "NA"}</Text>
                </View>
            </View>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>Down Payment:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>{store.costsFormStore.downPayment ?? "NA"}</Text>
                </View>
            </View>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>Nominal Interest Rate:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>{store.costsFormStore.nominalInterestRate ?? "NA"}</Text>
                </View>
            </View>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>Monthly Payment:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>{store.costsFormStore.monthlyPayment ?? "NA"}</Text>
                </View>
            </View>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>Loan Length:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>{store.costsFormStore.loanLength ?? "NA"}</Text>
                </View>
            </View>
            <BigSpacer/>
        </View>
        <View style={[styles.column, styles.inputColumn]}>
            <Text style={styles.altTitle}>SREC Info</Text>
            <Separator/>
            <Spacer/>
            <View style={styles.columns}>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>SREC Option:</Text>
                </View>
                <View style={[styles.column, styles.infoColumn]}>
                    <Text style={styles.text}>{store.srecFormStore.srecPayments}</Text>
                </View>
            </View>
            {getSrecInfo()}
            <BigSpacer/>
        </View>
    </View>
};

const AltResult = ({alt}: { alt: any }) => (
    <View style={styles.column}>
        <Text style={styles.altTitle}>{altLabels[alt.altID]}</Text>
        <Separator/>
        <View style={styles.columns}>
            <View style={[styles.column, styles.altColumn]}>
                <Text style={styles.text}>Total Cost (NPV)</Text>
                <Text style={styles.text}>Net Savings</Text>
                <Text style={styles.text}>AIRR</Text>
                <Text style={styles.text}>Simple Payback Period</Text>
                <Text style={styles.text}>Electricity Reduction</Text>
            </View>
            <View style={[styles.column, styles.altColumn]}>
                <Text style={styles.text}>
                    {valid(alt.totalCosts) ? currencyFormatter.format(alt.totalCosts) : "NA"}
                </Text>
                <Text style={styles.text}>
                    {valid(alt.netSavings) ? currencyFormatter.format(alt.netSavings) : "NA"}
                </Text>
                <Text style={styles.text}>
                    {valid(alt.AIRR) ? `${(alt.AIRR * 100).toFixed(2)}%` : "NA"}
                </Text>
                <Text style={styles.text}>
                    {valid(alt.SPP) && alt.SPP !== "Infinity" ? `${Math.round(alt.SPP)}yr` : "NA"}
                </Text>
                <Text style={styles.text}>
                    {
                        valid(alt.deltaQuant?.["Electricity"]) ?
                            `${numberFormatter.format(-alt.deltaQuant?.["Electricity"])} kWh` : "NA"
                    }
                </Text>
            </View>
        </View>
    </View>
);

const Header = ({children}: ReactChildren) => (
    <View style={styles.section}>
        {children}
        <Separator/>
    </View>
);

const Separator = () => (
    <Canvas style={styles.separator} paint={(painter, width) => {
        painter.moveTo(0, 0);
        painter.lineTo(width, 0);
        painter.strokeColor('#66bb6a');
        painter.stroke();

        return painter;
    }}/>
);