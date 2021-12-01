import PdfInputSectionProps from "./Props";
import PdfSection from "../PdfSection";
import LabeledText from "../LabeledText";
import {LOAN_OR_CASH_OPTIONS} from "../../../../Strings";
import {currencyFormatter} from "../../../../Format";

const PdfLoanOrCashInput = ({store}: PdfInputSectionProps) => {
    const costs = store.costsFormStore;

    return (
        <PdfSection title={"Loan or Cash"}>
            <LabeledText label={"Payment Type"} content={store.costsFormStore.loanOrCash}/>
            {
                store.costsFormStore.loanOrCash === LOAN_OR_CASH_OPTIONS[0] &&
                <>
                    <LabeledText label={"Loan Down Payment"}
                                 content={currencyFormatter.format(costs.downPayment ?? 0)}/>
                    <LabeledText label={"Nominal Interest Rate"} content={`${costs.nominalInterestRate ?? 0}%`}/>
                    <LabeledText label={"Monthly Payment"}
                                 content={currencyFormatter.format(costs.monthlyPayment ?? 0)}/>
                    <LabeledText label={"Loan Length"} content={`${costs.loanLength ?? 0} yr`}/>
                </>
            }
        </PdfSection>
    );
}

export default PdfLoanOrCashInput;
