import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native/index";
import {
  Text,
} from "react-native-ui-lib";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  CommonPlus as CommonPlusIcon,
} from "../../assets/icons";
import { fiatConverter, fiatSymbol } from "../../common/FiatsConverter";
import { convertorNumber } from "../../helpers/convertor";
import allTranslations from "../../localization/allTranslations";
import localization from "../../localization/localization";
import EStyleSheet from "react-native-extended-stylesheet";
import FastImage from "react-native-fast-image";

const { width } = Dimensions.get("window");
const sizeCard = (width - 24);

class WalletInformationCard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fiat: (props?.userCurrencies || [])?.[0] || "",
    };
  }

  onScrollEndDrag = ({ nativeEvent }) => {
    const sliderWidth = sizeCard;
    const contentOffsetX = nativeEvent?.contentOffset?.x || 0;
    const activeDot = Math.floor(contentOffsetX / sliderWidth);
    const fiat = (this.props?.userCurrencies || [])?.[activeDot];

    if (this.state.fiat === fiat) {
      return null;
    }

    this.setState({ fiat });
  };

  _totalBalanceWallet = () => {
    const { wallet, currencies } = this.props;

    const balanceUsd = (wallet?.list || [])
      .map((coin) => {
        const indivisibleBalance = Number.parseFloat(coin?.indivisibleBalance || "0");
        const currencyBalance = Number.parseFloat((currencies || []).find((t) => t.code === coin.code)?.price_usd || "0");

        return indivisibleBalance * currencyBalance;
      })
      .reduce((value, item) => {
        return value + item;
      }, 0);
    const fiatBalance = fiatConverter(balanceUsd, this.state.fiat);

    return `${fiatSymbol(this.state.fiat)} ${convertorNumber(fiatBalance, 2, ".")}`;
  };
  _totalProfileWallet = (fiat = this.state.fiat) => {
    const { wallet, currencies } = this.props;
    const profitUsd = (wallet?.list || [])
      .map((coin) => {
        const currency = (currencies || []).find((t) => t.code === coin.code);
        const currencyUsd = Number.parseFloat(currency?.price_usd || "0");
        const coinAmountUsd = Number.parseFloat(coin?.indivisibleBalance || "0") * Number.parseFloat(currency?.price_usd || "0");
        const percentChange24Hours = Number.parseFloat(currency?.change_percent_24hr || 0);

        return (coinAmountUsd / 100) * percentChange24Hours;
      })
      .reduce((value, item) => {
        return value + item;
      }, 0);
    const profitFiat = convertorNumber(fiatConverter(profitUsd, fiat), 2, ".");

    return {
      totalProfit: Number.parseFloat(profitFiat),
      totalProfitMessage: `${Math.abs(profitFiat)} ${fiatSymbol(fiat)} ${allTranslations(localization.walletInformationCard.profitDay)}`,
    };
  };

  render() {
    const {
      wallet,

      userCurrencies,

      onPressCoinManagement,
      onPressChoosingWallet,
    } = this.props;
    const { totalProfit, totalProfitMessage } = this._totalProfileWallet();
    const profitIcon = Boolean(totalProfit !== 0) ? Boolean(totalProfit < 0) ? "caret-down" : "caret-up" : "";
    const profitColor = Boolean(totalProfit !== 0) ? Boolean(totalProfit < 0) ? "#F5386A" : "#10B879" : "#8E8E8E";
    const walletImage = wallet?.image || "";

    return (
      <View style={styles.root}>
        <View style={styles.body}>
          <View style={styles.header}>
            <View style={styles.userAvatar}>
              {!Boolean(walletImage) ? (
                <FastImage
                  source={require("../../assets/png/wallet/wallet-image-pug-white.png")}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="contain"
                />
              ) : (
                <FastImage
                  source={{ uri: walletImage }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="contain"
                />
              )}
            </View>
            <TouchableOpacity style={{ flex: 1, justifyContent: "center" }} onPress={onPressCoinManagement}>
              <Text style={styles.walletName} numberOfLines={1}>
                {wallet.label}
              </Text>
            </TouchableOpacity>
            <View style={{ width: 48, alignItems: "flex-end" }}>
              <TouchableOpacity onPress={onPressChoosingWallet}>
                <CommonPlusIcon color="#8E8E8E" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.walletBalance}>
            {this._totalBalanceWallet()}
          </Text>
        </View>

        <ScrollView
          scrollEventThrottle={160}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}

          onMomentumScrollEnd={this.onScrollEndDrag}
        >
          {(userCurrencies || []).map((currency, idx) => (
            <View key={`user-currency-${currency}-${idx}`} style={{ width: sizeCard }}>
              <View style={styles.footer}>
                <View style={styles.footerLeft}>
                  <View style={styles.totalProfit}>
                    {Boolean(profitIcon) && (
                      <View style={styles.totalProfitIcon}>
                        <Icon
                          name={profitIcon}
                          color={profitColor}
                        />
                      </View>
                    )}
                    <Text style={[
                      styles.totalProfitName,
                      {
                        color: profitColor,
                      },
                    ]}>
                      {this._totalProfileWallet(currency)?.totalProfitMessage}
                    </Text>
                  </View>

                  {Boolean((userCurrencies || []).length > 1) && (
                    <View style={styles.fiatPagination}>
                      {(userCurrencies || []).map((item, idx) => (
                        <View
                          key={`userCurrencies-${idx}`}
                          style={[
                            styles.fiatPaginationDot,
                            Boolean(this.state.fiat === item) && styles.fiatPaginationDotActive,
                          ]}
                        />
                      ))}
                    </View>
                  )}
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  root: {
    backgroundColor: "#282828",
    borderRadius: 14,
    overflow: "hidden",
  },
  body: {
    padding: 16,
    paddingBottom: 0,
    zIndex: 2,

    "@media (min-width: 400)": {
      paddingBottom: 14,
    },
  },

  footer: {
    position: "relative",
    paddingTop: 12,
    paddingBottom: 21,
    alignItems: "center",
    zIndex: 5,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12
  },

  userAvatar: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "white",
    borderRadius: 999,
    overflow: "hidden",

    "@media (min-width: 400)": {
      width: 56,
      height: 56,
    },
  },

  walletName: {
    fontSize: 18,
    lineHeight: 21,
    color: "white",
    fontWeight: "500",
    marginLeft: 21,
    textAlign: "center",

    "@media (min-width: 400)": {
      fontSize: 22,
      lineHeight: 26,
      marginLeft: 24,
    },
  },
  walletBalance: {
    fontSize: 30,
    lineHeight: 36,
    color: "white",
    fontWeight: "600",
    textAlign: "center"
  },

  totalProfit: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalProfitIcon: {
    width: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
  },
  totalProfitName: {
    fontSize: 14,
    lineHeight: 17,

    "@media (min-width: 400)": {
      fontSize: 16,
      lineHeight: 19,
    },
  },

  fiatPagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    marginLeft: -8,
  },
  fiatPaginationDot: {
    width: 6,
    height: 6,
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    marginLeft: 8,
  },
  fiatPaginationDotActive: {
    backgroundColor: "#F6D962",
  },

  backgroundImage: {
    width: 124,
    height: 124,

    position: "absolute",
    right: -24,
    bottom: -24,

    "@media (min-width: 400)": {
      width: 194,
      height: 194,

      right: -26,
      bottom: -60,
    },
  },
  backgroundImageNotPagination: {
    bottom: -35,

    "@media (min-width: 400)": {
      right: -26,
      bottom: -75,
    },
  },

  containerFooter: {
    position: "relative",
    zIndex: 5,
  },
  containerFooterImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
});

export default WalletInformationCard;
