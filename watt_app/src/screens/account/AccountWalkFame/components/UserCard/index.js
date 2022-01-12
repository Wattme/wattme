import React from "react";
import {
  View,
  StyleSheet,
} from "react-native/index";
import {
  Text,
} from "react-native-ui-lib";
import {
  UserAvatarQualification
} from "../../../../../components";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import qualifications from "../../../../../constants/qualifications";

class UserCard extends React.PureComponent {
  render() {
    const {
      account,
      wiseWinAccount
    } = this.props;

    return (
      <View style={styles.card}>

        <View style={styles.imageContainer}>
          <UserAvatarQualification size={60}/>
        </View>

        <View style={styles.body}>

          <Text style={styles.userName}>
            { [account?.firstName, account?.lastName].join(' ') }
          </Text>

          <Text style={styles.userQualification}>
            { qualifications[ wiseWinAccount?.energy_rank || 0 ] }
          </Text>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,
    padding: 16,
  },

  imageContainer: {
    width: 60,
    height: 60,
  },

  body: {
    flex: 1,
    paddingLeft: 16
  },

  userName: {
    fontSize: 20,
    lineHeight: 24,
    color: "#282828",
    fontWeight: "500"
  },
  userQualification: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E",
    marginTop: 12
  },
});

export default UserCard;
