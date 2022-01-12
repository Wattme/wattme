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
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import { getIconCurrency } from "../../../../../common/Images";
import agent from "../../../../../agent/agent";
import urls from "../../../../../constants/urls";
import { convertorNumber } from "../../../../../helpers/convertor";

class SmartTradeItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      percentDifference: 0,
      cryptoDifference: 0
    }
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

  _routeSmartTrade = () => {
    this.props.navigation.navigate("TradingTradeInfo", {
      trade: this.props?.trade || {}
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
  _pair = () => {
    const { trade } = this.props;
    const { baseAsset, quoteAsset } = trade;

    return `${ baseAsset } / ${ quoteAsset }`
  }

  render() {
    const {
      trade
    } = this.props;

    const currencyLink = getIconCurrency(trade?.baseAsset);

    return (
      <TouchableOpacity onPress={this._routeSmartTrade} activeOpacity={0.6}>
        <View style={styles.card}>
          <View style={styles.cardImage}>
            <Image
              source={{ uri: currencyLink }}
              style={styles.currency}
              resizeMode="contain"
            />
          </View>
          <View style={styles.cardBody}>
            <View style={styles.cardBodyLeft}>
              <Text style={styles.cardCurrency}>{ this._pair() }</Text>
              <Text style={styles.cardNetwork}>Binance</Text>
            </View>
            <View style={styles.cardBodyRight}>
              <Text style={styles.cardAmount}>{ this._amount() }</Text>
              <Text style={styles.cardStatus}>
                { allTranslations(localization.tradingItem.status[ trade?.status ]) }
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,

    backgroundColor: "#FFFFFF",

    padding: 16
  },

  cardImage: {
    width: 40,
    height: 40,
    borderRadius: 999,
    overflow: "hidden"
  },
  cardBody: {
    flex: 1,
    marginLeft: 12,
    flexDirection: "row",

  },
  cardBodyLeft: {
    flex: 1
  },
  cardBodyRight: {},

  currency: {
    width: 40,
    height: 40,
    borderRadius: 999
  },

  cardCurrency: {
    fontSize: 14,
    lineHeight: 17,
    color: "#282828",
    fontWeight: "600"
  },
  cardNetwork: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 17,
    color: "#282828"
  },
  cardAmount: {
    fontSize: 14,
    lineHeight: 17,
    color: "#282828",
    textAlign: "right",
    fontWeight: "600"
  },
  cardStatus: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 17,
    color: "#10B879",
    textAlign: "right"
  },
});

export default SmartTradeItem
