import React, { Component } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native/index";
import {
  Text,
} from "react-native-ui-lib";
import {
  Header,
} from "../../../components";
import {
  CommonSend as CommonSendIcon,
  HeaderAccept as HeaderAcceptIcon
} from "../../../assets/icons";
import {
  EnteringAmount as EnteringAmountComponent
} from "./components";
import Share from "react-native-share";
import Notification from "../../../common/Notification";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import { getQrCodeUrl } from "../../../common/QrCode";
import Clipboard from "@react-native-clipboard/clipboard";
import EStyleSheet from "react-native-extended-stylesheet";
import currency_rank from "../../../constants/currency_rank";

class WalletCoinReceive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coin: {},

      amount: '',

      walletKey: props?.route?.params?.coinCode,

      isShowEnteringAmountComponent: false
    };
  }

  componentDidMount = () => {
    this.initState();
  };
  initState = () => {
    const coin = (this.props?.global?.wallet?.list || []).find((t) => t.code === this.state.walletKey) || {};

    this.setState({
      coin,
    });
  };

  onCopyAddress = async () => {
    await Clipboard.setString(this.state.coin?.address);
    Notification.send({
      type: "success",
      message: allTranslations(localization.walletCoinReceive.notificationSuccessCopy)
    })
  }
  onShareAddress = async () => {
    const options = {
      message: this.state.coin?.address
    };

    const data = await Share.open(options).then((res) => {
      return res
    }).catch((err) => {
      return { error: err }
    })

    if (data.error) {
      return null
    }

    Notification.send({
      type: "success",
      message: allTranslations(localization.walletCoinReceive.notificationSuccessShare)
    });
  }
  changeAmount = (amount) => {
    this.setState({
      amount,
      isShowEnteringAmountComponent: false
    })
  }

  _linkQrCode = () => {
    let link = [];

    if (this.state.amount > 0) {
      link.push(`amount=${ this.state.amount }`)
    }

    return `${ this.state.coin?.address }?${ link.join('&') }`
  }
  _routeGoBack = () => {
    this.props.navigation.goBack();
  }
  _renderHeaderRightContent = () => {
    return (
      <TouchableOpacity activeOpacity={0.6} onPress={this._routeGoBack}>
        <HeaderAcceptIcon/>
      </TouchableOpacity>
    )
  }
  _getCoinLabel = () => {
    const {
      coin
    } = this.state;

    let platform = "";
    if (coin.rank === currency_rank.MAIN_ETH || coin.rank === currency_rank.TOKEN_ETH || coin.rank === currency_rank.CUSTOM_TOKEN_ETH) {
      platform = "Ethereum";
    }
    if (coin.rank === currency_rank.MAIN_BNB || coin.rank === currency_rank.TOKEN_BNB || coin.rank === currency_rank.CUSTOM_TOKEN_BNB) {
      platform = "Smart Chain";
    }
    if (coin.rank === currency_rank.MAIN_POLYGON || coin.rank === currency_rank.TOKEN_POLYGON || coin.rank === currency_rank.CUSTOM_TOKEN_POLYGON) {
      platform = "Polygon Chain";
    }

    return Boolean(!!platform) ? `${ platform } (${ coin.code })` : coin.code
  }

  render() {
    const {
      coin,
      amount,

      isShowEnteringAmountComponent
    } = this.state;

    return (
      <View style={styles.root}>
        <Header
          hideLeft
          title={`${allTranslations(localization.walletCoinReceive.header)} ${coin.code}`}
          rightContent={this._renderHeaderRightContent}
        />

        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>

          <View style={{alignItems: "center", justifyContent: "center", marginBottom: 16}}>
            <View style={styles.qrCodeContainer}>
              <Image
                style={styles.qrCodeImage}
                source={{uri: getQrCodeUrl({data: this._linkQrCode(), size: 244})}}
              />
              <Text style={styles.qrCodeAddress}>
                {coin.address}
              </Text>
            </View>
          </View>

          <View>
            <Text style={styles.message}>
              {allTranslations(localization.walletCoinReceive.message, {
                coin: this._getCoinLabel()
              })}
            </Text>
          </View>

          <View style={styles.controls}>
            <TouchableOpacity style={[styles.controlButton]} onPress={this.onCopyAddress}>
              <Text style={styles.controlButtonLabel}>
                {allTranslations(localization.walletCoinReceive.buttonCopy)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.controlButton, {backgroundColor: '#8E8E8E'}]} onPress={() => this.setState({isShowEnteringAmountComponent: true})}>
              <Text style={styles.controlButtonLabel}>
                {allTranslations(localization.walletCoinReceive.buttonAmount)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.controlButton, {backgroundColor: '#8E8E8E', width: 44, flex: 0}]} onPress={this.onShareAddress}>
              <CommonSendIcon color="white"/>
            </TouchableOpacity>
          </View>

        </ScrollView>

        <EnteringAmountComponent
          open={isShowEnteringAmountComponent}
          amount={amount}

          onClose={() => this.setState({isShowEnteringAmountComponent: false})}
          onChange={this.changeAmount}
        />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F2F2F6",
  },

  scrollView: {
    flexGrow: 1,

    paddingHorizontal: 28,
    paddingVertical: 16,

    "@media (min-width: 400)": {
      paddingTop: 80
    }
  },

  qrCodeContainer: {
    backgroundColor: "white",
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    padding: 16,


    alignItems: "center",
    justifyContent: "center"
  },
  qrCodeImage: {
    width: 244,
    height: 244,
    marginBottom: 16
  },
  qrCodeAddress: {
    fontSize: 16,
    lineHeight: 23,
    color: "#8E8E8E",
    maxWidth: 200,
    textAlign: "center",
  },

  message: {
    fontSize: 14,
    lineHeight: 23,
    color: "#282828",
    textAlign: "center"
  },

  controls: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -12
  },
  controlButton:{
    height: 36,
    backgroundColor: "#282828",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    flex: 1,
    marginLeft: 12
  },
  controlButtonLabel: {
    fontSize: 14,
    lineHeight: 17,
    fontWeight: "500",
    color: "white"
  },
});

export default WalletCoinReceive;
