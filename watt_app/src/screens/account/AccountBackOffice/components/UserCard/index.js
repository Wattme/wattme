import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text,
  Button
} from "react-native-ui-lib";
import {
  CommonArrowRight as CommonArrowRightIcon
} from "../../../../../assets/icons";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import { UserAvatarQualification } from "../../../../../components";
import { imageUserQualifications } from "../../../../../common/UserQualifications";

class UserCard extends React.PureComponent {
  render() {
    const {
      account,
      wiseWinAccount,

      routeProfileMe,
      routeAccountMyTeam,
      routeTokenWattBuyingToken
    } = this.props;

    return (
      <View style={styles.card}>
        <View style={styles.cardHead}>

          <TouchableOpacity style={styles.buttonNavigation} activeOpacity={0.8} onPress={routeProfileMe}>
            <UserAvatarQualification
              size={60}
              style={styles.avatar}
            />

            <Text style={styles.userName}>
              { [account?.firstName, account?.lastName].join('\n') }
            </Text>

            <View style={styles.cardArrow}>
              <CommonArrowRightIcon
                color="#282828"
              />
            </View>
          </TouchableOpacity>

          <View style={styles.qualification}>
            {Boolean(Object.keys(wiseWinAccount || {}).length > 0)&&(
              <Image
                source={imageUserQualifications(wiseWinAccount?.max_energy_rank || 1)}
                style={{width: '100%', height: "100%"}}
                resizeMode="contain"
              />
            )}
          </View>

        </View>

        <View style={styles.cardBody}>

          {
            Boolean(account.wisewinPatronCode) && (
              <Button
                label={allTranslations(localization.accountBackOffice.myTeam)}
                color="secondary"
                size="small"
                style={styles.buttonControl}
                labelStyle={{fontWeight: "normal"}}
                onPress={routeAccountMyTeam}
              />
            )
          }

          <Button
            label={allTranslations(localization.accountBackOffice.tokenWatt)}
            size="small"
            style={styles.buttonControl}
            labelStyle={{fontWeight: "normal"}}
            onPress={routeTokenWattBuyingToken}
          />

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14
  },
  cardHead: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardBody: {
    marginTop: 16,
    flexDirection: "row",
    marginLeft: -12
  },

  buttonNavigation: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },

  cardArrow: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center"
  },

  avatar: {
    marginRight: 16
  },

  userName: {
    flex: 1,
    fontSize: 20,
    lineHeight: 27,
    color: "#282828",
    fontWeight: "500"
  },

  qualification: {
    width: 60,
    height: 60,
    borderRadius: 999,
    marginLeft: 16
  },

  buttonControl: {
    height: 36,
    marginLeft: 12,
    flex: 1,
    borderRadius: 8
  },
});

export default UserCard
