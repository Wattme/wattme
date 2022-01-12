import React from "react";
import {
  View,
  StyleSheet
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";

class InformationFunctionDevelop extends React.PureComponent {
  render() {
    return (
      <View style={styles.root}>

        <Text style={styles.message}>
          { this.props.message }
        </Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  root: {
    backgroundColor: "#F5386A",
    borderRadius: 14,
    padding: 16
  },

  message: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "500",
    textAlign: "center",
    color: "white"
  },

});

export default InformationFunctionDevelop
