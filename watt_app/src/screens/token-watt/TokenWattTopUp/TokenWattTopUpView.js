import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView, Linking,
} from "react-native/index";
import {} from "react-native-ui-lib";
import {
  BlockInformation,
  Header,
  ModalLoading,
  PopUpInformation,
  PopUpLoadTransaction,
  PopUpSuccessTransaction,
} from "../../../components";
import {
  SliderAmount as SliderAmountComponent,
  AvailableAmountTokens as AvailableAmountTokensComponent,
  RoundInformation as RoundInformationComponent,
  CalcForm as CalcFormComponent,
  Footer as FooterComponent,
} from "./components";
import Notification from "../../../common/Notification";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import agentWiseWin from "../../../agent/agentWiseWin";
import urls from "../../../constants/urls";
import agent from "../../../agent/agent";
import { convertorNumber } from "../../../helpers/convertor";
import { fiatSymbol } from "../../../common/FiatsConverter";
import { wattTokenCreateTransaction } from "../../../utils/wise-win/watt-token";


class TokenWattTopUp extends Component {
  constructor(props) {
    super(props);

    this.state = {

      currentAmountWatt: 50,
      totalAmountFromPool: 150,


      priceWattToken: 0,

      timestampNextRound: 1642204800000,


      isModalLoading: false,

    };


    this.refCalcForm = React.createRef();
    this.refPopUpInformation = React.createRef();
    this.refPopUpLoadTransaction = React.createRef();
    this.refPopUpSuccessTransaction = React.createRef();
  }

  componentDidMount = async () => {
    await this.getCourseWatt();
  };

  getCourseWatt = async () => {

    const priceWattToken = await agentWiseWin.get(urls.getWiseWinWattCourse).then((res) => {
      return res.data;
    }).catch(() => {
      return 0;
    });

    this.setState({
      priceWattToken,
    });
  };


  // Подготовка оредера к покупке
  onPrepareOrder = async () => {
    const ADDRESS_CONTRACT = this.props?.walletImportInfo?.wattBuyContract || "0x819D10fa9F629FF54c5bc910F9772073f5FEFb61";

    const amount = +this.refCalcForm?.current?.state?.amount || 0;
    if (amount <= 0) {
      Notification.send({
        message: allTranslations(localization.tokenWattTopUp.deal.errorAmount),
        type: "danger",
      });

      return null;
    }

    const walletBusd = (this.props.wallet?.list || []).find((t) => t.code === "BUSD");

    const isWalletBusd = Boolean(walletBusd);
    if (!isWalletBusd) {
      Notification.send({
        message: allTranslations(localization.tokenWattTopUp.deal.errorWalletNotFount),
        type: "danger",
      });

      return null
    }

    const isWalletBusdBalanceError = Boolean(+walletBusd?.printedBalance <= amount);
    if (isWalletBusdBalanceError) {
      Notification.send({
        message: allTranslations(localization.tokenWattTopUp.deal.errorWalletBusdBalance, {
          amount: walletBusd?.printedBalance
        }),
        type: "danger",
      });

      return null
    }

    this.setState({ isModalLoading: true });

    const prepareOrder = await agent.get(`/wisewin/invoice?price=${ amount }`).then((res) => {
      return res.data?.invoice;
    }).catch((err) => {
      return { error: err.response };
    });

    this.setState({ isModalLoading: false });

    this.refPopUpInformation.current.open({
      title: allTranslations(localization.tokenWattTopUp.deal.titleGetWattPopUp),
      message: allTranslations(localization.tokenWattTopUp.deal.messageGetWattPopUp, {
        amount: amount,
        address: ADDRESS_CONTRACT,
        amountWatt: convertorNumber((+(amount) / this.state.priceWattToken), 2, '.'),
      }),
      controls: "confirm",

      onConfirm: this.onCreateOrder.bind(this),
    });
  };

  // Создание оредера для покупки
  onCreateOrder = async () => {

    this.refPopUpInformation.current.close();
    this.refPopUpLoadTransaction.current.open();

    const ADDRESS_CONTRACT = this.props?.walletImportInfo?.wattBuyContract || "0x819D10fa9F629FF54c5bc910F9772073f5FEFb61";

    const response = await wattTokenCreateTransaction({
      amount: this.refCalcForm?.current?.state?.amount,
      ADDRESS_CONTRACT
    });
    if (response.error) {
      this.refPopUpLoadTransaction.current.close();

      const errorMessage = response.error?.reason || "";

      Notification.send({
        type: "danger",
        message: errorMessage
      })


      return null
    }


    this.refPopUpLoadTransaction.current.close();
    this.refPopUpSuccessTransaction.current.open({
      onConfirm: this._openBlockChain.bind(this, response),
      onCancel: this._routeGoBack.bind(this)
    });
  };


  _openBlockChain = async (transaction) => {
    await Linking.openURL(`https://bscscan.com/tx/${ transaction?.hash }`);
  }
  _routeGoBack = () => {
    this.props.navigation.goBack();
  };

  _openLitePaper = () => {

  }

  render() {
    const {
      currentAmountWatt,
      totalAmountFromPool,

      priceWattToken,

      timestampNextRound,


      isModalLoading,
    } = this.state;
    const walletBusd = (this.props.wallet?.list || []).find((t) => t.code === "BUSD");

    return (
      <View style={styles.root}>

        <Header
          title={allTranslations(localization.tokenWattTopUp.headerTitle)}
        />

        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.container}>

            {
              Boolean(false) && (
                <>
                  <SliderAmountComponent
                    currentAmountWatt={currentAmountWatt}
                    totalAmountFromPool={totalAmountFromPool}
                  />

                  <View style={{ marginTop: 25 }} />

                  <AvailableAmountTokensComponent />

                  <View style={{ marginTop: 15 }} />
                </>
              )
            }

            <RoundInformationComponent
              priceWattToken={priceWattToken}
            />

            <View style={{ marginTop: 15 }} />

            <View style={styles.separate} />

            <View style={{ marginTop: 16 }} />

            <CalcFormComponent
              ref={this.refCalcForm}
              priceWattToken={priceWattToken}
            />

            <View style={{ marginTop: "auto", marginBottom: 16 }} />

            <FooterComponent
              walletBusd={walletBusd}

              onCancel={this._routeGoBack}
              onPrepareOrder={this.onPrepareOrder}
            />

          </View>
        </ScrollView>

        <ModalLoading
          open={isModalLoading}
        />

        <PopUpInformation
          ref={this.refPopUpInformation}
        />

        <PopUpLoadTransaction
          ref={this.refPopUpLoadTransaction}
        />

        <PopUpSuccessTransaction
          ref={this.refPopUpSuccessTransaction}
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
    flexGrow: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  container: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: "white",
    padding: 16,
  },

  separate: {
    height: 2,
    backgroundColor: "#F2F3F4",
  },
});

export default TokenWattTopUp;
