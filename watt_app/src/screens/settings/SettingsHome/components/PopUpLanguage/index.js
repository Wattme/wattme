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
  Checkbox,
} from "react-native-ui-lib";
import { Modalize } from "../../../../../components";
import {
  HeaderAccept as HeaderAcceptIcon
} from "../../../../../assets/icons"
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

class PopUpLanguage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      language: props.language,
    };
  }

  setLanguage = (language) => {
    this.setState({ language });
  }
  onConfirm = () => {
    this.props.onSetLanguage(this.state.language);
  }

  render() {
    const {
      innerRef,

      languages,
      onSetLanguage
    } = this.props;
    const {
      language,
    } = this.state;

    return (
      <Modalize innerRef={innerRef}>
        <View style={styles.modalizeContainer}>

          <View style={styles.root}>

            <Text style={styles.title}>
              {allTranslations(localization.settingsHome.popUpLanguage.title)}
            </Text>

            {

              languages.map((lang, indexLang) => (
                <TouchableOpacity
                  key={`language-${ indexLang }`}
                  style={[styles.language, Boolean(indexLang === 0) && { marginTop: 0 }]}
                  onPress={() => this.setLanguage(lang.value)}
                >
                  <Image
                    style={styles.languageImage}
                    source={lang.icon}
                    resizeMode="cover"
                  />
                  <Text style={styles.languageName}>
                    {lang?.label}
                   </Text>

                  {Boolean(lang.value === language) && (
                    <HeaderAcceptIcon/>
                  )}

                </TouchableOpacity>
              ))

            }

          </View>

          <View style={{ marginTop: 16 }} />

          <Button
            label={allTranslations(localization.common.select)}
            onPress={this.onConfirm}
          />

        </View>
      </Modalize>
    );
  }
}

const styles = StyleSheet.create({

  modalizeContainer: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  root: {
    paddingTop: 44,
    paddingHorizontal: 16,
    paddingBottom: 24,

    borderRadius: 14,
    backgroundColor: "#F7F7F7"
  },

  title: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "500",
    textAlign: "center",
    color: "black",
    marginBottom: 24,
  },

  language: {
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16
  },
  languageImage: {
    width: 24,
    height: 24,
    borderRadius: 999,
  },
  languageName: {
    flex: 1,
    fontSize: 16,
    lineHeight: 26,
    color: "#282828",
    paddingHorizontal: 16,
  },
  languageRadis: {
    width: 32,
    height: 32,
  },

});

export default PopUpLanguage;
