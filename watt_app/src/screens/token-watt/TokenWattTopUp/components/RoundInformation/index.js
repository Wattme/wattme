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
import EStyleSheet from "react-native-extended-stylesheet";
import { convertorNumber } from "../../../../../helpers/convertor";

class RoundInformation extends React.PureComponent {
  render() {
    const {
      priceWattToken
    } = this.props;

    return (
      <View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>
            { allTranslations(localization.common.price) }
          </Text>
          <Text style={styles.rowValue}>$ { convertorNumber(priceWattToken, 2, ',') }</Text>
        </View>

        {
          Boolean(false) && (
            <View style={styles.timeEndContainer}>
              <Text style={styles.timeEndContainerLabel}>
                { allTranslations(localization.tokenWattTopUp.roundInformation.untilEndRound, {
                  round: 1
                }) }
              </Text>
              <View style={styles.timeEndContainerDates}>
                <View style={styles.timeEndContainerDate}>
                  <Text style={styles.timeEndContainerDateLabel} numberOfLines={1}>11</Text>
                  <Text style={styles.timeEndContainerDateValue} numberOfLines={1}>часы</Text>
                </View>
                <View style={styles.timeEndContainerDate}>
                  <Text style={styles.timeEndContainerDateLabel} numberOfLines={1}>47</Text>
                  <Text style={styles.timeEndContainerDateValue} numberOfLines={1}>минуты</Text>
                </View>
                <View style={styles.timeEndContainerDate}>
                  <Text style={styles.timeEndContainerDateLabel} numberOfLines={1}>00</Text>
                  <Text style={styles.timeEndContainerDateValue} numberOfLines={1}>секунды</Text>
                </View>
              </View>
            </View>
          )
        }

        <View style={[styles.row, {marginTop: 12}]}>
          <Text style={styles.rowLabel}>
            { allTranslations(localization.tokenWattTopUp.roundInformation.startNextRound) }
          </Text>
          <Text style={[styles.rowValue, styles.rowValueSmall]}>15 января 2021</Text>
        </View>

      </View>
    );
  }
}

const styles = EStyleSheet.create({

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  rowLabel: {
    flex: 1,
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E",
  },
  rowValue: {
    fontSize: 18,
    lineHeight: 21,
    color: "#282828",
    textAlign: "right"
  },
  rowValueSmall: {
    fontSize: 16,
    lineHeight: 19
  },

  timeEndContainer: {
    flexDirection: "row",
    alignItems: "center",

    padding: 16,
    borderRadius: 14,
    backgroundColor: "#F7F7F7",

    marginTop: 12,
    marginBottom: 12,

    "@media (max-width: 400)": {
      flexDirection: "column"
    }
  },
  timeEndContainerLabel: {
    fontSize: 16,
    lineHeight: 23,
    color: "#282828",
    flex: 1,

    "@media (max-width: 400)": {
      marginBottom: 12
    }
  },
  timeEndContainerDates: {
    flexDirection: "row",
    marginLeft: -12
  },
  timeEndContainerDate: {
    width: 64,
    height: 60,
    borderRadius: 14,
    backgroundColor: "white",

    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,

    padding: 6
  },
  timeEndContainerDateLabel: {
    fontSize: 18,
    lineHeight: 21,
    color: "#000000",
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 8
  },
  timeEndContainerDateValue: {
    fontSize: 14,
    lineHeight: 17,
    color: "#000000",
    textAlign: "center"
  },

});

export default RoundInformation
