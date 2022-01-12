import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  Header
} from "../../../components";
import {
  UserCard as UserCardComponent,
  AllQualifications as AllQualificationsComponent
} from "./components";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import agentWiseWin from "../../../agent/agentWiseWin";
import urls from "../../../constants/urls";


class AccountWalkFame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ranks: {},
    };
  }

  componentDidMount = async () => {
    await this.getList();
  };

  getList = async () => {

    const { wiseWinAccount } = this.props;
    const ranks = await agentWiseWin.get(`${ urls.getWiseWinUserEnergyHistory }${ wiseWinAccount?.user_id }`).then((res) => {
      return res.data?.ranks || {}
    }).catch(() => {
      return {}
    });

    this.setState({
      ranks
    })

  }

  render() {
    const {
      account,
      wiseWinAccount
    } = this.props;
    const {
      ranks
    } = this.state;

    return (
      <View style={styles.root}>

        <Header title={allTranslations(localization.accountWalkFame.headerTitle)}/>

        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>

          <UserCardComponent
            account={account}
            wiseWinAccount={wiseWinAccount}
          />

          <View style={{ marginTop: 12 }}/>

          <AllQualificationsComponent
            ranks={ranks}
          />

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
});

export default AccountWalkFame;
