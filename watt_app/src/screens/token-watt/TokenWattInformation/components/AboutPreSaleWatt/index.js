import React from "react";
import {
  View,
  StyleSheet, TouchableOpacity,
} from "react-native/index";
import {
  Text,

} from "react-native-ui-lib";
import {
  CommonArrowBottom as CommonArrowBottomIcon
} from "../../../../../assets/icons";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

const AboutPreSaleWatt = () => {
  const [ open, setOpen ] = React.useState(false);

  return (
    <View style={styles.root}>

      <TouchableOpacity style={styles.buttonOpen} activeOpacity={0.8} onPress={() => setOpen(!open)}>
        <Text style={styles.buttonOpenLabel}>
          {allTranslations(localization.tokenWattBuyingToken.aboutPreSaleWatt.label)}
        </Text>
        <View style={[
          styles.buttonOpenIcon,
          Boolean(open) && { transform: [{ rotate: "180deg" }] },
        ]}>
          <CommonArrowBottomIcon color="#282828" />
        </View>
      </TouchableOpacity>

      {
        Boolean(open) && (
          <View style={styles.content}>

            <Text style={styles.caption}>
              { allTranslations(localization.tokenWattBuyingToken.aboutPreSaleWatt.caption) }
            </Text>

            <View style={{ marginTop: 12 }}/>

            <View style={styles.roundBlock}>
              <View style={styles.roundBlockHead}>
                <Text style={styles.roundBlockRound}>
                  { allTranslations(localization.tokenWattBuyingToken.aboutPreSaleWatt.round) } 1
                </Text>
                <Text style={styles.roundBlockAmount}>66 000 WATT</Text>
              </View>
              <View style={styles.roundBlockBody}>
                <View style={styles.roundBlockPriceBlock}>
                  <Text style={styles.roundBlockPriceLabel}>Цена: <Text style={{fontWeight: "500"}}>$ 0.66</Text></Text>
                </View>
                <Text style={styles.roundBlockDate}>до 01 января 2022</Text>
              </View>
            </View>

            <View style={{ marginTop: 12 }}/>

            <View style={[styles.roundBlock]}>
              <View style={styles.roundBlockHead}>
                <Text style={[styles.roundBlockRound]}>
                  { allTranslations(localization.tokenWattBuyingToken.aboutPreSaleWatt.round) } 2
                </Text>
                <Text style={[styles.roundBlockAmount]}>66 000 WATT</Text>
              </View>
              <View style={styles.roundBlockBody}>
                <View style={styles.roundBlockPriceBlock}>
                  <Text style={[styles.roundBlockPriceLabel]}>Цена: <Text style={{fontWeight: "500"}}>$ 0.77</Text></Text>
                </View>
                <Text style={[styles.roundBlockDate]}>до 15 января 2022</Text>
              </View>
            </View>

            <View style={{ marginTop: 12 }}/>

            <View style={[styles.roundBlock, {backgroundColor: "#DDDDDD"}]}>
              <View style={styles.roundBlockHead}>
                <Text style={[styles.roundBlockRound, {color: "#999999"}]}>
                  { allTranslations(localization.tokenWattBuyingToken.aboutPreSaleWatt.round) } 3
                </Text>
                <Text style={[styles.roundBlockAmount, {color: "#999999"}]}>198 000 WATT</Text>
              </View>
              <View style={styles.roundBlockBody}>
                <View style={styles.roundBlockPriceBlock}>
                  <Text style={[styles.roundBlockPriceLabel, {color: "#999999"}]}>Цена: <Text style={{fontWeight: "500"}}>$ 0.88</Text></Text>
                </View>
                <Text style={[styles.roundBlockDate, {color: "#999999"}]}>до 31 января 2022</Text>
              </View>
            </View>

            <View style={{ marginTop: 12 }}/>

            <View style={[styles.roundBlock, styles.roundBlockStart]}>
              <Text style={styles.roundBlockMessage}>
                { allTranslations(localization.tokenWattBuyingToken.aboutPreSaleWatt.tokenPublicOfferingRoundsWillKickOff) }
              </Text>

              <View style={styles.roundBlockStartPrice}>
                <Text style={styles.roundBlockStartPriceLabel}>от $2</Text>
              </View>
            </View>

            <View style={{ marginTop: 12 }}/>

            <View style={styles.borderSection}>
              <Text style={styles.borderSectionMessage}>
                { allTranslations(localization.tokenWattBuyingToken.aboutPreSaleWatt.messageReachingGoalsDeadline) }
              </Text>
            </View>

            <View style={{ marginTop: 12 }}/>

            <View style={styles.greenSection}>
              <Text style={styles.borderSectionMessage}>
                { allTranslations(localization.tokenWattBuyingToken.aboutPreSaleWatt.tokensPurchasedPresaleLocked) }
              </Text>
              <View style={{marginTop: 12}}/>
              <Text style={styles.borderSectionMessage}>
                { allTranslations(localization.tokenWattBuyingToken.aboutPreSaleWatt.whatTeedBuy) }
              </Text>
            </View>

          </View>
        )
      }

    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,
    overflow: "hidden",
  },

  buttonOpen: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    height: 52,
  },
  buttonOpenLabel: {
    fontSize: 16,
    lineHeight: 23,
    color: "#282828",
    fontWeight: "500",
  },
  buttonOpenIcon: {
    width: 32,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  caption: {
    fontSize: 14,
    lineHeight: 23,
    color: "#282828",
    textAlign: "center"
  },

  roundBlock: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#F6D962"
  },
  roundBlockStart: {
    backgroundColor: "#DDDDDD",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  roundBlockHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  roundBlockBody: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16
  },
  roundBlockRound: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828",
    fontWeight: "600"
  },
  roundBlockAmount: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828",
    fontWeight: "500",
    textAlign: "right"
  },
  roundBlockPriceBlock: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 1
  },
  roundBlockPriceLabel: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828"
  },
  roundBlockDate: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "right",
    color: "#2D2D2D",
  },
  roundBlockMessage: {
    flex: 1,
    fontSize: 14,
    lineHeight: 23,
    color: "#999999"
  },
  roundBlockStartPrice: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  roundBlockStartPriceLabel: {
    fontSize: 16,
    lineHeight: 19,
    color: "#999999",
    fontWeight: "500"
  },

  borderSection: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,
    backgroundColor: "white",
    padding: 16,
  },
  borderSectionMessage: {
    fontSize: 14,
    lineHeight: 23,
    color: "#282828"
  },

  greenSection: {
    borderRadius: 14,
    backgroundColor: "#EDFFF8",
    padding: 16,
  },
  greenSectionMessage: {
    fontSize: 14,
    lineHeight: 23,
    color: "#282828"
  }
})

export default AboutPreSaleWatt
