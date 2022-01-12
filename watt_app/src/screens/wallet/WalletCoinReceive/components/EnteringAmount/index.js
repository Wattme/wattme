import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
} from "react-native/index";
import {
  Text,
  Button,
} from "react-native-ui-lib";
import {
  Portal
} from "react-native-portalize";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import { getFontFamily } from "../../../../../theme/theme-manager/Text";
import { BlurView } from "../../../../../components";

class EnteringAmount extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      amount: props?.amount || ''
    };
  }

  onChangeAmount = (amount) => {
    this.setState({ amount });
  }

  render() {
    const {
      open
    } = this.props;

    if (!open) {
      return null
    }

    return (
      <Portal>

        <View style={styles.container}>

          <View style={styles.section}>
            <Text style={styles.title}>
              { allTranslations(localization.walletCoinReceive.dialogAmount.title) }
            </Text>

            <TextInput
              value={this.state.amount}
              style={styles.input}
              placeholder={allTranslations(localization.walletCoinReceive.dialogAmount.placeholder)}
              placeholderTextColor="#8E8E8E"
              keyboardType="decimal-pad"

              onChangeText={this.onChangeAmount}
            />

            <View style={styles.controls}>
              <Button
                style={styles.control}
                label={allTranslations(localization.walletCoinReceive.dialogAmount.cancel)}
                labelStyle={{fontWeight: "normal"}}
                color="secondary"
                size="xsSmall"

                onPress={this.props.onClose}
              />
              <Button
                style={styles.control}
                label={allTranslations(localization.walletCoinReceive.dialogAmount.accept)}
                labelStyle={{fontWeight: "normal"}}
                size="xsSmall"

                onPress={() => this.props.onChange(this.state.amount)}
              />
            </View>

          </View>

        </View>

        <BlurView style={styles.blurView}/>

      </Portal>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    zIndex: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  section: {
    backgroundColor: "#F7F7F7",
    borderRadius: 14,
    padding: 16,
    width: "100%",
    maxWidth: 300
  },
  title: {
    fontSize: 18,
    lineHeight: 26,
    color: "#000000",
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 16
  },
  input: {
    fontFamily: getFontFamily(),
    fontSize: 14,
    color: "black",
    height: 40,
    paddingHorizontal: 16,
    paddingVertical: 0,
    alignItems: "center",
    marginBottom: 16,

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,

    backgroundColor: "white"
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -12
  },
  control: {
    marginLeft: 12,
    flex: 1,
  },

  blurView: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(40, 40, 40, 0.4)"
  },

});

export default EnteringAmount
