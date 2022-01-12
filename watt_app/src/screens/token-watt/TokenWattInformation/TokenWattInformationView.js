import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView, Linking,
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  Header
} from "../../../components";
import {
  AboutTokenWatt as AboutTokenWattComponent,
  AboutPreSaleWatt as AboutPreSaleWattComponent
} from "./components";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import { getLinkLanding } from "../../../helpers/linking";
import urls from "../../../constants/urls";


class TokenWattInformation extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
  };


  _routeLitePaper = async () => {
    const link = getLinkLanding(urls.litePaper);
    await Linking.openURL(link)
  }
  _routePresentation = async () => {
    const link = getLinkLanding(urls.presentation);
    await Linking.openURL(link)
  }

  render() {
    return (
      <View style={styles.root}>

        <Header title={allTranslations(localization.tokenWattInformation.headerTitle)}/>

        <ScrollView contentContainerStyle={styles.scrollView}>

          <AboutTokenWattComponent
            routeLitePaper={this._routeLitePaper}
            routePresentation={this._routePresentation}
          />

          <View style={{marginTop: 12}}/>

          <AboutPreSaleWattComponent/>

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

export default TokenWattInformation;
