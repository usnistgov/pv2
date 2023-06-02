import PdfSection from "./PdfSection";
import {StyleSheet, Text, View} from '@react-pdf/renderer';
import {ApplicationStore} from "../../../application/ApplicationStore";
import {currencyFormatter} from "../../../Format";
import {Output} from "e3-sdk";

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
    result: Output;
    store: ApplicationStore;
}

const PdfPaymentOptions = ({result, store}: PdfPaymentOptions) => {
    const alternativeOne = result?.measure?.[1];
    const alternativeTwo = result?.measure?.[2] ?? null;

    if(alternativeOne === undefined)
        return <PdfSection title={"Paytment Options"}/>

    return (
        <PdfSection title={"Payment Options"}>
            <Text style={styles.paymentCenterText}>{store.costsFormStore.loanOrCash}</Text>
            <View style={styles.paymentContainer}>
                <View style={styles.paymentColumn}>
                    <Text style={styles.paymentText}>
                        {currencyFormatter.format(alternativeOne.totalCosts ?? 0)}
                    </Text>
                    <Text style={styles.paymentText}>
                        {alternativeOne.spp !== undefined && alternativeOne.spp !== Infinity ?
                            `${Math.round(alternativeOne.spp)} yr` : "NA"}
                    </Text>
                    <Text style={styles.paymentText}>
                        {alternativeOne.airr !== undefined ?
                            `${(alternativeOne.airr * 100).toFixed(2)}%` : "NA"}
                    </Text>
                    <Text style={styles.paymentText}>
                        {currencyFormatter.format(alternativeOne.netSavings)}
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
                                {currencyFormatter.format(alternativeTwo.totalCosts)}
                            </Text>
                            <Text style={styles.paymentText}>
                                {alternativeTwo.spp !== undefined && alternativeTwo.spp !== Infinity ?
                                    `${Math.round(alternativeTwo.spp)} yr` : "NA"}
                            </Text>
                            <Text style={styles.paymentText}>
                                {alternativeTwo.airr !== undefined ?
                                    `${(alternativeTwo.airr * 100).toFixed(2)}%` : "NA"}
                            </Text>
                            <Text style={styles.paymentText}>
                                {currencyFormatter.format(alternativeTwo.netSavings)}
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
