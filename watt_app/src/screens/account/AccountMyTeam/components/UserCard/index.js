import React from "react";
import {
  View,
  StyleSheet, TouchableOpacity,
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  CommonArrowBottom as CommonArrowBottomIcon,
  CommonMail as CommonMailIcon,
  CommonPhone as CommonPhoneIcon,
  CommonTelegram as CommonTelegramIcon
} from "../../../../../assets/icons";
import {
  UserAvatarQualification
} from "../../../../../components";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import qualifications from "../../../../../constants/qualifications";
import tariffTitleWatt from "../../../../../constants/tariffTitleWatt";
import moment from "moment";

class UserCard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {

      isOpen: false
    };
  }

  onTapOpen = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  render() {
    const {
      wiseWinAccount
    } = this.props;
    const {
      isOpen
    } = this.state;

    return (
      <View style={styles.root}>
        <View style={styles.rootBody}>
          <View style={styles.userImage}>
            <UserAvatarQualification
              size={60}
              level={wiseWinAccount?.energy_rank || 1}
              image={wiseWinAccount?.avatar}
              isCustomImage={true}
            />
          </View>
          <View style={styles.userBody}>

            <Text style={styles.userName}>
              { [wiseWinAccount?.first_name, wiseWinAccount?.last_name].join(" ") }
            </Text>
            <Text style={styles.userQualification}>
              { qualifications[ wiseWinAccount?.energy_rank || 1 ] }
            </Text>

          </View>
          <TouchableOpacity style={styles.buttonOpen} activeOpacity={0.8} onPress={this.onTapOpen}>
            <View style={{
              transform: [
                { rotate: Boolean(isOpen) ? "180deg" : "0deg" }
              ]
            }}>
              <CommonArrowBottomIcon color="#282828"/>
            </View>
          </TouchableOpacity>
        </View>
        {Boolean(isOpen) && (
          <View style={styles.rootFooter}>

            <View style={styles.separate}/>

            <View style={styles.rowInfo}>
              <View style={styles.rowInfoIcon}>
                <CommonMailIcon/>
              </View>
              <Text style={styles.rowInfoText}>
                { wiseWinAccount?.email }
              </Text>
            </View>

            <View style={{marginTop: 12}}/>

            <View style={styles.rowInfo}>
              <View style={styles.rowInfoIcon}>
                <CommonPhoneIcon/>
              </View>
              <Text style={styles.rowInfoText}>
                { wiseWinAccount?.phone }
              </Text>
            </View>

            <View style={{marginTop: 12}}/>

            <View style={styles.rowInfo}>
              <View style={styles.rowInfoIcon}>
                <CommonTelegramIcon color="#8E8E8E"/>
              </View>
              <Text style={styles.rowInfoText}>
                { wiseWinAccount?.telegram_username  }
              </Text>
            </View>

            <View style={{marginTop: 12}}/>

            <View style={styles.rowAdditionalInfo}>
              <Text style={styles.rowAdditionalInfoLabel}>{allTranslations(localization.accountMyTeam.userCard.personallyInvited)}:</Text>
              <Text style={[styles.rowAdditionalInfoValue, {fontWeight: "500"}]}>{ wiseWinAccount?.ref_count || 0 }</Text>
            </View>

            <View style={{marginTop: 12}}/>

            <View style={styles.rowAdditionalInfo}>
              <Text style={styles.rowAdditionalInfoLabel}>{allTranslations(localization.accountMyTeam.userCard.totalCountParticipants)}:</Text>
              <Text style={[styles.rowAdditionalInfoValue, {fontWeight: "500"}]}>{ wiseWinAccount?.ref_count_total || 0 }</Text>
            </View>

            <View style={styles.separate}/>

            <View style={styles.rowAdditionalInfo}>
              <Text style={styles.rowAdditionalInfoLabel}>{allTranslations(localization.accountMyTeam.userCard.packageActivated)}:</Text>
              <Text style={[styles.rowAdditionalInfoValue, {color: "#10B879"}]}>
                { tariffTitleWatt[wiseWinAccount?.tariff_title_watt || "null"] }
              </Text>
            </View>

            <View style={{marginTop: 12}}/>

            <View style={styles.rowAdditionalInfo}>
              <Text style={styles.rowAdditionalInfoLabel}>{allTranslations(localization.accountMyTeam.userCard.curator)}:</Text>
              <Text style={[styles.rowAdditionalInfoValue]}>{ wiseWinAccount?.referrer_name || "-" }</Text>
            </View>

            <View style={{marginTop: 12}}/>

            <View style={styles.rowAdditionalInfo}>
              <Text style={styles.rowAdditionalInfoLabel}>{allTranslations(localization.accountMyTeam.userCard.registrationDate)}:</Text>
              <Text style={[styles.rowAdditionalInfoValue]}>
                { moment(wiseWinAccount?.created_at).format("DD.MM.YYYY") }</Text>
            </View>

          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({

  root: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,
    backgroundColor: "white",
    padding: 16
  },
  rootBody: {
    flexDirection: "row",
    alignItems: "center",
  },
  rootFooter: {},

  userImage: {
    width: 60,
    height: 60,
  },

  userBody: {
    flex: 1,
    paddingLeft: 16
  },
  userName: {
    fontSize: 20,
    lineHeight: 28,
    color: "#282828",
    fontWeight: "500"
  },
  userQualification: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E",
    marginTop: 16
  },

  buttonOpen: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center"
  },


  separate: {
    width: "100%",
    height: 1,
    backgroundColor: "#F9F9F9",
    marginVertical: 15
  },

  rowInfo: {
    flexDirection: "row",
    alignItems: "center"
  },
  rowInfoIcon: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12
  },
  rowInfoText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828"
  },

  rowAdditionalInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  rowAdditionalInfoLabel: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E",
    paddingRight: 12
  },
  rowAdditionalInfoValue: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "right",
    color: "#282828"
  },

});

export default UserCard
