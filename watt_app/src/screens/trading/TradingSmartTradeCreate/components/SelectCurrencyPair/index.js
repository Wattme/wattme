import React from "react";
import {
  View,
  Image,
  StyleSheet, TouchableOpacity,
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  CommonArrowBottom as CommonArrowBottomIcon
} from "../../../../../assets/icons";
import { getIconCurrency } from "../../../../../common/Images";

class SelectCurrencyPair extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }


  render() {
    const {
      coinBuy,
      coinSell,

      routeSelect
    } = this.props;
    const symbolImage = getIconCurrency(coinBuy);

    return (
      <TouchableOpacity style={styles.root} onPress={routeSelect} activeOpacity={0.6}>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: symbolImage }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>

        <View style={styles.body}>

          <Text style={styles.name}>{ coinBuy } / { coinSell }</Text>

        </View>

        <View style={styles.arrowContainer}>
          <CommonArrowBottomIcon color="#8E8E8E"/>
        </View>

      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({

  root: {
    height: 52,
    paddingHorizontal: 16,
    backgroundColor: "white",

    flexDirection: "row",
    alignItems: "center",

    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0"
  },

  imageContainer: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 24,
    height: 24
  },
  body: {
    flex: 1,
    paddingHorizontal: 12
  },
  arrowContainer: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center"
  },

  name: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828"
  }

});

export default SelectCurrencyPair
