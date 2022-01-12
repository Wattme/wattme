import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  TabsTrade
} from "../../../../../components";
import { getFontFamily } from "../../../../../theme/theme-manager/Text";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import { CommonMinus as CommonMinusIcon, CommonPlus as CommonPlusIcon } from "../../../../../assets/icons";
import TextInputMask from "react-native-text-input-mask";
import { convertorNumber } from "../../../../../helpers/convertor";

class Total extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      total: '0'
    };

    this.timeOutChangeForm = null;
  }

  update = () => {
    this.setState({
      total: this.props.total
    })
  }

  onChangeTotal = (value) => {
    this.setState({
      total: value
    });

    this.onChangeAmount();
  }
  onChangePercentTotal = (percent) => {
    const percentNumber = Number(percent);
    const amount = Number.parseFloat(this.props.walletBalance?.free || '0');

    const total = String(convertorNumber((( amount / 100 ) * percentNumber), 8, '.'));

    this.setState({ total });

    this.onChangeAmount();
  }
  longTapTotalChangeButton = (type) => {
    const { pairFilters } = this.props;
    const PRICE_FILTER_TICK_SIZE = Number.parseFloat(pairFilters?.find((t) => t.filterType === "PRICE_FILTER")?.tickSize || '0');

    const newTotal = Number.parseFloat(this.state.total) + (Boolean(type === '-') ? -PRICE_FILTER_TICK_SIZE : PRICE_FILTER_TICK_SIZE);
    this.setState({
      total: String(convertorNumber(newTotal, 8, '.'))
    });

    this.onChangeAmount();
  }

  onChangeAmount = () => {
    this.props.onChangeIsUpdateInfo();

    clearTimeout(this.timeOutChangeForm);

    this.timeOutChangeForm = setTimeout(() => {
      this.props.onChangeAmount({
        total: this.state.total
      });
    }, 500);
  };

  _tabPercent = () => {
    return [
      { value: "5", label: "5%" },
      { value: "10", label: "10%" },
      { value: "25", label: "25%" },
      { value: "50", label: "50%" },
      { value: "100", label: "100%" }
    ]
  }
  _valuePercent = () => {
    const { total } = this.state;
    const amount = Number.parseFloat(this.props.walletBalance?.free || '0');

    return String( total * 100 / amount )
  }

  render() {
    const {
      walletBalance
    } = this.props;
    const {
      total
    } = this.state;

    return (
      <View style={styles.root}>

        <View style={[styles.section, { marginTop: 0 }]}>
          <View style={styles.sectionHead}>
            <View style={styles.sectionHeadLeft}>
              <Text style={styles.sectionHeadTitle}>
                {allTranslations(localization.tradingSmartTradeCreate.total.totalTitle)}
              </Text>
            </View>
            <View style={styles.sectionHeadRight}>
              <Text style={styles.sectionHeadTitleXSmall}>
                { walletBalance?.free } { walletBalance?.asset }
              </Text>
            </View>
          </View>
          <View style={styles.sectionBody}>
            <View style={styles.sectionBodyLeft}>
              <View style={styles.sectionInputContainer}>
                <TextInputMask
                  value={total}
                  style={styles.sectionInputInput}
                  mask={"[99999999999999].[99999999]"}
                  keyboardType="decimal-pad"

                  onChangeText={this.onChangeTotal}
                />
                <Text style={styles.sectionInputText}>
                  { walletBalance?.asset }
                </Text>
              </View>
            </View>
            <View style={styles.sectionBodyRight}>
              <TouchableOpacity onPress={() => this.longTapTotalChangeButton('-', false)} style={styles.sectionButton}>
                <CommonMinusIcon color="#282828"/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.longTapTotalChangeButton('+', false)} style={styles.sectionButton}>
                <CommonPlusIcon color="#282828"/>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{marginTop: 16}}/>

        <TabsTrade
          tabs={this._tabPercent()}
          value={this._valuePercent()}
          onChange={this.onChangePercentTotal}
        />

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
  sectionHeadTitleXSmall: {
    fontSize: 14,
    lineHeight: 17,
    textAlign: "right",
    color: "#8E8E8E",
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

});

export default Total
