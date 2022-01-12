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
  BlockInformation
} from "../../../../../components";
import {
  CommonCopy as CommonCopyIcon
} from "../../../../../assets/icons";
import Notification from "../../../../../common/Notification";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import Clipboard from "@react-native-clipboard/clipboard";
import EStyleSheet from "react-native-extended-stylesheet";

class StepGetMnemonic extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

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
    const mnemonicArray = (mnemonic || "").split(" ");

    return (
      <>

        <View style={styles.root}>
          <Text style={styles.title}>
            { allTranslations(localization.walletCreate.step2.title) }
          </Text>
          <Text style={styles.message}>
            { allTranslations(localization.walletCreate.step2.message) }
          </Text>

          <View style={styles.words}>
            {mnemonicArray.map((word, index) => (
              <View key={`StepGetMnemonic-word-${index}`} style={styles.word}>
                <View style={styles.wordNumber}>
                  <Text style={styles.wordNumberLabel}>{ index + 1 }</Text>
                </View>
                <Text style={styles.wordLabel}>{ word }</Text>
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

        <View style={styles.footer}>
          <BlockInformation
            message={allTranslations(localization.walletCreate.step2.warn)}
          />
        </View>

      </>
    );
  }
}

const styles = EStyleSheet.create({
  root: {
    flex: 1,
    paddingVertical: 16,

    alignItems: "center",
  },

  title: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "500",
    color: "#282828",
    textAlign: "center",

    "@media (min-width: 400)": {
      fontSize: 22,
      lineHeight: 26
    }
  },
  message: {
    fontSize: 14,
    lineHeight: 23,
    fontWeight: "300",
    color: "#282828",
    textAlign: "center",
    marginTop: 12,

    "@media (min-width: 400)": {
      fontSize: 16,
      lineHeight: 23,

      marginTop: 24
    }
  },

  words: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",

    marginLeft: -12,
    marginBottom: -12,
    paddingHorizontal: 32,
    marginTop: 16,

    "@media (min-width: 400)": {
      marginTop: 32,
    }
  },
  word: {
    flexDirection: "row",
    alignItems: "center",
    padding: 1,
    borderRadius: 10,
    backgroundColor: "#F7F7F7",
    marginLeft: 12,
    marginBottom: 12,

    shadowColor: "rgba(172, 172, 172, 0.1)",
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
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  wordNumberLabel: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "500",
    color: "#8E8E8E",
    textAlign: "center",
  },
  wordLabel: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828",
    marginRight: 3,
    marginLeft: 4
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

  footer: {
    paddingHorizontal: 12,
  }
});

export default StepGetMnemonic
