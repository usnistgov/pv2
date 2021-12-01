import PdfInputSectionProps from "./Props";
import PdfSection from "../PdfSection";
import LabeledText from "../LabeledText";
import {Text, View} from "@react-pdf/renderer";

const PdfSolarSystemInput = ({store}: PdfInputSectionProps) => {
    const solarSystem = store.solarSystemFormStore;

    return (
        <PdfSection title={"Solar System Info"}>
            <View style={{textAlign: "center", margin: 4, marginBottom: 8}}>
                <Text style={{fontSize: "18pt", marginBottom: 4}}>System Description</Text>
                <Text style={{fontSize: "12pt"}}>{solarSystem.systemDescription}</Text>
            </View>
            <LabeledText label={"Efficiency"} content={`${solarSystem.panelEfficiency ?? 0}%`}/>
            <LabeledText label={"Inverter Type"} content={solarSystem.inverterType}/>
            <LabeledText label={"System Size"} content={`${solarSystem.totalSystemSize ?? 0} W`}/>
            <LabeledText label={"Annual Production"} content={`${solarSystem.estimatedAnnualProduction ?? 0} kWh`}/>
            <LabeledText label={"Panel Lifetime"} content={`${solarSystem.panelLifetime ?? 0} yr`}/>
            <LabeledText label={"Inverter Lifetime"} content={`${solarSystem.inverterLifetimeOrDefault ?? 0} yr`}/>
            <LabeledText label={"Efficiency Degradation Rate"} content={`${solarSystem.degradationRate ?? 0}%`}/>
        </PdfSection>
    );
}

export default PdfSolarSystemInput;