import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native/index";
import {
  Text,
  Button,
} from "react-native-ui-lib";
import {
  CommonInfo as CommonInfoIcon
} from "../../../../../assets/icons";
import localization from "../../../../../localization/localization";
import allTranslations from "../../../../../localization/allTranslations";
import { _balanceTokenBNB } from "../../../../../sheduler/balance";
import { convertorNumber } from "../../../../../helpers/convertor";

class P2PPoll extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      balanceUsd: 0,
      balanceWatt: 0,
    };
  }

  componentDidMount = async () => {
    await this.initState();
  }

  initState = async () => {
    await this.getBalances();
  }

  getBalances = async () => {
    const p2pPool = this.props.walletImportInfo?.p2pPool || {};

    const balanceUsd = await _balanceTokenBNB(p2pPool?.addressCheckBalance, p2pPool?.addressContractBusd);
    const balanceWatt = await _balanceTokenBNB(p2pPool?.addressCheckBalance, p2pPool?.addressContractWatt);

    this.setState({
      balanceUsd,
      balanceWatt
    })
  }



  _balanceUsd = () => {
    const balanceUsd = this.state.balanceUsd || 0;

    return Math.floor((balanceUsd) * 100) / 100
  }
  _balanceWatt = () => {
    const balanceWatt = this.state.balanceWatt || 0;

    return Math.floor((balanceWatt) * 100) / 100
  }

  render() {
    const {
      routeTokenWattTopUp,
      routeTokenWattBusdTopUp,

      openP2pInfo
    } = this.props;
    const {
      balanceUsd,
      balanceWatt
    } = this.state;

    return (
      <View style={styles.root}>

        <View style={styles.head}>
          <TouchableOpacity style={styles.buttonHead} onPress={openP2pInfo}>
            <CommonInfoIcon color="#8E8E8E" />
          </TouchableOpacity>
          <Text style={styles.smallLabel}>
            {allTranslations(localization.tokenWattBuyingToken.p2PPoll.label)}
          </Text>
          <TouchableOpacity style={styles.buttonHead}>
            {/*<CommonArrowRightIcon color="#282828" />*/}
          </TouchableOpacity>
        </View>

        <View style={styles.body}>

          <Text style={styles.balanceUse}>{ this._balanceUsd() } USD</Text>

          <View style={{ marginTop: 12 }}/>

          <Text style={styles.smallLabel}>{ allTranslations(localization.tokenWattBuyingToken.p2PPoll.coins) }</Text>

          <View style={{ marginTop: 8 }}/>

          <Text style={styles.balanceWatt}>{ this._balanceWatt() } WATT</Text>

        </View>

        {Boolean(true) && (
          <View style={styles.footer}>

            <View style={styles.control}>
              <Text style={styles.controlLabel} numberOfLines={1}>
                { allTranslations(localization.tokenWattBuyingToken.p2PPoll.addressBuy) }
              </Text>
              <Button
                label={allTranslations(localization.tokenWattBuyingToken.p2PPoll.buttonBuy)}
                style={styles.controlButton}
                labelStyle={styles.controlButtonLabel}
                color="secondary"
                onPress={routeTokenWattBusdTopUp}
              />
            </View>

            <View style={styles.control}>
              <Text style={styles.controlLabel} numberOfLines={1}>
                { allTranslations(localization.tokenWattBuyingToken.p2PPoll.addressTopUp) }
              </Text>
              <Button
                label={allTranslations(localization.tokenWattBuyingToken.p2PPoll.buttonTopUp)}
                style={styles.controlButton}
                labelStyle={styles.controlButtonLabel}
                onPress={routeTokenWattTopUp}
              />
            </View>

          </View>
        )}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,

    backgroundColor: "white",

    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },


  head: {
    flexDirection: "row",
    alignItems: "center",
  },
  body: {
    marginBottom: 16
  },
  footer: {
    flexDirection: "row",
    marginLeft: -12
  },

  buttonHead: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },

  smallLabel: {
    flex: 1,
    fontSize: 13,
    lineHeight: 16,
    color: "#8E8E8E",
    textAlign: "center",
  },
  balanceUse: {
    fontSize: 30,
    lineHeight: 36,
    color: "#10B879",
    fontWeight: "600",
    textAlign: "center"
  },
  balanceWatt: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828",
    fontWeight: "500",
    textAlign: "center"
  },

  control: {
    flex: 1,
    marginLeft: 12
  },
  controlLabel: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E",
    textAlign: "center",
    marginBottom: 12
  },
  controlButton: {
    height: 36,
    borderRadius: 8,
    paddingVertical: 0,
    paddingHorizontal: 6
  },
  controlButtonLabel: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "normal"
  },

});

export default P2PPoll;
