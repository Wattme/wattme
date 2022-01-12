import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import { convertorNumber } from "../../../../../helpers/convertor";

class TransactionItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  _sent = () => {
    const { item } = this.props;

    if (!item.minus) {
      return "—"
    }

    const amount = (parseInt(item?.[item.minus] * 10)) / 10;
    return `${ convertorNumber(amount, 1, ',') } ${ (item.minus || "").toUpperCase() }`
  }
  _received = () => {
    const { item } = this.props;

    if (!item.plus) {
      return "—"
    }

    const amount = (parseInt(item?.[item.plus] * 10)) / 10;
    return `${ convertorNumber(amount, 1, ',') } ${ (item.plus || "").toUpperCase() }`
  }

  render() {
    const {
      item,

      isLast,
      onPress
    } = this.props;

    return (
      <TouchableOpacity onPress={() => onPress(item)} activeOpacity={0.6}>
        <View style={[styles.transaction, Boolean(isLast) && styles.transactionLast]}>
          <View style={styles.transactionLeft}>
            <Text style={styles.label}>
              {allTranslations(localization.tokenWattTransactions.sent)}
            </Text>
            <Text style={styles.value}>{this._sent()}</Text>
          </View>
          <View style={styles.transactionCenter}>
            <Text style={styles.type}>{ item.description }</Text>
          </View>
          <View style={styles.transactionRight}>
            <Text style={[styles.label, {textAlign: "right"}]}>
              {allTranslations(localization.tokenWattTransactions.received)}
            </Text>
            <Text style={[styles.value, {textAlign: "right"}]}>
              {this._received()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  transaction: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 11,

    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#F0F0F0"
  },
  transactionLast: {
    borderBottomWidth: 1,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    marginBottom: 12
  },

  transactionLeft: {},
  transactionCenter: {
    flex: 1,
    alignItems: "center"
  },
  transactionRight: {},

  type: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: "#F7F7F7",
    borderRadius: 2,

    fontSize: 13,
    lineHeight: 16,
    color: "#616161"
  },

  label: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E"
  },
  value: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828",
    fontWeight: "500",
    marginTop: 8
  },
});

export default TransactionItem
