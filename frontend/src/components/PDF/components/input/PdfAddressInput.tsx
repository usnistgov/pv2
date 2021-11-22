import PdfInputSectionProps from "./Props";
import PdfSection from "../PdfSection";
import LabeledText from "./LabeledText";

const PdfAddressInput = ({store}: PdfInputSectionProps) => {
    const address = store.addressFormStore;

    return (
        <PdfSection title={"Address"}>
            {address.address !== "" && <LabeledText label={"Address"} content={address.address}/>}
            {address.city !== "" && <LabeledText label={"City"} content={address.city}/>}
            {address.state !== "" && <LabeledText label={"State"} content={address.state}/>}
            <LabeledText label={"ZIP Code"} content={address.zipcode}/>
        </PdfSection>
    );
}

export default PdfAddressInput;
