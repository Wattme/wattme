import React from "react";
import {
  StyleSheet,
} from "react-native/index";
import {
  View,
} from "react-native-ui-lib";
import {
  Portal,
} from "react-native-portalize";
import LoadSpinner from "../LoadSpinner";
import BlurView from "../BlurView";

const ModalLoading = (props) => {
  const { open } = props;

  if (!open) {
    return null;
  }

  return (
    <Portal>

      <View style={styles.blurViewContainer}>
        <View style={styles.lottieView}>
          <LoadSpinner color="transparent"/>
        </View>
      </View>

      <BlurView style={styles.blurView}/>
    </Portal>
  );
};

const styles = StyleSheet.create({

  blurView: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(40, 40, 40, 0.4)",
  },

  blurViewContainer: {
    flex: 1,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  lottieView: {
    width: 160,
    height: 160,
    alignItems: "center",
    justifyContent: "center"
  },

});

export default ModalLoading;
