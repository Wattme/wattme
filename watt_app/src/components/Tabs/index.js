import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Easing,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native/index";
import {
  Text,
} from "react-native-ui-lib";

const Tabs = (props) => {
  const { items, onChange, value, overflow, styleTabLabel } = props;

  return (
    <View style={styles.root}>
      {items.map((tab, idx) => (
        <TouchableOpacity style={styles.tab} key={`tab-${idx}`} onPress={() => onChange(tab.value)} activeOpacity={0.6}>
          <Text
            style={[
              styles.tabLabel,
              styleTabLabel,
              Boolean(value === tab.value) && {color: '#000000'}
            ]}
          >{tab.label}</Text>
          {Boolean(value === tab.value) && (
            <View style={styles.tabLine}/>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "space-around"
  },

  tab: {
    paddingBottom: 7
  },
  tabLabel: {
    fontSize: 18,
    lineHeight: 21,
    color: "#8E8E8E",
    fontWeight: "500"
  },
  tabLine: {
    width: 40,
    height: 2,
    backgroundColor: "#000000",

    position: "absolute",
    bottom: 0,
    alignSelf: "center"
  },
});

export default Tabs;
