import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text,
  Button
} from "react-native-ui-lib";
import {
  CommonInfo as CommonInfoIcon
} from "../../../../../assets/icons";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

class  P2PPoolInfo extends React.PureComponent {
  render() {
    const {
      openInfoP2PPool
    } = this.props;

    return (
      <View style={styles.card}>

        <View>
          <View style={styles.line}>
            <View style={styles.buttonInfo}/>
            <Text style={styles.smallTitle}>
              { allTranslations(localization.tokenWattP2PPool.p2PPoolInfo.P2PPool) }
            </Text>
            <TouchableOpacity style={styles.buttonInfo} activeOpacity={0.6} onPress={openInfoP2PPool}>
              <CommonInfoIcon color="#8E8E8E"/>
            </TouchableOpacity>
          </View>
          <Text style={styles.totalP2pPoolUSD}>4 678,72 USD</Text>
        </View>

        <View style={{ marginTop: 12 }}>
          <Text style={styles.smallTitle}>
            { allTranslations(localization.tokenWattP2PPool.p2PPoolInfo.coins) }
          </Text>
          <Text style={[styles.totalP2pPoolWATT, {marginTop: 12}]}>4 678,72 WATT</Text>
        </View>

        <View style={styles.controls}>
          <View style={styles.control}>
            <Text style={styles.controlLabel}>
              { allTranslations(localization.tokenWattP2PPool.p2PPoolInfo.purchaseAddress) }
            </Text>
            <Button
              label={allTranslations(localization.common.buy)}
              style={styles.controlButton}
              labelStyle={styles.controlButtonLabel}
              color="secondary"
            />
          </View>
          <View style={styles.control}>
            <Text style={styles.controlLabel}>
              { allTranslations(localization.tokenWattP2PPool.p2PPoolInfo.topUpAddress) }
            </Text>
            <Button
              label={allTranslations(localization.common.topUp)}
              style={styles.controlButton}
              labelStyle={styles.controlButtonLabel}
            />
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,
    backgroundColor: "white",

    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 12,
    paddingBottom: 16
  },

  buttonInfo: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center"
  },

  line: {
    flexDirection: "row",
    alignItems: "center"
  },
  smallTitle: {
    flex: 1,
    fontSize: 13,
    lineHeight: 16,
    color: "#8E8E8E",
    textAlign: "center",
  },

  totalP2pPoolUSD: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "600",
    textAlign: "center",
    color: "#10B879"
  },
  totalP2pPoolWATT: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "500",
    textAlign: "center",
    color: "#282828"
  },

  controls: {
    flexDirection: "row",
    marginLeft: -12,
    marginTop: 16
  },
  control: {
    flex: 1,
    marginLeft: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  controlLabel: {
    fontSize: 14,
    lineHeight: 17,
    textAlign: "center",
    color: "#8E8E8E"
  },
  controlButton: {
    height: 36,
    paddingVertical: 0,
    width: "100%",
    borderRadius: 8,
    marginTop: 12
  },
  controlButtonLabel: {
    fontWeight: "normal",
    fontSize: 16
  },

});

export default P2PPoolInfo
