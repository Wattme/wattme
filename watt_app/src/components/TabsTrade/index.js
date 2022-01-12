import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native/index";
import {
  Text,
} from "react-native-ui-lib";
import allTranslations from "../../localization/allTranslations";

class TabsTrade extends React.PureComponent {
  render() {
    const {
      tabs,
      value,
      onChange,
      keyParams
    } = this.props;

    return (
      <View style={styles.root}>

        {(tabs || []).map((tab, index) => (
          <TouchableOpacity
            key={`TabsTrade-${keyParams}-${index}`}
            style={{flex: 1}}
            onPress={() => onChange(tab.value)}
            disabled={tab.disable}
          >
            <View
              style={[
              styles.button,
              Boolean(value === tab.value) && styles.buttonActive
            ]}
            >
              <Text
                style={[
                  styles.buttonLabel,
                  Boolean(value === tab.value) && styles.buttonLabelActive
                ]}
              >
                { tab.label }
              </Text>
            </View>
          </TouchableOpacity>
        ))}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#F7F7F7",
    height: 32,
    borderRadius: 8,

    flexDirection: "row",
    overflow: "hidden"
  },

  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8
  },
  buttonActive: {
    backgroundColor: "#F6D962",
    borderRadius: 8
  },
  buttonLabel: {
    fontSize: 16,
    lineHeight: 19,
    color: "#8E8E8E"
  },
  buttonLabelActive: {
    color: "#000000",
  },
});

export default TabsTrade;
