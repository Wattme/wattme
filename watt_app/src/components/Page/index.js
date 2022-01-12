import React, { Component } from "react";
import {
  View,
  StyleSheet,
} from "react-native/index";

class Page extends Component {
  render() {
    const { props } = this;

    return (
        <View style={[styles.root, props.style]}>
          { props.children }
        </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
});

export default Page
