import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
} from "react-native/index";
import {
  Header, RefreshControl,
} from "../../../components";
import {
  CoinInformation as CoinInformationComponent,
  History as HistoryComponent
} from "./components";
import { getTransactionHistory } from "./utils/transaction-history";
import moment from "moment";
import { Linking } from "react-native";
import { getLinkBlockChain, getTransactionLinkBlockChain } from "./utils/transaction-block-chain";
import urls from "../../../constants/urls";
import { getBalanceAll } from "../../../sheduler/balance";


class WalletCoin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [],

      coin: {},

      walletKey: props?.route?.params?.code,
      walletRank: props?.route?.params?.rank,


      isRefreshing: false
    };
  }

  componentDidMount = async () => {
    await this.initState();
    await this.getTransactionHistory();
  };
  initState = async () => {
    const coin = (this.props?.global?.wallet?.list || []).find((t) => {

      if (!this.state.walletRank) {
        return Boolean((t.code === this.state.walletKey))
      }

      return Boolean(
        (t.code === this.state.walletKey) &&
        (t.rank === this.state.walletRank)
      )
    }) || {};

    await this.setState({
      coin,
    });
  };

  getTransactionHistory = async () => {
    const listTransactionHistory = await getTransactionHistory(this.state.coin || {});
    let sections = [];

    let prevDate = "";
    let sectionItems = [];
    (listTransactionHistory || [])
      .sort((a, b) => {
        if (a.timestamp < b.timestamp) {
          return 1;
        }
        if (a.timestamp > b.timestamp) {
          return -1;
        }
        return 0;
      })
      .map((transaction, index, list) => {
        let dateTransaction = moment(Number(transaction.timestamp) * 1000).format("DD.MM.YYYY");

        if (!prevDate) {
          prevDate = dateTransaction;
        }

        const isPushSection = Boolean(prevDate !== dateTransaction || (list.length - 1) === index);
        if (isPushSection) {
          if (Boolean((list.length - 1) === index)) {
            sectionItems.push(transaction)
          }

          sections.push({
            label: prevDate,
            list: sectionItems
          });

          sectionItems = [];

          prevDate = dateTransaction;
        }

        sectionItems.push(transaction)
      });

    sections = sections.filter((t) => t.list.length > 0);

    this.setState({ history: sections })
  };
  buyCoinFromMoonPay = async () => {
    const { coin } = this.state;

    this.props.navigation.navigate("WalletBuyCrypto", {
      coin
    })

    return null

    // const { account } = this.props.global;
    //
    // if (!account?.email) {
    //   return null;
    // }
    //
    // const urlWebMoonPay = `${urls.moonpayBuyStaging}?address=${wallet.address}&user_email=${account.email}&currency=${wallet.code}`;
    //
    // await Linking.openURL(urlWebMoonPay);
  };
  getBalanceWallets = async () => {
    const walletNew = await getBalanceAll(this.props.global?.wallet || {});
    await this.props.updateWallet(walletNew);

  };

  refreshData = async () => {
    this.setState({ isRefreshing: true });

    await this.getTransactionHistory();
    await this.getBalanceWallets();
    await this.initState();

    this.setState({ isRefreshing: false });
  }

  _getCurrency = () => {
    return (this?.props?.global?.currencies || []).find((t) => t.code === this.state.coin?.code);
  };

  // Routes
  _routeTransactionBlockChain = async (hashTransaction) => {
    const link = getTransactionLinkBlockChain({code: this.state.coin?.code, tx: hashTransaction});

    await Linking.openURL(link);
  }
  _routeBlockChain = async (hashTransaction) => {
    const link = getLinkBlockChain(this.state.coin || {});
    await Linking.openURL(link);
  }
  _routeWalletCoinReceive = () => {
    this.props.navigation.navigate('WalletCoinReceive', {
      coinCode: this.state.coin?.code
    })
  }
  _routeWalletCoinSend = () => {
    this.props.navigation.navigate('WalletCoinSend', {
      coinCode: this.state.coin?.code,
      coinRank: this.state.coin?.rank,
    })
  }
  _routeWalletCoinHistoryItem = (item) => {
    this.props.navigation.navigate('WalletCoinHistoryItem', {
      transaction: item,
      coin: this.state.coin
    })
  }

  render() {
    const {
      coin,
      history,
      isRefreshing
    } = this.state;
    const {
      userCurrencies,
    } = this.props.global;
    const currency = this._getCurrency();

    return (
      <View style={styles.root}>
        <Header title={coin?.name} />

        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}

          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this.refreshData}
            />
          }
        >

          <CoinInformationComponent
            coin={coin}
            currency={currency}
            currencies={userCurrencies}

            onBuyCoin={this.buyCoinFromMoonPay}
            onRouteBlockChain={this._routeBlockChain}
            onRouteWalletCoinReceive={this._routeWalletCoinReceive}
            onRouteWalletCoinSend={this._routeWalletCoinSend}
          />

          <HistoryComponent
            history={history}
            coinCode={coin?.code}

            onRoute={this._routeWalletCoinHistoryItem}
          />

        </ScrollView>
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
    padding: 12
  },
});

export default WalletCoin;
