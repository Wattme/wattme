import React, { Component } from "react";
import {
  View,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Header,
  TabsTrade,
  RefreshControl,
  PopUpInformation,
  InformationFunctionDevelop
} from "../../../components";
import {
  Controls as ControlsComponent,
  DateSection as DateSectionComponent,
  SmartTradeItem as SmartTradeItemComponent,
} from "./components";
import {
  FilterFilter as FilterFilterIcon
} from "../../../assets/icons";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import agent from "../../../agent/agent";
import urls from "../../../constants/urls";
import moment from "moment";
import Svg, { Path } from "react-native-svg";


class TradingDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listSmartTrade: [],

      filter: {
        status: "",
        account: "",
      },

      activeTab: "smart-trade",
      sort: "-date",

      isRefreshing: true
    };

    this.refPopUpInformation = React.createRef();
  }

  componentDidMount = async () => {
    await this.getListSmartTrade();
    this.setRouteParams();

    this.props.navigation.addListener("focus", async () => {
      this.setRouteParams();
      await this.getListSmartTrade();
    });
  };

  getListSmartTrade = async () => {
    this.setState({ isRefreshing: true });

    const orders = await agent.get(`${urls.tradingOpenOrders}`).then((res) => {
      return res.data?.orders || [];
    }).catch((err) => {
      return [];
    });

    let listSmartTrade = [];

    let orderDate = "";
    orders
      .sort((a, b) => {
        if ( a.time < b.time ) {
          return 1
        }
        if ( a.time > b.time ) {
          return -1
        }

        return 0
      })
      .map((order) => {
      const date = moment(order?.time).format("DD.MM.YYYY");

      if (orderDate !== date) {
        orderDate = date;

        listSmartTrade.push({
          title: date,
          items: [],
        });
      }

      const orderSymbolFirst = " ";
      const orderSymbolLast = "";

      listSmartTrade[listSmartTrade.length - 1]
        .items
        .push({
          ...order,
          orderSymbolFirst,
          orderSymbolLast
        });
    });

    this.setState({
      listSmartTrade,
      isRefreshing: false
    });
  };

  setRouteParams = () => {
    const filter = this.props?.route?.params?.filter;

    let newFilter = {
      status: filter?.status || this.state.filter.status,
      account: filter?.account || this.state.filter.account,
    };

    this.setState({
      filter: newFilter,
    });
  };

  changeActiveTab = (activeTab) => {
    this.setState({
      activeTab,
      sort: Boolean(activeTab === "smart-trade") ? "-date" : "-date",
    });
  };
  changeSort = (sort) => {
    this.setState({ sort });
  };

  _routePageFilter = () => {
    this.props.navigation.navigate("FilterPage", {
      backPath: "TradingDashboard",
      initFilter: { ...this.state.filter },

      filterParams: [
        {
          label: allTranslations(localization.tradingDashboard.filter.status.label),
          name: "status",
          items: [
            { value: "", label: allTranslations(localization.tradingDashboard.filter.status.all) },
            { value: "active", label: allTranslations(localization.tradingDashboard.filter.status.active) },
            { value: "completed", label: allTranslations(localization.tradingDashboard.filter.status.completed) },
          ],
        },
        {
          label: allTranslations(localization.tradingDashboard.filter.account.label),
          name: "account",
          items: [
            { value: "", label: allTranslations(localization.tradingDashboard.filter.account.all) },
            { value: "binance", label: "Binance" },
            { value: "binance-margin-cross", label: "Binance Margin Cross" },
          ],
        },
      ],
    });
  };
  _routePageCreateSmartTrade = async (isConfirm) => {

    if (!isConfirm) {

      this.refPopUpInformation.current.open({
        caption: "Вы собираетесь перенаправить на сторонний сервис торговли. Совершая перевод, убедитесь, что вы осведомлены о финансовых рисках. WATT Wallet не несет ответственности за любые убытки, вызванные использованием этого сервиса.",
        controls: "confirm",
        onConfirm: this._routePageCreateSmartTrade.bind(true, true)
      })

      return null
    }

    this.refPopUpInformation.current.close();

    await Linking.openURL("https://www.binance.com/ru/trade/BTC_USDT?layout=basic");

    // this.props.navigation.navigate("TradingSmartTradeCreate");
  };

  _renderLeftContent = () => {
    return (
      <TouchableOpacity style={styles.buttonHeader}>
        <FilterFilterIcon/>
      </TouchableOpacity>
    )
  }
  _renderRightContent = () => {
    return (
      <TouchableOpacity style={styles.buttonHeader} activeOpacity={0.8} onPress={() => this._routePageCreateSmartTrade(false)}>
        <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path fillRule="evenodd" clipRule="evenodd" d="M16.8891 8.88889C16.8891 8.39797 16.4911 8 16.0002 8C15.5093 8 15.1113 8.39797 15.1113 8.88889V15.1109H8.88889C8.39797 15.1109 8 15.5089 8 15.9998C8 16.4907 8.39797 16.8887 8.88889 16.8887H15.1113V23.1111C15.1113 23.602 15.5093 24 16.0002 24C16.4911 24 16.8891 23.602 16.8891 23.1111V16.8887H23.1111C23.602 16.8887 24 16.4907 24 15.9998C24 15.5089 23.602 15.1109 23.1111 15.1109H16.8891V8.88889Z" fill="#8E8E8E"/>
        </Svg>
      </TouchableOpacity>
    )
  }

  render() {
    const {
      activeTab,
      sort,

      listSmartTrade,

      isRefreshing
    } = this.state;
    const {
      global
    } = this.props;

    return (
      <View style={styles.root}>

        <Header
          title={allTranslations(localization.tradingDashboard.headerTitle)}
          hideLeft
          leftContent={this._renderLeftContent}
          rightContent={this._renderRightContent}
        />

        <ScrollView
          style={{ flexGrow: 1 }}
          contentContainerStyle={styles.scrollView}

          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this.getListSmartTrade}
            />
          }
        >

          <View style={styles.tabsContainer}>
            <TabsTrade
              value={activeTab}
              tabs={[
                { value: "smart-trade", label: allTranslations(localization.tradingDashboard.tabs.smartTrade) },
                { value: "bots", label: allTranslations(localization.tradingDashboard.tabs.bots) },
              ]}
              onChange={(activeTab) => this.setState({activeTab})}
            />
          </View>


          {
            Boolean (activeTab === "smart-trade") && (
              <>
                {
                  listSmartTrade.map((section, index) => (
                    <DateSectionComponent key={`listSmartTrade-${index}`} title={section.title}>

                      {
                        (section.items || []).map((trade, indexTrade) => (
                          <View key={`listSmartTrade-${index}-${indexTrade}`}>

                            <SmartTradeItemComponent
                              trade={trade}
                              navigation={this.props.navigation}

                              fiats={global.fiats}
                              currencies={global.currencies}
                            />

                            <View style={{ marginTop: 12 }} />

                          </View>
                        ))
                      }

                    </DateSectionComponent>
                  ))
                }
              </>
            )
          }


          {
            Boolean (activeTab === "bots") && (
              <>
                <InformationFunctionDevelop
                  message={allTranslations(localization.tradingDashboard.bots.botsWillWorkSoon)}
                />
              </>
            )
          }

        </ScrollView>

        <PopUpInformation
          ref={this.refPopUpInformation}
          styles={{
            caption: {marginBottom: 0}
          }}
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
    padding: 12,
  },

  tabsContainer: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16
  },

  buttonHeader: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center"
  },
});

export default TradingDashboard;
