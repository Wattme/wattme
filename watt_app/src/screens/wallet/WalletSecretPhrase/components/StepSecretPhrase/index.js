import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import { CommonCopy as CommonCopyIcon } from "../../../../../assets/icons";
import { BlockInformation } from "../../../../../components";
import Clipboard from "@react-native-clipboard/clipboard";
import Notification from "../../../../../common/Notification";

class StepSecretPhrase extends React.PureComponent {

  copyMnemonic = async () => {
    await Clipboard.setString(this.props?.mnemonic || " ");

    Notification.send({
      type: "success",
      message: allTranslations(localization.walletCreate.step2.notificationCopy)
    })
  }

  render() {
    const {
      mnemonic
    } = this.props;

    return (
      <View style={styles.root}>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>

          <View style={styles.body}>

            <Text style={styles.title}>
              { allTranslations(localization.walletCreate.step2.title) }
            </Text>

            <Text style={styles.message}>
              { allTranslations(localization.walletCreate.step2.message) }
            </Text>

            <View style={styles.words}>
              {(mnemonic || "").split(" ").map((word, index) => (
                <View key={`word-${word}-${index}`} style={styles.word}>
                  <View style={styles.wordNumber}>
                    <Text style={styles.wordNumberLabel}>{ index + 1 }</Text>
                  </View>
                  <Text style={styles.wordLabel}>
                    {word}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.control}>
              <TouchableOpacity style={styles.buttonCopy} onPress={this.copyMnemonic} activeOpacity={0.6}>
                <CommonCopyIcon/>
                <Text style={styles.buttonCopyLabel}>
                  {allTranslations(localization.walletCreate.step2.buttonCopy)}
                </Text>
              </TouchableOpacity>
            </View>

          </View>

        </ScrollView>

        <View style={styles.footer}>
          <BlockInformation
            message={allTranslations(localization.walletCreate.step2.warn)}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 16,
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

  title: {
    fontSize: 22,
    lineHeight: 26,
    textAlign: "center",
    fontWeight: "500",
    color: "#282828",

    marginBottom: 24
  },
  message: {
    fontSize: 16,
    lineHeight: 23,
    textAlign: "center",
    fontWeight: "300",
    color: "#282828",

    marginBottom: 32
  },

  words: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",

    marginLeft: -16,
    marginTop: -16
  },
  word: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    borderRadius: 10,
    padding: 1,
    marginLeft: 16,
    marginTop: 16,

    shadowColor: "rgba(172, 172, 172, 1)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
  wordNumber: {
    width: 22,
    height: 22,
    backgroundColor: "white",
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center"
  },
  wordNumberLabel: {
    fontSize: 16,
    lineHeight: 19,
    color: "#8E8E8E",
    fontWeight: "500"
  },
  wordLabel: {
    marginLeft: 4,
    paddingRight: 3,
    fontSize: 16,
    lineHeight: 19,
    color: "#282828"
  },

  control: {
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center"
  },

  buttonCopy: {
    backgroundColor: "#282828",
    borderRadius: 14,
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12
  },
  buttonCopyLabel: {
    fontSize: 16,
    lineHeight: 19,
    color: "white"
  },

});

export default StepSecretPhrase;
