import React, { Component } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  Header,
  ModalCamera,
  BlockInformation
} from "../../../components";
import {
  HeaderAccept as HeaderAcceptIcon,
  CommonQrCode as CommonQrCodeIcon,
  CommonArrowRight as CommonArrowRightIcon,
} from "../../../assets/icons";
import Notification from "../../../common/Notification";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import networks from "../../../constants/networks";
import { createCustomToken } from "./utils/createCustomToken";
import logSend from "../../../agent/logger";
import { getWalletsList } from "../../../helpers/walletsList";
import Clipboard from "@react-native-clipboard/clipboard";
import queryString from "querystring";


class WalletCreateCustomCoin extends Component {
  constructor(props) {
    super(props);

    this.state = {

      addressContract: "",
      nameContract: "",
      symbolContract: "",
      decimalsContract: "",

      network: "",

      isOpenCamera: false,
      showError: false
    };
  }

  componentDidMount = () => {
    this.setRouteParams();
    this.props.navigation.addListener("focus", () => {
      this.setRouteParams();
    });
  };
  setRouteParams = () => {
    const network = this.props?.route?.params?.network;

    this.setState({
      network: network || this.state.network
    })
  }

  onCreateCustomToken = async () => {
    const {
      network,

      nameContract,
      symbolContract,
      addressContract,
      decimalsContract,
    } = this.state;

    if (!network || !nameContract || !symbolContract || !addressContract || !decimalsContract) {
      this.setState({ showError: true });
      return null
    }
    this.setState({ showError: false });

    const {
      wallet
    } = this.props.global;

    const coin = (wallet?.list || []).find((t) => t.code === network);
    const token = createCustomToken({
      name: nameContract,
      network: network,
      code: symbolContract,
      contract: addressContract,
      address: coin?.address,
      privateKey: coin?.privateKey,
      mnemonic: coin?.mnemonic
    });

    if (!token) {
      logSend({
        title: "WalletCreateCustomCoin",
        method: "onCreateCustomToken",
        message: "Ошибка создания кастомного токена (токен не смог создаться)",
        coinCode: coin?.code,
        coinAddress: coin?.address,

        error: true
      });

      Notification.send({
        message: allTranslations(localization.walletCreateCustomCoin.errorCreateToken),
        type: "danger"
      })

      return null
    }

    let { walletsList, wallet: newWallet } = await getWalletsList({
      walletName: wallet.key,
      walletList: [...wallet.list, token]
    });

    this.props.updateWallet(newWallet);
    this.props.updateWalletsList(walletsList);

    Notification.send({
      message: allTranslations(localization.walletCreateCustomCoin.successCreateToken),
      type: "success"
    })
  }

  _renderHeaderRightContent = () => {
    return (
      <TouchableOpacity onPress={this.onCreateCustomToken} activeOpacity={0.6}>
        <HeaderAcceptIcon/>
      </TouchableOpacity>
    )
  }
  _networkLabel = () => {
    const network = this.state?.network || "";

    if (!network) {
      return allTranslations(localization.walletCreateCustomCoin.chooseNetwork);
    }

    const allNetworks = Object.keys(networks || {})
      .map((key) => {
        return networks[key]
      })
      .filter((t) => !t.isNotSelect);

    return allNetworks.find((t) => t.code === network)?.name;
  }
  _pastAddress = async () => {
    const addressContract = await Clipboard.getString();

    this.setState({
      addressContract
    })
  }
  _errorMessage = () => {
    const {
      network,

      nameContract,
      symbolContract,
      addressContract,
      decimalsContract,
    } = this.state;

    let message = [];

    if (!network) {
      message.push(allTranslations(localization.walletCreateCustomCoin.error.network))
    }
    if (!addressContract) {
      message.push(allTranslations(localization.walletCreateCustomCoin.error.addressContract))
    }
    if (!nameContract) {
      message.push(allTranslations(localization.walletCreateCustomCoin.error.nameContract))
    }
    if (!symbolContract) {
      message.push(allTranslations(localization.walletCreateCustomCoin.error.symbolContract))
    }
    if (!decimalsContract) {
      message.push(allTranslations(localization.walletCreateCustomCoin.error.decimalsContract))
    }

    return message.join('\n\n')
  }
  _barCodeRead = async (data) => {
    const addressContract = data?.data;

    this.setState({
      addressContract,
      isOpenCamera: false
    })
  }

  _routeSelectNetwork = () => {
    this.props.navigation.navigate("Networks", {
      initNetwork: this.state.network,
      backPath: "WalletCreateCustomCoin"
    })
  }

