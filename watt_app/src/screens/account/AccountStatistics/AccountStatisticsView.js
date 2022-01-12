import React, { Component } from "react";
import {
  View,
  StyleSheet,

  SafeAreaView,
  FlatList
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  Tabs,
  Header
} from "../../../components";
import {
  DropDownSort as DropDownSortComponent,
  UserRow as UserRowComponent
} from "./components";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import EStyleSheet from "react-native-extended-stylesheet";
import agentWiseWin from "../../../agent/agentWiseWin";


class AccountStatistics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listChecks: [],
      listTopPower: [],

      activeTab: "checks",
    };
  }

  componentDidMount = async () => {
    await this.getListChecks();
  };


  getListChecks = async () => {

    if (this.state.listChecks.length > 0) {
      return null
    }

    const url = `/auth/user-energy-checks`;
    const response = await agentWiseWin.get(url).then((res) => {
      return res.data
    }).catch((err) => {
      return []
    });

    this.setState({
      listChecks: response
    });
  }
  getListTopPower = async () => {

    if (this.state.listTopPower.length > 0) {
      return null
    }

    const url = `/auth/user-energy-top-power`;
    const response = await agentWiseWin.get(url).then((res) => {
      return res.data
    }).catch((err) => {
      return []
    });


    this.setState({
      listTopPower: response
    });
  }

  changeActiveTab = async (activeTab) => {
    await this.setState({
      activeTab
    });

    if (activeTab === "checks") {
      await this.getListChecks();
    }
    if (activeTab === "qualification") {
      await this.getListTopPower();
    }
  }

  _tabs = () => {
    return [
      { value: "checks", label: allTranslations(localization.accountStatistics.tabs.checks) },
      { value: "qualification", label: allTranslations(localization.accountStatistics.tabs.qualification) },
    ]
  }
  _renderItemFlatList = (props) => {
    const { item, index } = props;

    return (
      <>

        {Boolean(index > 0) && (
          <View style={ styles.flatListSeparate }/>
        )}

        <UserRowComponent
          user={item}
          index={index + 1}
          isQualification={Boolean(this.state.activeTab === "qualification")}
        />

      </>
    )
  }

  render() {
    const {
      listChecks,
      listTopPower,
      activeTab
    } = this.state;
    const list = Boolean(activeTab === "checks") ? listChecks : listTopPower;

    return (
      <View style={styles.root}>

        <Header title={allTranslations(localization.accountStatistics.headerTitle)}/>

        <View style={styles.container}>

          <View style={styles.tabsContent}>
            <Tabs
              value={activeTab}
              items={this._tabs()}

              styleTabLabel={styles.styleTabLabel}

              onChange={this.changeActiveTab}
            />
          </View>

          {Boolean(false)&&(
            <View style={styles.sortContainer}>
              <DropDownSortComponent/>
            </View>
          )}

          <SafeAreaView style={styles.safeAreaView}>
            <FlatList
              data={list}
              contentContainerStyle={{ paddingBottom: 16 }}
              showsVerticalScrollIndicator={false}
              renderItem={this._renderItemFlatList}
            />
          </SafeAreaView>

        </View>

      </View>
    );
  }
}

const styles = EStyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F2F2F6"
  },
  container: {
    flexGrow: 1,
    marginHorizontal: 12,
    marginVertical: 16,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0"
  },

  tabsContent: {
    marginBottom: 24
  },
  styleTabLabel: {
    fontSize: 14,
    lineHeight: 17,

    "@media(min-width: 400)": {
      fontSize: 18,
      lineHeight: 21
    }
  },

  sortContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },

  safeAreaView: {
    flex: 1,
    marginTop: 16,
    marginBottom: -16
  },
  flatListSeparate: {
    height: 2,
    backgroundColor: "#F9F9F9",
    marginLeft: 56,
    marginVertical: 15
  },
})

export default AccountStatistics;
