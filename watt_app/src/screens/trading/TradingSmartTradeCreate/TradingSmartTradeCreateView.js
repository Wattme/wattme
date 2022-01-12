import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native/index";
import {
  Text,
  Button,
} from "react-native-ui-lib";
import {
  Header,
  TabsTrade,
  ModalLoading, RefreshControl,
} from "../../../components";
import {
  SelectTradExchange as SelectTradExchangeComponent,
  SelectCurrencyPair as SelectCurrencyPairComponent,
  TradeControls as TradeControlsComponent,
  Total as TotalComponent,
} from "./components";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import agent from "../../../agent/agent";
import urls from "../../../constants/urls";
import Notification from "../../../common/Notification";
import { convertorNumber } from "../../../helpers/convertor";

class TradingSmartTradeCreate extends Component {
  constructor(props) {
    super(props);

    const {
      walletBalances,
    } = props;

    this.state = {
      symbolsList: [],

      pairPriceInfo: {},
      pairFilters: [],
      walletBalance: {},

      action: "BUY", // BUY || SELL
      coinBuy: "MATIC",
      coinSell: "BNB",
      controlType: "limit",

      price: 0, // Цена
      quantity: 0, // Единицы
      total: 0, // Всего

      isTrailingBuy: false,
      isModalLoading: false,
      isUpdateInfo: true,
      isRefreshing: false
    };

    this.refTotal = React.createRef();
    this.refTradeControls = React.createRef();
  }

  componentDidMount = async () => {
    await this.getSymbolPairPrice();
    await this.getSymbolsPair();
    await this.initialAmounts();
    await this.updateBinanceAccount();

    await this.setRouteParams();
    this.props.navigation.addListener("focus", () => {
      this.setRouteParams();
    });
  };

  // initialization
  setRouteParams = async () => {
    const selectPair = this.props?.route?.params?.selectPair || {};

    if (Object.keys(selectPair).length <= 0) {
      return null
    }

    this.setState({ isUpdateInfo: true });

    const { baseAsset, quoteAsset } = selectPair;

    await this.setState({
      coinBuy: baseAsset,
      coinSell: quoteAsset,
    });

    await this.getSymbolPairPrice();
    await this.getSymbolsPair();
    await this.initialAmounts();
  }
  getSymbolsPair = async () => {
    const { coinBuy, coinSell } = this.state;
    const symbolsList = await agent.get(`${ urls.tradingSymbols }?symbol=${coinBuy}${coinSell}`).then((res) => {
      return res.data?.symbols || []
    }).catch((err) => {
      return []
    });

    const pairFilters = symbolsList?.[0]?.filters || [];

    await this.setState({
      symbolsList,
      pairFilters
    });
  };
  getSymbolPairPrice = async () => {
    const { coinBuy, coinSell } = this.state;

    const symbol = [coinBuy, coinSell].join("");
    const priceInfo = await agent.get(`${urls.tradingSymbolPrice}?symbol=${symbol}`).then((res) => {
      return res.data;
    }).catch((err) => {
      return null;
    });

    if (!priceInfo) {
      return null;
    }

    this.setState({
      pairPriceInfo: priceInfo,
    });
  };
  initialAmounts = async () => {
    const { pairPriceInfo, coinSell, coinBuy, action } = this.state;
    const { walletBalances } = this.props;

    const walletBalanceByu = (walletBalances || []).find((t) => t.asset === coinBuy);
    const walletBalanceSell = (walletBalances || []).find((t) => t.asset === coinSell);
    const walletBalance = walletBalanceSell //Boolean(action === "BUY") ? walletBalanceSell : walletBalanceByu;

    const balance = Number.parseFloat(walletBalance?.free || "0");
    const pairPrice = Number.parseFloat(pairPriceInfo?.price || "0");

    const price = Number.parseFloat(pairPriceInfo?.price);
    const total = Number.parseFloat(balance);
    const quantity = balance / pairPrice;

    await this.setState({
      price,
      quantity,
      total,
      walletBalance,
      isRefreshing: false
    });

    await this.onChangeTradeControls({
      quantity: quantity,
      price: price
    });
  };

