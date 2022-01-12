import React, { Component } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native/index";
import {
  Text,
  Button
} from "react-native-ui-lib";
import {
  Header,
  ModalLoading
} from "../../../components";
import { Formik } from "formik";
import * as Yup from "yup";
import Notification from "../../../common/Notification";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import commonStylesAccount from "../common-styles";
import agent from "../../../agent/agent";
import urls from "../../../constants/urls";
import { setItem } from "../../../common/Storage";
import agentWiseWin from "../../../agent/agentWiseWin";


class AccountLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initForm: {
        email: "",
        password: "",
      },

      isModalLoading: false
    };

    this.innerRef = React.createRef();
  }

  onSubmit = async (form) => {

    this.setState({ isModalLoading: true });

    const response = await agent.post(urls.userAuth, {
      email: form.email,
      password: form.password,
    }).then((res) => {
      return res.data
    }).catch((err) => {
      return { error: err?.response }
    })
    if (response.error) {
      this.setState({ isModalLoading: false });

      const errorMessage = Boolean(localization.accountLogin.errors[ response?.error?.data?.code ]) ? allTranslations(localization.accountLogin.errors[ response?.error?.data?.code ]) : allTranslations(localization.errors["internal-error"]);
      Notification.send({
        message: errorMessage,
        type: "danger"
      });

      return null
    }

    await setItem(response.jwt, "jwt");
    agent.defaults.headers["x-auth-token"] = response.jwt;

    const account = await agent.get(urls.userMe).then((res) => {
      return res.data?.user
    }).catch((err) => {
      return {}
    })

    const tradeAccount = await agent.get(urls.tradingAccount).then((res) => {
      return res.data
    }).catch((err) => {
      return {}
    })

    this.setState({ isModalLoading: false });

    this.props.tradingSetProfile(tradeAccount);
    this.props.updateAccount(account);
  }

  changeForm = (name, value) => {
    let values = { ...this.innerRef.current.values };

    values[name] = value;

    this.innerRef.current.setValues(values);
  }

  _routeAccountForgotPassword = () => {
    this.props.navigation.navigate("AccountForgotPassword");
  }
  _routeAccountRegistration = () => {
    this.props.navigation.navigate("AccountRegistration");
  }
  _onConfirm = () => {
    this.innerRef.current?.handleSubmit();
  }

  render() {
    const {
      initForm,
      isModalLoading
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
              handleSubmit
            } = props;

            return (
              <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={styles.scrollView}>

                <View style={[commonStylesAccount.section, {flex: 1}]}>

                  <Text style={[commonStylesAccount.title, { marginBottom: 16 }]}>
                    { allTranslations(localization.accountLogin.title) }
                  </Text>

                  <Text style={[commonStylesAccount.message, { marginBottom: 24 }]}>
                    { allTranslations(localization.accountLogin.message) }
                  </Text>

                  <View style={[{ marginBottom: 12 }]}>
                    <View style={[
                      commonStylesAccount.inputContainer,
                      Boolean(touched['email'] && errors['email']) && commonStylesAccount.inputContainerError
                    ]}>
                      <TextInput
                        value={values.email}
                        style={[ commonStylesAccount.inputItem ]}
                        placeholder={allTranslations(localization.accountLogin.emailPlaceholder)}
                        placeholderTextColor="#8E8E8E"
                        autoCapitalize="none"


                        onChangeText={(email) => this.changeForm('email', email)}
                      />
                    </View>

                    {Boolean(touched['email'] && errors['email']) && (
                      <Text style={[commonStylesAccount.inputErrorMessage]}>{ errors['email'] }</Text>
                    )}
                  </View>

                  <View style={[{ marginBottom: 16 }]}>
                    <View style={[
                      commonStylesAccount.inputContainer,
                      Boolean(touched['password'] && errors['password']) && commonStylesAccount.inputContainerError
                    ]}>
                      <TextInput
                        value={values.password}
                        style={[ commonStylesAccount.inputItem ]}
                        placeholder={allTranslations(localization.accountLogin.passwordPlaceholder)}
                        placeholderTextColor="#8E8E8E"
                        autoCapitalize="none"
                        secureTextEntry={true}

                        onChangeText={(password) => this.changeForm('password', password)}
                      />
                    </View>

                    {Boolean(touched['password'] && errors['password']) && (
                      <Text style={[commonStylesAccount.inputErrorMessage]}>{ errors['password'] }</Text>
                    )}
                  </View>

                  <View style={styles.controls}>
                    <TouchableOpacity style={styles.control} onPress={this._routeAccountForgotPassword} activeOpacity={0.6}>
                      <Text style={styles.controlLabel}>
                        { allTranslations(localization.accountLogin.forgotPassword) }
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.control} onPress={this._routeAccountRegistration} activeOpacity={0.6}>
                      <Text style={[styles.controlLabel, {color: "#282828"}]}>
                        { allTranslations(localization.accountLogin.registration) }
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <Button
                    style={styles.buttonFooter}
                    label={allTranslations(localization.common.confirm)}
                    onPress={this._onConfirm}
                  />

                </View>

              </ScrollView>
            )
          }}
        </Formik>

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
    flexGrow: 1,
    paddingHorizontal: 12,
    paddingVertical: 16
  },

  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24
  },
  control: {
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  controlLabel: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E"
  },

  footer: {
    paddingHorizontal: 12,
    paddingBottom: 32,
    paddingTop: 12
  },

  buttonFooter: {
    marginTop: "auto"
  }
});

const validationSchema = Yup.object().shape({
  email: Yup.string().nullable().email(allTranslations(localization.yup.email)).required(allTranslations(localization.yup.required)),
  password: Yup.string().nullable().min(8, allTranslations(localization.yup.min, { min: 8 })).required(allTranslations(localization.yup.required))
});

export default AccountLogin;
