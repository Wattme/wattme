import React from "react";
import {
  View,
  StyleSheet, TouchableOpacity,
} from "react-native/index";
import {
  Text,
} from "react-native-ui-lib";
import {
  CommonArrowTopCircle as CommonArrowTopCircleIcon,
  CommonArrowBottomCircle as CommonArrowBottomCircleIcon
} from "../../../../../assets/icons";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import { convertorNumber } from "../../../../../helpers/convertor";

const History = (props) => {
  const { history, coinCode, onRoute } = props;

  return (
    <>

      {(history || []).map((section, sectionIdx) => (
        <View key={`History-section-${sectionIdx}`} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.label}</Text>

          {(section?.list || []).map((transaction, idxTransaction) => (
            <Transaction
              key={`History-section-${sectionIdx}-${idxTransaction}`}
              isLast={Boolean((section?.list || []).length - 1 === idxTransaction)}
              isFirst={Boolean(idxTransaction === 0)}
              transaction={transaction}
              coinCode={coinCode}
              onRoute={onRoute}
            />
          ))}
        </View>
      ))}

    </>
  );
};
const Transaction = (props) => {
  const { transaction, isFirst, isLast, coinCode, onRoute } = props;
  const length = 4;
  const isIncoming = Boolean(transaction.incoming);
  const Icon = Boolean(isIncoming) ? CommonArrowBottomCircleIcon : CommonArrowTopCircleIcon;
  const color = Boolean(isIncoming) ? '#10B879' : '#F5386A';
  const titleLanguageKey = Boolean(isIncoming) ? 'receipt' : 'translation';
  const captionLanguageKey = Boolean(isIncoming) ? 'fromWhom' : 'toWhom';
  const address = ((Boolean(!isIncoming) ? transaction.recipientAddress : transaction?.senderAddress)) || "";
  const addressString = `${address.substring(0, length)}...${address.substring(address.length - length, address.length)}`

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => onRoute(transaction)}
      style={[
        styles.transaction,
        Boolean(isFirst) && {paddingTop: 0},
        Boolean(isLast) && {paddingBottom: 0},
      ]}
    >
      <View style={styles.transactionIcon}>
        <Icon color={color}/>
      </View>
      <View style={styles.transactionBody}>
        <View style={{flex: 1}}>
          <Text style={styles.transactionTitle}>
            {allTranslations(localization.walletCoin.history[titleLanguageKey])}
          </Text>
          <Text style={styles.transactionCaption}>
            {allTranslations(localization.walletCoin.history[captionLanguageKey])}: {addressString}
          </Text>
        </View>
        <View>
          <Text style={styles.transactionAmount}>
            {!isIncoming && "-"}{convertorNumber(transaction.amount, 4, ',')} {coinCode}
          </Text>
        </View>

        {Boolean(!isLast)&&(
          <View style={styles.transactionBodyArrow}/>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  section: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 14,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 14,
    lineHeight: 17,
    textAlign: "center",
    color: "#282828",
    marginBottom: 16,
  },

  transaction: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15
  },
  transactionIcon: {},
  transactionBody: {
    flex: 1,
    position: "relative",
    flexDirection: "row",
    alignItems: "flex-end",
    marginLeft: 8
  },
  transactionBodyArrow: {
    position: "absolute",
    height: 2,
    left: 0,
    right: 0,
    bottom: -15,
    backgroundColor: "#F9F9F9"
  },
  transactionTitle: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828",
    marginBottom: 8
  },
  transactionCaption: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E"
  },
  transactionAmount: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "500",
    color: "#282828",
    textAlign: "right"
  },
});

export default History;
