import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native/index";
import {
  Text,
  Button
} from "react-native-ui-lib";
import { Modalize } from "../../../../../components";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import { getFontFamily } from "../../../../../theme/theme-manager/Text";
import { validateEmail } from "../../../../../helpers/validate";

class PopUpForgotPassword extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      verificationCode: "",

      verificationId: null,
      step: 1,

      isLoad: false
    };
  }

  onClose = () => {
    this.setState({ step: 1 });
  }

  getVerificationCode = async () => {}
  getVerificationCodeRepeat = async () => {}
  confirmPasswordReset = async () => {}

  _buttonLabel = () => {
    if (this.state.step === 1) {
      return allTranslations(localization.common.further)
    }
    if (this.state.step === 2) {
      return allTranslations(localization.common.confirm)
    }
  }
  _buttonDisable = () => {
    const { step, email, verificationCode } = this.state;

    if (step === 1) {
      return Boolean(!email || !validateEmail(email))
    }
  }
  _buttonPress = async () => {
    const { step } = this.state;

    if (step === 1) {
      await this.getVerificationCode();
    }
    if (step === 2) {
      await this.confirmPasswordReset();
    }
  }

  render() {
    const {
      innerRef
    } = this.props;
    const {
      step,
      email,
      verificationCode
    } = this.state;

    return (
      <Modalize
        innerRef={innerRef}

        onClose={this.onClose}
      >
        <View style={styles.modalizeContainer}>

          <View style={styles.root}>

            { Boolean(step === 1) && (
              <StepEmail
                email={email}

                onChange={(email) => this.setState({ email })}
              />
            ) }

            { Boolean(step === 2) && (
              <StepConfirm
                verificationCode={verificationCode}

                onChange={(verificationCode) => this.setState({ verificationCode })}
                onRepeatCode={this.getVerificationCodeRepeat}
              />
            ) }

          </View>

          <View style={{marginTop: 16}}/>

          <Button
            label={this._buttonLabel()}
            disabled={this._buttonDisable()}
            onPress={this._buttonPress}
          />

        </View>
      </Modalize>
    );
  }
}
const StepEmail = (props) => {
  const {
    email,

    onChange
  } = props;

  return (
    <>

      <Text style={styles.title}>
        { allTranslations(localization.popUpForgotPassword.step1.title) }
      </Text>

      <Text style={styles.message}>
        { allTranslations(localization.popUpForgotPassword.step1.message) }
      </Text>

      <View style={{marginTop: "auto"}}/>

      <View style={styles.formItemContainer}>
        <TextInput
          value={email}
          style={styles.formItemInput}
          placeholder={allTranslations(localization.popUpForgotPassword.step1.emailPlaceholder)}
          placeholderTextColor="#8E8E8E"

          onChangeText={onChange}
        />
      </View>

      <View style={styles.stepFooter}/>

    </>
  )
}
const StepConfirm = (props) => {
  const {
    verificationCode,

    onChange,
    onRepeatCode
  } = props;

  return (
    <>

      <Text style={styles.title}>
        { allTranslations(localization.popUpForgotPassword.step2.title) }
      </Text>

      <Text style={styles.message}>
        { allTranslations(localization.popUpForgotPassword.step2.message) }
      </Text>

      <View style={{marginTop: "auto"}}/>

      <View style={styles.formItemContainer}>
        <TextInput
          value={verificationCode}
          style={styles.formItemInput}
          placeholder={allTranslations(localization.popUpForgotPassword.step2.codePlaceholder)}
          placeholderTextColor="#8E8E8E"

          onChangeText={onChange}
        />
      </View>

      <View style={styles.stepFooter}>
        <TouchableOpacity style={styles.buttonRepeat} onPress={onRepeatCode} activeOpacity={0.6}>
          <Text style={styles.buttonRepeatLabel}>
            { allTranslations(localization.popUpForgotPassword.step2.buttonRepeatVerificationCode) }
          </Text>
        </TouchableOpacity>
      </View>

    </>
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
    color: "#282828",
    fontFamily: getFontFamily("normal")
  },

  stepFooter: {
    height: 32,
    marginTop: 16
  },

  buttonRepeat: {
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonRepeatLabel: {
    fontSize: 16,
    lineHeight: 17,
    color: "#282828",
    textAlign: "center"
  }
});

export default PopUpForgotPassword
