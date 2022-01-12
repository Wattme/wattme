import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import { convertorNumber } from "../../../../../helpers/convertor";

class EcosystemParticipants extends React.PureComponent {
  render() {
    const {
      routeAccountStatistics,
      routeAccountQualifications,

      totalCountEnergyUsers
    } = this.props;

    return (
      <View style={styles.root}>
        <View style={styles.head}>
          <Text style={styles.title}>
            { allTranslations(localization.accountBackOffice.ecosystemParticipants.title) }
          </Text>
          <Text style={styles.countParticipant}>
            { convertorNumber(totalCountEnergyUsers, 0, '') } { allTranslations(localization.common.peopleShort) }
          </Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.control} activeOpacity={0.6} onPress={routeAccountStatistics}>
            <Text style={styles.controlLabel}>
              { allTranslations(localization.accountBackOffice.ecosystemParticipants.statistics) }
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.control} activeOpacity={0.6} onPress={routeAccountQualifications}>
            <Text style={styles.controlLabel}>
              { allTranslations(localization.accountBackOffice.ecosystemParticipants.qualifications) }
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  root: {
    backgroundColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,
    padding: 16
  },

  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E"
  },
  countParticipant: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "right",
    fontWeight: "500",
    color: "#282828"
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
    borderRadius: 8,
    backgroundColor: "#282828",
    alignItems: "center",
    justifyContent: "center"
  },
  controlLabel: {
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
    textAlign: "center"
  },

});

export default EcosystemParticipants
