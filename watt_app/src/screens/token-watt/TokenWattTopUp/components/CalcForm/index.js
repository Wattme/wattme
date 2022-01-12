import React from "react";
import {
  View,
  TextInput,
  StyleSheet
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import TextInputMask from "react-native-text-input-mask";
import { convertorNumber } from "../../../../../helpers/convertor";

class CalcForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      amount: "",
      amountWatt: ""
    };
  }

  changeAmount = (amount) => {
    this.setState({ amount });
  }

  _calcGetWatt = () => {
    const { amount } = this.state;

    if (!amount) {
      return 0
    }

    const numberAmount = Number.parseFloat(amount);

    return numberAmount / (+this.props.priceWattToken || 0)
  }

  render() {
    const {
      amount,
      amountWatt
    } = this.state;

    return (
      <View>

        <TextInputMask
          value={amount}
          style={styles.input}
          mask={"[99999999999999].[99999999]"}
          placeholder={allTranslations(localization.tokenWattTopUp.calcForm.inputPlaceholder)}
          placeholderTextColor="#8E8E8E"
          keyboardType="decimal-pad"

          onChangeText={this.changeAmount}
        />

        <View style={{ marginTop: 16 }}/>

        <Text style={styles.calcLabel}>
          { allTranslations(localization.tokenWattTopUp.calcForm.youGet) }
        </Text>
        <Text style={styles.calcValue}>{convertorNumber(this._calcGetWatt(), 2, '.')} WATT</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  input: {
    height: 40,
    borderRadius: 14,
    backgroundColor: "#F7F7F7",

    paddingVertical: 0,
    paddingHorizontal: 16
  },


  calcLabel: {
    fontSize: 13,
    lineHeight: 16,
    color: "#8E8E8E",
    marginBottom: 4,
    textAlign: "center"
  },
  calcValue: {
    fontSize: 18,
    lineHeight: 21,
    color: "#282828",
    fontWeight: "500",
    textAlign: "center"
  },

});

export default CalcForm
