import React from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid
} from "react-native/index";
import { Button } from "react-native-ui-lib";
import { Portal } from "react-native-portalize";
import { RNCamera } from "react-native-camera";
import {
  CommonCamera as CommonCameraIcon,
} from "../../assets/icons";
import CameraRoll from "@react-native-community/cameraroll";
import allTranslations from "../../localization/allTranslations";
import localization from "../../localization/localization";
import ImageCropPicker from "react-native-image-crop-picker";
import BlurView from "../BlurView";

class Menu extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      imageGallery: [],
    };
  }

  componentDidMount = async () => {
    await this.getPermission();
    await this.getImagesFromGallery();
  };

  getPermission = async () => {
    await this._getPermissionWRITE_EXTERNAL_STORAGE();
    await this._getPermissionCAMERA();
    await this._getPermissionREAD_EXTERNAL_STORAGE();

    await this.getImagesFromGallery();
  }
  _getPermissionWRITE_EXTERNAL_STORAGE = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;


    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }
  _getPermissionCAMERA = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.CAMERA;


    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }
  _getPermissionREAD_EXTERNAL_STORAGE = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;


    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  getImagesFromGallery = async () => {

    const data = await CameraRoll.getPhotos({
      assetType: "Photos",
      first: 6,
    });

    const imageGallery = (data?.edges || []).map((image) => {
      return {
        uri: image?.node?.image?.uri,
      };
    });

    this.setState({
      imageGallery,
    });
  };

  selectImage = async (image) => {
    this.props.onSetImage(image?.uri);
  };
  selectImageFromCamera = async () => {
    const data = await ImageCropPicker.openCamera({
      multiple: false,
      hideBottomControls: true,
      maxFiles: 1,
    });

    this.props.onSetImage(data?.path);
  };
  selectImageFromGallery = async () => {
    const data = await ImageCropPicker.openPicker({
      multiple: false,
      hideBottomControls: true,
      maxFiles: 1,
    });

    this.props.onSetImage(data?.path);
  };

  render() {
    const {
      open,
      onCancel,
    } = this.props;

    if (!open) {
      return null;
    }

    const {
      imageGallery,
    } = this.state;

    return (
      <Portal>
        <BlurView style={styles.root}>
          <View style={styles.container}>
            <View style={styles.content}>
              <ScrollView
                contentContainerStyle={styles.scrollView}
                horizontal
                showsHorizontalScrollIndicator={false}
              >

                <TouchableOpacity style={styles.scrollViewItem} onPress={this.selectImageFromCamera}>
                  <RNCamera
                    style={styles.camera}
                    type={RNCamera.Constants.Type.front}
                    androidCameraPermissionOptions={{
                      title: allTranslations(localization.walletConnectCamera.androidCameraPermissionOptions.title),
                      message: allTranslations(localization.walletConnectCamera.androidCameraPermissionOptions.message),
                      buttonPositive: allTranslations(localization.walletConnectCamera.androidCameraPermissionOptions.buttonPositive),
                      buttonNegative: allTranslations(localization.walletConnectCamera.androidCameraPermissionOptions.buttonNegative),
                    }}
                  />

                  <View style={styles.iconCamera}>
                    <CommonCameraIcon />
                  </View>
                </TouchableOpacity>

                {(imageGallery || []).map((image, idxImage) => (
                  <TouchableOpacity
                    key={`idxImage-${idxImage}`}
                    style={styles.scrollViewItem}
                    onPress={() => this.selectImage(image)}
                    activeOpacity={0.8}
                  >
                    <Image source={{ uri: image.uri }} style={{ flex: 1 }} />
                  </TouchableOpacity>
                ))}

              </ScrollView>

              <View style={{ paddingHorizontal: 16 }}>
                <Button
                  style={styles.buttonCancel}
                  labelStyle={{ fontWeight: "400" }}
                  label="Выбрать из галереи"
                  onPress={this.selectImageFromGallery}
                />
              </View>
            </View>

            <Button style={styles.buttonCancel} label="Отменить" onPress={onCancel} />
          </View>

          {/*<BlurView style={styles.blurView}  />*/}
        </BlurView>
      </Portal>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(40, 40, 40, 0.4)",
  },

  container: {
    flex: 1,
    zIndex: 2,
    justifyContent: "flex-end",

    paddingHorizontal: 12,
    paddingVertical: 48,
  },
  blurView: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },

  content: {
    backgroundColor: "white",
    borderRadius: 14,
    paddingVertical: 16,
  },
  scrollView: {
    paddingHorizontal: 12,
    marginLeft: -12,
    marginBottom: 24,
  },
  scrollViewItem: {
    height: 92,
    width: 92,
    marginLeft: 12,

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 8,

    overflow: "hidden",

    backgroundColor: "white",
  },

  camera: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  iconCamera: {
    flex: 1,
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonCancel: {
    backgroundColor: "white",
    borderColor: "white",
    marginTop: 12,
  },
});

export default Menu;
