import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  BoxShadow,
} from "react-native-shadow";

const TextField = (props) => {
  const { style, error, helperText } = props;

  const [sizeTextField, setSizeTextField] = useState({width: 100, height: 100})

  const _renderLeftBody = () => {
    if (!props.renderLeft) {
      return null
    }

    return (
      <View style={{marginLeft: 8}}>
        {props.renderLeft()}
      </View>
    )
  };
  const _renderRightBody = () => {
    if (!props.renderRight) {
      return null
    }

    return props.renderRight()
  };
  const _renderFooter = () => {
    if (!props.renderFooter) {
      return null;
    }

    return props.renderFooter();
  };

  const _styleConverter = () => {
    return style;
  };

  const _optionShadow = () => {
    return {
      width: sizeTextField.width - 6,
      height: sizeTextField.height - 6,
      color: "#000000",
      border: 6,
      radius: 12,
      opacity: 0.1,
      x: 3,
      y: 5,
      style: styles.shadow
    };
  };

  const rootOnLayout = ({ nativeEvent }) => {
    const newSizeTextField = {width: nativeEvent.layout.width, height: nativeEvent.layout.height};
    setSizeTextField(newSizeTextField);
  }

  return (
    <View>

      <View
        style={[
          styles.root,
          Boolean(error) && styles.rootError
        ]}
        onLayout={rootOnLayout}
      >

        <View style={styles.body}>

          {_renderLeftBody()}

          <TextInput
            {...props}

            style={[_styleConverter(), styles.input]}
          />

          {_renderRightBody()}

        </View>

        <View style={styles.footer}>
          {_renderFooter()}
        </View>

      </View>

      {
        Boolean(helperText) && (
          <Text style={[
            styles.helperText,
            Boolean(error) && styles.helperTextError,
          ]}>{helperText}</Text>
        )
      }

      <BoxShadow setting={_optionShadow()}/>

    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "white",
    borderRadius: 12,

    backgroundColor: "#f8f9fa",

    zIndex: 2
  },
  rootError: {
    borderColor: "#f55e64"
  },

  body: {
    flexDirection: "row",
    alignItems: "center",
  },
  footer: {},

  input: {
    fontFamily: "AtypText-Medium",
    color: "#333333",
    flex: 1,

    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  helperText: {
    fontSize: 14,
    lineHeight: 19,
    color: "#abc2d9",
    marginTop: 4
  },
  helperTextError: {
    color: "#f55e64"
  },

  shadow: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }
});

TextField.defaultProps = {};

export default TextField;
