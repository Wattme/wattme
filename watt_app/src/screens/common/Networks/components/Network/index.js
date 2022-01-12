import React from "react";
import {
  View,
  Image,
  StyleSheet, TouchableOpacity,
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  CommonAccept as CommonAcceptIcon
} from "../../../../../assets/icons";

class Network extends React.PureComponent {
  render() {
    const {
      item,

      isLast,
      isSelect,

      onPress
    } = this.props;

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.6}
        onPress={() => onPress(item.code)}
      >
        <View style={styles.cardIcon}>
          <Image
            style={{width: 36, height: 36}}
            resizeMode="contain"
            source={item.icon}
          />
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.cardName}>
            {item.name}
          </Text>

          <View style={styles.cardRight}>
            {Boolean(isSelect)&&(
              <CommonAcceptIcon size={20} color="#8E8E8E"/>
            )}
          </View>
        </View>

        {Boolean(!isLast)&&(
          <View style={styles.cardArrow}/>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
  cardIcon: {
    width: 36,
    height: 36,
    borderRadius: 999,
    // borderWidth: 1,
    // borderStyle: "solid",
    // borderColor: "#F0F0F0"
  },
  cardBody: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16
  },
  cardRight: {},
  cardName: {
    flex: 1,
    fontSize: 14,
    lineHeight: 17,
    color: "#282828"
  },

  cardArrow: {
    position: "absolute",
    left: 68,
    right: 16,
    bottom: 0,

    height: 2,
    backgroundColor: "#F9F9F9"
  },
});

export default Network;
