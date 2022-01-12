import React from "react";
import {
  View,
  StyleSheet,
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

class Goals extends React.PureComponent {
  render() {
    return (
      <View style={styles.root}>
        <Text style={styles.message}>
          { allTranslations(localization.tradingTradeInfo.goals.waitingForGoals) }
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,

    backgroundColor: "white",
    padding: 16
  },

  message: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828"
  }
});

export default Goals
