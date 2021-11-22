import {StyleSheet, View, Text} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    labeledTextContainer: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        margin: 4
    },
    labeledTextLeftColumn: {
        textAlign: "right",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        fontSize: "12pt"
    },
    labeledTextRightColumn: {
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        fontSize: "12pt"
    },
    inputSectionText: {
        margin: 4
    }
});

interface LabeledTextProps {
    label: string;
    content: string;
}

const LabeledText = ({label, content}: LabeledTextProps) => {
    return <View style={styles.labeledTextContainer}>
        <View style={styles.labeledTextLeftColumn}>
            <Text style={styles.inputSectionText}>{label}</Text>
        </View>
        <View style={styles.labeledTextRightColumn}>
            <Text style={styles.inputSectionText}>{content}</Text>
        </View>
    </View>
}

export default LabeledText;
