import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text,
  Button
} from "react-native-ui-lib";
import {
  Portal
} from "react-native-portalize";
import allTranslations from "../../localization/allTranslations";
import localization from "../../localization/localization";
import BlurView from "../BlurView";

class PopUpInformation extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      message: "",
      caption: "",
      controls: "",

      onConfirm: null,

      open: false
    };
  }

  open = ({ title, caption, message, controls, onConfirm, cancelButton, successButton, successButtonColor }) => {
    this.setState({
      title: title || "",
      caption: caption || "",
      message: message || "",
      controls: controls || "",
      onConfirm: onConfirm || "",

      cancelButton: cancelButton || "",
      successButton: successButton || "",
      successButtonColor: successButtonColor || "",

      open: true
    })
  }
  close = () => {
    this.setState({
      open: false
    })
  }

  onSuccess = () => {

    if (this.state.onConfirm) {
      this.state.onConfirm();
    }

    this.setState({
      open: false
    });
  }

  renderControls = () => {
    const { controls, cancelButton, successButton } = this.state;

    if (controls === "confirm") {
      return (
        <View style={{marginLeft: -12, flexDirection: "row"}}>
          <Button
            label={cancelButton || allTranslations(localization.popUpInformation.close)}
            size="xsSmall"
            color="secondary"
            labelStyle={{fontWeight: "normal"}}
            style={{marginLeft: 12, flex: 1}}

            onPress={() => this.setState({ open: false })}
          />
          <Button
            label={successButton || allTranslations(localization.popUpInformation.confirm)}
            size="xsSmall"
            style={{marginLeft: 12, flex: 1}}
            labelStyle={{fontWeight: "normal"}}

            onPress={() => this.state?.onConfirm()}
          />
        </View>
      )
    }

    return (
      <Button
        label={successButton || allTranslations(localization.popUpInformation.close)}
        labelStyle={{fontWeight: "normal"}}
        size="xsSmall"
        color={this.state.successButtonColor || "secondary"}

        onPress={this.onSuccess}
      />
    )
  }

  render() {
    const {
      title,
      caption,
      message,

      open
    } = this.state;
    const {
      isCloseBackDrop,
      styles: stylesProps
    } = this.props;

    if (!open) {
      return null
    }

    return (
      <Portal>

        <BlurView style={{flex: 1}}>
          <View style={styles.root}>
            <View style={styles.informationCard}>

              {Boolean(title)&&(
                <Text style={[styles.informationCardTitle, stylesProps.title]}>
                  { title }
                </Text>
              )}

              {Boolean(caption)&&(
                <Text style={[styles.informationCardCaption, stylesProps.caption]}>
                  { caption }
                </Text>
              )}

              {Boolean(message)&&(
                <Text style={[styles.informationCardMessage, stylesProps.message]}>
                  { message }
                </Text>
              )}

              <View style={styles.informationCardControls}>
                {this.renderControls()}
              </View>
            </View>

            {Boolean(isCloseBackDrop)&&(
              <TouchableOpacity style={styles.backdrop} onPress={this.close} activeOpacity={1}/>
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

    backgroundColor: "rgba(40, 40, 40, 0.4)"
  },

  informationCard: {
    zIndex: 10,
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#F7F7F7",

    width: "100%"
  },
  informationCardTitle: {
    fontSize: 18,
    lineHeight: 26,
    textAlign: "center",
    color: "#000000",
    fontWeight: "500",
    marginBottom: 16
  },
  informationCardCaption: {
    fontSize: 16,
    lineHeight: 23,
    textAlign: "center",
    color: "#000000",
    fontWeight: "500",
    marginBottom: 16
  },
  informationCardMessage: {
    fontSize: 14,
    lineHeight: 23,
    textAlign: "center",
    color: "#8E8E8E"
  },
  informationCardControls: {
    marginTop: 32
  },

  backdrop: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  }
});

PopUpInformation.defaultProps = {
  styles: {}
}

export default PopUpInformation
