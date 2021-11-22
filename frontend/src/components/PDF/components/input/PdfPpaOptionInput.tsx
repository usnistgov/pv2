import PdfInputSectionProps from "./Props";
import PdfSection from "../PdfSection";
import LabeledText from "./LabeledText";
import {LOAN_OR_CASH_OPTIONS, PPA_OPTIONS} from "../../../../Strings";

const currencyFormatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

const PdfPpaOptionInput = ({store}: PdfInputSectionProps) => {
    const ppa = store.costsFormStore;

    return (
        <PdfSection title={"PPA Option"}>
            <LabeledText label={"Include PPA Option"} content={ppa.ppaOption}/>
            {
                ppa.ppaOption === PPA_OPTIONS[0] &&
                <>
                    <LabeledText label={"Contract Length"}
                                 content={`${ppa.ppaContractLength ?? 0} yr`}/>
                    <LabeledText label={"Electricity Rate"}
                                 content={currencyFormatter.format(ppa.ppaElectricityRate ?? 0)}/>
                    <LabeledText label={"Escalation Rate"} content={`${ppa.ppaEscalationRate ?? 0}%`}/>
                    <LabeledText label={"Purchase Price"}
                                 content={currencyFormatter.format(ppa.ppaPurchasePrice ?? 0)}/>
                </>
            }
        </PdfSection>
    );
}

export default PdfPpaOptionInput;
