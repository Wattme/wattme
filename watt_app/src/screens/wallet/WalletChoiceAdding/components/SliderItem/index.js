import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import EStyleSheet from "react-native-extended-stylesheet";
import allTranslations from "../../../../../localization/allTranslations";

const {
  width,
  scale
} = Dimensions.get("window");

class SliderItem extends React.PureComponent {
  render() {
    const {
      image,
      label,
      message
    } = this.props;

    return (
      <View style={styles.slide}>

        <Image
          source={image}
          style={styles.slideImage}
          resizeMode="contain"
        />

        <Text style={styles.slideTitle}>
          { allTranslations(label) }
        </Text>

        <Text style={styles.slideMessage}>
          { allTranslations(message) }
        </Text>

      </View>
    );
  }
}

const styles = EStyleSheet.create({

  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: width,
  },
  slideImage: {
    width: 60 * scale,
    height: 60 * scale,
    marginBottom: 12,

    "@media (min-width: 400)": {
      width: 240,
      height: 240,

      marginBottom: 48,
    }
  },
  slideTitle: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#282828",
    textAlign: "center",

    "@media (min-width: 400)": {
      fontSize: 25,
      lineHeight: 32,
    }
  },
  slideMessage: {
    fontSize: 14,
    lineHeight: 23,
    color: "#8E8E8E",
    textAlign: "center",
    maxWidth: 280,
    marginTop: 12,

    "@media (min-width: 400)": {
      fontSize: 16,
      lineHeight: 23,

      marginTop: 24
    }
  },

});

export default SliderItem
