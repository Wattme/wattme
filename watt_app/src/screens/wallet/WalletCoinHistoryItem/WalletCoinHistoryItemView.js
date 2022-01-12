import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native/index";
import {
  Text,
  Button,
} from "react-native-ui-lib";
import {
  Header, InfoBadge, PopUpInformation,
} from "../../../components";
import {
  CommonSend as CommonSendIcon
} from "../../../assets/icons";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import { convertCommission } from "../WalletCoinSend/utils/commission";
import { fiatConverter, fiatSymbol } from "../../../common/FiatsConverter";
import { convertorNumber } from "../../../helpers/convertor";
import moment from "moment";
import { getTransactionLinkBlockChain } from "../WalletCoin/utils/transaction-block-chain";
import { Linking } from "react-native";
import Share from "react-native-share";


class WalletCoinHistoryItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coin: props?.route?.params?.coin || {},
      transaction: props?.route?.params?.transaction || {},

      formSendAmount: 0,
      formSendAmountUsd: 0,
    };
    this.refPopUpInformation = React.createRef();
  }

  componentDidMount = () => {
    this.initState();
  };
  initState = () => {
    const transaction = this.state.transaction || {};
    const incoming = Boolean(transaction?.incoming);
    const coinCode = this.state.coin?.code;
    const currency = (this.props?.global?.currencies || []).find((t) => t.code === coinCode);
    const formSendAmount = this.state.transaction?.amount || '0';
    const formSendAmountUsd = Number.parseFloat(currency?.price_usd || '0') * Number.parseFloat(formSendAmount);
    const address = Boolean(incoming) ? transaction?.senderAddress : transaction?.recipientAddress;
    const addressFormat = `${address.substring(0, 6)}...${address.substring(address.length - 6, address.length)}`;

    const fee = transaction.fee;
    const feeCode = coinCode;
    const feeUsd = Number.parseFloat(currency?.price_usd || '0') * Number.parseFloat(fee);

    this.setState({
      formSendAmount,
      formSendAmountUsd,
      addressFormat,

      fee,
      feeUsd,
      feeCode,

      transactionStatus: Boolean(transaction?.confirmed) ? "confirmed" : "process"
    })
  }

  _routeBlockChain = async () => {
    const link = getTransactionLinkBlockChain({
      coinRank: this.state.coin?.rank,
      tx: this.state.transaction?.hash
    });

    await Linking.openURL(link);
  }
  _shareLinkBlockChain = async () => {
    const link = getTransactionLinkBlockChain({
      coinRank: this.state.coin?.rank,
      tx: this.state.transaction?.hash
    });

    await Share.open({ message: link }).then((res) => {
      return res
    }).catch((err) => {
      return { error: err }
    })
  }
  _renderRightContent = () => {
    return (
      <TouchableOpacity onPress={this._shareLinkBlockChain}>
        <CommonSendIcon color="#282828"/>
      </TouchableOpacity>
    )
  }
  _openInfoCommission = () => {
    const {
      fee,
      feeCode,
      feeUsd,
    } = this.state;
    const caption = `${convertorNumber(fee, 6, ',')} ${ feeCode } (${convertorNumber(fiatConverter(feeUsd), 2, ',')} ${fiatSymbol()})`

    this.refPopUpInformation.current.open({
      title: allTranslations(localization.walletCoinSendConfirm.commissionPopup.title),
      caption: caption,
      message: allTranslations(localization.walletCoinSendConfirm.commissionPopup.message, {
        networkName: this.state.coin?.name
      }),
    })
  }

  render() {
    const {
      coin,
      transaction,
      addressFormat,

      formSendAmount,
      formSendAmountUsd,

      fee,
      feeUsd,
      feeCode
    } = this.state;
    const addressLabelKey = Boolean(transaction.incoming) ? "fromAddress" : "toAddress";

    return (
      <View style={styles.root}>
        <Header title={allTranslations(localization.walletCoinHistoryItem.header)} rightContent={this._renderRightContent}/>

        <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={styles.scrollView}>
          <View style={styles.section}>
            <Text style={styles.transferAmount}>
              { !Boolean(transaction.incoming) && "-" }{convertorNumber(formSendAmount, 8, ",")} {coin?.code}
            </Text>
            <Text style={styles.transferAmountFiat}>
              ≈ {convertorNumber(fiatConverter(formSendAmountUsd), 4, ",")} {fiatSymbol()}
            </Text>
          </View>
          <View style={[styles.section, { marginTop: 12 }]}>
            <View style={styles.sectionRow}>
              <Text style={styles.sectionRowLeft}>
                {allTranslations(localization.walletCoinHistoryItem.date)}
              </Text>
              <Text style={styles.sectionRowRight}>
                { moment(transaction.timestamp * 1000).format(`D MMM. YYYY ${allTranslations(localization.common.yearAbbreviated)}., HH:mm`) }
              </Text>
            </View>
            <View style={styles.sectionSeparate}/>
            <View style={styles.sectionRow}>
              <Text style={styles.sectionRowLeft}>
                {allTranslations(localization.walletCoinHistoryItem.state)}
              </Text>
              <Text style={styles.sectionRowRight}>
                {allTranslations(localization.walletCoinHistoryItem.status?.[this.state.transactionStatus])}
              </Text>
            </View>
            <View style={styles.sectionSeparate}/>
            <View style={styles.sectionRow}>
              <Text style={styles.sectionRowLeft}>
                { allTranslations(localization.walletCoinHistoryItem[addressLabelKey]) }
              </Text>
              <Text style={styles.sectionRowRight}>
                { addressFormat }
              </Text>
            </View>
          </View>
          <View style={[styles.section, { marginTop: 12 }]}>
            <View style={styles.sectionRow}>
              <TouchableOpacity style={{ flexDirection: "row", alignItems: "center", flex: 1 }} onPress={this._openInfoCommission}>
                <Text style={[styles.sectionRowLeft, {marginRight: 6}]}>
                  { allTranslations(localization.walletCoinHistoryItem.commission) }
                </Text>
                <InfoBadge/>
              </TouchableOpacity>
              <Text style={styles.sectionRowRight}>
                {`${convertorNumber(fee, 6, ',')} ${ feeCode } (${convertorNumber(fiatConverter(feeUsd), 2, ',')} ${fiatSymbol()})`}
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            label={allTranslations(localization.walletCoinHistoryItem.routeBlockChain)}
            labelStyle={{fontWeight: "normal"}}
            size="xsSmall"

            onPress={this._routeBlockChain}
          />
        </View>

        <PopUpInformation
          ref={this.refPopUpInformation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F2F2F6",
  },

  scrollView: {
    paddingVertical: 16,
    paddingHorizontal: 12,
  },

  section: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 14,
  },
  sectionSeparate: {
    marginVertical: 15,
    backgroundColor: "#F9F9F9",
    height: 2,
  },

  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionRowLeft: {
    fontSize: 16,
    lineHeight: 19,
    color: "#8E8E8E",
  },
  sectionRowRight: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "right",
    color: "#282828",
  },


  transferAmount: {
    fontSize: 20,
    lineHeight: 24,
    color: "#282828",
    textAlign: "center",
    fontWeight: "600",
  },
  transferAmountFiat: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#8E8E8E",
  },

  footer: {
    paddingHorizontal: 12,
    paddingBottom: 24,
    paddingTop: 12,
  },

});

export default WalletCoinHistoryItem
