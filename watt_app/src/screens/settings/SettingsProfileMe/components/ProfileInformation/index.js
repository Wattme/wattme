import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  ImportWalletEdit as ImportWalletEditIcon,
  SettingsExitProfile as SettingsExitProfileIcon
} from "../../../../../assets/icons";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

class ProfileInformation extends React.PureComponent {

  _userName = () => {
    const { account } = this.props;

    const name = account?.firstName || allTranslations(localization.accountProfileMeEdit.profileInformation.userNameEmpty);
    const lastName = account?.lastName || allTranslations(localization.accountProfileMeEdit.profileInformation.userLastNameEmpty);

    return [name, lastName].join(' ')
  }

  render() {
    return (
      <View style={styles.card}>

        <View style={styles.image}></View>

        <View style={styles.body}>

          <Text style={styles.userName} numberOfLines={1}>
            {this._userName()}
          </Text>

          <TouchableOpacity style={styles.buttonChangeImage}>
            <Text style={styles.buttonChangeImageLabel}>
              {allTranslations(localization.accountProfileMeEdit.profileInformation.changeAvatar)}
            </Text>
            <View style={styles.buttonChangeImageIcon}>
              <ImportWalletEditIcon size={24}/>
            </View>
          </TouchableOpacity>

        </View>

        <TouchableOpacity style={styles.buttonExit}>
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

  image: {
    width: 60,
    height: 60,

    borderRadius: 999,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#282828",
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

  buttonChangeImage: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8
  },
  buttonChangeImageLabel: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E"
  },
  buttonChangeImageIcon: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4
  },

  buttonExit: {
    width: 32,
    height: 32
  }
});

export default ProfileInformation
