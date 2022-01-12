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
import {
  BlurView
} from "../../../../../components";
import { Portal } from "react-native-portalize";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import { getFontFamily } from "../../../../../theme/theme-manager/Text";

class PopUpMessage extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      note: props?.note || ""
    };
  }

  onChangeNote = (note) => {
    if (note.length > 200) {
      note = note.slice(0, 200);
    }

   this.setState({ note });
  }

  render() {
    const {
      open
    } = this.props;
    const {
      note
    } = this.state;

    if (!open) {
      return null
    }

    return (
      <Portal>
        <BlurView style={{flex: 1}}>
          <View style={styles.root}>

            <View style={styles.container}>
              <View style={styles.containerHead}>
                <TouchableOpacity style={styles.buttonCancel}>
                  <Text style={styles.buttonCancelLabel}>
                    { allTranslations(localization.common.cancel) }
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSave}>
                  <Text style={styles.buttonSaveLabel}>
                    { allTranslations(localization.common.save) }
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.containerBody}>
                <TextInput
                  value={note}
                  style={styles.input}
                  placeholder={allTranslations(localization.tradingTradeInfo.popUpMessage.inputPlaceholder)}
                  placeholderTextColor="#8E8E8E"
                  textAlignVertical="top"

                  autoFocus
                  multiline

                  onChangeText={this.onChangeNote}
                />
                <Text style={styles.counter}>{ note.length }/200</Text>
              </View>
            </View>

          </View>
        </BlurView>
      </Portal>
    );
  }
}

const styles = StyleSheet.create({

  root: {
    flex: 1,

    paddingHorizontal: 12,
    paddingVertical: 30,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  container: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 14
  },
  containerHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    height: 50,
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#F9F9F9",

    padding: 16,
    paddingBottom: 15
  },
  containerBody: {
    padding: 16,
    paddingTop: 15
  },

  buttonCancel: {
    height: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonCancelLabel: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828"
  },

  buttonSave: {
    height: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonSaveLabel: {
    fontSize: 18,
    lineHeight: 21,
    color: "#282828",
    fontWeight: "500"
  },

  input: {
    minHeight: 88,
    fontSize: 14,
    color: "#282828",
    marginBottom: 12,
    fontFamily: getFontFamily("normal")
  },

  counter: {
    fontSize: 14,
    lineHeight: 17,
    color: "#282828",
    textAlign: "right"
  }

});

export default PopUpMessage
