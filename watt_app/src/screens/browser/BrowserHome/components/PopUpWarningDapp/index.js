import React from "react";
import {
  View,
  StyleSheet
} from "react-native/index";
import {
  Text,
  Button
} from "react-native-ui-lib";
import {
  Portal
} from "react-native-portalize";
import {
  BlurView
} from "../../../../../components";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

class PopUpWarningDapp extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      onSuccess: null,
      isOpen: false
    };
  }

  open = ({ onSuccess }) => {
    this.setState({
      onSuccess,
      isOpen: true
    })
  }

  onSuccess = () => {
    this.setState({ isOpen: false });
    this.state?.onSuccess();
  }

  render() {
    const {
      isOpen
    } = this.state;

    if (!isOpen) {
      return null
    }

    return (
      <Portal>
        <BlurView style={{flex: 1}}>
          <View style={styles.root}>

            <View style={styles.informationCard}>

              <Text style={styles.informationCardMessage}>
                {allTranslations(localization.browserHome.popUpWarningDapp.message)}
              </Text>

              <View style={styles.controls}>
                <Button
                  label={allTranslations(localization.popUpInformation.close)}
                  size="xsSmall"
                  color="secondary"
                  labelStyle={{fontWeight: "normal"}}
                  style={{marginLeft: 12, flex: 1}}

                  onPress={() => this.setState({ isOpen: false })}
                />
                <Button
                  label={allTranslations(localization.popUpInformation.confirm)}
                  size="xsSmall"
                  style={{marginLeft: 12, flex: 1}}
                  labelStyle={{fontWeight: "normal"}}

                  onPress={this.onSuccess}
                />
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
    padding: 28,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(40, 40, 40, 0.4)"
  },

  informationCard: {
    zIndex: 10,
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#F7F7F7",

    width: "100%"
  },
  informationCardMessage: {
    fontSize: 18,
    lineHeight: 26,
    color: "#000000",
    fontWeight: "500",
    textAlign: "center"
  },


  controls: {
    marginTop: 32,
    marginLeft: -12,
    flexDirection: "row"
  }
});

export default PopUpWarningDapp
