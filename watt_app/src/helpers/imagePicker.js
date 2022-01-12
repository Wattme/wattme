import ImageCropPicker from "react-native-image-crop-picker";
import allTranslations from "../localization/allTranslations";
import localization from "../localization/localization";

const getImageFromPicker = async () => {
  const data = await ImageCropPicker.openPicker({
    width: 240,
    height: 240,
    cropping: true,
    includeBase64: true,
    hideBottomControls: true,
    cropperCircleOverlay: true,
    cropperToolbarTitle: allTranslations(localization.imageCropPicker.title)
  }).then((res) => {
    return res
  }).catch((err) => {
    return null
  });

  if (!data) {
    return null
  }

  return `data:image/png;base64,${ data?.data }`
}

export {
  getImageFromPicker
}
