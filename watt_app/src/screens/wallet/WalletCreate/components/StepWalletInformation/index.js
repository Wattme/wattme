import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity, TextInput, Image,
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import {
  ImportWalletCamera as ImportWalletCameraIcon,
  ImportWalletEdit as ImportWalletEditIcon,
} from "../../../../../assets/icons";
import { getFontFamily } from "../../../../../theme/theme-manager/Text";
import { BlockInformation, ImagePicker } from "../../../../../components";

class StepWalletInformation extends React.PureComponent {
  constructor() {
    super();

    this.refTextInputName = React.createRef();
  }

  onChange = (value, name) => {
    let walletForm = {...this.props.walletForm};
    walletForm[name] = value;

    this.props.onChange(walletForm);
  }

  _focusFormName = () => {
    this.refTextInputName.current?.focus();
  }

  render() {
    const {
      walletForm
    } = this.props;

    return (
      <>

        <View style={styles.root}>

          <TouchableOpacity style={styles.section} onPress={this._focusFormName} activeOpacity={1}>
            <Text style={styles.formLabel}>{allTranslations(localization.importWalletForm.form.nameLabel)}</Text>
            <TextInput
              ref={this.refTextInputName}
              value={walletForm.label}
              style={[styles.formInput, styles.formInputName]}
              placeholder={allTranslations(localization.importWalletForm.form.namePlaceholder)}

              onChangeText={(value) => this.onChange(value, 'label')}
            />
          </TouchableOpacity>

          <ImagePicker onChange={(image) => this.onChange(image, 'image')}>
            <View style={[ styles.section, {marginTop: 12}]}>
              <View style={styles.imagePicker}>
                <View style={styles.imagePickerIcon}>
                  {Boolean(!walletForm.image) ? (
                    <ImportWalletCameraIcon/>
                  ):(
                    <Image
                      source={{uri: walletForm.image}}
                      style={{width: 44, height: 44}}
                    />
                  )}
                </View>
                <View style={styles.imagePickerBody}>
                  <Text style={styles.formLabel}>{allTranslations(localization.importWalletForm.form.imageLabel)}</Text>
                </View>
                <View style={styles.imagePickerRight}>
                  <ImportWalletEditIcon/>
                </View>
              </View>
            </View>
          </ImagePicker>

        </View>

        <View style={styles.footer}>
          {!Boolean(walletForm.label)&&(
            <BlockInformation
              type="error"
              message={allTranslations(localization.walletCreate.step4.errorMessage)}
            />
          )}
        </View>

      </>
    );
  }
}

const styles = StyleSheet.create({

  root: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12
  },

  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: "white"
  },
  sectionLine: {
    height: 2,
    marginVertical: 15,
    marginHorizontal: -16,
    backgroundColor: "#F9F9F9"
  },

  imagePicker: {
    flexDirection: "row",
    alignItems: "center",
  },
  imagePickerIcon: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    overflow: "hidden",
    backgroundColor: "#282828",
  },
  imagePickerBody: {
    flex: 1,
    paddingHorizontal: 16
  },
  imagePickerRight: {
    width: 32,
    height: 32,

    justifyContent: "center",
    alignItems: "center"
  },

  formLabel: {
    fontSize: 13,
    lineHeight: 16,
    color: "#8E8E8E"
  },
  formInput: {
    fontSize: 16,
    fontWeight: "500",
    color: "#282828",
    fontFamily: getFontFamily('500'),
  },
  formInputName: {
    padding: 0,
    marginTop: 13,
    height: 24,
    marginBottom: -1
  },
  formInputPhrase: {
    height: 100,
    padding: 0
  },

  footer: {
    paddingHorizontal: 12,
  }

})

export default StepWalletInformation
