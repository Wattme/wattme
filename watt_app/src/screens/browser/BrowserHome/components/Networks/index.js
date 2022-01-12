import React from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native/index";
import {

} from "react-native-ui-lib";
import { walletConnectNetworkImage } from "../../../../../common/WalletConnect";

class Networks extends React.PureComponent {
  render() {
    const {
      data,
      value,

      onChange
    } = this.props;


    return (
      <ScrollView
        horizontal
        contentContainerStyle={styles.container}
        showsHorizontalScrollIndicator={false}
      >

        { (data || []).map(( network, index ) => (

          <TouchableOpacity
            key={`Networks-item-${ index }`}

            style={[
              styles.network,
              Boolean(value === network.value) && styles.networkActive
            ]}

            activeOpacity={0.6}

            onPress={() => onChange(Boolean(network.value === "All") ? "" : network.value)}
          >

            <Image
              style={styles.networkImage}
              source={{ uri: walletConnectNetworkImage(network.value || "All") }}
              resizeMode="contain"
            />

          </TouchableOpacity>

        )) }

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    paddingHorizontal: 20
  },

  network: {
    width: 40,
    height: 40,
    borderRadius: 14,

    marginLeft: 18,

    alignItems: "center",
    justifyContent: "center",
  },
  networkActive: {
    backgroundColor: "#FFFFFF"
  },
  networkImage: {
    width: 24,
    height: 24
  },

});

export default Networks
