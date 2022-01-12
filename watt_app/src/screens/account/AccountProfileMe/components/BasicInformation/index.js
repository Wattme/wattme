import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  SettingsExitProfile as SettingsExitProfileIcon
} from "../../../../../assets/icons";
import {
  UserAvatarQualification
} from "../../../../../components";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import qualifications from "../../../../../constants/qualifications";

class BasicInformation extends React.PureComponent {
  render() {
    const {
      account,
      wiseWinAccount,
      onLogout
    } = this.props;

    return (
      <View style={styles.root}>

        <View style={styles.head}>
          <View style={styles.headLeft}/>
          <View style={styles.headBody}>

            <View style={styles.avatarContainer}>
              <UserAvatarQualification
                size={60}
              />
            </View>

          </View>
          <View style={styles.headLeft}>
            <TouchableOpacity onPress={onLogout}>
              <SettingsExitProfileIcon/>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.userName}>
            { [account?.firstName, account?.lastName].join(' ') }
          </Text>

          <Text style={styles.qualification}>
            { qualifications[wiseWinAccount?.energy_rank || 0] }
          </Text>
        </View>

        <View style={styles.footer}>

          <View>
            <Text style={styles.footerTitle}>
              { allTranslations(localization.accountProfileMe.email) }:
            </Text>
            <Text style={styles.footerValue}>
              { account.email }
            </Text>
          </View>

          <View>
            <Text style={[styles.footerTitle, {textAlign: "right"}]}>
              { allTranslations(localization.accountProfileMe.mentor) }:
            </Text>
            <Text style={[styles.footerValue, {textAlign: "right"}]}>
              { Boolean( wiseWinAccount.referrer_name ) ? wiseWinAccount.referrer_name : "—" }
            </Text>
          </View>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
   padding: 16,

    backgroundColor: "white",

   borderWidth: 1,
   borderStyle: "solid",
   borderColor: "#F0F0F0",
   borderRadius: 14,
  },

  head: {
    flexDirection: "row"
  },
  body: {
    marginTop: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12
  },

  headLeft: {
    width: 32,
    height: 32,
  },
  headBody: {
    flex: 1,
    alignItems: "center"
  },

  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 999,
  },
  avatarRound: {
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: "#9B9B9B",
    borderRadius: 999,
    height: "100%",
    width: "100%"
  },

  userName: {
    fontSize: 20,
    lineHeight: 22,
    color: "#282828",
    textAlign: "center",
    fontWeight: "500"
  },

  qualification: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E",
    marginTop: 12,
    textAlign: "center"
  },

  footerTitle: {
    fontSize: 13,
    lineHeight: 16,
    color: "#282828",
    marginBottom: 8
  },
  footerValue: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E"
  },
});

export default BasicInformation