  // Логика страницы
  onChangeTradeControls = async ({ price: initPrice, quantity: initQuantity }) => {
    const { pairFilters } = this.state;

    let INIT_PRICE = Number.parseFloat(initPrice || this.state.price || '0');
    let INIT_QUANTITY = Number.parseFloat(initQuantity || this.state.quantity || '0');

    const PRICE_FILTER = pairFilters.find((t) => t.filterType === "PRICE_FILTER");
    const LOT_SIZE = pairFilters.find((t) => t.filterType === "LOT_SIZE");

    const PRICE_FILTER_TICK_SIZE = Number.parseFloat(PRICE_FILTER?.tickSize || '0');
    const PRICE_FILTER_MIN_PRICE = Number.parseFloat(PRICE_FILTER?.minPrice || '0');
    const PRICE_FILTER_MAX_PRICE = Number.parseFloat(PRICE_FILTER?.maxPrice || '0');

    const LOT_SIZE_STEP_SIZE = Number.parseFloat(LOT_SIZE?.stepSize || '0');
    const LOT_SIZE_MIN_QTY = Number.parseFloat(LOT_SIZE?.minQty || '0');
    const LOT_SIZE_MAX_QTY = Number.parseFloat(LOT_SIZE?.maxQty || '0');

    if ((( INIT_PRICE / PRICE_FILTER_TICK_SIZE ) % 1) !== 0 ) {
      const INIT_PRICE_WHOLE = Math.floor(( INIT_PRICE / PRICE_FILTER_TICK_SIZE ));
      INIT_PRICE = INIT_PRICE_WHOLE * PRICE_FILTER_TICK_SIZE;
    }
    if ((( INIT_QUANTITY / LOT_SIZE_STEP_SIZE ) % 1) !== 0 ) {
      const INIT_QUANTITY_WHOLE = Math.floor(( INIT_QUANTITY / LOT_SIZE_STEP_SIZE ));
      INIT_QUANTITY = INIT_QUANTITY_WHOLE * LOT_SIZE_STEP_SIZE;
    }

    if ( INIT_PRICE > PRICE_FILTER_MAX_PRICE ) {
      INIT_PRICE = PRICE_FILTER_MAX_PRICE;
    }
    if ( INIT_QUANTITY > LOT_SIZE_MAX_QTY ) {
      INIT_QUANTITY = LOT_SIZE_MAX_QTY;
    }

    if ( INIT_PRICE < PRICE_FILTER_MIN_PRICE ) {
      INIT_PRICE = PRICE_FILTER_MIN_PRICE;
    }
    if ( INIT_QUANTITY < LOT_SIZE_MIN_QTY ) {
      INIT_QUANTITY = LOT_SIZE_MIN_QTY;
    }

    const TOTAL = INIT_PRICE * INIT_QUANTITY;

    await this.setState({
      price: String(convertorNumber(INIT_PRICE, 8, '.')),
      quantity: String(convertorNumber(INIT_QUANTITY, 8, '.')),
      total: String(TOTAL),
      isUpdateInfo: false
    });

    this.refTradeControls.current?.update();
    this.refTotal.current?.update();
  };
  onChangeTotal = async ({ total }) => {
    const { price } = this.state;
    let newQuantity = String(Number.parseFloat(total) / Number.parseFloat(price));

    await this.setState({
      total,
      quantity: newQuantity
    });

    await this.onChangeTradeControls({
      quantity: newQuantity
    });
  };

  onChangeAction = async (action) => {
    await this.setState({ action });
    await this.initialAmounts();

    this.refTradeControls.current?.update();
    this.refTotal.current?.update();
  }

  onRefresh = async () => {
    this.setState({ isRefreshing: true });

    await this.getSymbolPairPrice();
    await this.getSymbolsPair();
    await this.initialAmounts();
    await this.updateBinanceAccount();
  }


