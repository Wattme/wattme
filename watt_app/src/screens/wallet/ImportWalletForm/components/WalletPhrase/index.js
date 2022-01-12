import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  ImportWalletPast as ImportWalletPastIcon
} from "../../../../../assets/icons";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import Clipboard from "@react-native-clipboard/clipboard";

const types = [
  "phrase",
  "address",
  "privateKey", // Если не мульти или BTC
];

class WalletPhrase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  onChangeTab = (tab) => {
    this.props?.onChangeActiveTab(tab);
  }

  onPastValue = async () =>  {
    const data = await Clipboard.getString();

    this.props?.onChangeWalletPhrase(data);
  }

  _placeholder = () => {
    const { activeTab } = this.props;

    if (activeTab === "phrase") {
      return allTranslations(localization.importWalletForm.form.phrasePlaceholder)
    }
    if (activeTab === "address") {
      return allTranslations(localization.importWalletForm.form.addressPlaceholder)
    }
    if (activeTab === "privateKey") {
      return allTranslations(localization.importWalletForm.form.privateKeyPlaceholder)
    }
  }
  _messageTypeInformation = () => {
    const { activeTab } = this.props;

    if (activeTab === "phrase") {
      return allTranslations(localization.importWalletForm.form.phraseCaption)
    }
    if (activeTab === "address") {
      return allTranslations(localization.importWalletForm.form.addressCaption)
    }
    if (activeTab === "privateKey") {
      return allTranslations(localization.importWalletForm.form.privateKeyCaption)
    }
  }
  _hideTabPrivateKey = () => {
    const {
      code
    } = this.props;

    return true

    if (
      code === "MULTI" ||
      code === "BTC" ||
      code === "LTC"
    ) {
      return true
    }
  }

  render() {
    const {
      code,
      activeTab,
      walletPhrase
    } = this.props;

    return (
      <>

        <View style={styles.root}>

          <View style={styles.header}>
            <Tab label={allTranslations(localization.importWalletForm.tabs.phrase)} active={Boolean(activeTab === "phrase")} onPress={() => this.onChangeTab("phrase")}/>
            <Tab label={allTranslations(localization.importWalletForm.tabs.address)} active={Boolean(activeTab === "address")} onPress={() => this.onChangeTab("address")}/>
            {!Boolean(this._hideTabPrivateKey())&&(
              <Tab label={allTranslations(localization.importWalletForm.tabs.privateKey)} active={Boolean(activeTab === "privateKey")} onPress={() => this.onChangeTab("privateKey")}/>
            )}
          </View>

          <View style={styles.body}>

            <TextInput
              value={walletPhrase}
              placeholder={this._placeholder()}
              placeholderTextColor="#8E8E8E"
              textAlignVertical="top"
              multiline

              onChangeText={this.props.onChangeWalletPhrase}

              style={styles.textInput}
            />

            <View style={styles.bodyFooter}>
              <TouchableOpacity style={styles.buttonCopy} onPress={this.onPastValue}>
                <ImportWalletPastIcon/>
                <Text style={styles.buttonCopyLabel}>
                  {allTranslations(localization.importWalletForm.buttonPast)}
                </Text>
              </TouchableOpacity>
            </View>

          </View>

        </View>

        <Text style={styles.messageTypeInformation}>
          {this._messageTypeInformation()}
        </Text>

      </>
    );
  }
}
const Tab = (props) => {
  const { label, active, onPress } = props;
  return (
    <TouchableOpacity style={styles.tab} onPress={onPress}>
      <Text
        style={[
        styles.tabLabel,
        Boolean(active) && styles.tabLabelActive
      ]}
        numberOfLines={1}
      >
        {label}
      </Text>

      {Boolean(active)&&(
        <View style={styles.tabArrow}/>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,
    marginTop: 12,

    backgroundColor: "white"
  },

  header: {
    flexDirection: "row",
    paddingVertical: 16,

    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#F9F9F9"
  },
  body: {
    padding: 16
  },
  bodyFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },

  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 32
  },
  tabLabel: {
    fontSize: 16,
    lineHeight: 19,
    color: "#8E8E8E"
  },
  tabLabelActive: {
    color: "#000000"
  },
  tabArrow: {
    position: "absolute",
    bottom: 0,

    width: 40,
    height: 2,
    backgroundColor: "#000000",
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
  },

  textInput: {
    fontSize: 13,
    lineHeight: 16,
    color: "#282828",
    padding: 0,

    minHeight: 100
  },

  buttonCopy: {
    height: 32,
    backgroundColor: "#F7F7F7",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14
  },
  buttonCopyLabel: {
    fontSize: 16,
    lineHeight: 19,
    color: "#8E8E8E"
  },

  messageTypeInformation: {
    fontSize: 14,
    lineHeight: 17,
    color: "#282828",
    textAlign: "center",
    marginTop: 11
  },
});

export default WalletPhrase
