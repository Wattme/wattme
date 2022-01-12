import React from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native/index";
import {
  Text,
  Button,
  Checkbox,
} from "react-native-ui-lib";

import imageKeys from "../../../../../assets/png/wallet-create/keys.png";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

class StepWarning extends React.PureComponent {
  render() {
    const {
      inConfirm,

      onNext,
      onChangeConfirm,
    } = this.props;

    return (
      <View style={styles.root}>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>

          <View style={styles.body}>
            <View style={styles.imageContainer}>
              <View style={styles.image}>
                <Image
                  source={imageKeys}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
            </View>

            <View style={styles.informations}>
              <View style={styles.information}>
                <View style={styles.informationIcon}>
                  <Image source={require("../../../../../assets/png/wallet-secret-phrase/key.png")}
                         style={{ width: 24, height: 24 }} resizeMode="contain" />
                </View>
                <Text style={styles.informationMessage}>
                  {allTranslations(localization.walletSecretPhrase.step1.infoPhrase1)}
                </Text>
              </View>
              <View style={styles.information}>
                <View style={styles.informationIcon}>
                  <Image source={require("../../../../../assets/png/wallet-secret-phrase/stop.png")}
                         style={{ width: 24, height: 24 }} resizeMode="contain" />
                </View>
                <Text style={styles.informationMessage}>
                  {allTranslations(localization.walletSecretPhrase.step1.infoPhrase2)}
                </Text>
              </View>
              <View style={styles.information}>
                <View style={styles.informationIcon}>
                  <Image source={require("../../../../../assets/png/wallet-secret-phrase/warn.png")}
                         style={{ width: 24, height: 24 }} resizeMode="contain" />
                </View>
                <Text style={styles.informationMessage}>
                  {allTranslations(localization.walletSecretPhrase.step1.infoPhrase3)}
                </Text>
              </View>
            </View>
          </View>

        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => onChangeConfirm(!inConfirm)}
            activeOpacity={0.8}
          >
            <Checkbox
              value={inConfirm}
              style={styles.checkboxItem}
              onValueChange={() => onChangeConfirm(!inConfirm)}
            />
            <Text style={styles.checkboxLabel}>
              {allTranslations(localization.walletSecretPhrase.step1.labelConfirm)}
            </Text>
          </TouchableOpacity>

          <Button
            style={{ marginTop: 16 }}
            size="small"

            label={allTranslations(localization.common.proceed)}
            disabled={!inConfirm}

            onPress={onNext}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 12,
  },
  body: {
    flex: 1,
    paddingHorizontal: 28,
  },
  footer: {
    paddingHorizontal: 12,
    paddingTop: 16,
  },

  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    maxWidth: 130,
    maxHeight: 130,
  },

  informations: {
    marginTop: -12,
  },
  information: {
    flexDirection: "row",
    marginTop: 12,
  },
  informationIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  informationMessage: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
    color: "#282828",
  },

  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  checkboxItem: {},
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "300",
    color: "#282828",

    marginLeft: 12,
  },
});

export default StepWarning;
