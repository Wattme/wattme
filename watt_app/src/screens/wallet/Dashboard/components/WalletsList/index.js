import React from "react";
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView, TouchableOpacity,
} from "react-native/index";
import {
  CoinSymbolCard,
} from "../../../../../components";
import { SwipeRow } from "react-native-swipe-list-view";
import { Text } from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

const WalletsList = (props) => {
  const { wallets, currencies, routeWallet } = props;

  const _renderItem = ({ item, idx }) => {
    const currency = currencies.find((t) => t.code === item.code);

    if (item?.disable || false) {
      return null;
    }

    const walletsFilter = (wallets||[]).filter((t) => !t.disable);
    const isLast = Boolean(idx >= walletsFilter.length - 1);

    return (
      <View key={_keyExtractor(item, idx)}>
        <SwipeRow
          disableRightSwipe={true}
          rightOpenValue={-108}
          closeOnRowPress={true}

          recalculateHiddenLayout
        >
          <View style={styles.containerControls}>
            <TouchableOpacity style={styles.buttonDisableWallet} activeOpacity={0.6} onPress={() => props.onDisableCoin(item)}>
              <Text style={styles.buttonDisableWalletLabel}>
                {allTranslations(localization.common.disable)}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <CoinSymbolCard
              wallet={item}
              currency={currency}
              onPress={() => routeWallet(item.code, item)}
            />
          </View>
        </SwipeRow>

        {Boolean(!isLast)&&(
          <View style={styles.separator}/>
        )}
      </View>
    );
  };
  const _keyExtractor = (item, idx) => {
    return `${item.code}-${item.rank}-${idx}`;
  };

  return (
    <SafeAreaView style={styles.root}>
      {
        wallets.map((item, idx) => _renderItem({ item, idx }))
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {},

  containerControls: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF",
  },
  buttonDisableWallet: {
    height: "100%",
    width: 88,
    backgroundColor: "#F5386A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonDisableWalletLabel: {
    fontSize: 14,
    lineHeight: 17,
    color: "white",
    textAlign: "center"
  },

  separator: {
    height: 2,
    backgroundColor: "#F9F9F9",
    marginLeft: 60
  },
});

export default WalletsList;
