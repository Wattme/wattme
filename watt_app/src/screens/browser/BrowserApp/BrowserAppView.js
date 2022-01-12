import React, { Component } from "react";
import {
  View,
  StyleSheet,
} from "react-native/index";
import {
  Text,
} from "react-native-ui-lib";
import {
  Header as HeaderComponent,
  Browser as BrowserComponent,
} from "./components";
import { ethers } from "ethers";
import WalletConnect from "@walletconnect/client";
import Clipboard from "@react-native-clipboard/clipboard";
import Notification from "../../../common/Notification";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import { ModalNetworks, WalletConnectPayload } from "../../../components";
import currency from "../../../constants/currency";
import settings from "../../../constants/settings";
import {
  walletConnectGetTx,
  walletConnectSignMessage,
  walletConnectSignTypedData,
} from "../../../utils/walletconnect/WalletConnect";
import { updateFavorites, walletConnectFavoriteItem } from "../../../state/WalletConnectHomeState";

class BrowserApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      networks: [],

      network: props?.route?.params?.network,
      webViewUri: props?.route?.params?.webViewUri,

      walletConnector: null,
      walletConnectPayload: {},

      isOpenModalLoading: false,
      isResetLocalStorage: true,
      isHideSelectNetwork: true,
    };

    this.refWebView = React.createRef();
    this.refModalNetworks = React.createRef();
    this.refWalletConnectPayload = React.createRef();
  }

  componentDidMount = async () => {
    await this.resetLocalStorageWebView();

    await this.initNetworks();
    await this.createConnection();
  };
  componentDidUpdate = async ( prevProps ) => {
    const currentSchemeUrl = this.props?.route?.params?.schemeUrl;
    const previousSchemeUrl = prevProps?.route?.params?.schemeUrl;

    if ( currentSchemeUrl && currentSchemeUrl !== previousSchemeUrl ) {
      await this.createConnection();
    }
  }
  componentWillUnmount = () => {
    (async () => {
      await this.walletConnectCloseSession();
    })();
  }

  initNetworks = async () => {
    const { currencyInfo } = this.props.walletConnect;
    const { webViewUri } = this.state;

    const dapp = (currencyInfo || []).find((t) => t.url === webViewUri) || {};
    const networks = (dapp?.networks || [])
      .map((networkCode) => {
        if (networkCode === "ETH") {
          return { code: "ETH", name: "Ethereum", chainId: 1 };
        }
        if (networkCode === "BSC") {
          return { code: "BNB", name: "Binance", chainId: 56 };
        }
        if (networkCode === "Polygon") {
          return { code: "POLYGON", name: "Polygon", chainId: 137 };
        }
      })
      .filter((t) => !!t);

    this.setState({ networks });
  };

  createConnection = async () => {
    const schemeUrl = this.props?.route?.params?.schemeUrl;

    if (!schemeUrl || schemeUrl.indexOf("bridge") === -1) {
      return null
    }

    const chainId = (this.state?.networks || []).find((t) => t.code === this.state.network)?.chainId;
    const walletConnector = new WalletConnect({
      uri: schemeUrl,
      clientMeta: settings.walletConnectClientMeta
    });
    await walletConnector.createSession({ chainId: chainId });

    await this.setState({ walletConnector });

    await this.subscribeEventsWalletConnect();
  };

  changeNetwork = async (network) => {
    this.setState({ network });
    this.refModalNetworks.current?.close();

    await this.walletConnectChangeSession();
  };

  _routeGoBack = () => {
    this.props.navigation.goBack();
  };
  _addLinkToFavorites = () => {
    const { webViewUri } = this.state;
    const { favorites } = this.props?.walletConnect;

    let newFavorites = [...favorites];

    if (Boolean((favorites || []).find((t) => t.uri === webViewUri))) {
      newFavorites.splice((favorites || []).findIndex((t) => t.uri === webViewUri), 1);
    } else {
      let newFavorite = {...walletConnectFavoriteItem};
      newFavorite.uri = webViewUri;

      newFavorites.push(newFavorite);
    }

    this.props.updateFavorites(newFavorites);
  };
  _refreshPage = async () => {
    this.refWebView.current?.injectJavaScript(`(function(){window.localStorage.clear(); location.reload();})();`);
    this.refWebView.current?.clearCache();
    this.refWebView.current?.clearFormData();
    this.refWebView.current?.clearHistory();
    this.refWebView.current?.reload();

    await this.initNetworks();
  };
  _copyLink = async () => {
    await Clipboard.setString(this.state.webViewUri);

    Notification.send({
      message: allTranslations(localization.browserApp.notifications.addressCopySuccess),
      type: "success",
    });
  };
  _openChangeNetwork = () => {
    this.refModalNetworks.current?.open();
  };


  // Wallet Connect
  subscribeEventsWalletConnect = async () => {
    const walletConnector = this.state.walletConnector;
    const self = this;
    walletConnector.on("session_request", (error, payload) => {
      self.setState({ walletConnectPayload: payload });
      self.refWalletConnectPayload.current?.open();
    });
    walletConnector.on("call_request", (error, payload) => {
      self.setState({ walletConnectPayload: payload });
      self.refWalletConnectPayload.current?.open();
    });
  }
  walletConnectOnSuccess = async ({ isVerification }) => {
    const { walletConnectPayload } = this.state;
    const { method } = walletConnectPayload;

    if (method === "session_request") {
      await this.walletConnectApproveSession();
    }
    if (method === "eth_sendTransaction") {
      await this.walletConnectEthSendTransaction({ isVerification: isVerification || false });
    }
    if (method === "personal_sign") {
      await this.walletConnectPersonalSign();
    }
    if (method === "eth_signTypedData") {
      await this.walletConnectEthSignTypedData();
    }
  };
  walletConnectOnClose = async () => {
    const { walletConnectPayload } = this.state;
    const { method } = walletConnectPayload;

    if (method === "session_request") {
      await this.walletConnectRejectSession();
    }
  };
  walletConnectCloseSession = async () => {
    const { walletConnector } = this.state;

    if (!walletConnector) {
      return null
    }

    await walletConnector.killSession();
  }

  resetLocalStorageWebView = async () => {
    if (!this.state.isResetLocalStorage) {
      return "";
    }
    this.setState({ isResetLocalStorage: false });
    this.refWebView.current?.injectJavaScript(`(function(){window.localStorage.clear(); location.reload();})();`);
  };

  walletConnectApproveSession = async () => {
    const { wallet } = this.props.global;
    const { networks, network, walletConnector } = this.state;
    const address = (wallet?.list || []).find((t) => t.code === network).address;
    const chainId = networks.find(t => t.code === network).chainId;

    await walletConnector.approveSession({
      chainId,
      accounts: [address]
    });

    await this.setState({
      walletConnector,
    });

    this._modalWalletConnectPayloadClose();
  };
  walletConnectRejectSession = async () => {
    const { walletConnector } = this.state;

    await walletConnector.rejectSession();

    await this.setState({
      walletConnector,
    });
  };
  walletConnectChangeSession = async () => {
    const { wallet } = this.props.global;
    const { networks, network, walletConnector } = this.state;

    if (!walletConnector) {
      return null;
    }

    const address = (wallet?.list || []).find((t) => t.code === network)?.address;
    const chainId = networks.find(t => t.code === network)?.chainId;

    await walletConnector.updateSession({ chainId: chainId, accounts: [address] });

    await this.setState({ walletConnector });
  };
  walletConnectEthSendTransaction = async ({ isVerification }) => {
    this._modalWalletConnectPayloadClose();

    // if (!isVerification) {
    //   this.setState({ isShowModalApplicationLock: true });
    //
    //   return null;
    // }

    await this.setState({
      isShowModalApplicationLock: false,
      isOpenModalLoading: true,
    });

    // TODO убрать лаг при создании транзакции, пока он есть, это нужно что бы для пользователя не
    // TODO выклядело что приложение умерло
    await setTimeout(() => {
    }, 500);

    const { networks, network: networkCode, walletConnector, walletConnectPayload } = this.state;
    const { wallet } = this.props.global;

    const transaction = walletConnectPayload?.params?.[0] || {};
    const network = networks.find((t) => t.code === networkCode);
    const walletItem = (wallet?.list || []).find((wallet) => wallet.code === networkCode);
    // const walletSignature = wallet?.mnemonic || wallet?.privateKey || "";
    // const walletSignatureType = 'mnemonic' || 'privateKey' || "";
    const walletSignature = walletItem?.privateKey || walletItem?.mnemonic;
    const walletSignatureType = (walletItem?.privateKey) ? "privateKey" : "mnemonic";

    if (!walletSignature) {
      this.setState({ isOpenModalLoading: false });

      return null;
    }

    const responseTxTransaction = await walletConnectGetTx({
      transaction: transaction,
      signature: walletSignature,
      signatureType: walletSignatureType,
      chainId: network.chainId,
      provider: network.provider,
    });
    if (responseTxTransaction.error) {
      this.setState({ isOpenModalLoading: false });

      Notification.send({
        message: allTranslations(localization.errorWalletApi[responseTxTransaction.error]) || responseTxTransaction.error,
        type: "danger",
      });

      return null;
    }

    await walletConnector.approveRequest({
      id: walletConnectPayload.id,
      result: responseTxTransaction.hash,
    });

    this.setState({ isOpenModalLoading: false });
  };
  walletConnectPersonalSign = async () => {
    this._modalWalletConnectPayloadClose();
    this.setState({ isOpenModalLoading: true });

    const { network: networkCode, walletConnector, walletConnectPayload } = this.state;
    const { wallet } = this.props.global;
    const walletInfo = (wallet?.list || []).find((wallet) => wallet.code === networkCode);
    const message = Boolean(ethers.utils.isHexString(walletConnectPayload?.params[0])) ? ethers.utils.arrayify(walletConnectPayload?.params[0]) : walletConnectPayload?.params[0];
    const walletSignature = walletInfo?.mnemonic || walletInfo?.privateKey || "";
    const walletSignatureType = "mnemonic" || "privateKey" || "";

    const responseSigned = await walletConnectSignMessage({
      message,
      signature: walletSignature,
      signatureType: walletSignatureType,
    });

    await walletConnector.approveRequest({
      id: walletConnectPayload.id,
      result: responseSigned,
    });

    this.setState({ isOpenModalLoading: false });
  };
  walletConnectEthSignTypedData = async () => {
    this._modalWalletConnectPayloadClose();
    this.setState({ isOpenModalLoading: true });

    const { network: networkCode, walletConnector, walletConnectPayload } = this.state;
    const { wallet } = this.props.global;
    const walletInfo = (wallet?.list || []).find((wallet) => wallet.code === networkCode);
    const dataToSign = walletConnectPayload.params[1];
    const walletSignature = walletInfo?.mnemonic || walletInfo?.privateKey || "";
    const walletSignatureType = "mnemonic" || "privateKey" || "";

    const response = await walletConnectSignTypedData({
      dataToSign,
      signature: walletSignature,
      signatureType: walletSignatureType,
    });

    await walletConnector.approveRequest({
      id: walletConnectPayload.id,
      result: response,
    });

    this.setState({ isOpenModalLoading: false });
  };

  _modalWalletConnectPayloadClose = () => {
    this.refWalletConnectPayload.current?.close({ isDisabled: true });
  };

  // ------------------------------------------------------------------------

  render() {
    const {
      networks,

      network,
      webViewUri,


      walletConnectPayload
    } = this.state;
    const {
      favorites
    } = this.props?.walletConnect

    return (
      <View style={styles.root}>

        <HeaderComponent
          link={webViewUri}
          network={network}
          isFavorite={Boolean((favorites || []).find((t) => t.uri === webViewUri))}

          onCopyLink={this._copyLink}
          onRouteGoBack={this._routeGoBack}
          onRefreshPage={this._refreshPage}
          onAddLinkToFavorites={this._addLinkToFavorites}
          onOpenChangeNetwork={this._openChangeNetwork}
        />

        <BrowserComponent
          innerRef={this.refWebView}

          link={webViewUri}
        />

        <ModalNetworks
          innerRef={this.refModalNetworks}
          network={network}
          networks={networks}
          onChange={this.changeNetwork}
        />

        <WalletConnectPayload
          innerRef={this.refWalletConnectPayload}
          payload={walletConnectPayload}
          onSuccess={this.walletConnectOnSuccess}
          onClose={this.walletConnectOnClose}
          networks={networks}
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
});

export default BrowserApp;
