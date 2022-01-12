import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native/index";
import {
  WalletAccount as WalletAccountComponent,
  ExchangeAccount as ExchangeAccountComponent,
  MarketInformation as MarketInformationComponent,
  LongShortBlock as LongShortBlockComponent
} from "./components";
import {
  Header,
  PopUpInformation,
  PopUpRegistration,
  ModalFullInformation
} from "../../../components";
import {
  HeaderSettings as HeaderSettingsIcon
} from "../../../assets/icons";
import getHeightStatusBar from "../../../helpers/getHeightStatusBar";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";

const heightStatusBar = getHeightStatusBar();

class DashboardHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPopUpRegistration: false
    };

    this.refAlertConfirmation = React.createRef();
    this.refPopUpRegistration = React.createRef();
  }

  updateAccount = (account) => {
    this.props.updateAccount(account);
    this.setState({ isNotificationSuccessRegistration: true });
  }

  _openInformationCreatWallet = () => {
    this.refAlertConfirmation.current.open({
      title: allTranslations(localization.dashboardHome.infoWalletCreate.title),
      message: allTranslations(localization.dashboardHome.infoWalletCreate.message),
      cancelButton: allTranslations(localization.dashboardHome.infoWalletCreate.buttonCancel),
      successButton: allTranslations(localization.dashboardHome.infoWalletCreate.buttonConfirm),

      controls: "confirm",
      onConfirm: this._closeInformationCreatWallet.bind()
    });
  }
  _closeInformationCreatWallet = () => {
    this.refAlertConfirmation.current.close();
  }

  _connectAccountTrading = () => {
    const { account } = this.props.global;

    if (Object.keys(account || {}).length <= 0) {
      this.refPopUpRegistration.current.open();

      return null
    }

    this.setState({ isNotificationSuccessRegistration: false });
    this.props.navigation.navigate("TradingConnection");
  }

  _headerRightContent = () => {
    const routeSettings = () => {
      this.props.navigation.navigate("SettingsHome");
    }

    return (
      <TouchableOpacity style={styles.buttonSettings} activeOpacity={0.6} onPress={routeSettings}>
        <HeaderSettingsIcon/>
      </TouchableOpacity>
    )
  }

  render() {
    const {
      global,
      binance
    } = this.props;
    const {
      isPopUpRegistration,
      isNotificationSuccessRegistration
    } = this.state;

    return (
      <View style={styles.root}>

        <Header
          title={allTranslations(localization.dashboardHome.headerTitle)}
          styleRoot={{ backgroundColor: "transparent" }}
          hideLeft
          rightContent={this._headerRightContent}
        />

        <ScrollView contentContainerStyle={styles.scrollView}>

          <WalletAccountComponent
            wallet={global?.wallet || {}}
            currencies={global?.currencies || []}
            userCurrencies={global?.userCurrencies || []}

            openInformationCreatWallet={this._openInformationCreatWallet}
          />

          <View style={{marginTop: 12}}/>

          <ExchangeAccountComponent
            profile={binance?.profile || {}}
            userCurrencies={global?.userCurrencies || []}

            navigation={this.props.navigation}
            connectAccountTrading={this._connectAccountTrading}

            currencies={global?.currencies || []}
            fiats={global?.fiats || []}
          />

          {
            Boolean (false) && (
              <>

                <View style={{marginTop: 12}}/>

                <MarketInformationComponent
                  currencies={global?.currencies || []}
                />

              </>
            )
          }

          <View style={{marginTop: 12}}/>

          <LongShortBlockComponent/>

          <PopUpInformation
            ref={this.refAlertConfirmation}
          />

          <PopUpRegistration
            innerRef={this.refPopUpRegistration}

            open={isPopUpRegistration}
            onClose={() => this.setState({isPopUpRegistration: false})}
            navigation={this.props.navigation}
            updateAccount={this.updateAccount}
          />

        </ScrollView>

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
    paddingVertical: 12
  },

  buttonSettings: {
    height: 32,
    width: 32,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default DashboardHome;
