import React from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,

  Animated
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  CommonPlus as CommonPlusIcon,
} from "../../assets/icons";

import Icon from "react-native-vector-icons/FontAwesome5";
import { fiatConverter, fiatSymbol } from "../../common/FiatsConverter";
import { convertorNumber } from "../../helpers/convertor";
import allTranslations from "../../localization/allTranslations";
import localization from "../../localization/localization";
import getHeightStatusBar from "../../helpers/getHeightStatusBar";

const { width } = Dimensions.get("window");
const widthBody = (width - 56);
const heightStatusBar = getHeightStatusBar();

class WalletInformationCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fiat: props?.userCurrencies?.[0] || "USD",
    };
  }

  onScrollEndDrag = ({ nativeEvent }) => {
    const sliderWidth = widthBody;
    const contentOffsetX = nativeEvent?.contentOffset?.x || 0;
    const activeDot = Math.floor(contentOffsetX / sliderWidth);
    const fiat = (this.props?.userCurrencies || [])?.[activeDot];

    if (this.state.fiat === fiat) {
      return null;
    }

    this.setState({ fiat });
  };

  _totalBalance = ({ isNumber } = {}) => {
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

    if (isNumber) {
      return balanceUsd;
    }

    const balanceFiat = fiatConverter(balanceUsd, this.state.fiat, 4);

    return `${fiatSymbol(this.state.fiat)} ${convertorNumber(balanceFiat, 2, ".")}`;
  };
  _totalProfit = ({ isNumber } = {}) => {
    const { wallet, currencies } = this.props;
    const profitUsd = (wallet?.list || [])
      .map((coin) => {
        const currency = (currencies || []).find((t) => t.code === coin.code);
        const coinAmountUsd = Number.parseFloat(coin?.indivisibleBalance || "0") * Number.parseFloat(currency?.price_usd || "0");
        const percentChange24Hours = Number.parseFloat(currency?.change_percent_24hr || 0);

        return (coinAmountUsd / 100) * percentChange24Hours;
      })
      .reduce((value, item) => {
        return value + item;
      }, 0);

    if (isNumber) {
      return profitUsd;
    }

    const profitFiat = fiatConverter(profitUsd, this.state.fiat, 10);

    return `${convertorNumber(profitFiat, 2, ".")} ${fiatSymbol(this.state.fiat)} ${allTranslations(localization.walletInformationCard.profitDay)}`;
  };

  _heightHead = () => {
    return this.props.scrollY.interpolate({
      inputRange: [-60, 0, 120],
      outputRange: [120, 60, 0],
      extrapolate: 'clamp',
      useNativeDriver: true
    });
  }
  _paddingHead = () => {
    return this.props.scrollY.interpolate({
      inputRange: [-12, 0, 24],
      outputRange: [24, 12, 0],
      extrapolate: 'clamp',
      useNativeDriver: true
    });
  }
  _heightFooter = () => {
    return this.props.scrollY.interpolate({
      inputRange: [-48, 0, 96],
      outputRange: [96, 48, 0],
      extrapolate: 'clamp',
      useNativeDriver: true
    });
  }

  render() {
    const {
      wallet,
      userCurrencies,

      onPressCoinManagement,
      onPressChoosingWallet
    } = this.props;
    const totalProfit = this._totalProfit({ isNumber: true });
    const profitIcon = Boolean(totalProfit !== 0) ? Boolean(totalProfit < 0) ? "caret-down" : "caret-up" : "";
    const profitColor = Boolean(totalProfit !== 0) ? Boolean(totalProfit < 0) ? "#F5386A" : "#10B879" : "#8E8E8E";

    return (
      <View style={styles.card}>

        <Animated.View
          style={[
            styles.head,
            {
              height: this._heightHead(),
              paddingBottom: this._paddingHead()
            }
          ]}
        >
          <View style={styles.headSideContent}>
            <View style={styles.walletAvatar}>
              <Image
                source={Boolean(wallet?.image) ? { uri: wallet?.image } : require("../../assets/png/user/pug.png")}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </View>
          </View>
          <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center" }} onPress={onPressChoosingWallet} activeOpacity={0.8}>
            <Text style={styles.walletName} numberOfLines={1}>
              {wallet?.label || ""}
            </Text>
          </TouchableOpacity>
          <View style={[styles.headSideContent, { alignItems: "flex-end" }]}>
            <TouchableOpacity style={styles.buttonAddWallet} onPress={onPressCoinManagement} activeOpacity={0.8}>
              <CommonPlusIcon color="#8E8E8E" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        <View style={styles.body}>
          <Text style={styles.walletTotalBalance}>
            {this._totalBalance()}
          </Text>
        </View>

        <ScrollView
          scrollEventThrottle={160}

          horizontal={true}
          pagingEnabled={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}

          onMomentumScrollEnd={this.onScrollEndDrag}
        >

          {(userCurrencies || []).map((fiat, index) => (
            <Animated.View
              key={`userCurrencies-${index }`}
              style={[
                { width: widthBody },
                { height: this._heightFooter() }
              ]}
            >
              <View style={styles.footer}>
                <View style={styles.profit}>
                  <View style={styles.profitIcon}>
                    <Icon
                      name={profitIcon}
                      color={profitColor}
                    />
                  </View>
                  <Text style={[styles.profitLabel, { color: profitColor }]}>
                    {this._totalProfit()}
                  </Text>
                </View>

                <View style={styles.fiatPagination}>
                  {(userCurrencies || []).map((fiat, index) => (
                    <View
                      style={[
                        styles.fiatPaginationDot,
                        Boolean(fiat === this.state.fiat) && {backgroundColor: "#F6D962"}
                      ]}
                      key={`fiatPagination-dot-${index}`}
                    />
                  ))}
                </View>
              </View>

            </Animated.View>
          ))}

        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    left: 12,
    top: heightStatusBar + 12,
    right: 12,
    zIndex: 999,

    backgroundColor: "#282828",
    borderRadius: 14,
    padding: 16,
  },

  head: {
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    paddingBottom: 12
  },
  body: {
    // marginTop: 12,
  },
  footer: {
    marginTop: 12,
  },

  headSideContent: {
    width: 48,
  },
  walletName: {
    fontSize: 22,
    lineHeight: 26,
    color: "#FFFFFF",
    fontWeight: "500",
    textAlign: "center",
    paddingHorizontal: 8,
  },
  walletAvatar: {
    width: 48,
    height: 48,
    borderRadius: 999,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#8E8E8E",
    overflow: "hidden",
  },
  walletTotalBalance: {
    fontSize: 30,
    lineHeight: 36,
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },

  buttonAddWallet: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },


  profit: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  profitIcon: {
    width: 12,
    height: 20,
    marginRight: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  profitLabel: {
    fontSize: 16,
    lineHeight: 19,
  },


  fiatPagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -8,
    marginTop: 10,
  },
  fiatPaginationDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#F7F7F7",
    marginLeft: 8,
  },
});

export default WalletInformationCard;
