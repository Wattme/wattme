import React from "react";
import {
  View,
  StyleSheet
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

class AdditionalInformation extends React.PureComponent {
  render() {
    const {
      account
    } = this.props;

    return (
      <View style={styles.root}>

        {false && (
          <View style={[styles.field, {marginTop: 0}]}>
            <Text style={styles.fieldLabel}>
              { allTranslations(localization.accountProfileMe.additionalInformation.dateBirth) }
            </Text>
            <Text style={styles.fieldValue}>

            </Text>
          </View>
        )}

        <View style={[styles.field, {marginTop: 0}]}>
          <Text style={styles.fieldLabel}>
            { allTranslations(localization.accountProfileMe.additionalInformation.country) }
          </Text>
          <Text style={styles.fieldValue}>
            { account.country }
          </Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>
            { allTranslations(localization.accountProfileMe.additionalInformation.city) }
          </Text>
          <Text style={styles.fieldValue}>
            { account.city }
          </Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>
            { allTranslations(localization.accountProfileMe.additionalInformation.phone) }
          </Text>
          <Text style={styles.fieldValue}>
            { account.phone }
          </Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>
            { allTranslations(localization.accountProfileMe.additionalInformation.telegram) }
          </Text>
          <Text style={styles.fieldValue}>
            { account.telegramUsername }
          </Text>
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

    padding: 16
  },

  field: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 12,

    borderRadius: 14,
    backgroundColor: "#F7F7F7"
  },
  fieldLabel: {
    fontSize: 13,
    lineHeight: 16,
    color: "#282828"
  },
  fieldValue: {
    fontSize: 16,
    lineHeight: 19,
    color: "#8E8E8E",
    textAlign: "right"
  },
});

export default AdditionalInformation
