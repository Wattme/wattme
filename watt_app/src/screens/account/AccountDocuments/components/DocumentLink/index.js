import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  CommonArrowRight as CommonArrowRightIcon
} from "../../../../../assets/icons";
import Svg, { Path, Rect } from "react-native-svg";

class DocumentLink extends React.PureComponent {
  render() {
    const {
      label,
      caption,

      onOpen
    } = this.props;

    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onOpen}>
        <View style={styles.cardLink}>

          <View style={styles.cardLinkIcon}>
            <Svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <Rect width="40" height="40" rx="20" fill="#F7F7F7"/>
              <Path fillRule="evenodd" clipRule="evenodd" d="M21.6338 8.93754C21.777 8.93747 21.9145 8.93741 22.0468 8.938V11.5826L22.0468 11.6346C22.0468 12.533 22.0467 13.2823 22.1267 13.877C22.2111 14.5048 22.3968 15.0716 22.8522 15.5271C23.3077 15.9826 23.8745 16.1682 24.5023 16.2526C25.0971 16.3326 25.8463 16.3326 26.7448 16.3326H26.7448L26.7968 16.3326H29.4416C29.4422 16.4648 29.4421 16.6021 29.442 16.7452V16.7458V16.7458L29.442 16.8884V24.9076V24.9625C29.442 26.3301 29.442 27.4324 29.3255 28.2994C29.2045 29.1995 28.9456 29.9574 28.3437 30.5593C27.7417 31.1612 26.9839 31.4201 26.0838 31.5411C25.2168 31.6577 24.1145 31.6577 22.7469 31.6576H22.692H18.1875H18.1326C16.765 31.6577 15.6627 31.6577 14.7958 31.5411C13.8956 31.4201 13.1378 31.1612 12.5359 30.5593C11.9339 29.9574 11.675 29.1995 11.554 28.2994C11.4375 27.4324 11.4375 26.3301 11.4375 24.9625L11.4375 24.9076V15.6876L11.4375 15.6327C11.4375 14.2651 11.4375 13.1628 11.554 12.2958C11.675 11.3957 11.9339 10.6379 12.5359 10.0359C13.1378 9.43402 13.8956 9.17513 14.7957 9.05411C15.6627 8.93755 16.765 8.93757 18.1326 8.93759L18.1875 8.93759H21.4912L21.6338 8.93754ZM29.1565 14.2107C29.2393 14.4105 29.2981 14.6156 29.3399 14.8326H26.7968C25.8328 14.8326 25.1852 14.831 24.7022 14.766C24.2407 14.704 24.0432 14.5968 23.9129 14.4664C23.7826 14.3361 23.6754 14.1386 23.6133 13.6772C23.5484 13.1941 23.5468 12.5466 23.5468 11.5826V9.03968C23.7638 9.08146 23.969 9.14028 24.1689 9.22304C24.8602 9.50942 25.3945 10.0442 26.1633 10.8138L26.2641 10.9146L27.465 12.1155L27.5658 12.2163C28.3354 12.9851 28.8702 13.5194 29.1565 14.2107ZM15.6537 21.4191C16.2625 21.4191 16.7552 21.5761 17.132 21.8903C17.5114 22.2045 17.7012 22.618 17.7012 23.1308C17.7012 23.6413 17.506 24.0548 17.1156 24.3713C16.7252 24.6854 16.2174 24.8425 15.5922 24.8425H14.4252V26.4191H13.1885V21.4191H15.6537ZM14.4252 24.0247H15.322C15.6769 24.0247 15.9526 23.9474 16.1492 23.7926C16.3457 23.6378 16.444 23.4184 16.444 23.1342C16.444 22.8501 16.3457 22.6307 16.1492 22.4759C15.9553 22.3234 15.681 22.2472 15.3261 22.2472H14.4252V24.0247ZM20.7069 21.4191C21.5969 21.4191 22.2876 21.6339 22.779 22.0636C23.2758 22.4978 23.5243 23.11 23.5243 23.9C23.5243 24.6923 23.2758 25.3103 22.779 25.7538C22.2848 26.1973 21.5942 26.4191 20.7069 26.4191H18.4301V21.4191H20.7069ZM19.6668 25.5528H20.5595C21.1137 25.5528 21.5355 25.4131 21.8248 25.1336C22.117 24.8517 22.263 24.4417 22.263 23.9035C22.263 23.3814 22.1156 22.9806 21.8207 22.7011C21.5259 22.4216 21.1055 22.2819 20.5595 22.2819H19.6668V25.5528ZM24.3187 21.4191V26.4191H25.5554V24.4509H27.9592V23.6228H25.5554V22.2819H28.1885V21.4191H24.3187Z" fill="#282828"/>
            </Svg>
          </View>

          <View style={styles.cardLinkBody}>
            <Text style={styles.cardLinkLabel}>{ label }</Text>
            <Text style={styles.cardLinkCaption}>{ caption }</Text>
          </View>

          <View style={styles.iconRoute}>
            <CommonArrowRightIcon color="#282828"/>
          </View>

        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({

  cardLink: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "white",

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,

    padding: 16
  },
  cardLinkIcon: {
    width: 40,
    height: 40
  },
  cardLinkBody: {
    flex: 1,
    paddingHorizontal: 16
  },
  cardLinkLabel: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828"
  },
  cardLinkCaption: {
    fontSize: 13,
    lineHeight: 16,
    color: "#8E8E8E",

    marginTop: 5
  },

  iconRoute: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center"
  },



});

export default DocumentLink
