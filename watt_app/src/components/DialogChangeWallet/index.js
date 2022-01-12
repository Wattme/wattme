import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native/index";
import {
  Text,
} from "react-native-ui-lib";
import { compose } from "recompose";
import { connect } from "react-redux";
import { updateWallets, updateWalletsListName } from "../../state/GlobalState";
import Icon from "react-native-vector-icons/FontAwesome5";
import Modalize from "../Modalize";
import { BoxShadow } from "react-native-shadow";

const DialogChangeWallet = (props) => {
  const { innerRef, global, onClose } = props;
  const { walletsList, walletsName } = global;

  const handleChangeActiveWallet = (value) => {
    const walletsList = { ...global.walletsList };
    const activeWallet = (walletsList[value]?.wallets || []);

    props.updateWallets(activeWallet);
    props.updateWalletsListName(value);

    props.onClose();
  };
  const _renderImageWallets = (wallet) => {
    if (wallet?.image) {
      return (
        <Image
          source={{ uri: wallet.image }}
          style={{ width: 45, height: 45 }}
        />
      );
    }

    return (
      <Icon name="wallet" size={25} color="#163046" />
    );
  };
  const _optionShadow = () => {
    return {
      width: 39,
      height: 41,
      color: "#b1c8cf",
      border: 10,
      radius: 12,
      opacity: 0.2,
      x: 2,
      y: 4,
      style: styles.shadow
    };
  };

  return (
    <Modalize innerRef={innerRef}>
      <View style={styles.modal}>

        {
          Object.keys(walletsList).map((key, idx) => {
            const wallet = walletsList[key];
            const isActive = Boolean(key === walletsName);

            return (
              <TouchableOpacity
                key={`dialog-change-wallet-${idx}`}
                activeOpacity={0.8}
                style={styles.wallet}
                onPress={() => handleChangeActiveWallet(key)}
              >
                <View style={[styles.walletLeft, Boolean(!isActive) && {opacity: 0.4}]}>
                  <View style={styles.walletLogo}>
                    {_renderImageWallets(wallet)}
                  </View>
                  <BoxShadow setting={_optionShadow()}/>
                </View>
                <View style={[styles.walletRight, Boolean(!isActive) && {opacity: 0.4}]}>
                  <Text style={styles.walletName}>{ wallet?.label || wallet?.name }</Text>
                </View>
              </TouchableOpacity>
            );
          })
        }

      </View>
    </Modalize>
  );
};

const styles = StyleSheet.create({
  modal: {
    paddingVertical: 12
  },

  wallet: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12
  },
  walletLeft: {
    marginRight: 12
  },
  walletRight: {},
  walletLogo: {
    width: 45,
    height: 45,
    overflow: "hidden",
    borderRadius: 12,
    backgroundColor: "white",
    zIndex: 2,

    justifyContent: "center",
    alignItems: "center"
  },
  walletName: {
    fontSize: 15,
    lineHeight: 18,
    color: "#263E51",
    fontWeight: "800",
    letterSpacing: 0.5,
    textTransform: "uppercase"
  },

  shadow: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }
});

export default compose(
  connect(
    state => ({
      global: state.globalState,
    }),
    dispatch => ({
      updateWallets: (wallets) => dispatch(updateWallets(wallets)),
      updateWalletsListName: (name) => dispatch(updateWalletsListName(name)),
    }),
  ),
)(DialogChangeWallet);
