import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text,
  Switch
} from "react-native-ui-lib";
import {
  CommonMenu as CommonMenuIcon
} from "../../../../../assets/icons";

class SectionBlock extends React.PureComponent {

  onChangeVisible = () => {
    this.props.onChange(this.props.name);
  }

  render() {
    const {
      label,
      value
    } = this.props;

    return (
      <View style={styles.card}>

        <Text style={styles.cardLabel}>
          { label }
        </Text>

        <View style={styles.cardRightContent}>

          <Switch
            value={value}
            onValueChange={this.onChangeVisible}
          />

          <TouchableOpacity style={styles.buttonMenu}>
            <CommonMenuIcon/>
          </TouchableOpacity>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "white",
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  cardLabel: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "500",
    color: "#000000",
    flex: 1,
  },

  cardRightContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  buttonMenu: {
    width: 32,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginLeft : 16
  }

});

export default SectionBlock
