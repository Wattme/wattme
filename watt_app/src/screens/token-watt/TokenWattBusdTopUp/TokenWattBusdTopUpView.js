import React, { Component } from "react";
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity, Linking,
} from "react-native/index";
import {
  Text,
  Button,
} from "react-native-ui-lib";
import {
  BlockInformation,
  Header,
  ModalLoading,

  PopUpInformation,
  PopUpLoadTransaction,
  PopUpSuccessTransaction,
} from "../../../components";
import {
  CommonRevert as CommonRevertIcon,
} from "../../../assets/icons";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import { getIconCurrency } from "../../../common/Images";
import agentWiseWin from "../../../agent/agentWiseWin";
import urls from "../../../constants/urls";
import TextInputMask, {
  mask,
} from "react-native-text-input-mask";
import { getBnbGasTracker } from "../../../utils/network/httpClient";
import { ethers } from "ethers";
import ethConvert from "ether-converter";
import { convertorNumber } from "../../../helpers/convertor";
import Notification from "../../../common/Notification";
import "@ethersproject/shims";
import { _balanceTokenBNB } from "../../../sheduler/balance";

class TokenWattBusdTopUp extends Component {
  constructor(props) {
    super(props);

    const routeParams = props?.route?.params || {};
    this.state = {
      amountFromToken: "",
      amountGetToken: "",

      wattCourse: 0,

      fromToken: routeParams?.from,
      toToken: routeParams?.to,

      isModalLoading: false,
    };

    this.refAmountFromToken = React.createRef();
    this.refAmountGetToken = React.createRef();
    this.refPopUpInformation = React.createRef();
    this.refPopUpLoadTransaction = React.createRef();
    this.refPopUpSuccessTransaction = React.createRef();
  }

  componentDidMount = async () => {
    await this.getInformationBuy();
  };

  // Инициализация страницы
  getInformationBuy = async () => {
    const data = await agentWiseWin.get(urls.getWiseWinWattCourse).then((res) => {
      return res.data;
    }).catch((err) => {
      return 0;
    });

    this.setState({
      wattCourse: data,
    });
  };


