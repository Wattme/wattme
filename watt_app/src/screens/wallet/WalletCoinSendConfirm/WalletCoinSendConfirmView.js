import React, { Component, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView, TouchableOpacity,
} from "react-native/index";
import {
  Text,
  Chip,
  Button,
} from "react-native-ui-lib";
import {
  Header,
  InfoBadge,
  ModalLoading,
  PopUpInformation,
  ModalApplicationLock, BlockInformation,
} from "../../../components";
import {
  Controls as ControlsComponent
} from "./components";
import Notification from "../../../common/Notification";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import { convertorNumber } from "../../../helpers/convertor";
import { fiatConverter, fiatSymbol } from "../../../common/FiatsConverter";
import { convertCommission } from "../WalletCoinSend/utils/commission";
import { signTransaction, sendTransaction, createTransaction } from "../WalletCoinSend/utils/transaction";
import logSend from "../../../agent/logger";


class WalletCoinSendConfirm extends Component {
  constructor(props) {
    super(props);

    const routeParams = props?.route?.params || {};
    const currency = (props.global?.currencies || []).find((t) => t.code === routeParams?.coin?.code) || {};
    const amountUsd = Number.parseFloat(routeParams?.formSend?.amount || "0") * Number.parseFloat(currency?.price_usd || "0");

    this.state = {
      ...routeParams,

      amountUsd: amountUsd,
      currency: currency,
      coinMain: {},

      isToken: false,
      isDealCurrent: true,
      isShowConfirm: false,
      isModalLoading: false,
      isDisabledControls: false,

      countdownTime: "",
    };

    this.timeoutErrorBigLargeMethods = null;
    this.refPopUpInformation = React.createRef();
    this.refFooter = React.createRef();
  }

  componentDidMount = () => {
    const { coin } = this.state;
    const isToken = Boolean((coin?.rank||'').indexOf('TOKEN') > -1);

    if (!isToken) {
      return null
    }

    const rootCoin = (coin?.rank||'').split('_').pop();
    const rankMain = `MAIN_${ rootCoin }`;
    const coinMain = (this.props?.global?.wallet?.list || []).find((t) => t.rank === rankMain);

    this.setState({
      coinMain,
      isToken: true
    })
  }
  componentWillUnmount = () => {
    clearTimeout(this.timeoutErrorBigLargeMethods);
  }

  updateDialTransaction = async () => {
    const { coin, formSend } = this.state;

    this.setState({ isModalLoading: true });

    logSend({
      title: "WalletCoinSendConfirm",
      method: "updateDialTransaction",
      message: `Пользователь запросил обновление по сделке перевода`,

      coinCode: coin.code,
      coinAddress: coin.address,
    });

    let newDialTransaction = await createTransaction({
      senderAddress: coin.address,
      recipientAddress: formSend.recipientAddress,
      amount: formSend.amount,
      coinRank: coin.rank,
      contract: coin.contract
    });

    if (newDialTransaction.error) {
      logSend({
        title: "WalletCoinSendConfirm",
        method: "updateDialTransaction",
        message: `Пользователь получил ошибку при обновлении транзакции: ${ JSON.stringify(newDialTransaction.error?.data) }`
      });

      await this.setState({ isModalLoading: false });

      let errorMessage = allTranslations(localization.walletCoinSend.errors[newDialTransaction?.error?.data?.code || "internal-error"]) || allTranslations(localization.walletCoinSend.errors["internal-error"]);
      Notification.send({
        message: errorMessage,
        type: "danger"
      })

      return null
    }

    logSend({ title: "WalletCoinSend", method: "routeConfirmTransaction", message: "Пользователь получил транзакцию" });

    this.setState({
      isModalLoading: false,
      transaction: newDialTransaction,
      isDealCurrent: true
    });

    await this.refFooter.current?.onUpdateStartBackTime();
  }

