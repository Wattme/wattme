import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  Header,
  ModalLoading,
  PopUpChangePassword
} from "../../../components";
import {
  BasicInformation as BasicInformationComponent,
  AdditionalInformation as AdditionalInformationComponent,
  BranchForRegistration as BranchForRegistrationComponent,
  LinkDocuments as LinkDocumentsComponent,
  PasswordSection as PasswordSectionComponent
} from "./components";
import {
  CommonEdit as CommonEditIcon
} from "../../../assets/icons";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import { removeItem } from "../../../common/Storage";
import agent from "../../../agent/agent";
import urls from "../../../constants/urls";
import Notification from "../../../common/Notification";


class AccountProfileMe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalLoading: false
    };

    this.refPopUpChangePassword = React.createRef();
  }

  componentDidMount = () => {};

  onLogout = async () => {
    await removeItem("jwt");

    this.props.setAccountApp({});
    this.props.setAccountTraid({});
    this.props.wiseWinSetProfile({});
  }

  updateWiseWinAccount = (account) => {
    this.props.wiseWinSetProfile(account);
  }

  changePassword = async (form) => {
    this.setState({ isModalLoading: true });

    const setPassword = await agent.put(`${ urls.usersUpdatePassword }`, {
      currentPassword: form.oldPassword,
      newPassword: form.newPassword,
    }).then((res) => {
      return res.data
    }).catch((err) => {
      return { error: err.response }
    });
    if (setPassword.error) {
      this.setState({ isModalLoading: false });

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

    this.setState({ isModalLoading: false });
  }

  _headerRightContent = () => {

    const navigate = () => {
      this.props.navigation.navigate("AccountProfileMeEdit");
    }

    return (
      <TouchableOpacity style={styles.headerButtonEdit} onPress={navigate}>
        <CommonEditIcon/>
      </TouchableOpacity>
    )
  }
  _navigateAccountDocuments = () => {
    this.props.navigation.navigate("AccountDocuments");
  }

  _openPopUpChangePassword = () => {
    this.refPopUpChangePassword.current.openModalize();
  }
  _closePopUpChangePassword = () => {
    this.refPopUpChangePassword.current.closeModalize();
  }

  render() {
    const {
      account,
      wiseWinAccount
    } = this.props;
    const {
      isModalLoading
    } = this.state;

    return (
      <View style={styles.root}>

        <Header
          title={allTranslations(localization.accountProfileMe.headerTitle)}
          rightContent={this._headerRightContent}
        />

        <ScrollView style={{flexGrow: 1}} contentContainerStyle={styles.scrollView}>

          <BasicInformationComponent
            account={account}
            wiseWinAccount={wiseWinAccount}

            onLogout={this.onLogout}
          />

          <View style={{marginTop: 12}}/>

          <AdditionalInformationComponent
            account={account}
          />

          <View style={{marginTop: 12}}/>

          <PasswordSectionComponent
            onOpenEdit={this._openPopUpChangePassword}
          />

          {
            Boolean(wiseWinAccount?.referrer_name) && (
              <>

                <View style={{marginTop: 12}}/>

                <BranchForRegistrationComponent
                  wiseWinAccount={wiseWinAccount}
                  updateWiseWinAccount={this.updateWiseWinAccount}
                />

              </>
            )
          }

          <View style={{marginTop: 12}}/>

          <LinkDocumentsComponent
            onRoute={this._navigateAccountDocuments}
          />

        </ScrollView>


        <PopUpChangePassword
          ref={this.refPopUpChangePassword}
          onChange={this.changePassword}
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
  },

  headerButtonEdit: {
    width: 32,
    height: 32
  },
});

export default AccountProfileMe;
