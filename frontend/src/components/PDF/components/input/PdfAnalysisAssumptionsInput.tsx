import PdfInputSectionProps from "./Props";
import PdfSection from "../PdfSection";
import {Text, View} from "@react-pdf/renderer";
import InputSectionStyles from "./InputSectionStyles";

const PdfAnalysisAssumptionsInput = ({store}: PdfInputSectionProps) => {
    const assumptions = store.analysisAssumptionsFormStore;

    return (
        <PdfSection title={"Analysis Assumptions"}>
            <View style={InputSectionStyles.inputSectionContainer}>
                <View style={InputSectionStyles.inputSectionLeftColumn}>
                    <Text style={InputSectionStyles.inputSectionText}>Study Period</Text>
                    <Text style={InputSectionStyles.inputSectionText}>Real Discount Rate</Text>
                    <Text style={InputSectionStyles.inputSectionText}>General Inflation Rate</Text>
                </View>
                <View style={InputSectionStyles.inputSectionRightColumn}>
                    <Text style={InputSectionStyles.inputSectionText}>{`${assumptions.studyPeriod} yr`}</Text>
                    <Text style={InputSectionStyles.inputSectionText}>{`${assumptions.realDiscountRate}%`}</Text>
                    <Text style={InputSectionStyles.inputSectionText}>{`${assumptions.generalInflation}%`}</Text>
                </View>
            </View>
        </PdfSection>
    );
}

export default PdfAnalysisAssumptionsInput;
