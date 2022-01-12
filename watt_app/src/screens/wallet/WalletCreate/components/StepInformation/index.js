import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native/index";
import {
  Text,
  Checkbox
} from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import EStyleSheet from "react-native-extended-stylesheet";

const { scale } = Dimensions.get("window");

class StepInformation extends React.PureComponent {
  render() {
    const {
      isAcceptBackup
    } = this.props;

    return (

      <>

        <View style={styles.root}>

          <Image
            style={styles.image}
            source={require("../../../../../assets/png/wallet-create/loudspeaker.png")}
            resizeMode="contain"
          />

          <Text style={styles.title}>
            { allTranslations(localization.walletCreate.step1.title) }
          </Text>

          <Text style={styles.message}>
            { allTranslations(localization.walletCreate.step1.message) }
          </Text>


        </View>


        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => this.props.onChange(!isAcceptBackup)}
          activeOpacity={0.8}
        >
          <Checkbox
            value={isAcceptBackup}
            style={styles.checkboxItem}

            onValueChange={() => this.props.onChange(!isAcceptBackup)}
          />
          <Text style={styles.checkboxLabel}>
            {allTranslations(localization.walletCreate.step1.checkbox)}
          </Text>
        </TouchableOpacity>
      </>

    )
  }
}

const styles = EStyleSheet.create({
  root: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    "@media (min-width: 400)": {
      paddingBottom: 60
    }
  },

  image: {
    width: 60 * scale,
    height: 60 * scale,
    marginBottom: 16,

    "@media (min-width: 400)": {
      width: 240,
      height: 240,

      marginBottom: 48,
    }
  },
  title: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#282828",
    textAlign: "center",

    "@media (min-width: 400)": {
      fontSize: 25,
      lineHeight: 32,
    }
  },
  message: {
    fontSize: 14,
    lineHeight: 23,
    color: "#8E8E8E",
    textAlign: "center",
    maxWidth: 280,
    marginTop: 12,

    "@media (min-width: 400)": {
      fontSize: 16,
      lineHeight: 23,

      marginTop: 24
    }
  },

  checkbox: {
  
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,

    "@media (min-width: 400)": {
      paddingHorizontal: 28
    }
  },
  checkboxItem: {},
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "300",
    color: "#282828",
    marginLeft: 12,

    "@media (min-width: 400)": {
      fontSize: 16,
      lineHeight: 21,
    }
  },
});

export default StepInformation
