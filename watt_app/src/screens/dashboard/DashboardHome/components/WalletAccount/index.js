import React from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native/index";
import {
  Text,
  Button,
} from "react-native-ui-lib";
import {
  CommonArrowRight as CommonArrowRightIcon,
} from "../../../../../assets/icons";
import Icon from "react-native-vector-icons/FontAwesome5";
import { convertorNumber } from "../../../../../helpers/convertor";
import { fiatConverter, fiatSymbol } from "../../../../../common/FiatsConverter";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import { compose } from "recompose";
import { connect } from "react-redux";
import { updateAccount } from "../../../../../state/GlobalState";

const { width } = Dimensions.get("window");
const sizeCard = (width - 24);


const WalletAccount = (props) => {

  const {
    wallet,
    currencies,
    userCurrencies,
    openInformationCreatWallet,
    routeWalletDashboard
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


  const _totalBalanceWallet = (initFiat = fiat) => {
    const balanceUsd = (wallet?.list || [])
      .map((coin) => {
        const indivisibleBalance = Number.parseFloat(coin?.indivisibleBalance || "0");
        const currencyBalance = Number.parseFloat((currencies || []).find((t) => t.code === coin.code)?.price_usd || "0");

        return indivisibleBalance * currencyBalance;
      })
      .reduce((value, item) => {
        return value + item;
      }, 0);

    const fiatBalance = fiatConverter(balanceUsd, initFiat);

    return `${fiatSymbol(initFiat)} ${convertorNumber(fiatBalance, 2, ".")}`;
  }
  const _totalProfit = (initFiat = fiat) => {

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

    const profitFiat = convertorNumber(fiatConverter(profitUsd, initFiat), 2, ".");

    return {
      totalProfit: Number.parseFloat(profitFiat),
      totalProfitMessage: `${Math.abs(profitFiat)} ${fiatSymbol(initFiat)} ${allTranslations(localization.walletInformationCard.profitDay)}`,
    };
  }



  // Получение инфомарции для отображения профита
  const { totalProfit } = _totalProfit();
  const profitIcon = Boolean(totalProfit !== 0) ? Boolean(totalProfit < 0) ? "caret-down" : "caret-up" : "";
  const profitColor = Boolean(totalProfit !== 0) ? Boolean(totalProfit < 0) ? "#F5386A" : "#10B879" : "#8E8E8E";
  const walletImage = Boolean(wallet?.image) ? { uri: wallet?.image } : require("../../../../../assets/png/wallet/wallet-image-pug-white.png");


  // Если у пользователя не импортирован кошелек
  if (Boolean(Object.keys(wallet || {}).length <= 0)) {
    return (
      <NotWallet
        openInformationCreatWallet={openInformationCreatWallet}
      />
    );
  }

  return (
    <View style={[styles.card, styles.cardFull]}>

      <TouchableOpacity style={styles.cardHead} activeOpacity={0.8} onPress={routeWalletDashboard}>
        <Text style={styles.cardHeadLabel}>
          {allTranslations(localization.dashboardHome.walletAccount.walletLabel)}
        </Text>
        <Text style={styles.cardHeadWalletName} numberOfLines={1}>
          {wallet?.label}
        </Text>
        <TouchableOpacity style={styles.buttonArrowRight} onPress={routeWalletDashboard} activeOpacity={0.8}>
          <CommonArrowRightIcon color="#282828" />
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
            const { totalProfitMessage } = _totalProfit(currency);
            const totalBalanceWallet = _totalBalanceWallet(currency);

            return (
              <TouchableOpacity key={`slider-fiat-${index}`} onPress={routeWalletDashboard} activeOpacity={0.8}>
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
                      {totalProfitMessage}
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
            key={`slider-fiat-dot-${index}`}
            style={[
              styles.sliderFiatPaginationDot,
              Boolean(item === fiat) && { backgroundColor: "black" },
            ]}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.walletImage} activeOpacity={0.8} onPress={routeWalletDashboard}>
        <Image
          source={walletImage}
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
        />
      </TouchableOpacity>

    </View>
  )

};

const NotWallet = (props) => {
  const {
    openInformationCreatWallet,
  } = props;

  return (
    <View style={[styles.card, { padding: 16 }]}>

      <Text style={styles.cardTitle}>
        {allTranslations(localization.dashboardHome.walletAccount.title)}

        <Text style={{fontSize: 16, color: "#767676", fontWeight: "normal"}}> (SEED)</Text>
      </Text>

      <View style={styles.cardSeparate} />

      <Button
        label={allTranslations(localization.dashboardHome.walletAccount.buttonConnect)}
        style={{ borderRadius: 14 }}
        size="xsSmall"

        onPress={openInformationCreatWallet}
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

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#282828",
    borderRadius: 999,
  },

  buttonArrowRight: {
    width: 24,
    height: 32,
    marginLeft: "auto",
  },

});


export default compose(
  connect(
    state => ({
      global: state.globalState
    }),
    dispatch => ({}),
  ),
)(WalletAccount);
