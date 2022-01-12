import React, {Component} from "react";
import {
  View,
  StyleSheet
} from "react-native/index";
import {
  Button,
} from "react-native-ui-lib";
import {
  HeaderMini as HeaderMiniComponent
} from "../../../components";
import {
  Slider as SliderComponent,
  SliderItem as SliderItemComponent
} from "./components";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import EStyleSheet from "react-native-extended-stylesheet";

const tabs = [
  {
    image: require("../../../assets/png/wallet-choice-adding/safe.png"),
    label: localization.walletChoiceAdding.tabs.tab1.label,
    message: localization.walletChoiceAdding.tabs.tab1.message,
  },
  {
    image: require("../../../assets/png/wallet-choice-adding/NFT.png"),
    label: localization.walletChoiceAdding.tabs.tab2.label,
    message: localization.walletChoiceAdding.tabs.tab2.message,
  },
  {
    image: require("../../../assets/png/wallet-choice-adding/NFTWallet.png"),
    label: localization.walletChoiceAdding.tabs.tab3.label,
    message: localization.walletChoiceAdding.tabs.tab3.message,
  },
];

class WalletChoiceAdding extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
  };

  _routeWalletImport = () => {
    this.props.navigation.navigate("ImportWallet");
  }
  _routeWalletCreate = () => {
    this.props.navigation.navigate("WalletCreate");
  }

  render() {
    return (
      <View style={styles.root}>

        <HeaderMiniComponent/>

        <SliderComponent>
          {tabs.map((tab, idxTab) => (
            <SliderItemComponent key={`WalletChoiceAdding-${idxTab}`} {...tab}/>
          ))}
        </SliderComponent>

        <View style={styles.footer}>
          <Button
            label={allTranslations(localization.walletChoiceAdding.buttonCreate)}
            onPress={this._routeWalletCreate}
          />
          <Button
            style={styles.buttonImport}
            label={allTranslations(localization.walletChoiceAdding.buttonImport)}
            labelStyle={{fontWeight: "normal"}}
            onPress={this._routeWalletImport}/>
        </View>

      </View>
    );
  }
}

const styles = EStyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white"
  },

  footer: {
    marginTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 12,

    "@media (min-width: 400)": {
      marginTop: 34,
      paddingBottom: 20,
    }
  },

  buttonImport: {
    marginTop: 16,
    backgroundColor: "white",
    borderColor: "white",

    "@media (min-width: 400)": {
      marginTop: 20,
    }
  }
});

export default WalletChoiceAdding;
