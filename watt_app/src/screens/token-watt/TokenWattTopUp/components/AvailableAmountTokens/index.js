import React from "react";
import {
  View,
  StyleSheet
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

class AvailableAmountTokens extends React.PureComponent {
  render() {
    return (
      <View>

        <Text style={styles.title}>
          { allTranslations(localization.tokenWattTopUp.availableAmountTokens.label) }
        </Text>

        <Text style={styles.value}>
          50 WATT
        </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 13,
    lineHeight: 16,
    color: "#8E8E8E",
    textAlign: "center",
    marginBottom: 4
  },
  value: {
    fontSize: 18,
    lineHeight: 21,
    textAlign: "center",
    color: "#282828",
    fontWeight: "500"
  },
});

export default AvailableAmountTokens
