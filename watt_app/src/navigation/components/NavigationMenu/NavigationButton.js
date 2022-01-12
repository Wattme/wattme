import React from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text,
  View
} from "react-native-ui-lib";

const {
  height
} = Dimensions.get("screen");

class NavigationButton extends React.PureComponent {


  onPressButton = () => {
    this.props.onPress();
  }

  render() {
    const {
      title,
      icon: Icon,

      isFocused
    } = this.props;

    return (
        <TouchableOpacity
          style={styles.button}
          onPress={this.onPressButton}
        >
          <View style={styles.buttonIcon}>
            <Icon isFocus={isFocused}/>
          </View>
          <Text style={[styles.buttonLabel, isFocused && {color: "#282828"}]}>{title}</Text>
        </TouchableOpacity>
    );
  }

}

const spacingItems = 0;
const styles = StyleSheet.create({
  button: {
    flex: 1,
    marginLeft: spacingItems,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonIcon: {
    justifyContent: "center",
    alignItems: "center",

    width: 30,
    height: 30,

    marginBottom: 4,
  },
  buttonLabel: {
    fontSize: 13,
    lineHeight: 16,
    textAlign: "center",
    color: "#8E8E8E",
  },

  psevdoFooter: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "red",
  },
});

export default NavigationButton