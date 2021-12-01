import PdfInputSectionProps from "./Props";
import PdfSection from "../PdfSection";
import LabeledText from "../LabeledText";
import {currencyFormatter} from "../../../../Format";

const PdfElectricalRateInput = ({store}: PdfInputSectionProps) => {
    const electricity = store.electricalCostFormStore;

    return (
        <PdfSection title={"Electrical Information"}>
            {
                electricity.electricalCompanyName !== "" &&
                <LabeledText label={"Electrical Company Name"} content={electricity.electricalCompanyName}/>
            }
            <LabeledText label={"Metering Type"} content={electricity.netMeteringFeedTariff}/>
            <LabeledText label={"Annual Consumption"} content={`${electricity.annualConsumption ?? 0} kWh`}/>
            <LabeledText label={"Connection Fee"}
                         content={currencyFormatter.format(electricity.monthlyFlatRateCharge ?? 0)}/>
            <LabeledText label={"Electric Unit Price"}
                         content={currencyFormatter.format(electricity.electricUnitPrice ?? 0)}/>
            <LabeledText label={"Generation Unit Price"}
                         content={currencyFormatter.format(electricity.excessGenerationUnitPrice ?? 0)}/>
            <LabeledText label={"PV Grid Connection Fee"}
                         content={currencyFormatter.format(electricity.pvGridConnectionRate ?? 0)}/>
        </PdfSection>
    );
}

export default PdfElectricalRateInput;
