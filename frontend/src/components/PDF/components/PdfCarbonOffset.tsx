import PdfSection from "./PdfSection";
import {Image, StyleSheet, Text, View} from "@react-pdf/renderer";
import _ from "lodash";
import {Result} from "../../../typings/Result";
import Constants from "../../../Constants";
import {currencyFormatter, numberFormatter} from "../../../Format";

const styles = StyleSheet.create({
    carbonOffsetContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        fontSize: "18pt",
        margin: 8
    },
    carbonOffsetImage: {
        width: "52px",
        height: "52px"
    },
    carbonOffsetCentered: {
        textAlign: "center",
        fontSize: "18pt",
        margin: 8
    }
});

const PdfCarbonOffset = ({result}: {result: Result}) => {
    const gwpBaseline = result.OptionalSummary
        .find(summary => summary.tag === "LCIA-Global-Warming-Potential" && summary.altID == 0);
    const gwpOptional = result.OptionalSummary
        .find(summary => summary.tag === "LCIA-Global-Warming-Potential" && summary.altID == 1);
    const gwp = _.sum(gwpBaseline?.totTagQ.map((v) => v / 1000) ?? []) -
        _.sum(gwpOptional?.totTagQ.map((v) => v / 1000) ?? []);

    return (
      <PdfSection title={"Carbon Offset"}>
          <View style={styles.carbonOffsetContainer}>
              <Image style={styles.carbonOffsetImage} src={"/images/leaf-svgrepo-com.png"}/>
              <Text style={{paddingVertical: "14px"}}>{`${numberFormatter.format(Math.round(gwp))} tons C02e`}</Text>
          </View>
          <View style={styles.carbonOffsetCentered}>
              <Text>Social Cost of Carbon</Text>
              <Text style={{fontSize: "10pt"}}>{`($${Constants.SOCIAL_COST_OF_CARBON} per ton)`}</Text>
              <Text style={{color: "#4CAF50", margin: "8px"}}>
                  {currencyFormatter.format(gwp * Constants.SOCIAL_COST_OF_CARBON)}
              </Text>
          </View>
      </PdfSection>
    );
}

export default PdfCarbonOffset;
