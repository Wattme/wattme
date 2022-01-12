import React from "react";
import {
  View,
  StyleSheet
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";

class DateSection extends React.PureComponent {
  render() {
    return (
      <View style={styles.section}>

        <Text style={styles.title}>{ this.props.title }</Text>

        { this.props.children }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  section: {
    marginTop: 12
  },

  title: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E",
    marginBottom: 12,
    paddingHorizontal: 16
  }
})

export default DateSection
