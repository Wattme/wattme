import React from "react";
import {
  View,
  StyleSheet,
  ScrollView
} from "react-native/index";
import {
  Button
} from "react-native-ui-lib";
import {
  Header,
  HeaderMini,
  ModalLoading
} from "../../../components";
import {
  StepInformation as StepInformationComponent,
  StepGetMnemonic as StepGetMnemonicComponent,
  StepVerifyRecoveryPhrase as StepVerifyRecoveryPhraseComponent,
  StepWalletInformation as StepWalletInformationComponent
} from "./components";
import {
  generateMnemonic
} from "../../../utils/mnemonic/mnemonic";
import Notification from "../../../common/Notification";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import { getWallets } from "../../../utils/wallet-import/getWallets";
import { getWalletsList } from "../../../helpers/walletsList";
import EStyleSheet from "react-native-extended-stylesheet";

class WalletCreate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      walletForm: {
        label: "",
        image: "",
      },

      mnemonic: "",

      step: 1,

      isAcceptBackup: false,
      isModalLoading: false,
      isCorrectWordOrder: false
    };
  }

  nextStep = async () => {
    const newStep = this.state.step + 1;

    if (newStep === 5) {
      await this.createWallet();
      return null
    }

    await this.setState({
      step: newStep
    });

    // Генерируем MNEMONIC
    if ( newStep === 2 ) {
      await this.generateMnemonic();
    }
  }
  prevStep = async () => {}

  generateMnemonic = async () => {
    const mnemonic = await generateMnemonic();

    this.setState({
      mnemonic
    })
  }

  createWallet = async () => {
    await this.setState({ isModalLoading: true });

    const { walletForm } = this.state;
    const walletList = await getWallets({
      type: "phrase",
      currency: "MULTI",
      formValue: this.state.mnemonic
    });
    let {
      wallet,
      walletsList
    } = await getWalletsList({
      walletList: walletList,
      walletLabel: walletForm.label,
      walletImage: walletForm.image,
      walletType: "MULTI",
      walletCategory: "MULTI"
    });

    this.props.updateWallet(wallet);
    this.props.updateWalletsList(walletsList);

    await this.setState({ isModalLoading: false });

    Notification.send({
      type: "success",
      message: allTranslations(localization.walletCreate.notifications.successCreate.message)
    });

    this.props.navigation.navigate("WalletDashboard");
  }

  changeWalletForm = (walletForm) => {
    this.setState({ walletForm })
  }

  _isValid = () => {
    const { step, isAcceptBackup, isCorrectWordOrder, walletForm } = this.state;

    // Если шаг меньше 3 то валидацию фразы пока не надо
    if (step < 3) {
      return isAcceptBackup
    }
    if (step < 4) {
      return Boolean(isAcceptBackup && isCorrectWordOrder)
    }

    return Boolean(walletForm.label)
  }

  _renderHeader = () => {
    const { step } = this.state;

    if (step === 4) {
      return (
        <Header
          title={allTranslations(localization.importWalletCoin.labelMultiVWallet)}
        />
      )
    }

    return (
      <HeaderMini
        hideTitle={Boolean(step !== 1)}
        fullGoBack
      />
    )
  }

  render() {
    const {
      mnemonic,
      walletForm,

      step,

      isAcceptBackup,
      isModalLoading,
      isCorrectWordOrder
    } = this.state;

    return (
      <View style={[
        styles.root,
        Boolean(step === 4) && {backgroundColor: "#F2F2F6"}
      ]}>

        {this._renderHeader()}

        <ScrollView style={{flexGrow: 1}} contentContainerStyle={{flexGrow: 1}}>
          <View style={[styles.container]}>
            {Boolean(step === 1) && (
              <StepInformationComponent isAcceptBackup={isAcceptBackup} onChange={(isAcceptBackup) => this.setState({ isAcceptBackup })} />
            )}
            {Boolean(step === 2) && (
              <StepGetMnemonicComponent mnemonic={mnemonic} />
            )}
            {Boolean(step === 3) && (
              <StepVerifyRecoveryPhraseComponent
                mnemonic={mnemonic}
                isCorrectWordOrder={isCorrectWordOrder}
                onChangeStatus={(isCorrectWordOrder) => this.setState({isCorrectWordOrder})}
              />
            )}
            {Boolean(step === 4) && (
              <StepWalletInformationComponent
                walletForm={walletForm}
                onChange={this.changeWalletForm}
              />
            )}
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            disabled={!this._isValid()}
            label={allTranslations(localization.walletCreate.nextStep)}

            onPress={this.nextStep}
          />
        </View>

        <ModalLoading
          open={isModalLoading}
        />

      </View>
    );
  }
}

const styles = EStyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },

  container: {
    flex: 1
  },

  footer: {
    marginTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 12,

    "@media (min-width: 400)": {
      marginTop: 32,
      paddingBottom: 20,
    }
  },
});

export default WalletCreate
