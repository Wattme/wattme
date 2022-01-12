import React from "react";
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native/index";
import {
  Text,
  Button
} from "react-native-ui-lib";
import {
  Header,
  ImagePicker,
  ModalLoading
} from "../../../components";
import {
  ImportWalletCamera as ImportWalletCameraIcon,
  ImportWalletEdit as ImportWalletEditIcon
} from "../../../assets/icons";
import {
  WalletPhrase as WalletPhraseComponent,
  DialogErrorImportWallet as DialogErrorImportWalletComponent
} from "./components";
import Notification from "../../../common/Notification";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import { getFontFamily } from "../../../theme/theme-manager/Text";
import {getWallets} from "../../../utils/wallet-import/getWallets";
import { isValidImport } from "../../../utils/wallet-import/validation";
import { getWalletsList } from "../../../helpers/walletsList";
import { getBalanceMain } from "../../../sheduler/balance";

class ImportWalletForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      label: props?.route?.params?.label || '',
      code: props?.route?.params?.code || '',

      activeTab: "phrase",

      walletName: "",
      walletImage: "",
      walletPhrase: "",

      provisionalAddress: "",

      isImportProcess: false
    };

    this.refTextInputName = React.createRef();
    this.refDialogErrorImportWallet = React.createRef();
    this.timeoutProvisionalAddress = null;
  }

  setWalletImage = async (walletImage) => {
    this.setState({ walletImage });
  }

  changeWalletPhrase = async (walletPhrase = "") => {
    clearTimeout(this.timeoutProvisionalAddress);

    this.setState({
      walletPhrase: (walletPhrase || "").toLowerCase()
    });

    this.timeoutProvisionalAddress = setTimeout(async () => {
      await this.getProvisionalAddress();
    }, 1000);
  }
  changeActiveTab = (activeTab) => {
    this.setState({
      activeTab,
      walletPhrase: "",
      provisionalAddress: ""
    })
  }
  walletImport = async ({skipError} = {}) => {
    const {
      code,

      walletName,
      walletImage,
      walletPhrase,
      activeTab
    } = this.state;

    // Валидация на коректность заполнения данных
    const isValidForm = this._isValidForm();
    if (!isValidForm) {
      Notification.send({
        message: allTranslations(),
        type: 'danger'
      })

      return null
    }

    // Валидация что адрес или мнемоническая фраза введена корректно
    const isValidValue = await this._isValidWalletPhrase();
    if (!isValidValue && !skipError) {
      this.refDialogErrorImportWallet.current?.open();

      return null
    }

    await this.setState({ isImportProcess: true });

    // Получение адресов кошелька
    const walletList = await getWallets({
      type: activeTab,
      currency: code,
      formValue: walletPhrase
    });

    // Получение всех кошельков приложения с новым кошельком
    let { walletsList, wallet } = await getWalletsList({
      walletList,
      walletLabel: walletName,
      walletImage: walletImage,

      walletType: Boolean(code === "MULTI") ? "MULTI" : "SINGLE",
      walletCategory: code
    });

    await this.props.updateWallet(wallet);
    await this.props.updateWalletsList(walletsList);

    this.setState({ isImportProcess: false });

    Notification.send({
      type: "success",
      message: allTranslations(localization.importWalletForm.successWalletImport),
    });

    this.props.navigation.navigate("WalletDashboard");
  }

  getProvisionalAddress = async () => {
    const { activeTab, walletPhrase } = this.state;

    let provisionalAddress = "";

    if (activeTab === "phrase"){
      const walletPhraseLength = (walletPhrase||"").split(" ").length;
      if (walletPhraseLength === 12 || walletPhraseLength === 24) {

      }
    }
    if (activeTab === "address"){
      provisionalAddress = `${walletPhrase.substring(0, 4)}...${walletPhrase.substring(walletPhrase.length - 4, walletPhrase.length)}`;
    }
    if (activeTab === "privateKey"){}

    if (!provisionalAddress) {
      return null
    }

    this.setState({ provisionalAddress });
  }

  // Помощьники по страницы
  _focusFormName = () => {
    this.refTextInputName.current?.focus();
  }
  _isValidForm = () => {
    const {
      activeTab,

      walletName,
      walletPhrase
    } = this.state;

    if (!walletName || !walletPhrase) {
      return false
    }

    // TODO ДОБАВИТЬ ВАЛИДАЦИЮ ДЛЯ ТИПА "АДРЕС"
    if (activeTab === "address") {
      return true
    }

    const countWorlds = (walletPhrase || '').split(' ').length;
    return Boolean(countWorlds === 12 || countWorlds === 24)
  }
  _isValidWalletPhrase = async () => {
    const { walletPhrase, activeTab } = this.state;

    return await isValidImport({ type: activeTab, formValue: walletPhrase })
  }

  render() {
    const {
      code,
      label,

      activeTab,
      walletName,
      walletImage,
      walletPhrase,

      provisionalAddress,

      isImportProcess
    } = this.state;

    return (
      <View style={styles.root}>
        <Header title={label}/>

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
            <View style={[styles.section, {marginTop: 12}]} activeOpacity={1}>
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

          <WalletPhraseComponent
            code={code}
            activeTab={activeTab}
            walletPhrase={walletPhrase}


            onChangeWalletPhrase={this.changeWalletPhrase}
            onChangeActiveTab={this.changeActiveTab}
          />

          {Boolean(provisionalAddress) && (
            <View style={[styles.section, styles.provisionalAddress]}>
              <Text style={styles.provisionalAddressLabel}>
                {allTranslations(localization.importWalletForm.provisionalAddress)}
              </Text>
              <Text style={styles.provisionalAddressValue}>
                {provisionalAddress}
              </Text>
            </View>
          )}

          <View style={{marginTop: 24}}>
            <Button
              disabled={!this._isValidForm()}
              label={allTranslations(localization.importWalletForm.buttonImport)}

              onPress={this.walletImport}
            />
          </View>
        </ScrollView>

        <DialogErrorImportWalletComponent
          innerRef={this.refDialogErrorImportWallet}
          onNext={() => this.walletImport({ skipError: true })}
        />

        <ModalLoading
          open={isImportProcess}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F2F2F6"
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

  buttonPastPhrase: {
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    borderRadius: 14
  },
  buttonPastPhraseLabel: {
    color: "#8E8E8E",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 4
  },

  textCaption: {
    fontSize: 14,
    lineHeight: 17,
    color: "#282828",
    textAlign: "center"
  },

  provisionalAddress: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  provisionalAddressLabel: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E"
  },
  provisionalAddressValue: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828",
    fontWeight: "500"
  },
});

export default ImportWalletForm
