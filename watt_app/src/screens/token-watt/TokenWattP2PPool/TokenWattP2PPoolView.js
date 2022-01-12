import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView
} from "react-native/index";
import {

} from "react-native-ui-lib";
import {
  Header,
  PopUpInformation
} from "../../../components";
import {
  P2PPoolInfo as P2PPoolInfoComponent,
  MyP2PPool as MyP2PPoolComponent,
  PopUpWithdrawFunds as PopUpWithdrawFundsComponent
} from "./components";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";


class TokenWattP2PPool extends Component {
  constructor(props) {
    super(props);

    this.state = {

      isOpenPopUpWithdrawFunds: false
    };

    this.refPopUpInformation = React.createRef();
  }

  componentDidMount = () => {
  };

  _openInfoP2PPool = () => {
    this.refPopUpInformation.current.open({
      title: allTranslations(localization.tokenWattP2PPool.popUpInfoP2PPool.title),
      caption: allTranslations(localization.tokenWattP2PPool.popUpInfoP2PPool.caption),
      message: allTranslations(localization.tokenWattP2PPool.popUpInfoP2PPool.message),
      successButton: allTranslations(localization.tokenWattP2PPool.popUpInfoP2PPool.successButton),

      successButtonColor: "primary"
    })
  }

  render() {
    const {
      isOpenPopUpWithdrawFunds
    } = this.state;

    return (
      <View style={styles.root}>

        <Header title={allTranslations(localization.tokenWattP2PPool.headerTitle)}/>

        <ScrollView contentContainerStyle={styles.scrollView}>

          <P2PPoolInfoComponent
            openInfoP2PPool={this._openInfoP2PPool}
          />

          <View style={{ marginTop: 12 }}/>

          <MyP2PPoolComponent

          />

        </ScrollView>


        <PopUpInformation
          ref={this.refPopUpInformation}

          styles={{
            title: styles.popUpInformationTitle,
            caption: styles.popUpInformationCaption,
            message: styles.popUpInformationMessage,
          }}
        />


        <PopUpWithdrawFundsComponent
          open={isOpenPopUpWithdrawFunds}
        />

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
    paddingVertical: 16,
    paddingHorizontal: 12
  },



  popUpInformationTitle: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "500"
  },
  popUpInformationCaption: {
    fontSize: 14,
    lineHeight: 23,
    color: "#282828",
    fontWeight: "normal"
  },
  popUpInformationMessage: {
    fontSize: 14,
    lineHeight: 23,
    color: "#8E8E8E"
  },
});

export default TokenWattP2PPool;
