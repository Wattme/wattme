import React from "react";
import {
  View,
  StyleSheet
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  CommonWarn as CommonWarnIcon,
  CommonError as CommonErrorIcon,
  CommonCloseCircle as CommonCloseCircleIcon
} from "../../assets/icons";

const BlockInformation = (props) => {
  const {
    type,
    title,
    message
  } = props;

  const Icon = () => {
    if (type === "error") {
      return CommonErrorIcon
    }
    if (type === "close") {
      return CommonCloseCircleIcon
    }

    return CommonWarnIcon
  }

  const IconComponent = Icon();

  return (
    <View style={styles.root}>
      <View style={styles.icon}>
        <IconComponent color="#F5386A"/>
      </View>
      <View style={styles.messageContainer}>

        {Boolean(title)&&(
          <Text style={styles.title}>{ title }</Text>
        )}

        <Text style={styles.message}>
          {message}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",

    backgroundColor: "#F7F7F7",
    borderRadius: 14,
    padding: 16
  },

  icon: {},

  title: {
    fontSize: 16,
    lineHeight: 23,
    color: "#F5386A",
    fontWeight: "500",
    marginBottom: 12
  },

  messageContainer: {
    flex: 1,
    minHeight: 32,
    justifyContent: 'center',
    marginLeft: 16,
  },
  message: {
    fontSize: 16,
    lineHeight: 23,
    color: "#F5386A"
  },
});

export default BlockInformation
