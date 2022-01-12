import React, { Component } from "react";
import {
  View,
  Image,
  Linking,
  StyleSheet,
  ScrollView,
} from "react-native/index";
import {
  Text,
  Button,
} from "react-native-ui-lib";
import {
  Header,
  VirtualKeyboard,
  BlockErrorInformation
} from "../../../components";
import {
  DialInformation as DialInformationComponent
} from "./components";
import { convertorNumber } from "../../../helpers/convertor";
import { fiatSymbol } from "../../../common/FiatsConverter";
import { getCurrenciesQuote, getCurrency, getPriceCurrencyBuy } from "../../../utils/moon-pay/currency";
import { mask } from "react-native-text-input-mask";
import Notification from "../../../common/Notification";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import settings from "../../../constants/settings";
import EStyleSheet from "react-native-extended-stylesheet";
import crypto from "crypto";

class WalletBuyCrypto extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coin: props?.route?.params?.coin || {},
      currencyQuotes: {},
      currencyInformation: {},

      amount: "0",

      isLoadQuote: false,

      isInitialization: true,
      isDialInformation: false,
      isCurrencyNotFound: false,
    };
  }

  componentDidMount = async () => {
    await this.initializationInfo();
  };

  initializationInfo = async () => {
    // TODO Разработать лошику инициализации

    await this.getPriceBuyCurrency();
  }

  getPriceBuyCurrency = async () => {
    const { coin } = this.state;
    const currencyQuotes = await getPriceCurrencyBuy({ currencyCode: (this._getCoinCode() || "").toLowerCase() });

    if (!currencyQuotes || currencyQuotes?.error) {
      this.setState({ isCurrencyNotFound: true });

      return null
    }

    await this.setState({
      currencyQuotes
    });

    await this.getCurrency();
  }
  getCurrency = async () => {
    const { coin } = this.state;
    const data = await getCurrency();
    const item = ( data || [] ).find((t) => t.code === (this._getCoinCode() || '').toLowerCase());

    this.setState({
      currencyInformation: item || {}
    })
  }
  changeAmount = async (initValue) => {
    const value = await mask("[99999999999999].[999]", initValue, true);

    await this.setState({ amount: value });
  }

  onCreateDeal = async () => {
    const { fiat } = this.props?.global || {};

    this.setState({ isLoadQuote: true });

    let linkParams = [
      `apiKey=${ settings.moonPayApikey }`,
      `currencyCode=${ this.state.coin.code }`,
      `walletAddress=${ this.state.coin.address }`,
      `colorCode=%23282828`,
      `areFeesIncluded=true`,
      `currencyCode=${ fiat || 'USD' }`,

      `baseCurrencyCode=${ (fiat || 'USD').toLowerCase() }`,
      `baseCurrencyAmount=${ this.state.amount }`,
    ];
    const transaction = await getCurrenciesQuote({ search: linkParams.join('&'), currencyCode: (this._getCoinCode() || "").toLowerCase() })

    this.setState({ isLoadQuote: false });

    if (transaction?.error) {

      Notification.send({
        message: transaction?.error?.data?.message,
        type: "danger"
      });

      return null
    }

    this.setState({
      isDialInformation: true,
      dialInformation: transaction
    });
  }
  onBuy = async () => {
    const { fiat } = this.props?.global || {};

    let linkParams = [
      `apiKey=${ settings.moonPayApikey }`,
      `currencyCode=${ this.state.coin.code }`,
      `walletAddress=${ this.state.coin.address }`,
      `colorCode=%23282828`,
      `currencyCode=${ fiat || 'USD' }`,

      `baseCurrencyCode=${ (fiat || 'USD').toLowerCase() }`,
      `baseCurrencyAmount=${ this.state.amount }`,
    ];

    const linkMoonPay = `https://buy.moonpay.com?${linkParams.join('&')}`;

    const sign = crypto
      .createHmac('sha256', settings.moonPaySecretKey)
      .update(new URL(linkMoonPay).search)
      .digest('base64');

    await Linking.openURL(`${ linkMoonPay }&signature=${ encodeURIComponent(sign) }`);
  }

  _headerTitle = () => {
    return `${allTranslations(localization.walletBuyCrypto.headerTitle)} ${this.state?.coin?.name}`;
  };
  _fiatAmount = () => {
    const { amount, currencyQuotes } = this.state;
    const { fiat } = this.props?.global || {};
    const currencyQuotesFiat = currencyQuotes[fiat || 'USD'] || 0;
    const fiatAmount = Number.parseFloat(amount) / currencyQuotesFiat;

    return convertorNumber(fiatAmount, 8, ',');
  }

  _routeGoBack = () => {
    this.props.navigation.goBack();
  }


  _getCoinCode = () => {
    const { coin } = this.state;

    let initialCoinCode = coin?.code;

    return initialCoinCode
  }

  render() {
    const {
      coin,
      dialInformation,

      amount,

      isDialInformation,
      isCurrencyNotFound
    } = this.state;
    const {
      fiat
    } = this.props?.global || {};

    return (
      <View style={styles.root}>
        <Header title={this._headerTitle()} />

        {

          Boolean(!isCurrencyNotFound) ? (
            <>

              <ScrollView contentContainerStyle={styles.scrollView}>

                <View style={styles.sectionAmount}>
                  <Text style={styles.amount}>
                    { fiatSymbol(fiat) } { convertorNumber(amount, 0, '') }
                  </Text>
                  <Text style={styles.amountFiat}>
                    ≈ { this._fiatAmount() } { coin?.code }
                  </Text>
                </View>

                <View style={styles.provider}>
                  <View style={styles.providerImage}>
                    <Image
                      style={{width: 44, height: 44}}
                      source={require("../../../assets/png/providers-buy-crypto/moon-pay.png")}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.providerBody}>
                    <Text style={styles.providerName}>MoonPay</Text>
                    <Text style={styles.providerDescription}>Сторонний поставщик</Text>
                  </View>
                  <View style={styles.providerRight}></View>
                </View>

                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                  <View style={styles.containerKeyboard}>
                    <VirtualKeyboard
                      color='black'
                      pressMode='string'

                      onPress={this.changeAmount}

                      isUseDecimal={false}
                      rowStyle={styles.keyboardRowStyle}
                      cellStyle={styles.keyboardCellStyle}
                    />
                  </View>
                </View>

              </ScrollView>

              <View style={styles.footer}>
                <Button
                  disabled={!amount}
                  label={allTranslations(localization.common.further)}
                  onPress={this.onCreateDeal}
                />
              </View>

            </>
          ) : (

            <BlockErrorInformation
              message={allTranslations(localization.walletBuyCrypto.currencyNotFound)}
              onClose={this._routeGoBack}
            />

          )

        }

        <DialInformationComponent
          open={isDialInformation}
          dialInformation={dialInformation}

          onBuy={this.onBuy}
          onClose={() => this.setState({ isDialInformation: false })}
        />

      </View>
    );
  }
}

