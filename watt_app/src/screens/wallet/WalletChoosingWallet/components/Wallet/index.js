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
import {
  CommonInfo as CommonInfoIcon,
  CommonAcceptBadge as CommonAcceptBadgeIcon,
} from "../../../../../assets/icons";
import { useNavigation } from "@react-navigation/native";
import { SwipeRow } from "react-native-swipe-list-view";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

const Wallet = (props) => {
  const { wallet, isFirst, isLast, isActive, onPress, onDelete } = props;
  const refSwipeRow = React.useRef();
  const navigation = useNavigation();

  const handleDelete = () => {
    refSwipeRow.current?.closeRow();

    onDelete();
  }

  const routeEditWallet = () => {
    navigation.navigate("WalletControl", {
      key: wallet.key,
    });
  };

  return (
    <SwipeRow
      ref={refSwipeRow}

      disableRightSwipe={true}
      rightOpenValue={-108}
      closeOnRowPress={true}

      recalculateHiddenLayout
    >
      <View style={styles.containerControls}>
        <TouchableOpacity style={styles.buttonDeleteWallet} activeOpacity={0.6} onPress={handleDelete}>
          <Text style={styles.buttonDeleteWalletLabel}>
            { allTranslations(localization.common.delete) }
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.root}>
        <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
          <View style={[styles.card]}>
            <View style={styles.cardRight}>
              <View style={styles.cardImage}>
                {Boolean(wallet.image) ? (
                  <Image source={{ uri: wallet.image }} style={{ flex: 1 }} />
                ) : (
                  <Image source={require("../../../../../assets/png/wallet/wallet-image-pug.png")} style={{ width: 51  , height: 51, margin: -3 }} resizeMode="contain"/>
                )}
              </View>
              {Boolean(isActive) && (
                <View style={styles.badgeActive}>
                  <CommonAcceptBadgeIcon />
                </View>
              )}
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardImageName}>{wallet.label}</Text>
              <Text style={styles.cardImageCaption}>{wallet.caption}</Text>
            </View>
            <TouchableOpacity style={styles.cardLeft} onPress={routeEditWallet}>
              <CommonInfoIcon color="#8E8E8E" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </SwipeRow>
  );
};

const styles = StyleSheet.create({

  root: {
    paddingVertical: 15,
    backgroundColor: "#FFFFFF"
  },
  containerControls: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF"
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardRight: {
    width: 48,
  },
  cardBody: {
    flex: 1,
    paddingHorizontal: 12,
  },
  cardLeft: {
    width: 32,
    height: 32,
  },

  cardImage: {
    width: 48,
    height: 48,

    borderRadius: 999,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#282828",

    overflow: "hidden",
  },
  cardImageName: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828",
    fontWeight: "500",
    marginBottom: 10,
  },
  cardImageCaption: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E",
  },

  badgeActive: {
    position: "absolute",
    right: 0,
    top: -4,
  },

  buttonDeleteWallet: {
    height: "100%",
    width: 88,
    backgroundColor: "#F5386A",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonDeleteWalletLabel: {
    fontSize: 14,
    lineHeight: 17,
    color: "white",
    textAlign: "center"
  },
});

export default Wallet;
