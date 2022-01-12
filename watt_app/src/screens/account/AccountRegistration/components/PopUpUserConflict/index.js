import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native/index";
import {
  Text,
  Button
} from "react-native-ui-lib";
import {
  Portal,
} from "react-native-portalize";
import BlurView from "../../../../../components/BlurView";
import localization from "../../../../../localization/localization";
import allTranslations from "../../../../../localization/allTranslations";

class PopUpUserConflict extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    }
  }

  open = () => {
    this.setState({
      isOpen: true
    })
  }
  close = () => {
    this.setState({ isOpen: false })
  }

  render() {
    const {
      isOpen
    } = this.state;
    const {
      routeAccountLogin,
      routeAccountForgotPassword
    } = this.props;

    if (!isOpen) {
      return null
    }

    return (
      <Portal>

        <BlurView style={{ flex: 1 }}>
          <View style={styles.root}>
            <View style={styles.informationCard}>

              <Text style={[styles.informationCardTitle]}>
                { allTranslations(localization.accountBackOffice.popUpUserConflict.label) }
              </Text>

              <Button
                style={styles.buttonLogin}
                labelStyle={styles.buttonLoginLabel}
                label={allTranslations(localization.accountBackOffice.popUpUserConflict.buttonLogin)}
                onPress={routeAccountLogin}
              />

              <Button
                style={styles.buttonReset}
                labelStyle={styles.buttonResetLabel}
                label={allTranslations(localization.accountBackOffice.popUpUserConflict.buttonReset)}
                onPress={routeAccountForgotPassword}
              />

            </View>

            <TouchableOpacity style={styles.backdrop} onPress={this.close} activeOpacity={1} />
          </View>
        </BlurView>

      </Portal>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 28,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(40, 40, 40, 0.4)",
  },

  informationCard: {
    zIndex: 10,
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#F7F7F7",

    width: "100%",
  },
  informationCardTitle: {
    fontSize: 18,
    lineHeight: 26,
    textAlign: "center",
    color: "#000000",
    fontWeight: "500",
    marginBottom: 24,
  },
  informationCardCaption: {
    fontSize: 16,
    lineHeight: 23,
    textAlign: "center",
    color: "#000000",
    fontWeight: "500",
    marginBottom: 16,
  },
  informationCardMessage: {
    fontSize: 14,
    lineHeight: 23,
    textAlign: "center",
    color: "#8E8E8E",
  },
  informationCardControls: {
    marginTop: 32,
  },

  backdrop: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },


  buttonLogin: {
    height: 32,
    paddingVertical: 0,
    borderColor: "transparent",
    backgroundColor: "transparent"
  },
  buttonLoginLabel: {
    fontWeight: "500",
    fontSize: 14
  },
  buttonReset: {
    height: 32,
    paddingVertical: 0,
    borderRadius: 8,
    marginTop: 12
  },
  buttonResetLabel: {
    fontWeight: "normal",
    fontSize: 16
  },
});

export default PopUpUserConflict;
