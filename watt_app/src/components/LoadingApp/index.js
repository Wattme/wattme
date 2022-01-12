import React from "react";
import {
  View,
  StyleSheet
} from "react-native/index";
import LoadSpinner from "../LoadSpinner";

const LoadingApp = () => {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <LoadSpinner color="transparent"/>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },

  container: {
    flex: 1,
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center"
  },

  absolute: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(22,48,70,0.1)"
  },
})

export default LoadingApp
