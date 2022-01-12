import React, { Component } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native/index";
import {
  Text,
  Button,
} from "react-native-ui-lib";
import {
  Header,
  ModalCamera,
  ModalLoading,
  BlockInformation,
} from "../../../components";
import {
  CommonQrCode as CommonQrCodeIcon,
} from "../../../assets/icons";
import { isJSON } from "../../../helpers/json";
import { getFontFamily } from "../../../theme/theme-manager/Text";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import Notification from "../../../common/Notification";
import agent from "../../../agent/agent";
import urls from "../../../constants/urls";

class BinanceConnection extends Component {
  constructor(props) {
    super(props);

    this.state = {

      form: {
        name: "",
        apiKey: "",
        secret: "",
      },

      showError: false,
      showScanner: false,
      showModalLoading: false,
    };
  }

  componentDidMount = () => {
  };

  changeForm = (name, value) => {
    let form = { ...this.state.form };
    form[name] = value;

    this.setState({ form });
  };

  onConnect = async () => {

    const isValidForm = this._isValidForm();
    if (!isValidForm) {
      this.setState({ showError: true });

      return null
    }

    this.setState({ showModalLoading: true });

    const { form } = this.state;

    const responseCreateKeys = await agent.post(urls.tradingKeysCreate, {
      name: this.state.form.name,
      secretKey: this.state.form.secret,
      publicKey: this.state.form.apiKey,
    }).then((res) => {
      return res.data
    }).catch((err) => {
      return {error: err.response}
    });

    const account = await agent.get(`${ urls.tradingAccount }`).then((res) => {
      return res.data
    }).catch((err) => {
      return { error: err?.response }
    });
    if (account.error) {
      this.setState({ showModalLoading: false });

      Notification.send({
        message: allTranslations(localization.binanceConnection.errorConnection[account.error?.data?.code || "internal-error"]) || allTranslations(localization.binanceConnection.errorConnection["internal-error"]),
        type: "danger"
      })

      return null
    }
    this.props.setProfile({
      ...account,
      name: form.name
    });

    const keys = await agent.get("/trading/keys").then((res) => {
      return res.data?.keys || []
    }).catch(() => {
      return []
    });
    this.props.tradingSetListKeys(keys);

    this.setState({ showModalLoading: false });

    this.props.navigation.goBack();
  };

  _openScanner = () => {
    this.setState({ showScanner: true });
  }
  _scannerConvertData = (data) => {
    this.setState({ showScanner: false });

    const dataString = data?.data || "";
    const isDataObject = isJSON(dataString);

    if (!isDataObject) {
      Notification.send({
        message: allTranslations(localization.binanceConnection.errorWalletScan),
        type: "danger"
      })

      return null
    }

    const dataObject = JSON.parse(dataString);

    let form = {...this.state.form};
    form.name = dataObject?.comment || form.name;
    form.apiKey = dataObject?.apiKey || form.apiKey;
    form.secret = dataObject?.secretKey || form.secret;

    this.setState({ form });
  }

  _renderHeaderRightContent = () => {
    return (
      <TouchableOpacity style={styles.headerButtonRight} onPress={this._openScanner}>
        <CommonQrCodeIcon />
      </TouchableOpacity>
    );
  };
  _messageBlockInformation = () => {
    const { form } = this.state;

    let message = [];

    if (!form.name) {
      message.push(allTranslations(localization.binanceConnection.form.nameError));
    }
    if (!form.apiKey) {
      message.push(allTranslations(localization.binanceConnection.form.apiKeyError));
    }
    if (!form.secret) {
      message.push(allTranslations(localization.binanceConnection.form.secretError));
    }

    return message.join("\n\n");
  };
  _isValidForm = () => {
    const { form } = this.state;

    let countError = 0;

    if (!form.name) {
      countError++
    }
    if (!form.apiKey) {
      countError++
    }
    if (!form.secret) {
      countError++
    }

    return Boolean(countError === 0)
  }

  render() {
    const {
      form,

      showError,
      showScanner,
      showModalLoading
    } = this.state;

    return (
      <View style={styles.root}>

        <Header
          title={allTranslations(localization.binanceConnection.headerTitle)}
          rightContent={this._renderHeaderRightContent}
        />

        <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={styles.scrollView}>

          <View style={[styles.formItem, { marginTop: 0 }]}>
            <Text style={styles.formItemTitle}>
              {allTranslations(localization.binanceConnection.form.nameLabel)}
            </Text>

            <TextInput
              value={form.name}
              style={styles.formItemInput}
              placeholder={allTranslations(localization.binanceConnection.form.namePlaceholder)}
              onChangeText={(value) => this.changeForm("name", value)}
            />
          </View>

          <View style={styles.formItem}>
            <Text style={styles.formItemTitle}>
              {allTranslations(localization.binanceConnection.form.apiKeyLabel)}
            </Text>

            <TextInput
              value={form.apiKey}
              style={styles.formItemInput}
              placeholder={allTranslations(localization.binanceConnection.form.apiKeyPlaceholder)}
              onChangeText={(value) => this.changeForm("apiKey", value)}
            />
          </View>

          <View style={styles.formItem}>
            <Text style={styles.formItemTitle}>
              {allTranslations(localization.binanceConnection.form.secretLabel)}
            </Text>

            <TextInput
              value={form.secret}
              style={styles.formItemInput}
              placeholder={allTranslations(localization.binanceConnection.form.secretPlaceholder)}
              onChangeText={(value) => this.changeForm("secret", value)}
            />
          </View>

          {Boolean(showError && this._messageBlockInformation())&&(
            <View style={{ marginTop: 12 }}>
              <BlockInformation
                type="close"
                title="Неверные парметры"
                message={this._messageBlockInformation()}
              />
            </View>
          )}

        </ScrollView>

        <View style={styles.footer}>
          <Button
            label={allTranslations(localization.binanceConnection.buttonConnect)}
            onPress={this.onConnect}
          />
        </View>

        <ModalLoading
          open={showModalLoading}
        />

        <ModalCamera
          open={showScanner}

          onBarCodeRead={this._scannerConvertData}
          onClose={() => this.setState({showScanner: false})}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F2F2F6",
  },
  headerButtonRight: {
    width: 32,
    height: 32,
  },

  scrollView: {
    paddingHorizontal: 12,
    paddingVertical: 24,
  },

  formItem: {
    marginTop: 12,
  },
  formItemTitle: {
    fontSize: 13,
    lineHeight: 16,
    color: "#8E8E8E",
    marginBottom: 8,
    marginLeft: 16,
  },
  formItemInput: {
    fontFamily: getFontFamily("500"),
    fontSize: 16,
    paddingVertical: 0,
    paddingHorizontal: 16,
    height: 52,
    backgroundColor: "white",

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,
  },

  footer: {
    paddingTop: 12,
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
});

export default BinanceConnection;
