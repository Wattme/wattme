import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import { getIconCurrency } from "../../../../../common/Images";
import { convertorNumber } from "../../../../../helpers/convertor";

class PairCard extends React.PureComponent {
  render() {
    const {
      wallet,

      symbol,
      baseAsset,
      quoteAsset,

      onPress
    } = this.props;

    return (
      <TouchableOpacity style={styles.card} onPress={() => onPress(this.props)} activeOpacity={0.8}>
        <View style={styles.cardLeft}>
          <Image
            source={{ uri: getIconCurrency(baseAsset) }}
            style={{ width: 32, height: 32 }}
          />
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.cardName}>{ baseAsset } / { quoteAsset }</Text>
          <Text style={styles.cardBalance}>
            { convertorNumber((wallet?.free || '0'), 8, '.') } { wallet?.asset }
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles =StyleSheet.create({

  card: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 44,
  },
  cardLeft: {
    height: 32,
    width: 32,
    marginRight: 12
  },
  cardBody: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  cardImage: {
    width: 32,
    height: 32,
  },
  cardName: {
    flex: 1,
    fontSize: 13,
    lineHeight: 16,
    color: "#282828"
  },
  cardBalance: {
    textAlign: "right",
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E",
    fontWeight: "500"
  },

});

export default PairCard
