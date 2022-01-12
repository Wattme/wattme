import React from "react";
import {
  View,
  StyleSheet,
} from "react-native/index";
import {
  Text,
  Button
} from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

class MyP2PPool extends React.PureComponent {
  render() {
    return (
      <View style={styles.card}>

        <Text style={styles.smallTitle}>
          { allTranslations(localization.tokenWattP2PPool.myP2PPool.totalAmountFromPool) }
        </Text>
        <Text style={[styles.totalP2pPoolUSD, {marginTop: 8}]}>$ 150</Text>

        <View style={{ marginTop: 12 }}/>

        <Text style={styles.smallTitle}>
          { allTranslations(localization.tokenWattP2PPool.p2PPoolInfo.coins) }
        </Text>
        <Text style={[styles.totalP2pPoolWATT, {marginTop: 8}]}>100 WATT</Text>

        <View style={{ marginTop: 16 }}/>

        <View>

          <View style={styles.section}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>
                { allTranslations(localization.tokenWattP2PPool.myP2PPool.amountFromPool) }
              </Text>
              <Text style={styles.rowValue}>70 WATT ($ 100)</Text>
            </View>
            <View style={[styles.row, {marginTop: 8}]}>
              <Text style={styles.rowLabel}>
                { allTranslations(localization.tokenWattP2PPool.myP2PPool.poolQueue) }
              </Text>
              <Text style={styles.rowValue}>1</Text>
            </View>
          </View>

          <View style={styles.sectionSeparate}/>

          <View style={styles.section}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>
                { allTranslations(localization.tokenWattP2PPool.myP2PPool.amountFromPool) }
              </Text>
              <Text style={styles.rowValue}>30 WATT ($ 50)</Text>
            </View>
            <View style={[styles.row, {marginTop: 8}]}>
              <Text style={styles.rowLabel}>
                { allTranslations(localization.tokenWattP2PPool.myP2PPool.poolQueue) }
              </Text>
              <Text style={styles.rowValue}>15</Text>
            </View>
          </View>

          <Button
            label={allTranslations(localization.tokenWattP2PPool.myP2PPool.withdrawFromP2PPool)}
            style={{ marginTop: 16 }}
          />

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,
    backgroundColor: "white",

    padding: 16
  },

  buttonInfo: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center"
  },

  line: {
    flexDirection: "row",
    alignItems: "center"
  },
  smallTitle: {
    flex: 1,
    fontSize: 13,
    lineHeight: 16,
    color: "#8E8E8E",
    textAlign: "center",
  },

  totalP2pPoolUSD: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "600",
    textAlign: "center",
    color: "#10B879"
  },
  totalP2pPoolWATT: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "500",
    textAlign: "center",
    color: "#282828"
  },

  controls: {
    flexDirection: "row",
    marginLeft: -12,
    marginTop: 16
  },
  control: {
    flex: 1,
    marginLeft: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  controlLabel: {
    fontSize: 14,
    lineHeight: 17,
    textAlign: "center",
    color: "#8E8E8E"
  },
  controlButton: {
    height: 36,
    paddingVertical: 0,
    width: "100%",
    borderRadius: 8,
    marginTop: 12
  },
  controlButtonLabel: {
    fontWeight: "normal",
    fontSize: 16
  },

  section: {},
  sectionSeparate: {
    height: 2,
    backgroundColor: "#F2F3F4",
    marginVertical: 11
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  rowLabel: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E"
  },
  rowValue: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828",
    fontWeight: "500",
    textAlign: "right"
  },

});

export default MyP2PPool
