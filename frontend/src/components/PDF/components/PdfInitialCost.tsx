import {ApplicationStore} from "../../../application/ApplicationStore";
import PdfSection from "./PdfSection";
import {StyleSheet, Text, View} from "@react-pdf/renderer";
import {LOAN_OR_CASH_OPTIONS, SREC_PAYMENTS_OPTIONS} from "../../../Strings";
import {SREC_UPFRONT} from "../../../Defaults";
import {currencyFormatter} from "../../../Format";
import LabeledText from "./LabeledText";

const styles = StyleSheet.create({
    initialCostContainer: {
        width: "100%",
        marginTop: 8
    },
    initialCostBottomBorder: {
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderBottomColor: "#000000"
    },
    initialCostNumberColumn: {
        textAlign: "right",
        display: "flex",
        flexDirection: "column",
        flex: 1
    },
    initialCostLabelColumn: {
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        flex: 1
    },
    initialCostText: {
        margin: 4,
        fontSize: "12pt"
    },
    initialCostNetText: {
        color: "#4CAF50",
        fontSize: "18pt",
        margin: 4
    }
});

const PdfInitialCost = ({result, store}: { result: any, store: ApplicationStore }) => {
    const upfront = store.srecFormStore.srecPaymentsUpFront ?? SREC_UPFRONT;
    let srecUpfront = upfront / 1000 * (store.solarSystemFormStore.totalSystemSize ?? 0);

    return (
        <PdfSection title={"Initial Costs"}>
            <View style={[styles.initialCostContainer, styles.initialCostBottomBorder]}>
                <LabeledText label={currencyFormatter.format(store.costsFormStore.totalInstallationCosts ?? 0)}
                             content={"Installation Costs"}/>
                {
                    store.costsFormStore.loanOrCash === LOAN_OR_CASH_OPTIONS[0] &&
                    <>
                        <View style={styles.initialCostBottomBorder}>
                            <LabeledText label={`-${currencyFormatter.format(
                                (store.costsFormStore.totalInstallationCosts ?? 0) -
                                (store.costsFormStore.downPayment ?? 0))}`}
                                         content={"Amount Financed"}/>
                        </View>
                        <View style={{fontWeight: "bold"}}>
                            <LabeledText label={currencyFormatter.format(store.costsFormStore.downPayment ?? 0)}
                                         content={"Upfront Out-of-Pocket Cost"}/>
                        </View>
                    </>
                }
                <LabeledText label={`-${currencyFormatter.format(parseFloat(store.costsFormStore.federalTaxCredit))}`}
                             content={"Federal Tax Credit"}/>
                <LabeledText label={`-${currencyFormatter.format(
                    store.costsFormStore.stateOrLocalTaxCreditsOrGrantsOrRebates ?? 0
                )}`}
                             content={"Grants or Rebates"}/>
                {
                    store.srecFormStore.srecPayments === SREC_PAYMENTS_OPTIONS[1] &&
                    <LabeledText label={`-${currencyFormatter.format(srecUpfront)}`}
                                 content={"SREC Upfront Payment"}/>
                }
            </View>
            <View style={[styles.initialCostContainer, styles.initialCostNetText]}>
                <LabeledText label={currencyFormatter.format(result?.FlowSummary[1]?.totCostDisc[0] ?? 0)}
                             content={"Net Initial Cost"}/>
            </View>
        </PdfSection>
    );
}

export default PdfInitialCost;
