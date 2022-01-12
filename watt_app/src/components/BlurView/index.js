import React from "react";
import {
  Platform,
  StyleSheet
} from "react-native/index";
import {
  BlurView as BlurViewRoot
} from "@react-native-community/blur";

class BlurView extends React.PureComponent {

  blurViewParams = () => {
    
    const isIos = Boolean(Platform.OS === "ios");

    if (isIos) {
      return {
        blurType: "dark",
        overlayColor: "transparent",
        blurAmount: 1,
      }
    } else {
      return {
        blurType: "light",
        blurAmount: 1,
        overlayColor: "transparent"
      }
    }
  }

  render() {
    const {
      children,

      style
    } = this.props;

    return (
      <BlurViewRoot
        {...this.blurViewParams()}
        style={[style, styles.root]}
      >
        { children }
      </BlurViewRoot>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "rgba(40,40,40,0.4)"
  }
});

export default BlurView
