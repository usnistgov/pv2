import PdfInputSectionProps from "./Props";
import LabeledText from "./LabeledText";
import PdfSection from "../PdfSection";
import {currencyFormatter} from "../../../../Format";

const PdfCostsInput = ({store}: PdfInputSectionProps) => {
    const costs = store.costsFormStore;

    return (
        <PdfSection title={"Costs"}>
            <LabeledText label={"Total Installation Costs"}
                         content={currencyFormatter.format(costs.totalInstallationCosts ?? 0)}/>
            <LabeledText label={"Grants or Rebates"}
                         content={currencyFormatter.format(costs.stateOrLocalTaxCreditsOrGrantsOrRebates ?? 0)}/>
            <LabeledText label={"Inverter Replacement Costs"}
                         content={currencyFormatter.format(costs.inverterReplacementCostsOrDefault ?? 0)}/>
            <LabeledText label={"Annual Maintenance Costs"}
                         content={currencyFormatter.format(costs.annualMaintenanceCosts ?? 0)}/>
        </PdfSection>
    );
}

export default PdfCostsInput;
