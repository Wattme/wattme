import React from "react";
import {
  View,
  Keyboard,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text,
  Button,
} from "react-native-ui-lib";
import {
  CommonCalendar,
  CommonEdit as CommonEditIcon,
  CommonTelegram as CommonTelegramIcon,
  CommonQrCode as CommonQrCodeIcon
} from "../../../../../assets/icons";
import {
  DatePicker,
  ModalCamera
} from "../../../../../components";
import { Formik } from "formik";
import * as Yup from "yup";
import Field from "./Field";
import FieldWiseWin from "./FieldWiseWin";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import agentWiseWin from "../../../../../agent/agentWiseWin";

class ProfileForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      form: {...props.initForm},

      wiseWinPatron: null,
      isModalCamera: false
    };

    this.refDatePicker = React.createRef();
    this.refTimeOutUpdate = React.createRef();
  }

  onSubmit = (initForm) => {

    let form = {
      ...initForm
    };

    if (
      (!this.state?.wiseWinPatron?.success) &&
      (!this.state.form?.wisewinPatronCode)
    ) {
      form.wisewinPatronCode = "";
    }

    this.props.onSubmit(form);
  }

  onChangeForm = (name, value) => {
    let newValues = this.props.innerRef.current.values || {};
    newValues[name] = value;
    this.props.innerRef.current.setValues(newValues);
  };
  onChangeFormWisewinPatronCode = (name, value) => {

    clearTimeout(this.refTimeOutUpdate);

    let newValues = this.props.innerRef.current.values || {};
    newValues[name] = value;
    this.props.innerRef.current.setValues(newValues);


    this.refTimeOutUpdate = setTimeout(async () => {
      await this.getWiseWinPatron();
    }, 500);

  };


  getWiseWinPatron = async () => {
    const refcode = this.props.innerRef.current.values?.wisewinPatronCode;
    const response = await agentWiseWin.get(`/auth/user-by-ref?refcode=${ refcode }`).then((res) => {
      return res.data
    }).catch((err) => {
      return null
    })

    this.setState({
      wiseWinPatron: response
    })
  }

  // Логика работы QR сканера
  _openQrScannerReferalCode = () => {
    this.setState({ isModalCamera: true });
  }
  _closeQrScannerReferalCode = () => {
    this.setState({ isModalCamera: false });
  }
  _eventQrScannerReferalCode = (event) => {
    this._closeQrScannerReferalCode();
    this.onChangeFormWisewinPatronCode("wisewinPatronCode", event?.data || "");
  }
  // ------------------------


  _renderButtonQrCodeReferal = () => {
    return (
      <TouchableOpacity style={styles.buttonQrCodeReferal} onPress={this._openQrScannerReferalCode} activeOpacity={0.8}>
        <CommonQrCodeIcon color="#8E8E8E"/>
      </TouchableOpacity>
    )
  }

  render() {
    const {
      form,
      isModalCamera
    } = this.state;
    const {
      innerRef,
      isRegistration,

      wiseWinAccount
    } = this.props;

    return (
      <>

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

                <Text style={styles.messageInfo}>
                  <Text style={{ color: "#F5386A" }}>
                    { allTranslations(localization.accountProfileMeEdit.form.informationMessageDanger) }
                  </Text>
                  &nbsp;
                  { allTranslations(localization.accountProfileMeEdit.form.informationMessage) }
                </Text>

                <Field
                  value={values.email}
                  placeholder={allTranslations(localization.accountProfileMeEdit.form.emailPlaceholder)}
                  label={allTranslations(localization.accountProfileMeEdit.form.emailLabel)}
                  icon={CommonEditIcon}

                  required={true}
                  disable={true}
                  styleRoot={{marginTop: 0}}
                  error={Boolean(errors.email && touched.email) && errors.email}

                  name="email"

                  onChange={this.onChangeForm}
                />

                {
                  Boolean(isRegistration || !form.wisewinPatronCode) ? (
                    <>
                      <Field
                        value={values.wisewinPatronCode}
                        label={allTranslations(localization.accountProfileMeEdit.form.curatorLabel)}
                        caption={allTranslations(localization.accountProfileMeEdit.form.curatorCaption)}
                        message={allTranslations(localization.accountProfileMeEdit.form.curatorMessage)}
                        placeholder={allTranslations(localization.accountProfileMeEdit.form.curatorPlaceholder)}
                        icon={this._renderButtonQrCodeReferal}

                        required={false}

                        name="wisewinPatronCode"
                        error={Boolean(errors.wisewinPatronCode && touched.wisewinPatronCode) && errors.wisewinPatronCode}

                        onChange={this.onChangeFormWisewinPatronCode}
                      />

                      {
                        Boolean(this.state?.wiseWinPatron) && (
                          <View style={styles.wisewinPatron}>
                            {
                              Boolean(this.state?.wiseWinPatron?.success) ? (
                                <>
                                  <Text style={styles.wisewinPatronValue}>
                                    { this.state?.wiseWinPatron?.refcode }
                                  </Text>
                                  <Text style={styles.wisewinPatronValue}>
                                    { [this.state?.wiseWinPatron?.first_name, this.state?.wiseWinPatron?.last_name ].join(" ") }
                                  </Text>
                                </>
                              ) : (
                                <Text style={styles.wisewinPatronValue}>
                                  { allTranslations(localization.accountProfileMeEdit.wisewinPatronNotFount) }
                                </Text>
                              )
                            }
                          </View>
                        )
                      }

                    </>
                  ) : (
                    <>

                      <View style={styles.wisewinPatronCode}>
                        <Text style={styles.wisewinPatronCodeLabel}>{allTranslations(localization.accountProfileMeEdit.form.curatorLabel)}</Text>
                        <Text style={styles.wisewinPatronCodeValue}>{ Boolean(wiseWinAccount?.referrer_name) ? wiseWinAccount?.referrer_name : "—" }</Text>
                      </View>

                      <View style={styles.separate}/>

                    </>
                  )
                }

                <Field
                  value={values.firstName}
                  placeholder={allTranslations(localization.accountProfileMeEdit.form.firstNamePlaceholder)}
                  label={allTranslations(localization.accountProfileMeEdit.form.firstNameLabel)}
                  caption={allTranslations(localization.accountProfileMeEdit.form.firstNameCaption)}

                  required={true}
                  disable={!isRegistration}

                  name="firstName"
                  error={Boolean(errors.firstName && touched.firstName) && errors.firstName}

                  onChange={this.onChangeForm}
                />

                <Field
                  value={values.lastName}
                  placeholder={allTranslations(localization.accountProfileMeEdit.form.lastNamePlaceholder)}
                  label={allTranslations(localization.accountProfileMeEdit.form.lastNameLabel)}
                  caption={allTranslations(localization.accountProfileMeEdit.form.lastNameCaption)}

                  required={true}
                  disable={!isRegistration}

                  name="lastName"
                  error={Boolean(errors.lastName && touched.lastName) && errors.lastName}

                  onChange={this.onChangeForm}
                />

                {Boolean(false) && (
                  <>
                    <Field
                      value={values.middleName}
                      placeholder={allTranslations(localization.accountProfileMeEdit.form.middleNamePlaceholder)}
                      label={allTranslations(localization.accountProfileMeEdit.form.middleNameLabel)}
                      caption={allTranslations(localization.accountProfileMeEdit.form.middleNameCaption)}

                      required={true}
                      disable={!isRegistration}

                      name="middleName"
                      error={Boolean(errors.middleName && touched.middleName) && errors.middleName}

                      onChange={this.onChangeForm}
                    />

                    <Field
                      value={values.dateBirth}
                      placeholder={allTranslations(localization.accountProfileMeEdit.form.dateBirthPlaceholder)}
                      label={allTranslations(localization.accountProfileMeEdit.form.dateBirthLabel)}
                      icon={CommonCalendar}
                      iconPress={this._openDatePicker}

                      required={true}
                      disable={!isRegistration}

                      name="dateBirth"
                      error={Boolean(errors.dateBirth && touched.dateBirth) && errors.dateBirth}

                      onChange={this.onChangeForm}
                    />
                  </>
                )}

                <Field
                  value={values.country}
                  placeholder={allTranslations(localization.accountProfileMeEdit.form.countryPlaceholder)}
                  label={allTranslations(localization.accountProfileMeEdit.form.countryLabel)}

                  required={true}
                  disable={!isRegistration}

                  name="country"
                  error={Boolean(errors.country && touched.country) && errors.country}

                  onChange={this.onChangeForm}
                />

                <Field
                  value={values.city}
                  placeholder={allTranslations(localization.accountProfileMeEdit.form.cityPlaceholder)}
                  label={allTranslations(localization.accountProfileMeEdit.form.cityLabel)}
                  icon={Boolean(!isRegistration) && CommonEditIcon}

                  required={true}
                  disable={false}

                  name="city"
                  error={Boolean(errors.city && touched.city) && errors.city}

                  onChange={this.onChangeForm}
                />

                <Field
                  value={values.phone}
                  placeholder={allTranslations(localization.accountProfileMeEdit.form.phonePlaceholder)}
                  label={allTranslations(localization.accountProfileMeEdit.form.phoneLabel)}
                  icon={Boolean(!isRegistration) && CommonEditIcon}

                  required={true}
                  disable={false}

                  name="phone"
                  error={Boolean(errors.phone && touched.phone) && errors.phone}

                  onChange={this.onChangeForm}

                  textInputProps={{
                    keyboardType: "decimal-pad"
                  }}
                />

                <Field
                  value={values.telegramUsername}
                  placeholder={allTranslations(localization.accountProfileMeEdit.form.telegramUsernamePlaceholder)}
                  label={allTranslations(localization.accountProfileMeEdit.form.telegramUsernameLabel)}

                  disable={!isRegistration && form.telegramUsername}

                  name="telegramUsername"
                  error={Boolean(errors.telegramUsername && touched.telegramUsername) && errors.telegramUsername}
                  icon={() => (
                    <View style={styles.telegramRight}>
                      <CommonTelegramIcon/>
                    </View>
                  )}

                  onChange={this.onChangeForm}
                />

                <Button
                  style={{ marginTop: 16 }}
                  label={allTranslations(localization.accountProfileMeEdit.form.buttonSave)}
                  onPress={handleSubmit}
                />

              </View>
            )
          }}
        </Formik>

        <ModalCamera
          open={isModalCamera}

          onClose={this._closeQrScannerReferalCode}
          onBarCodeRead={this._eventQrScannerReferalCode}
        />

      </>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 14,
  },
  messageInfo: {
    fontSize: 14,
    lineHeight: 23,
    color: "#8e8e8e",
    paddingHorizontal: 12,

    marginBottom: 12
  },

  telegramRight: {
    width: 64,
    height: 40,
    backgroundColor: "#F6D962",
    alignItems: "center",
    justifyContent: "center",

    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,

    marginTop: -2,
    marginRight: 0,
  },

  wisewinPatronCode: {
    marginTop: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  wisewinPatronCodeLabel: {
    fontSize: 14,
    lineHeight: 17,
    color: "#282828"
  },
  wisewinPatronCodeValue: {
    fontSize: 16,
    lineHeight: 19,
    color: "#8E8E8E",
    textAlign: "right"
  },

  separate: {
    height: 2,
    backgroundColor: "#F9F9F9",
    marginTop: 15,
    marginBottom: 3
  },


  wisewinPatron: {
    padding: 12,
    marginTop: 12,
    backgroundColor: "white",
    borderRadius: 14,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  wisewinPatronValue: {
    fontSize: 14,
    lineHeight: 17,
    color: "#282828"
  },


  buttonQrCodeReferal: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center"
  },
});

const validationSchema = Yup.object().shape({
  email: Yup.string().nullable().email(allTranslations(localization.yup.email)).required(allTranslations(localization.yup.required)),
  firstName: Yup.string().nullable().required(allTranslations(localization.yup.required)),
  lastName: Yup.string().nullable().required(allTranslations(localization.yup.required)),
  country: Yup.string().nullable().required(allTranslations(localization.yup.required)),
  city: Yup.string().nullable().required(allTranslations(localization.yup.required)),
  phone: Yup.string().nullable().required(allTranslations(localization.yup.required)),
  telegramUsername: Yup.string().nullable(),
});

export default ProfileForm;
