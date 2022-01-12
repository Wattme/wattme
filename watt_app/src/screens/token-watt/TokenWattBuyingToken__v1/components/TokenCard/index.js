import React from "react";
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  CommonArrowLineRight as CommonArrowLineRightIcon
} from "../../../../../assets/icons";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

const { width } = Dimensions.get("window");
const sizeCard = ( width - 24 );

class TokenCard extends React.PureComponent {
  render() {
    return (
      <View style={styles.card}>

        <View style={styles.cardHead}>
          <Text style={styles.title}>
            { allTranslations(localization.tokenWattBuyingToken.tokenCard.title) }
          </Text>
        </View>

        <ImageBackground
          source={require("../../../../../assets/png/wallet/wallet-card-liner.png")}
          blurRadius={90}
          style={{
            width: sizeCard,
            zIndex: 9
          }}
        >
          <View style={styles.cardBody}>

            <Text style={styles.roundTitle}>
              1 { allTranslations(localization.tokenWattBuyingToken.tokenCard.roundTitle) }
            </Text>

            <View style={styles.infoRound}>
              <View style={styles.infoRoundRow}>
                <Text style={styles.infoRoundRowLabel}>
                  { allTranslations(localization.tokenWattBuyingToken.tokenCard.roundPrice) }:
                </Text>
                <Text style={styles.infoRoundRowValue}>
                  $ 0.66
                </Text>
              </View>
              <View style={[styles.infoRoundRow, {marginTop: 8}]}>
                <Text style={styles.infoRoundRowLabel}>
                  { allTranslations(localization.tokenWattBuyingToken.tokenCard.roundQuantity) }:
                </Text>
                <Text style={styles.infoRoundRowValue}>
                  66 000 WATT
                </Text>
              </View>
            </View>

          </View>
        </ImageBackground>

        <Image
          source={require("../../../../../assets/png/watt-token/watt-token-background-card.png")}
          style={styles.backgroundImage}
          resizeMode="contain"
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#282828",
    borderRadius: 14,
    overflow: "hidden"
  },
  cardHead: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 2
  },
  cardBody: {
    padding: 16,
    zIndex: 2
  },

  title: {
    flex: 1,
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "500",
    color: "white"
  },

  buttonAbout: {
    flexDirection: "row",
    alignItems: "center",
    height: 30
  },
  buttonAboutLabel: {
    fontSize: 14,
    lineHeight: 17,
    color: "#F6D962"
  },
  buttonAboutIcon: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },

  roundTitle: {
    fontSize: 16,
    lineHeight: 19,
    color: "white",
    fontWeight: "500"
  },

  infoRound: {
    marginTop: 12
  },

  infoRoundRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  infoRoundRowLabel: {
    fontSize: 16,
    lineHeight: 19,
    color: "white"
  },
  infoRoundRowValue: {
    fontSize: 16,
    lineHeight: 19,
    color: "#10B879",
    fontWeight: "500",
    marginLeft: 8
  },

  backgroundImage: {
    position: "absolute",
    right: -80,
    bottom: -95,
    width: 260,
    height: 260,
    opacity: 0.2
  },
});

export default TokenCard
