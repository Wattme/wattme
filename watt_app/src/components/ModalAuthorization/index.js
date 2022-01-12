import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native/index";
import {
  Button,
  Text,
} from "react-native-ui-lib";
import Modalize from "../Modalize";
import ModalLoading from "../ModalLoading";
import allTranslations from "../../localization/allTranslations";
import localization from "../../localization/localization";
import { TextField } from "../index";
import { Formik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../agent/agent";
import urls from "../../constants/urls";
import Notification from "../../common/Notification";
import { setItem } from "../../common/Storage";
import { generateUserWalletsRequest } from "../../utils/network/generateUserWalletsRequest";

const initForm = {
  login: "",
  password: "",
};

class ModalAuthorization extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenModalLoading: false,
    };

    this.refFormik = React.createRef();
  }

  onChangeForm = ({ name, value }) => {
    let newForm = this.refFormik.current?.values || {};
    newForm[name] = value;
    this.refFormik.current?.setValues(newForm);
  };

  onLogin = async () => {
    const body = this.refFormik.current?.values;

    await this.setState({ isOpenModalLoading: true });

    const responseLogin = await axiosInstance.post(`${urls.authLogin}`, body).then((res) => {
      return res.data;
    }).catch((err) => {
      return err.response?.data?.["error-code"] || "system-error";
    });

    if (!responseLogin.token) {
      await this.setState({ isOpenModalLoading: false });

      Notification.send({
        message: allTranslations(localization.errorWalletApi[responseLogin]),
        type: "danger",
      });

      return null;
    }

    await setItem(responseLogin.token, "token");

    axiosInstance.defaults.headers["Authorization"] = `Bearer ${responseLogin.token}`;

    const useWallets = await generateUserWalletsRequest();
    await axiosInstance.post(`${urls.userWallets}`, useWallets).then((res) => {
      return true;
    }).catch(() => {
      return false;
    });

    const account = await axiosInstance.get(`${urls.user}`).then((res) => {
      return res.data;
    }).catch(err => {
      return {};
    });

    this.props.updateAccount(account);

    await this.setState({ isOpenModalLoading: false });
  };

  onClose = () => {
    this.refFormik.current?.setValues({...initForm});
  }

  render() {
    const { innerRef } = this.props;
    const { isOpenModalLoading } = this.state;

    return (
      <>

        <Modalize innerRef={innerRef} onClose={this.onClose}>

          <View style={styles.root}>

            <Formik
              innerRef={this.refFormik}

              initialValues={{...initForm}}
              validationSchema={validationSchema}
              onSubmit={this.onLogin}
            >
              {(props) => {
                const { values, touched, errors, handleSubmit } = props;

                return (
                  <>

                    <Text style={styles.title}>{allTranslations(localization.cabinet.authorization.title)}</Text>

                    <View style={{ marginBottom: 24 }}>
                      <Text style={styles.formLabel}>{allTranslations(localization.cabinet.authorization.login)}</Text>
                      <TextField
                        value={values.login}
                        placeholder={allTranslations(allTranslations(localization.cabinet.authorization.loginPlaceholder))}
                        helperText={touched.login && errors.login}
                        autoCapitalize="none"
                        error={Boolean(touched.login && errors.login)}
                        onChangeText={(value) => this.onChangeForm({ name: "login", value })}
                      />
                    </View>

                    <View style={{ marginBottom: 24 }}>
                      <Text
                        style={styles.formLabel}>{allTranslations(localization.cabinet.authorization.password)}</Text>
                      <TextField
                        value={values.password}
                        secureTextEntry={true}
                        autoCapitalize="none"
                        placeholder={allTranslations(allTranslations(localization.cabinet.authorization.passwordPlaceholder))}
                        helperText={touched.password && errors.password}
                        error={Boolean(touched.password && errors.password)}
                        onChangeText={(value) => this.onChangeForm({ name: "password", value })}
                      />
                    </View>

                    <Button
                      variant="contained"
                      color="primary"
                      label={allTranslations(localization.cabinet.authorization.buttonLogin)}
                      onPress={handleSubmit}
                    />

                  </>
                );
              }}
            </Formik>

          </View>

        </Modalize>

        <ModalLoading
          open={isOpenModalLoading}
        />

      </>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 24,
    paddingVertical: 18,

    backgroundColor: "#fafcfd",
  },

  title: {
    fontWeight: "800",
    fontSize: 22,
    lineHeight: 30,
    color: "#4d4d4d",
    marginBottom: 32,
  },
  formLabel: {
    color: "#242424",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 18,
    marginBottom: 2,
    marginLeft: 8,
  },
});

const validationSchema = Yup.object().shape({
  login: Yup.string().email(allTranslations(localization.yup.email)).required(allTranslations(localization.yup.required)),
  password: Yup.string().required(allTranslations(localization.yup.required)),
});

export default ModalAuthorization;
