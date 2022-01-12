import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native/index";
import {
  Text,
  Button,
  Checkbox,
} from "react-native-ui-lib";
import { Modalize } from "../../../../../components";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import {
  getIconFiat
} from "../../../../../common/Images";

class PopUpFiatCurrency extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userCurrencies: [...(props.userCurrencies || [])],
    };
  }

  onSelect = (fiat) => {
    const userCurrencies = this.state.userCurrencies || [];

    const inInclude = Boolean(userCurrencies.find((t) => t === fiat));

    if (inInclude) {
      userCurrencies.splice(userCurrencies.findIndex((t) => t === fiat), 1)
    } else {
      userCurrencies.push(fiat)
    }

    this.setState({ userCurrencies });
  }
  onSetFiats = () => {
    this.props.onSetFiats(this.state.userCurrencies);
  }

  render() {
    const {
      innerRef,

      fiats
    } = this.props;
    const {
      userCurrencies
    } = this.state;

    return (
      <Modalize innerRef={innerRef}>
        <View style={styles.modalizeContainer}>

          <View style={styles.root}>

            <Text style={styles.title}>
              { allTranslations(localization.settingsHome.popUpFiatCurrency.title) }
            </Text>

            {

              fiats.map(( fiat, indexFiat ) => (
                <TouchableOpacity
                  key={`select-fiat-${indexFiat}-${fiat?.code}-${(userCurrencies || []).find((t) => t === fiat?.code)}`}
                  style={[styles.fiat, Boolean(indexFiat === 0) && {marginTop: 0}]}
                  onPress={() => this.onSelect(fiat?.code)}
                >
                  <Image
                    style={styles.fiatImage}
                    source={{ uri: getIconFiat(fiat?.code) }}
                    resizeMode="cover"
                  />
                  <Text style={styles.fiatName}>{ fiat?.code }</Text>

                  <Checkbox
                    size={32}
                    style={styles.fiatCheckbox}
                    value={Boolean((userCurrencies || []).find((t) => t === fiat?.code))}

                    onValueChange={() => this.onSelect(fiat?.code)}
                  />
                </TouchableOpacity>
              ))

            }

          </View>

          <View style={{marginTop: 16}}/>

          <Button
            label={allTranslations(localization.common.select)}
            onPress={this.onSetFiats}
          />

        </View>
      </Modalize>
    );
  }
}

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
    backgroundColor: "#F7F7F7",

    minHeight: 330
  },

  title: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "500",
    textAlign: "center",
    color: "black",
    marginBottom: 24
  },

  fiat: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16
  },
  fiatImage: {
    width: 24,
    height: 24,
    borderRadius: 999
  },
  fiatName: {
    flex: 1,
    fontSize: 16,
    lineHeight: 26,
    color: "#282828",
    paddingHorizontal: 16
  },
  fiatCheckbox: {
    width: 32,
    height: 32
  },

});

export default PopUpFiatCurrency
