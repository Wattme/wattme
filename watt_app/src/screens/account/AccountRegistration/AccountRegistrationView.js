import React, { Component } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity, Linking,
} from "react-native/index";
import {
  Text,
  Button,
  Checkbox
} from "react-native-ui-lib";
import {
  Header,
  ModalLoading
} from "../../../components";
import {
  PopUpUserConflict as PopUpUserConflictComponent
} from "./components";
import { Formik } from "formik";
import * as Yup from "yup";
import Notification from "../../../common/Notification";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import commonStylesAccount from "../common-styles";
import urls from "../../../constants/urls";
import agent from "../../../agent/agent";

class AccountRegistration extends Component {
  constructor(props) {
    super(props);

    this.state = {

      initForm: {
        email: "",
      },

      isModalLoading: false,
      isPrivacyPolicy: false,
      isTermsOfUse: false,

    };

    this.innerRef = React.createRef();
    this.refPopUpUserConflict = React.createRef();
  }

  onSubmit = async (form) => {

    this.setState({ isModalLoading: true });

    const response = await agent.post(urls.userCreate, {
      email: form.email
    }).then((res) => {
      return res.data
    }).catch((err) => {
      return { error: err.response }
    })
    if (response.error) {
      this.setState({ isModalLoading: false });

      if ( response.error?.data?.code === "confict" ) {
        this.refPopUpUserConflict.current.open();

        return null
      }

      const errorMessage = allTranslations(localization.accountRegistration.errors[ response?.error?.data?.code ] || localization.errors["internal-error"]);
      Notification.send({
        message: errorMessage,
        type: "danger"
      });

      return null
    }

    this.setState({ isModalLoading: false });

    this.props.navigation.navigate("AccountConfirmRegistration", {
      verificationId: response?.verificationId || '',
      email: form.email
    })
  }

  changeForm = (name, value) => {
    let values = { ...this.innerRef.current.values };

    values[name] = value;

    this.innerRef.current.setValues(values);
  }

  _linkPrivacyPolicy = () => {
    Linking.openURL(urls.privacyPolicy)
  }
  _linkTermsOfUse = () => {
    Linking.openURL(urls.termsOfUse)
  }
  _onConfirm = () => {
    this.innerRef.current?.handleSubmit();
  }
  _routeAccountLogin = () => {
    this.refPopUpUserConflict.current.close();

    this.props.navigation.goBack();
  }
  _routeAccountForgotPassword = () => {
    this.refPopUpUserConflict.current.close();

    this.props.navigation.navigate("AccountForgotPassword");
  }

  render() {
    const {
      initForm,

      isModalLoading,
      isPrivacyPolicy,
      isTermsOfUse,
    } = this.state;

    return (
      <View style={styles.root}>

        <Header title={allTranslations(localization.navigation.account)}/>

        <Formik
          style={{flex: 1}}
          innerRef={this.innerRef}
          initialValues={{ ...initForm }}
          validationSchema={validationSchema}
          onSubmit={this.onSubmit}
        >
          {(props) => {
            const {
              values,
              touched,
              errors
            } = props;

            return (
              <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={[styles.scrollView, {flexGrow: 1}]}>

                <View style={[commonStylesAccount.section, { flex: 1 }]}>

                  <Text style={[commonStylesAccount.title, { marginBottom: 16 }]}>
                    { allTranslations(localization.accountRegistration.title) }
                  </Text>

                  <Text style={[commonStylesAccount.message, { marginBottom: 24 }]}>
                    { allTranslations(localization.accountRegistration.message) }
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

                  <View style={{ marginTop: "auto", alignItems: "center", marginBottom: 24 }}>
                    <Text style={styles.messageConfirm}>
                      { allTranslations(localization.accountRegistration.messageConfirm) }
                    </Text>

                    <View style={styles.confirmsContainer}>

                      <TouchableOpacity style={[styles.confirmItem, {marginTop: 0}]} onPress={() => this.setState({ isPrivacyPolicy: !isPrivacyPolicy })} activeOpacity={0.8}>
                        <View style={styles.confirmItemCheckBox}>
                          <Checkbox value={isPrivacyPolicy} size={32} onValueChange={() => this.setState({ isPrivacyPolicy: !isPrivacyPolicy })}/>
                        </View>
                        <TouchableOpacity activeOpacity={0.8} onPress={this._linkPrivacyPolicy}>
                          <Text style={styles.confirmItemLink}>
                            { allTranslations(localization.accountRegistration.privacyPolicy) }
                          </Text>
                        </TouchableOpacity>
                      </TouchableOpacity>

                      <TouchableOpacity style={[styles.confirmItem, ]} onPress={() => this.setState({ isTermsOfUse: !isTermsOfUse })} activeOpacity={0.8}>
                        <View style={styles.confirmItemCheckBox}>
                          <Checkbox value={isTermsOfUse} size={32} onValueChange={() => this.setState({ isTermsOfUse: !isTermsOfUse })}/>
                        </View>
                        <TouchableOpacity activeOpacity={0.8} onPress={this._linkTermsOfUse}>
                          <Text style={styles.confirmItemLink}>
                            { allTranslations(localization.accountRegistration.termsOfUse) }
                          </Text>
                        </TouchableOpacity>
                      </TouchableOpacity>

                    </View>
                  </View>

                  <View style={styles.footer}>
                    <Button
                      style={{ width: "100%" }}
                      label={allTranslations(localization.common.confirm)}
                      onPress={this._onConfirm}

                      disabled={Boolean(!isPrivacyPolicy || !isTermsOfUse)}
                    />
                  </View>

                </View>

              </ScrollView>
            )
          }}
        </Formik>

        <ModalLoading
          open={isModalLoading}
        />


        <PopUpUserConflictComponent
          ref={this.refPopUpUserConflict}

          routeAccountLogin={this._routeAccountLogin}
          routeAccountForgotPassword={this._routeAccountForgotPassword}
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

  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
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

  messageConfirm: {
    maxWidth: 370,
    fontSize: 14,
    lineHeight: 23,
    color: "#8E8E8E",
    textAlign: "center",
    marginBottom: 24
  },

  confirmsContainer: {
    maxWidth: 370,
  },
  confirmItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12
  },
  confirmItemCheckBox: {
    marginRight: 12
  },
  confirmItemLink: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "300",
    color: "#282828",
    textDecorationLine: "underline"
  },

  footer: {
    alignItems: "center",
  }
});

const validationSchema = Yup.object().shape({
  email: Yup.string().nullable().email(allTranslations(localization.yup.email)).required(allTranslations(localization.yup.required))
});

export default AccountRegistration;
