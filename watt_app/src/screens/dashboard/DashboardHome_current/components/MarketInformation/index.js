import React from "react";
import {
  View,
  StyleSheet
} from "react-native/index";
import {
  Text,
} from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import EStyleSheet from "react-native-extended-stylesheet";

class MarketInformation extends React.PureComponent {



  render() {
    return (
      <View style={styles.card}>
        <View style={[styles.row, {marginTop: 0}]}>
          <Text style={styles.title}>
            {allTranslations(localization.dashboardHome.marketInformation.marketCapitalization)}
          </Text>
          <Text style={styles.value}>
            $ 2 225 393 430 273
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>
            {allTranslations(localization.dashboardHome.marketInformation.volumeIn24Hours)}
          </Text>
          <Text style={styles.value}>
            $ 137 539 264 632
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>
            {allTranslations(localization.dashboardHome.marketInformation.dominanceBTC)}
          </Text>
          <Text style={styles.value}>
            41.95 %
          </Text>
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  card: {
    backgroundColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,
    padding: 16
  },

  row: {
    flexDirection: "row",
    marginTop: 12,

    "@media(min-width: 400)": {
      marginTop: 16,
    }
  },
  title: {
    fontSize: 12,
    lineHeight: 14,
    color: "#8E8E8E",
    marginRight: 16,

    "@media(min-width: 400)": {
      fontSize: 16,
      lineHeight: 19,
    }
  },
  value: {
    flex: 1,
    fontSize: 14,
    lineHeight: 17,
    color: "#282828",
    textAlign: "right",
    fontWeight: "600",

    "@media(min-width: 400)": {
      fontSize: 16,
      lineHeight: 19,
    }
  },
});

export default MarketInformation
