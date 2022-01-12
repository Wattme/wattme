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
  ChangePassword as ChangePasswordPopUp
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

class AccountConfirmForgotPassword extends Component {
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
      restorationId: routeParams?.restorationId || "",
      jwt: "",

      isModalLoading: false
    };

    this.innerRef = React.createRef();
    this.refChangePasswordPopUp = React.createRef();
  }

  onSubmit = async (form) => {
    this.setState({ isModalLoading: true });

    const response = await agent.get(`${ urls.userConfirmRestorePassword }?id=${this.state.restorationId}&code=${form.verificationCode}&newPassword=${form.verificationCode}`).then((res) => {
      return res.data
    }).catch((err) => {
      return { error: err.response }
    })
    if (response.error) {
      this.setState({ isModalLoading: false });

      const message = allTranslations(localization.accountConfirmForgotPassword.errors?.[response.error?.data?.code]) || allTranslations(localization.errors["internal-error"]);
      Notification.send({
        message: message,
        type: "danger"
      });

      return null
    }

    await this.setState({
      jwt: response.jwt
    })

    this.setState({ isModalLoading: false });
  
    Keyboard.dismiss();
    
    this.refChangePasswordPopUp.current.open();

    this.setState({ refChangePasswordPopUp: true });
  }

  getProfile = async () => {
    await setItem(this.state.jwt, "jwt");
    agent.defaults.headers["x-auth-token"] = this.state.jwt;

    const account = await agent.get(urls.userMe).then((res) => {
      return res.data?.user
    }).catch((err) => {
      return {}
    })

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
                    {allTranslations(localization.accountConfirmForgotPassword.title)}
                  </Text>

                  <Text style={[commonStylesAccount.message, { marginBottom: 24 }]}>
                    {allTranslations(localization.accountConfirmForgotPassword.message)}
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
                    style={{marginTop: "auto"}}
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

        <ChangePasswordPopUp
          ref={this.refChangePasswordPopUp}
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

export default AccountConfirmForgotPassword;
