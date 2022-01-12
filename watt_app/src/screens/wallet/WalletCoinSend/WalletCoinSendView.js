import React, { Component } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity, Linking,
} from "react-native/index";
import {
  Text,
  Button
} from "react-native-ui-lib";
import {
  Header,
  ModalCamera,
  ModalLoading,
  PopUpInformation,
  BlockInformation
} from "../../../components";
import {
  CommonQrCode as CommonQrCodeIcon
} from "../../../assets/icons";
import Clipboard from "@react-native-clipboard/clipboard";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import Notification from "../../../common/Notification";
import { getCommission } from "./utils/commission";
import { getMaxAmount } from "./utils/max-amount";
import { convertorNumber } from "../../../helpers/convertor";
import * as queryString from "querystring";
import { createTransaction } from "./utils/transaction";
import logSend from "../../../agent/logger";
import agentWiseWin from "../../../agent/agentWiseWin";
import { wattTokenCreateTransaction } from "../../../utils/wise-win/watt-token";
import ethConvert from "ether-converter";
import { fiatSymbol } from "../../../common/FiatsConverter";
import agent from "../../../agent/agent";
import TextInputMask from "react-native-text-input-mask";


class WalletCoinSend extends Component {
  constructor(props) {
    super(props);

    const routeParams = props?.route?.params || {};

    this.state = {
      coin: {},
      formSend: {
        recipientAddress: routeParams?.initRecipientAddress || "",
        amount: "",
      },
      commission: {
        high: 0, // Высокая
        medium: 0, // Средняя
        low: 0, // Низкая
      },

      isProcessDeal: false,
      isOpenCamera: false,
      isDisableRecipientAddress: Boolean(routeParams?.initRecipientAddress),

      walletKey: props?.route?.params?.coinCode,
      walletRank: props?.route?.params?.coinRank
    };

    this.refPopUpInformation = React.createRef();
  }

  componentDidMount = async () => {
    await this.initState();
  };
  initState = async () => {
    const coin = (this.props?.global?.wallet?.list || []).find((t) => {
      if (!this.state.walletRank) {
        return Boolean((t.code === this.state.walletKey))
      }

      return Boolean(
        (t.code === this.state.walletKey) &&
        (t.rank === this.state.walletRank)
      )
    }) || {};

    await this.setState({
      coin
    });

    await this.getCommission();
  }

  // Основные функции
  onChangeForm = (name, value) => {
    let formSend = {...this.state.formSend};
    formSend[name] = value;

    this.setState({ formSend })
  }
  getCommission = async () => {
    const { coin } = this.state;

    const commission = await getCommission({ coinRank: coin.rank });

    this.setState({
      commission
    });
  }
  getMaxAmountSend = async () => {
    const { coin, commission } = this.state;

    const data = await getMaxAmount({
      address: coin.address,
      coinRank: coin.rank,
      fee: commission?.high,
      contract: Boolean(!!coin?.contract && coin?.contract !== "0x") ? coin?.contract : ""
    });

    let formSend = {...this.state.formSend};
    formSend.amount = String(data?.amount || 0);
    this.setState({ formSend })
  }

  createTransaction = async () => {
    await this.setState({ isProcessDeal: true });

    const { formSend, coin, commission } = this.state;

    logSend({
      title: "WalletCoinSend",
      method: "routeConfirmTransaction",
      message: `Пользователь начал создавать транзакцию`,

      coinCode: coin.code,
      coinAddress: coin.address,
    });

    const transaction = await createTransaction({
      senderAddress: coin.address,
      recipientAddress: formSend.recipientAddress,
      amount: formSend.amount,
      coinRank: coin.rank,
      contract: coin.contract,
      fee: commission?.high
    });
    if (!transaction || transaction?.error) {
      logSend({
        title: "WalletCoinSend",
        method: "routeConfirmTransaction",
        message: `Пользователь получил ошибку при создании транзакции: ${ JSON.stringify(transaction?.error?.data) }`
      });

      await this.setState({ isProcessDeal: false });

      let errorMessage = allTranslations(localization.walletCoinSend.errors[transaction?.error?.data?.code || "internal-error"]) || allTranslations(localization.walletCoinSend.errors["internal-error"]);
      Notification.send({
        message: errorMessage,
        type: "danger"
      })

      return null
    }

    logSend({ title: "WalletCoinSend", method: "routeConfirmTransaction", message: "Пользователь получил транзакцию транзакцию" });

    await this.setState({ isProcessDeal: false });

    this.props.navigation.navigate("WalletCoinSendConfirm", {
      coin,
      transaction,
      commission,
      formSend
    });
  }

