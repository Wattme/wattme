import React from "react";
import { Linking, TextInput, TouchableOpacity, View } from "react-native/index";
import { Checkbox, Text } from "react-native-ui-lib";
import allTranslations from "../../../localization/allTranslations";
import urls from "../../../constants/urls";
import localization from "../../../localization/localization";

const StepRegistration = (props) => {
  const {
    email,
    onChangeEmail,

    isConfirm,
    onChangeIsConfirm,

    styles
  } = props;

  const openLinkConditions = async () => {
    await Linking.openURL(urls.termsOfUse);
  };

  return (
    <View style={{ flex: 1 }}>

      <Text style={styles.title}>
        {allTranslations(allTranslations(localization.popUpRegistration.stepRegistration.title))}
      </Text>

      <Text style={styles.message}>
        {allTranslations(allTranslations(localization.popUpRegistration.stepRegistration.message))}
      </Text>

      <View style={[styles.formItemContainer, {marginTop: "auto"}]}>
        <TextInput
          value={email}
          placeholder={allTranslations(localization.popUpRegistration.stepRegistration.emailPlaceholder)}
          placeholderTextColor="#8E8E8E"
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.formItemInput}

          onChangeText={onChangeEmail}
        />
      </View>

      <TouchableOpacity style={styles.checkBoxContainer} onPress={() => onChangeIsConfirm(!isConfirm)}>
        <Checkbox value={isConfirm} onValueChange={() => onChangeIsConfirm(!isConfirm)} />
        <Text style={styles.checkBoxLabel}>
          {allTranslations(localization.popUpRegistration.stepRegistration.iAgree)}&nbsp;
        </Text>
        <TouchableOpacity onPress={openLinkConditions}>
          <Text style={styles.checkBoxLink}>
            {allTranslations(localization.popUpRegistration.stepRegistration.termsOfWatt)}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>

    </View>
  );
};

export default StepRegistration;
