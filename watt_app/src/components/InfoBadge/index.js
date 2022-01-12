import React from "react";
import {
  View,
  StyleSheet
} from "react-native/index";
import Svg, { Path } from "react-native-svg";

class InfoBadge extends React.PureComponent {
  render() {
    return (
      <View style={styles.root}>
        <Svg width="2" height="10" viewBox="0 0 2 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path d="M1 4.40002L1 8.60002" stroke="white" strokeLinecap="round"/>
          <Path d="M1 2L1 1.4" stroke="white" strokeLinecap="round"/>
        </Svg>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    width: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: "#8E8E8E",

    alignItems: "center",
    justifyContent: "center"
  }
});

export default InfoBadge
