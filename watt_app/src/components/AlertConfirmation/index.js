import React from "react";
import {
  View,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native/index";
import {
  Text,
} from "react-native-ui-lib";
import allTranslations from "../../localization/allTranslations";
import localization from "../../localization/localization";
import BlurView from "../BlurView";

const { width } = Dimensions.get("window");

class AlertConfirmation extends React.Component{
  constructor(props) {
    super(props);

    this.state = {

      title: "title",
      message: "message",

      successButton: "",
      cancelButton: "",

      visible: false

    }
  }

  open = ({ title, message, successButton, cancelButton }) => {

    this.setState({
      title,
      message,
      cancelButton,
      successButton,
      visible: true
    })

  }
  close = () => {
    this.setState({ visible: false });
  }

  onCancel = () => {
    this.setState({ visible: false });

    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  render() {
    const { visible, title, message, successButton, cancelButton } = this.state;
    const { onSubmit } = this.props;

    return (
      <Modal
        visible={visible}
        transparent={true}
        onRequestClose={this.onCancel}
      >

        <View style={styles.modal}>

          <View style={styles.root}>

            {
              Boolean(title) && (
                <View style={styles.header}>
                  <Text style={styles.title}>{title}</Text>
                </View>
              )
            }

            {
              Boolean(message) && (
                <View style={styles.body}>
                  <Text style={styles.message}>{ message }</Text>
                </View>
              )
            }

            <View style={styles.hr} />

            <View style={styles.footer}>

              <TouchableOpacity style={styles.button} onPress={this.onCancel}>
                <Text style={styles.buttonText}>{ cancelButton || allTranslations(localization.alertConfirmation.buttonCancel) }</Text>
              </TouchableOpacity>

              <View style={styles.hrV}/>

              <TouchableOpacity style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonText}>{ successButton || allTranslations(localization.alertConfirmation.buttonSuccess) }</Text>
              </TouchableOpacity>

            </View>

          </View>

        </View>

        <BlurView style={styles.absolute}/>

      </Modal>
    );
  }
}
const styles = StyleSheet.create({

  modal: {
    flex: 1,
    zIndex: 2,

    justifyContent: "center",
    alignItems: "center",
  },

  absolute: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(22,48,70,0.5)"
  },

  root: {
    paddingHorizontal: 24,
    paddingVertical: 16,

    borderRadius: 12,
    backgroundColor: "#fafcfd",

    width: width * 0.8,
  },

  header: {
    marginBottom: 8
  },
  body: {
    marginBottom: 16
  },
  footer: {
    flexDirection: "row",
    marginBottom: -16
  },

  hr: {
    height: 1,
    backgroundColor: "#8e9ca8",
    marginHorizontal: -24,
    opacity: 0.2,
  },
  hrV: {
    height: 40,
    width: 1,
    backgroundColor: "#8e9ca8",
    opacity: 0.2,
  },

  title: {
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "800",
    color: "#4d4d4d",
  },
  message: {
    fontSize: 14,
    lineHeight: 19,
    color: "#5d5d5d",
  },

  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 14,
    color: '#465a64'
  },

});

export default AlertConfirmation;