  // Создание сделки
  createPreliminaryDeal = async () => {
    const {
      amountFromToken,
      amountGetToken,

      fromToken,
      toToken,
    } = this.state;
    const {
      walletImportInfo
    } = this.props;

    this.setState({ isModalLoading: true });

    const activeWalletCoin = (this.props?.wallet?.list || []).find((t) => t.code === fromToken) || {};

    // Провека на наличии пользовательского кошелька
    if (!activeWalletCoin || Object.keys(activeWalletCoin).length <= 0) {
      this.setState({ isModalLoading: false });

      Notification.send({
        message: allTranslations(localization.tokenWattBusdTopUp.errors.notWallet, {
          code: fromToken
        }),
        type: "danger"
      });

      return null
    }

    // Провека ввода на корректные данные
    if (!amountFromToken || amountFromToken <= 0) {
      this.setState({ isModalLoading: false });

      Notification.send({
        message: allTranslations(localization.tokenWattBusdTopUp.errors.notEnterAmount),
        type: "danger",
      });

      return null;
    }

    // Проверка пользовательского баланса
    if (+activeWalletCoin.indivisibleBalance < +amountFromToken) {
      this.setState({ isModalLoading: false });

      Notification.send({
        message: allTranslations(localization.tokenWattBusdTopUp.errors.insufficientBalance, {
          code: fromToken
        }),
        type: "danger"
      });

      return null
    }

    // Проверка на наличии нужный суммы в пуле
    const contractCheckBalance = Boolean( toToken === "BUSD" ) ? walletImportInfo?.p2pPool?.addressContractBusd : walletImportInfo?.p2pPool?.addressContractWatt;
    const getAmountFromP2pPoll = await _balanceTokenBNB(walletImportInfo?.p2pPool?.addressCheckBalance, contractCheckBalance);
    if (!getAmountFromP2pPoll || +getAmountFromP2pPoll < amountGetToken) {
      this.setState({ isModalLoading: false });

      Notification.send({
        message: allTranslations(localization.tokenWattBusdTopUp.errors.insufficientBalancePoll, {
          code: toToken
        }),
        type: "danger"
      });

      return null
    }

    this.setState({ isModalLoading: false });

    this.refPopUpInformation.current.open({
      title: allTranslations(localization.tokenWattBusdTopUp.popUpConfirm.title),
      message: allTranslations(localization.tokenWattBusdTopUp.popUpConfirm.message, {
        getCode: toToken,
        getAmount: amountGetToken,

        fromCode: fromToken,
        fromAmount: amountFromToken,
        fromAmountCode: fromToken,
      }),
      controls: "confirm",

      onConfirm: this.createDeal.bind(this),
    });
  };
  createDeal = async () => {
    const {
      amountFromToken,
      amountGetToken,

      fromToken,
      toToken,
    } = this.state;
    const {
      walletImportInfo
    } = this.props;

    this.refPopUpInformation.current.close();
    this.refPopUpLoadTransaction.current.open();


    const gasTracker = await getBnbGasTracker();
    // TODO добавить сообщение об ошибке если нет коммиссии

    // Инициализация входных данных
    const ADDRESS_CONTRACT = walletImportInfo?.p2pPool?.addressCheckBalance;
    const ABI_CONTRACT_P2P_POOL = require("../../../assets/abi/abi-p2p-pull.json");
    const GAS_PRICE = ethConvert((gasTracker?.result?.FastGasPrice || "0"), "gwei", "wei");
    const GAS_LIMIT = 100000;
    const USER_COIN = (this.props?.wallet?.list || []).find((t) => t.code === fromToken);
    const AMOUNT_SEND = ethConvert(amountFromToken, "ether", "wei");

    // Инициализация провайдера
    const PROVIDER = await new ethers.providers.JsonRpcProvider(urls.urlRpcBinance, 56);

    // Инициализация кошелька
    const SIGNER = new ethers.Wallet(USER_COIN?.privateKey, PROVIDER);

    const OVERRIDES = {
      gasLimit: GAS_LIMIT,
      gasPrice: GAS_PRICE,
    };

    // Апрув транзакций
    const dataApprove = await this.approveToken({
      signer: SIGNER,
      provider: PROVIDER,
      amount: AMOUNT_SEND,
      overrides: OVERRIDES,
    });
    if (dataApprove.error) {
      this.refPopUpLoadTransaction.current.close();

      Notification.send({
        message: dataApprove.error?.body?.message || allTranslations(localization.errors["internal-error"]),
        type: "danger"
      });

      return null
    }

    // Инициализация контракта
    const CONTRACT = new ethers.Contract(ADDRESS_CONTRACT, ABI_CONTRACT_P2P_POOL, PROVIDER);
    const CONTRACT_CONNECT = CONTRACT.connect(SIGNER);

    let reponseSwapUsdToToken;
    if (fromToken === "BUSD") {
      reponseSwapUsdToToken = await CONTRACT_CONNECT.swapUsdToToken(
        AMOUNT_SEND,
        OVERRIDES,
      ).then((res) => {
        return res;
      }).catch((err) => {
        return { error: err };
      });
    }
    if (fromToken === "WATT") {
      reponseSwapUsdToToken = await CONTRACT_CONNECT.swapTokenToUsd(
        AMOUNT_SEND,
        OVERRIDES,
      ).then((res) => {
        return res;
      }).catch((err) => {
        return { error: err };
      });
    }
    if (reponseSwapUsdToToken.error) {
      this.refPopUpLoadTransaction.current.close();

      Notification.send({
        message: reponseSwapUsdToToken.error?.body?.message || allTranslations(localization.errors["internal-error"]),
        type: "danger"
      });

      return null
    }

    this.refPopUpLoadTransaction.current.close();
    this.refPopUpSuccessTransaction.current.open({
      onConfirm: this._openHashTransaction.bind(this, reponseSwapUsdToToken),
      onCancel: this._navigationGoBack.bind(this)
    });
  };
  approveToken = async ({ provider, signer, amount, overrides }) => {
    const {
      fromToken
    } = this.state;
    const {
      walletImportInfo
    } = this.props;

    const ABI_BUSD_CONTRACT = "[{\"constant\":false,\"inputs\":[],\"name\":\"disregardProposeOwner\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_spender\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"assetProtectionRole\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"totalSupply\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"r\",\"type\":\"bytes32[]\"},{\"name\":\"s\",\"type\":\"bytes32[]\"},{\"name\":\"v\",\"type\":\"uint8[]\"},{\"name\":\"to\",\"type\":\"address[]\"},{\"name\":\"value\",\"type\":\"uint256[]\"},{\"name\":\"fee\",\"type\":\"uint256[]\"},{\"name\":\"seq\",\"type\":\"uint256[]\"},{\"name\":\"deadline\",\"type\":\"uint256[]\"}],\"name\":\"betaDelegatedTransferBatch\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"sig\",\"type\":\"bytes\"},{\"name\":\"to\",\"type\":\"address\"},{\"name\":\"value\",\"type\":\"uint256\"},{\"name\":\"fee\",\"type\":\"uint256\"},{\"name\":\"seq\",\"type\":\"uint256\"},{\"name\":\"deadline\",\"type\":\"uint256\"}],\"name\":\"betaDelegatedTransfer\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_from\",\"type\":\"address\"},{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"initializeDomainSeparator\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"decimals\",\"outputs\":[{\"name\":\"\",\"type\":\"uint8\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"unpause\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_addr\",\"type\":\"address\"}],\"name\":\"unfreeze\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"claimOwnership\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_newSupplyController\",\"type\":\"address\"}],\"name\":\"setSupplyController\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"paused\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_addr\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"initialize\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"pause\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"getOwner\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"target\",\"type\":\"address\"}],\"name\":\"nextSeqOf\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_newAssetProtectionRole\",\"type\":\"address\"}],\"name\":\"setAssetProtectionRole\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_addr\",\"type\":\"address\"}],\"name\":\"freeze\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"name\":\"\",\"type\":\"string\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_newWhitelister\",\"type\":\"address\"}],\"name\":\"setBetaDelegateWhitelister\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"decreaseSupply\",\"outputs\":[{\"name\":\"success\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_addr\",\"type\":\"address\"}],\"name\":\"isWhitelistedBetaDelegate\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_to\",\"type\":\"address\"},{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"transfer\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_addr\",\"type\":\"address\"}],\"name\":\"whitelistBetaDelegate\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_proposedOwner\",\"type\":\"address\"}],\"name\":\"proposeOwner\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_value\",\"type\":\"uint256\"}],\"name\":\"increaseSupply\",\"outputs\":[{\"name\":\"success\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"betaDelegateWhitelister\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"proposedOwner\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_addr\",\"type\":\"address\"}],\"name\":\"unwhitelistBetaDelegate\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_owner\",\"type\":\"address\"},{\"name\":\"_spender\",\"type\":\"address\"}],\"name\":\"allowance\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_addr\",\"type\":\"address\"}],\"name\":\"wipeFrozenAddress\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"EIP712_DOMAIN_HASH\",\"outputs\":[{\"name\":\"\",\"type\":\"bytes32\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_addr\",\"type\":\"address\"}],\"name\":\"isFrozen\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"supplyController\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"reclaimBUSD\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"spender\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"currentOwner\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"proposedOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferProposed\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"oldProposedOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferDisregarded\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"oldOwner\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[],\"name\":\"Pause\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[],\"name\":\"Unpause\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"addr\",\"type\":\"address\"}],\"name\":\"AddressFrozen\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"addr\",\"type\":\"address\"}],\"name\":\"AddressUnfrozen\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"addr\",\"type\":\"address\"}],\"name\":\"FrozenAddressWiped\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"oldAssetProtectionRole\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"newAssetProtectionRole\",\"type\":\"address\"}],\"name\":\"AssetProtectionRoleSet\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"SupplyIncreased\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"from\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"value\",\"type\":\"uint256\"}],\"name\":\"SupplyDecreased\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"oldSupplyController\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"newSupplyController\",\"type\":\"address\"}],\"name\":\"SupplyControllerSet\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"to\",\"type\":\"address\"},{\"indexed\":false,\"name\":\"value\",\"type\":\"uint256\"},{\"indexed\":false,\"name\":\"seq\",\"type\":\"uint256\"},{\"indexed\":false,\"name\":\"fee\",\"type\":\"uint256\"}],\"name\":\"BetaDelegatedTransfer\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"oldWhitelister\",\"type\":\"address\"},{\"indexed\":true,\"name\":\"newWhitelister\",\"type\":\"address\"}],\"name\":\"BetaDelegateWhitelisterSet\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"newDelegate\",\"type\":\"address\"}],\"name\":\"BetaDelegateWhitelisted\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"oldDelegate\",\"type\":\"address\"}],\"name\":\"BetaDelegateUnwhitelisted\",\"type\":\"event\"}]";
    const ABI_WATT_CONTRACT = "[\"function payAltCoin(uint8 _vendor, bytes32 _tradeID, uint256 _value, bytes _sign) external\", \"function approve(address _spender, uint256 _value) public returns (bool success)\"]";
    const ABI_CONTRACT = Boolean(fromToken === "BUSD") ? ABI_BUSD_CONTRACT : ABI_WATT_CONTRACT;

    const ADDRESS_CONTRACT = Boolean(fromToken === "BUSD") ? walletImportInfo?.p2pPool?.addressContractBusd : walletImportInfo?.p2pPool?.addressContractWatt;
    const ADDRESS_APPROVE_CONTRACT = walletImportInfo?.p2pPool?.addressCheckBalance;

    const CONTRACT = new ethers.Contract(ADDRESS_CONTRACT, ABI_CONTRACT, provider);
    const CONTRACT_CONNECT = CONTRACT.connect(signer);

    return await CONTRACT_CONNECT.approve(ADDRESS_APPROVE_CONTRACT, amount, overrides).then((res) => {
      return res;
    }).catch((err) => {
      return { error: err };
    })
  };


