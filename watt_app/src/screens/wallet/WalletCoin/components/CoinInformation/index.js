import React, { useState } from "react";
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  CommonArrowBottomCircle as CommonArrowBottomCircleIcon,
  CommonArrowTopCircle as CommonArrowTopCircleIcon
} from "../../../../../assets/icons";
import { convertorNumber } from "../../../../../helpers/convertor";
import { fiatConverter, fiatSymbol } from "../../../../../common/FiatsConverter";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import { getIconCurrency } from "../../../../../common/Images";
import currency_rank from "../../../../../constants/currency_rank";

const { width } = Dimensions.get("window");

const CoinInformation = (props) => {
  const {
    coin,
    currency,
    currencies,
    onRouteBlockChain,
    onBuyCoin,
    onRouteWalletCoinSend,
    onRouteWalletCoinReceive
  } = props;
  const [activeCurrency, setActiveCurrency] = useState(currencies[0]);
  const currencyPriceUsd = (currency?.price_usd || '0');
  const coinPriceUsd = Number.parseFloat(coin?.indivisibleBalance || '0') * currencyPriceUsd;
  const changePercent24hr = Number.parseFloat(currency?.change_percent_24hr || '0');
  const profitColor = Boolean(changePercent24hr === 0) ? "#8E8E8E" : Boolean(changePercent24hr > 0) ? "#10B879" : "#F5386A";
  const iconCurrency = Boolean(coin?.logoURI) ? coin?.logoURI : getIconCurrency(coin.code);

  const handleScrollEndDrag = ({ nativeEvent }) => {
    const sliderWidth = width - 56;
    const contentOffsetX = nativeEvent?.contentOffset?.x || 0;
    const activeIndex = Math.floor(contentOffsetX / sliderWidth);

    const newActiveCurrency = currencies[activeIndex];

    if (activeCurrency === newActiveCurrency) {
      return null
    }

    setActiveCurrency(newActiveCurrency);
  }

  const _getPercentValue = (changePercent24hr) => {
    if (typeof changePercent24hr !== "number") {
      return changePercent24hr
    }

    return Math.abs(changePercent24hr)
  }
  const _network = () => {
    const {
      rank
    } = coin;

    if (rank === currency_rank.MAIN_BNB || rank === currency_rank.TOKEN_BNB || rank === currency_rank.CUSTOM_TOKEN_BNB) {
      return "BEP-20"
    }
    if (rank === currency_rank.MAIN_ETH || rank === currency_rank.TOKEN_ETH || rank === currency_rank.CUSTOM_TOKEN_ETH) {
      return "ERC-20"
    }
    if (rank === currency_rank.MAIN_POLYGON || rank === currency_rank.TOKEN_POLYGON || rank === currency_rank.CUSTOM_TOKEN_POLYGON) {
      return "Polygon"
    }

    return ""
  }

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.coinType}>
          { _network() }
        </Text>
        <View style={styles.coinInformation}>
          <Text style={styles.coinInformationPrice}>
            {convertorNumber(fiatConverter(currencyPriceUsd || '0', activeCurrency), 2, ',')} {fiatSymbol(activeCurrency)}
          </Text>
          <View style={styles.coinInformationProfit}>
            <View style={styles.coinInformationProfitIcon}>
              <Icon
                name={Boolean(changePercent24hr > 0) ? "caret-up" : "caret-down"}
                style={{color: profitColor , fontSize: 14}}
              />
            </View>
            <Text style={[styles.coinInformationProfitValue, {color: profitColor}]}>{convertorNumber(_getPercentValue(changePercent24hr), 2, ',')}%</Text>
          </View>
        </View>
      </View>
      <View style={styles.arrow}/>
      <View style={styles.body}>
        <View style={styles.bodyHead}>
          <TouchableOpacity style={styles.buttonSmall} activeOpacity={0.6} onPress={onBuyCoin}>
            <Text style={styles.buttonSmallLabel}>
              { allTranslations(localization.walletCoin.buttonBuy) }
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSmall} activeOpacity={0.6} onPress={onRouteBlockChain}>
            <Text style={styles.buttonSmallLabel}>
              {allTranslations(localization.walletCoin.buttonInformation)}
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <ScrollView
            scrollEventThrottle={160}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            snapToEnd={false}
            snapToInterval={(width - 56)}

            onMomentumScrollEnd={handleScrollEndDrag}
          >
            {(currencies || []).map((item, idx) => (
              <View key={`currencies-${idx}-dot`} style={styles.bodyCenter}>
                <View style={styles.walletIcon}>
                  <Image source={{uri: iconCurrency}} style={{flex: 1}}/>
                </View>
                <Text style={styles.walletBalance}>
                  {convertorNumber(coin.printedBalance || '0', 8, ',')} {coin.code}
                </Text>
                <Text style={styles.walletBalanceFiat}>
                  ≈ {convertorNumber(fiatConverter(coinPriceUsd || '0', item), 2, ',')} {fiatSymbol(item)}
                </Text>
              </View>
            ))}
          </ScrollView>

          {Boolean((currencies || []).length > 1) && (
            <View style={styles.currenciesPagination}>
              {(currencies || []).map((item, idx) => (
                <View key={`pagination-dot-${idx}`} style={[
                  styles.currenciesPaginationItem,
                  Boolean(item === activeCurrency) && styles.currenciesPaginationItemActive
                ]}/>
              ))}
            </View>
          )}
        </View>

        <View style={styles.bodyFooter}>
          <TouchableOpacity style={[styles.buttonControl, {backgroundColor: "#F5386A"}]} activeOpacity={0.6} onPress={onRouteWalletCoinSend}>
            <CommonArrowTopCircleIcon color="white"/>
            <Text style={styles.buttonControlLabel}>{allTranslations(localization.walletCoin.buttonSend)}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonControl, {backgroundColor: "#10B879"}]} activeOpacity={0.6} onPress={onRouteWalletCoinReceive}>
            <CommonArrowBottomCircleIcon color="white"/>
            <Text style={styles.buttonControlLabel}>{allTranslations(localization.walletCoin.buttonReceive)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14
  },

  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 15,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  arrow: {
    height: 2,
    backgroundColor: "#F9F9F9"
  },
  body: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 19
  },

  coinType: {
    fontSize: 16,
    lineHeight: 19,
    color: "#8E8E8E",
    fontWeight: "300"
  },

  coinInformation: {
    flexDirection: "row",
    alignItems: "center",
  },
  coinInformationPrice: {
    fontSize: 13,
    lineHeight: 16,
    color: "#8E8E8E"
  },
  coinInformationProfit: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 4
  },
  coinInformationProfitIcon: {
    marginRight: 5,
    width: 12,
    height: 16,
    flexDirection: "row",
    alignItems: "center"
  },
  coinInformationProfitValue: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "500"
  },

  bodyHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16
  },
  bodyCenter: {
    alignItems: "center",
    justifyContent: "center",
    width: (width - 56)
  },
  bodyFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 17,
    marginLeft: -12
  },

  buttonSmall: {
    paddingHorizontal: 7.5,
    paddingVertical: 3.5,
    borderRadius: 8,
    backgroundColor: "#F7F7F7"
  },
  buttonSmallLabel: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E"
  },

  walletIcon: {
    width: 56,
    height: 56,
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 16
  },
  walletBalance: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "600",
    textAlign: "center",
    color: "black",
    marginBottom: 8
  },
  walletBalanceFiat: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#8E8E8E"
  },


  currenciesPagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    marginLeft: -8
  },
  currenciesPaginationItem: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#8E8E8E",
    marginLeft: 8
  },
  currenciesPaginationItemActive: {
    backgroundColor: "#000000"
  },

  buttonControl: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
    flex: 1,
    marginLeft: 12,

    height: 36,
    borderRadius: 8
  },
  buttonControlLabel: {
    fontSize: 16,
    lineHeight: 19,
    color: "white",
    marginLeft: 4
  },
  buttonControlIcon: {}
});

export default CoinInformation
