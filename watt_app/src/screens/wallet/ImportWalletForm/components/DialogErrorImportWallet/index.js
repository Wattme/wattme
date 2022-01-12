import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native/index";
import {
  Text,
  Button
} from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import {Modalize} from "../../../../../components";

const DialogSelectedCurrency = (props) => {
  const { innerRef, onNext } = props;

  return (
    <Modalize innerRef={innerRef}>

      <View style={styles.modalizeContainer}>

        <View style={styles.root}>
          <Text style={styles.title}>{allTranslations(localization.importWalletForm.dialogErrorImportWallet.title)}</Text>
          <Text style={styles.description}>{allTranslations(localization.importWalletForm.dialogErrorImportWallet.message)}</Text>
        </View>

        <View style={{ marginTop: 16 }} />

        <Button
          color="primary"
          variant="contained"
          label={allTranslations(localization.importWalletForm.dialogErrorImportWallet.button)}
          onPress={onNext}
        />

      </View>

    </Modalize>
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
    backgroundColor: "#F7F7F7"
  },

  title: {
    fontSize: 25,
    lineHeight: 30,
    fontWeight: "500",
    textAlign: "center",
    color: "#282828",
    marginBottom: 14,
  },
  description: {
    fontSize: 16,
    lineHeight: 23,
    color: '#8E8E8E',
    textAlign: "center"
  },

  currencies: {
    marginBottom: -12
  },
  currency: {
    marginBottom: 12,

    flexDirection: 'row',
    alignItems: 'center',

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "white",
    borderRadius: 16,

    paddingHorizontal: 20,
    paddingVertical: 12,

    backgroundColor: "#f8f9fa"
  },
  currencyLeft: {
    marginRight: 18
  },
  currencyBody: {
    flex: 1
  },
  currencyRight: {},
  currencyIconContainer: {
    width: 20,
    height: 20
  },
  currencyIcon: {
    width: '100%',
    height: '100%'
  },
  currencyName: {
    fontWeight: '800',
    fontSize: 18,
    lineHeight: 20,
    color: '#163046',
    marginBottom: 2
  },
});

export default DialogSelectedCurrency;
