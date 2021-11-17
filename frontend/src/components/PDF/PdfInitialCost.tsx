import {ApplicationStore} from "../../application/ApplicationStore";
import PdfSection from "./PdfSection";
import {StyleSheet, Text, View} from "@react-pdf/renderer";
import {SREC_PAYMENTS_OPTIONS} from "../../Strings";
import {SREC_UPFRONT} from "../../Defaults";

const currencyFormatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

const styles = StyleSheet.create({
    initialCostContainer: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
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
                <View style={styles.initialCostNumberColumn}>
                    <Text style={styles.initialCostText}>
                        {currencyFormatter.format(store.costsFormStore.totalInstallationCosts ?? 0)}
                    </Text>
                    <Text style={styles.initialCostText}>
                        {currencyFormatter.format(parseFloat(store.costsFormStore.federalTaxCredit))}
                    </Text>
                    <Text style={styles.initialCostText}>
                        {currencyFormatter.format(
                            store.costsFormStore.stateOrLocalTaxCreditsOrGrantsOrRebates ?? 0
                        )}
                    </Text>
                    {
                        store.srecFormStore.srecPayments === SREC_PAYMENTS_OPTIONS[1] &&
                        <Text style={styles.initialCostText}>
                            {currencyFormatter.format(srecUpfront)}
                        </Text>
                    }
                </View>
                <View style={styles.initialCostLabelColumn}>
                    <Text style={styles.initialCostText}>Installation Costs</Text>
                    <Text style={styles.initialCostText}>Federal Tax Credit</Text>
                    <Text style={styles.initialCostText}>Grants or Rebates</Text>
                    {
                        store.srecFormStore.srecPayments === SREC_PAYMENTS_OPTIONS[1] &&
                        <Text style={styles.initialCostText}>SREC Upfront Payment</Text>
                    }
                </View>
            </View>
            <View style={styles.initialCostContainer}>
                <View style={styles.initialCostNumberColumn}>
                    <Text style={styles.initialCostNetText}>
                        {currencyFormatter.format(result?.FlowSummary[1]?.totCostDisc[0] ?? 0)}
                    </Text>
                </View>
                <View style={styles.initialCostLabelColumn}>
                    <Text style={styles.initialCostNetText}>Net Cost</Text>
                </View>
            </View>
        </PdfSection>
    );
}

export default PdfInitialCost;
