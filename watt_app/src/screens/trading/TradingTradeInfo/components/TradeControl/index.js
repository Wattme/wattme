import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  TradeAverage as TradeAverageIcon,
  TradeCancel as TradeCancelIcon,
  TradeRefresh as TradeRefreshIcon,
  TradeDecrease as TradeDecreaseIcon,
  TradeEdit as TradeEditIcon,
} from "../../../../../assets/icons";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import { getIconCurrency } from "../../../../../common/Images";
import { convertorNumber } from "../../../../../helpers/convertor";
import agent from "../../../../../agent/agent";
import urls from "../../../../../constants/urls";

class TradeControl extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      percentDifference: 0,
      cryptoDifference: 0
    };
  }


  componentDidMount = async () => {
    await this.getInformationCurrentPair();
  }

  getInformationCurrentPair = async () => {
    const { trade } = this.props;

    const currentPriceDeal = await agent.get(`${urls.tradingSymbolPrice}?symbol=${trade.symbol}`).then((res) => {
      return Number.parseFloat(res.data?.price);
    }).catch((err) => {
      return 0;
    });
    const tradePriceDeal = Number.parseFloat(trade?.price || '0');

    const percentDifference = (currentPriceDeal / tradePriceDeal) * 100 - 100;
    const cryptoDifference = currentPriceDeal - tradePriceDeal;


    this.setState({
      percentDifference: convertorNumber(percentDifference, 0),
      cryptoDifference: cryptoDifference
    });
  }

  _amount = () => {
    const { trade, currencies } = this.props;
    const { percentDifference, cryptoDifference } = this.state;

    const coinSymbol = trade?.quoteAsset || "";
    const coinCurrencies = (currencies || []).find((t) => t.code === coinSymbol) || {};

    const usdDifference = cryptoDifference * Number.parseFloat(coinCurrencies?.price_usd);

    return `${ percentDifference }% / ${ convertorNumber(usdDifference, 1, '.') }$`
  }

  render() {
    const {
      trade,

      onCancelOrder
    } = this.props;

    return (
      <View style={styles.root}>

        <View style={styles.dealInfo}>
          <View style={styles.dealInfoImage}>
            <Image
              source={{ uri: getIconCurrency(trade?.baseAsset) }}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
          </View>
          <View style={styles.dealInfoBody}>
            <View style={styles.dealInfoBodyLeft}>
              <Text style={styles.dealInfoName}>{ trade?.baseAsset } / { trade?.quoteAsset }</Text>
              <Text style={styles.dealInfoCurrency}>Binance</Text>
            </View>
            <View style={styles.dealInfoBodyRight}>
              <Text style={styles.dealInfoValue}>{ this._amount() }</Text>
            </View>
          </View>
        </View>


        <View style={styles.controls}>
          {/*<View style={styles.control}>*/}
          {/*  <TouchableOpacity style={[styles.controlButton, {backgroundColor: "#10B879"}]} activeOpacity={0.6}>*/}
          {/*    <TradeRefreshIcon/>*/}
          {/*  </TouchableOpacity>*/}
          {/*  <Text style={styles.controlLabel} numberOfLines={1}>*/}
          {/*    { allTranslations(localization.tradingTradeInfo.tradeControl.refresh) }*/}
          {/*  </Text>*/}
          {/*</View>*/}
          {/*<View style={styles.control}>*/}
          {/*  <TouchableOpacity style={[styles.controlButton, {backgroundColor: "#F6D962"}]} activeOpacity={0.6}>*/}
          {/*    <TradeAverageIcon/>*/}
          {/*  </TouchableOpacity>*/}
          {/*  <Text style={styles.controlLabel} numberOfLines={1}>*/}
          {/*    { allTranslations(localization.tradingTradeInfo.tradeControl.average) }*/}
          {/*  </Text>*/}
          {/*</View>*/}
          {/*<View style={styles.control}>*/}
          {/*  <TouchableOpacity style={[styles.controlButton, {backgroundColor: "#F6D962"}]} activeOpacity={0.6}>*/}
          {/*    <TradeDecreaseIcon/>*/}
          {/*  </TouchableOpacity>*/}
          {/*  <Text style={styles.controlLabel} numberOfLines={1}>*/}
          {/*    { allTranslations(localization.tradingTradeInfo.tradeControl.decrease) }*/}
          {/*  </Text>*/}
          {/*</View>*/}
          {/*<View style={styles.control}>*/}
          {/*  <TouchableOpacity style={[styles.controlButton, {backgroundColor: "#8E8E8E"}]} activeOpacity={0.6}>*/}
          {/*    <TradeEditIcon/>*/}
          {/*  </TouchableOpacity>*/}
          {/*  <Text style={styles.controlLabel} numberOfLines={1}>*/}
          {/*    { allTranslations(localization.tradingTradeInfo.tradeControl.edit) }*/}
          {/*  </Text>*/}
          {/*</View>*/}
          <View style={styles.control}>
            <TouchableOpacity style={[styles.controlButton, {backgroundColor: "#F5386A"}]} activeOpacity={0.6} onPress={onCancelOrder}>
              <TradeCancelIcon/>
            </TouchableOpacity>
            <Text style={styles.controlLabel} numberOfLines={1}>
              { allTranslations(localization.tradingTradeInfo.tradeControl.cancel) }
            </Text>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,

    padding: 16,

    backgroundColor: "white"
  },

  dealInfo: {
    flexDirection: "row"
  },
  dealInfoImage: {
    height: 40,
    width: 40,
    borderRadius: 999,
    overflow: "hidden"
  },
  dealInfoBody: {
    flex: 1,
    paddingLeft: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  dealInfoBodyLeft: {
    flex: 1
  },
  dealInfoBodyRight: {},
  dealInfoName: {
    fontSize: 14,
    lineHeight: 17,
    fontWeight: "600",
    color: "#282828"
  },
  dealInfoCurrency: {
    fontSize: 14,
    lineHeight: 17,
    color: "#282828",
    marginTop: 8
  },
  dealInfoValue: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "600",
    textAlign: "right",
    color: "#282828"
  },

  chartDeal: {
    marginTop: 24
  },

  controls: {
    marginTop: 24,
    flexDirection: "row",

    marginLeft: -8
  },
  control: {
    flex: 1,
    marginLeft: 8
  },
  controlButton: {
    width: "100%",
    height: 32,
    borderRadius: 10,

    alignItems: "center",
    justifyContent: "center"
  },
  controlLabel: {
    fontSize: 9,
    lineHeight: 11,
    textAlign: "center",
    color: "#282828",

    marginTop: 8
  },
});

export default TradeControl
