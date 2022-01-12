import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text,
} from "react-native-ui-lib";
import {
  FilterFilter as FilterFilterIcon
} from "../../../../../assets/icons";
import UserRow from "../UserRow";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

class MyReferrals extends React.PureComponent {
  render() {
    const {
      data
    } = this.props;

    return (
      <View style={styles.root}>

        <View style={styles.head}>

          <View style={styles.labelReferrals}>
            <Text style={styles.labelReferralsLabel}>
              { allTranslations(localization.accountMyTeam.myReferrals.countReferrals) }:
            </Text>
            <Text style={styles.labelReferralsCount}>
              { (data || []).length }
            </Text>
          </View>

          <TouchableOpacity style={styles.buttonFilter}>
            <FilterFilterIcon/>
          </TouchableOpacity>

        </View>

        <View style={styles.body}>

          {

            data.map((user, index) => (

              <>

                {Boolean(index > 0)&&(
                  <View style={styles.separate}/>
                )}

                <UserRow
                  key={`referral-user-${ index }`}
                  user={user}
                  index={index}

                  isShowBalanceWatt={true}
                />

              </>

            ))

          }

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
    backgroundColor: "white",
    borderRadius: 14,
    padding: 16,
  },

  head: {
    flexDirection: "row",
    alignItems: "center",
  },
  body: {
    marginTop: 12
  },

  labelReferrals: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  labelReferralsLabel: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E",

  },
  labelReferralsCount: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828",
    fontWeight: "500",
    marginLeft: 8
  },

  separate: {
    marginVertical: 15,
    marginLeft: 56,
    height: 2,
    backgroundColor: "#F9F9F9"
  },

  buttonFilter: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MyReferrals;
