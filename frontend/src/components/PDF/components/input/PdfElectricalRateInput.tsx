import PdfInputSectionProps from "./Props";
import PdfSection from "../PdfSection";
import LabeledText from "../LabeledText";
import {threeDecimalCurrencyFormatter, twoDecimalCurrencyFormatter} from "../../../../Format";
import {getAnnualConsumption} from "../../../Request/RequestGenerator/E3RequestGenerator";

const PdfElectricalRateInput = ({store}: PdfInputSectionProps) => {
    const electricity = store.electricalCostFormStore;

    return (
        <PdfSection title={"Electrical Information"}>
            {
                electricity.electricalCompanyName !== "" &&
                <LabeledText label={"Electrical Company Name"} content={electricity.electricalCompanyName}/>
            }
            <LabeledText label={"Metering Type"} content={electricity.netMeteringFeedTariff}/>
            <LabeledText label={"Annual Consumption"} content={`${getAnnualConsumption(store)} kWh`}/>
            <LabeledText label={"Connection Fee"}
                         content={twoDecimalCurrencyFormatter.format(electricity.monthlyFlatRateCharge ?? 0)}/>
            <LabeledText label={"Electric Unit Price"}
                         content={threeDecimalCurrencyFormatter.format(electricity.electricUnitPrice ?? 0)}/>
            <LabeledText label={"Generation Unit Price"}
                         content={threeDecimalCurrencyFormatter.format(electricity.excessGenerationUnitPrice ?? 0)}/>
            <LabeledText label={"PV Grid Connection Fee"}
                         content={twoDecimalCurrencyFormatter.format(electricity.pvGridConnectionRate ?? 0)}/>
        </PdfSection>
    );
}

export default PdfElectricalRateInput;
