import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text,
  Button
} from "react-native-ui-lib";
import {
  BlurView
} from "../../../../../components";
import {
  Portal
} from "react-native-portalize";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import { getFontFamily } from "../../../../../theme/theme-manager/Text";
import TextInputMask from "react-native-text-input-mask";

class PopUpWithdrawFunds extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      amount: "",
    }
  }

  onClose = () => {

    this.setState({ amount: "" });

    this.props?.onClose();

  }

  render() {
    const {
      open
    } = this.props;

    if (!open) {
      return null
    }

    return (
      <Portal>
        <BlurView style={{ flex: 1 }}>
          <TouchableOpacity style={{ flex: 1 }} activeOpacity={1}>
            <View style={styles.root}>

              <View style={styles.container}>

                <Text style={styles.title}>
                  { allTranslations(localization.tokenWattP2PPool.popUpWithdrawFunds.title) }
                </Text>
                <Text style={styles.message}>
                  { allTranslations(localization.tokenWattP2PPool.popUpWithdrawFunds.message) }
                </Text>

                <View style={styles.info}>
                  <Text style={styles.infoTitle}>
                    { allTranslations(localization.tokenWattP2PPool.myP2PPool.totalAmountFromPool) }
                  </Text>
                  <Text style={styles.infoAmount}>$ 150</Text>
                </View>

                <TextInputMask
                  style={styles.amountInput}
                  mask={"[99999999999999].[99999999]"}
                  keyboardType="decimal-pad"
                  placeholder={allTranslations(localization.tokenWattP2PPool.popUpWithdrawFunds.amountPlaceholder)}
                />

                <View style={styles.controls}>

                  <Button
                    label={allTranslations(localization.common.cancel)}
                    color="secondary"
                    style={styles.control}
                    labelStyle={styles.controlLabel}
                  />

                  <Button
                    label={allTranslations(localization.common.confirm)}
                    style={styles.control}
                    labelStyle={styles.controlLabel}
                  />

                </View>

              </View>

            </View>
          </TouchableOpacity>
        </BlurView>
      </Portal>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 28,
  },
  container: {
    borderRadius: 14,
    backgroundColor: "white",
    padding: 16,
    width: "100%"
  },

  title: {
    fontSize: 25,
    lineHeight: 30,
    fontWeight: "500",
    textAlign: "center",
    color: "#282828",
    marginBottom: 24
  },
  message: {
    fontSize: 16,
    lineHeight: 23,
    color: "#8E8E8E",
    textAlign: "center",
  },

  info: {
    marginTop: 16
  },
  infoTitle: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#8E8E8E"
  },
  infoAmount: {
    marginTop: 8,

    fontSize: 18,
    lineHeight: 21,
    color: "#282828",
    fontWeight: "500",
    textAlign: "center",
  },


  amountInput: {
    marginTop: 16,
    marginHorizontal: 32,

    height: 40,
    backgroundColor: "#F7F7F7",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 0,

    fontSize: 14,
    fontFamily: getFontFamily("normal")
  },

  controls: {
    marginTop: 24,
    flexDirection: "row",
    marginLeft: -12
  },
  control: {
    marginLeft: 12,
    flex: 1,
    height: 36,
    borderRadius: 8,
    paddingVertical: 0,
  },
  controlLabel: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "normal"
  },

});

export default PopUpWithdrawFunds
