import React, { Component } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,

  SafeAreaView,
  FlatList
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  Header
} from "../../../components";
import {
  Coin as CoinComponent
} from "./components";
import {
  CommonSearch as CommonSearchIcon,
  HeaderAccept,
  CommonClose as CommonCloseIcon,
  CommonPlus as CommonPlusIcon
} from "../../../assets/icons";
import { getFontFamily } from "../../../theme/theme-manager/Text";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import { getWalletsList } from "../../../helpers/walletsList";
import { checkAddressContract } from "../../../utils/addresses/checkAddressContract";
import { get1inchTokens } from "../../../utils/1inch/tokens";
import currency_bnb_custom_token from "../../../models/currency/bnb/currency_bnb_custom_token";
import currency_rank from "../../../constants/currency_rank";
import currency_eth_custom_token from "../../../models/currency/eth/currency_eth_custom_token";
import currency_polygon_custom_token from "../../../models/currency/polygon/currency_polygon_custom_token";


class WalletCoinManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coins: [],

      search: "",

      isContract: false,
    };

    this.timeoutCheckSearch = null;
  }

  componentDidMount = async () => {
    await this.initState();
    this.props.navigation.addListener("focus", async () => {
      await this.initState();
    });

    await this.getListCoins();
  };
  initState = async () => {
    const { wallet } = this.props.global;
    const coins = wallet?.list || [];

    this.setState({ coins });
  }


  getListCoins = async () => {
    const {
      stateCoins
    } = this.props;

    let listErc20 = stateCoins?.erc20 || [];
    if (listErc20.length <= 0) {
      listErc20 = await get1inchTokens(1);
      this.props.setErc20(listErc20);
    }

    let listBep20 = stateCoins?.bep20 || [];
    if (listBep20.length <= 0) {
      listBep20 = await get1inchTokens(56);
      this.props.setBep20(listBep20);
    }

    let listPolygon = stateCoins?.polygon || [];
    if (listPolygon.length <= 0) {
      listPolygon = await get1inchTokens(137);
      this.props.setPolygon(listPolygon);
    }
  }

  changeSearch = async (search) => {
    clearTimeout(this.timeoutCheckSearch);

    await this.setState({ search });

    this.timeoutCheckSearch = setTimeout(async () => {
      await this.checkSearchType();
    }, 1000);
  }
  checkSearchType = () => {
    const isAddressContract = Boolean(checkAddressContract(this.state.search));

    if (this.state.isContract !== isAddressContract) {
      this.setState({ isContract: isAddressContract })
    }
  }

  changeDisableCoin = (coinCode, isApi, item) => {

    if (isApi) {
      this.addApiCoin(coinCode, isApi, item);

      return null
    }

    const coins = [...this.state.coins];
    const coin = coins.find((t) => t.code === coinCode) || {};
    const newStatusDisable = !Boolean(coin.disable);

    let newCoins = [...coins];
    newCoins.find((t) => t.code === coinCode).disable = newStatusDisable;

    this.setState({ coins: newCoins });
  }
  addApiCoin = (coinCode, isApi, item) => {

    const walletCoins = this.state.coins || [];

    let newCoin = null;

    if (item.network === "BEP-20") {
      const coin = walletCoins.find((t) => t.code === "BNB");
      newCoin = currency_bnb_custom_token({
        address: coin.address,
        contract: item.address,
        mnemonic: coin.mnemonic,
        name: item.name,
        code: item.code,
        privateKey: coin.privateKey,
        logoURI: item?.logoURI
      })
    }
    if (item.network === "ERC-20") {
      const coin = walletCoins.find((t) => t.code === "ETH");
      newCoin = currency_eth_custom_token({
        address: coin.address,
        contract: item.address,
        mnemonic: coin.mnemonic,
        name: item.name,
        code: item.code,
        privateKey: coin.privateKey,
        logoURI: item?.logoURI
      });
    }
    if (item.network === "POLYGON") {
      const coin = walletCoins.find((t) => t.code === "MATIC");
      newCoin = currency_polygon_custom_token({
        address: coin.address,
        contract: item.address,
        mnemonic: coin.mnemonic,
        name: item.name,
        code: item.code,
        privateKey: coin.privateKey,
        logoURI: item?.logoURI
      });
    }

    const newWalletCoins = [...walletCoins, newCoin];

    this.setState({
      coins: newWalletCoins
    });
  }

  acceptCoins = async () => {
    let wallet = {...this.props.global.wallet};
    let newCoins = [...this.state.coins];

    const { walletsList, wallet: newWallet } = await getWalletsList({
      walletName: wallet.key,
      walletList: newCoins
    });

    await this.props.updateWallet(newWallet);
    await this.props.updateWalletsList(walletsList);

    this.props.navigation.goBack();
  }

  _routeWalletCreateCustomCoin = () => {
    this.props.navigation.navigate("WalletCreateCustomCoin");
  }
  _renderHeaderRight = () => {
    return (
      <TouchableOpacity style={styles.headerButton} onPress={this.acceptCoins}>
        <HeaderAccept/>
      </TouchableOpacity>
    )
  }
  _flatListData = () => {
    const {
      bep20,
      erc20,
      polygon
    } = this.props.stateCoins;
    const wallet = this.props?.global?.wallet || {};
    const search = (this.state.search || '').toLowerCase();

    const myCoins = [...this.state.coins];

    let apiCoins = [];
    if (Boolean((wallet?.list || []).find((t) => t.code === "BNB"))) {
      apiCoins = [...apiCoins, ...bep20];
    }
    if (Boolean((wallet?.list || []).find((t) => t.code === "ETH"))) {
      apiCoins = [...apiCoins, ...erc20];
    }
    if (Boolean((wallet?.list || []).find((t) => t.code === "MATIC"))) {
      apiCoins = [...apiCoins, ...polygon];
    }

    apiCoins = [...apiCoins].filter((a) => {
      return !Boolean(myCoins.find((t) => {
        const addressContractMyCoin = (t.contract === "0x") ? "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" : t.contract;

        return (t.code === a.code && addressContractMyCoin === a.address)
      }))
    })
    const allCoins = [...myCoins, ...apiCoins];

    return allCoins.filter((t) => {
      const nameLowerCase = (t.name || '').toLowerCase();
      const codeLowerCase = (t.code || '').toLowerCase();
      const addressLowerCase = (t.address || '').toLowerCase();
      const contractLowerCase = (t.contract || '').toLowerCase();
      const networkLowerCase = (t.network || '').toLowerCase();

      if (!search) {
        return true
      }

      return Boolean(
        nameLowerCase.indexOf(search) > -1 ||
        codeLowerCase.indexOf(search) > -1 ||
        addressLowerCase.indexOf(search) > -1 ||
        networkLowerCase.indexOf(search) > -1 ||
        contractLowerCase.indexOf(search) > -1
      )
    });
  }
  _renderFooterFlatList = () => {
    if (!this.state.isContract) {
      return null
    }

    return (
      <TouchableOpacity style={styles.buttonCreateToken} onPress={this._routeWalletCreateCustomCoin} activeOpacity={0.6}>
        <View style={styles.buttonCreateTokenIcon}>
          <CommonPlusIcon color="#282828"/>
        </View>
        <Text style={styles.buttonCreateTokenLabel}>
          {allTranslations(localization.common.append)}
        </Text>

        <View style={styles.buttonCreateTokenArrow}/>
      </TouchableOpacity>
    )
  }

  render() {
    const {
      search,
      coins
    } = this.state;
    const flatListData = this._flatListData();

    return (
      <View style={styles.root}>
        <Header title={allTranslations(localization.walletCoinManagement.header)} rightContent ={this._renderHeaderRight} hideLeft/>

        <View style={styles.container}>

          <View style={styles.searchContainer}>
            <CommonSearchIcon fill="#8E8E8E"/>
            <TextInput
              value={search}
              style={styles.searchInput}
              placeholder={allTranslations(localization.walletCoinManagement.searchPlaceholder)}
              placeholderTextColor="#8E8E8E"
              onChangeText={(search) => this.changeSearch(search)}
            />
            {Boolean(search.length > 0)&&(
              <TouchableOpacity activeOpacity={0.6} onPress={() => this.changeSearch("")}>
              <CommonCloseIcon/>
              </TouchableOpacity>
            )}
          </View>

          <View style={[styles.section]}>
            <View style={styles.sectionBody}>
              <SafeAreaView style={{flexGrow: 1}}>
                <FlatList
                  data={flatListData}
                  renderItem={(props) => CoinComponent({...props, walletCoins: coins, onPress: this.changeDisableCoin, isLast: Boolean(flatListData.length - 1 === props.index)})}
                  keyExtractor={(item, index) => `WalletCoinManagementView-${item.code}-${index}`}

                  ListFooterComponent={this._renderFooterFlatList}

                  showsVerticalScrollIndicator={false}
                />
              </SafeAreaView>
            </View>
          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F2F2F6",
  },

  headerButton: {
    width: 32,
    height: 32,
  },

  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
    justifyContent: "flex-start"
  },

  searchContainer: {
    height: 40,
    borderRadius: 14,
    backgroundColor: "white",
    paddingVertical: 4,
    paddingHorizontal: 4,

    flexDirection: "row"
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 0,
    paddingHorizontal: 12,
    fontFamily: getFontFamily("normal")
  },
  searchIcon: {},

  section: {
    flex: 1,
    marginTop: 16,
    justifyContent: "flex-start"
  },
  sectionBody: {
    backgroundColor: "white",
    borderRadius: 14,
    paddingHorizontal: 16
  },

  buttonCreateToken: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16
  },
  buttonCreateTokenIcon: {
    width: 44,
    height: 44,
    backgroundColor: "#F7F7F7",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
    marginRight: 12
  },
  buttonCreateTokenLabel: {
    fontSize: 16,
    lineHeight: 19,
    color: "black"
  },
  buttonCreateTokenArrow: {
    height: 2,
    backgroundColor: "#F9F9F9",
    position: "absolute",
    top: 0,
    right: 0,
    left: 60
  },
})

export default WalletCoinManagement;
