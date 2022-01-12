import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  CommonEdit as CommonEditIcon,
  CommonCopy as CommonCopyIcon
} from "../../../../../assets/icons";
import { getFontFamily } from "../../../../../theme/theme-manager/Text";
import { checkAddressContract } from "../../../../../utils/addresses/checkAddressContract";
import Clipboard from "@react-native-clipboard/clipboard";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import Notification from "../../../../../common/Notification";

class WalletAddress extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      wallet: "",

      isDisabled: false
    };
  }

  initWallet = (walletInit) => {
    this.setState({
      wallet: walletInit,
      isDisabled: Boolean(walletInit)
    })
  }

  changeWallet = (wallet) => {
    this.setState({ wallet });
  }

  setWallet = () => {

    const isValidAddress = checkAddressContract(this.state.wallet)

    if (!isValidAddress) {
      Notification.send({
        type: "danger",
        message: allTranslations(localization.accountBackOffice.walletAddress.errorValidAddress),
      });

      return null
    }

    this.props.onSetup(this.state.wallet);

  }

  copyAddress = async () => {
    await Clipboard.setString(this.state.wallet);

    Notification.send({
      type: "success",
      message: allTranslations(localization.accountBackOffice.walletAddress.successCopyWalletAddress)
    })
  }

  render() {
    const {
      wallet,
      isDisabled
    } = this.state;

    return (
      <View style={styles.root}>

        <Text style={styles.label}>
          { allTranslations(localization.accountBackOffice.walletAddress.label) }
        </Text>

        <View style={styles.controls}>

          <TextInput
            editable={!isDisabled}

            value={wallet}
            style={styles.input}
            placeholder={allTranslations(localization.accountBackOffice.walletAddress.addressPlaceholder)}

            onChangeText={(wallet) => this.changeWallet(wallet)}
          />

          <TouchableOpacity style={styles.button} onPress={async () => {
            if (isDisabled) {
              await this.copyAddress();

              return null
            }

            this.setWallet();
          }}>
            {Boolean(isDisabled) ? (
              <CommonCopyIcon color="#8E8E8E"/>
            ) : (
              <CommonEditIcon color="#8E8E8E"/>
            )}
          </TouchableOpacity>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",

    backgroundColor: "white",

    padding: 16
  },

  label: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E",
    marginBottom: 8
  },

  controls: {
    flexDirection: "row"
  },

  input: {
    fontFamily: getFontFamily("normal"),
    fontSize: 14,
    color: "#282828",
    height: 48,
    paddingHorizontal: 16,
    paddingVertical: 0,
    backgroundColor: "#F7F7F7",
    flex: 1,
    borderRadius: 14
  },

  button: {
    width: 48,
    height: 48,
    marginLeft: 12,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F7F7F7",
  }
});

export default WalletAddress
