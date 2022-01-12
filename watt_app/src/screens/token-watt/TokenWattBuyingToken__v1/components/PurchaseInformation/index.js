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

class PurchaseInformation extends React.PureComponent {
  render() {
    const {
      buyTokenWatt
    } = this.props;

    return (
      <View style={styles.root}>

        <Text style={styles.message}>
          { allTranslations(localization.tokenWattBuyingToken.purchaseInformation.message) }
        </Text>

        {
          false && (
            <Text style={styles.caption}>
              { allTranslations(localization.tokenWattBuyingToken.purchaseInformation.caption) }
            </Text>
          )
        }

        <Button
          label={allTranslations(localization.common.topUp)}
          style={styles.button}
          labelStyle={styles.buttonLabel}
          onPress={buyTokenWatt}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 14,
    borderColor: "#F0F0F0",
    backgroundColor: "white",
    padding: 16
  },

  message: {
    fontSize: 14,
    lineHeight: 23,
    color: "#282828"
  },
  caption: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E",
    marginTop: 12
  },

  button: {
    height: 36,
    marginTop: 12,
    paddingVertical: 0,
  },
  buttonLabel: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828",
    fontWeight: "500"
  },
});

export default PurchaseInformation
