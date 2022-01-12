import React from "react";
import {
  View,
  Image,
  StyleSheet
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import { imageUserQualifications } from "../../../../../common/UserQualifications";
import qualifications from "../../../../../constants/qualifications";

class UserRow extends React.PureComponent {

  // Топ 20 чеков
  _getUserQualification = (levelQualification) => {
    return qualifications[levelQualification || 1]
  }


  // Топ 20 квалификайи
  _getUserEnergyPower = (energyPower) => {
    return qualifications[energyPower || 1]
  }

  render() {
    const {
      user,

      index,
      isQualification
    } = this.props;

    return (
      <View style={styles.card}>

        <View style={styles.avatarContainer}>
          <Image
            source={Boolean(user.avatar) ? { uri: user.avatar } : require("../../../../../assets/png/user/pug.png")}
            style={styles.avatarImage}
          />
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.userName}>
            { user.fullName }
          </Text>

          <Text style={styles.userQualification}>
            { Boolean(isQualification) ? this._getUserEnergyPower(user.energy_rank) : this._getUserQualification(user.energy_level)  }
          </Text>
        </View>

        {
          Boolean(isQualification) && (
            <View style={styles.cardQualification}>
              <Image
                style={{ width: "100%", height: "100%" }}
                source={imageUserQualifications(user?.energy_rank || 1)}
              />
            </View>
          )
        }

        <View style={styles.cardIndex}>
          <Text style={styles.cardIndexLabel}>
            { String(index || '').padStart(2, '0') }
          </Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  card: {
    flexDirection: "row",
    alignItems: "center"
  },
  cardBody: {
    flex: 1,
    paddingLeft: 12
  },

  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 999,
    overflow: "hidden",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#282828"
  },
  avatarImage: {
    width: "100%",
    height: "100%"
  },

  userName: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "500",
    color: "#000000"
  },
  userQualification: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E",
    marginTop: 8
  },

  cardQualification: {
    width: 44,
    height: 44,
    marginLeft: 16
  },

  cardIndex: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: "#F7F7F7",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 16
  },
  cardIndexLabel: {
    fontSize: 18,
    lineHeight: 21,
    color: "#000000",
    fontWeight: "500"
  },

})

export default UserRow;