  // Логика работы с суммами
  changePair = async () => {
    this.setState({
      fromToken: this.state.toToken,
      toToken: this.state.fromToken,

      amountFromToken: this.state.amountGetToken,
      amountGetToken: this.state.amountFromToken,
    });

    this.refAmountGetToken.current.setNativeProps({ text: this.state.amountFromToken });
    this.refAmountFromToken.current.setNativeProps({ text: this.state.amountGetToken });
  };
  changeAmountFromToken = async (initValue = 0) => {
    const value = await mask("[99999999999999].[999]", initValue, true);

    // Конвертация сумма для получения
    let amountGetToken = 0;
    if (this.state.fromToken === "BUSD") {
      amountGetToken = +value / this.state.wattCourse;
    } else {
      amountGetToken = +value * this.state.wattCourse;
    }
    amountGetToken = Math.floor((amountGetToken) * 1000) / 1000;
    // ---------------------------------

    this.setState({
      amountFromToken: String(value),
      amountGetToken: Boolean(amountGetToken) ? String(amountGetToken) : "",
    });

    this.refAmountFromToken.current.setNativeProps({ text: String(value) });
    this.refAmountGetToken.current.setNativeProps({ text: Boolean(amountGetToken) ? String(amountGetToken) : "" });
  };
  changeAmountGetToken = async (initValue = 0) => {
    const value = await mask("[99999999999999].[999]", initValue, true);

    // Конвертация сумма для получения
    let amountFromToken = 0;
    if (this.state.fromToken === "BUSD") {
      amountFromToken = +value * this.state.wattCourse;
    } else {
      amountFromToken = +value / this.state.wattCourse;
    }
    amountFromToken = Math.floor((amountFromToken) * 1000) / 1000;
    // ---------------------------------

    this.setState({
      amountGetToken: String(value),
      amountFromToken: Boolean(amountFromToken) ? String(amountFromToken) : "",
    });

    this.refAmountGetToken.current.setNativeProps({ text: String(value) });
    this.refAmountFromToken.current.setNativeProps({ text: Boolean(amountFromToken) ? String(amountFromToken) : "" });
  };


