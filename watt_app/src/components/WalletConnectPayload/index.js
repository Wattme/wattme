import React from "react";
import {
  View,
  Image,
  StyleSheet,
} from "react-native/index";
import {
  Text,
  Button,
} from "react-native-ui-lib";
import { utils } from "ethers";
import Modalize from "../Modalize";
import allTranslations from "../../localization/allTranslations";
import localization from "../../localization/localization";

const WalletConnectPayload = (props) => {
  const {
    innerRef,
    payload,
    onSuccess,
    onClose,
    networks
  } = props;
  const {
    method,
    params,
  } = payload;

  const _titleHeader = () => {
    if (method === "session_request") {
      return "Подтверждение";
    }
    if (method === "eth_sendTransaction") {
      return "Подтверждение транзакции";
    }
    if (method === "personal_sign") {
      return "personal_sign";
    }
    if (method === "eth_signTypedData") {
      return "eth_signTypedData";
    }
  };
  const _renderBody = () => {
    if (method === "session_request") {
      return (<SessionRequestBody params={params} networks={networks}/>);
    }
    if (method === "eth_sendTransaction") {
      return (<EthSendTransactionBody params={params} />);
    }
    if (method === "personal_sign") {
      return (<PersonalSignBody params={params} />);
    }
    if (method === "eth_signTypedData") {
      return (<EthSignTypedDataBody params={params} />);
    }
  };
  const _labelButton = () => {
    if (method === "session_request") {
      return "Подключиться";
    }
    if (method === "eth_sendTransaction") {
      return "Подтвердить";
    }
    if (method === "personal_sign") {
      return "Подписать";
    }
    if (method === "eth_signTypedData") {
      return "Подписать";
    }
  };

  return (
    <Modalize
      innerRef={innerRef}
      onBackButtonPress={onClose}
      onOverlayPress={onClose}
    >
      <View style={styles.modalizeContainer}>
        <View style={styles.root}>
          <Text style={styles.headerTitle}>{_titleHeader()}</Text>
          <View style={{ marginTop: 24 }}>
            {_renderBody()}
          </View>
        </View>

        <View style={{ marginTop: 16 }}>
          <Button
            variant="contained"
            color="primary"
            label={_labelButton()}
            onPress={onSuccess}
          />
        </View>
      </View>
    </Modalize>
  );
};

const SessionRequestBody = (props) => {
  const { networks, params } = props;
  const peerMeta = params?.[0]?.peerMeta || {};

  return (
    <View>

      <Text style={styles.message}>
        { peerMeta?.name || "" } { allTranslations(localization.walletConnect.wantsConnectYourWallet) }
      </Text>

      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <View style={styles.list}>
          <Text style={styles.listItem}>
            •  { allTranslations(localization.walletConnect.wiewWalletBalanceActivity) }
          </Text>
          <Text style={[styles.listItem, {marginTop: 12}]}>
            •  { allTranslations(localization.walletConnect.requestApprovalTransactions) }
          </Text>
        </View>
      </View>

    </View>
  );
};
const EthSendTransactionBody = (props) => {
  const params = props?.params?.[0] || {};

  return (
    <View style={{ flex: 1 }}>

      <View style={{ marginBottom: 8 }}>
        <Text
          style={{ fontSize: 18, fontWeight: "500" }}>{`Адрес отправителя:\n`}<Text>{params?.from}</Text></Text>
      </View>
      <View style={{ marginBottom: 8 }}>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>{`Адрес получателя:\n`}<Text>{params?.to}</Text></Text>
      </View>
      <View style={{ marginBottom: 8 }}>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>{`Сумма:\n`}<Text>{params?.value}</Text></Text>
      </View>

    </View>
  );
};
const PersonalSignBody = (props) => {
  const message = props?.params?.[0] || "";
  const address = props?.params?.[1] || "";

  return (
    <View style={{ flex: 1 }}>

      <View style={{ marginBottom: 8 }}>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>{`Сообщение:\n`}<Text>{message}</Text></Text>
      </View>
      <View style={{ marginBottom: 8 }}>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>{`Адрес кошелька:\n`}<Text>{address}</Text></Text>
      </View>

    </View>
  );
};
const EthSignTypedDataBody = (props) => {
  const address = props?.params?.[0] || "";

  return (
    <View style={{ flex: 1 }}>

      <View style={{ marginBottom: 8 }}>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>{`Адрес кошелька:\n`}<Text>{address}</Text></Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  modalizeContainer: {
    paddingHorizontal: 12,
    paddingBottom: 20,
  },
  root: {
    paddingTop: 44,
    paddingHorizontal: 16,
    paddingBottom: 24,

    borderRadius: 14,
    backgroundColor: "white"
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#282828",
    fontSize: 25,
    lineHeight: 30,
    fontWeight: "500",
  },

  message: {
    fontSize: 16,
    lineHeight: 23,
    color: "#8E8E8E"
  },

  list: {
    maxWidth: 300,
    marginTop: 24
  },
  listItem: {
    fontSize: 14,
    lineHeight: 17,
    color: "#282828"
  },
});

export default WalletConnectPayload;
