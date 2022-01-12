import React from "react";
import {
  View,
  Image,
  StyleSheet
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import { imageUserQualifications } from "../../../../../common/UserQualifications";
import { UserAvatarQualification } from "../../../../../components";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

class UserRow extends React.PureComponent {

  _wattHold = () => {
    const wattHold = this.props?.user?.watt_hold;

    return (parseInt(+wattHold * 100)) / 100
  }

  render() {
    const {
      index,
      isQualification,
      isShowBalanceWatt,

      user
    } = this.props;

    return (
      <View style={styles.card}>

        <UserAvatarQualification
          size={44}
          level={user.energy_rank}
          image={user?.avatar}
          isCustomImage={true}
        />

        <View style={styles.cardBody}>
          <Text style={styles.userName}>
            { [user?.first_name, user?.last_name].join("\n") }
          </Text>
        </View>

        {
          Boolean(isQualification) && (
            <View style={styles.cardQualification}>
              <Image
                style={{ width: "100%", height: "100%" }}
                source={imageUserQualifications(2)}
              />
            </View>
          )
        }

        {
          Boolean(isShowBalanceWatt) && (
            <View style={styles.balanceWatt}>
              <View>
                <Text style={styles.balanceWattTitle}>WATT</Text>
                <Text style={styles.balanceWattValue}>
                  { this._wattHold() }
                </Text>
              </View>
            </View>
          )
        }

        <View style={styles.cardIndex}>
          <Text style={styles.referralCount}>
            { allTranslations(localization.accountMyTeam.myReferrals.referralUserCountLabel) }
          </Text>
          <Text style={styles.referralCountValue}>
            { user.ref_count }
          </Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  card: {
    flexDirection: "row",
    alignItems: "center"
  },
  cardBody: {
    flex: 1,
    paddingLeft: 12
  },

  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 999,
    overflow: "hidden",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#282828"
  },
  avatarImage: {
    width: "100%",
    height: "100%"
  },

  userName: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "500",
    color: "#000000"
  },
  userQualification: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E",
    marginTop: 8
  },

  cardQualification: {
    width: 44,
    height: 44,
    marginLeft: 16
  },

  cardIndex: {
    marginLeft: 16
  },

  referralCount: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E",
    textAlign: "right",
    marginBottom: 4
  },
  referralCountValue: {
    fontSize: 14,
    lineHeight: 17,
    color: "#10B879",
    textAlign: "right"
  },

  balanceWatt: {
    flex: 1,
    alignItems: "center"
  },
  balanceWattTitle: {
    fontSize: 14,
    lineHeight: 17,
    color: "#282828",
    marginBottom: 4
  },
  balanceWattValue: {
    fontSize: 14,
    lineHeight: 17,
    color: "#10B879",
  },

})

export default UserRow;
