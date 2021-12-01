import PdfInputSectionProps from "./Props";
import PdfSection from "../PdfSection";
import LabeledText from "../LabeledText";

const PdfAnalysisAssumptionsInput = ({store}: PdfInputSectionProps) => {
    const assumptions = store.analysisAssumptionsFormStore;

    return (
        <PdfSection title={"Analysis Assumptions"}>
            <LabeledText label={"Study Period"} content={`${assumptions.studyPeriod} yr`}/>
            <LabeledText label={"Real Discount Rate"} content={`${assumptions.realDiscountRate}%`}/>
            <LabeledText label={"General Inflation Rate"} content={`${assumptions.generalInflation}%`}/>
        </PdfSection>
    );
}

export default PdfAnalysisAssumptionsInput;
