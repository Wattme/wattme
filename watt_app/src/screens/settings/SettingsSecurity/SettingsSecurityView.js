import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView
} from "react-native/index";
import {
  Text,
  Switch,
  Checkbox
} from "react-native-ui-lib";
import {
  Header
} from "../../../components";
import {
  CommonArrowRight as CommonArrowRightIcon
} from "../../../assets/icons";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";

class SettingsSecurity extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
  };

  render() {
    return (
      <View style={styles.root}>

        <Header title={allTranslations(localization.settingsSecurity.headerTitle)}/>

        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.container}>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                { allTranslations(localization.settingsSecurity.blockingMethod.title) }
              </Text>
              <View style={styles.sectionBody}>
                <View style={[styles.sectionRow, {marginTop: 0}]}>
                  <Text style={styles.sectionRowLabel}>
                    { allTranslations(localization.settingsSecurity.blockingMethod.accessCode) }
                  </Text>
                  <Checkbox
                    size={32}
                  />
                </View>
                <View style={styles.sectionRow}>
                  <Text style={styles.sectionRowLabel}>
                    { allTranslations(localization.settingsSecurity.blockingMethod.accessCodeBiometrics) }
                  </Text>
                  <Checkbox
                    size={32}
                  />
                </View>
              </View>
            </View>

            <View style={styles.sectionSeparate}/>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                { allTranslations(localization.settingsSecurity.touchID.title) }
              </Text>
              <View style={styles.sectionBody}>
                <View style={[styles.sectionRow, {marginTop: 0}]}>
                  <Text style={styles.sectionRowLabel}>
                    { allTranslations(localization.settingsSecurity.touchID.toEnter) }
                  </Text>
                  <Switch />
                </View>
                <View style={styles.sectionRow}>
                  <Text style={styles.sectionRowLabel}>
                    { allTranslations(localization.settingsSecurity.touchID.forSignature) }
                  </Text>
                  <Switch />
                </View>
              </View>
            </View>

            <View style={styles.sectionSeparate}/>

            <View style={styles.section}>
              <View style={styles.sectionBody}>
                <View style={[styles.sectionRow, {marginTop: 0}]}>
                  <Text style={styles.sectionRowLabel}>
                    { allTranslations(localization.settingsSecurity.changePassword) }
                  </Text>
                  <CommonArrowRightIcon color="#8E8E8E"/>
                </View>
              </View>
            </View>

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

  section: {},
  sectionTitle: {
    fontSize: 16,
    lineHeight: 19,
    color: "#8E8E8E",
    fontWeight: "500",
    marginBottom: 12
  },
  sectionBody: {},
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

  sectionSeparate: {
    marginVertical: 15,
    width: "100%",
    height: 2,
    backgroundColor: "#F2F3F4"
  },
});

export default SettingsSecurity;
