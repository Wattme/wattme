import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import EStyleSheet from "react-native-extended-stylesheet";
import moment from "moment";
import caseWords from "../../../../../helpers/caseWords";

const { width } = Dimensions.get("window");

class Tariff extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {

      backTime: null,

      open: false
    };

    this.timeOutUpdateBackTime = null;
  }

  componentWillUnmount = () => {
    clearTimeout(this.timeOutUpdateBackTime);
  }

  updateResetQualification = async () => {
    const { endTimeStamp } = this.props;
    const currentTimeStamp = Date.now();
    const backTime = Math.abs(currentTimeStamp - endTimeStamp);

    await this.setState({ backTime });

    this.timeOutUpdateBackTime = setTimeout(async () => {
      await this.updateResetQualification();
    }, (60 * 1000));
  }

  render() {
    const {
      backTime
    } = this.state;
    const {
      energyLevel,
      paketName
    } = this.props;

    return (
      <View style={styles.root}>

        <View style={styles.rootHead}>

          <Text style={styles.title}>
            { allTranslations(localization.accountBackOffice.tariff.title) }
          </Text>

          <View style={styles.tariff}>
            <Text style={styles.tariffTitle}>
              { allTranslations(localization.accountBackOffice.tariff.currentTariff) }
            </Text>

            <View style={styles.tariffValue}>
              <Text style={styles.tariffValueLabel}>
                { paketName }
              </Text>
            </View>
          </View>

        </View>

        <View style={[styles.rootSeparate]}/>

        <View style={styles.rootBody}>

          <View style={styles.time}>

            <Text style={styles.timeTitle}>
              { allTranslations(localization.accountBackOffice.tariff.messageStartBuyTariff) }
            </Text>

            <View style={styles.timeBlocks}>
              <View style={styles.timeBlock}>
                <Text style={styles.timeBlockLabel}>{ moment(backTime || new Date()).format('DD') }</Text>
                <Text style={styles.timeBlockValue}>
                  { caseWords(moment(backTime).format('DD'), [
                      allTranslations(localization.common.days.day),
                      allTranslations(localization.common.days.ofDay),
                      allTranslations(localization.common.days.days),
                    ]) }
                </Text>
              </View>
              <View style={styles.timeBlock}>
                <Text style={styles.timeBlockLabel}>
                  { moment(backTime || new Date()).format('HH') }
                </Text>
                <Text style={styles.timeBlockValue}>
                  { caseWords(moment(backTime).format('HH'), [
                      allTranslations(localization.common.hourse.hour),
                      allTranslations(localization.common.hourse.hours),
                      allTranslations(localization.common.hourse.hoursLong),
                    ]) }
                </Text>
              </View>
              <View style={styles.timeBlock}>
                <Text style={styles.timeBlockLabel}>
                  { moment(backTime || new Date()).format('mm') }
                </Text>
                <Text style={styles.timeBlockValue}>
                  { caseWords(moment(backTime).format('mm'), [
                      allTranslations(localization.common.minutes.minute),
                      allTranslations(localization.common.minutes.minutes),
                      allTranslations(localization.common.minutes.minutesLong),
                    ]) }
                </Text>
              </View>
            </View>

          </View>

        </View>

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
  rootHead: {},
  rootSeparate: {
    marginVertical: 12,
    height: 2,
    backgroundColor: "#F9F9F9"
  },
  rootBody: {},

  title: {
    fontSize: 18,
    lineHeight: 21,
    color: "#000000",
    fontWeight: "500",
    marginBottom: 12
  },

  tariff: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  tariffTitle: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E"
  },
  tariffValue: {
    backgroundColor: "#282828",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4.5
  },
  tariffValueLabel: {
    fontSize: 16,
    lineHeight: 19,
    color: "#F6D962",
    fontWeight: "500"
  },

  time: {
    alignItems: "center",

    "@media (min-width: 400)": {
      flexDirection: "row"
    }
  },
  timeTitle: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: "#282828",
    marginRight: 32,

    "@media (max-width: 400)": {
      textAlign: "center",
      marginRight: 0,
      marginBottom: 12
    }
  },
  timeBlocks: {
    flexDirection: "row",
    marginLeft: -12,
  },
  timeBlock: {
    height: 60,
    width: 68,
    backgroundColor: "#F7F7F7",
    borderRadius: 14,
    marginLeft: 12,

    alignItems: "center",
    justifyContent: "center"
  },
  timeBlockValue: {
    fontSize: 14,
    lineHeight: 17,
    color: "#000000",
    textAlign: "center"
  },
  timeBlockLabel: {
    fontSize: 20,
    lineHeight: 24,
    color: "#000000",
    fontWeight: "500",
    textAlign: "center"
  },
});

export default Tariff