  updateBinanceAccount = async () => {
    const account = await agent.get(urls.tradingAccount).then((res) => {
      return res.data
    }).catch(() => {
      return {}
    });

    this.props.setProfile(account);
  }

  // Создание ордера
  createOrder = async () => {
    const { action, coinBuy, coinSell, price, quantity } = this.state;

    this.setState({ isModalLoading: true });

    const isValid = await this._isValidCreateOrder();
    if (!isValid) {
      this.setState({ isModalLoading: false });

      return null
    }

    const response = await agent.post(urls.tradingLimitOrder, {
      symbol: `${coinBuy}${coinSell}`,
      side: action,
      price: convertorNumber(price, 8, '.'),
      quantity: Number.parseFloat(convertorNumber(quantity, 8, '.')),
    }).then((res) => {
      return res.data?.order;
    }).catch((err) => {
      return { error: err?.response };
    });
    if (response.error) {
      this.setState({ isModalLoading: false });

      const createErrorsCode = response.error?.data?.details?.code || "internal-error";

      Notification.send({
        type: "danger",
        message: allTranslations(localization.tradingSmartTradeCreate.createErrors[ createErrorsCode ])
      })

      return null
    }

    await this.updateBinanceAccount();

    Notification.send({
      message: allTranslations(localization.tradingSmartTradeCreate.createSuccess.SUCCESS_CREATE_ORDER_LIMIT),
      type: "success"
    })

    await this.setState({ isModalLoading: false });

    this.props.navigation.goBack();
  };
  _isValidCreateOrder = async () => {
    const {
      price,
      quantity,
      pairFilters,

      coinBuy,
      coinSell
    } = this.state;

    let errors = [];

    const PRICE_FILTER = pairFilters.find((t) => t.filterType === "PRICE_FILTER");
    const LOT_SIZE = pairFilters.find((t) => t.filterType === "LOT_SIZE");
    const MIN_NOTIONAL = pairFilters.find((t) => t.filterType === "MIN_NOTIONAL");

    const INIT_PRICE = Number.parseFloat(price);
    const INIT_QUANTITY = Number.parseFloat(quantity);
    const INIT_NOTIONAL = INIT_PRICE * INIT_QUANTITY;

    const MIN_NOTIONAL_MIN = Number.parseFloat(MIN_NOTIONAL?.minNotional || 0);
    if (INIT_NOTIONAL < MIN_NOTIONAL_MIN) {
      errors.push(`${ allTranslations(localization.tradingSmartTradeCreate.createErrors.MIN_NOTIONAL_MIN) } ${ MIN_NOTIONAL_MIN } ${ coinSell }`);
    }

    const LOT_SIZE_MIN = Number.parseFloat(LOT_SIZE?.minQty || '0');
    if (INIT_QUANTITY < LOT_SIZE_MIN) {
      errors.push(`${ allTranslations(localization.tradingSmartTradeCreate.createErrors.LOT_SIZE_MIN) } ${ LOT_SIZE_MIN } ${ coinBuy }`);
    }

    const LOT_SIZE_MAX = Number.parseFloat(LOT_SIZE?.maxQty || '0');
    if (INIT_QUANTITY > LOT_SIZE_MAX) {
      errors.push(`${ allTranslations(localization.tradingSmartTradeCreate.createErrors.LOT_SIZE_MAX) } ${ LOT_SIZE_MAX } ${ coinBuy }`);
    }

    const PRICE_FILTER_MIN = Number.parseFloat(PRICE_FILTER?.minPrice || '0');
    if (INIT_PRICE < PRICE_FILTER_MIN) {
      errors.push(`${ allTranslations(localization.tradingSmartTradeCreate.createErrors.PRICE_FILTER_MIN) } ${ PRICE_FILTER_MIN } ${ coinSell }`);
    }

    const PRICE_FILTER_MAX = Number.parseFloat(PRICE_FILTER?.maxPrice || '0');
    if (INIT_PRICE > PRICE_FILTER_MAX) {
      errors.push(`${ allTranslations(localization.tradingSmartTradeCreate.createErrors.PRICE_FILTER_MAX) } ${ PRICE_FILTER_MAX } ${ coinSell }`);
    }

    if (errors.length > 0) {
      Notification.send({
        message: errors.join('\n\n'),
        type: "danger"
      })
    }

    return Boolean(errors.length === 0)
  }