  // Логика работы с маршрутом
  _openHashTransaction = async (data) => {
    await Linking.openURL(`https://bscscan.com/tx/${ data?.hash }`)
  }
  _navigationGoBack = () => {
    this.props.navigation.goBack();
  }

  render() {
    const {
      wattCourse,

      amountFromToken,
      amountGetToken,

      fromToken,
      toToken,

      isModalLoading,
    } = this.state;
    const walletBusd = (this.props.wallet?.list || []).find((t) => t.code === "BUSD");

    return (
      <View style={styles.root}>

        <Header
          title={allTranslations(localization.tokenWattBusdTopUp.headerTitle)}
        />

        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.container}>

            <View style={styles.head}>
              <View style={styles.headToken}>
                <Image
                  style={styles.headTokenImage}
                  source={{ uri: getIconCurrency(fromToken) }}
                />
                <Text style={styles.headTokenCode}>{fromToken}</Text>
              </View>
              <TouchableOpacity style={styles.headCoup} activeOpacity={0.8} onPress={this.changePair}>
                <CommonRevertIcon color="#000000" />
              </TouchableOpacity>
              <View style={styles.headToken}>
                <Image
                  style={styles.headTokenImage}
                  source={{ uri: getIconCurrency(toToken) }}
                />
                <Text style={styles.headTokenCode}>{toToken}</Text>
              </View>
            </View>

            <View style={styles.sectionCourse}>
              <Text style={styles.sectionCourseLabel}>{allTranslations(localization.tokenWattBusdTopUp.course)}</Text>
              <Text style={styles.sectionCourseValue}>1 WATT = {convertorNumber(wattCourse, 2, ".")} $</Text>
            </View>

            <View style={styles.forms}>
              <View style={styles.formItem}>
                <Text
                  style={styles.formLabel}>{allTranslations(localization.tokenWattBusdTopUp.formSendTitle)} ({fromToken})</Text>
                <TextInput
                  ref={this.refAmountFromToken}
                  style={styles.formInput}
                  placeholder={allTranslations(localization.tokenWattBusdTopUp.formInputPlaceholder, { code: fromToken })}
                  onChangeText={this.changeAmountFromToken}
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={styles.formItem}>
                <Text
                  style={styles.formLabel}>{allTranslations(localization.tokenWattBusdTopUp.formGetTitle)} ({toToken})</Text>
                <TextInput
                  ref={this.refAmountGetToken}
                  style={styles.formInput}
                  placeholder={allTranslations(localization.tokenWattBusdTopUp.formInputPlaceholder, { code: toToken })}
                  onChangeText={this.changeAmountGetToken}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerMessage}>
                {allTranslations(localization.tokenWattBusdTopUp.footerMessage, {
                  coinSend: fromToken,
                  coinCommission: "BNB",
                })}
              </Text>
              <View style={styles.footerControls}>
                <Button
                  style={styles.buttonFooter}
                  labelStyle={styles.buttonFooterLabel}
                  label={allTranslations(localization.common.cancel)}
                  color="secondary"
                  onPress={this._navigationGoBack}
                />
                <Button
                  disabled={Boolean(!walletBusd?.mnemonic)}
                  style={styles.buttonFooter}
                  labelStyle={styles.buttonFooterLabel}
                  label={allTranslations(localization.common.further)}
                  onPress={this.createPreliminaryDeal}
                />
              </View>

