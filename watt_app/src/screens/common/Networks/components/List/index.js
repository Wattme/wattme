import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
} from "react-native/index";
import {

} from "react-native-ui-lib";
import NetworkComponent from "../Network";

class List extends React.PureComponent {
  render() {
    const {
      data,
      value,

      onChange
    } = this.props;

    return (
      <ScrollView
        style={styles.root}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {data.map((item, index) => {
            return (
              <NetworkComponent
                key={`network-item-${index}-${item.code}`}
                item={item}

                isLast={Boolean(data.length - 1 <= index)}
                isSelect={Boolean(value === item.code)}

                onPress={onChange}
              />
            )
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 12,
  },
  container: {
    marginVertical: 16,
    flexGrow: 1,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,
    paddingVertical: 1,

    backgroundColor: "white"
  },
});

export default List
