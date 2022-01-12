import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity, Linking,
} from "react-native/index";
import {
  Checkbox,
  Text,
  Button
} from "react-native-ui-lib";
import {
  Header
} from "../../../components";
import {
  CommonArrowRight as CommonArrowRightIcon
} from "../../../assets/icons";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import urls from "../../../constants/urls";
import EStyleSheet from "react-native-extended-stylesheet";

class ImportWallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAcceptBackup: false
    };
  }

  openLink = async (link) => {
    await Linking.openURL(link);
  }

  _routeImportWalletCoin = () => {
    this.props.navigation.navigate("ImportWalletCoin")
  }

  render() {
    const {
      isAcceptBackup
    } = this.state;

    return (
      <View style={styles.root}>

        <Header title={allTranslations(localization.importWallet.headerTitle)}/>

        <ScrollView style={{flexG: 1}} contentContainerStyle={styles.scrollView}>

          <Text style={styles.message}>
            {allTranslations(localization.importWallet.message)}
          </Text>

          <View style={styles.linksContainer}>

            <TouchableOpacity style={styles.link} activeOpacity={0.6} onPress={() => this.openLink(urls.privacyPolicy)}>
              <Text style={styles.linkTitle}>
                {allTranslations(localization.importWallet.privacyPolicy)}
              </Text>
              <CommonArrowRightIcon color="#8E8E8E"/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.link} activeOpacity={0.6} onPress={() => this.openLink(urls.termsOfUse)}>
              <Text style={styles.linkTitle}>
                {allTranslations(localization.importWallet.termsOfUse)}
              </Text>
              <CommonArrowRightIcon color="#8E8E8E"/>
            </TouchableOpacity>

          </View>

        </ScrollView>

        <View style={styles.footer}>

          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => this.setState({isAcceptBackup: !isAcceptBackup})}
            activeOpacity={0.8}
          >
            <Checkbox
              value={isAcceptBackup}
              style={styles.checkboxItem}
              onValueChange={() => this.setState({isAcceptBackup: !isAcceptBackup})}
            />
            <Text style={styles.checkboxLabel}>
              {allTranslations(localization.importWallet.checkboxLabel)}
            </Text>
          </TouchableOpacity>

          <Button
            style={{marginTop: 22}}
            disabled={!isAcceptBackup}
            label={allTranslations(localization.importWallet.next)}

            onPress={this._routeImportWalletCoin}
          />

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
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 12,
    paddingVertical: 16
  },

  message: {
    fontSize: 16,
    lineHeight: 23,
    textAlign: "center",
    color: "#8E8E8E",

    marginBottom: 16
  },

  linksContainer: {
    marginBottom: -12
  },

  link: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 14,
    backgroundColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",

    marginBottom: 12
  },
  linkTitle: {
    flex: 1,
    fontSize: 16,
    lineHeight: 19,
    color: "black"
  },
  linkIcon: {},

  checkbox: {
    flexDirection: "row",
    alignItems: "center"
  },
  checkboxItem: {},
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "300",
    color: "#282828",

    marginLeft: 12
  },

  footer: {
    marginTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 12,

    "@media (min-width: 400)": {
      marginTop: 32,
      paddingBottom: 54,
    }
  },
});

export default ImportWallet