  startSignTransaction = async (mnemonic) => {

    const { coin } = this.state;
    if (!coin.mnemonic && !mnemonic) {
      return null
    }

    await this.setState({
      isModalLoading: true,
      isDisabledControls: true
    });

    setTimeout( async () => {
      await this.signTransaction(mnemonic);
    }, 1000);
  }
  signTransaction = async (mnemonic) => {
    const { coin, transaction } = this.state;

    logSend({
      title: "WalletCoinSendConfirm",
      method: "signTransaction",
      message: `Пользователь начал подписывать транзакцию транзакцию`,

      coinCode: coin.code,
      coinAddress: coin.address,
    });

    this.timeoutErrorBigLargeMethods = setTimeout(() => {
      this.errorBigLargeMethods({
        title: "WalletCoinSendConfirm",
        method: "signTransaction",
        message: `Пользователь начал подписывать транзакцию транзакцию`,

        coinCode: coin.code,
        coinAddress: coin.address,
      });
    }, 180000);

    const signTx = await signTransaction({
      transaction: transaction,
      mnemonic: coin.mnemonic,
      privateKey: coin.privateKey,
      senderAddress: coin.address,
      coinRank: coin.rank,
      contract: coin.contract,
      btcPath: coin.path,
    });
    if (!signTx) {
      this.errorBigLargeMethods({
        title: "WalletCoinSendConfirm",
        method: "signTransaction",
        message: `При подписании пользователя не нашло метода для подписи`,

        coinCode: coin.code,
        coinAddress: coin.address,

        error: true,
      });

      this.setState({isDisabledControls: false});

      return null;
    }

    clearTimeout(this.timeoutErrorBigLargeMethods);

    await this.sendTransaction(signTx);
  };
  sendTransaction = async (signTx) => {
    const { coin } = this.state;

    logSend({
      title: "WalletCoinSendConfirm",
      method: "sendTransaction",
      message: `Пользователь начал отправлять транзакцию`,

      coinCode: coin.code,
      coinAddress: coin.address,
    });

    const responseSendTransaction = await sendTransaction({
      coinRank: coin.rank,
      senderAddress: coin.address,
      signTx: signTx,
    });
    if (!responseSendTransaction || responseSendTransaction?.error) {
      this.errorBigLargeMethods({
        title: "WalletCoinSendConfirm",
        method: "sendTransaction",
        message: `При отправке возникла ошибка: ${JSON.stringify(responseSendTransaction?.error?.data)}`,

        coinCode: coin.code,
        coinAddress: coin.address,

        error: true,
      });

      this.setState({isDisabledControls: false});

      return null;
    }

    logSend({
      title: "WalletCoinSendConfirm",
      method: "sendTransaction",
      message: `Пользователь успешно отправил транзакцию`,

      coinCode: coin.code,
      coinAddress: coin.address,
    });

    this.setState({ isModalLoading: false });

    Notification.send({
      type: "success",
      message: allTranslations(localization.walletCoinSendConfirm.successSendTransaction),
    });

    this.setState({isDisabledControls: false});

    this.props.navigation.navigate("WalletCoin");
  };

  errorBigLargeMethods = (props) => {
    clearTimeout(this.timeoutErrorBigLargeMethods);

    this.setState({
      isModalLoading: false,
    });

    logSend({
      ...props,
      error: true,
    });

    const keyErrorMessage = Boolean(props?.method === "signTransaction") ? "errorSignTransaction" : "errorSendTransaction";
    const message = allTranslations(localization.walletCoinSendConfirm[keyErrorMessage]);

    Notification.send({
      type: "danger",
      message: message,
    });
  };

  fromLabel = () => {
    const { coin } = this.state;
    const wallet = this.props?.global?.wallet || {};
    const address = coin?.address || "";
    const addressFormat = `${address.substring(0, 4)} •••• ${address.substring(address.length - 4, address.length)}`;

    return `${wallet.label} (${addressFormat})`;
  };
  toLabel = () => {
    const { formSend } = this.state;
    const address = formSend?.recipientAddress || "";

    return `${address.substring(0, 4)} •••• ${address.substring(address.length - 4, address.length)}`;
  };
  commissionLabel = () => {
    const {
      coin,
      coinMain,
      currency,
      transaction,

      isToken
    } = this.state;

    const commission = convertCommission({ maxGas: transaction.maxGas, commission: transaction.fee, coinRank: coin.rank });
    const commissionCoinCode = Boolean(isToken) ? coinMain?.code : coin?.code;
    const currencyCoinFiat = (this.props?.global?.currencies || []).find((t) => t.code === commissionCoinCode);
    const commissionUsd = Boolean(isToken) ? ((commission || 0) * +currencyCoinFiat?.price_usd) * Number.parseFloat(currency?.price_usd || 0) : ((commission || 0)) * Number.parseFloat(currency?.price_usd || 0);
    const commissionFiat = fiatConverter(commissionUsd);

    return `${convertorNumber(commission, 4, ",")} ${commissionCoinCode} (${convertorNumber(commissionFiat, 2, ",")} ${fiatSymbol()})`;
  };
  maxTotalLabel = () => {
    const {
      coin,
      formSend,
      currency,
      transaction,

      isToken
    } = this.state;

    const commission = convertCommission({ maxGas: transaction.maxGas, commission: transaction.fee, coinRank: coin.rank });

    let total = Number.parseFloat(formSend?.amount || "0");
    if (!isToken) {
      total = total + Number.parseFloat(commission);
    }

    const totalUsd = total * Number.parseFloat(currency?.price_usd || "0");
    const totalFiat = fiatConverter(totalUsd);

    return `${convertorNumber(total, 4, ",")} ${coin.code} (${convertorNumber(totalFiat, 2, ",")} ${fiatSymbol()})`;
  };

