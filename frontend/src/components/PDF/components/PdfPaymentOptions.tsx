import PdfSection from "./PdfSection";
import {StyleSheet, Text, View} from '@react-pdf/renderer';
import {Result} from "../../../typings/Result";
import {ApplicationStore} from "../../../application/ApplicationStore";

const currencyFormatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

const styles = StyleSheet.create({
    paymentContainer: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
    },
    paymentColumn: {
        textAlign: "right",
        display: "flex",
        flexDirection: "column",
        flex: 1
    },
    paymentLabelColumn: {
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        flex: 1
    },
    paymentText: {
        margin: 4,
        fontSize: "12pt"
    },
    paymentCenterText: {
        margin: 8,
        fontSize: "18pt",
        textAlign: "center"
    },
    paymentDivider: {
        marginTop: 16,
        marginBottom: 16,
        marginLeft: -16,
        marginRight: -16,
        borderBottomWidth: 1,
        borderBottomStyle: "solid",
        borderBottomColor: "#49A010"
    }
});

interface PdfPaymentOptions {
    result: Result;
    store: ApplicationStore;
}

const PdfPaymentOptions = ({result, store}: PdfPaymentOptions) => {
    const alternativeOne = result.MeasureSummary[1];
    const alternativeTwo = result.MeasureSummary[2] ?? null;

    return (
        <PdfSection title={"Payment Options"}>
            <Text style={styles.paymentCenterText}>{store.costsFormStore.loanOrCash}</Text>
            <View style={styles.paymentContainer}>
                <View style={styles.paymentColumn}>
                    <Text style={styles.paymentText}>
                        {currencyFormatter.format(parseFloat(alternativeOne.totalCosts))}
                    </Text>
                    <Text style={styles.paymentText}>
                        {alternativeOne.SPP !== undefined && alternativeOne.SPP !== 'Infinity' ?
                            `${Math.round(parseFloat(alternativeOne.SPP))} yr` : "NA"}
                    </Text>
                    <Text style={styles.paymentText}>
                        {alternativeOne.AIRR !== undefined ?
                            `${(parseFloat(alternativeOne.AIRR) * 100).toFixed(2)}%` : "NA"}
                    </Text>
                    <Text style={styles.paymentText}>
                        {currencyFormatter.format(parseFloat(alternativeOne.netSavings))}
                    </Text>
                </View>
                <View style={styles.paymentLabelColumn}>
                    <Text style={styles.paymentText}>Total Cost</Text>
                    <Text style={styles.paymentText}>Payback Period</Text>
                    <Text style={styles.paymentText}>AIRR</Text>
                    <Text style={styles.paymentText}>Net Savings</Text>
                </View>
            </View>
            {
                alternativeTwo !== null &&
                <>
                    <View style={styles.paymentDivider}/>
                    <Text style={styles.paymentCenterText}>PPA</Text>
                    <View style={styles.paymentContainer}>
                        <View style={styles.paymentColumn}>
                            <Text style={styles.paymentText}>
                                {currencyFormatter.format(parseFloat(alternativeTwo.totalCosts))}
                            </Text>
                            <Text style={styles.paymentText}>
                                {alternativeTwo.SPP !== undefined && alternativeTwo.SPP !== 'Infinity' ?
                                    `${Math.round(parseFloat(alternativeTwo.SPP))} yr` : "NA"}
                            </Text>
                            <Text style={styles.paymentText}>
                                {alternativeTwo.AIRR !== undefined ?
                                    `${(parseFloat(alternativeTwo.AIRR) * 100).toFixed(2)}%` : "NA"}
                            </Text>
                            <Text style={styles.paymentText}>
                                {currencyFormatter.format(parseFloat(alternativeTwo.netSavings))}
                            </Text>
                        </View>
                        <View style={styles.paymentLabelColumn}>
                            <Text style={styles.paymentText}>Total Cost</Text>
                            <Text style={styles.paymentText}>Payback Period</Text>
                            <Text style={styles.paymentText}>AIRR</Text>
                            <Text style={styles.paymentText}>Net Savings</Text>
                        </View>
                    </View>
                </>
            }
        </PdfSection>
    );
}

export default PdfPaymentOptions
