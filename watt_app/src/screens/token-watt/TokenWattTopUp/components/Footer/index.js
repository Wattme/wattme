import React from "react";
import {
  View,
  StyleSheet, TouchableOpacity, Linking,
} from "react-native/index";
import {
  Text,
  Button, Checkbox,
} from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import urls from "../../../../../constants/urls";
import { BlockInformation } from "../../../../../components";

class Footer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isConfirm: false
    };
  }

  _linkPrivacyPolicy = async () => {
    await Linking.openURL(urls.wattPurchaseAgreement);
  }

  render() {
    const {
      walletBusd,

      onCancel,
      onPrepareOrder
    } = this.props;
    const {
      isConfirm
    } = this.state;

    return (
      <View>

        <Text style={styles.message}>
          { allTranslations(localization.tokenWattTopUp.footer.message) }
        </Text>


        <View style={styles.checkboxContainer}>
          <TouchableOpacity style={[styles.confirmItem, {marginTop: 0}]} onPress={() => this.setState({ isConfirm: !isConfirm })} activeOpacity={0.8}>
            <View style={styles.confirmItemCheckBox}>
              <Checkbox value={isConfirm} size={32} onValueChange={() => this.setState({ isConfirm: !isConfirm })}/>
            </View>
            <TouchableOpacity activeOpacity={0.8} onPress={this._linkPrivacyPolicy} style={{flex: 1}}>
              <Text style={styles.confirmItemLink}>
                { allTranslations(localization.tokenWattTopUp.footer.labelConfirm) }
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        <View style={styles.controls}>

          <Button
            label={allTranslations(localization.common.cancel)}
            style={styles.control}
            labelStyle={styles.controlLabel}
            color="secondary"
            onPress={onCancel}
          />

          <Button
            label={allTranslations(localization.common.further )}
            style={styles.control}
            labelStyle={styles.controlLabel}
            onPress={onPrepareOrder}
            disabled={Boolean((!isConfirm) || (!walletBusd?.mnemonic))}
          />

        </View>


        {Boolean(!walletBusd?.mnemonic) && (
          <View style={{marginTop: 12}}>
            <BlockInformation
              type="error"
              message={allTranslations(localization.errors.noSeedPhrase)}
            />
          </View>
        )}

      </View>
    );
  }
}

const styles = StyleSheet.create({

  message: {
    fontSize: 14,
    lineHeight: 23,
    textAlign: "center",
    color: "#8E8E8E",

    marginBottom: 24
  },

  controls: {
    flexDirection: "row",
    marginLeft: -12
  },
  control: {
    height: 36,
    paddingVertical: 0,
    flex: 1,
    marginLeft: 12,
    borderRadius: 8
  },
  controlLabel: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "normal"
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    marginBottom: 12
  },
  confirmItemCheckBox: {
    marginRight: 12
  },
  confirmItemLink: {
    flex: 1,
  },

  confirmItem: {
    flexDirection: "row",
    alignItems: "center",
  },

})

export default Footer
