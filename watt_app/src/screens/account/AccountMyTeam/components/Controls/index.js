import React from "react";
import {
  View,
  TextInput,
  StyleSheet
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  TabsTrade
} from "../../../../../components";
import {
  CommonSearch as CommonSearchIcon
} from "../../../../../assets/icons";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import { getFontFamily } from "../../../../../theme/theme-manager/Text";

class Controls extends React.PureComponent {

  _tabs = () => {
    return [
      { value: "wood", label: allTranslations(localization.accountMyTeam.controlsTabs.wood) },
      { value: "referrals", label: allTranslations(localization.accountMyTeam.controlsTabs.referrals) }
    ]
  }

  render() {
    const {
      search,
      activeTab,

      onChangeSearch,
      onChangeActiveTab
    } = this.props;

    return (
      <View style={styles.card}>

        <View style={styles.tabsContainer}>
          <TabsTrade
            value={activeTab}
            tabs={this._tabs()}

            onChange={onChangeActiveTab}
          />
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.inputIcon}>
            <CommonSearchIcon fill="#8E8E8E"/>
          </View>
          <TextInput
            value={search}
            style={styles.inputField}
            placeholder={allTranslations(localization.accountMyTeam.placeholderSearch)}
            placeholderTextColor="#8E8E8E"
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,

    padding: 16
  },

  tabsContainer: {
    marginBottom: 12
  },

  inputContainer: {
    marginTop: 12,
    height: 40,
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    borderRadius: 14,
    flexDirection: "row",
    paddingHorizontal: 12
  },
  inputIcon: {
    width: 32,
    height: 32,
    marginRight: 6,
    alignItems: "center",
    justifyContent: "center"
  },
  inputField: {
    flex: 1,
    backgroundColor: "transparent",

    fontSize: 14,
    paddingVertical: 0,
    paddingHorizontal: 0,
    fontFamily: getFontFamily("normal")
  },
});

export default Controls
