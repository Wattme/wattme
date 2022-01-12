import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import FastImage from "react-native-fast-image";

const { width } = Dimensions.get("window")
const DappApp = (props) => {
  const { app, onPress } = props;

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(app.url, app.networks)}>
      <View style={styles.cardImage}>
        <FastImage
          source={{uri: app?.logo}}
          style={{flex: 1}}
        />
      </View>
      <Text style={styles.cardName}>
        {app.name}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    width: ((width - 48) / 4) - 8,
    marginLeft: 8,
    marginBottom: 20
  },
  cardImage: {
    width: 64,
    height: 64,
    overflow: "hidden",
    borderRadius: 14,
    marginBottom: 12
  },
  cardName: {
    fontSize: 12,
    lineHeight: 14,
    textAlign: "center",
    color: "#2E2E2E"
  },
});

export default DappApp
