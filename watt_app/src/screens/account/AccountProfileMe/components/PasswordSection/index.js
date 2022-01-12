import React, { PureComponent } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  CommonEdit as CommonEditIcon
} from "../../../../../assets/icons";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

class PasswordSection extends PureComponent {
  render() {
    const {
       onOpenEdit
    } = this.props;

    return (
      <View style={styles.root}>

        <Text style={styles.label}>
          { allTranslations(localization.accountProfileMe.passwordSection.label) }
        </Text>

        <View style={styles.body}>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>**************</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={onOpenEdit} activeOpacity={0.8}>
            <CommonEditIcon color="#8E8E8E"/>
          </TouchableOpacity>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderRadius: 14,
    borderStyle: "solid",
    borderColor: "#F0F0F0",

    backgroundColor: "white",

    padding: 16
  },

  label: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E",
    marginBottom: 8
  },

  body: {
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    height: 48,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,

    backgroundColor: "#F7F7F7",
    borderRadius: 14
  },
  inputLabel: {
    fontSize: 18,
    lineHeight: 21,
    color: "#282828",
    marginBottom: -8
  },

  button: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#F7F7F7",

    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12
  }

});

export default PasswordSection;
