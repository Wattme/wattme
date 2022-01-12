import React from "react";
import {
  View,
  StyleSheet,
  ScrollView
} from "react-native/index";
import {

} from "react-native-ui-lib";
import {
  Header, RefreshControl,
} from "../../../components";
import {
  SliderLockPool as SliderLockPoolComponent,
  FrozenFunds as FrozenFundsComponent,
  Exchanger as ExchangerComponent
} from "./components";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import agentWiseWin from "../../../agent/agentWiseWin";
import agent from "../../../agent/agent";
import urls from "../../../constants/urls";
import { _balanceTokenBNB } from "../../../sheduler/balance";

class TokenWattBuyingToken extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lockPool: {},
      frozenFunds: {},
      systemInfo: {},
      exchanger: {},

      isRefreshing: false
    }
  }

  componentDidMount = async () => {
    await this.initState();
  }

  // Логика получение и обновление информации на странице
  initState = async () => {
    await this.getLockPool();
    await this.getFrozenFunds();
    await this.getSystemInfo();
    await this.getExchanger();
  }
  refreshData = async () => {}
  // ----------------------------------------------------


  // Получение актуальной информации о лок пуле (раунде)
  getLockPool = async () => {

    const data = await agentWiseWin.get('/sync-api/streamdesk/get_current_pool').then((res) => {
      return res.data
    }).catch((err) => {
      return {}
    });


    this.setState({
      lockPool: {
        totalAmountFromPool: data?.max_sale || "0",
        currentAmountWatt: data?.current_sale || "0",
        label: data?.name || ""
      }
    });
  }

  // Получение информации о замароженных / размароженных средствах
  getFrozenFunds = async () => {

    const wiseWinId = this.props.account?.wisewinId || null;
    if (!wiseWinId) {
      return null
    }

    // Получение пользователя Wise Win
    const wiseWinAccount = await agentWiseWin.get(`${ urls.getWiseWinAccount }${ wiseWinId }`).then((res) => {
      return res.data
    }).catch((err) => {
      return {}
    });

    // Замена пользователя Wise Win
    this.props.wiseWinSetProfile(wiseWinAccount);

    this.setState({
      frozenFunds: {
        wattHold: wiseWinAccount?.watt_hold,
        usdHold: wiseWinAccount?.watt_usd,
      }
    });
  }

  // Получение системной информации (адреса, балансы, курс и тд)
  getSystemInfo = async () => {
    const systemInfo = await agent.get(urls.exchangeSystemInfo).then((res) => {
      return res.data
    }).catch((err) => {
      return { error: err.response }
    });

    this.setState({
      systemInfo
    })
  }

  // Получение информации о обменике (балансы)
  getExchanger = async () => {

    const p2pPool = this.props?.walletImportInfo?.p2pPool || {};

    const balanceBusd = await _balanceTokenBNB(p2pPool.addressCheckBalance, p2pPool.addressContractBusd);
    const balanceWatt = await _balanceTokenBNB(p2pPool.addressCheckBalance, p2pPool.addressContractWatt);

    this.setState({
      exchanger: {
        balanceBusd: (parseInt(balanceBusd * 10000)) / 10000,
        balanceWatt: (parseInt(balanceWatt * 10000)) / 10000
      }
    })

  }

  // Логика навигации на странице и в компонентах
  _routeLockPoolInformation = () => {
    this.props.navigation.navigate("TokenWattInformation")
  }
  _routeLockPoolTransactions = () => {
    this.props.navigation.navigate("TokenWattTransactions")
  }
  _routeFrozenFundsTopUp = () => {
    this.props.navigation.navigate("TokenWattTopUp")
  }
  _routeExchanger = () => {
    this.props.navigation.navigate("TokenWattBusdTopUp", {
      from: "WATT",
      to: "BUSD"
    });
  }

  render() {
    const {
      lockPool,
      exchanger,
      frozenFunds,

      isRefreshing
    } = this.state;
    const {
      walletImportInfo
    } = this.props;

    return (
      <View style={styles.root}>

        <Header title={allTranslations(localization.tokenWattBuyingToken.headerTitle)}/>

        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this.refreshData}
            />
          }
        >

          <SliderLockPoolComponent
            totalAmountFromPool={lockPool?.totalAmountFromPool || 0}
            currentAmountWatt={lockPool?.currentAmountWatt || 0}
            label={lockPool?.label}

            routeLockPoolInformation={this._routeLockPoolInformation}
            routeLockPoolTransactions={this._routeLockPoolTransactions}
          />

          <View style={{marginTop: 12}}/>

          <FrozenFundsComponent
            frozenFunds={frozenFunds}
            defrostStartTime={walletImportInfo?.exchanger?.defrostStartTime || "1675209600"}

            routeFrozenFundsTopUp={this._routeFrozenFundsTopUp}
          />

          <View style={{marginTop: 12}}/>

          <ExchangerComponent
            exchanger={exchanger}

            routeExchanger={this._routeExchanger}
          />

        </ScrollView>

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
    paddingHorizontal: 12,
    paddingVertical: 16
  }
});


export default TokenWattBuyingToken
