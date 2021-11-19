import {Text, View, StyleSheet} from "@react-pdf/renderer";
import {PropsWithChildren} from "react";

const styles = StyleSheet.create({
    sectionContainer: {
        position: "relative",
        marginTop: 16,
        marginBottom: 8
    },
    section: {
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#49A010",
    },
    sectionTitle: {
        position: "absolute",
        top: "-14pt",
        left: "16px",
        paddingHorizontal: "8px",
        backgroundColor: "#FFFFFF",
        fontSize: "24pt"
    }
});

interface PdfSectionProps {
    title?: string;
}

const PdfSection = ({title, children}: PropsWithChildren<PdfSectionProps>) => (
    <View style={styles.sectionContainer}>
        <View style={styles.section}>
            {children}
        </View>
        <Text style={styles.sectionTitle}>
            {title}
        </Text>
    </View>
);

export default PdfSection;