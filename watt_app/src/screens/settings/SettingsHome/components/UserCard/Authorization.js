import React, { useState } from "react";
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text,
  Button
} from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import { validateEmail } from "../../../../../helpers/validate";
import { getFontFamily } from "../../../../../theme/theme-manager/Text";

const Authorization = (props) => {
  const {
    openPopUpForgotPassword,
    openPopUpRegistration,

    onLogin
  } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    onLogin({
      email: email,
      password: password,
    });
  }
  const handleDisableButton = () => {
    return Boolean((!email || !password) || (!validateEmail(email)) || (password.length < 6))
  }

  return (
    <View style={styles.root}>
      <View style={styles.rootHead}>
        <Text style={styles.title}>
          {allTranslations(localization.settingsHome.auth.title)}
        </Text>
        <Image style={{width: 96, height: 76}} source={require('../../../../../assets/png/settings/authorization-users.png')} resizeMode="contain"/>
      </View>
      <View style={styles.rootBody}>
        <TextInput
          value={email}
          style={styles.textInput}
          placeholder={allTranslations(localization.settingsHome.auth.emailPlaceholder)}
          placeholderTextColor="#8E8E8E"
          autoCapitalize="none"

          onChangeText={(value) => setEmail(value)}
        />
        <TextInput
          value={password}
          secureTextEntry={true}
          style={[styles.textInput, {marginTop: 16}]}
          placeholder={allTranslations(localization.settingsHome.auth.passwordPlaceholder)}
          placeholderTextColor="#8E8E8E"
          autoCapitalize="none"
          onChangeText={(value) => setPassword(value)}
        />

        <Button
          label={allTranslations(localization.settingsHome.auth.buttonEnter)}
          color="secondary"
          style={{marginTop: 24}}
          labelStyle={{color: "#F6D962"}}
          disabled={handleDisableButton()}

          onPress={handleSubmit}
        />
      </View>
      <View style={styles.rootFooter}>
        <TouchableOpacity style={styles.footerButton} onPress={openPopUpForgotPassword} activeOpacity={0.6}>
          <Text style={[styles.footerButtonLabel, { color: "#8E8E8E" }]}>
            { allTranslations(localization.settingsHome.auth.forgotPassword) }
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={openPopUpRegistration} activeOpacity={0.6}>
          <Text style={[styles.footerButtonLabel]}>
            { allTranslations(localization.settingsHome.auth.registration) }
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,
    backgroundColor: "#F7F7F7",
    padding: 16
  },
  rootHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 23
  },
  rootBody: {},
  rootFooter: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  title: {
    fontSize: 22,
    lineHeight: 26,
    color: "#000000",
    fontWeight: "500"
  },

  textInput: {
    fontSize: 14,
    lineHeight: 17,
    fontFamily: getFontFamily("300"),

    paddingVertical: 0,
    paddingHorizontal: 16,
    backgroundColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,
    height: 40
  },

  footerButton: {
    height: 32,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  footerButtonLabel: {
    fontSize: 14,
    lineHeight: 17,
    color: "#282828"
  }
});

export default Authorization
