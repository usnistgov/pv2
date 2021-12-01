import PdfInputSectionProps from "./Props";
import PdfSection from "../PdfSection";
import LabeledText from "../LabeledText";
import {StyleSheet, View, Text} from "@react-pdf/renderer";
import {take} from "../../../../Utils";
import {ESCALATION_RATES_SAME_OR_DIFF_OPTIONS} from "../../../../Strings";

const styles = StyleSheet.create({
    rateContainer: {
        display: "flex",
        width: "100%",
        flexDirection: "row"
    },
    rateLeftColumn: {
        textAlign: "right",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        fontSize: "12pt"
    },
    rateRightColumn: {
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        fontSize: "12pt"
    }
});

const PdfProductionEscalationRatesInput = ({store}: PdfInputSectionProps) => {
    const rates = store.escalationRateFormStore.productionEscalationRateForYear;

    return (
        <PdfSection title={"Production Rates"}>
            {
                store.escalationRateFormStore.escalationRatesSameOrDiff === ESCALATION_RATES_SAME_OR_DIFF_OPTIONS[0] &&
                <Text style={{textAlign: "center", fontSize: "12pt"}}>Same as consumption rates</Text>
            }
            {
                store.escalationRateFormStore.escalationRatesSameOrDiff !== ESCALATION_RATES_SAME_OR_DIFF_OPTIONS[0] &&
                <View style={styles.rateContainer}>
                    <View style={styles.rateLeftColumn}>
                        <LabeledText label={"Year"} content={"Rate"}/>
                        {
                            rates.filter((_, index) => index !== 0 && index <= rates.length / 2)
                                .map((rate, index) => {
                                    return <LabeledText label={`${index + 1}`}
                                                        content={`${(rate * 100).toFixed(2)}%`}/>
                                })
                        }
                    </View>
                    <View style={styles.rateRightColumn}>
                        <LabeledText label={"Year"} content={"Rate"}/>
                        {
                            rates.filter((_, index) => index > rates.length / 2)
                                .map((rate, index) => {
                                    return <LabeledText
                                        label={`${Math.ceil(rates.length / 2) + index + 1}`}
                                        content={`${(rate * 100).toFixed(2)}%`}/>
                                })
                        }
                    </View>
                </View>
            }
        </PdfSection>
    );
}

export default PdfProductionEscalationRatesInput;
