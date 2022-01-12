import React from "react";
import {
  View,
  StyleSheet
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import { fiatCode, fiatConverter, fiatSymbol } from "../../../../../common/FiatsConverter";
import { convertorNumber } from "../../../../../helpers/convertor";

class Balance extends React.PureComponent {

  _totalBalance = () => {
    const { accountBalances, currencies } = this.props;

    const WALLETS_BALANCE_LIST = (accountBalances || []).filter((t) => Boolean(Number.parseFloat(t.free) > 0 || Number.parseFloat(t.locked) > 0));

    return WALLETS_BALANCE_LIST.reduce(( value, item ) => {
      const CURRENCY = currencies.find(( t ) => t.code === item.asset) || {};

      if (Object.keys(CURRENCY).length <= 0) {
        return value
      }

      const BALANCE = ( Number.parseFloat(item?.free || '0') + Number.parseFloat(item?.locked || '0') ) * Number.parseFloat(CURRENCY.price_usd);

      return value + BALANCE
    }, 0)
  }
  _totalBalanceFiat = () => {
    const BALANCE_USD = this._totalBalance();

    return `${ convertorNumber(fiatConverter(BALANCE_USD, "BTC", 7), 7, '.') } BTC`
  }

  _changesForToday = (isView = true) => {
    const { accountBalances, currencies } = this.props;

    const TOTAL_BALANCE = this._totalBalance();
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

    if (!isView) {
      return BALANCE
    }

    const formatChangeUsd = convertorNumber(fiatConverter(CHANGE_USD), 0, '.');
    const formatChangeBTC = convertorNumber(fiatConverter(CHANGE_USD, "BTC"), 4, '.');
    const percentChange = convertorNumber(((CHANGE_USD * 100) / TOTAL_BALANCE), 1, '.');
    const color = Boolean(formatChangeUsd === 0) ? "#8E8E8E" : Boolean(formatChangeUsd > 0) ? "#10B879" : "#F5386A";

    return (
      <View style={styles.informationColumn}>
        <Text style={styles.informationTitle}>{ allTranslations(localization.tradingAccount.balance.changesForToday) }</Text>
        <Text style={[styles.informationValueFiat, {color: color}]}>{ formatChangeUsd } { fiatCode() } ({ percentChange }%)</Text>
        <Text style={[styles.informationValueBtc, {color: color}]}>{ formatChangeBTC } BTC ({ percentChange }%)</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.card}>

        <Text style={styles.balanceTitle}>
          { allTranslations(localization.tradingAccount.balance.title) }
        </Text>
        <Text style={styles.balanceFiat}>
          { `${ fiatSymbol() } ${ convertorNumber(this._totalBalance(), 2, '.') }` }
        </Text>
        <Text style={styles.balanceBtc}>
          ≈ { this._totalBalanceFiat() }
        </Text>

        <View style={styles.informationContainer}>

          {
            this._changesForToday(true)
          }

          {
            Boolean(false) && (
              <View style={styles.informationColumn}>
                <Text style={[styles.informationTitle, { textAlign: "right" }]}>{ allTranslations(localization.tradingAccount.balance.changesMonthly) }</Text>
                <Text style={[styles.informationValueFiat, { textAlign: "right", color: "#F5386A" }]}>-2 169 USD (-9.2%)</Text>
                <Text style={[styles.informationValueBtc, { textAlign: "right", color: "#F5386A" }]}>-0.0039 BTC (-37.5%)</Text>
              </View>
            )
          }
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
    padding: 16,

    backgroundColor: "#FFFFFF"
  },

  balanceTitle: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828",
    textAlign: "center",

    marginBottom: 8
  },
  balanceFiat: {
    fontSize: 20,
    lineHeight: 24,
    color: "#000000",
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 8
  },
  balanceBtc: {
    fontSize: 13,
    lineHeight: 16,
    color: "#8E8E8E",
    textAlign: "center",
  },

  informationContainer: {
    flexDirection: "row",
    marginTop: 16
  },
  informationColumn: {
    flex: 1,
  },
  informationTitle: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E",
    marginBottom: 8
  },
  informationValueFiat: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "600",
    marginBottom: 8
  },
  informationValueBtc: {
    fontSize: 13,
    lineHeight: 16,
  },
});

export default Balance
