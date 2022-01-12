import React from "react";
import {
  StyleSheet,
  View,

} from "react-native/index";
import {
  Text,

} from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

const CardCommand = (props) => {
  const {
    title,
    participants,
    points
  } = props;

  return (
    <View style={[styles.card, styles.cardBig]}>
      <Text style={styles.cardBigTitle}>
        { title }
      </Text>
      <View style={styles.cardBigBody}>
        <View>
          <Text style={styles.cardBigBodyLabel}>{ allTranslations(localization.accountMyTeam.referralTree.participants) }</Text>
          <Text style={[styles.cardBigBodyValue, {color: "#10B879"}]}>{ participants }</Text>
        </View>
        <View>
          <Text style={[styles.cardBigBodyLabel, {textAlign: "right"}]}>{ allTranslations(localization.accountMyTeam.referralTree.points) }</Text>
          <Text style={[styles.cardBigBodyValue, {color: "#F5386A", textAlign: "right"}]}>{ points }</Text>
        </View>
      </View>
      <View style={styles.cartLineTop}/>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginLeft: 12,
    padding: 12,

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,

    backgroundColor: "#FFFFFF"
  },
  cardBig: {
    padding: 16
  },
  cardBigTitle: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    fontWeight: "500",
    color: "black",
    marginBottom: 12
  },
  cardBigBody: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cardBigBodyLabel: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E",
    fontWeight: "300"
  },
  cardBigBodyValue: {
    fontSize: 16,
    lineHeight: 19,
    marginTop: 8
  },
  cartLineTop: {
    position: "absolute",
    height: 14,
    top: -14,
    alignSelf: "center",

    backgroundColor: "#8E8E8E",
    width: 2
  }
});

export default CardCommand
