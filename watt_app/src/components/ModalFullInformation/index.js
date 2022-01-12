import React from "react";
import {
  View,
  Image,
  StyleSheet,
} from "react-native/index";
import {
  Text,
  Button
} from "react-native-ui-lib";
import {
  Portal
} from "react-native-portalize";
import allTranslations from "../../localization/allTranslations";
import localization from "../../localization/localization";
import EStyleSheet from "react-native-extended-stylesheet";

class ModalFullInformation extends React.PureComponent {
  render() {
    const {
      open,

      image,
      title,
      message,

      onNext
    } = this.props;

    if (!open) {
      return null
    }

    return (
      <Portal>
        <View style={styles.root}>

          <View style={styles.body}>

            <Image
              style={styles.image}
              source={image}
              resizeMode="contain"
            />

            <Text style={styles.title}>
              { title }
            </Text>

            <Text style={styles.message}>
              { message }
            </Text>

          </View>

          <View style={styles.footer}>
            {Boolean(!!onNext) && (
              <Button
                label={allTranslations(localization.common.proceed)}
                onPress={onNext}
              />
            )}
          </View>

        </View>
      </Portal>
    );
  }
}

const styles = EStyleSheet.create({

  root: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 20
  },

  body: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
  footer: {},

  image: {
    width: 240,
    height: 240,
    marginBottom: 32,

    "@media( min-width: 400 )": {
      width: 300,
      height: 300,
      marginBottom: 48
    }
  },
  title: {
    fontSize: 25,
    lineHeight: 32,
    color: "#282828",
    fontWeight: "600"
  },
  message: {
    fontSize: 16,
    lineHeight: 23,
    color: "#8E8E8E",
    textAlign: "center",
    marginTop: 32,

    "@media( min-width: 400 )": {
      marginTop: 56
    }
  },

});

export default ModalFullInformation
