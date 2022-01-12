import React from "react";
import {
  View,
  Image,
  StyleSheet, TouchableOpacity,
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  CommonArrowBottom as CommonArrowBottomIcon
} from "../../../../../assets/icons";
import { imageUserQualifications } from "../../../../../common/UserQualifications";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import EStyleSheet from "react-native-extended-stylesheet";
import moment from "moment";
import caseWords from "../../../../../helpers/caseWords";

class CurrentQualifications extends React.PureComponent {
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
      open,
      backTime
    } = this.state;
    const {
      leaderBonus,
      lowTotal,
      maxEnergyRank,
      maxEnergyRankLevel,
      currentEnergyValue
    } = this.props;

    return (
      <View style={styles.card}>

        <View style={styles.head}>

          <View style={styles.qualificationContainer}>
            <Image
              source={imageUserQualifications(0)}
              style={{ width: "100%", height: "100%" }}
            />
          </View>

          <Text style={styles.qualificationName}>
            { allTranslations(localization.accountQualifications.currentQualifications.title) }
          </Text>

          <TouchableOpacity style={styles.arrowContainer} onPress={() => this.setState({ open: !open })}>
            <View style={{
              transform: [
                { rotate: open ? '180deg' : '0deg' }
              ]
            }}>
              <CommonArrowBottomIcon/>
            </View>
          </TouchableOpacity>

        </View>

        <View style={styles.body}>

          <Text style={styles.bodyMessage}>
            { allTranslations(localization.accountQualifications.currentQualifications.messageEndCurrentQualification) }
          </Text>

          <View style={styles.bodyInfoItems}>
            <View style={styles.bodyInfoItem}>
              <Text style={styles.bodyInfoItemTitle}>
                { moment(backTime || new Date()).format('DD') }
              </Text>
              <Text style={styles.bodyInfoItemValue}>
                {
                  caseWords(moment(backTime).format('DD'), [
                    allTranslations(localization.common.days.day),
                    allTranslations(localization.common.days.ofDay),
                    allTranslations(localization.common.days.days),
                  ])
                }
              </Text>
            </View>
            <View style={styles.bodyInfoItem}>
              <Text style={styles.bodyInfoItemTitle}>
                { moment(backTime || new Date()).format('HH') }
              </Text>
              <Text style={styles.bodyInfoItemValue}>
                {
                  caseWords(moment(backTime).format('HH'), [
                    allTranslations(localization.common.hourse.hour),
                    allTranslations(localization.common.hourse.hours),
                    allTranslations(localization.common.hourse.hoursLong),
                  ])
                }
              </Text>
            </View>
            <View style={styles.bodyInfoItem}>
              <Text style={styles.bodyInfoItemTitle}>
                { moment(backTime || new Date()).format('mm') }
              </Text>
              <Text style={styles.bodyInfoItemValue}>
                {
                  caseWords(moment(backTime).format('mm'), [
                    allTranslations(localization.common.minutes.minute),
                    allTranslations(localization.common.minutes.minutes),
                    allTranslations(localization.common.minutes.minutesLong),
                  ])
                }
              </Text>
            </View>
          </View>

        </View>

        {
          Boolean(open) && (
            <>

              <View style={styles.separate}/>

              <View style={styles.row}>
                <Text style={styles.rowTitle}>
                  { allTranslations(localization.accountQualifications.currentQualifications.monthlyVolumeSmallDirection) }
                </Text>
                <Text style={styles.rowValue}>{lowTotal}</Text>
              </View>

              <View style={[styles.row, {marginTop: 12}]}>
                <Text style={styles.rowTitle}>
                  { allTranslations(localization.accountQualifications.currentQualifications.leadershipBonusLevel) }
                </Text>
                <Text style={styles.rowValue}>{ leaderBonus }</Text>
              </View>

              <View style={styles.separate}/>

              <View style={styles.currentQualification}>
                <View style={styles.currentQualificationImage}>
                  <Image
                    source={imageUserQualifications(Number(maxEnergyRankLevel))}
                    style={{ width: "100%", height: "100%" }}
                  />
                </View>
                <Text style={styles.currentQualificationLabel}>
                  { allTranslations(localization.accountQualifications.currentQualifications.currentQualification) }
                </Text>
                <Text style={styles.currentQualificationValue}>
                  { maxEnergyRank || allTranslations(localization.qualifications.not) }
                </Text>
              </View>

            </>
          )
        }

      </View>
    );
  }
}

const styles = EStyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    padding: 16
  },
  head: {
    flexDirection: "row",
    alignItems: "center"
  },

  qualificationContainer: {
    width: 36,
    height: 36,
    marginRight: 12
  },
  qualificationName: {
    fontSize: 16,
    lineHeight: 20,
    color: "#282828",
    fontWeight: "500",
    flex: 1,

    "@media(min-width: 400)": {
      fontSize: 18
    }
  },

  arrowContainer: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center"
  },

  body: {
    marginTop: 16,

    "@media(min-width: 400)": {
      flexDirection: "row",
      alignItems: "center"
    }
  },
  bodyMessage: {
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
    color: "#8E8E8E",

    "@media(min-width: 400)": {
      flex: 1,
      textAlign: "left",
    }
  },
  bodyInfoItems: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginLeft: -12,
    "@media(min-width: 400)": {
      marginTop: 0
    }
  },
  bodyInfoItem: {
    width: 68,
    height: 60,
    borderRadius: 14,
    backgroundColor: "#F7F7F7",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12
  },
  bodyInfoItemTitle: {
    fontSize: 20,
    lineHeight: 24,
    color: "#000000",
    fontWeight: "500"
  },
  bodyInfoItemValue: {
    fontSize: 14,
    lineHeight: 17,
    color: "#000000",
    marginTop: 8
  },

  separate: {
    width: "100%",
    height: 2,
    backgroundColor: "#F9F9F9",
    marginVertical: 11
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowTitle: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E",
  },
  rowValue: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "right",
    color: "#282828",
    fontWeight: "500"
  },

  currentQualification: {
    flexDirection: "row",
    alignItems: "center",
  },
  currentQualificationImage: {
    width: 36,
    height: 36,
    marginRight: 12
  },
  currentQualificationLabel: {
    fontSize: 14,
    lineHeight: 20,
    color: "#8E8E8E",
    flex: 1,
  },
  currentQualificationValue: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828",
    textAlign: "right"
  },
});

export default CurrentQualifications
