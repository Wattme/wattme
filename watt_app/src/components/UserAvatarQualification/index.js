import React from "react";
import {
  View,
  Image,
  StyleSheet
} from "react-native/index";
import {
  QualificationsAlfaRound,
  QualificationsTeslaRound,
  QualificationsStormRound,
  QualificationsSparkRound,
  QualificationsPowerRound,
  QualificationsFlashRound,
  QualificationsNoQualificationsRound
} from "../../assets/icons";
import { compose } from "recompose";
import { connect } from "react-redux";
import { setProfile as wiseWinSetProfile } from "../../state/WiseWinState";

class UserAvatarQualification extends React.PureComponent {

  _renderSvgRound = () => {
    const {
      size,
      level: initLevel,
      wiseWinAccount
    } = this.props;
    const userEnergyRank = wiseWinAccount?.energy_rank || 0;
    const level = initLevel || userEnergyRank || 0;

    let Svg = QualificationsNoQualificationsRound;
    if (level === 2) {
      Svg = QualificationsSparkRound;
    }
    if (level === 3) {
      Svg = QualificationsFlashRound;
    }
    if (level === 4) {
      Svg = QualificationsPowerRound;
    }
    if (level === 5) {
      Svg = QualificationsStormRound;
    }
    if (level === 6) {
      Svg = QualificationsTeslaRound;
    }
    if (level === 7) {
      Svg = QualificationsAlfaRound;
    }

    return (
      <Svg size={size} style={styles.svg}/>
    )
  }

  _renderImage = () => {
    const {
      wiseWinAccount,
      isCustomImage,
      image,
      size,

      icon: Icon
    } = this.props;
    const userAvatar = Boolean(isCustomImage) ? image : wiseWinAccount?.avatar;

    if (Icon) {
      return (
        <View style={{alignItems: "center", justifyContent: "center", flex: 1}}>
          { Icon }
        </View>
      )
    }

    if (userAvatar) {
      return (
        <Image
          source={{ uri: userAvatar }}
          style={{ width: "100%", height: "100%", borderRadius: 999 }}
        />
      )
    }

    return (
      <Image
        source={require("../../assets/png/user/pug.png")}
        style={{ width: size - 14, height: size - 14, margin: 7 }}
      />
    )
  }

  render() {
    const {
      size,
      image,
      isCustomImage,

      style,

      wiseWinAccount
    } = this.props;
    const userAvatar = Boolean(isCustomImage) ? image : wiseWinAccount?.avatar;

    return (
      <View
        style={[
          styles.root,
          { width: size, height: size },
          style
        ]}
      >

        {
          this._renderSvgRound()
        }



        {
          this._renderImage()
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({

  root: {
    borderRadius: 999,
    overflow: "hidden",
    position: "relative"
  },

  svg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10
  }

});

export default compose(
  connect(
    state => ({
      wiseWinAccount: state?.wiseWinState?.profile || {}
    }),
    dispatch => ({}),
  ),
)(UserAvatarQualification)
