import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
} from "react-native/index";
import { Button } from "react-native-ui-lib";
import { Portal } from "react-native-portalize";
import { RNCamera } from "react-native-camera";
import {
  CommonGallery as CommonGalleryIcon
} from "../../assets/icons";
import {launchImageLibrary} from 'react-native-image-picker';
import getHeightStatusBar from "../../helpers/getHeightStatusBar";
import allTranslations from "../../localization/allTranslations";
import localization from "../../localization/localization";
import EStyleSheet from "react-native-extended-stylesheet";
import RNQRGenerator from "rn-qr-generator";
import Notification from "../../common/Notification";

const { width } = Dimensions.get("window");
const sizeCamera = width * 0.72;
const heightStatusBar = getHeightStatusBar();

class ModalCamera extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      flashMode: "off",
    };

    this.refCamera = React.createRef();
  }

  onScanImage = () => {
    launchImageLibrary({
      mediaType: "photo",
      selectionLimit: 1,
      includeBase64: true
    }, async (response) => {

      if ((response?.assets || []).length <= 0) {
        return null
      }

      const uri = response?.assets?.[0]?.uri;

      const data = await RNQRGenerator.detect({
        uri: uri
      }).then((res) => {
        return res?.values?.[0]
      }).catch((err) => {
        return null
      })

      if (!data) {
        Notification.send({
          message: allTranslations(localization.modalCamera.errorScan),
          type: "danger"
        })
      }

      this.props.onBarCodeRead({
        data: data
      });

    }, (err) => {});
  }

  render() {
    const {
      flashMode,
    } = this.state;
    const {
      open,
      onClose,
      onBarCodeRead,
    } = this.props;

    if (!open) {
      return null;
    }

    return (
      <Portal>
        <View style={styles.root}>
          <View style={styles.container}>
            <View style={styles.containerRow}>
              <Cell/>
            </View>
            <View style={{height: sizeCamera, flexDirection: "row"}}>
              <Cell/>
              <View style={styles.containerCamera}>
                <Image style={[styles.angle, styles.angleTopLeft]} source={require('../../assets/png/camera/angle-top-left.png')}/>
                <Image style={[styles.angle, styles.angleTopRight]} source={require('../../assets/png/camera/angle-top-right.png')}/>
                <Image style={[styles.angle, styles.angleBottomLeft]} source={require('../../assets/png/camera/angle-bottom-left.png')}/>
                <Image style={[styles.angle, styles.angleBottomRight]} source={require('../../assets/png/camera/angle-bottom-right.png')}/>
              </View>
              <Cell/>
            </View>
            <View style={styles.containerRow}>
              <Cell/>
            </View>
          </View>

          <View style={styles.footer}>
            <Button
              color="secondary"
              style={{flex: 1, marginLeft: 12}}
              onPress={onClose}
            >
              <Text style={styles.buttonLabel}>
                {allTranslations(localization.common.close)}
              </Text>
            </Button>
            <Button
              color="secondary"
              style={styles.buttonGallery}
              onPress={this.onScanImage}
            >
              <CommonGalleryIcon size={20}/>
            </Button>
          </View>


          <RNCamera
            ref={this.refCamera}
            style={styles.camera}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode[flashMode]}
            androidCameraPermissionOptions={{
              title: allTranslations(localization.walletConnectCamera.androidCameraPermissionOptions.title),
              message: allTranslations(localization.walletConnectCamera.androidCameraPermissionOptions.message),
              buttonPositive: allTranslations(localization.walletConnectCamera.androidCameraPermissionOptions.buttonPositive),
              buttonNegative: allTranslations(localization.walletConnectCamera.androidCameraPermissionOptions.buttonNegative),
            }}
            onBarCodeRead={onBarCodeRead}
          />
        </View>
      </Portal>
    );
  }
}
class Cell extends React.PureComponent {
  render() {
    return (
      <View style={styles.containerCell}/>
    );
  }
}

const styles = EStyleSheet.create({
  root: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },

  camera: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },

  header: {
    paddingTop: heightStatusBar + 16,
    paddingBottom: 16,
    paddingHorizontal: 34,

    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    zIndex: 2,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: '500'
  },
  headerButtonBack: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center"
  },
  headerLeftContent: {
    width: 32,
    height: 32
  },
  headerRightContent: {
    width: 32,
    height: 32
  },

  container: {
    flex: 1,
    zIndex: 2
  },
  containerRow: {
    flex: 1,
    flexDirection: "row"
  },
  containerCell: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)"
  },
  containerCamera: {
    width: sizeCamera,
    height: sizeCamera,
    zIndex: 5
  },

  angle: {
    width: 82,
    height: 82,
    position: "absolute"
  },
  angleTopLeft: {
    top: -25,
    left: -25
  },
  angleTopRight: {
    top: -25,
    right: -25
  },
  angleBottomLeft: {
    bottom: -25,
    left: -25
  },
  angleBottomRight:  {
    bottom: -25,
    right: -25
  },

  footer: {
    zIndex: 5,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",

    flexDirection: "row",
    paddingHorizontal: 56,
    paddingBottom: 20,
    marginLeft: -16,

    "@media (min-width: 400)": {
      paddingBottom: 54
    }
  },
  footerButton: {
    marginLeft: 16
  },

  buttonLabel: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "white"
  },
  buttonGallery: {
    height: 52,
    width: 52,
    minWidth: 0,
    marginLeft: 12,
    paddingHorizontal: 0
  },
});

export default ModalCamera;
