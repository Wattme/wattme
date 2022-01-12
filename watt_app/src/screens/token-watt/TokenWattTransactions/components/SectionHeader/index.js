import React from "react";
import {
  View,
  StyleSheet
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";

const SectionHeader = (props) => {
  const {
    section
  } = props;

  return (
    <View style={styles.header}>
      <Text style={styles.title}>
        { section?.title }
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 11,
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderBottomWidth: 0
  },
  title: {

  },
});

export default SectionHeader
