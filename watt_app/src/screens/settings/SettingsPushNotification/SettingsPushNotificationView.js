import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView
} from "react-native/index";
import {
  Text,
  Switch
} from "react-native-ui-lib";
import {
  Header
} from "../../../components";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";

class SettingsPushNotification extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
  };

  render() {
    return (
      <View style={styles.root}>

        <Header title={allTranslations(localization.settingsPushNotification.headerTitle)}/>

        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.container}>

            <View style={styles.sectionRow}>
              <Text style={styles.sectionRowLabel}>
                { allTranslations(localization.settingsPushNotification.allowPushNotifications) }
              </Text>
              <Switch value={true}/>
            </View>
            <View style={styles.sectionRow}>
              <Text style={styles.sectionRowLabel}>
                { allTranslations(localization.settingsPushNotification.sentAndReceived) }
              </Text>

              <Switch value={true} disabled/>
            </View>

            <Text style={styles.message}>
              { allTranslations(localization.settingsPushNotification.message) }
            </Text>

          </View>
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F2F2F6"
  },
  scrollView: {
    paddingHorizontal: 12,
    paddingVertical: 16
  },
  container: {
    backgroundColor: "white",
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",

    padding: 16
  },

  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12
  },
  sectionRowLabel: {
    fontSize: 16,
    lineHeight: 26,
    color: "#282828"
  },

  message: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 23,
    color: "#8E8E8E"
  },
});

export default SettingsPushNotification;
