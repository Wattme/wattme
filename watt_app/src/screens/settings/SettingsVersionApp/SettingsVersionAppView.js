import React, { Component } from "react";
import {
  View,
  StyleSheet,

  SafeAreaView,
  FlatList
} from "react-native/index";
import {
  Header
} from "../../../components";
import {
  VersionItem as VersionItemComponent
} from "./components";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";

class SettingsVersionApp extends Component {
  constructor(props) {
    super(props);

    this.state = {

      changeHistory: [{}],

    };
  }

  componentDidMount = () => {
  };

  _FlatListRenderItem = (props) => {
    const { item, index } = props;

    return (
      <VersionItemComponent info={item}/>
    )
  }

  render() {
    const {
      changeHistory
    } = this.state;

    return (
      <View style={styles.root}>

        <Header title={allTranslations(localization.settingsVersionApp.headerTitle)}/>

        <SafeAreaView style={{flexGrow: 1}}>
          <FlatList
            data={changeHistory}
            contentContainerStyle={styles.flatList}

            renderItem={this._FlatListRenderItem}
          />
        </SafeAreaView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F2F2F6"
  },

  flatList: {
    paddingHorizontal: 12,
    paddingVertical: 16
  }
})


export default SettingsVersionApp;