  render() {
    const {
      addressContract,
      nameContract,
      symbolContract,
      decimalsContract,

      isOpenCamera,
      showError
    } = this.state;

    return (
      <View style={styles.root}>

        <Header
          title={allTranslations(localization.walletCreateCustomCoin.headerTitle)}
          rightContent={this._renderHeaderRightContent}
        />

        <ScrollView contentContainerStyle={styles.scrollView}>

          <TouchableOpacity style={styles.buttonSelect} onPress={this._routeSelectNetwork} activeOpacity={0.6}>
            <Text style={styles.buttonSelectTitle}>
              { allTranslations(localization.walletCreateCustomCoin.network) }
            </Text>
            <View style={styles.buttonSelectContent}>
              <View style={styles.networkSelect}>
                <Text style={styles.networkSelectLabel}>
                  { this._networkLabel() }
                </Text>
                <CommonArrowRightIcon color="#8E8E8E"/>
              </View>
            </View>
          </TouchableOpacity>

          <View style={{marginTop: 12}}/>

          <Text style={styles.caption}>
            { allTranslations(localization.walletCreateCustomCoin.addressContract) }
          </Text>

          <View style={styles.inputAddressContainer}>
            <TextInput
              value={addressContract}
              style={styles.inputAddressInput}
              placeholder={allTranslations(localization.common.address)}
              placeholderTextColor="#8E8E8E"

              onChangeText={(addressContract) => this.setState({addressContract})}
            />
            <View style={styles.inputAddressControls}>
              <TouchableOpacity
                style={styles.inputAddressControl}
                onPress={this._pastAddress}
              >
                <Text style={styles.inputAddressControlLabel}>{ allTranslations(localization.walletCoinSend.buttonPast) }</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.inputAddressControl}
                onPress={() => this.setState({isOpenCamera: true})}
              >
                <CommonQrCodeIcon/>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.sectionInfo}>
            <TextInput
              value={nameContract}
              placeholder={allTranslations(localization.common.name)}
              placeholderTextColor="#8E8E8E"
              style={styles.sectionInfoInput}

              onChangeText={(nameContract) => this.setState({ nameContract })}
            />
            <View style={styles.sectionInfoSeparate}/>
            <TextInput
              value={symbolContract}
              placeholder={allTranslations(localization.common.symbol)}
              placeholderTextColor="#8E8E8E"
              style={styles.sectionInfoInput}

              onChangeText={(symbolContract) => this.setState({ symbolContract })}
            />
            <View style={styles.sectionInfoSeparate}/>
            <TextInput
              value={decimalsContract}
              placeholder={allTranslations(localization.common.decimals)}
              placeholderTextColor="#8E8E8E"
              style={styles.sectionInfoInput}
              keyboardType="decimal-pad"

              onChangeText={(decimalsContract) => this.setState({ decimalsContract })}
            />
          </View>

          {Boolean(showError && this._errorMessage()) && (
            <View style={{marginTop: 12}}>
              <BlockInformation
                message={this._errorMessage()}
              />
            </View>
          )}

        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.buttonHowMyToken}>
            <Text style={styles.buttonHowMyTokenLabel}>
              { allTranslations(localization.walletCreateCustomCoin.whatYourToken) }
            </Text>
          </TouchableOpacity>
        </View>

        <ModalCamera
          open={isOpenCamera}
          onClose={() => this.setState({isOpenCamera: false})}
          onBarCodeRead={this._barCodeRead}
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

  caption: {
    fontSize: 13,
    lineHeight: 16,
    color: "#8E8E8E",
    marginLeft: 16,
    marginBottom: 8
  },

  buttonSelect: {
    height: 52,
    backgroundColor: "white",
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center"
  },
  buttonSelectTitle: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828",
    fontWeight: "500",
    flex: 1,
  },
  buttonSelectContent: {},

  networkSelect: {
    flexDirection: "row",
    alignItems: "center"
  },
  networkSelectLabel: {
    fontSize: 16,
    lineHeight: 19,
    color: "#8E8E8E",
    textAlign: "right",
    marginRight: 12
  },


  inputAddressContainer: {
    height: 52,
    backgroundColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,

    flexDirection: "row",
    alignItems: "center",
  },
  inputAddressInput: {
    fontSize: 16,
    lineHeight: 19,
    paddingHorizontal: 16,
    paddingVertical: 0,
    flex: 1
  },
  inputAddressControls: {
    flexDirection: "row",
    alignItems: "center",

    marginLeft: -16,
    marginRight: 16
  },
  inputAddressControl: {
    height: 32,
    alignItems: "center",
    justifyContent: "center",

    marginLeft: 16
  },
  inputAddressControlLabel: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828"
  },

  sectionInfo: {
    backgroundColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,
    padding: 16,
    marginTop: 12
  },
  sectionInfoInput: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828",
    paddingVertical: 0,
    height: 36,
  },
  sectionInfoSeparate: {
    height: 2,
    width: "100%",
    backgroundColor: "#F9F9F9",
    marginVertical: 15
  },

  footer: {
    padding: 12
  },

  buttonHowMyToken: {
    height: 52,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonHowMyTokenLabel: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#282828"
  },
});

export default WalletCreateCustomCoin;
