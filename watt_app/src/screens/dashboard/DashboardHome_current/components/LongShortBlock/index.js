import React from "react";
import {
  View,
  Dimensions,
  StyleSheet
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

const { width } = Dimensions.get("window");
const lineWidth = (width - 24) - 32;

class LongShortBlock extends React.PureComponent {
  render() {
    return (
      <View style={styles.card}>

        <View style={styles.head}>
          <Text style={styles.headTitle}>
            { allTranslations(localization.dashboardHome.longShortBlock.longTitle) }
          </Text>
          <Text style={[styles.headTitle, {textAlign: "right"}]}>
            { allTranslations(localization.dashboardHome.longShortBlock.shortTitle) }
          </Text>
        </View>

        <View style={styles.body}>
          <View style={{flex: 1}}>
            <Text style={[styles.bodyPercent, {color: "#10B879"}]}>38%</Text>
            <Text style={[styles.bodyAmount, {color: "#10B879"}]}>890,601.5458</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={[styles.bodyPercent, {color: "#F5386A", textAlign: "right"}]}>62%</Text>
            <Text style={[styles.bodyAmount, {color: "#F5386A", textAlign: "right"}]}>1,476,4321.5458</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.line}>
            <View style={[styles.lineLong, { width: (lineWidth / 100) * 38 }]}/>
            <View style={[styles.lineShort, { width: (lineWidth / 100) * 62 }]}/>
            <View/>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
  },

  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  body: {
    marginTop: 8,
    flexDirection: "row"
  },
  footer: {},

  headTitle: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828"
  },

  bodyPercent: {
    fontSize: 25,
    lineHeight: 30,
    fontWeight: "500"
  },
  bodyAmount: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "500"
  },

  line: {
    flexDirection: "row",
    marginTop: 16,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#F9F9F9",
    overflow: "hidden"
  },
  lineLong: {
    height: '100%',
    backgroundColor: "#10B879"
  },
  lineShort: {
    height: '100%',
    backgroundColor: "#F5386A"
  },
});

export default LongShortBlock
