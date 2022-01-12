import React from "react";
import {
  View,
  Image,
  StyleSheet
} from "react-native/index";
import {
  Text,
  Button
} from "react-native-ui-lib";
import allTranslations from "../../localization/allTranslations";
import localization from "../../localization/localization";

class BlockErrorInformation extends React.PureComponent {
  render() {
    const {
      message,

      onClose
    } = this.props;

    return (
      <View style={styles.root}>
        <View style={styles.content}>
          <Image
            style={styles.image}
            source={require("../../assets/png/errors/puzzle.png")}
            resizeMode="contain"
          />
          <Text style={styles.message}>
            { message }
          </Text>
        </View>
        <View style={styles.footer}>
          <Button
            label={allTranslations(localization.common.close)}
            labelStyle={{fontWeight: "normal"}}
            onPress={onClose}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white"
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    paddingHorizontal: 12,
    paddingBottom: 24,
    paddingTop: 12
  },

  image: {
    width: 224,
    height: 224
  },
  message: {
    fontSize: 16,
    lineHeight: 23,
    color: "#8E8E8E",
    textAlign: "center",

    marginTop: 64
  },
});

export default BlockErrorInformation
