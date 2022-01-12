import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView, Linking,
} from "react-native/index";
import {
  Header
} from "../../../components";
import {
  DocumentLink as DocumentLinkComponent
} from "./components";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import urls from "../../../constants/urls";

class AccountDocuments extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
  };



  openDocument = async (documentLink) => {
    await Linking.openURL(documentLink);
  }

  render() {
    return (
      <View style={styles.root}>

        <Header
          title={allTranslations(localization.accountDocuments.headerTitle)}
        />

        <ScrollView contentContainerStyle={styles.scrollView}>

          <DocumentLinkComponent
            label={allTranslations(localization.accountDocuments.termsOfUseTitle)}
            caption={allTranslations(localization.accountDocuments.termsOfUseCaption)}
            onOpen={() => this.openDocument(urls.termsOfUse)}
          />

          <View style={{marginTop: 12}}/>

          <DocumentLinkComponent
            label={allTranslations(localization.accountDocuments.privacyPolicyTitle)}
            caption={allTranslations(localization.accountDocuments.privacyPolicyCaption)}
            onOpen={() => this.openDocument(urls.privacyPolicy)}
          />

          <View style={{marginTop: 12}}/>

          <DocumentLinkComponent
            label={allTranslations(localization.accountDocuments.distributorAgreementTitle)}
            caption={allTranslations(localization.accountDocuments.distributorAgreementCaption)}
            onOpen={() => this.openDocument(urls.distributorAgreement)}
          />

          <View style={{marginTop: 12}}/>

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
    flexGrow: 1,
    paddingHorizontal: 12,
    paddingVertical: 16
  },
});

export default AccountDocuments;
