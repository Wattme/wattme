import React, { useRef } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native/index";
import {
  Text,
  Button,
} from "react-native-ui-lib";
import { getIconCurrency } from "../../common/Images";
import { compose } from "recompose";
import { connect } from "react-redux";
import Modalize from "../Modalize";
import allTranslations from "../../localization/allTranslations";
import localization from "../../localization/localization";
import currency_rank from "../../constants/currency_rank";

const ModalNetworks = (props) => {
  const {
    network,
    networks,
    innerRef,
    onChange,

    global,
  } = props;
  const { wallet } = global;

  const handleClose = () => {
    innerRef.current.close();
  }

  const _isDisableNetwork = (networkCode) => {

    if (networkCode === "BNB") {
      return !Boolean((wallet?.list || []).find((t) => Boolean(t.rank === currency_rank.MAIN_BNB && !t.disable)))
    }

    if (networkCode === "ETH") {
      return !Boolean((wallet?.list || []).find((t) => Boolean(t.rank === currency_rank.MAIN_ETH && !t.disable)))
    }

    if (networkCode === "POLYGON") {
      return !Boolean((wallet?.list || []).find((t) => Boolean(t.rank === currency_rank.MAIN_POLYGON && !t.disable)))
    }

    return true
  }

  return (
    <Modalize innerRef={innerRef}>

      <View style={styles.root}>

        <View style={styles.body}>

          {(networks || []).map((item, index) => (
            <TouchableOpacity
              key={`ModalNetworks-network-${index}`}
              activeOpacity={0.6}

              onPress={() => onChange(item.code)}
              disabled={_isDisableNetwork(item.code)}
            >
              <View
                style={[
                  styles.network,
                  Boolean((network) === item.code) && styles.networkActive,
                  Boolean(_isDisableNetwork(item.code)) && styles.networkDisable,
                ]}
              >
                <View style={styles.networkImage}>
                  <Image
                    style={{flex: 1}}
                    source={{uri: getIconCurrency(item.code)}}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.networkName}>
                  { item.name }
                </Text>

                {Boolean(_isDisableNetwork(item.code))&&(
                  <Text style={styles.networkMessage}>
                    ({ allTranslations(localization.modalNetworks.turnOnCoin) })
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))}

        </View>

        <View style={styles.footer}>
          <Button
            label={allTranslations(localization.common.cancel)}
            style={styles.buttonCancel}
            onPress={handleClose}
          />
        </View>

      </View>

    </Modalize>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 24,
  },

  body: {
    paddingTop: 44,
    backgroundColor: "white",
    borderRadius: 14,
    padding: 16,
  },
  footer: {
    marginTop: 12,
  },

  buttonCancel: {
    backgroundColor: "white",
    borderColor: "white",
  },


  network: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    padding: 16,
  },
  networkActive: {
    backgroundColor: "#F7F7F7"
  },
  networkDisable: {
    opacity: 0.6
  },
  networkImage: {
    height: 44,
    width: 44,
    overflow: "hidden",
    marginRight: 16
  },
  networkName: {
    flex: 1,
    fontSize: 16,
    lineHeight: 19,
    color: "#282828",
    fontWeight: "500",
  },
  networkMessage: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E"
  },
});

export default compose(
  connect(
    state => ({
      global: state.globalState,
    }),
  ),
)(ModalNetworks);
