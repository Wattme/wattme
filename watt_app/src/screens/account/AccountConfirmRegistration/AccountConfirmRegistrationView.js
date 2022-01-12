import React, { Component } from "react";
import {
  View,
  Keyboard,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native/index";
import {
  Text,
  Button,
} from "react-native-ui-lib";
import {
  Header,
  ModalLoading,
} from "../../../components";
import {
  Welcome as WelcomeComponent
} from "../common-components";
import { Formik } from "formik";
import * as Yup from "yup";
import Notification from "../../../common/Notification";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import commonStylesAccount from "../common-styles";
import agent from "../../../agent/agent";
import urls from "../../../constants/urls";
import { setItem } from "../../../common/Storage";
import settings from "../../../constants/settings";

class AccountConfirmRegistration extends Component {
  constructor(props) {
    super(props);

    const routeParams = props?.route?.params || {};

    this.state = {
      initForm: {
        verificationCode: "",

        password: "",
        passwordRepeat: "",
      },

      email: routeParams?.email || "",
      verificationId: routeParams?.verificationId || "",
      jwt: "",

      isModalLoading: false
    };

    this.innerRef = React.createRef();
    this.refWelcomeComponent = React.createRef();
  }

  onSubmit = async (form) => {
    this.setState({ isModalLoading: true })

    const confirm = await agent.get(`${ urls.userVerification }?id=${ this.state.verificationId }&code=${ form.verificationCode }`).then((res) => {
      return res.data
    }).catch((err) => {
      return { error: err.response }
    });
    if (confirm.error) {
      this.setState({ isModalLoading: false });

      const message = allTranslations(localization.accountConfirmRegistration.errors.step1?.[confirm.error?.data?.code] || localization.errors["internal-error"]);
      Notification.send({
        message: message,
        type: "danger"
      })

      return null
    }

    await this.setState({ jwt: confirm.jwt });
  
    Keyboard.dismiss();
    
    this.refWelcomeComponent.current.open();

    this.setState({ isModalLoading: false });
  }

  getProfile = async () => {
    this.setState({ isModalLoading: true });

    await setItem(this.state.jwt, "jwt");
    agent.defaults.headers["x-auth-token"] = this.state.jwt || "";

    const verificationCode = this.innerRef.current?.values?.verificationCode;

    const setPassword = await agent.put(`${ urls.usersUpdatePassword }`, {
      currentPassword: settings.registrationOldPassword,
      newPassword: verificationCode,
    }).then((res) => {
      return res.data
    }).catch((err) => {
      return { error: err.response }
    });
    if (setPassword.error) {
      this.setState({ isModalLoading: false });

      return null
    }

    const account = await agent.get(urls.userMe).then((res) => {
      return res.data.user
    }).catch((err) => {
      return {}
    })

    this.refWelcomeComponent.current.close();

    this.props.updateAccount(account);
  }

  changeForm = (name, value) => {
    let values = { ...this.innerRef.current.values };

    values[name] = value;

    this.innerRef.current.setValues(values);
  };

  _onConfirm = () => {
    this.innerRef.current?.handleSubmit();
  };

  render() {
    const {
      initForm,
      isModalLoading,
    } = this.state;

    return (
      <View style={styles.root}>

        <Header title={allTranslations(localization.navigation.account)}/>

        <Formik
          innerRef={this.innerRef}
          initialValues={{ ...initForm }}
          validationSchema={validationSchema}
          onSubmit={this.onSubmit}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              handleSubmit,
            } = props;

            return (
              <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={styles.scrollView}>

                <View style={[commonStylesAccount.section, {flex: 1}]}>

                  <Text style={[commonStylesAccount.title, { marginBottom: 16 }]}>
                    {allTranslations(localization.accountConfirmRegistration.title)}
                  </Text>

                  <Text style={[commonStylesAccount.message, { marginBottom: 24 }]}>
                    {allTranslations(localization.accountConfirmRegistration.message)}
                  </Text>

                  <View>
                    <View style={[
                      commonStylesAccount.inputContainer,
                      Boolean(touched["verificationCode"] && errors["verificationCode"]) && commonStylesAccount.inputContainerError,
                    ]}>
                      <TextInput
                        value={values.verificationCode}
                        style={[commonStylesAccount.inputItem]}
                        placeholder={allTranslations(localization.accountConfirmForgotPassword.verificationCodePlaceholder)}
                        placeholderTextColor="#8E8E8E"
                        autoCapitalize="none"
                        keyboardType="decimal-pad"
                        onChangeText={(verificationCode) => this.changeForm("verificationCode", verificationCode)}
                      />
                    </View>

                    {Boolean(touched["verificationCode"] && errors["verificationCode"]) && (
                      <Text style={[commonStylesAccount.inputErrorMessage]}>{errors["verificationCode"]}</Text>
                    )}
                  </View>

                  <Button
                    style={{ width: "100%", marginTop: "auto" }}
                    label={allTranslations(localization.common.confirm)}
                    onPress={this._onConfirm}
                  />

                </View>

              </ScrollView>
            );
          }}
        </Formik>

        <ModalLoading
          open={isModalLoading}
        />

        <WelcomeComponent
          ref={this.refWelcomeComponent}
          onNext={this.getProfile}
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
  }
});

const validationSchema = Yup.object().shape({
  verificationCode: Yup.string().nullable().required(allTranslations(localization.yup.required))
});

export default AccountConfirmRegistration;