              {Boolean(!walletBusd?.mnemonic) && (
                <View style={{marginTop: 12}}>
                  <BlockInformation
                    type="error"
                    message={allTranslations(localization.errors.noSeedPhrase)}
                  />
                </View>
              )}
            </View>

          </View>
        </ScrollView>


        <ModalLoading
          open={isModalLoading}
        />

        <PopUpInformation
          ref={this.refPopUpInformation}
        />
        <PopUpLoadTransaction
          ref={this.refPopUpLoadTransaction}
        />
        <PopUpSuccessTransaction
          ref={this.refPopUpSuccessTransaction}
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
    paddingHorizontal: 12,
    paddingVertical: 16,
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 14,
    padding: 16,
  },

  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 26,
  },
  headToken: {},
  headTokenImage: {
    width: 44,
    height: 44,
    marginBottom: 5,
  },
  headTokenCode: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828",
    fontWeight: "500",
  },
  headCoup: {
    backgroundColor: "#F7F7F7",
    borderRadius: 8,
    width: 32,
    height: 32,
    marginHorizontal: 30,
  },

  sectionCourse: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionCourseLabel: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E",
  },
  sectionCourseValue: {
    backgroundColor: "#F7F7F7",
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 10,

    fontSize: 16,
    lineHeight: 19,
    color: "#000000",
  },

  forms: {
    marginTop: -12,
    marginBottom: 24,
  },
  formItem: {
    marginTop: 12,
  },
  formLabel: {
    marginLeft: 16,
    marginBottom: 8,

    fontSize: 16,
    lineHeight: 19,
    color: "#282828",
  },
  formInput: {
    height: 40,
    backgroundColor: "#F7F7F7",
    borderRadius: 14,
    paddingVertical: 0,
    paddingHorizontal: 16,
  },

  footer: {
    marginTop: "auto",
  },
  footerMessage: {
    fontSize: 12,
    lineHeight: 19,
    color: "#8E8E8E",
    textAlign: "center",
  },
  footerControls: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -12,
  },

  buttonFooter: {
    height: 36,
    borderRadius: 8,
    paddingVertical: 0,
    marginLeft: 12,
    flex: 1,
    marginTop: 15,
  },
  buttonFooterLabel: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "normal",
  },

});

export default TokenWattBusdTopUp;
