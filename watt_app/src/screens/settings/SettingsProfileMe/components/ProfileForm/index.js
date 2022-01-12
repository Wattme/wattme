import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
} from "react-native/index";
import {
  Text,
  Button,
} from "react-native-ui-lib";
import {
  ImportWalletEdit as ImportWalletEditIcon,
  CommonTelegram as CommonTelegramIcon
} from "../../../../../assets/icons";
import {
  DatePicker
} from "../../../../../components";
import { Formik } from "formik";
import * as Yup from "yup";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

class ProfileForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      form: {...props.initForm},
    };
  }

  onSubmit = (form) => {
    this.props.onSubmit(form);
  }

  onChangeForm = (name, value) => {
    let newValues = this.props.innerRef.current.values || {};
    newValues[name] = value;
    this.props.innerRef.current.setValues(newValues);
  };

  render() {
    const {
      form,
    } = this.state;
    const {
      innerRef
    } = this.props;

    return (
      <Formik
        innerRef={innerRef}
        initialValues={{ ...form }}
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
            <View style={styles.root}>

              <TextFieldComponent
                value={values.email}
                label={allTranslations(localization.accountProfileMeEdit.form.emailLabel)}
                placeholder={allTranslations(localization.accountProfileMeEdit.form.emailPlaceholder)}
                onChange={(email) => this.onChangeForm("email", email)}

                error={Boolean(touched['email']) && errors['email']}
                isRequired={true}
                disable={true}

                rightContent={() => (
                  <ImportWalletEditIcon/>
                )}
              />

              <View style={{ marginTop: 12 }} />

              <TextFieldComponent
                value={values.curator}
                label={allTranslations(localization.accountProfileMeEdit.form.curatorLabel)}
                placeholder={allTranslations(localization.accountProfileMeEdit.form.curatorPlaceholder)}
                message={allTranslations(localization.accountProfileMeEdit.form.curatorMessage)}
                onChange={(curator) => this.onChangeForm("curator", curator)}
              />

              <View style={{ marginTop: 12 }} />

              <TextFieldComponent
                value={values.lastName}
                label={allTranslations(localization.accountProfileMeEdit.form.lastNameLabel)}
                placeholder={allTranslations(localization.accountProfileMeEdit.form.lastNamePlaceholder)}
                caption={allTranslations(localization.accountProfileMeEdit.form.lastNameCaption)}
                onChange={(lastName) => this.onChangeForm("lastName", lastName)}

                isRequired={true}
                error={Boolean(touched['lastName']) && errors['lastName']}
              />

              <View style={{ marginTop: 12 }} />

              <TextFieldComponent
                value={values.firstName}
                label={allTranslations(localization.accountProfileMeEdit.form.firstNameLabel)}
                placeholder={allTranslations(localization.accountProfileMeEdit.form.firstNamePlaceholder)}
                caption={allTranslations(localization.accountProfileMeEdit.form.firstNameCaption)}
                onChange={(firstName) => this.onChangeForm("firstName", firstName)}

                isRequired={true}
                error={Boolean(touched['firstName']) && errors['firstName']}
              />

              <View style={{ marginTop: 12 }} />

              <TextFieldComponent
                value={values.country}
                label={allTranslations(localization.accountProfileMeEdit.form.countryLabel)}
                placeholder={allTranslations(localization.accountProfileMeEdit.form.countryPlaceholder)}
                onChange={(country) => this.onChangeForm("country", country)}

                isRequired={true}
                error={Boolean(touched['country']) && errors['country']}
              />

              <View style={{ marginTop: 12 }} />

              <TextFieldComponent
                value={values.city}
                label={allTranslations(localization.accountProfileMeEdit.form.cityLabel)}
                placeholder={allTranslations(localization.accountProfileMeEdit.form.cityPlaceholder)}
                onChange={(city) => this.onChangeForm("city", city)}

                isRequired={true}
                error={Boolean(touched['city']) && errors['city']}
              />

              <View style={{ marginTop: 12 }} />

              <TextFieldComponent
                value={values.phone}
                label={allTranslations(localization.accountProfileMeEdit.form.phoneLabel)}
                placeholder={allTranslations(localization.accountProfileMeEdit.form.phonePlaceholder)}
                onChange={(phone) => this.onChangeForm("phone", phone)}
                inputProps={{
                  keyboardType: "decimal-pad"
                }}

                isRequired={true}
                error={Boolean(touched['phone']) && errors['phone']}
              />

              <View style={{ marginTop: 12 }} />

              <TextFieldComponent
                value={values.telegramUsername}
                label={allTranslations(localization.accountProfileMeEdit.form.telegramUsernameLabel)}
                caption={allTranslations(localization.accountProfileMeEdit.form.telegramUsernameCaption)}
                placeholder={allTranslations(localization.accountProfileMeEdit.form.telegramUsernamePlaceholder)}
                onChange={(telegramUsername) => this.onChangeForm("telegramUsername", telegramUsername)}

                isRequired={true}
                error={Boolean(touched['telegramUsername']) && errors['telegramUsername']}

                rightContent={() => (
                  <View style={styles.telegramRightContent}>
                    <CommonTelegramIcon/>
                  </View>
                )}
              />

              <View style={{ marginTop: 16 }} />

              <Button
                label={allTranslations(localization.accountProfileMeEdit.form.buttonSave)}
                onPress={handleSubmit}
              />

            </View>
          )
        }}
      </Formik>
    );
  }
}

