import React from "react";
import {
  View,
  StyleSheet
} from "react-native/index";
import {
  Text,
} from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

class SliderAmount extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  _getPositionDarkLine = () => {
    return 69
  }
  _getPositionIndicator = () => {
    return 50
  }

  render() {
    const {
      currentAmountWatt,
      totalAmountFromPool,
    } = this.props;

    return (
      <View>

        <View style={styles.head}>

          <View>
            <Text style={styles.headLabel}>
              { allTranslations(localization.tokenWattTopUp.sliderAmount.totalAmountPool) }
            </Text>
            <Text style={styles.headValue}>
              { totalAmountFromPool }
            </Text>
          </View>

          <View>
            <Text style={[styles.headLabel, {textAlign: "right"}]}>
              { allTranslations(localization.tokenWattTopUp.sliderAmount.remainder) }
            </Text>
            <Text style={[styles.headValue, {textAlign: "right"}]}>
              { currentAmountWatt }
            </Text>
          </View>

        </View>

        <View style={styles.linerContainer}>

          <View style={styles.line}/>
          <View style={[styles.lineDark, { width: this._getPositionDarkLine() }]}/>

          <View style={[styles.indicator, { left: this._getPositionIndicator() }]}>
            <Text style={styles.indicatorLabel}>
              80%
            </Text>
          </View>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18
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
