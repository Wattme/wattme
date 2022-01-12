import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native/index";
import {
  Button,
  Text,
} from "react-native-ui-lib";
import {
  CommonPlus as CommonPlusIcon
} from "../../../../../assets/icons";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { fiatCode, fiatConverter, fiatSymbol } from "../../../../../common/FiatsConverter";
import { convertorNumber } from "../../../../../helpers/convertor";

const { width } = Dimensions.get("window");
const sizeCard = (width - 24);

const ExchangeAccount = (props) => {

  const {
    profile,
    listKeys,
    currencies,
    userCurrencies,
    connectAccountTrading,

    navigation
  } = props;


  const [
    fiat,
    setFiat,
  ] = React.useState(userCurrencies?.[0] || "");


  const handleScrollEndDrag = ({ nativeEvent }) => {
    const sliderWidth = sizeCard - 32;
    const contentOffsetX = nativeEvent?.contentOffset?.x || 0;
    const activeDot = Math.floor(contentOffsetX / sliderWidth);
    const newFiat = (userCurrencies || [])?.[activeDot];

    if (fiat === newFiat) {
      return null;
    }

    setFiat(newFiat);
  };

  const _totalBalance = (fiatInit, isUsd = false) => {
    const accountBalances = profile?.balances || [];

    const WALLETS_BALANCE_LIST = (accountBalances || []).filter((t) => Boolean(Number.parseFloat(t.free) > 0 || Number.parseFloat(t.locked) > 0));
    const WALLET_BALANCE_USD = WALLETS_BALANCE_LIST.reduce(( value, item ) => {
      const CURRENCY = currencies.find(( t ) => t.code === item.asset) || {};

      if (Object.keys(CURRENCY).length <= 0) {
        return value
      }

      const BALANCE = ( Number.parseFloat(item?.free || '0') + Number.parseFloat(item?.locked || '0') ) * Number.parseFloat(CURRENCY.price_usd);

      return value + BALANCE
    }, 0);

    if (isUsd) {
      return WALLET_BALANCE_USD
    }

    return `${ fiatSymbol(fiatInit) } ${ convertorNumber(fiatConverter(WALLET_BALANCE_USD, fiatInit), 2, '.') }`
  }
  const _totalProfit = (fiatInit, isNumber) => {
    const accountBalances = profile?.balances || [];

    const WALLETS_BALANCE_LIST = (accountBalances || []).filter((t) => Boolean(Number.parseFloat(t.free) > 0 || Number.parseFloat(t.locked) > 0));

    return WALLETS_BALANCE_LIST.reduce(( value, item ) => {
      const CURRENCY = currencies.find(( t ) => t.code === item.asset) || {};

      if (Object.keys(CURRENCY).length <= 0) {
        return value
      }

      const BALANCE = ( Number.parseFloat(item?.free || '0') + Number.parseFloat(item?.locked || '0') ) * Number.parseFloat(CURRENCY.price_usd);
      const CHANGE_BALANCE = (BALANCE / 100) * Number.parseFloat(CURRENCY?.change_percent_24hr || '0');

      return value + CHANGE_BALANCE
    }, 0)
  }

  const _routeTradingAccount = () => {
    navigation.navigate("TradingAccount");
  }



  // Получение инфомарции для отображения профита
  const totalProfit = _totalProfit();
  const profitIcon = Boolean(totalProfit !== 0) ? Boolean(totalProfit < 0) ? "caret-down" : "caret-up" : "";
  const profitColor = Boolean(totalProfit !== 0) ? Boolean(totalProfit < 0) ? "#F5386A" : "#10B879" : "#8E8E8E";
  const walletImage = require("../../../../../assets/png/stock-exchange/binance.png");
  const activeKeyTrading = (listKeys || []).find((t) => Boolean(t.default));

  if (Object.keys(profile).length <= 0) {
    return (
      <ExchangeAccountNotConnect connectAccountTrading={connectAccountTrading}/>
    )
  }

  return (
    <View style={[styles.card, styles.cardFull]}>

      <TouchableOpacity style={styles.cardHead} activeOpacity={0.8} onPress={_routeTradingAccount}>
        <Text style={styles.cardHeadLabel}>
          {allTranslations(localization.dashboardHome.exchangeAccount.title)}
        </Text>
        <Text style={styles.cardHeadWalletName} numberOfLines={1}>
          { activeKeyTrading?.name || "" }
        </Text>
        <TouchableOpacity style={styles.buttonArrowRight} onPress={connectAccountTrading}>
          <CommonPlusIcon color="#282828" />
        </TouchableOpacity>
      </TouchableOpacity>

      <View style={styles.cardSeparate} />

      <View style={styles.cardBody}>

        <ScrollView
          style={styles.sliderFiat}
          scrollEventThrottle={160}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={handleScrollEndDrag}
        >
          {userCurrencies.map((currency, index) => {
            const totalProfit = _totalProfit(currency, true);
            const totalBalanceWallet = _totalBalance(currency);
            const totalProfitFiat = fiatConverter(totalProfit, currency);

            return (
              <TouchableOpacity key={`birga-slider-currency-${index}`} onPress={_routeTradingAccount} activeOpacity={1}>
                <View style={styles.sliderFiatCard}>
                  <Text style={styles.walletBalanceTotal}>{totalBalanceWallet}</Text>
                  <View style={styles.profit}>
                    <View style={styles.profitIcon}>
                      {Boolean(profitIcon) && (
                        <Icon
                          name={profitIcon}
                          color={profitColor}
                        />
                      )}
                    </View>
                    <Text style={[styles.profitLabel, { color: profitColor }]}>
                      { fiatSymbol(currency) } { convertorNumber(totalProfitFiat, 2, '.') } {allTranslations(localization.common.perDay)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

      </View>

      <View style={styles.sliderFiatPagination}>
        {userCurrencies.map((item, index) => (
          <View
            key={`birga-slider-fiat-dot-${index}`}
            style={[
              styles.sliderFiatPaginationDot,
              Boolean(item === fiat) && { backgroundColor: "black" },
            ]}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.walletImage} activeOpacity={0.8} onPress={_routeTradingAccount}>
        <Image
          source={walletImage}
          style={{ width: 26, height: 26 }}
          resizeMode="contain"
        />
      </TouchableOpacity>

    </View>
  );
}

const ExchangeAccountNotConnect = (props) => {

  const _routeBinanceConnection = () => {
    props.connectAccountTrading();
  }

  return (
    <View style={[styles.card, { padding: 16 }]}>

      <Text style={styles.cardTitle}>
        {allTranslations(localization.dashboardHome.exchangeAccount.titleNotConnection)}
        <Text style={{fontSize: 16, color: "#767676", fontWeight: "normal"}}> (API)</Text>
      </Text>

      <View style={styles.cardSeparate} />

      <Button
        label={allTranslations(localization.dashboardHome.walletAccount.buttonConnect)}
        style={{borderRadius: 14}}
        size="xsSmall"

        onPress={_routeBinanceConnection}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",

    paddingVertical: 16,
  },
  cardFull: {
    padding: 16,
  },

  cardTitle: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "500",
    color: "#000000",
  },
  cardSeparate: {
    marginVertical: 11,
    width: "100%",
    height: 2,
    backgroundColor: "#F9F9F9",
  },


  cardHead: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardBody: {},

  cardHeadLabel: {
    fontSize: 18,
    lineHeight: 21,
    color: "#000000",
    fontWeight: "500",
  },
  cardHeadWalletName: {
    flex: 1,
    fontSize: 16,
    lineHeight: 19,
    color: "#282828",
    marginLeft: 16,
  },

  sliderFiat: {
    width: sizeCard - 32,
  },
  sliderFiatCard: {
    width: (width - 24) - 32,
    paddingBottom: 16,
  },

  sliderFiatPagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -8,
  },
  sliderFiatPaginationDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#8E8E8E",
    marginLeft: 8,
  },

  walletBalanceTotal: {
    fontSize: 30,
    lineHeight: 36,
    color: "#000000",
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },

  profit: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  profitIcon: {
    width: 12,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  profitLabel: {
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 4,
  },

  walletImage: {
    position: "absolute",
    left: 16,
    bottom: 16,
    zIndex: 10,

    width: 36,
    height: 36,
    overflow: "hidden",
    backgroundColor: "#F7F7F7",

    borderRadius: 999,

    justifyContent: "center",
    alignItems: "center"
  },

  buttonArrowRight: {
    width: 32,
    height: 32,
    marginLeft: "auto",
  },
});

export default ExchangeAccount;
