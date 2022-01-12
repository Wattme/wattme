import React from "react";
import {
  View,
  StyleSheet,
} from "react-native/index";
import {
  Button
} from "react-native-ui-lib";
import Modalize from "../Modalize";
import StepRegistration from "./stages/StepRegistration";
import allTranslations from "../../localization/allTranslations";
import localization from "../../localization/localization";
import { validateEmail } from "../../helpers/validate";

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

      isConfirm: false
    };
  }

  // step 1
  registrationUser = async () => {

  }
  // ------


  // step 2
  // ------


  // helpers
  _buttonNextLabel = () => {
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
  _buttonNextDisable = () => {
    const { stage, email, isConfirm, password, repeatPassword } = this.state;

    if (stage === 1) {
      return Boolean(!email || !isConfirm || !validateEmail(email))
    }
    if (stage === 2) {
      return Boolean(!email || !isConfirm || !validateEmail(email))
    }
    if (stage === 3) {
      return Boolean(!password || !repeatPassword || Boolean(password !== repeatPassword))
    }
  }
  _buttonNextOnPress = async () => {
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
  _closedModalize = () => {
    this.props.onClose();
    this.setState({
      stage: 1,
      email: "",
      verificationCode: "",
      password: "",
      repeatPassword: "",
      verificationId: null,
    })
  }
  // ------

  render() {
    const {
      innerRef,
    } = this.props;
    const {
      stage,
      email,
      isConfirm
    } = this.state;

    return (
      <Modalize
        innerRef={innerRef}
      >
        <View style={styles.root}>

          <View style={styles.body}>

            {Boolean(stage === 1) && (
              <StepRegistration
                email={email}
                onChangeEmail={(email) => this.setState({ email })}

                isConfirm={isConfirm}
                onChangeIsConfirm={(isConfirm) => this.setState({ isConfirm })}

                styles={styles}
              />
            )}

          </View>

          <View style={styles.footer}>
            <Button
              label={this._buttonNextLabel()}
              disabled={this._buttonNextDisable()}
              onPress={this._buttonNextOnPress}
            />
          </View>

        </View>
      </Modalize>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  body: {
    paddingTop: 44,
    paddingHorizontal: 16,
    paddingBottom: 24,

    borderRadius: 14,
    backgroundColor: "white",

    minHeight: 330,
  },
  footer: {
    marginTop: 16
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
    marginTop: 12,
  },
  formItemLabel: {
    fontSize: 14,
    lineHeight: 17,
    color: "#282828",
    marginBottom: 8,
    marginHorizontal: 12,
  },
  formItemContainer: {
    height: 40,
    flexDirection: "row",
    borderRadius: 14,
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  formItemInput: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
    fontSize: 16,
    color: "#282828",
  },
  formItemButtonGlass: {
    width: 32,
    height: 32,
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


});

export default PopUpRegistration;
