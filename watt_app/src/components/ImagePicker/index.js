import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import Menu from "./Menu";
import ImageCropPicker from "react-native-image-crop-picker";

class ImagePicker extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      isOpenMenu: false
    }
  }

  onSetImage = async (imagePath) => {
    this.setState({
      image: imagePath,

      isOpenMenu: false
    });

    const base64 = await ImageCropPicker.openCropper({
      hideBottomControls: true,
      path: imagePath,
      multiple: false,
      maxFiles: 1,
      includeBase64: true,
      width: 244,
      height: 244
    }).then((res) => {
      return `data:image/png;base64,${ res.data }`
    }).catch(() => {
      return null
    });

    this.props.onChange(base64 || null);
  }

  onOpenMenu = () => {
    this.setState({ isOpenMenu: true });
  }
  onCloseMenu = () => {
    this.setState({ isOpenMenu: false });
  }

  render() {
    const {
      children
    } = this.props;
    const {
      isOpenMenu
    } = this.state;

    return (
      <>

        <TouchableOpacity activeOpacity={0.8} onPress={this.onOpenMenu}>
          { children }
        </TouchableOpacity>


        {Boolean(isOpenMenu) && (
          <Menu
            open={true}

            onSetImage={this.onSetImage}
            onCancel={this.onCloseMenu}
          />
        )}
      </>
    );
  }

}

export default ImagePicker
