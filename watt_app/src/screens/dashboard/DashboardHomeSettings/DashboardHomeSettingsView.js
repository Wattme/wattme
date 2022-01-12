import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native/index";
import {
  Text,
  Button
} from "react-native-ui-lib";
import {
  Header
} from "../../../components";
import {
  CommonX as CommonXIcon
} from "../../../assets/icons";
import {
  SectionBlock as SectionBlockComponent
} from "./components";
import Notification from "../../../common/Notification";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import { getItem, setItem } from "../../../common/Storage";

const initForm = {
  wallet: {
    visible: true,
    index: 0
  },
  stockExchange: {
    visible: true,
    index: 1
  },
  market: {
    visible: true,
    index: 2
  },
  longShort: {
    visible: true,
    index: 3
  },
  trades: {
    visible: true,
    index: 4
  },
  bots: {
    visible: true,
    index: 5
  },
};

class DashboardHomeSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {

      form: {...initForm},

    };
  }

  componentDidMount = async () => {
    await this.initialForm();
  };

  initialForm = async () => {
    const storageForm = await getItem("settings-dashboard");

    if (!storageForm) {
      return null
    }

    const parseStorageForm = JSON.parse(storageForm);

    this.setState({
      form: parseStorageForm
    })
  }

  setDefaultSettings = async () => {

    await this.setState({
      form: {...initForm}
    });

    await this.saveNewSettings();

  }
  saveNewSettings = async () => {
    const newStorageForm = { ...this.state.form };

    await setItem(JSON.stringify(newStorageForm), "settings-dashboard");

    Notification.send({
      message: allTranslations(localization.dashboardHomeSettings.success.successSaveConfiguration),
      type: "success"
    })
  }

  changeVisibleSection = async (name) => {

    let newForm = { ...this.state.form };

    newForm[name].visible = !newForm[name].visible;

    this.setState({
      form: newForm
    })

  }

  _headerLeftContent = () => {
    return (
      <CommonXIcon
        color="#8E8E8E"
      />
    )
  }

  render() {
    const {
      form
    } = this.state;

    return (
      <View style={styles.root}>

        <Header
          title={allTranslations(localization.dashboardHome.headerTitle)}
          leftContent={this._headerLeftContent}
          styleRoot={{backgroundColor: "transparent"}}
        />

        <ScrollView contentContainerStyle={styles.scrollView}>

          <Text style={styles.caption}>
            { allTranslations(localization.dashboardHomeSettings.caption) }
          </Text>


          <SectionBlockComponent
            value={form.wallet?.visible}
            name="wallet"
            label={allTranslations(localization.dashboardHomeSettings.sections.wallet)}
            onChange={this.changeVisibleSection}
          />

          <View style={{ marginTop: 12 }}/>

          <SectionBlockComponent
            value={form.stockExchange?.visible}
            name="stockExchange"
            label={allTranslations(localization.dashboardHomeSettings.sections.stockExchange)}
            onChange={this.changeVisibleSection}
          />

          {
            Boolean(false) && (
              <>

                <View style={{ marginTop: 12 }}/>

                <SectionBlockComponent
                  value={form.market?.visible}
                  name="market"
                  label={allTranslations(localization.dashboardHomeSettings.sections.market)}
                  onChange={this.changeVisibleSection}
                />

              </>
            )
          }

          <View style={{ marginTop: 12 }}/>

          <SectionBlockComponent
            value={form.longShort?.visible}
            name="longShort"
            label={allTranslations(localization.dashboardHomeSettings.sections.longShort)}
            onChange={this.changeVisibleSection}
          />

          {
            Boolean(false) && (
              <>
                <View style={{ marginTop: 12 }}/>

                <SectionBlockComponent
                  value={form.trades?.visible}
                  name="trades"
                  label={allTranslations(localization.dashboardHomeSettings.sections.trades)}
                  onChange={this.changeVisibleSection}
                />

                <View style={{ marginTop: 12 }}/>

                <SectionBlockComponent
                  value={form.bots?.visible}
                  name="bots"
                  label={allTranslations(localization.dashboardHomeSettings.sections.bots)}
                  onChange={this.changeVisibleSection}
                />
              </>
            )
          }

          <View style={{ marginTop: 16 }}/>

          <Text style={styles.caption}>
            { allTranslations(localization.dashboardHomeSettings.captionFooter) }
          </Text>

          <View style={styles.controls}>

            <Button
              label={allTranslations(localization.dashboardHomeSettings.buttonDefault)}

              style={styles.buttonDefault}
              labelStyle={styles.buttonDefaultLabel}

              onPress={this.setDefaultSettings}
            />

            <Button
              label={allTranslations(localization.dashboardHomeSettings.buttonSave)}

              style={styles.buttonSave}
              labelStyle={styles.buttonSaveLabel}

              onPress={this.saveNewSettings}
            />

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
    flexGrow: 1,
    paddingHorizontal: 12,
    paddingVertical: 16
  },

  caption: {
    paddingHorizontal: 16,
    marginBottom: 16,

    fontSize: 14,
    lineHeight: 21,
    color: "#8E8E8E"
  },

  controls: {
    marginTop: 16,
  },

  buttonDefault: {
    height: 32,
    paddingVertical: 0,
    backgroundColor: "transparent",
    borderColor: "transparent"
  },
  buttonDefaultLabel: {
    fontSize: 14,
    lineHeight: 17,
    color: "#282828"
  },
  buttonSave: {
    height: 32,
    paddingVertical: 0,
    borderRadius: 8,
    marginTop: 16
  },
  buttonSaveLabel: {
    fontSize: 14,
    lineHeight: 17,
    color: "#282828",
    fontWeight: "normal"
  },
});

export default DashboardHomeSettings;
