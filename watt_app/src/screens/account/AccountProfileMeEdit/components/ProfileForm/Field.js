import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import { getFontFamily } from "../../../../../theme/theme-manager/Text";

const Field = (props) => {
  const {
    value,

    label,
    caption,
    message,
    placeholder,

    required,
    disable,
    error,

    icon: Icon,
    iconPress,

    name,
    styleRoot,

    textInputProps
  } = props;


  const handleOnChange = (value) => {
    props.onChange(name, value)
  }

  return (
    <View style={[styles.root, styleRoot]}>

      <View style={styles.head}>
        <Text style={styles.label}>
          { label }

          {Boolean(required) && (
            <Text style={{color: "#f5386a"}}>&nbsp;*</Text>
          )}
        </Text>

        {Boolean(!!caption) && (
          <Text style={styles.caption}>
            { caption }
          </Text>
        )}
      </View>

      {Boolean(!!message) && (
        <Text style={styles.infoMessage}>{ message }</Text>
      )}

      <View style={[
        styles.field,
        Boolean(error) && styles.fieldError
      ]}>
        <TextInput
          value={value}
          editable={!disable}

          style={styles.fieldInput}
          placeholder={placeholder}

          onChangeText={handleOnChange}

          {...textInputProps}
        />

        {Boolean(Icon) && (
          <TouchableOpacity style={styles.fieldRight} disabled={!iconPress} onPress={iconPress}>
            <Icon/>
          </TouchableOpacity>
        )}
      </View>

      {Boolean(!!error) && (
        <Text style={styles.error}>{ error }</Text>
      )}

    </View>
  )
}

const styles = StyleSheet.create({

  root: {
    marginTop: 12
  },

  head: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 12
  },
  label: {
    fontSize: 14,
    lineHeight: 17,
    color: "#282828"
  },
  caption: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "300",
    color: "#8e8e8e",
    marginLeft: 4
  },
  infoMessage: {
    marginBottom: 8,
    fontSize: 13,
    lineHeight: 18,
    color: "#8E8E8E",
    paddingHorizontal: 12,
  },
  error: {
    marginTop: 8,
    paddingHorizontal: 12,

    fontSize: 13,
    lineHeight: 16,
    fontWeight: "300",
    color: "#F5386A"
  },

  field: {
    height: 40,
    flexDirection: "row",
    backgroundColor: "#F7F7F7",
    borderRadius: 14,
    paddingHorizontal: 12,

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F7F7F7"
  },
  fieldError: {
    borderColor: "#F5386A",
  },
  fieldInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 0,
    paddingVertical: 0,

    fontSize: 16,
    fontFamily: getFontFamily("normal")
  },
  fieldRight: {
    height: 40,
    width: 40,
    marginRight: -4,

    alignItems: "center",
    justifyContent: "center"
  },
});

export default Field
