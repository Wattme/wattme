import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native/index";
import {
  Text,
  Button,
} from "react-native-ui-lib";
import {
  Portal,
} from "react-native-portalize";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import BlurView from "../../BlurView";
import LoadSpinner from "../../LoadSpinner";

class PopUpSuccessTransaction extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  open = ({ onConfirm, onCancel }) => {
    this.setState({
      open: true,

      onConfirm,
      onCancel
    });
  };
  close = () => {
    this.setState({
      open: false,
    });
  };

  onSuccess = () => {
    if (this.state.onConfirm) {
      this.state.onConfirm();
    }

    this.setState({
      open: false,
    });
  };
  onClose = () => {
    this.setState({ open: false });

    if (this.state.onCancel) {
      this.state.onCancel();
    }
  }

  render() {
    const { open } = this.state;
    const {
      isCloseBackDrop,
      styles: stylesProps,
    } = this.props;

    if (!open) {
      return null;
    }

    return (
      <Portal>

        <BlurView style={{ flex: 1 }}>
          <View style={styles.root}>
            <View style={styles.informationCard}>

              <Text style={[styles.informationCardTitle, stylesProps.title]}>
                { allTranslations(localization.popUpSuccessTransaction.title) }
              </Text>

              <View style={{justifyContent: "center", alignItems: "center"}}>
                <View style={styles.indicatorContainer}>
                  <Image
                    style={{width: "100%", height: "100%"}}
                    resizeMode="contain"
                    source={require("../../../assets/png/account/success-confirm-email.png")}
                  />
                </View>
              </View>

              <View style={styles.controls}>
                <Button
                  style={styles.control}
                  labelStyle={styles.controlLabel}
                  label={allTranslations(localization.common.close)}
                  color="secondary"
                  onPress={this.onClose}
                />
                <Button
                  style={styles.control}
                  labelStyle={styles.controlLabel}
                  label={allTranslations(localization.common.look)}
                  onPress={this.onSuccess}
                />
              </View>

            </View>

            {Boolean(isCloseBackDrop) && (
              <TouchableOpacity style={styles.backdrop} onPress={this.close} activeOpacity={1} />
            )}
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
    marginBottom: 12,
  },
  indicatorContainer: {
    width: 94,
    height: 94,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "auto"
  },
  backdrop: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },


  controls: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -12,
    marginTop: 24
  },
  control: {
    flex: 1,
    height: 36,
    marginLeft: 12,
    borderRadius: 8,
    paddingVertical: 0
  },
  controlLabel: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "normal"
  },
});

PopUpSuccessTransaction.defaultProps = {
  styles: {},
};

export default PopUpSuccessTransaction;
