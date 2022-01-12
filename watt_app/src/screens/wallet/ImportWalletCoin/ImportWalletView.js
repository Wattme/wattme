import React from "react";
import {
  View,
  StyleSheet,
  ScrollView, TouchableOpacity
} from "react-native/index";
import {
  Header
} from "../../../components";
import {
   SelectCoin as SelectCoinComponent
} from "./components";
import {
  HeaderInfo as HeaderInfoIcon
} from "../../../assets/icons";
import { getIconCurrency } from "../../../common/Images";
import { getCurrenciesForSelect } from "../../../common/Currencies";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";

class ImportWallet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currencies: [],
    };
  }

  componentDidMount = async () => {
    await this.initState();
  }

  // Логика инициализации приложения
  initState = async () => {
    await this.setCurrencies();
  }


  setCurrencies = () => {
    let currencies = getCurrenciesForSelect([], true);
    currencies = currencies.map((item) => {
      return { label: item.name, code: item.code }
    });

    this.setState({ currencies })
  }

  // Роуте
  _routeImportForm = (code, label) => {
    this.props.navigation.navigate('ImportWalletForm', {
      code,
      label
    })
  }

  render() {
    const {
      currencies
    } = this.state;

    return (
      <View style={styles.root}>
        <Header
          title={allTranslations(localization.importWalletCoin.headerTitle)}
        />

        <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <SelectCoinComponent
              onPress={() => this._routeImportForm("MULTI", allTranslations(localization.importWalletCoin.labelMultiVWallet))}
              image={require('../../../assets/png/currency/ic_watt_black.png')}
              label={allTranslations(localization.importWalletCoin.labelMultiVWallet)}
            />
          </View>

          <View style={[styles.section, {marginTop: 12}]}>
            {currencies.map((crypto, idx) => (
              <SelectCoinComponent
                key={`select-coin-component-${idx}`}
                onPress={() => this._routeImportForm(crypto.code, crypto.label)}
                label={crypto.label}
                icon={getIconCurrency(crypto.code)}
              />
            ))}
          </View>
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

  section: {
    backgroundColor: "white",
    borderRadius: 14,
    paddingVertical: 4
  },

  headerButtonInfo: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default ImportWallet
