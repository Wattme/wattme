import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView
} from "react-native/index";
import {
  Button
} from "react-native-ui-lib";
import {
  Header, ModalFullInformation,
  ModalLoading,
  PopUpChangePassword,
} from "../../../components";
import {
  ProfileForm as ProfileFormComponent,
  ProfileInformation as ProfileInformationComponent
} from "./components";
import Notification from "../../../common/Notification";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import agent from "../../../agent/agent";
import urls from "../../../constants/urls";
import { removeItem } from "../../../common/Storage";
import settings from "../../../constants/settings";
import { base64toBlob } from "../../../helpers/image";
import agentWiseWin from "../../../agent/agentWiseWin";

class AccountProfileMeEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: {...(props.global?.account || {})},
      routeParams: {...props?.route?.params || {}},

      isLoading: false,
      openPopUpChangePassword: false,
      isNotificationSuccessRegistration: false,
    };

    this.refForm = React.createRef();
    this.refPopUpChangePassword = React.createRef();
  }

  componentDidMount = () => {};

  updateAccount = async (form) => {
    this.setState({ isLoading: true });

    // Форматирование номера телефона
    form.phone = (form.phone || "").replace(/\D+/g,"");

    const data = await agent.put(urls.userUpdate, form).then((res) => {
      return res.data
    }).catch((err) => {
      return { error: err?.response }
    });
    if (data?.error) {
      this.setState({ isLoading: false });

      const messageError = this._getMessageError(data?.error);

      Notification.send({
        type: "danger",
        message: messageError
      })

      // TODO ДОБАВИТЬ ОБРАБОТЧИК ОШИБКИ

      return null
    }

    const account = await agent.get(urls.userMe).then((res) => {
      return res.data?.user
    }).catch((err) => {
      return {}
    });
    const accountWiseWin = await agentWiseWin.get(`${ urls.getWiseWinAccount }${ account?.wisewinId }`).then((res) => {
      return res.data
    }).catch((err) => {
      return {}
    });

    this.props.setAccountApp(account);
    this.props.wiseWinSetProfile(accountWiseWin);

    Notification.send({
      message: allTranslations(localization.accountProfileMeEdit.notification.successUpdateForm),
      type: "success"
    })

    this.setState({ isLoading: false });

    if (this.state.routeParams?.isShowWelcomeRegistration) {
      this.setState({ isNotificationSuccessRegistration: true })
    }

    this.props.navigation.goBack();
  }
  changePassword = async (form) => {
    this.setState({ isLoading: true });

    const setPassword = await agent.put(`${ urls.usersUpdatePassword }`, {
      currentPassword: form.oldPassword,
      newPassword: form.newPassword,
    }).then((res) => {
      return res.data
    }).catch((err) => {
      return { error: err.response }
    });
    if (setPassword.error) {
      this.setState({ isLoading: false });

      const message = Boolean(localization.accountProfileMeEdit.errorsChangPassword?.[setPassword.error?.data?.code]) ? allTranslations(localization.accountProfileMeEdit.errorsChangPassword?.[setPassword.error?.data?.code]) : allTranslations(localization.errors["internal-error"]);
      Notification.send({
        message: message,
        type: "danger"
      })

      return null
    }

    Notification.send({
      message: allTranslations(localization.accountProfileMeEdit.successChangePassword),
      type: "success"
    })

    this.refPopUpChangePassword.current.closeModalize();

    this.setState({ isLoading: false });
  }

  setAvatar = async (base64) => {
    let file = base64toBlob(base64);
  }

  onLogout = async () => {
    await removeItem("jwt");

    this.props.setAccountApp({});
    this.props.setAccountTraid({});
    this.props.wiseWinSetProfile({});
  }

  _openPopUpChangePassword = async () => {
    this.refPopUpChangePassword.current.openModalize();
  }
  _connectAccountTrading = () => {
    this.setState({isNotificationSuccessRegistration: false});
    this.props.navigation.navigate("TradingConnection")
  }
  _getMessageError = (error) => {

    // Если ошибка 500
    if (error?.status === 500) {
      return allTranslations(localization.errors["internal-error"])
    }

    // Если ошибка 400
    if (error?.status === 400 && (error?.data?.details || []).length > 0) {
      let errorMessage = [];

      (error?.data?.details || []).map(( detail ) => {
        const labelError = Boolean(localization.accountProfileMeEdit.form?.[`${detail?.property}Label`]) ?
          allTranslations(localization.accountProfileMeEdit.form?.[`${detail?.property}Label`]) :
          detail?.property;

        let message = allTranslations(localization.accountProfileMeEdit.errorsChangeProfile.inCorrectField, {
          field: labelError
        });

        errorMessage.push(message);
      })


      if ( errorMessage.length > 0 ) {
        return errorMessage.join("\n")
      }
    }

    return allTranslations(localization.errors["internal-error"])
  }

  render() {
    const {
      account,
      isLoading,
      openPopUpChangePassword,
      isNotificationSuccessRegistration
    } = this.state;
    const {
      isRegistration
    } = this.props?.route?.params || {};
    const {
      wiseWinAccount
    } = this.props;

    return (
      <View style={styles.root}>

        <Header title={allTranslations(localization.accountProfileMeEdit.headerTitle )}/>

        <ScrollView style={{flexGrow: 1}} contentContainerStyle={styles.scrollView}>

          <ProfileInformationComponent
            account={account}
            wiseWinAccount={wiseWinAccount}

            onLogout={this.onLogout}
            onSetAvatar={this.setAvatar}
          />

          <View style={{marginTop: 12}}/>

          <ProfileFormComponent
            isRegistration={isRegistration}

            innerRef={this.refForm}
            initForm={account}
            wiseWinAccount={wiseWinAccount}

            onSubmit={this.updateAccount}
          />

          {
            Boolean(false) && (
              <>
                <View style={{ marginTop: 16 }}/>
                <Button
                  label={allTranslations(localization.accountProfileMeEdit.changePassword)}
                  style={styles.buttonChangePassword}
                  labelStyle={styles.buttonChangePasswordLabel}

                  onPress={this._openPopUpChangePassword}
                />
              </>
            )
          }

        </ScrollView>

        <PopUpChangePassword
          ref={this.refPopUpChangePassword}
          onChange={this.changePassword}
        />

        <ModalLoading
          open={isLoading}
        />

        <ModalFullInformation
          open={isNotificationSuccessRegistration}
          image={require("../../../assets/icons/application-greeting/smart-trading.png")}
          title={allTranslations(localization.modalWelcome.title)}
          message={allTranslations(localization.modalWelcome.message)}

          onNext={this._connectAccountTrading}
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
  },

  buttonChangePassword:  {
    backgroundColor: "#8E8E8E",
    borderColor: "#8E8E8E",
    height: 40,
    paddingVertical: 0,
    marginHorizontal: 16
  },
  buttonChangePasswordLabel: {
    color: "white",
    fontSize: 18,
    lineHeight: 21
  }
});

export default AccountProfileMeEdit;
