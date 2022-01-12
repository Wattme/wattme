import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  WalletConnectExit as WalletConnectExitIcon,
  WalletConnectLock as WalletConnectLockIcon,
  WalletConnectRefresh as WalletConnectRefreshIcon,
  WalletConnectFavorite as WalletConnectFavoriteIcon,
  WalletConnectCopy as WalletConnectCopyIcon
} from "../../../../../assets/icons"
import getHeightStatusBar from "../../../../../helpers/getHeightStatusBar";
import { getIconCurrency } from "../../../../../common/Images";

const heightStatusBar = getHeightStatusBar();
class Header extends React.PureComponent {

  goBack = () => {
    this.props?.onRouteGoBack();
  }
  refresh = () => {
    this.props?.onRefreshPage();
  }
  favorite = () => {
    this.props?.onAddLinkToFavorites()
  }
  copy = () => {
    this.props?.onCopyLink();
  }
  openChangeNetwork = () => {
    this.props?.onOpenChangeNetwork();
  }

  render() {
    const {
      link,
      network,

      isFavorite
    } = this.props;

    return (
       <View style={styles.header}>

         <View style={styles.container}>

           <TouchableOpacity onPress={this.goBack}>
             <WalletConnectExitIcon/>
           </TouchableOpacity>

           <WalletConnectLockIcon/>

           <Text
             style={styles.link}
             numberOfLines={1}
           >
             { link }
           </Text>

           <TouchableOpacity onPress={this.refresh}>
             <WalletConnectRefreshIcon/>
           </TouchableOpacity>

           <TouchableOpacity onPress={this.favorite}>
             <WalletConnectFavoriteIcon
               isFill={isFavorite}
             />
           </TouchableOpacity>

           <TouchableOpacity onPress={this.copy}>
             <WalletConnectCopyIcon/>
           </TouchableOpacity>

           <TouchableOpacity style={styles.network} onPress={this.openChangeNetwork}>
             <Image
              source={{ uri: getIconCurrency(network) }}
              style={{flex: 1}}
              resizeMode="contain"
             />
           </TouchableOpacity>

         </View>

       </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    paddingTop: 15 + heightStatusBar,
    paddingBottom: 12,
    paddingHorizontal: 12,

    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#CCCCCC"
  },

  container: {
    flexDirection: "row",
    alignItems: "center",

    height: 36,
    backgroundColor: "#F7F7F7",
    borderRadius: 14,
    paddingRight: 12
  },

  link: {
    fontSize: 16,
    lineHeight: 19,
    color: "#8E8E8E",
    marginLeft: 8,

    flex: 1,
  },

  network: {
    width: 24,
    height: 24,
    marginLeft: 12
  },

})

export default Header
