import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text,
  Switch
} from "react-native-ui-lib";
import { getIconCurrency } from "../../../../../common/Images";
import { getNetworkCoin } from "../../../../../common/Network";

const Coin = (props) => {
  const { item, index, onPress, isLast, walletCoins } = props;
  const iconCurrency = Boolean(item?.logoURI) ? item?.logoURI : getIconCurrency(item.code);
  const coinNetwork = Boolean(item?.network) ? item?.network : getNetworkCoin({ rank: item.rank });
  const inCurrencyStock = Boolean(walletCoins.find((t) => Boolean((t.code === item.code) && (!!item.rank) )));
  const isActive = Boolean(inCurrencyStock) ? !Boolean(item?.disable) : false;


  const handleOnPress = () => {
    onPress(item.code, !inCurrencyStock, item);
  }

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handleOnPress}>
      <View style={[styles.card]}>
        <View style={styles.cardIcon}>
          <Image source={{uri: iconCurrency}} style={{flex: 1}}/>
        </View>
        <View style={styles.cardBody}>
          <View style={{flex: 1}}>
            <View style={styles.cartBodyHead}>
              <Text style={styles.cardCoinCode}>{item.code}</Text>
              {Boolean(coinNetwork) && (
                <Text style={styles.cardCoinNetwork}>({coinNetwork})</Text>
              )}
            </View>
            <Text style={styles.cardCoinName}>
              {item.name}
            </Text>
          </View>

          <View style={styles.cardRight}>
            <Switch value={isActive} onValueChange={handleOnPress}/>
          </View>

          {!Boolean(isLast) && (
            <View style={styles.cardBodyArrow}/>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

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
    marginLeft: 12,
    alignItems: "center"
  },
  cardBodyArrow: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -15,
    height: 2,
    backgroundColor: "#F9F9F9"
  },
  cartBodyHead: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6
  },
  cardRight: {
    width: 48
  },

  cardCoinCode: {
    fontSize: 18,
    lineHeight: 21,
    color: "black",
    fontWeight: "500"
  },
  cardCoinNetwork: {
    fontSize: 16,
    lineHeight: 19,
    color: "#8E8E8E",
    fontWeight: "300",

    marginLeft: 8
  },
  cardCoinName: {
    fontSize: 14,
    lineHeight: 17,
    color: "#282828"
  },
});

export default function (props) {
  return <Coin {...props}/>
};
