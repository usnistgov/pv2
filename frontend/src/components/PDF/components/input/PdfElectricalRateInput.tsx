import PdfInputSectionProps from "./Props";
import PdfSection from "../PdfSection";
import {Text, View} from "@react-pdf/renderer";
import InputSectionStyles from "./InputSectionStyles";

const currencyFormatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

const PdfElectricalRateInput = ({store}: PdfInputSectionProps) => {
    const electricty = store.electricalCostFormStore;

    return (
        <PdfSection title={"Electrical Information"}>
            <View style={InputSectionStyles.inputSectionContainer}>
                <View style={InputSectionStyles.inputSectionLeftColumn}>
                    {
                        electricty.electricalCompanyName &&
                        <Text style={InputSectionStyles.inputSectionText}>Electrical Company Name</Text>
                    }
                    <Text style={InputSectionStyles.inputSectionText}>Metring Type</Text>
                    <Text style={InputSectionStyles.inputSectionText}>Annual Consumption</Text>
                    <Text style={InputSectionStyles.inputSectionText}>Connection Fee</Text>
                    <Text style={InputSectionStyles.inputSectionText}>Electric Unit Price</Text>
                    <Text style={InputSectionStyles.inputSectionText}>Generation Unit Price</Text>
                    <Text style={InputSectionStyles.inputSectionText}>PV Grid Connection Fee</Text>
                </View>
                <View style={InputSectionStyles.inputSectionRightColumn}>
                    {
                        electricty.electricalCompanyName &&
                        <Text style={InputSectionStyles.inputSectionText}>{electricty.electricalCompanyName}</Text>
                    }
                    <Text style={InputSectionStyles.inputSectionText}>{electricty.netMeteringFeedTariff}</Text>
                    <Text style={InputSectionStyles.inputSectionText}>
                        {`${electricty.annualConsumption} kWh`}
                    </Text>
                    <Text style={InputSectionStyles.inputSectionText}>
                        {currencyFormatter.format(parseFloat(electricty.monthlyFlatRateCharge ?? "0"))}
                    </Text>
                    <Text style={InputSectionStyles.inputSectionText}>
                        {currencyFormatter.format(parseFloat(electricty.electricUnitPrice ?? "0"))}
                    </Text>
                    <Text style={InputSectionStyles.inputSectionText}>
                        {currencyFormatter.format(parseFloat(electricty.excessGenerationUnitPrice ?? "0"))}
                    </Text>
                    <Text style={InputSectionStyles.inputSectionText}>
                        {currencyFormatter.format(parseFloat(electricty.pvGridConnectionRate ?? "0"))}
                    </Text>
                </View>
            </View>
        </PdfSection>
    );
}

export default PdfElectricalRateInput;
