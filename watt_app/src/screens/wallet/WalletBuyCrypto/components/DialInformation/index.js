import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text,
  Button
} from "react-native-ui-lib";
import { Portal } from "react-native-portalize";
import localization from "../../../../../localization/localization";
import allTranslations from "../../../../../localization/allTranslations";
import { convertorNumber } from "../../../../../helpers/convertor";
import { getFontFamily } from "../../../../../theme/theme-manager/Text";
import { BlurView } from "../../../../../components";


class DialInformation extends React.PureComponent {
  render() {
    const {
      open,
      dialInformation,

      onBuy,
      onClose
    } = this.props;

    if (!open) {
      return null
    }

    return (
      <Portal>
        <BlurView style={styles.blurView}>

          <TouchableOpacity activeOpacity={1} style={styles.root}>

            <View style={styles.body}>

              <View style={styles.row}>
                <Text style={styles.title}>
                  { allTranslations(localization.walletBuyCrypto.dialInformation.amount) }
                </Text>
                <Text style={styles.value}>
                  { convertorNumber((dialInformation?.quoteCurrencyAmount || 0), 6, ',') } { (dialInformation?.quoteCurrencyCode||'').toUpperCase() }
                </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.title}>
                  { allTranslations(localization.walletBuyCrypto.dialInformation.commission) }
                </Text>
                <Text style={styles.value}>
                  { convertorNumber(((dialInformation.feeAmount + dialInformation.networkFeeAmount) || 0), 2 , ',') } $
                </Text>
              </View>

              <View style={styles.controls}>
                <Button style={styles.control} labelStyle={{fontWeight: "normal"}} label={allTranslations(localization.common.close)} size="small" color="secondary" onPress={onClose}/>
                <Button style={styles.control} labelStyle={{fontWeight: "normal"}} label={allTranslations(localization.common.route)} size="small" onPress={onBuy}/>
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
    paddingHorizontal: 28,
    paddingBottom: 24,

    justifyContent: "center",
    alignItems: "center",
  },
  blurView: {
    flex: 1,
    backgroundColor: "rgba(40, 40, 40, 0.4)",

    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  body: {
    width: "100%",
    marginHorizontal: 28,
    backgroundColor: "#F7F7F7",
    borderRadius: 14,
    padding: 16
  },

  row: {
    marginBottom: 16
  },
  title: {
    fontSize: 16,
    lineHeight: 19,
    color: "#8E8E8E",
    marginBottom: 8,
    textAlign: "center"
  },
  value: {
    fontSize: 18,
    lineHeight: 21,
    textAlign: "center",
    color: "#282828",
    fontWeight: "500"
  },

  controls: {
    marginTop: 8,
    marginLeft: -12,

    flexDirection: "row",
    alignItems: "center",
  },
  control: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    lineHeight: 19,
    fontFamily: getFontFamily("normal")
  },
});

export default DialInformation
