import {StyleSheet, Image} from '@react-pdf/renderer';
import PdfSection from "./PdfSection";

const styles = StyleSheet.create({
   cumulativeSavingsGraph: {
       marginTop: 4,
       marginLeft: -8,
       width: 264,
       height: 264
   }
});

interface PdfCumulativeSavingsProps {
    graphSrc: string;
}

const PdfCumulativeSavings = ({graphSrc}: PdfCumulativeSavingsProps) => {
    return (
        <PdfSection title={"Cumulative Savings"}>
            <Image style={styles.cumulativeSavingsGraph} src={graphSrc}/>
        </PdfSection>
    );
}

export default PdfCumulativeSavings;
