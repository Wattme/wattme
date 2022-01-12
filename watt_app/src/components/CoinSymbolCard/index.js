import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import { getIconCurrency } from "../../common/Images";
import { fiatConverter, fiatSymbol } from "../../common/FiatsConverter";
import { convertorNumber } from "../../helpers/convertor";
import Icon from "react-native-vector-icons/FontAwesome5";
import FastImage from "react-native-fast-image";

const CoinSymbolCard = (props) => {
  const { wallet, currency, onPress, isLast, isFirst } = props;

  const _getPercentValue = (changePercent24hr) => {
    if (typeof changePercent24hr !== "number") {
      return changePercent24hr
    }

    return Math.abs(changePercent24hr)
  }

  const amount = Number.parseFloat(wallet.indivisibleBalance);
  const priceUsd = Number.parseFloat(currency?.price_usd || "0");
  const priceFiat = priceUsd * amount;
  const changePercent24hr = Number.parseFloat(currency?.change_percent_24hr || "0");
  const profitColor = Boolean(changePercent24hr === 0) ? "#8E8E8E" : Boolean(changePercent24hr > 0) ? "#10B879" : "#F5386A";
  const iconCurrency = Boolean(wallet?.logoURI) ? wallet?.logoURI : getIconCurrency(wallet.code);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.card]}>
        <View style={styles.cardIcon}>
          <FastImage source={{uri: iconCurrency}} style={{flex: 1}}/>
        </View>
        <View style={styles.cardBody}>
          <View style={{flex: 1}}>
            <Text style={styles.cardName}>{wallet.name}</Text>
            <View style={styles.cardCoinInformation}>
              <Text style={styles.coinPrice}>{fiatSymbol()} {convertorNumber(fiatConverter(priceUsd), 2, ',')}</Text>
              <View style={styles.profit}>
                <View style={styles.profitIcon}>
                  <Icon
                    name={Boolean(changePercent24hr > 0) ? "caret-up" : "caret-down"}
                    style={{color: profitColor , fontSize: 14}}
                  />
                </View>
                <Text style={[styles.profitValue, {color: profitColor}]}>{convertorNumber(fiatConverter(_getPercentValue(changePercent24hr)), 2, ',')}%</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.userInformationBalance}>{convertorNumber(amount, 4, '.')} {wallet.code}</Text>
            <Text style={styles.userInformationBalanceFiat}>{fiatSymbol()} {convertorNumber(fiatConverter(priceFiat), 2, ',')}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center"
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 999,
    overflow: "hidden"
  },
  cardBody: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 12
  },
  cardBodyArrow: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -15,
    height: 2,
    backgroundColor: "#F9F9F9"
  },
  cardName: {
    fontSize: 16,
    lineHeight: 19,
    color: "black",
    fontWeight: "500",

    marginBottom: 8
  },

  cardCoinInformation: {
    flexDirection: "row",
    alignItems: "center"
  },

  coinPrice: {
    fontSize: 13,
    lineHeight: 16,
    color: "#8E8E8E"
  },

  profit: {
    flexDirection: "row",
    marginLeft: 4
  },
  profitIcon: {
    width: 12,
    lineHeight: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  profitValue: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "500",
    marginLeft: 5
  },

  userInformation: {},
  userInformationBalance: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "600",
    textAlign: "right",
    marginBottom: 8
  },
  userInformationBalanceFiat: {
    fontSize: 14,
    lineHeight: 17,
    fontWeight: "500",
    textAlign: "right",
    color: "#2D4EC2"
  },
});

export default CoinSymbolCard
