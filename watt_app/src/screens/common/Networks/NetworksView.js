import React, { Component } from "react";
import {
  View,
  StyleSheet
} from "react-native/index";
import {
  List as ListComponent
} from "./components";
import {
  Header
} from "../../../components";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import networks from "../../../constants/networks";

class Networks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      networks: [],

      network: props?.route?.params?.initNetwork || "",
      backPath: props?.route?.params?.backPath || "",
    };
  }

  componentDidMount = () => {
    const allNetworks = Object.keys(networks || {})
      .map((key) => {
        return networks[key]
      })
      .filter((t) => !t.isNotSelect);

    this.setState({
      networks: allNetworks
    })
  };

  changeNetwork = (code) => {
    this.props.navigation.navigate({
      name: this.state.backPath,
      params: { network: code },
      merge: true
    });
  }

  render() {
    const {
      networks,

      network
    } = this.state;

    return (
      <View style={styles.root}>

        <Header title={allTranslations(localization.networks.headerTitle)}/>

        <View style={{flex: 1}}>
          <ListComponent
            data={networks}

            value={network}

            onChange={this.changeNetwork}
          />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F2F2F6"
  }
});

export default Networks;