  _tabsType = () => {
    return [
      { label: allTranslations(localization.tradingSmartTradeCreate.typeTabs.buy), value: "BUY" },
      { label: allTranslations(localization.tradingSmartTradeCreate.typeTabs.sell), value: "SELL" },
    ];
  };

  // Навигация
  _routeSelectPair = () => {
    this.props.navigation.navigate("TradingSelectPair")
  }

  render() {
    const {
      pairFilters,

      action,
      controlType,
      isTrailingBuy,

      coinBuy,
      coinSell,

      walletBalance,

      price,
      quantity,
      total,

      isModalLoading,
      isUpdateInfo,
      isRefreshing
    } = this.state;

    return (
      <View style={styles.root}>

        <Header
          title={allTranslations(localization.tradingSmartTradeCreate.headerTitle)}
        />

        <ScrollView
          style={{ flexGrow: 1 }}
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}

          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this.onRefresh}
            />
          }
        >

          {/*<SelectTradExchangeComponent />*/}

          {/*<View style={{ marginTop: 16 }} />*/}

          <TabsTrade
            tabs={this._tabsType()}
            value={action}
            onChange={this.onChangeAction}
          />

          <View style={{ marginTop: 16 }} />

          <SelectCurrencyPairComponent
            coinBuy={coinBuy}
            coinSell={coinSell}

            routeSelect={this._routeSelectPair}
          />

          <View style={{ marginTop: 16 }} />

          <TradeControlsComponent
            ref={this.refTradeControls}

            price={price}
            quantity={quantity}

            coinBuy={coinBuy}
            coinSell={coinSell}

            pairFilters={pairFilters}

            controlType={controlType}
            isTrailingBuy={isTrailingBuy}

            onChangeControlType={(controlType) => this.setState({ controlType })}
            onChangeIsTrailingBuy={(isTrailingBuy) => this.setState({ isTrailingBuy })}
            onChangeAmount={this.onChangeTradeControls}
            onChangeIsUpdateInfo={() => this.setState({ isUpdateInfo: true })}
          />

          <View style={{ marginTop: 16 }} />

          <TotalComponent
            ref={this.refTotal}
            walletBalance={walletBalance}
            total={total}
            pairFilters={pairFilters}
            onChangeAmount={this.onChangeTotal}
            onChangeIsUpdateInfo={() => this.setState({ isUpdateInfo: true })}
          />

          <View style={{ marginTop: 16 }} />

          <View style={styles.controls}>
            <TouchableOpacity style={styles.control}>
              <Text style={styles.controlLabel}>
                {allTranslations(localization.tradingSmartTradeCreate.installTP)}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.control}>
              <Text style={styles.controlLabel}>
                {allTranslations(localization.tradingSmartTradeCreate.installSL)}
              </Text>
            </TouchableOpacity>
          </View>

          <Button
            style={{ marginTop: 16 }}
            label={allTranslations(localization.tradingSmartTradeCreate[isUpdateInfo ? 'makeDealLoad' : 'makeDeal'])}
            disabled={isUpdateInfo}

            onPress={this.createOrder}
          />

        </ScrollView>

        <ModalLoading
          open={isModalLoading}
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
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  controls: {
    flexDirection: "row",
    marginLeft: -12,
  },
  control: {
    flex: 1,
    marginLeft: 12,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#8E8E8E",
    alignItems: "center",
    justifyContent: "center",
  },
  controlLabel: {
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
  },
});

export default TradingSmartTradeCreate;
