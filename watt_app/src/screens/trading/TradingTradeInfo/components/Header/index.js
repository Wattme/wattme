import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import getHeightStatusBar from "../../../../../helpers/getHeightStatusBar";

const heightStatusBar = getHeightStatusBar();

class Header extends React.PureComponent {
  render() {
    const {
      title
    } = this.props;

    return (
      <View style={styles.root}>
        <Text style={styles.title}>{ title }</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    paddingHorizontal: 28,
    paddingBottom: 16,
    paddingTop: heightStatusBar + 16
  },

  title: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "500",
    color: "black"
  }
});

export default Header
