import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
} from "react-native/index";
import {

} from "react-native-ui-lib";
import {
  ModalLoading
} from "../../../components";
import {
  Header as HeaderComponent,
  TradeControl as TradeControlComponent,
  Goals as GoalsComponent,
  InformationDial as InformationDialComponent,
  StagesTransaction as StagesTransactionComponent,
  PopUpMessage as PopUpMessageComponent
} from "./components";
import Notification from "../../../common/Notification";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import agent from "../../../agent/agent";
import urls from "../../../constants/urls";


class TradingTradeInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trade: props?.route?.params?.trade || {},

      note: "",

      isShowPopUpMessage: false,
      isModalLoading: false
    };
  }


  cancelOrder = async () => {
    const { trade } = this.state;

    this.setState({ isModalLoading: true });

    const response = await agent.put(`${ urls.tradingCancelOrder }?symbol=${ trade?.symbol }&orderId=${ trade?.orderId }`, {}).then((res) => {
      return res.data
    }).catch((err) => {
      return { error: err?.response }
    })

    if ( response?.error ) {

      Notification.send({
        type: "danger",
        message: allTranslations(localization.errors["internal-error"])
      })

      this.setState({ isModalLoading: false });

      return null
    }

    Notification.send({
      message: allTranslations(localization.tradingTradeInfo.cancelOrder.successMessage),
      type: "success"
    });

    this.setState({ isModalLoading: false });

    this.props.navigation.goBack();
  }

  _openPopUpMessage = () => {
    this.setState({ isShowPopUpMessage: true });
  }
  _closePopUpMessage = () => {
    this.setState({ isShowPopUpMessage: false });
  }
  _savePopUpMessage = (note) => {
    this.setState({ note });
  }

  render() {
    const {
      trade,

      note,

      isShowPopUpMessage,
      isModalLoading
    } = this.state;
    const {
      global
    } = this.props;

    return (
      <View style={styles.root}>

        <HeaderComponent
          title={allTranslations(localization.tradingTradeInfo.headerTitle)}
        />

        <ScrollView style={{flexGrow: 1}} contentContainerStyle={styles.scrollView}>

          <TradeControlComponent
            trade={trade}

            fiats={global.fiats}
            currencies={global.currencies}

            onCancelOrder={this.cancelOrder}
          />

          {/*<View style={{marginTop: 12}}/>*/}

          {/*<GoalsComponent/>*/}

          {/*<View style={{marginTop: 12}}/>*/}

          {/*<InformationDialComponent*/}

          {/*  openPopUpMessage={this._openPopUpMessage}*/}
          {/*/>*/}

          {/*<View style={{marginTop: 12}}/>*/}

          {/*<StagesTransactionComponent/>*/}

        </ScrollView>


        <PopUpMessageComponent
          open={isShowPopUpMessage}
          note={note}

          onClose={this._closePopUpMessage}
          onSave={this._savePopUpMessage}
        />

        <ModalLoading
          open={isModalLoading}
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
    paddingHorizontal: 12,
    paddingVertical: 16
  }
});

export default TradingTradeInfo;
