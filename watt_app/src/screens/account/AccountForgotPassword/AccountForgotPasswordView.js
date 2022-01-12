import React, { Component } from "react";
import {
  View,
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
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import { Formik } from "formik";
import * as Yup from "yup";
import Notification from "../../../common/Notification";
import commonStylesAccount from "../common-styles";
import agent from "../../../agent/agent";
import urls from "../../../constants/urls";

class AccountForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initForm: {
        email: "",
      },

      isModalLoading: false,
    };

    this.innerRef = React.createRef();
  }

  onSubmit = async (form) => {

    this.setState({ isModalLoading: true });

    const response = await agent.post(`${ urls.userRestorePassword }?email=${ form.email }`, {}).then((res) => {
      return res.data;
    }).catch((err) => {
      return { error: err.response };
    });
    if (response.error) {
      this.setState({ isModalLoading: false });

      const errorMessage = allTranslations(localization.accountLogin.errors[response?.error?.data?.code]) || allTranslations(localization.errors["internal-error"]);
      Notification.send({
        message: errorMessage,
        type: "danger",
      });

      return null;
    }

    this.setState({ isModalLoading: false });

    this.props.navigation.navigate("AccountConfirmForgotPassword", {
      email: form.email,
      restorationId: response?.restorationId || ''
    });
  };

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

        <Header title={allTranslations(localization.navigation.account)} />

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
                    {allTranslations(localization.accountForgotPassword.title)}
                  </Text>

                  <Text style={[commonStylesAccount.message, { marginBottom: 24 }]}>
                    {allTranslations(localization.accountForgotPassword.message)}
                  </Text>

                  <View style={[{ marginBottom: 12 }]}>
                    <View style={[
                      commonStylesAccount.inputContainer,
                      Boolean(touched["email"] && errors["email"]) && commonStylesAccount.inputContainerError,
                    ]}>
                      <TextInput
                        value={values.email}
                        style={[commonStylesAccount.inputItem]}
                        placeholder={allTranslations(localization.accountForgotPassword.emailPlaceholder)}
                        placeholderTextColor="#8E8E8E"
                        autoCapitalize="none"


                        onChangeText={(email) => this.changeForm("email", email)}
                      />
                    </View>

                    {Boolean(touched["email"] && errors["email"]) && (
                      <Text style={[commonStylesAccount.inputErrorMessage]}>{errors["email"]}</Text>
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
  email: Yup.string().nullable().email(allTranslations(localization.yup.email)).required(allTranslations(localization.yup.required)),
});

export default AccountForgotPassword;
