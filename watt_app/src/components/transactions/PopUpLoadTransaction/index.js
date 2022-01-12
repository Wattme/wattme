import React from "react";
import {
  View,
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

class PopUpLoadTransaction extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  open = () => {
    this.setState({
      open: true,
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

  renderControls = () => {
    const { controls, cancelButton, successButton } = this.state;

    if (controls === "confirm") {
      return (
        <View style={{ marginLeft: -12, flexDirection: "row" }}>
          <Button
            label={cancelButton || allTranslations(localization.popUpInformation.close)}
            size="xsSmall"
            color="secondary"
            labelStyle={{ fontWeight: "normal" }}
            style={{ marginLeft: 12, flex: 1 }}

            onPress={() => this.setState({ open: false })}
          />
          <Button
            label={successButton || allTranslations(localization.popUpInformation.confirm)}
            size="xsSmall"
            style={{ marginLeft: 12, flex: 1 }}
            labelStyle={{ fontWeight: "normal" }}

            onPress={() => this.state?.onConfirm()}
          />
        </View>
      );
    }

    return (
      <Button
        label={successButton || allTranslations(localization.popUpInformation.close)}
        labelStyle={{ fontWeight: "normal" }}
        size="xsSmall"
        color={this.state.successButtonColor || "secondary"}

        onPress={this.onSuccess}
      />
    );
  };

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
                { allTranslations(localization.popUpLoadTransaction.title) }
              </Text>

              <View style={{justifyContent: "center", alignItems: "center"}}>
                <View style={styles.indicatorContainer}>
                  <LoadSpinner color="transparent"/>
                </View>
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
    width: 108,
    height: 108,
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
});

PopUpLoadTransaction.defaultProps = {
  styles: {},
};

export default PopUpLoadTransaction;
