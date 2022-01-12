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
   CommonArrowLeft as CommonArrowLeftIcon
} from "../../assets/icons";
import getHeightStatusBar from "../../helpers/getHeightStatusBar";
import allTranslations from "../../localization/allTranslations";
import localization from "../../localization/localization";
import { useNavigation } from "@react-navigation/native";

const heightStatusBar = getHeightStatusBar();

const HeaderMini = (props) => {
  const {
    mini,
    fullGoBack,

    hideTitle
  } = props;
  const navigation  = useNavigation();


  const _styleRoot = () => {
    let style = [styles.root];

    if (mini) {
      style.push(styles.rootMini);
    }

    return style
  }

  const _routeGoBack = () => {
    navigation.goBack();
  }
  const _renderButtonBack = () => {
    return (
      <TouchableOpacity style={styles.buttonCancel} onPress={_routeGoBack} activeOpacity={0.6}>
        {Boolean(fullGoBack) && (
          <CommonArrowLeftIcon color="#282828"/>
        )}
        {Boolean(!hideTitle)&&(
          <Text style={styles.buttonCancelLabel}>
            { allTranslations(localization.headerMini.cancel) }
          </Text>
        )}
      </TouchableOpacity>
    )
  }

  return (
    <View style={_styleRoot()}>
      { _renderButtonBack() }
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingTop: heightStatusBar + 16,
    paddingHorizontal: 16,
    paddingBottom: 16,

    alignItems: "flex-start",

    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "#F2F3F4",
    borderStyle: "solid"
  },
  rootMini: {
    paddingTop: 16
  },

  buttonCancel: {
    height: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonCancelLabel: {
    fontSize: 14,
    lineHeight: 17,
    color: "#000000"
  },
  buttonCancelIcon: {},
});

HeaderMini.defaultProps = {
  mini: false,

};

export default HeaderMini
