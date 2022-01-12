import React from "react";
import {
  View,
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
  CommonPlus as CommonPlusIcon,
  CommonArrowRight as CommonArrowRightIcon,
} from "../../../../../assets/icons";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { fiatCode, fiatConverter, fiatSymbol } from "../../../../../common/FiatsConverter";
import { convertorNumber } from "../../../../../helpers/convertor";

const { width } = Dimensions.get("window");
const sizeCard = (width - 24);

class ExchangeAccount extends React.PureComponent {
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

  _routeTradingAccount = () => {
    this.props.navigation.navigate("TradingAccount");
  }

  _totalBalance = (fiat, isUsd = false) => {
    const { profile, currencies } = this.props;
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

    return `${ fiatSymbol(fiat) } ${ convertorNumber(fiatConverter(WALLET_BALANCE_USD, fiat), 2, '.') }`
  }
  _totalProfit = (fiat) => {
    const { profile, currencies } = this.props;
    const accountBalances = profile?.balances || [];

    const WALLETS_BALANCE_LIST = (accountBalances || []).filter((t) => Boolean(Number.parseFloat(t.free) > 0 || Number.parseFloat(t.locked) > 0));
    const CHANGE_USD = WALLETS_BALANCE_LIST.reduce(( value, item ) => {
      const CURRENCY = currencies.find(( t ) => t.code === item.asset) || {};

      if (Object.keys(CURRENCY).length <= 0) {
        return value
      }

      const BALANCE = ( Number.parseFloat(item?.free || '0') + Number.parseFloat(item?.locked || '0') ) * Number.parseFloat(CURRENCY.price_usd);
      const CHANGE_BALANCE = (BALANCE / 100) * Number.parseFloat(CURRENCY?.change_percent_24hr || '0');

      return value + CHANGE_BALANCE
    }, 0);

    return convertorNumber(fiatConverter(CHANGE_USD, fiat), 0, '.')
  }

  render() {
    const {
      userCurrencies,
      profile,
      connectAccountTrading
    } = this.props;

    if (Object.keys(profile).length <= 0) {
      return (
        <ExchangeAccountNotConnect connectAccountTrading={connectAccountTrading}/>
      )
    }

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>
            {allTranslations(localization.dashboardHome.exchangeAccount.title)}
          </Text>
          <Text style={styles.cardCaption}>
            {allTranslations(localization.dashboardHome.exchangeAccount.caption)}
          </Text>

          <TouchableOpacity style={styles.button}>
            <CommonPlusIcon color="#282828" />
          </TouchableOpacity>
        </View>
        <View style={styles.cardSeparate} />
        <View style={styles.cardBody}>
          <TouchableOpacity style={styles.cardBodyHead} onPress={this._routeTradingAccount}>
            <View style={styles.button} />
            <Text style={styles.cardBodyHeadTitle}>
              Основной аккаунт
            </Text>
            <View style={styles.button}>
              <CommonArrowRightIcon color="#8E8E8E" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ marginHorizontal: -12, marginTop: 16 }}>
          <ScrollView
            style={styles.cardSlider}
            scrollEventThrottle={160}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            onMomentumScrollEnd={this.onScrollEndDrag}
          >

            {(userCurrencies || []).map((fiat, index) => {
              const totalProfit = this._totalProfit(fiat);
              const profitIcon = Boolean(totalProfit !== 0) ? Boolean(totalProfit < 0) ? "caret-down" : "caret-up" : "";
              const profitColor = Boolean(totalProfit !== 0) ? Boolean(totalProfit < 0) ? "#F5386A" : "#10B879" : "#8E8E8E";

              return (
                <View key={`ExchangeAccount-userCurrencies-${index}`} style={styles.cardInformationBalance}>
                  <Text style={styles.cardWalletBalance}>{ this._totalBalance(fiat) }</Text>
                  <View style={styles.containerProfit}>
                    {Boolean(profitIcon) && (
                      <View style={styles.profitArrow}>
                        <Icon
                          name={profitIcon}
                          color={profitColor}
                        />
                      </View>
                    )}
                    <Text style={[styles.profitTitle, { color: profitColor }]}>
                      { fiatSymbol(fiat) } { convertorNumber(totalProfit, 2, '.') } за день
                    </Text>
                  </View>
                </View>
              )
            })}

          </ScrollView>
        </View>
        <View style={styles.pagination}>
          {(userCurrencies || []).map((item, index) => (
            <View
              key={`ExchangeAccount-userCurrencies-pagination-dot-${index}`}
              style={[
                styles.dot,
                Boolean(item === this.state.fiat) && styles.dotActive,
              ]}
            />
          ))}
        </View>

      </View>
    );
  }
}

const ExchangeAccountNotConnect = (props) => {

  const _routeBinanceConnection = () => {
    props.connectAccountTrading();
  }

  return (
    <View style={[styles.card, { padding: 16 }]}>

      <Text style={styles.cardTitle}>
        {allTranslations(localization.dashboardHome.exchangeAccount.titleNotConnection)}
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
    padding: 16,
    backgroundColor: "white",
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    height: 32,
  },
  cardSeparate: {
    height: 2,
    marginTop: 11,
    marginBottom: 15,
    backgroundColor: "#F9F9F9",
  },
  cardBody: {},

  cardTitle: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "500",
    color: "#000000",
    marginRight: 16,
  },
  cardCaption: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828",
  },

  button: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",

    marginLeft: "auto",
  },

  cardBodyHead: {
    flexDirection: "row",
    alignItems: "center",
    height: 32,
  },
  cardBodyHeadTitle: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "500",
    color: "#282828",
  },

  cardSlider: {
    width: sizeCard,
  },
  cardInformationBalance: {
    width: sizeCard,
  },

//------------
  cardWalletBalance: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
  },
  containerProfit: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    height: 20,
  },
  profitArrow: {
    width: 12,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  profitTitle: {
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 4,
  },
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    marginTop: 16,
    height: 8,
    marginLeft: -8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#8E8E8E",

    marginLeft: 8,
  },
  dotActive: {
    backgroundColor: "#000000",
  },
});

export default ExchangeAccount;
