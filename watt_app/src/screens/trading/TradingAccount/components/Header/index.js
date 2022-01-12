import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
   Text
} from "react-native-ui-lib";
import {
  CommonX as CommonXIcon
} from "../../../../../assets/icons";
import getHeightStatusBar from "../../../../../helpers/getHeightStatusBar";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

const heightStatusBar = getHeightStatusBar();

class Header extends React.PureComponent {

  _nameKey = () => {
    return this.props.listKeys.find((t) => t.default)?.name
  }

  render() {
    return (
      <View style={styles.root}>

        <View style={styles.right}>
          <Text style={styles.title}>{ this._nameKey() }</Text>
          <Text style={styles.caption}>{ allTranslations(localization.tradingAccount.headerCaption) }</Text>
        </View>

        <TouchableOpacity style={styles.buttonClose} onPress={this.props.goBack}>
          <CommonXIcon />
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 28,
    paddingVertical: 16,
    paddingTop: 16 + heightStatusBar,

    flexDirection: "row",
    alignItems: "center",
  },

  right: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
    color: "#000000",
    fontWeight: "500"
  },
  caption: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828",
    marginLeft: 6,
    marginBottom: -3
  },

  buttonClose: {
    width: 32,
    height: 32
  },
});

export default Header
