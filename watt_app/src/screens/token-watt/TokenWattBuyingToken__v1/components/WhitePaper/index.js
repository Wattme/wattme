import React from "react";
import {
  View,
  StyleSheet
} from "react-native/index";
import {
  Text,
  Button
} from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

class WhitePaper extends React.PureComponent {
  render() {
    const {
      onRoute
    } = this.props;

    return (
      <View style={styles.root}>

        <Text style={styles.message}>
          { allTranslations(localization.tokenWattBuyingToken.whitePaper.message) }
        </Text>

        <Button
          label={allTranslations(localization.tokenWattBuyingToken.whitePaper.button)}
          style={styles.button}
          onPress={onRoute}
        />

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
    fontSize: 14,
    lineHeight: 23,
    color: "#282828",
    marginBottom: 12
  },

  button: {}
});

export default WhitePaper
