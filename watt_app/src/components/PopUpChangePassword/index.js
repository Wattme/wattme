import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native/index";
import {
  Text,
  Button,
  Checkbox,
} from "react-native-ui-lib";
import { Formik } from "formik";
import Modalize from "../Modalize";
import allTranslations from "../../localization/allTranslations";
import localization from "../../localization/localization";
import { CommonGlass as CommonGlassIcon, CommonGlassOff as CommonGlassOffIcon } from "../../assets/icons";
import * as Yup from "yup";

class PopUpChangePassword extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      initForm: {
        oldPassword: "",
        newPassword: "",
        repeatNewPassword: "",
      }
    };

    this.refModalize = React.createRef();
    this.refFormik = React.createRef();
  }

  onSubmit = async (form) => {
    this.props.onChange(form);
  }

  onChange = (name, value) => {
    let values = this.refFormik.current.values;
    values[name] = value;

    this.refFormik.current.setValues(values)
  }

  openModalize = () => {
    this.refModalize.current?.open();
  };
  closeModalize = () => {
    this.refModalize.current?.close();
  };

  _disableButton = () => {
    const { oldPassword, newPassword, repeatNewPassword } = this.state;

    return Boolean((!oldPassword || !newPassword || !repeatNewPassword ) || (newPassword !== repeatNewPassword))
  }

  render() {
    const {

    } = this.state;

    return (
      <Modalize
        innerRef={this.refModalize}
        onBackButtonPress={this.closeModalize}
        onOverlayPress={this.closeModalize}
      >

        <Formik
          innerRef={this.refFormik}
          initialValues={{ ...this.state.initForm }}
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
              <View style={styles.modalizeContainer}>

                <View style={styles.root}>

                  <Text style={styles.title}>
                    {allTranslations(allTranslations(localization.popUpChangePassword.title))}
                  </Text>

                  <FieldItem
                    value={values.oldPassword}
                    label={allTranslations(localization.popUpChangePassword.form.oldPasswordLabel)}
                    error={Boolean(errors.oldPassword && touched.oldPassword) && errors.oldPassword}
                    onChange={(value) => this.onChange('oldPassword', value)}
                  />

                  <FieldItem
                    value={values.newPassword}
                    label={allTranslations(localization.popUpChangePassword.form.newPasswordLabel)}
                    error={Boolean(errors.newPassword && touched.newPassword) && errors.newPassword}
                    onChange={(value) => this.onChange('newPassword', value)}
                  />

                  <FieldItem
                    value={values.repeatNewPassword}
                    label={allTranslations(localization.popUpChangePassword.form.repeatNewPasswordLabel)}
                    error={Boolean(errors.repeatNewPassword && touched.repeatNewPassword) && errors.repeatNewPassword}
                    onChange={(value) => this.onChange('repeatNewPassword', value)}
                  />

                </View>

                <View style={{ marginTop: 16 }}>

                  <Button
                    label={allTranslations(localization.popUpChangePassword.buttonLabel)}
                    onPress={handleSubmit}
                  />

                </View>

              </View>
            )
          }}
        </Formik>

      </Modalize>
    );
  }
}

const FieldItem = (props) => {
  const {
    label,
    value,
    error,

    onChange
  } = props;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.formItem}>
      <Text style={styles.formItemLabel}>
        { label }
      </Text>
      <View style={[
        styles.formItemContainer,
        Boolean(error) && { borderColor: "#F5386A" }
      ]}>
        <TextInput
          value={value}
          style={styles.formItemInput}
          secureTextEntry={!showPassword}
          placeholder={allTranslations(localization.popUpChangePassword.form.repeatNewPasswordPlaceholder)}
          placeholderTextColor="#8E8E8E"
          autoCapitalize="none"

          onChangeText={onChange}
        />

        <TouchableOpacity style={styles.formItemButtonGlass} onPress={() => setShowPassword(!showPassword)}>
          {Boolean(!showPassword) ? (
            <CommonGlassIcon color="#8E8E8E"/>
          ) : (
            <CommonGlassOffIcon color="#8E8E8E"/>
          ) }
        </TouchableOpacity>
      </View>
      {Boolean(error)&&(
        <Text style={styles.formItemError}>
          { error }
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  modalizeContainer: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },

  root: {
    paddingTop: 44,
    paddingHorizontal: 16,
    paddingBottom: 24,

    borderRadius: 14,
    backgroundColor: "white",

    minHeight: 330,
  },

  title: {
    fontSize: 25,
    lineHeight: 30,
    color: "#282828",
    marginBottom: 24,
    textAlign: "center",
    fontWeight: "500",
  },
  message: {
    fontSize: 16,
    lineHeight: 23,
    color: "#8E8E8E",
    textAlign: "center",
  },

  formItem: {
    marginTop: 12
  },
  formItemLabel: {
    fontSize: 14,
    lineHeight: 17,
    color: "#282828",
    marginBottom: 8,
    marginHorizontal: 12
  },
  formItemError: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "300",
    color: "#F5386A",
    marginTop: 8,
    marginHorizontal: 12
  },
  formItemContainer: {
    height: 40,
    flexDirection: "row",
    borderRadius: 14,
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 12,
    paddingVertical: 4,

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F7F7F7",
  },
  formItemInput: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
    fontSize: 16,
    color: "#282828"
  },
  formItemButtonGlass: {
    width: 32,
    height: 32
  },

  checkBoxContainer: {
    marginTop: 21,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  checkBoxLabel: {
    fontSize: 16,
    lineHeight: 21,
    color: "#282828",
    fontWeight: "300",
    marginLeft: 12,
  },
  checkBoxLink: {
    fontSize: 16,
    lineHeight: 21,
    color: "#f6d962",
  },

  buttonConfirm: {
    backgroundColor: "white",
    borderColor: "white",
  },

  contentLoad: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
  },

});

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().nullable().required(allTranslations(localization.yup.required)).min(8, allTranslations(localization.yup.min, { min: 8 })),
  newPassword: Yup.string().nullable().required(allTranslations(localization.yup.required)).min(8, allTranslations(localization.yup.min, { min: 8 })),
  repeatNewPassword: Yup.string()
    .nullable()
    .required(allTranslations(localization.yup.required))
    .oneOf([Yup.ref('newPassword'), null], allTranslations(localization.accountConfirmForgotPassword.errors.passwordsMustMatch))
    .min(8, allTranslations(localization.yup.min, { min: 8 })),
});

export default PopUpChangePassword;
