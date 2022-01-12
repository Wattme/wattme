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
  ProfileInformation as ProfileInformationComponent,
  ProfileForm as ProfileFormComponent
} from "./components";
import Notification from "../../../common/Notification";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import agent from "../../../agent/agent";
import urls from "../../../constants/urls";


class SettingsProfileMe extends Component {
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

    const data = await agent.put(urls.userUpdate, form).then((res) => {
      return res.data
    }).catch((err) => {
      return { error: err?.response }
    });
    if (data?.error) {
      this.setState({ isLoading: false });

      Notification.send({
        type: "danger",
        message: allTranslations(localization.errors["internal-error"])
      })

      // TODO ДОБАВИТЬ ОБРАБОТЧИК ОШИБКИ

      return null
    }

    const account = await agent.get(urls.userMe).then((res) => {
      return res.data?.user
    }).catch((err) => {
      return {}
    });

    this.props.updateAccount(account);

    Notification.send({
      message: allTranslations(localization.accountProfileMeEdit.notification.successUpdateForm),
      type: "success"
    })

    this.setState({ isLoading: false });

    if (this.state.routeParams?.isShowWelcomeRegistration) {
      this.setState({ isNotificationSuccessRegistration: true })
    }
  }


  _openPopUpChangePassword = async () => {
    this.refPopUpChangePassword.current.openModalize();
  }

  _connectAccountTrading = () => {
    this.setState({isNotificationSuccessRegistration: false});
    this.props.navigation.navigate("TradingConnection")
  }

  render() {
    const {
      account,
      isLoading,
      openPopUpChangePassword,
      isNotificationSuccessRegistration
    } = this.state;

    return (
      <View style={styles.root}>

        <Header title={allTranslations(localization.accountProfileMeEdit.headerTitle )}/>

        <ScrollView style={{flexGrow: 1}} contentContainerStyle={styles.scrollView}>

          <ProfileInformationComponent
            account={account}
          />

          <View style={{marginTop: 12}}/>

          <ProfileFormComponent
            innerRef={this.refForm}
            initForm={account}

            onSubmit={this.updateAccount}
          />

          <View style={{ marginTop: 16 }}/>

          <Button
            label={allTranslations(localization.accountProfileMeEdit.changePassword)}
            style={styles.buttonChangePassword}
            labelStyle={styles.buttonChangePasswordLabel}

            onPress={this._openPopUpChangePassword}
          />

        </ScrollView>

        <PopUpChangePassword
          ref={this.refPopUpChangePassword}
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

export default SettingsProfileMe;
