import React from "react";
import {
  View,
  Animated,
  StyleSheet,
  ScrollView,
} from "react-native/index";
import {
  Button,
} from "react-native-ui-lib";
import {
  Tabs,
  RefreshControl,
  WalletInformationCard,
  InformationFunctionDevelop,
} from "../../../components";
import {
  WalletsList as WalletsListComponent,
} from "./components";
import getHeightStatusBar from "../../../helpers/getHeightStatusBar";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import { getBalanceAll } from "../../../sheduler/balance";

const heightStatusBar = getHeightStatusBar();

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeWalletsList: [],

      view: "crypto_assets",
      viewNft: "bsc",

      isRefreshing: false,
      isModalLoading: false,
    };

    this.refDialogChoiceAddingMethod = React.createRef();
    this.refDialogChangeWallet = React.createRef();
    this.refDialogCreateCustomToken = React.createRef();

    this.scrollY = new Animated.Value(0);
  }

  componentDidMount = async () => {
    await this.initState();
    this.props.navigation.addListener("focus", async () => {
      await this.initState();
    });
  };

  // Инициализация данных страницы
  initState = async () => {
    const isNotWallet = Boolean(Object.keys((this.props?.global?.walletsList || {})).length <= 0);
    if (isNotWallet) {
      this.props.navigation.navigate("WalletChoiceAdding");
    }

    await this.getBalanceWallets(true);
  };

  // Логика работы страницы
  getBalanceWallets = async (isInit = false) => {

    if (!isInit) {
      this.setState({ isRefreshing: true });
    }

    const walletNew = await getBalanceAll(this.props.global?.wallet || {});

    this.props.updateWallet(walletNew);

    this.setState({ isRefreshing: false });

  };

  // Выключение монеты кошелька
  onDisableCoin = async (coin) => {
    let newWallet = { ...this.props.global.wallet || {} };
    let newWalletList = [...newWallet?.list || []];

    newWalletList.find((t) => t.code === coin.code).disable = true;

    newWallet.list = newWalletList;

    this.props.updateWallet(newWallet);
  };

  // Роутинг
  _routeWalletInfo = (code, coin = null) => {
    this.props.navigation.navigate("WalletCoin", {
      code,
      rank: coin?.rank || ""
    });
  };
  _routeWalletImport = () => {
    this.props.navigation.navigate("ImportWallet");
  };
  _routeWalletCreate = () => {
    this.props.navigation.navigate("WalletCreate");
  };
  _routeWalletCoinManagement = () => {
    this.props.navigation.navigate("WalletCoinManagement");
  };
  _routeWalletChoosingWallet = () => {
    this.props.navigation.navigate("WalletChoosingWallet");
  };

  // Вспомогательные
  _tabsTypeCrypto = () => {
    return [
      {
        label: allTranslations(localization.dashboard.tabs.cryptoAssets),
        value: "crypto_assets",
      },
      // {
      //   label: allTranslations(localization.dashboard.tabs.nftCollections),
      //   value: "nft_collections",
      // },
    ];
  };
  _getTabsNftItems = () => {
    return [
      {
        label: "BSC",
        value: "bsc",
      },
      {
        label: "ETH",
        value: "eth",
      },
    ];
  };


  render() {
    const { view, viewNft, isRefreshing, isModalLoading } = this.state;
    const { wallet, account, currencies, userCurrencies } = this.props.global;
    const {
      type: walletType,
      list: walletList
    } = wallet || {};

    return (
      <View style={styles.root}>

        <Animated.ScrollView
          contentContainerStyle={styles.scrollView}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}

          refreshControl={
            <RefreshControl
              progressViewOffset={188}
              refreshing={isRefreshing}
              onRefresh={this.getBalanceWallets}
            />
          }

          onScroll={Animated.event(
            [ { nativeEvent: {contentOffset: {y: this.scrollY}} } ],
            {useNativeDriver: false}
          )}
        >

          <View style={{ paddingBottom: 176 }} />

          <View style={styles.container}>
            <View style={{ marginBottom: 9 }}>
              <Tabs
                items={this._tabsTypeCrypto()}
                value={view}
                onChange={(view) => this.setState({ view })}
              />
            </View>

            {
              Boolean(view === "crypto_assets") ? (
                <WalletsListComponent
                  wallets={walletList || []}
                  currencies={currencies}
                  routeWallet={this._routeWalletInfo}

                  onDisableCoin={this.onDisableCoin}
                />
              ) : (
                <View style={{ marginTop: 24 }}>
                  <InformationFunctionDevelop
                    message={allTranslations(localization.dashboard.nftDevelop)}
                  />
                </View>
              )
            }
          </View>
        </Animated.ScrollView>

        <WalletInformationCard
          scrollY={this.scrollY}

          wallet={wallet}
          account={account}
          currencies={currencies}
          userCurrencies={userCurrencies}

          onPressCoinManagement={this._routeWalletCoinManagement}
          onPressChoosingWallet={this._routeWalletChoosingWallet}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F2F2F6",
    paddingTop: heightStatusBar,
  },

  scrollView: {
    flexGrow: 1,
    paddingVertical: 18,
    paddingHorizontal: 12,
  },

  container: {
    flex: 1,

    marginTop: 12,
    overflow: "hidden",

    backgroundColor: "white",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 1,
  },
});

export default Dashboard;
