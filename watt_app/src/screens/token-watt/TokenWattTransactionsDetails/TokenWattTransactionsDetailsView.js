import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView, Linking,
} from "react-native/index";
import {
  Text,
  Button
} from "react-native-ui-lib";
import {
  Header
} from "../../../components";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import axios from "axios";
import settings from "../../../constants/settings";
import moment from "moment";
import { ethers } from "ethers";
import ethConvert from "ether-converter";
import { convertorNumber } from "../../../helpers/convertor";
import { fiatConverter, fiatSymbol } from "../../../common/FiatsConverter";


class TokenWattTransactionsDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transaction: props?.route?.params?.transaction || {},
      transactionInfo: {},
    };
  }

  componentDidMount = async () => {
    await this.getTransactionDetails();
  };

  // Запрос детализации по транзакции
  getTransactionDetails = async () => {

    const transaction = this.state?.transaction || {};

    const transactionHash = transaction?.tx;

    const urlTransactionByHash = `https://api.bscscan.com/api?module=proxy&action=eth_getTransactionByHash&txhash=${ transactionHash }&apikey=${ settings.bscscancomApiKey }`;
    const detailsTransactionByHash = await axios.get(urlTransactionByHash).then((res) => {
      return res.data?.result || {}
    }).catch((err) => {
      return null
    });

    const urlTransactionReceipt = `https://api.bscscan.com/api?module=proxy&action=eth_getTransactionReceipt&txhash=${ transactionHash }&apikey=${ settings.bscscancomApiKey }`;
    const detailsTransactionReceipt = await axios.get(urlTransactionReceipt).then((res) => {
      return res.data?.result || {}
    }).catch((err) => {
      return null
    });

    const gasPrice = ethConvert(ethers.utils.formatEther(detailsTransactionByHash?.gasPrice), "ether", "wei");
    const gasUsed = ethers.utils.formatEther(detailsTransactionReceipt?.gasUsed)
    const networkFee = ethConvert(ethConvert((gasUsed * gasPrice), "gwei", "ether"), "ether", "gwei");

    const addressFrom = detailsTransactionByHash?.from || "";
    const addressTo = detailsTransactionByHash?.to || "";
    const transactionInfo = {
      date: moment(transaction.date).format("D MMM YYYY, HH:mm"),
      recipient: `${addressTo.substring(0, 6)}...${addressTo.substring(addressTo.length - 6, addressTo.length)}`,
      sender: `${addressFrom.substring(0, 6)}...${addressFrom.substring(addressFrom.length - 6, addressFrom.length)}`,
      networkFee: networkFee
    };

    this.setState({
      transactionInfo
    })
  }


  _balance = () => {
    const {
      transaction
    } = this.state;

    const amount = (parseInt(transaction?.[transaction.plus] * 10)) / 10;
    return `${ convertorNumber(amount, 1, ',') } ${ (transaction.plus || "").toUpperCase() }`
  }
  _balanceFiat = () => {
    const {
      transaction
    } = this.state;

    const amount = (parseInt(transaction?.[transaction.plus] * 10)) / 10;
    const amountUsd = amount * transaction.rate;
    const amountFiat = fiatConverter(amountUsd);

    return `≈ ${ convertorNumber(amountFiat, 1, ',') } ${ fiatSymbol() }`
  }
  _commission = () => {
    const {
      transaction,
      transactionInfo
    } = this.state;
    const currency = this.props.currencies.find((t) => t.code === "BNB");
    const fee = (parseInt((transactionInfo.networkFee || 0) * 100000)) / 100000;
    const feeUsd = fee * currency?.price_usd;

    return `${ convertorNumber(fee, 5, ',') } BNB (${ fiatConverter(feeUsd) } ${ fiatSymbol() })`
  }


  _routeBlockChain = async () => {
    await Linking.openURL(`https://bscscan.com/tx/${ this.state.transaction?.tx }`)
  }

  render() {
    const {
      transaction,
      transactionInfo
    } = this.state;

    return (
      <View style={styles.root}>

        <Header title={transaction?.description}/>

        <ScrollView contentContainerStyle={styles.scrollView}>

          <View style={styles.section}>
            <Text style={styles.balance}>{this._balance() || "\t"}</Text>
            <Text style={styles.balanceFiat}>{this._balanceFiat() || "\t"}</Text>
          </View>

          <View style={{marginTop: 12}}/>

          <View style={styles.section}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>
                {allTranslations(localization.tokenWattTransactions.date)}
              </Text>
              <Text style={styles.rowValue}>
                {transactionInfo.date || "\t"}
              </Text>
            </View>
            <View style={styles.separate}/>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>
                {allTranslations(localization.tokenWattTransactions.recipient)}
              </Text>
              <Text style={styles.rowValue}>
                {transactionInfo.recipient || "\t"}
              </Text>
            </View>
            <View style={styles.separate}/>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>
                {allTranslations(localization.tokenWattTransactions.sender)}
              </Text>
              <Text style={styles.rowValue}>
                {transactionInfo.sender || "\t"}
              </Text>
            </View>
          </View>

          <View style={{marginTop: 12}}/>

          <View style={styles.section}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>
                {allTranslations(localization.tokenWattTransactions.networkFee)}
              </Text>
              <Text style={styles.rowValue}>
                {this._commission() || "\t"}
              </Text>
            </View>
          </View>

        </ScrollView>

        <View style={styles.footer}>
          <Button
            label={allTranslations(localization.tokenWattTransactions.showFromBlockChain)}
            style={styles.footerButton}
            labelStyle={styles.footerButtonLabel}
            onPress={this._routeBlockChain}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F2F2F6"
  },
  scrollView: {
    paddingHorizontal: 16,
    paddingVertical: 12
  },

  section: {
    backgroundColor: "white",
    padding: 16,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14
  },

  balance: {
    fontSize: 20,
    lineHeight: 24,
    color: "#282828",
    fontWeight: "600",
    textAlign: "center"
  },
  balanceFiat: {
    fontSize: 16,
    lineHeight: 19,
    color: "#8E8E8E",
    textAlign: "center",
    marginTop: 8
  },

  separate: {
    height: 1,
    backgroundColor: "#F9F9F9",
    marginVertical: 15
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  rowLabel: {
    fontSize: 16,
    lineHeight: 19,
    color: "#8E8E8E",
  },
  rowValue: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828",
    textAlign: "right"
  },

  footer: {
    paddingHorizontal: 12,
    paddingVertical: 16
  },
  footerButton: {
    height: 36,
    borderRadius: 8,
    paddingVertical: 0
  },
  footerButtonLabel: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "normal"
  },
});

export default TokenWattTransactionsDetails;
