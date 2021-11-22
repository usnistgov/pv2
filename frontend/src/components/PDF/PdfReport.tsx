import {Document, Image, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import {ApplicationStore} from "../../application/ApplicationStore";
import PdfInitialCost from "./components/PdfInitialCost";
import PdfSystemInformation from "./components/PdfSystemInformation";
import PdfCumulativeSavings from "./components/PdfCumulativeSavings";
import PdfCarbonOffset from "./components/PdfCarbonOffset";
import PdfPaymentOptions from "./components/PdfPaymentOptions";
import {Result} from "../../typings/Result";
import PdfAddressInput from "./components/input/PdfAddressInput";
import PdfAnalysisAssumptionsInput from "./components/input/PdfAnalysisAssumptionsInput";
import PdfElectricalRateInput from "./components/input/PdfElectricalRateInput";

const styles = StyleSheet.create({
    page: {
        padding: 8
    },
    header: {
        marginVertical: 8,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    headerTitle: {
        margin: "auto",
        fontSize: "24pt"
    },
    headerDate: {
        margin: "auto",
        fontSize: "18pt"
    },
    headerNistLogo: {
        width: "127px",
        height: "34px"
    },
    headerPV2Logo: {
        width: "128px",
        height: "38px"
    },
    content: {
        marginTop: 32,
        marginBottom: 32,
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "auto"
    },
    column: {
        display: "flex",
        flex: 1,
        flexDirection: "column"
    }
});

interface PdfReportProps {
    graphSrc: string;
    result: Result;
    store: ApplicationStore;
}

const PdfReport = ({graphSrc, result, store}: PdfReportProps) => {
    if (!result)
        return <Document/>

    const now = new Date().toLocaleDateString();

    return (
        <Document>
            <Page size={"A4"} style={styles.page}>
                <View style={[styles.header]}>
                    <Image style={styles.headerNistLogo} src={"/images/645px-nist_logo-svg_1.png"}/>
                    <View>
                        <Text style={styles.headerTitle}>PV2 Analysis Report</Text>
                        <Text style={styles.headerDate}>{now}</Text>
                    </View>
                    <Image style={styles.headerPV2Logo} src={"/images/PV2 Logo.png"}/>
                </View>
                <View style={styles.content}>
                    <View style={[styles.column, {marginRight: 8}]}>
                        <PdfInitialCost result={result} store={store}/>
                        <PdfCumulativeSavings graphSrc={graphSrc}/>
                        <PdfCarbonOffset result={result}/>
                    </View>
                    <View style={[styles.column, {marginLeft: 8}]}>
                        <PdfSystemInformation store={store}/>
                        <PdfPaymentOptions result={result} store={store}/>
                    </View>
                </View>
            </Page>
            <Page size={"A4"} style={styles.page}>
                <View style={{margin: 16}}>
                    <Text style={styles.headerTitle}>Analysis Inputs</Text>
                </View>
                <View style={styles.content}>
                    <View style={[styles.column, {marginRight: 8}]}>
                        <PdfAddressInput store={store}/>
                        <PdfElectricalRateInput store={store}/>
                    </View>
                    <View style={[styles.column, {marginLeft: 8}]}>
                        <PdfAnalysisAssumptionsInput store={store}/>
                    </View>
                </View>
            </Page>
        </Document>
    )
};

export default PdfReport;
