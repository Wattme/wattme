import React from "react";
import {
  View,
  Easing,
  Animated,
  Vibration,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native/index";
import {
  Text,
} from "react-native-ui-lib";
import {
  Portal,
} from "react-native-portalize";
import getHeightStatusBar from "../../helpers/getHeightStatusBar";
import allTranslations from "../../localization/allTranslations";
import localization from "../../localization/localization";
import VirtualKeyboard from "../VirtualKeyboard";
import { compose } from "recompose";
import { connect } from "react-redux";
import { getItem } from "../../common/Storage";
import PropTypes from "prop-types";
import FingerprintScanner from "react-native-fingerprint-scanner";

const heightStatusBar = getHeightStatusBar();
const { width, height } = Dimensions.get("window");

class ModalApplicationLock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      passCode: "",

      isUseBiometrics: false,
    };

    this.refVirtualKeyboard = React.createRef();
    this.shakeAnimation = new Animated.Value(0);
  }

  componentDidMount = async () => {
    let isUseBiometrics = Boolean(await getItem("is-fingerprint-scanner") === "true");

    if (isUseBiometrics) {
      isUseBiometrics = this.props.global.settingsTouchId[this.props.type];
    }

    this.setState({ isUseBiometrics: isUseBiometrics });

    await this.onStartBiometrics();
  };

  componentDidUpdate = async (prevProps) => {
    if (this.props.open && !prevProps.open) {
      await this.onStartBiometrics();
    }
  };

  onChangePassCode = async (passCode) => {
    await this.setState({ passCode });

    if (passCode.length === 4) {
      await this.onCheckPassCode();
    }

    this.lineProcess();
  };
  onCheckPassCode = async () => {
    if (Boolean(this.props.global.passCode === this.state.passCode)) {
      this.props.onNext();
    } else {
      Vibration.vibrate();

      this.refVirtualKeyboard.current.state.text = "";
      await this.setState({ passCode: "" });

      Animated.sequence([
        Animated.timing(this.shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(this.shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
        Animated.timing(this.shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(this.shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true }),
      ]).start();
    }
  };

  lineProcess = () => {
    const percentWidth = [0, 60, 96, 132, 132];
    Animated.timing(this.state.widthLine, {
      toValue: percentWidth[passCode.length],
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  }

  onStartBiometrics = async () => {
    if (!Boolean(this.state.isUseBiometrics) || !this.props.open) {
      return null;
    }

    FingerprintScanner.authenticate({
      title: allTranslations(localization.modalApplicationLock.fingerprintScannerTitle),
      cancelButton: allTranslations(localization.modalApplicationLock.fingerprintScannerCancelButton),
    }).then(() => {
      this.props.onNext();
    }).catch(() => {
      return null;
    });
    FingerprintScanner.release();
  };

  render() {
    const { open, onClose } = this.props;
    const { passCode, isUseBiometrics } = this.state;
    const percentWidth = [0, 60, 96, 132, 132];

    if (!open) {
      return null;
    }

    return (
      <Root hidePortal={this.props.hidePortal}>
        <View style={styles.root}>

          <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>

            <Text style={styles.title}>
              {allTranslations(localization.modalApplicationLock.entry)}
            </Text>

            <View style={[styles.containerCodes]}>
              {[0,1,2,3].map((char, idx) => (
                <View
                  key={`ModalApplicationLock-char-${idx}`}
                  style={[
                    styles.passCodeChar,
                    Boolean((passCode||'').length > idx) && styles.passCodeCharActive,
                    Boolean(idx === 0) && {marginLeft: 0}
                  ]}
                />
              ))}

              <Animated.View style={[
                styles.containerBackground,
                Boolean((passCode||'').length > 0) && {
                  width: percentWidth[passCode.length]
                }
              ]}/>
            </View>

            <Text style={styles.caption}>
              {allTranslations(localization.modalApplicationLock.enterPassword)}
            </Text>

          </View>

          <View style={{
            alignItems: "center",
            justifyContent: "flex-end"
          }}>
            <View style={styles.containerKeyboard}>
              <Animated.View
                style={{transform: [{translateX: this.shakeAnimation}]}}
              >
                <VirtualKeyboard
                  ref={this.refVirtualKeyboard}
                  color='black'
                  pressMode='string'

                  isUseBiometrics={isUseBiometrics}

                  onPress={this.onChangePassCode}
                  onPressBiometrics={this.onStartBiometrics}

                  rowStyle={styles.keyboardRowStyle}
                  cellStyle={styles.keyboardCellStyle}
                />
              </Animated.View>
            </View>

            <TouchableOpacity style={styles.buttonForgotCode}>
              <Text style={styles.buttonForgotCodeLabel}>
                {allTranslations(localization.modalApplicationLock.forgotCode)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonExit} onPress={onClose}>
              <Text style={styles.buttonExitLabel}>
                {allTranslations(localization.modalApplicationLock.exit)}
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </Root>
    );
  }
}
const Root = (props) => {
  if (!props.hidePortal) {
    return (
      <Portal>
        { props.children }
      </Portal>
    )
  }

  return props.children
}

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    paddingTop: heightStatusBar,

    paddingBottom: 32
  },

  title: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: "500",
    textAlign: "center",
    color: "#282828",

    marginBottom: 32
  },
  caption: {
    fontSize: 16,
    lineHeight: 23,
    fontWeight: "300",
    color: "#282828",
    textAlign: "center",

    marginTop: 32
  },

  containerBackground: {
    position: "absolute",
    left: -4,
    top: -4,
    bottom: -4,
    backgroundColor: "#F6D962",
    borderRadius: 14,
    width: 0,
  },
  containerCodes: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 16
  },
  passCodeChar: {
    backgroundColor: "#C4C4C4",
    width: 16,
    height: 16,
    borderRadius: 999,
    marginLeft: 20,
    zIndex: 2
  },
  passCodeCharActive: {
    backgroundColor: "#282828"
  },

  containerKeyboard: {
    width: "100%",
    maxWidth: 244,
    marginBottom: 12
  },
  keyboardRowStyle: {
    marginBottom: 12,
    marginLeft: -32,
    marginTop: 0
  },
  keyboardCellStyle: {
    minWidth: 60,
    width: 60,
    height: 60,
    marginLeft: 32
  },

  buttonForgotCode: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,

    marginBottom: 8
  },
  buttonForgotCodeLabel: {
    fontSize: 16,
    lineHeight: 30,
    textAlign: "center",
    fontWeight: "300"
  },

  buttonExit: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  buttonExitLabel: {
    fontSize: 18,
    lineHeight: 30,
    fontWeight: "500",
    textAlign: "center"
  },
});


ModalApplicationLock.propTypes = {
  type: PropTypes.oneOf(["entrance", "transactionSignature"]),
  open: PropTypes.bool,
};
ModalApplicationLock.defaultProps = {
  type: "entrance",
};

export default compose(
  connect(
    state => ({
      global: state.globalState,
    }),
  ),
)(ModalApplicationLock);
