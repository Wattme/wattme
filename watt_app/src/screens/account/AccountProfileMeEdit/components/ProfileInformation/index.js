import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity, Image,
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  ImportWalletEdit as ImportWalletEditIcon,
  SettingsExitProfile as SettingsExitProfileIcon
} from "../../../../../assets/icons";
import {
  ImagePicker,
  UserAvatarQualification
} from "../../../../../components";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import qualifications from "../../../../../constants/qualifications";

class ProfileInformation extends React.PureComponent {

  _userName = () => {
    const { account } = this.props;

    const name = account?.firstName || allTranslations(localization.accountProfileMeEdit.profileInformation.userNameEmpty);
    const lastName = account?.lastName || allTranslations(localization.accountProfileMeEdit.profileInformation.userLastNameEmpty);

    return [name, lastName].join(' ')
  }

  render() {
    const {
      onLogout,
      onSetAvatar,

      wiseWinAccount
    } = this.props;

    return (
      <View style={styles.card}>

        <ImagePicker onChange={onSetAvatar}>
          <UserAvatarQualification size={60}/>
        </ImagePicker>

        <View style={styles.body}>

          <Text style={styles.userName} numberOfLines={1}>
            {this._userName()}
          </Text>

          <Text style={styles.qualificationLabel}>
            { qualifications[ wiseWinAccount?.energy_rank || 0 ] }
          </Text>

        </View>

        <TouchableOpacity style={styles.buttonExit} onPress={onLogout}>
          <SettingsExitProfileIcon/>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,

    backgroundColor: "white",

    padding: 16,

    flexDirection: "row"
  },

  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 999
  },

  body: {
    flex: 1,
    paddingLeft: 16,
    paddingVertical: 4
  },

  userName: {
    fontSize: 20,
    lineHeight: 24,
    color: "#282828",
    fontWeight: "500"
  },

  qualificationLabel: {
    marginTop: 12,

    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E"
  },

  buttonExit: {
    width: 32,
    height: 32
  }
});

export default ProfileInformation
