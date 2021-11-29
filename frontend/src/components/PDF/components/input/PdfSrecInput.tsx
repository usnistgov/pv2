import PdfInputSectionProps from "./Props";
import PdfSection from "../PdfSection";
import LabeledText from "./LabeledText";
import {SREC_PAYMENTS_OPTIONS} from "../../../../Strings";
import {StyleSheet, View} from "@react-pdf/renderer";
import {currencyFormatter} from "../../../../Format";

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

const PdfSrecInput = ({store}: PdfInputSectionProps) => {
    const srec = store.srecFormStore;
    const length = srec.srecContractLength ?? 0;

    function payments() {
        return <View style={styles.rateContainer}>
            <View style={styles.rateLeftColumn}>
                <LabeledText label={"Year"} content={"$/MWh"}/>
                {
                    srec.srecPaymentsProductionBased
                        .filter((_, index) => index !== 0 && index <= length / 2)
                        .map((amount, index) => {
                            return <LabeledText label={`${index + 1}`}
                                                content={`${currencyFormatter.format(amount ?? 0)}`}/>
                        })
                }
            </View>
            <View style={styles.rateRightColumn}>
                <LabeledText label={"Year"} content={"$/MWh"}/>
                {
                    srec.srecPaymentsProductionBased
                        .filter((_, index) => index > length / 2 && index <= length)
                        .map((amount, index) => {
                            return <LabeledText
                                label={`${Math.ceil(length / 2) + index + 1}`}
                                content={`${currencyFormatter.format(amount ?? 0)}`}/>
                        })
                }
            </View>
        </View>
    }

    return (
        <PdfSection title={"SREC"}>
            <LabeledText label={"SREC Option"} content={srec.srecPayments}/>
            {
                srec.srecPayments === SREC_PAYMENTS_OPTIONS[1] &&
                <LabeledText label={"Upfront Amount"}
                             content={`${currencyFormatter.format(srec.srecPaymentsUpFront ?? 0)}`}/>
            }
            {
                srec.srecPayments === SREC_PAYMENTS_OPTIONS[2] &&
                <>
                    <LabeledText label={"SREC Payment Length"} content={`${length}`}/>
                    {payments()}
                </>
            }
        </PdfSection>
    );
}

export default PdfSrecInput;
