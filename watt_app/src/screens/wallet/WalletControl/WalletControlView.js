import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView, TextInput, TouchableOpacity, Image,
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  Header,
  ImagePicker,
  ModalLoading
} from "../../../components";
import Notification from "../../../common/Notification";
import localization from "../../../localization/localization";
import allTranslations from "../../../localization/allTranslations";
import { getFontFamily } from "../../../theme/theme-manager/Text";
import {
  ImportWalletCamera as ImportWalletCameraIcon,
  ImportWalletEdit as ImportWalletEditIcon,
  HeaderAccept as HeaderAcceptIcon,
  CommonArrowRight as CommonArrowRightIcon
} from "../../../assets/icons";
import { getWalletsList } from "../../../helpers/walletsList";


class WalletControl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wallet: {},

      walletName: "",
      walletImage: "",

      walletKey: props?.route?.params?.key,

      isOpenModalLoading: false
    };

    this.refTextInputName = React.createRef();
  }

  componentDidMount = () => {
    this.initState();
  };
  initState = () => {
    const wallet = (this.props.global.walletsList || {})?.[this.state.walletKey] || {};

    this.setState({
      wallet,

      walletName: wallet?.label,
      walletImage: wallet?.image,
    })
  }

  setWalletImage = async (image) => {
    this.setState({
      walletImage: image
    })
  }

  saveWallet = async () => {
    this.setState({ isOpenModalLoading: true });

    const {
      wallet,
      walletsList
    } = await getWalletsList({
      walletName: this.state.walletKey,
      walletImage: this.state.walletImage,
      walletLabel: this.state.walletName
    })

    await this.props.updateWallet(wallet);
    await this.props.updateWalletsList(walletsList);

    Notification.send({
      title: allTranslations(localization.walletControl.successWalletSaveTitle),
      message: allTranslations(localization.walletControl.successWalletSaveMessage),
      type: "success"
    });

    this.setState({ isOpenModalLoading: false });
  }

  showMnemonic = () => {
    this.props.navigation.navigate("WalletSecretPhrase", {
      wallet: this.state.wallet
    });
  }

  // Помощьники по страницы
  _focusFormName = () => {
    this.refTextInputName.current?.focus();
  }
  _renderHeaderRight = () => {
    return (
      <TouchableOpacity style={styles.headerRight} onPress={this.saveWallet}>
        <HeaderAcceptIcon/>
      </TouchableOpacity>
    )
  }

  render() {
    const {
      walletName,
      walletImage,

      isOpenModalLoading
    } = this.state;


    return (
      <View style={styles.root}>
        <Header title={allTranslations(localization.walletControl.header)} rightContent={this._renderHeaderRight}/>

        <ScrollView contentContainerStyle={styles.scrollView}>

          <TouchableOpacity style={styles.section} onPress={this._focusFormName} activeOpacity={1}>
            <Text style={styles.formLabel}>{allTranslations(localization.importWalletForm.form.nameLabel)}</Text>
            <TextInput
              ref={this.refTextInputName}
              value={walletName}
              style={[styles.formInput, styles.formInputName]}
              placeholder={allTranslations(localization.importWalletForm.form.namePlaceholder)}

              onChangeText={(walletName) => this.setState({walletName})}
            />
          </TouchableOpacity>

          <ImagePicker onChange={this.setWalletImage}>
            <View style={[ styles.section, {marginTop: 12}]}>
              <View style={styles.imagePicker}>
                <View style={styles.imagePickerIcon}>
                  {Boolean(!walletImage) ? (
                    <ImportWalletCameraIcon/>
                  ):(
                    <Image
                      source={{uri: walletImage}}
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

          <View style={{ marginTop: 36 }}>

            <Text style={styles.titleBackupOptions}>{allTranslations(localization.walletControl.backupOptions.title)}</Text>

            <TouchableOpacity style={styles.buttonBackupOptions} activeOpacity={0.6} onPress={() => this.showMnemonic(false)}>
              <Text style={styles.buttonBackupOptionsLabel}>
                {allTranslations(localization.walletControl.backupOptions.labelSecretPhrase)}
              </Text>
              <CommonArrowRightIcon color="#8E8E8E"/>
            </TouchableOpacity>

            <Text style={styles.captionBackupOptions}>{allTranslations(localization.walletControl.backupOptions.caption)}</Text>

          </View>

        </ScrollView>

        <ModalLoading
          open={isOpenModalLoading}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F2F2F6",
  },
  scrollView: {
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

  headerRight: {
    width: 32,
    height: 32
  },

  titleBackupOptions: {
    fontSize: 16,
    lineHeight: 19,
    color: "#8E8E8E",

    marginLeft: 16
  },
  captionBackupOptions: {
    fontSize: 14,
    lineHeight: 23,
    textAlign: "center",
    color: "#8E8E8E",
    marginTop: 16
  },

  buttonBackupOptions: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 16
  },
  buttonBackupOptionsLabel: {
    flex: 1,
    fontSize: 16,
    lineHeight: 19,
    color: "#282828"
  }
});

export default WalletControl;
