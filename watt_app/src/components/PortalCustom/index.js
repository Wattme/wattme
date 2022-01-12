import React from "react";
import {
  View,
  Platform,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native/index";
import { Portal } from "react-native-portalize";
import getHeightStatusBar from "../../helpers/getHeightStatusBar";


const heightWindow = Dimensions.get("window")?.height;
const heightStatusBar = getHeightStatusBar();

class PortalCustom extends React.Component {


  renderChildren = () => {
    const { children } = this.props;

    return children
  }

  render() {
    return (
      <Portal>
        {this.renderChildren()}
      </Portal>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    height: (heightWindow + heightStatusBar)
  },
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: "red"
  }
});

export default PortalCustom;