const TextFieldComponent = (
  {
    value,
    onChange,

    label,
    caption,
    message,
    placeholder,
    error,
    disable,
    isRequired,

    rightContent,

    inputProps
  },
) => {

  const _renderRightContent = () => {
    if (!rightContent) {
      return null
    }

    return rightContent()
  }

  return (
    <View style={styles.formItem}>
      <Text style={styles.formItemLabel}>
        {label}
        {isRequired&&(
          <Text style={styles.formItemLabelBadge}>&nbsp;*</Text>
        )}
        <Text style={styles.formItemCaption}>&nbsp;{caption}</Text>
      </Text>

      {Boolean(message) && (
        <Text style={styles.formItemMessage}>
          {message}
        </Text>
      )}

      <View style={[
        styles.formItemInputContainer,
        Boolean(error) && styles.formItemInputContainerError
      ]}>
        <TextInput
          editable={!disable}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#8E8E8E"
          style={styles.formItemInputInput}
          onChangeText={onChange}

          {...inputProps || {}}
        />

        {_renderRightContent()}
      </View>

      {Boolean(error) && (
        <Text style={[styles.formItemCaption, {color: "#F5386A", marginTop: 8, marginHorizontal: 12}]}>
          { error }
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 14,
  },

  formItem: {},
  formItemCaption: {
    fontSize: 13,
    lineHeight: 17,
    fontWeight: "300",
    color: "#8e8e8e",
  },
  formItemLabel: {
    fontSize: 14,
    lineHeight: 17,
    color: "#282828",
    paddingHorizontal: 12,
    height: 24,
  },
  formItemLabelBadge: {
    color: "#f5386a",
  },
  formItemMessage: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "300",
    color: "#8E8E8E",
    marginBottom: 4,
    paddingHorizontal: 12,
  },
  formItemInputContainer: {
    height: 40,
    backgroundColor: "#F7F7F7",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 16,
    marginTop: 2,
    overflow: "hidden",

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F7F7F7"
  },
  formItemInputContainerError: {
    borderColor: "#F5386A"
  },
  formItemInputInput: {
    flex: 1,
    fontSize: 16,
    color: "#282828",
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: "transparent",
  },

  telegramRightContent: {
    backgroundColor: "#F6D962",
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: -16,
    marginVertical: -4,
    height: 40
  },
});

const validationSchema = Yup.object().shape({
  email: Yup.string().nullable().email(allTranslations(localization.yup.email)).required(allTranslations(localization.yup.required)),
  firstName: Yup.string().nullable().required(allTranslations(localization.yup.required)),
  lastName: Yup.string().nullable().required(allTranslations(localization.yup.required)),
  country: Yup.string().nullable().required(allTranslations(localization.yup.required)),
  city: Yup.string().nullable().required(allTranslations(localization.yup.required)),
  phone: Yup.string().nullable().required(allTranslations(localization.yup.required)),
  telegramUsername: Yup.string().nullable().required(allTranslations(localization.yup.required)),
});

export default ProfileForm;
