import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import NetInfo from "@react-native-community/netinfo";
import getHeightStatusBar from "../../helpers/getHeightStatusBar";
import allTranslations from "../../localization/allTranslations";
import localization from "../../localization/localization";

const heightStatusBar = getHeightStatusBar();

const NetInfoComponent = (props) => {
  const {  } = props;
  const [isConnected, setConnected] = useState(true);

  useEffect(() => {
    NetInfo.addEventListener(state => {
      checkNetwork(state);
    });

    NetInfo.fetch().then(state => {
      checkNetwork(state);
    });
  }, []);

  const checkNetwork = (state) => {
    setConnected(state.isConnected);
  }

  if (isConnected) {
    return null
  }

  return (
    <View style={styles.root}>
      <Text style={styles.message}>{allTranslations(localization.netInfo.message)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    zIndex: 9999999999999,

    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: heightStatusBar + 6,

    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,

    backgroundColor: "#DF5D5D",

    elevation: 4
  },

  message: {
    color: "white",
    fontWeight: "500"
  }
});

export default NetInfoComponent
