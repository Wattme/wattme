import React from "react";
import {
  View,
  StyleSheet
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";

class ErrorPage extends React.Component {
  render() {
    return (
      <View style={styles.root}>
        <Text>Ошибка</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ErrorPage