  // Вспомонательные функции
  _pastAddress = async () => {
    const data = await Clipboard.getString();

    this.onChangeForm('recipientAddress', data);
  }
  _barCodeRead = async (data) => {
    const [address, search] = (data?.data || "").split("?");
    const params = queryString.parse((search || ""));

    let formSend = {...this.state.formSend};
    if (!!address) {
      formSend.recipientAddress = address;
    }
    if (!!params?.amount) {
      formSend.amount = params?.amount;
    }

    this.setState({
      formSend,
      isOpenCamera: false
    })
  }
  _isValidSend = () => {
    const { formSend } = this.state;
    const amount = Number.parseFloat(formSend.amount);

     return Boolean(formSend.recipientAddress && amount > 0);
  }

  render() {
    const {
      coin,
      formSend,

      isOpenCamera,
      isProcessDeal,
      isDisableRecipientAddress
    } = this.state;

    return (
      <View style={styles.root}>
        <Header title={`${ allTranslations(localization.walletCoinSend.header) } ${ coin.code }`}/>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
        >

          <View style={styles.inputContainer}>
            <TextInput
              editable={!isDisableRecipientAddress}
              value={formSend.recipientAddress}
              style={styles.inputInput}
              placeholder={allTranslations(localization.walletCoinSend.form.addressPlaceholder)}
              placeholderTextColor="#8E8E8E"

              onChangeText={(value) => this.onChangeForm('recipientAddress', value)}
            />
            <View style={[
              styles.inputControls,
              Boolean(isDisableRecipientAddress) && {opacity: 0.4}
            ]}>
              <TouchableOpacity
                disabled={isDisableRecipientAddress}
                style={[styles.inputControl]}
                onPress={this._pastAddress}
              >
                <Text style={styles.inputControlLabel}>{ allTranslations(localization.walletCoinSend.buttonPast) }</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={isDisableRecipientAddress}
                style={styles.inputControl}
                onPress={() => this.setState({isOpenCamera: true})}
              >
                <CommonQrCodeIcon/>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.inputContainer, { marginTop: 12 }]}>
            <TextInputMask
              value={formSend.amount}
              style={styles.inputInput}
              placeholder={`${coin.code} ${allTranslations(localization.walletCoinSend.form.amountPlaceholder)}`}
              keyboardType="decimal-pad"
              placeholderTextColor="#8E8E8E"
              mask={"[99999999999999].[99999999]"}

              onChangeText={(value) => this.onChangeForm('amount', value)}
            />
            <View style={styles.inputControls}>
              <TouchableOpacity style={styles.inputControl} onPress={this.getMaxAmountSend}>
                <Text style={styles.inputControlLabel}>{ allTranslations(localization.walletCoinSend.buttonMaxAmount) }</Text>
              </TouchableOpacity>
              <View style={styles.inputControl}>
                <Text style={styles.inputControlLabel}>{ coin.code }</Text>
              </View>
            </View>
          </View>

          <View style={[styles.inputContainer, { marginTop: 12 }]}>
            <Text style={[styles.inputInput, {color: '#8E8E8E'}]}>
              {allTranslations(localization.walletCoinSend.currentBalance)}
            </Text>
            <View style={styles.inputControls}>
              <View style={styles.inputControl}>
                <Text style={styles.inputControlLabel}>
                  { convertorNumber(coin.indivisibleBalance, 4, '.') } { coin.code }
                </Text>
              </View>
            </View>
          </View>

        </ScrollView>

        {Boolean(!coin?.mnemonic) && (
          <View style={{marginHorizontal: 12, marginVertical: 16}}>
            <BlockInformation
              type="error"
              message={allTranslations(localization.errors.noSeedPhrase)}
            />
          </View>
        )}

        <Button
          disabled={(!Boolean(this._isValidSend()) || (!Boolean(coin?.mnemonic)))}
          label={ allTranslations(localization.walletCoinSend.buttonSend) }
          labelStyle={{fontWeight: "normal"}}
          style={styles.buttonSend}
          onPress={this.createTransaction}
        />

        <ModalCamera
          open={isOpenCamera}

          onClose={() => this.setState({ isOpenCamera: false })}
          onBarCodeRead={this._barCodeRead}
        />

        <ModalLoading
          open={isProcessDeal}
        />

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
    backgroundColor: "#F2F2F6"
  },

  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 12,
    paddingVertical: 16
  },

  inputContainer: {
    height: 64,
    backgroundColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,

    flexDirection: "row",
    alignItems: "center",
  },
  inputInput: {
    fontSize: 16,
    lineHeight: 19,
    paddingHorizontal: 16,
    paddingVertical: 0,
    flex: 1
  },
  inputControls: {
    flexDirection: "row",
    alignItems: "center",

    marginLeft: -16,
    marginRight: 16
  },
  inputControl: {
    height: 32,
    alignItems: "center",
    justifyContent: "center",

    marginLeft: 16
  },
  inputControlLabel: {
    fontSize: 14,
    lineHeight: 19,
    color: "#282828"
  },

  buttonSend: {
    marginHorizontal: 12,
    marginBottom: 24
  }
});

export default WalletCoinSend;
