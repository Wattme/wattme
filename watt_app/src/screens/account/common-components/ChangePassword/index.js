import React from "react";
import {
  View,
  Image,
  StyleSheet
} from "react-native/index";
import {
  Text,
  Button,
} from "react-native-ui-lib";
import {
  Portal
} from "react-native-portalize";
import {
  BlurView
} from "../../../../components";
import allTranslations from "../../../../localization/allTranslations";
import localization from "../../../../localization/localization";

class ChangePassword extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    }
  }


  open = () => {
    this.setState({ isOpen: true });
  }
  close = () => {
    this.setState({ isOpen: false });
  }

  render() {
    const {
      isOpen
    } = this.state;
    const {
      onNext
    } = this.props;

    if (!isOpen) {
      return null
    }

    return (
      <Portal>
        <BlurView style={{ flex: 1 }}>
          <View style={styles.root}>

            <View style={styles.content}>

              <View style={styles.image}>
                <Image
                  source={require("../../../../assets/png/account/success-change-password.png")}
                  resizeMode="contain"
                  style={{ width: "100%", height: "100%" }}
                />
              </View>

              <Text style={styles.title}>
                { allTranslations(localization.accountConfirmForgotPassword.popUpSuccess.title) }
              </Text>
              <Text style={styles.message}>
                { allTranslations(localization.accountConfirmForgotPassword.popUpSuccess.message) }
              </Text>

            </View>

            <View style={styles.footer}>
              <Button
                label={allTranslations(localization.common.proceed)}
                onPress={onNext}
              />
            </View>

          </View>
        </BlurView>
      </Portal>
    );
  }

}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white"
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  image: {
    width: 200,
    height: 200,

    marginBottom: 55
  },
  title: {
    fontSize: 25,
    lineHeight: 32,
    color: "#282828",
    fontWeight: "600",
    textAlign: "center",

    marginBottom: 24
  },
  message: {
    fontSize: 16,
    lineHeight: 23,
    textAlign: "center",
    color: "#8E8E8E"
  },

  footer: {
    paddingHorizontal: 12,
    paddingBottom: 42
  }
});

export default ChangePassword
