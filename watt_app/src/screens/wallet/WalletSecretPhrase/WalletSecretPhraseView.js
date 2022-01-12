import React, { Component } from "react";
import {
  View,
  StyleSheet
} from "react-native/index";
import {
  StepWarning as StepWarningComponent,
  StepSecretPhrase as StepSecretPhraseComponent
} from "./components";
import {
  Header
} from "../../../components";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";


class WalletSecretPhrase extends Component {
  constructor(props) {
    super(props);


    const wallet = props?.route?.params?.wallet || {};
    this.state = {
      mnemonic: wallet?.list?.[0]?.mnemonic,

      step: 1,

      inConfirm: false
    };
  }

  componentDidMount = () => {

  };

  _headerTitle = () => {
    if (this.state.step === 1) {
      return allTranslations(localization.walletSecretPhrase.header.titleStep1 )
    }

    return ""
  }

  render() {
    const {
      mnemonic,

      step,

      inConfirm
    } = this.state;

    return (
      <View style={styles.root}>

        <Header
          title={this._headerTitle()}
          styleRoot={styles.headerStyleRoot}
        />

        {Boolean(step === 1)&&(
          <StepWarningComponent
            inConfirm={inConfirm}

            onChangeConfirm={(inConfirm) => this.setState({inConfirm})}
            onNext={() => this.setState({ step: 2  })}
          />
        )}

        {Boolean(step === 2)&&(
          <StepSecretPhraseComponent
            mnemonic={mnemonic}
          />
        )}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white"
  },

  headerStyleRoot: {
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#F2F3F4"
  },
});

export default WalletSecretPhrase;
