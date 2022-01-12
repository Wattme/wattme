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
  UserAvatarQualification
} from "../../../../../components";
import {
  ProfileTreeClose as ProfileTreeCloseIcon, ProfileTreePlus as ProfileTreePlusIcon,
} from "../../../../../assets/icons";
import tariffTitleWatt from "../../../../../constants/tariffTitleWatt";

class CardUser extends React.PureComponent {


  _renderIconUserAvatarQualification = () => {

    if ( this.props.user?.type === "link" ) {
      return (
        <ProfileTreePlusIcon/>
      )
    }

    return (
      <ProfileTreeCloseIcon/>
    )
  }

  render() {
    const {
      user,
      openPopUpLink
    } = this.props;
    const isLink = Boolean(user?.type === "link");

    return (
      <>

        <View style={styles.head}>

          <View style={styles.userImage}>
            <TouchableOpacity disabled={!isLink} activeOpacity={0.8} onPress={() => openPopUpLink(user)}>
            <UserAvatarQualification
              size={52}
              level={user?.max_energy_rank || 1}
              image={user?.avatar}
              icon={Boolean(!user?.id) ? this._renderIconUserAvatarQualification() : null}
              isCustomImage={true}
            />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.headText}>
              <Text style={{color: "#8E8E8E"}}>L.</Text> { user?.user?.left_balls || 0 }
            </Text>
            <Text style={[styles.headText, {marginTop: 12}]}>
              <Text style={{color: "#8E8E8E"}}>R.</Text> { user?.user?.right_balls || 0 }
            </Text>
          </View>

        </View>



        <View style={styles.body}>

          <Text style={styles.userName}>{ user?.name || "-" }</Text>

          <Text style={styles.userQualification}>
            { Boolean( user?.id ) ? tariffTitleWatt?.[user?.tariff_title_watt || "null"] : "-" }
          </Text>

        </View>

      </>
    );
  }
}

const styles = StyleSheet.create({

  head: {
    flexDirection: "row",
    alignItems: "center"
  },
  headText: {
    fontSize: 13,
    lineHeight: 16,
    color: "#282828"
  },

  body: {
    marginTop: 8
  },

  userImage: {
    width: 52,
    height: 52,
    marginRight: 12
  },
  userName: {
    fontSize: 13,
    lineHeight: 17,
    color: "#282828"
  },
  userQualification: {
    fontSize: 12,
    lineHeight: 14,
    color: "#10B879",
    marginTop: 8
  }

});

export default CardUser
