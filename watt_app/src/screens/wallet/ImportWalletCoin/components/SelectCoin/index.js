import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  ImportWalletArrowLeft
} from "../../../../../assets/icons";

const SelectCoin = (props) => {
  const { onPress, icon, label, image } = props;

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <View style={styles.cardIcon}>
        <Image source={Boolean(image) ? image : {uri: icon}} style={{flex: 1, borderRadius: 999, width: 44, height: 44}} resizeMode="contain"/>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardLabel}>{ label }</Text>
      </View>
      <View style={styles.cardArrow}>
        <ImportWalletArrowLeft/>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",

    paddingVertical: 12,
    paddingHorizontal: 16
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 999,
    overflow: "hidden"
  },
  cardBody: {
    flex: 1,
    paddingHorizontal: 16
  },
  cardArrow: {},

  cardLabel: {
    fontSize: 14,
    lineHeight: 17,
    color: "#282828",
    fontWeight: "500"
  }
});

export default SelectCoin
