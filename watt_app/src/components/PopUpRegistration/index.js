import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity, Linking,
} from "react-native/index";
import {
  Text,
  Button,
  Checkbox
} from "react-native-ui-lib";
import {
  CommonGlass as CommonGlassIcon,
  CommonGlassOff as CommonGlassOffIcon
} from "../../assets/icons";
import { validateEmail } from "../../helpers/validate";
import { setItem } from "../../common/Storage";
import allTranslations from "../../localization/allTranslations";
import localization from "../../localization/localization";
import Notification from "../../common/Notification";
import urls from "../../constants/urls";
import agent from "../../agent/agent";
import Modalize from "../Modalize";
import LoadSpinner from "../LoadSpinner";
import settings from "../../constants/settings";


class PopUpRegistration extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      verificationCode: "",
      password: "",
      repeatPassword: "",

      stage: 1,
      verificationId: null,

      isConfirm: false,
      isLoad: false,
    };

    this.refModalize = props.innerRef || React.createRef();
  }

  componentDidMount = () => {
    if (this.props.open) {
      this.openModalize();
    }
  };
  componentDidUpdate = (prevProps) => {
    if (prevProps.prevProps !== this.props.open && this.props.open) {
      this.openModalize();
    }
  };

  openModalize = () => {
    this.refModalize.current?.open();
  };
  closeModalize = () => {
    this.refModalize.current?.close();
  };


  registrationUser = async () => {
    this.setState({ isLoad: true });

    const data = await agent.post(urls.userCreate, {
      email: this.state.email
    }).then((res) => {
      return res.data
    }).catch((err) => {
      return { error: err?.response }
    });

    if (data.error) {
      this.setState({ isLoad: false });

      const message = allTranslations(localization?.popUpRegistration?.stepRegistration?.errors?.[data?.error?.data?.code] || localization?.errors['internal-error']);
      Notification.send({
        message: message,
        type: "danger"
      });

      return null
    }

    this.setState({
      isLoad: false,
      verificationId: data.verificationId,
      stage: 2
    });

    return true
  }
  repeatVerificationCode = async () => {
    const isSuccess = await this.registrationUser();

    if (!isSuccess) {
      return null
    }

    Notification.send({
      type: "success",
      message: allTranslations(localization.popUpRegistration.stepConfirmation.successRepeatSendVerification)
    })
  }

  confirmRegistrationUser = async () =>  {
    this.setState({ isLoad: true });

    const data = await agent.get(`${ urls.userVerification }?id=${ this.state.verificationId }&code=${ this.state.verificationCode }`).then((res) => {
      return res.data
    }).catch((err) => {
      return { error: err.response }
    });

    if (data.error) {
      this.setState({ isLoad: false });

      const message = allTranslations(localization?.popUpRegistration?.stepConfirmation?.errors?.[data?.error?.data?.code] || localization?.errors['internal-error']);
      Notification.send({
        message: message,
        type: "danger"
      });

      return null
    }

    await setItem(data.jwt, "jwt");
    agent.defaults.headers["x-auth-token"] = data?.jwt;

    this.setState({
      isLoad: false,
      stage: 3
    });
  }

  setPasswordUser = async () => {
    const {
      password
    } = this.state;
    const {
      type
    } = this.props;

    const data = await agent.put(urls.usersUpdatePassword, {
      currentPassword: settings.registrationOldPassword,
      newPassword: password,
    }).then((res) => {
      return res.data
    }).catch((err) => {
      return { error: err.response }
    });

    if ( data?.error ) {
      return null
    }

    this.refModalize.current.close();

    const account = await agent.get(urls.userMe).then((res) => {
      return res.data
    }).catch((err) => {
      return {}
    })
    this.props.updateAccount(account?.user || {});

    if (type === "profile-registration") {
      this.props.navigation.navigate("SettingsProfileMe");
    }

    this.props.navigation.navigate("SettingsProfileMe", {
      navigationNext: "TradingConnection",
      isShowWelcomeRegistration: true
    });
  }

  onNext = async () => {
    const { stage } = this.state;

    if (stage === 1) {
      await this.registrationUser();
    }
    if (stage === 2) {
      await this.confirmRegistrationUser();
    }
    if (stage === 3) {
      await this.setPasswordUser();
    }
  }

  _labelButtonNext = () => {
    const { stage } = this.state;

    if ( stage === 1 ) {
      return allTranslations(localization.popUpRegistration.buttonConnect)
    }
    if ( stage === 2 ) {
      return allTranslations(localization.popUpRegistration.buttonConfirm)
    }
    if ( stage === 3 ) {
      return allTranslations(localization.popUpRegistration.buttonConfirm)
    }
  }
  _disableButtonNext = () => {
    const { stage, email, isConfirm, password, repeatPassword } = this.state;

    if (stage === 1) {
      return Boolean(!email || !isConfirm || !validateEmail(email))
    }
    if (stage === 3) {
      return Boolean(!password || !repeatPassword || Boolean(password !== repeatPassword))
    }
  }
  _closedModalize = () => {
    this.props?.onClose();
    this.setState({
      stage: 1,
      email: "",
      verificationCode: "",
      password: "",
      repeatPassword: "",
      verificationId: null,
    })
  }

  render() {
    const {
      email,
      stage,
      isConfirm,
      verificationCode,

      password,
      repeatPassword,

      isLoad,
    } = this.state;
    const {
      onClose
    } = this.props;

    return (
      <Modalize
        innerRef={this.refModalize}
        onClose={this._closedModalize}
        onBackButtonPress={this.closeModalize}
        onOverlayPress={this.closeModalize}
      >
        <View style={styles.modalizeContainer}>

          <View style={styles.root}>

            {Boolean(stage === 1) && (
              <StepRegistration
                email={email}
                isConfirm={isConfirm}

                onChangeEmail={(email) => this.setState({email})}
                onChangeIsConfirm={(isConfirm) => this.setState({isConfirm})}
              />
            )}
            {Boolean(stage === 2) && (
              <StepConfirmation
                verificationCode={verificationCode}

                onChangeVerificationCode={(verificationCode) => this.setState({verificationCode})}

                onRepeatVerificationCode={this.repeatVerificationCode}
              />
            )}
            {Boolean(stage === 3) && (
              <StepPassword
                password={password}
                repeatPassword={repeatPassword}

                onChangePassword={(password) => this.setState({ password })}
                onChangeRepeatPassword={(repeatPassword) => this.setState({ repeatPassword })}
              />
            )}

            {Boolean(isLoad) && (
              <LoaderContent/>
            )}

          </View>

          <View style={{ marginTop: 16 }}>
            <Button
              disabled={this._disableButtonNext()}
              label={this._labelButtonNext()}

              onPress={this.onNext}
            />
          </View>

        </View>
      </Modalize>
    );
  }
}
const StepRegistration = (props) => {
  const {
    email,
    onChangeEmail,

    isConfirm,
    onChangeIsConfirm
  } = props;

  const openLinkConditions = async () => {
    await Linking.openURL(urls.termsOfUse);
  }

  return (
    <View style={{flex: 1}}>

      <Text style={styles.title}>
        { allTranslations(allTranslations(localization.popUpRegistration.stepRegistration.title)) }
      </Text>

      <Text style={styles.message}>
        { allTranslations(allTranslations(localization.popUpRegistration.stepRegistration.message)) }
      </Text>

      <TextInput
        value={email}
        placeholder={allTranslations(localization.popUpRegistration.stepRegistration.emailPlaceholder)}
        placeholderTextColor="#8E8E8E"
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}

        onChangeText={onChangeEmail}
      />

      <TouchableOpacity style={styles.checkBoxContainer} onPress={() => onChangeIsConfirm(!isConfirm)}>
        <Checkbox value={isConfirm} onValueChange={() => onChangeIsConfirm(!isConfirm)}/>
        <Text style={styles.checkBoxLabel}>
          { allTranslations(localization.popUpRegistration.stepRegistration.iAgree) }&nbsp;
        </Text>
        <TouchableOpacity onPress={openLinkConditions}>
          <Text style={styles.checkBoxLink}>
            { allTranslations(localization.popUpRegistration.stepRegistration.termsOfWatt) }
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>

    </View>
  )
}
const StepConfirmation = (props) => {
  const {
    verificationCode,
    onChangeVerificationCode,
    onRepeatVerificationCode
  } = props;

  return (
    <View style={{flex: 1}}>

      <Text style={styles.title}>
        { allTranslations(allTranslations(localization.popUpRegistration.stepConfirmation.title)) }
      </Text>

      <Text style={styles.message}>
        { allTranslations(allTranslations(localization.popUpRegistration.stepConfirmation.message)) }
      </Text>

      <View style={{marginTop: 24}}>

        <TextInput
          value={verificationCode}
          style={styles.input}
          placeholder={allTranslations(localization.popUpRegistration.stepConfirmation.verificationCodePlaceholder)}
          placeholderTextColor="#8E8E8E"
          autoCapitalize="none"
          keyboardType="decimal-pad"

          onChangeText={(value) => onChangeVerificationCode(value)}
        />

      </View>

      <View style={{marginTop: 16}}>
        <Button
          size="xSmall"
          label={allTranslations(localization.popUpRegistration.stepConfirmation.buttonRepeatVerificationCode)}
          style={styles.buttonConfirm}
          onPress={onRepeatVerificationCode}
        />
      </View>

    </View>
  )
}
const StepPassword = (props) => {
  const {
    password,
    repeatPassword,

    onChangePassword,
    onChangeRepeatPassword
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  return (
    <View style={{flex: 1}}>

      <Text style={styles.title}>
        { allTranslations(localization.popUpChangePassword.titleNewPassword) }
      </Text>

      <View style={{marginTop: "auto"}}>

        <View style={styles.formItem}>
          <Text style={styles.formItemLabel}>
            { allTranslations(localization.popUpChangePassword.form.newPasswordLabel) }
          </Text>
          <View style={styles.formItemContainer}>
            <TextInput
              value={password}
              style={styles.formItemInput}
              secureTextEntry={!showPassword}
              placeholder={allTranslations(localization.popUpChangePassword.form.newPasswordPlaceholder)}
              placeholderTextColor="#8E8E8E"
              autoCapitalize="none"

              onChangeText={(value) => onChangePassword(value)}
            />

            <TouchableOpacity style={styles.formItemButtonGlass} onPress={() => setShowPassword(!showPassword)}>
              {Boolean(!showPassword) ? (
                <CommonGlassIcon color="#8E8E8E"/>
              ) : (
                <CommonGlassOffIcon color="#8E8E8E"/>
              ) }
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.formItem, {marginTop: 12}]}>
          <Text style={styles.formItemLabel}>
            { allTranslations(localization.popUpChangePassword.form.repeatNewPasswordLabel) }
          </Text>
          <View style={styles.formItemContainer}>
            <TextInput
              value={repeatPassword}
              style={styles.formItemInput}
              placeholder={allTranslations(localization.popUpChangePassword.form.repeatNewPasswordPlaceholder)}
              placeholderTextColor="#8E8E8E"
              autoCapitalize="none"
              secureTextEntry={!showRepeatPassword}

              onChangeText={(value) => onChangeRepeatPassword(value)}
            />
            <TouchableOpacity style={styles.formItemButtonGlass} onPress={() => setShowRepeatPassword(!showRepeatPassword)}>
              {Boolean(!showRepeatPassword) ? (
                <CommonGlassIcon color="#8E8E8E"/>
              ) : (
                <CommonGlassOffIcon color="#8E8E8E"/>
              ) }
            </TouchableOpacity>
          </View>
        </View>

      </View>


    </View>
  )
}
const LoaderContent = () => {
  return (
    <View style={styles.loaderContent}>
      <LoadSpinner color="rgba(255,255,255,0)"/>
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

    minHeight: 330
  },

  title: {
    fontSize: 25,
    lineHeight: 30,
    color: "#282828",
    marginBottom: 24,
    textAlign: "center",
    fontWeight: "500"
  },
  message: {
    fontSize: 16,
    lineHeight: 23,
    color: "#8E8E8E",
    textAlign: "center"
  },

  input: {
    height: 40,
    backgroundColor: "#F7F7F7",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 0,
    marginTop: "auto",
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
    marginLeft: 12
  },
  checkBoxLink: {
    fontSize: 16,
    lineHeight: 21,
    color: "#f6d962"
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
  formItemContainer: {
    height: 40,
    flexDirection: "row",
    borderRadius: 14,
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 12,
    paddingVertical: 4
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

  loaderContent: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: -68,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.6)",

    alignItems: "center",
    justifyContent: "center"
  }
});

export default PopUpRegistration;
