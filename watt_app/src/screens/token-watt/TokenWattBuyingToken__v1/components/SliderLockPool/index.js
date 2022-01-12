import React from "react";
import {
  View,
  Dimensions,
  StyleSheet
} from "react-native/index";
import {
  Text,
} from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import { convertorNumber } from "../../../../../helpers/convertor";

const {
  width
} = Dimensions.get("window");

class SliderAmount extends React.PureComponent {
  _getPositionDarkLine = () => {
    const {
      currentAmountWatt,
      totalAmountFromPool
    } = this.props;

    if (totalAmountFromPool === 0) {
      return 0
    }

    const widthLinePercent = (width - 24 - 32) / 100;
    const percentageDifference = 100 - (100 - (currentAmountWatt / totalAmountFromPool) * 100);

    return ( widthLinePercent * percentageDifference )
  }
  _getPositionIndicator = () => {
    const {
      currentAmountWatt,
      totalAmountFromPool
    } = this.props;

    if (totalAmountFromPool === 0) {
      return 0
    }

    const widthLinePercent = (width - 24 - 32) / 100;
    const percentageDifference = 100 - (100 - (currentAmountWatt / totalAmountFromPool) * 100);

    return ( widthLinePercent * percentageDifference ) - 20
  }
  _getLabelIndicator = () => {
    const {
      currentAmountWatt,
      totalAmountFromPool
    } = this.props;

    if (totalAmountFromPool === 0) {
      return 0
    }

    return 100 - (100 - (currentAmountWatt / totalAmountFromPool) * 100);
  }

  render() {
    const {
      label,
      currentAmountWatt,
      totalAmountFromPool
    } = this.props;

    return (
      <View style={styles.root}>

        <View style={styles.head}>

          <View>
            <Text style={styles.headLabel}>
              { label || " " }
            </Text>
            <Text style={styles.headValue}>
              { convertorNumber(totalAmountFromPool, 0) } WATT
            </Text>
          </View>

          <View>
            <Text style={[styles.headLabel, {textAlign: "right"}]}>
              { allTranslations(localization.tokenWattTopUp.sliderAmount.remainder) }
            </Text>
            <Text style={[styles.headValue, {textAlign: "right"}]}>
              { convertorNumber((totalAmountFromPool - currentAmountWatt), 0) } WATT
            </Text>
          </View>

        </View>

        <View style={styles.linerContainer}>

          <View style={styles.line}/>
          <View style={[styles.lineDark, { width: this._getPositionDarkLine() }]}/>

          <View style={[styles.indicator, { left: this._getPositionIndicator() }]}>
            <Text style={styles.indicatorLabel}>
              {convertorNumber(this._getLabelIndicator(), 0)}%
            </Text>
          </View>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  root: {
    backgroundColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,
    padding: 16
  },

  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 21
  },
  headLabel: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E",
    marginBottom: 6
  },
  headValue: {
    fontSize: 14,
    lineHeight: 17,
    color: "#282828",
    fontWeight: "500"
  },

  linerContainer: {
    position: "relative"
  },
  line: {
    backgroundColor: "#F6D962",
    height: 6,
    borderRadius: 35,
  },
  lineDark: {
    backgroundColor: "#282828",
    height: 6,
    borderRadius: 35,
    position: "absolute",
    bottom: 0,
    left: 0
  },

  indicator: {
    position: "absolute",
    top: -9,
    height: 24,

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#282828",
    borderRadius: 14,

    // backgroundColor: "transparent",
    backgroundColor: "#F6D962",

    paddingHorizontal: 8,

    alignItems: "center",
    justifyContent: "center"
  },
  indicatorLabel: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "500",
    color: "#282828",
    textAlign: "center"
  },

});

export default SliderAmount
