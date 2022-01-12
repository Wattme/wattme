import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native/index";
import {
  Text,
} from "react-native-ui-lib";
import Svg, {
  Path,
  Rect
} from "react-native-svg";
import {
  CommonArrowRight as CommonArrowRightIcon
} from "../../../../../assets/icons";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

class LinkDocuments extends React.PureComponent {
  render() {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={this.props.onRoute}>
        <View style={styles.cardLink}>

          <View style={styles.cardLinkIcon}>
            <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Rect width="32" height="32" rx="16" fill="#282828" />
              <Path fillRule="evenodd" clipRule="evenodd"
                    d="M17.3898 8.00086C17.2437 7.9999 17.0906 7.99997 16.9297 8.00004L16.7994 8.00007H15.75L15.6951 8.00007C14.3275 8.00005 13.2252 8.00004 12.3583 8.1166C11.4581 8.23761 10.7003 8.49651 10.0984 9.09842C9.49643 9.70034 9.23754 10.4582 9.11652 11.3583C8.99996 12.2253 8.99998 13.3276 9 14.6952V14.6952V14.7501V17.5905V17.6453V17.6454C8.99998 19.0129 8.99996 20.1153 9.11652 20.9822C9.23754 21.8823 9.49643 22.6402 10.0984 23.2421C10.7003 23.844 11.4581 24.1029 12.3583 24.2239C13.2252 24.3405 14.3275 24.3405 15.6951 24.3405H15.75H16.8008H16.8557C18.2233 24.3405 19.3256 24.3405 20.1925 24.2239C21.0927 24.1029 21.8505 23.844 22.4524 23.2421C23.0544 22.6402 23.3133 21.8823 23.4343 20.9822C23.5508 20.1153 23.5508 19.0129 23.5508 17.6454V17.6454V17.6454V17.6454V17.6453V17.5905V14.7513L23.5508 14.5961V14.596V14.596C23.551 14.2415 23.5512 13.9194 23.5423 13.6224H22.1398L22.0878 13.6224C21.1894 13.6224 20.4401 13.6224 19.8454 13.5425C19.2176 13.4581 18.6508 13.2724 18.1953 12.8169C17.7398 12.3615 17.5541 11.7947 17.4697 11.1669C17.3898 10.5721 17.3898 9.82287 17.3898 8.92439L17.3898 8.87239V8.00086ZM23.3234 12.1224C23.2931 12.0332 23.2587 11.9456 23.2198 11.8592C22.8877 11.1221 22.2728 10.5788 21.3883 9.79737L21.2719 9.69446L21.1742 9.60805C20.427 8.94661 19.908 8.48712 19.264 8.24321C19.1416 8.19686 19.0175 8.15933 18.8898 8.12894V8.87239C18.8898 9.8364 18.8914 10.484 18.9564 10.967C19.0184 11.4285 19.1256 11.626 19.2559 11.7563C19.3863 11.8866 19.5838 11.9938 20.0452 12.0559C20.5283 12.1208 21.1758 12.1224 22.1398 12.1224H23.3234ZM12.7287 16.1703C12.7287 15.7561 13.0645 15.4203 13.4787 15.4203H19.0719C19.4862 15.4203 19.8219 15.7561 19.8219 16.1703C19.8219 16.5845 19.4862 16.9203 19.0719 16.9203H13.4787C13.0645 16.9203 12.7287 16.5845 12.7287 16.1703ZM13.4787 18.7182C13.0645 18.7182 12.7287 19.054 12.7287 19.4682C12.7287 19.8824 13.0645 20.2182 13.4787 20.2182H17.2075C17.6218 20.2182 17.9575 19.8824 17.9575 19.4682C17.9575 19.054 17.6218 18.7182 17.2075 18.7182H13.4787Z"
                    fill="white" />
            </Svg>
          </View>

          <Text style={styles.cardLinkLabel}>
            {allTranslations(localization.common.documents)}
          </Text>

          <View style={styles.buttonLink}>
            <CommonArrowRightIcon color="#8E8E8E" />
          </View>

        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({

  cardLink: {
    borderRadius: 14,

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",

    backgroundColor: "white",

    padding: 16,

    flexDirection: "row",
    alignItems: "center",
  },
  cardLinkIcon: {
    marginRight: 12,
  },
  cardLinkLabel: {
    fontSize: 14,
    lineHeight: 17,
    color: "#2E2E2E",

    flex: 1,
  },

  buttonLink: {
    width: 16,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },

});

export default LinkDocuments;
