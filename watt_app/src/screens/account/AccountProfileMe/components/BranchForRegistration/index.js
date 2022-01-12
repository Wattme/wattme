import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text,
  Switch
} from "react-native-ui-lib";
import {
  CommonCopy as CommonCopyIcon,
  CommonQrCodeItem as CommonQrCodeItemIcon
} from "../../../../../assets/icons";
import {
  ModalLoading,
  PopUpQrCode
} from "../../../../../components";
import Clipboard from "@react-native-clipboard/clipboard";
import Notification from "../../../../../common/Notification";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import agentWiseWin from "../../../../../agent/agentWiseWin";
import urls from "../../../../../constants/urls";

class BranchForRegistration extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      direction: Boolean(props?.wiseWinAccount?.direct) ? "right" : "left",

      isModalLoading: false
    };

    this.refPopUpQrCode = React.createRef();
  }

  changeDirection = async ( direction ) => {
    await this.setState({ direction });

    this.setState({ isModalLoading: true });
    const wiseWinId = this.props?.wiseWinAccount?.user_id;
    const direct = Boolean(direction === "right");
    await agentWiseWin.get(`/sync-api/streamdesk/set_direct?id=${ wiseWinId }&direct=${ Number(direct) }`).then((res) => {
      return res.data
    }).catch((err) => {
      return {error: err.response}
    });

    const wiseWinAccount = await agentWiseWin(`${ urls.getWiseWinAccount }${ wiseWinId }`).then((res) => {
      return res.data
    }).catch(() => {
      return {}
    });

    Notification.send({
      message: allTranslations(localization.accountProfileMe.branchForRegistration.successChangeDirect),
      type: "success"
    });

    this.props.updateWiseWinAccount(wiseWinAccount);

    this.setState({ isModalLoading: false });
  }

  copyWattMeLink = async () => {
    const {
      wiseWinAccount
    } = this.props;

    await Clipboard.setString(wiseWinAccount?.direct_link);

    Notification.send({
      message: allTranslations(localization.accountProfileMe.branchForRegistration.successCopyWattMeLink),
      type: "success"
    })
  }
  copyMentorId = async () => {
    const {
      wiseWinAccount
    } = this.props;

    await Clipboard.setString(wiseWinAccount?.refcode);

    Notification.send({
      message: allTranslations(localization.accountProfileMe.branchForRegistration.successCopyMentorId),
      type: "success"
    })
  }

  openPopUpQrCode = () => {
    const refCode = this.props?.wiseWinAccount?.refcode || "";

    this.refPopUpQrCode.current.open({
      data: refCode,
      message: allTranslations(localization.accountProfileMe.branchForRegistration.messageQrCodeMentor)
    })
  }
  closePopUpQrCode = () => {}

  _getLink = () => {
    const {
      wiseWinAccount
    } = this.props;

    let link = (wiseWinAccount?.direct_link || "").slice(0, 15);

    return `${ link }...`
  }

  render() {
    const {
      direction,
      isModalLoading
    } = this.state;
    const {
      wiseWinAccount
    } = this.props;

    return (
      <View style={styles.root}>

        <Text style={styles.title}>
          { allTranslations(localization.accountProfileMe.branchForRegistration.title) }
        </Text>

        <View style={styles.directions}>

          <TouchableOpacity activeOpacity={0.8} style={styles.direction} onPress={() => this.changeDirection("left")}>
            <Text style={styles.directionLabel}>
              { allTranslations(localization.accountProfileMe.branchForRegistration.left) }
            </Text>
          </TouchableOpacity>
          <Switch
            value={Boolean(direction === "right")}
            style={styles.directionSwitch}
            onValueChange={() => this.changeDirection(Boolean(direction === "right") ? "left" : "right")}
          />
          <TouchableOpacity activeOpacity={0.8} style={styles.direction} onPress={() => this.changeDirection("right")}>
            <Text style={styles.directionLabel}>
              { allTranslations(localization.accountProfileMe.branchForRegistration.right) }
            </Text>
          </TouchableOpacity>

        </View>

        <View style={styles.mentorContainer}>
          <Text style={styles.mentorLabel}>
            { allTranslations(localization.accountProfileMe.branchForRegistration.mentorId) }:
          </Text>
          <View style={styles.mentorRight}>
            <Text style={styles.mentorRightLabel}>
              { wiseWinAccount?.refcode }
            </Text>
            <TouchableOpacity style={styles.mentorRightIcon} onPress={this.copyMentorId} activeOpacity={0.8}>
              <CommonCopyIcon color="#282828"/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.mentorRightIcon, {marginLeft: 2}]} onPress={this.openPopUpQrCode } activeOpacity={0.8}>
              <CommonQrCodeItemIcon color="#282828"/>
            </TouchableOpacity>
          </View>
        </View>

        <ModalLoading open={isModalLoading} />

        <PopUpQrCode
          ref={this.refPopUpQrCode}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({

  root: {
    backgroundColor: "white",

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,

    padding: 16
  },

  title: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "500",
    color: "#000000",
    textAlign: "center",

    marginBottom: 16
  },

  directions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  direction: {},
  directionSwitch: {
    marginHorizontal: 10,
    backgroundColor: "black"
  },
  directionLabel: {
    fontSize: 14,
    lineHeight: 17,
    fontWeight: "500",
    color: "#282828",
  },

  mentorContainer: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  mentorLabel: {
    fontSize: 13,
    lineHeight: 16,
    color: "#282828"
  },
  mentorRight: {
    flexDirection: "row",
    alignItems: "center"
  },
  mentorRightLabel: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E",
  },
  mentorRightIcon: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6
  },

});

export default BranchForRegistration
