import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import { BlockInformation } from "../../../../../components";
import EStyleSheet from "react-native-extended-stylesheet";

class StepVerifyRecoveryPhrase extends React.PureComponent {
  constructor(props) {
    super(props);

    const mnemonicArray = (props.mnemonic || '')
      .split(" ")
      .sort(() => .5 - Math.random());

    this.state = {
      verifyPhrase: [],

      mnemonicArray
    };
  }

  onChangeVerifyPhrase = async (word, type = "add") => {
    let newVerifyPhrase = [...this.state.verifyPhrase];

    if (type === "add") {
      newVerifyPhrase.push(word);
    }
    if (type === "delete") {
      newVerifyPhrase.splice(newVerifyPhrase.indexOf(word), 1);
    }

    await this.setState({
      verifyPhrase: newVerifyPhrase
    });

    const { isCorrectWordOrder } = this.props;
    const isCorrectWord = this._checkCorrectWord();
    if (isCorrectWordOrder !== isCorrectWord) {
      this.props.onChangeStatus(isCorrectWord);
    }
  }

  _checkCorrectWord = () => {
    const { verifyPhrase } = this.state;
    const { mnemonic } = this.props;
    
    const stringVerifyPhrase = (verifyPhrase || []).join(' ');

    return Boolean(stringVerifyPhrase === mnemonic)
  }
  _visibleMessageErrorMnemonic = () => {
    const { verifyPhrase } = this.state;
    const { mnemonic } = this.props;
  
    // Если пользователь выбрал не все слова то не показываем сообщение об ошибке
    if (verifyPhrase.length !== 12 && verifyPhrase.length !== 24) {
      return true
    }
  
    
    const stringVerifyPhrase = (verifyPhrase || []).join(' ');
  
    return Boolean(stringVerifyPhrase === mnemonic)
  }

  render() {
    const {
      verifyPhrase,
      mnemonicArray
    } = this.state;

    return (
      <>

        <View style={styles.root}>

          <Text style={styles.title}>
            { allTranslations(localization.walletCreate.step3.title) }
          </Text>

          <Text style={styles.message}>
            { allTranslations(localization.walletCreate.step3.message) }
          </Text>

          <View style={styles.verifyPhraseContainer}>
            <View style={styles.verifyPhraseContainerItems}>
              {verifyPhrase.map((word, index) => (
                <TouchableOpacity
                  key={`verifyPhrase-${index}`}
                  onPress={() => this.onChangeVerifyPhrase(word, "delete")}
                  activeOpacity={0.6}
                >
                  <View style={styles.verifyPhrase}>
                    <View style={styles.verifyPhraseNumber}>
                      <Text style={styles.verifyPhraseNumberLabel}>{ index + 1 }</Text>
                    </View>
                    <Text style={styles.verifyPhraseLabel}>{ word }</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.phraseContainer}>
            {mnemonicArray.map((word, index) => (
              <TouchableOpacity
                key={`phraseWord-${index}`}
                activeOpacity={0.6}
                disabled={Boolean(verifyPhrase.includes(word))}
                onPress={() => this.onChangeVerifyPhrase(word, 'add')}
              >
                <View
                  style={[
                    styles.phraseWord,
                    Boolean(verifyPhrase.includes(word)) && {opacity: 0}
                  ]}
                >
                  <Text style={styles.phraseWordLabel}>
                    {word}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

        </View>

        <View style={styles.footer}>
          {!Boolean(this._visibleMessageErrorMnemonic())&&(
            <BlockInformation
              type="error"
              message={allTranslations(localization.walletCreate.step3.errorMessage)}
            />
          )}
        </View>

      </>
    );
  }
}

const styles = EStyleSheet.create({
  root: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,

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

  verifyPhraseContainer: {
    backgroundColor: "#F7F7F7",
    marginTop: 16,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: "100%",

    "@media (min-width: 400)": {
      minHeight: 136
    }
  },
  verifyPhraseContainerItems: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",

    marginLeft: -12,
    marginBottom: -12
  },

  phraseContainer: {
    marginTop: 16,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",

    marginLeft: -12,
    marginBottom: -12,

    "@media (min-width: 400)": {
      maxWidth: 290
    }
 },

  phraseWord: {
    borderRadius: 10,
    paddingHorizontal: 4,
    paddingVertical: 2.5,
    backgroundColor: "#F7F7F7",

    marginLeft: 12,
    marginBottom: 12,
  },
  phraseWordLabel: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828"
  },

  verifyPhrase: {
    flexDirection: "row",
    alignItems: "center",
    padding: 1,
    borderRadius: 10,
    backgroundColor: "#F7F7F7",

    marginLeft: 12,
    marginBottom: 12,



    shadowColor: "rgba(172, 172, 172, 0.2)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 2.22,
    elevation: 2,
  },
  verifyPhraseNumber: {
    width: 22,
    height: 22,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  verifyPhraseNumberLabel: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "500",
    color: "#8E8E8E",
    textAlign: "center",
  },
  verifyPhraseLabel: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828",
    marginRight: 3,
    marginLeft: 4
  },

  footer: {
    paddingHorizontal: 12,
  }
});

export default StepVerifyRecoveryPhrase
