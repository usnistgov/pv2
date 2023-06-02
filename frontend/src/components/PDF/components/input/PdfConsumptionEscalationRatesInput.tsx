import PdfInputSectionProps from "./Props";
import PdfSection from "../PdfSection";
import {StyleSheet, View} from "@react-pdf/renderer";
import LabeledText from "../LabeledText";

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

const PdfConsumptionEscalationRatesInput = ({store}: PdfInputSectionProps) => {
    const rates = store.escalationRateFormStore.escalationRateForYear;

    return (
        <PdfSection title={"Consumption Rates"}>
            <View style={styles.rateContainer}>
                <View style={styles.rateLeftColumn}>
                    <LabeledText label={"Year"} content={"Rate"}/>
                    {
                        rates.filter((_, index) => index !== 0 && index <= rates.length / 2)
                            .map((rate, index) => {
                                return <LabeledText key={index}
                                                    label={`${index + 1}`}
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
                                    key={index}
                                    label={`${Math.ceil(rates.length / 2) + index + 1}`}
                                    content={`${(rate * 100).toFixed(2)}%`}/>
                            })
                    }
                </View>
            </View>
        </PdfSection>
    );
}

export default PdfConsumptionEscalationRatesInput;