import PdfSection from "./PdfSection";
import {ApplicationStore} from "../../../application/ApplicationStore";
import {StyleSheet, Text, View} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    systemInfoContainer: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
    },
    systemInfoColumn: {
        textAlign: "right",
        display: "flex",
        flexDirection: "column",
        flex: 1
    },
    systemInfoLabelColumn: {
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        flex: 1
    },
    systemInfoText: {
        margin: 4,
        fontSize: "12pt"
    },
    systemInfoCenterText: {
        margin: 8,
        fontSize: "12pt",
        textAlign: "center"
    }
});

const PdfSystemInformation = ({store}: {store: ApplicationStore}) => {
    return (
      <PdfSection title={"System Information"}>
          <Text style={[styles.systemInfoCenterText, {maxHeight: "36pt", textOverflow: "ellipsis"}]}>
              {store.solarSystemFormStore.systemDescription}
          </Text>
          <View style={styles.systemInfoContainer}>
              <View style={styles.systemInfoColumn}>
                  <Text style={styles.systemInfoText}>
                      {store.solarSystemFormStore.totalSystemSize} W
                  </Text>
                  <Text style={styles.systemInfoText}>
                      {store.solarSystemFormStore.panelEfficiency ?? 0}%
                  </Text>
                  <Text style={styles.systemInfoText}>
                      {store.solarSystemFormStore.panelLifetime} yr
                  </Text>
                  <Text style={styles.systemInfoText}>
                      {store.solarSystemFormStore.inverterLifetimeOrDefault} yr
                  </Text>
              </View>
              <View style={styles.systemInfoLabelColumn}>
                  <Text style={styles.systemInfoText}>System Size</Text>
                  <Text style={styles.systemInfoText}>Efficiency</Text>
                  <Text style={styles.systemInfoText}>Panel Lifetime</Text>
                  <Text style={styles.systemInfoText}>Inverter Lifetime</Text>
              </View>
          </View>
      </PdfSection>
    );
}

export default PdfSystemInformation;