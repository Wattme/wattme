import React from "react";
import {
  View,
  StyleSheet,
} from "react-native/index";
import {
  Text,
  Button,
} from "react-native-ui-lib";
import { convertorNumber } from "../../../../../helpers/convertor";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import EStyleSheet from "react-native-extended-stylesheet";
import caseWords from "../../../../../helpers/caseWords";

class FrozenFunds extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      timer: 0
    };

    this.timeOutTimer = null;
  }

  componentDidMount = () => {
    this.startCountdown();
  }
  componentWillUnmount = () => {
    clearTimeout(this.timeOutTimer);
  }

  // Запуск обратного отсчета
  startCountdown = () => {
    clearTimeout(this.timeOutTimer);

    const endTimestamp = Number(this.props.defrostStartTime) * 1000;
    const currentTimestamp = Date.now();
    const differenceTimestamp = endTimestamp - currentTimestamp;

    this.setState({
      timer: differenceTimestamp
    });

    this.timeOutTimer = setTimeout(() => {
      this.startCountdown();
    }, (60 * 1000));
  }

  // Логика получение данных для таймера
  _dayValue = () => {
    const timer = this.state.timer;
    return Math.floor(timer / (1000 * 60 * 60 * 24));
  };
  _dayLabel = () => {
    const day = this._dayValue();

    return caseWords(day, [
      allTranslations(localization.common.days.day),
      allTranslations(localization.common.days.days),
      allTranslations(localization.common.days.ofDay),
    ]);
  };
  _hoursValue = () => {
    const timer = this.state.timer;
    const days = ((this._dayValue()) * 1000 * 60 * 60 * 24);
    return Math.floor((timer - days) / (1000 * 60 * 60));
  };
  _hoursLabel = () => {
    const hours = this._hoursValue();

    return caseWords(hours, [
      allTranslations(localization.common.hourse.hour),
      allTranslations(localization.common.hourse.hours),
      allTranslations(localization.common.hourse.hoursLong),
    ]);
  };
  _minutesValue = () => {
    const timer = this.state.timer;
    const days = ((this._dayValue()) * 1000 * 60 * 60 * 24);
    const hours = ((this._hoursValue()) * 1000 * 60 * 60)

    return Math.floor((timer - days - hours) / (1000 * 60));
  };
  _minutesLabel = () => {
    const minutes = this._minutesValue();

    return caseWords(minutes, [
      allTranslations(localization.common.minutes.minute),
      allTranslations(localization.common.minutes.minutes),
      allTranslations(localization.common.minutes.minutesLong),
    ]);
  };
  // ----------------------------------

  render() {
    const {
      frozenFunds,

      routeFrozenFundsTopUp
    } = this.props;

    return (
      <View style={styles.root}>

        <View style={styles.wattBalance}>
          <View style={styles.wattBalanceLabelContent}>
            <Text style={styles.wattBalanceLabel}>
            {convertorNumber((frozenFunds?.wattHold || 0), 4, ",")} WATT
          </Text>
          </View>
        </View>

        <View style={{ marginTop: 12 }} />

        <View style={styles.usdBalance}>
          <Text style={styles.usdBalanceLabel}>
              {convertorNumber((frozenFunds?.usdHold || 0), 2, ",")} USD
            </Text>
        </View>

        <View style={{ marginTop: 12 }} />

        <View style={styles.timerContainer}>
          <View style={styles.timerHead}>
            <View style={styles.timerHeadLeft}>
              <Text style={styles.timerHeadLabel}>
                {allTranslations(localization.tokenWattBuyingToken.frozenFunds.poolDefrostWillStart)}
              </Text>
            </View>
            <View style={styles.timerHeadTimes}>
              <View style={styles.timerHeadTime}>
                <Text style={styles.timerHeadTimeLabel}>{this._dayValue()}</Text>
                <Text style={styles.timerHeadTimeValue}>{this._dayLabel()}</Text>
              </View>
              <View style={styles.timerHeadTime}>
                <Text style={styles.timerHeadTimeLabel}>{this._hoursValue()}</Text>
                <Text style={styles.timerHeadTimeValue}>{this._hoursLabel()}</Text>
              </View>
              <View style={styles.timerHeadTime}>
                <Text style={styles.timerHeadTimeLabel}>{this._minutesValue()}</Text>
                <Text style={styles.timerHeadTimeValue}>{this._minutesLabel()}</Text>
              </View>
            </View>
          </View>
          <View style={styles.timerSeparate} />
          <View style={styles.timerFooter}>
            <Text style={styles.timerFooterLabel}>
              {allTranslations(localization.tokenWattBuyingToken.frozenFunds.thawed)}:
            </Text>
            <Text style={styles.timerFooterValue}>0 WATT</Text>
          </View>
        </View>

        <View style={{ marginTop: 12 }} />

        <Button
          style={styles.buttonTopUp}
          labelStyle={styles.buttonTopUpLabel}
          label={allTranslations(localization.common.topUp)}
          onPress={routeFrozenFundsTopUp}
        />

      </View>
    );
  }
}

const styles = EStyleSheet.create({
  root: {
    backgroundColor: "white",

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,

    padding: 16,
  },

  wattBalance: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  wattBalanceLabelContent: {
    paddingHorizontal: 10,
    paddingVertical: 8.5,
    backgroundColor: "#F7F7F7",
    borderRadius: 8,
  },
  wattBalanceLabel: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "500",
    color: "#323232",
  },

  usdBalance: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  usdBalanceLabel: {
    fontSize: 14,
    lineHeight: 17,
    color: "#10B879",
  },

  timerContainer: {
    backgroundColor: "#F7F7F7",
    borderRadius: 14,
    padding: 16,
  },
  timerHead: {
    flexDirection: "row",
    alignItems: "center",

    "@media (max-width: 400)": {
      flexDirection: "column"
    }
  },
  timerHeadLeft: {
    maxWidth: 120,
    "@media (max-width: 400)": {
      maxWidth: "auto"
    }
  },
  timerHeadLabel: {
    fontSize: 13,
    lineHeight: 20,
    color: "#8E8E8E",
    marginRight: 12,

    "@media (max-width: 400)": {
      marginRight: 0,
      marginBottom: 12
    }
  },
  timerHeadTimes: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -12,
  },
  timerHeadTime: {
    height: 60,
    minWidth: 64,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    marginLeft: 12,
  },
  timerHeadTimeLabel: {
    fontSize: 18,
    lineHeight: 21,
    color: "#000000",
    fontWeight: "500",
    textAlign: "center",

    marginBottom: 8,
  },
  timerHeadTimeValue: {
    fontSize: 14,
    lineHeight: 17,
    color: "#000000",
    textAlign: "center",
  },
  timerSeparate: {
    marginVertical: 12,
    height: 2,
    backgroundColor: "#F2F3F4",
  },
  timerFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timerFooterLabel: {
    fontSize: 13,
    lineHeight: 20,
    color: "#8E8E8E"
  },
  timerFooterValue: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    color: "#282828",
    textAlign: "right",
  },

  buttonTopUp: {
    height: 36,
    borderRadius: 8,
    paddingVertical: 0,
  },
  buttonTopUpLabel: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "normal",
  },
});

export default FrozenFunds;
