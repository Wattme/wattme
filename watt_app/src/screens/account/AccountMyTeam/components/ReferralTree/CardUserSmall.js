import React from "react";
import {
  View,
  Dimensions,
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
  ProfileTreeClose as ProfileTreeCloseIcon,
  ProfileTreePlus as ProfileTreePlusIcon
} from "../../../../../assets/icons";
import tariffTitleWatt from "../../../../../constants/tariffTitleWatt";

const {
  width
} = Dimensions.get("window");

class CardUser extends React.PureComponent {

  _getSizeChildrenImage = () => {
    const containerWidth = width - 24;
    const cardWidth = ((containerWidth / 4) - 12) - 24;
    const imageWidth = ( cardWidth / 2 );

    return imageWidth
  }


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
      getTreeChild,

      openPopUpLink
    } = this.props;
    const isLink = Boolean(user?.type === "link");

    return (
      <>

        <View style={styles.head}>

          <View style={styles.imageContainer}>
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

          <View>
            <Text style={styles.userName} numberOfLines={1}>{ (user?.name || "").split(" ")?.[0] || "-" }</Text>
            <Text style={styles.userName} numberOfLines={1}>{ (user?.name || "").split(" ")?.[1] || "-" }</Text>
          </View>

          <Text style={styles.userQualification}>
            { Boolean( user?.id ) ? tariffTitleWatt?.[user?.tariff_title_watt || "null"] : "-" }
          </Text>

        </View>

        <View style={styles.footer}>
          {(user?.children || []).map((child, index) => (
            <TouchableOpacity
              key={`child-${index}`}
              style={styles.footerItem}
              disabled={Boolean(!child.id)}
              onPress={() => getTreeChild(child.id)}
            >
              <UserAvatarQualification
                size={this._getSizeChildrenImage()}
                level={child?.max_energy_rank || 1}
                image={child?.avatar}
                icon={Boolean(!child?.id) ? <ProfileTreeCloseIcon size={10}/> : null}
                isCustomImage={true}
              />
            </TouchableOpacity>
          ))}
        </View>

      </>
    );
  }
}

const styles = StyleSheet.create({

  head: {},
  headText: {
    fontSize: 13,
    lineHeight: 16,
    color: "#282828"
  },

  body: {
    marginTop: 8
  },

  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8
  },

  userImage: {
    width: 52,
    height: 52
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
  },

  footer: {
    flexDirection: "row",
    marginLeft: -4,
    marginTop: 12
  },
  footerItem: {
    marginLeft: 4
  }

});

export default CardUser
