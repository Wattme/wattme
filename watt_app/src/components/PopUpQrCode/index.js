import React from "react";
import {
  View,
  Image,
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
import { getQrCodeUrl } from "../../common/QrCode";
import BlurView from "../BlurView";
import Clipboard from "@react-native-clipboard/clipboard";
import Notification from "../../common/Notification";
import allTranslations from "../../localization/allTranslations";
import localization from "../../localization/localization";

class PopUpQrCode extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      qrCodeLink: "",
      message: "",

      isOpen: false
    };
  }


  open = (params) => {


    this.setState({
      qrCodeLink: getQrCodeUrl({ data: params?.data, size: 240 }),
      message: params?.data || "",
      isOpen: true
    })
  }
  close = () => {
    this.setState({
      isOpen: false
    })
  }

  copyData = async () => {
    await Clipboard.setString(this.state.message);
    Notification.send({
      type: "success",
      message: allTranslations(localization.notification.addBuffer)
    })
  }

  render() {
    const {
      isOpen,
      qrCodeLink,
      message
    } = this.state;

    if (!isOpen) {
      return null
    }

    return (
      <Portal>
        <BlurView style={{flex: 1}}>
          <TouchableOpacity style={styles.root} activeOpacity={1}>
            <View style={styles.container}>

              <Image
                source={{ uri: qrCodeLink }}
                style={styles.imageQrCode}
              />

              {Boolean(message) && (
                <Text style={styles.messageQrCode}>
                  { message }
                </Text>
              )}

              <View style={styles.footer}>
                <Button
                  label={allTranslations(localization.common.close)}
                  color="secondary"
                  style={styles.buttonClose}
                  labelStyle={styles.buttonCloseLabel}

                  onPress={this.close}
                />
                <Button
                  label={allTranslations(localization.common.copy)}
                  color="secondary"
                  style={styles.buttonClose}
                  labelStyle={styles.buttonCloseLabel}

                  onPress={this.copyData}
                />
              </View>

            </View>
          </TouchableOpacity>
        </BlurView>
      </Portal>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 28,
  },

  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0"
  },

  imageQrCode: {
    width: 244,
    height: 244
  },
  messageQrCode: {
    marginTop: 16,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#8E8E8E"
  },

  footer: {
    marginTop: 16,
    flexDirection: "row",
    marginLeft: -12
  },
  buttonClose: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginLeft: 12
  },
  buttonCloseLabel: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "normal",
    textAlign: "center"
  },
});

export default PopUpQrCode;
