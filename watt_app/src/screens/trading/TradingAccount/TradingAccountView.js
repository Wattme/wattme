import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  Assets as AssetsComponent,
  Header as HeaderComponent,
  Balance as BalanceComponent,
  DiagramBalance as DiagramBalanceComponent
} from "./components";

class TradingAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {};

  _routeGoBack = () => {
    this.props.navigation.goBack();
  }

  render() {
    const {
      trading,

      currencies
    } = this.props;
    const accountBalances = trading?.profile?.balances || [];
    const listKeys = trading?.listKeys || [];

    return (
      <View style={styles.root}>

        <HeaderComponent
          listKeys={listKeys}

          goBack={this._routeGoBack}
        />

        <ScrollView style={{flexGrow: 1}} contentContainerStyle={styles.scrollView}>

          <BalanceComponent
            accountBalances={accountBalances}
            currencies={currencies}
          />

          <View style={{marginTop: 12}}/>

          {/*<DiagramBalanceComponent/>*/}

          <AssetsComponent
            balances={trading?.profile?.balances || []}
            currencies={currencies || []}
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
  }
});

export default TradingAccount;