const styles = EStyleSheet.create({
  root: {
    backgroundColor: "#F2F2F6",
    flex: 1,
  },

  scrollView: {
    flexGrow: 1,
    padding: 12,
  },

  sectionAmount: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingVertical: 24,
    maxHeight: 240
  },
  amount: {
    fontSize: 40,
    lineHeight: 48,
    fontWeight: "600",
    textAlign: "center"
  },
  amountFiat: {
    marginTop: 16,

    fontSize: 20,
    lineHeight: 24,
    color: "#8E8E8E",
    textAlign: "center"
  },

  provider: {
    marginTop: 12,

    flexDirection: "row",
    alignItems: "center",

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,
    backgroundColor: "white",

    padding: 16
  },
  providerImage: {
    height: 44,
    width: 44
  },
  providerBody: {
    paddingHorizontal: 16
  },
  providerRight: {},
  providerName: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828",
    fontWeight: "500",

    marginBottom: 8
  },
  providerDescription: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E"
  },

  containerKeyboard: {
    width: "100%",
    maxWidth: 244,
    marginTop: 24,
    marginBottom: -12
  },
  keyboardRowStyle: {
    marginBottom: 12,
    marginLeft: -24,
    marginTop: 0
  },
  keyboardCellStyle: {
    minWidth: 50,
    width: 50,
    height: 50,
    marginLeft: 24
  },

  footer: {
    marginTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 12,

    "@media (min-width: 400)": {
      marginTop: 32,
      paddingBottom: 20,
    }
  },
});

export default WalletBuyCrypto;
