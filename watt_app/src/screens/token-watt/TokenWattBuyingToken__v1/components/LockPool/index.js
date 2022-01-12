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
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import EStyleSheet from "react-native-extended-stylesheet";
import { convertorNumber } from "../../../../../helpers/convertor";
import moment from "moment";
import caseWords from "../../../../../helpers/caseWords";

class LockPool extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      backTime: null
    };


    this.timer = null;
  }

  componentDidMount = () => {
    this.startTimer();
  }
  componentWillUnmount = () => {
    clearTimeout(this.timer);
  }

  startTimer = async () => {
    const { endTimeStamp } = this.props;
    const currentTimeStamp = Date.now();
    const backTime = Math.abs(currentTimeStamp - endTimeStamp);

    await this.setState({ backTime });

    this.timer = setTimeout(async () => {
      await this.startTimer();
    }, (60 * 1000));
  }


  _timerDay = () => {
    return Math.floor((this.state.backTime / 1000) / 86400);
  }

  render() {
    const {
      wattInfo,

      routeTokenWattP2PPool,
      openBounty,
      buyToken
    } = this.props;
    const {
      backTime
    } = this.state;

    return (
      <View style={styles.root}>

        <Text style={styles.smallTitle}>
          { allTranslations(localization.tokenWattBuyingToken.lockPool.lockPool) }
        </Text>

        <Text style={styles.balanceUsd}>
          { convertorNumber(wattInfo.wattUsd, 2, '.') } USD
        </Text>

        <Text style={[styles.smallTitle, { marginTop: 12 }]}>
          { allTranslations(localization.tokenWattBuyingToken.lockPool.coins) }
        </Text>

        <Text style={styles.balanceWatt}>
          { convertorNumber(wattInfo.wattHold, 2, ',') } WATT
        </Text>

        <View style={styles.container}>

          <View style={styles.row}>
            <Text style={styles.rowTitle}>
              { allTranslations(localization.tokenWattBuyingToken.lockPool.completeDefrostPoolWillOccur) }
            </Text>

            <View style={styles.rowItems}>
              <View style={styles.rowItem}>
                <Text style={styles.rowItemTitle}>{ this._timerDay() }</Text>
                <Text style={styles.rowItemValue}>{ caseWords(this._timerDay(), [
                  allTranslations(localization.common.days.day),
                  allTranslations(localization.common.days.ofDay),
                  allTranslations(localization.common.days.days),
                ]) }</Text>
              </View>
              <View style={styles.rowItem}>
                <Text style={styles.rowItemTitle}>{ moment(backTime || new Date()).format('HH') }</Text>
                <Text style={styles.rowItemValue}>{ caseWords(moment(backTime).format('HH'), [
                  allTranslations(localization.common.hourse.hour),
                  allTranslations(localization.common.hourse.hours),
                  allTranslations(localization.common.hourse.hoursLong),
                ]) }</Text>
              </View>
              <View style={styles.rowItem}>
                <Text style={styles.rowItemTitle}>{ moment(backTime || new Date()).format('mm') }</Text>
                <Text style={styles.rowItemValue}>{ caseWords(moment(backTime).format('mm'), [
                  allTranslations(localization.common.minutes.minute),
                  allTranslations(localization.common.minutes.minutes),
                  allTranslations(localization.common.minutes.minutesLong),
                ]) }</Text>
              </View>
            </View>
          </View>

          <View style={styles.separate}/>

          <View style={styles.thawed}>
            <Text style={styles.thawedLabel}>
              { allTranslations(localization.tokenWattBuyingToken.lockPool.thawed) }:
            </Text>
            <Text style={styles.thawedValue}>
              0 WATT
            </Text>
          </View>

        </View>

        <View style={styles.controls}>
          <Button
            label={allTranslations(localization.common.receive)}
            style={styles.control}
            labelStyle={styles.controlLabel}
            onPress={buyToken}
          />
        </View>

        {
          Boolean(false) && (
            <View style={styles.controls}>
              <Button
                label={allTranslations(localization.tokenWattBuyingToken.lockPool.bounty)}
                style={styles.control}
                labelStyle={styles.controlLabel}
                onPress={openBounty}
              />
              <Button
                label={allTranslations(localization.tokenWattBuyingToken.lockPool.p2pPool)}
                style={styles.control}
                labelStyle={styles.controlLabel}
                onPress={routeTokenWattP2PPool}
              />
            </View>
          )
        }

      </View>
    );
  }
}

const styles = EStyleSheet.create({
  root: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,

    backgroundColor: "white",

    padding: 16
  },

  smallTitle: {
    fontSize: 13,
    lineHeight: 16,
    color: "#8E8E8E",
    textAlign: "center",
  },

  balanceUsd: {
    fontSize: 30,
    lineHeight: 36,
    color: "#10B879",
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8
  },
  balanceWatt: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "500",
    color: "#282828",
    textAlign: "center",
    marginTop: 8
  },

  container: {
    backgroundColor: "#F7F7F7",
    borderRadius: 14,
    marginTop: 16,
    padding: 16
  },

  row: {
    flexDirection: "row",
    alignItems: "center",

    "@media (max-width: 400)": {
      flexDirection: "column",
      justifyContent: "center"
    }
  },
  rowTitle: {
    fontSize: 13,
    lineHeight: 20,
    color: "#8E8E8E",
    flex: 1,

    "@media (max-width: 400)": {
      marginBottom: 12
    }
  },
  rowItems: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -12
  },
  rowItem: {
    width: 64,
    height: 60,
    borderRadius: 14,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",

    marginLeft: 12
  },
  rowItemTitle: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "500",
    color: "black",
    textAlign: "center",
  },
  rowItemValue: {
    fontSize: 14,
    lineHeight: 17,
    textAlign: "center",
    color: "black"
  },

  separate: {
    height: 2,
    backgroundColor: "#F2F3F4",
    marginVertical: 11
  },

  thawed: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  thawedLabel: {
    fontSize: 13,
    lineHeight: 20,
    color: "#8E8E8E",
  },
  thawedValue: {
    textAlign: "right",
    fontSize: 14,
    lineHeight: 20,
    color: "#282828",
    fontWeight: "500"
  },

  controls: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -12,
    marginTop: 12
  },
  control: {
    flex: 1,
    marginLeft: 12,
    height: 36,
    paddingVertical: 0,
    borderRadius: 8
  },
  controlLabel: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "normal"
  }
});

export default LockPool
