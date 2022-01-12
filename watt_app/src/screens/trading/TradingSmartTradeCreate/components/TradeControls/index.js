import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight
} from "react-native/index";
import {
  Text,
  Switch,
} from "react-native-ui-lib";
import {
  TabsTrade,
} from "../../../../../components";
import {
  CommonPlus as CommonPlusIcon,
  CommonMinus as CommonMinusIcon
} from "../../../../../assets/icons";
import { getFontFamily } from "../../../../../theme/theme-manager/Text";
import { convertorNumber } from "../../../../../helpers/convertor";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import TextInputMask from "react-native-text-input-mask";

class TradeControls extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      price: props?.price || "",
      quantity: props?.quantity || "",
    };

    this.timeOutLongTapPriceSubtract = null;
    this.countLongTapPriceSubtract = 0;

    this.timeOutChangeForm = null;
  }

  // Вызывется через REF у родителя
  update = async () => {
    const { price, quantity } = this.props;

    this.setState({
      price,
      quantity
    })
  }

  onChangePrice = (value) => {
    this.setState({
      price: value
    });

    this.onChangeAmount();
  }
  longTapPriceChangeButton = (type) => {
    const { pairFilters } = this.props;
    const PRICE_FILTER_TICK_SIZE = Number.parseFloat(pairFilters?.find((t) => t.filterType === "PRICE_FILTER")?.tickSize || '0');

    const newPrice = Number.parseFloat(this.state.price) + (Boolean(type === '-') ? -PRICE_FILTER_TICK_SIZE : PRICE_FILTER_TICK_SIZE);
    this.setState({
      price: String(convertorNumber(newPrice, 8, '.'))
    });

    this.onChangeAmount();
  }

  onChangeQuantity = async (quantity) => {
    await this.setState({ quantity });

    this.onChangeAmount();
  }
  longTapQuantityChangeButton = (type) => {
    const { pairFilters } = this.props;
    const LOT_SIZE_STEP_SIZE = Number.parseFloat(pairFilters?.find((t) => t.filterType === "LOT_SIZE")?.stepSize || '0');

    const newQuantity = Number.parseFloat(this.state.quantity) + (Boolean(type === '-') ? -LOT_SIZE_STEP_SIZE : LOT_SIZE_STEP_SIZE);
    this.setState({
      quantity: String(convertorNumber(newQuantity, 8, '.'))
    });

    this.onChangeAmount();
  }


  onChangeAmount = () => {

    this.props.onChangeIsUpdateInfo();

    clearTimeout(this.timeOutChangeForm);

    this.timeOutChangeForm = setTimeout(() => {
      this.props.onChangeAmount({
        price: this.state.price,
        quantity: this.state.quantity,
      });
    }, 500);
  };

  _tabs = () => {
    return [
      { label: allTranslations(localization.tradingSmartTradeCreate.controls.tabs.tabLimit), value: "limit" },
      { label: allTranslations(localization.tradingSmartTradeCreate.controls.tabs.tabMarket), value: "market", disable: true },
      { label: allTranslations(localization.tradingSmartTradeCreate.controls.tabs.tabConditional), value: "conditional", disable: true },
    ];
  };

  render() {
    const {
      coinBuy,
      coinSell,

      controlType,
      isTrailingBuy,

      onChangeControlType,
      onChangeIsTrailingBuy
    } = this.props;
    const {
      price,
      quantity
    } = this.state;

    return (
      <View style={styles.root}>

        <TabsTrade tabs={this._tabs()} value={controlType} onChange={onChangeControlType} />

        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <View style={styles.sectionHeadLeft}>
              <Text style={styles.sectionHeadTitle}>
                {allTranslations(localization.tradingSmartTradeCreate.controls.titlePrice)}
              </Text>
            </View>
            <View style={styles.sectionHeadRight}>
              <TouchableOpacity style={[styles.sectionButton, { height: 20 }]}>
                <Text style={[styles.sectionButtonLabelSmall, { color: "#10B879" }]}>Bid</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.sectionButton, { height: 20 }]}>
                <Text style={[styles.sectionButtonLabelSmall, { color: "#F5386A" }]}>Ask</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.sectionBody}>
            <View style={styles.sectionBodyLeft}>
              <View style={styles.sectionInputContainer}>
                <TextInputMask
                  value={price}
                  style={styles.sectionInputInput}
                  mask={"[99999999999999].[99999999]"}
                  keyboardType="decimal-pad"

                  onChangeText={this.onChangePrice}
                />
                <Text style={styles.sectionInputText}>{ coinSell }</Text>
              </View>
            </View>
            <View style={styles.sectionBodyRight}>
              <TouchableOpacity
                onLongPress={() => this.longTapPriceChangeButton('-', false)}
                onPressOut={() => this.longTapPriceChangeButton('-', true)}
                onPress={() => this.longTapPriceChangeButton('-', false)}
                delayLongPress={100}
              >
                <View style={styles.sectionButton}>
                  <CommonMinusIcon color="#282828"/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onLongPress={() => this.longTapPriceChangeButton('+', false)}
                onPressOut={() => this.longTapPriceChangeButton('+', true)}
                onPress={() => this.longTapPriceChangeButton('+', false)}
                delayLongPress={100}
              >
                <View style={styles.sectionButton}>
                  <CommonPlusIcon color="#282828"/>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 16 }}/>

        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <View style={styles.sectionHeadLeft}>
              <Text style={[styles.sectionHeadTitle, styles.sectionHeadTitleSmall]}>
                Trailing Buy
              </Text>
            </View>
            <View style={styles.sectionHeadRight}>
              <Switch
                value={false}
                disabled
                style={styles.switch}
                thumbStyle={[
                  styles.switchThumb,
                  Boolean(false) && {transform: [{"translateX": 14}]}
                ]}
              />
            </View>
          </View>
          <View style={styles.sectionBody}>
            <View style={styles.sectionBodyLeft}>
              <View style={[styles.sectionInputContainer, {opacity: 0.5}]}>
                <TextInput
                  placeholder="1"
                  editable={false}
                  style={styles.sectionInputInput}
                />
                <Text style={styles.sectionInputText}>%</Text>
              </View>
            </View>
            <View style={styles.sectionBodyRight}>
              <TouchableOpacity style={styles.sectionButton} disabled>
                <CommonMinusIcon color="#8E8E8E"/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sectionButton} disabled>
                <CommonPlusIcon color="#8E8E8E"/>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 16 }}/>

        <View style={styles.section}>
          <View style={styles.sectionHead}>
            <View style={styles.sectionHeadLeft}>
              <Text style={styles.sectionHeadTitle}>
                {allTranslations(localization.tradingSmartTradeCreate.controls.titleUnits)}
              </Text>
            </View>
          </View>
          <View style={styles.sectionBody}>
            <View style={styles.sectionBodyLeft}>
              <View style={styles.sectionInputContainer}>
                <TextInputMask
                  value={quantity}
                  style={styles.sectionInputInput}
                  mask={"[99999999999999].[99999999]"}
                  keyboardType="decimal-pad"

                  onChangeText={this.onChangeQuantity}
                />
                <Text style={styles.sectionInputText}>{ coinBuy }</Text>
              </View>
            </View>
            <View style={styles.sectionBodyRight}>
              <TouchableOpacity onPress={() => this.longTapQuantityChangeButton('-', false)} style={styles.sectionButton}>
                <CommonMinusIcon color="#282828"/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.longTapQuantityChangeButton('+', false)} style={styles.sectionButton}>
                <CommonPlusIcon color="#282828"/>
              </TouchableOpacity>
            </View>
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

    backgroundColor: "white",

    padding: 16,
  },

  section: {
    marginTop: 16,
  },
  sectionHead: {
    flexDirection: "row",
    marginBottom: 12,
  },
  sectionHeadLeft: {
    flex: 1,
  },
  sectionHeadRight: {
    flexDirection: "row",
  },
  sectionBody: {
    flexDirection: "row",
  },
  sectionBodyLeft: {
    flex: 1,
  },
  sectionBodyRight: {
    flexDirection: "row"
  },
  sectionHeadTitle: {
    fontSize: 18,
    lineHeight: 21,
    color: "#000000",
    fontWeight: "500",
  },
  sectionHeadTitleSmall: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "normal"
  },
  sectionButton: {
    width: 40,
    height: 40,
    backgroundColor: "#F7F7F7",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
  },
  sectionButtonLabelSmall: {
    fontSize: 14,
    lineHeight: 17,
    textAlign: "center",
  },
  sectionInputContainer: {
    height: 40,
    backgroundColor: "#F7F7F7",
    borderRadius: 14,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 12,
    paddingRight: 16
  },
  sectionInputInput: {
    flex: 1,
    fontSize: 14,
    color: "#282828",
    fontFamily: getFontFamily("500"),
    paddingHorizontal: 0,
    paddingVertical: 0
  },
  sectionInputText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#8E8E8E",
    textAlign: "right"
  },


  switch: {
    height: 20,
    width: 34,
  },
  switchThumb: {
    width: 16,
    height: 16
  },
});

export default TradeControls;
