import React, { Component } from "react";
import {
  View,
  Linking,
  StyleSheet,
  ScrollView,
  NativeModules,
  TouchableOpacity
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  PopUpFiatCurrency as PopUpFiatCurrencyComponent,
  PopUpLanguage as PopUpLanguageComponent
} from "./components";
import {
  SettingsMenuWallet as SettingsMenuWalletIcon,
  SettingsMenuLanguage as SettingsMenuLanguageIcon,
  SettingsMenuFiat as SettingsMenuFiatIcon,
  SettingsMenuWalletConnect as SettingsMenuWalletConnectIcon,
  SettingsMenuExchanges as SettingsMenuExchangesIcon,
  SettingsTechnicalSupport as SettingsTechnicalSupportIcon,
  SettingsMenuSecurity as SettingsMenuSecurityIcon,
  SettingsMenuPushNotification as SettingsMenuPushNotificationIcon,
  SettingsMenuTermsOfUse as SettingsMenuTermsOfUseIcon,
  SettingsMenuPrivacyPolicy as SettingsMenuPrivacyPolicyIcon,
  SettingsMenuVersionApp as SettingsMenuVersionAppIcon,
  SettingsMenuTheme as SettingsMenuThemeIcon,

  CommonArrowRight as CommonArrowRightIcon
} from "../../../assets/icons";
import {
  Header,
  ModalLoading,
  PopUpInformation
} from "../../../components";
import RNRestart from "react-native-restart";
import Notification from "../../../common/Notification";
import getHeightStatusBar from "../../../helpers/getHeightStatusBar";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import agent from "../../../agent/agent";
import urls from "../../../constants/urls";
import { removeItem, setItem } from "../../../common/Storage";
import settings from "../../../constants/settings";
import languages from "../../../constants/languages";

const heightStatusBar = getHeightStatusBar();

class SettingsHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };

    this.refPopUpForgotPassword = React.createRef();
    this.refPopUpRegistration = React.createRef();
    this.refPopUpFiatCurrency = React.createRef();
    this.refPopUpInformation = React.createRef();
    this.refPopUpLanguage = React.createRef();
  }

  componentDidMount = () => {
  };

  onLogin = async (form) => {
    this.setState({ isLoading: true });

    const data = await agent.post(urls.userAuth, {
      ...form
    }).then((res) => {
      return res.data
    }).catch((err) => {
      return { error: err.response }
    });
    if (data.error) {
      this.setState({ isLoading: false });

      const message = allTranslations(localization.settingsHome.auth.errors[data.error?.data?.code]) || allTranslations(localization.errors["internal-error"]);

      Notification.send({
        message: message,
        type: "danger"
      })

      return null
    }

    await setItem(data.jwt, "jwt");
    agent.defaults.headers["x-auth-token"] = data?.jwt;

    const account = await agent.get(urls.userMe).then((res) => {
      return res.data?.user || {}
    }).catch((err) => {
      return {}
    })

    await this.props.updateAccount(account);

    this.setState({ isLoading: false });
  }
  onExit = async () => {

    await this.props.updateAccount({});
    await this.props.setProfile({});

    await removeItem("jwt");

  }

  updateAccount = async (account) => {
    this.props.updateAccount(account);
  }

  onSetFiats = async (list) => {
    this.props.updateUserCurrencies(list);
    this.refPopUpFiatCurrency.current?.close();
  }
  onSetLanguage = async (language) => {

    await setItem(language, "language");

    RNRestart.Restart();

  }

  _sectionMenu = () => {
    const {
      wallet,
      language,
      appVersion,
      userCurrencies
    } = this.props?.global;

    return [
      [
        {
          icon: SettingsMenuWalletIcon,
          label: allTranslations(localization.settingsHome.menu.wallet),
          caption: wallet?.label,
          onPress: this._routeWalletDashboard.bind()
        },
        {
          icon: SettingsMenuLanguageIcon,
          label: allTranslations(localization.settingsHome.menu.languageSelection),
          caption: allTranslations(localization.languages?.[language]),
          onPress: this._openSelectLanguage.bind()
        },
        {
          icon: SettingsMenuFiatIcon,
          label: allTranslations(localization.settingsHome.menu.currency),
          caption: (userCurrencies || []).join(', '),
          onPress: this._openPopUpFiatCurrency.bind(this)
        },
      ],
      [
        {
          icon: SettingsMenuWalletConnectIcon,
          label: allTranslations(localization.settingsHome.menu.walletConnect),
          onPress: this._routeSettingsWalletConnect.bind(this)
        },
        {
          icon: SettingsMenuExchangesIcon,
          label: allTranslations(localization.settingsHome.menu.myExchanges),
          onPress: this._routeTradingConnection.bind()
        },
      ],
      [
        {
          icon: SettingsMenuSecurityIcon,
          label: allTranslations(localization.settingsHome.menu.security)
        },
        {
          icon: SettingsMenuThemeIcon,
          label: allTranslations(localization.settingsHome.menu.theme)
        },
        {
          icon: SettingsMenuPushNotificationIcon,
          label: allTranslations(localization.settingsHome.menu.pushNotification)
        },
      ],
      [
        {
          icon: SettingsTechnicalSupportIcon,
          label: allTranslations(localization.settingsHome.menu.technicalSupport),
          onPress: this._openTechnicalSupport.bind(this)
        },
        {
          icon: SettingsMenuPrivacyPolicyIcon,
          label: allTranslations(localization.settingsHome.menu.privacyPolicy),
          onPress: this._openPrivacyPolicy.bind(this)
        },
        {
          icon: SettingsMenuTermsOfUseIcon,
          label: allTranslations(localization.settingsHome.menu.termsOfUse),
          onPress: this._openTermsOfUse.bind(this)
        },
      ],
      [
        {
          icon: SettingsMenuVersionAppIcon,
          label: `${ allTranslations(localization.settingsHome.menu.versionApp) } ${ appVersion }`
        }
      ]
    ]
  }

  _openTechnicalSupport = () => {

    const openLinkTechnicalSupport = () => {
      Linking.openURL(`tg://resolve?domain=${settings.telegramBot}&start=tgorg`);
    }

    this.refPopUpInformation.current.open({
      title: allTranslations(localization.settingsHome.technicalSupport.title),
      message: allTranslations(localization.settingsHome.technicalSupport.message),
      successButton: allTranslations(localization.settingsHome.technicalSupport.successButton),
      successButtonColor: "primary",
      onConfirm: openLinkTechnicalSupport.bind(this)
    });
  }
  _openPrivacyPolicy = () => {

    const openLinkPrivacyPolicy = () => {
      Linking.openURL(urls.privacyPolicy)
    }

    this.refPopUpInformation.current.open({
      title: allTranslations(localization.settingsHome.privacyPolicy.title),
      message: allTranslations(localization.settingsHome.privacyPolicy.message),
      successButton: allTranslations(localization.settingsHome.privacyPolicy.successButton),
      successButtonColor: "primary",

      onConfirm: openLinkPrivacyPolicy.bind(this)
    });
  }
  _openTermsOfUse = () => {

    const openLinkTermsOfUse = () => {
      Linking.openURL(urls.termsOfUse)
    }

    this.refPopUpInformation.current.open({
      title: allTranslations(localization.settingsHome.termsOfUse.title),
      message: allTranslations(localization.settingsHome.termsOfUse.message),
      successButton: allTranslations(localization.settingsHome.termsOfUse.successButton),
      successButtonColor: "primary",

      onConfirm: openLinkTermsOfUse.bind(this)
    });
  }
  _openSelectLanguage = () => {
    this.refPopUpLanguage.current?.open();
  }
  _openPopUpFiatCurrency = () => {
    this.refPopUpFiatCurrency.current?.open();
  }

  _routeWalletDashboard = () => {
    this.props.navigation.navigate("Wallet", {
      screen: "WalletChoosingWallet",
      initial: false
    });
  }
  _routeSettingsVersionApp = () => {
    this.props.navigation.navigate("SettingsVersionApp");
  }
  _routeSettingsSecurity = () => {
    this.props.navigation.navigate("SettingsSecurity");
  }
  _routeSettingsPushNotification = () => {
    this.props.navigation.navigate("SettingsPushNotification");
  }
  _routeTokenWattBuyingToken = () => {
    this.props.navigation.navigate("TokenWattBuyingToken");
  }
  _routeTradingConnection = () => {
    this.props.navigation.navigate("TradingConnection");
  }
  _routeSettingsWalletConnect = () => {
    this.props.navigation.navigate("SettingsWalletConnect");
  }

  render() {
    const {
      isLoading
    } = this.state;
    const {
      global
    } = this.props;
    const sectionMenu = this._sectionMenu();

    return (
      <View style={styles.root}>

        <Header title={ allTranslations(localization.settingsHome.header) }/>

        <ScrollView contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 16 }} showsVerticalScrollIndicator={false}>

          <View style={styles.menuContainer}>
            {(sectionMenu || []).map((section, idxSection) => (
              <View key={`menuSection-${idxSection}`}>

                <View style={styles.menuSection}>
                  {(section || []).map((item, idxItem) => (
                    <TouchableOpacity key={`menuSection-${idxSection}-${idxItem}`} style={styles.menuItem} onPress={item.onPress} activeOpacity={0.8} disabled={!item.onPress}>
                      <View style={styles.menuItemIcon}>
                        <item.icon/>
                      </View>
                      <Text style={styles.menuItemName} numberOfLines={1}>{ item.label }</Text>
                      <Text style={styles.menuItemCaption} numberOfLines={1}>{ item.caption }</Text>
                      <View style={styles.menuItemArrow}>
                        <CommonArrowRightIcon color="#8E8E8E"/>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>

                {Boolean(sectionMenu.length - 1 > idxSection) && (
                  <View style={styles.menuSectionArrow}/>
                )}

              </View>
            ))}
          </View>

        </ScrollView>

        <ModalLoading
          open={isLoading}
        />

        <PopUpFiatCurrencyComponent
          innerRef={this.refPopUpFiatCurrency}
          fiats={global?.fiats || []}
          userCurrencies={global?.userCurrencies || []}
          onSetFiats={this.onSetFiats}
        />

        <PopUpInformation
          ref={this.refPopUpInformation}
          isCloseBackDrop
        />

        <PopUpLanguageComponent
          innerRef={this.refPopUpLanguage}
          languages={languages}
          language={global?.language}
          onSetLanguage={this.onSetLanguage}
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

  header: {
    paddingTop: heightStatusBar + 16,
    paddingBottom: 16,
  },
  headerTitle: {
    textAlign: "center",
    fontSize: 22,
    lineHeight: 26,
    fontWeight: "500",
    color: "#000000"
  },

  menuContainer: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: 16
  },
  menuSection: {
    marginBottom: -16
  },
  menuSectionArrow: {
    marginVertical: 15,
    height: 2,
    backgroundColor: "#F2F3F4",
    marginLeft: 44
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 16
  },
  menuItemIcon: {
    width: 32,
    height: 32,
    marginRight: 12
  },
  menuItemName: {
    flex: 1,
    fontSize: 17,
    lineHeight: 20,
    color: "#2E2E2E",
    fontWeight: "500"
  },
  menuItemCaption: {
    maxWidth: 180,
    fontSize: 16,
    lineHeight: 19,
    color: "#8E8E8E",
    textAlign: "right"
  },
  menuItemArrow: {
    width: 16,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12
  },
});

export default SettingsHome;