  _openInfoCommission = () => {
    this.refPopUpInformation.current.open({
      title: allTranslations(localization.walletCoinSendConfirm.commissionPopup.title),
      caption: this.commissionLabel(),
      message: allTranslations(localization.walletCoinSendConfirm.commissionPopup.message, {
        networkName: this.state.coin?.name,
      }),
    });
  };

  render() {
    const {
      coin,
      commission,
      formSend,
      transaction,

      amountUsd,

      isDealCurrent,
      isShowConfirm,
      isModalLoading,
      isDisabledControls
    } = this.state;

    return (
      <View style={styles.root}>

        <Header title={allTranslations(localization.walletCoinSendConfirm.header)} />

        <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>

          <View style={{flex: 1}}>

            <View style={styles.section}>
              <Text style={styles.transferAmount}>
                -{convertorNumber(formSend.amount, 8, ",")} {coin.code}
              </Text>
              <Text style={styles.transferAmountFiat}>
                ≈ {convertorNumber(fiatConverter(amountUsd), 4, ",")} {fiatSymbol()}
              </Text>
            </View>

            <View style={[styles.section, { marginTop: 12 }]}>
              <View style={styles.sectionRow}>
                <Text style={styles.sectionRowLeft}>
                  {allTranslations(localization.walletCoinSendConfirm.assets)}
                </Text>
                <Text style={styles.sectionRowRight}>
                  {`${coin.name} (${coin.code})`}
                </Text>
              </View>
              <View style={styles.sectionSeparate} />
              <View style={styles.sectionRow}>
                <Text style={styles.sectionRowLeft}>
                  {allTranslations(localization.walletCoinSendConfirm.from)}
                </Text>
                <Text style={styles.sectionRowRight}>
                  {this.fromLabel()}
                </Text>
              </View>
              <View style={styles.sectionSeparate} />
              <View style={styles.sectionRow}>
                <Text style={styles.sectionRowLeft}>
                  {allTranslations(localization.walletCoinSendConfirm.to)}
                </Text>
                <Text style={styles.sectionRowRight}>
                  {this.toLabel()}
                </Text>
              </View>
            </View>

            <View style={[styles.section, { marginTop: 12 }]}>
              <View style={styles.sectionRow}>
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
                  onPress={this._openInfoCommission}
                >
                  <Text style={[styles.sectionRowLeft, { marginRight: 6 }]}>
                    {allTranslations(localization.walletCoinSendConfirm.commission)}
                  </Text>
                  <InfoBadge />
                </TouchableOpacity>
                <Text style={styles.sectionRowRight}>
                  {this.commissionLabel()}
                </Text>
              </View>
              <View style={styles.sectionSeparate} />
              <View style={styles.sectionRow}>
                <Text style={styles.sectionRowLeft}>
                  {allTranslations(localization.walletCoinSendConfirm.maxTotal)}
                </Text>
                <Text style={styles.sectionRowRight}>
                  {this.maxTotalLabel()}
                </Text>
              </View>
            </View>

          </View>

          {Boolean(!isDealCurrent)&&(
            <View style={{marginTop: 12, marginBottom: 24}}>
              <BlockInformation
                type="error"
                message={allTranslations(localization.walletCoinSendConfirm.errorDealOutDate)}
              />
            </View>
          )}

        </ScrollView>

        <ControlsComponent
          ref={this.refFooter}

          isDealCurrent={isDealCurrent}
          isDisabledControls={isDisabledControls}

          signTransaction={() => this.startSignTransaction()}
          onChangeDealCurrent={(isDealCurrent) => this.setState({ isDealCurrent })}
          onUpdateDeal={this.updateDialTransaction}
        />

        <ModalApplicationLock
          open={isShowConfirm}
          type="transactionSignature"

          onClose={() => this.setState({ isShowConfirm: false })}
        />

        <ModalLoading
          open={isModalLoading}
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
    flexDirection: "row",
    alignItems: "center",

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
  }

});

export default WalletCoinSendConfirm;
