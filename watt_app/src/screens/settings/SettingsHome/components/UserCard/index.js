import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native/index";
import {
  Text,
  Button,
} from "react-native-ui-lib";
import {
  SettingsExitProfile as SettingsExitProfileIcon
} from "../../../../../assets/icons";
import Authorization from "./Authorization";
import UserPug from "../../../../../assets/png/wallet/wallet-image-pug-white.png";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

const UserCard = (props) => {
  const {
    account,
    openPopUpForgotPassword,
    openPopUpRegistration,

    onLogin,
    onExit,

    routeProfileMe,
    routeTokenWattBuyingToken
  } = props;

  if (Object.keys(account || {}).length <= 0) {
    return (
      <Authorization
        openPopUpForgotPassword={openPopUpForgotPassword}
        openPopUpRegistration={openPopUpRegistration}

        onLogin={onLogin}
      />
    )
  }

  return (
    <View style={styles.root}>
      <TouchableOpacity style={styles.head} onPress={routeProfileMe} activeOpacity={0.8}>
        <View style={styles.imageContainer}>
          <Image
            source={UserPug}
            style={{width: 58, height: 58, margin: -1}}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.userName} numberOfLines={1}>
          { [account?.firstName, account?.lastName].join(" ") }
        </Text>
        <TouchableOpacity style={styles.buttonExit} onPress={onExit}>
          <SettingsExitProfileIcon/>
        </TouchableOpacity>
      </TouchableOpacity>
      <View style={styles.body}>
        <Button
          size="xSmall"
          style={styles.buttonToken}
          label={allTranslations(localization.settingsHome.user.tokenWatt)}
          labelStyle={styles.buttonTokenLabel}
          onPress={routeTokenWattBuyingToken }
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#282828",
    borderRadius: 14,
    padding: 16
  },

  head: {
    flexDirection: "row",
    alignItems: "center",
  },
  body: {
    marginTop: 16
  },

  imageContainer: {
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "white",
    borderRadius: 999,
    width: 60,
    height: 60,
  },
  userName: {
    flex: 1,
    fontSize: 22,
    lineHeight: 26,
    fontWeight: "500",
    color: "white",
    marginLeft: 16,
    marginRight: 16
  },
  buttonExit: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center"
  },

  buttonToken: {
    height: 36,
    borderRadius: 8
  },
  buttonTokenLabel: {
    fontSize: 16,
    lineHeight: 19
  },
});

export default UserCard
