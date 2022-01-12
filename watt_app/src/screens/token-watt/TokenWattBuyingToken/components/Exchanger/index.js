import React from "react";
import {
  View,
  Image,
  StyleSheet
} from "react-native/index";
import {
  Text,
  Button
} from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import { getIconCurrency } from "../../../../../common/Images";
import { convertorNumber } from "../../../../../helpers/convertor";


class Exchanger extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      maxWidthRowRight: 0
    }
  }


  initRowRight = async ({ nativeEvent }) => {
    const width = nativeEvent?.layout?.width || 0;

    if (this.state.maxWidthRowRight >= width) {
      return null
    }

    await this.setState({ maxWidthRowRight: width })
  }

  render() {
    const {
      maxWidthRowRight
    } = this.state;
    const {
      exchanger,

      routeExchanger
    } = this.props;

    return (
      <View style={styles.root}>

        <Text style={styles.title}>
          { allTranslations(localization.tokenWattBuyingToken.exchanger.title) }
        </Text>

        <View style={{marginTop: 24}}/>

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Image source={{uri: getIconCurrency("WATT")}} style={styles.rowLeftImage}/>
            <Text style={styles.rowLeftLabel}>Pool WATT</Text>
          </View>
          <View style={[styles.rowRight, {minWidth: maxWidthRowRight}]} onLayout={this.initRowRight}>
            <Text style={styles.rowRightLabel}>
              {convertorNumber((exchanger?.balanceWatt || 0), 4, ',')}
            </Text>
          </View>
        </View>

        <View style={{marginTop: 12}}/>

        <View style={styles.row}>
          <View style={styles.rowLeft}>
            <Image source={{uri: getIconCurrency("BUSD")}} style={styles.rowLeftImage}/>
            <Text style={styles.rowLeftLabel}>Pool BUSD</Text>
          </View>
          <View style={[styles.rowRight, {minWidth: maxWidthRowRight}]} onLayout={this.initRowRight}>
            <Text style={styles.rowRightLabel}>
              {convertorNumber((exchanger?.balanceBusd || 0), 4, ',')}
            </Text>
          </View>
        </View>

        <View style={{marginTop: 16}}/>

        <Button
          color="secondary"
          label={allTranslations(localization.tokenWattBuyingToken.exchanger.exchange)}
          style={styles.buttonExchange}
          labelStyle={styles.buttonExchangeLabel}
          onPress={routeExchanger}
        />

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

    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16
  },

  title: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828",
    fontWeight: "500"
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  rowLeft: {
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8
  },
  rowLeftImage: {
    width: 24,
    height: 24,
    marginRight: 8
  },
  rowLeftLabel: {
    fontSize: 14,
    lineHeight: 17,
    fontWeight: "500",
    color: "#000000"
  },
  rowRight: {
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 12,
    borderRadius: 8
  },
  rowRightLabel: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "500",
    textAlign: "right",
    color: "#808080"
  },

  buttonExchange: {
    height: 36,
    borderRadius: 8,
    paddingVertical: 0
  },
  buttonExchangeLabel: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "normal"
  },
});

export default Exchanger
