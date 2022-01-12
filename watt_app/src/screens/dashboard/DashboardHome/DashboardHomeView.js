import React, { Component } from "react";
import {
  View,
  Animated,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native/index";
import {
  Button
} from "react-native-ui-lib";
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
import { getItem } from "../../../common/Storage";

const heightStatusBar = getHeightStatusBar();


const initSettingsDashboard = {
  wallet: {
    visible: true,
    index: 0
  },
  stockExchange: {
    visible: true,
    index: 1
  },
  market: {
    visible: true,
    index: 2
  },
  longShort: {
    visible: true,
    index: 3
  },
  trades: {
    visible: true,
    index: 4
  },
  bots: {
    visible: true,
    index: 5
  },
};

class DashboardHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settingsDashboard: { ...initSettingsDashboard },

      isPopUpRegistration: false
    };

    this.refAlertConfirmation = React.createRef();
    this.refPopUpRegistration = React.createRef();
  }

  componentDidMount = async () => {
    await this.getDashboardSettings();
    this.props.navigation.addListener("focus", async () => {
      await this.getDashboardSettings();
    });
  }

  // Получение конфигурации отображение компонентов DashBoard
  getDashboardSettings = async () => {
    const settingsDashboardString = await getItem("settings-dashboard");

    if (!settingsDashboardString) {
      return null
    }

    const settingsDashboard = JSON.parse(settingsDashboardString);

    this.setState({
      settingsDashboard
    });
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
      onConfirm: this._routeWalletChoiceAdding.bind()
    });
  }
  _closeInformationCreatWallet = () => {
    this.refAlertConfirmation.current.close();
  }
  _connectAccountTrading = () => {
    const { account } = this.props.global;

    if (Object.keys(account || {}).length <= 0) {
      this.props.navigation.navigate("Account", {
        screen: "AccountLogin",
        initial: false
      });

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

  _routeDashboardHomeSettings = () => {
    this.props.navigation.navigate("DashboardHomeSettings");
  }
  _routeWalletChoiceAdding = () => {
    this._closeInformationCreatWallet();
    this.props.navigation.navigate("Wallet", {
      screen: "WalletChoiceAdding",
      initial: false
    });
  }
  _routeWalletDashboard = () => {
    this.props.navigation.navigate("Wallet", {
      screen: "WalletDashboard",
      initial: false
    });
  }

  render() {
    const {
      global,
      binance
    } = this.props;
    const {
      settingsDashboard,

      isPopUpRegistration,
      isNotificationSuccessRegistration
    } = this.state;

    return (
      <View style={styles.root}>

        <Header
          title={allTranslations(localization.dashboardHome.headerTitle)}
          hideLeft
          rightContent={this._headerRightContent}
        />

        <ScrollView
          contentContainerStyle={styles.scrollView}
        >

          <>


            {
              Boolean( settingsDashboard?.wallet?.visible ) && (
                <>
                  <WalletAccountComponent
                    wallet={global?.wallet || {}}
                    fiats={global?.fiats || []}
                    currencies={global?.currencies || []}
                    userCurrencies={global?.userCurrencies || []}
                    openInformationCreatWallet={this._openInformationCreatWallet}

                    routeWalletDashboard={this._routeWalletDashboard}
                  />
                  <View style={{marginTop: 12}}/>
                </>
              )
            }

            {
              Boolean( settingsDashboard?.stockExchange?.visible ) && (
                <>
                  <ExchangeAccountComponent
                    profile={binance?.profile || {}}
                    listKeys={binance?.listKeys || []}
                    userCurrencies={global?.userCurrencies || []}
                    navigation={this.props.navigation}
                    connectAccountTrading={this._connectAccountTrading}
                    currencies={global?.currencies || []}
                    fiats={global?.fiats || []}
                  />
                  <View style={{marginTop: 12}}/>
                </>
              )
            }

            {
              Boolean( settingsDashboard?.market?.visible && false ) && (
                <>
                  <MarketInformationComponent
                    currencies={global?.currencies || []}
                  />
                  <View style={{marginTop: 12}}/>
                </>
              )
            }

            {
              Boolean( settingsDashboard?.longShort?.visible ) && (
                <>
                  <LongShortBlockComponent/>
                  <View style={{marginTop: 12}}/>
                </>
              )
            }

          </>

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

          <View style={{marginTop: 12}}/>

          <Button
            label={allTranslations(localization.dashboardHome.buttonSettingsDashboard)}
            size="small"
            style={styles.buttonSettingsDashboard}
            labelStyle={styles.buttonSettingsDashboardLabel}
            onPress={this._routeDashboardHomeSettings }
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
  },

  buttonSettingsDashboard: {
    height: 36,
    borderRadius: 8,
    backgroundColor: "#8E8E8E",
    borderColor: "#8E8E8E"
  },
  buttonSettingsDashboardLabel: {
    fontSize: 16,
    lineHeight: 19,
    color: "white",
    fontWeight: "normal"
  },
});

export default DashboardHome;
