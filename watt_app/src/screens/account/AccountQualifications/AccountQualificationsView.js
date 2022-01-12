import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native/index";
import {
  Text,
  Button,
} from "react-native-ui-lib";
import {
  Header
} from "../../../components";
import {
  CommonInfo as CommonInfoIcon
} from "../../../assets/icons";
import {
  CurrentQualifications as CurrentQualificationsComponent,
  ListQualifications as ListQualificationsComponent
} from "./components";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import agentWiseWin from "../../../agent/agentWiseWin";

class AccountQualifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ranks: [],

      dateEndQualification: 0,
      leaderBonus: 0,
      lowTotal: 0,
      maxEnergyRank: 0,
      currentEnergyValue: 0,

      isLoad: true
    };

    this.refCurrentQualificationsComponent = React.createRef();
  }

  componentDidMount = async () => {
    await this.getUserEnergy();
  };

  getUserEnergy = async () => {

    const wisewinId = this.props?.account?.wisewinId;
    const info = await agentWiseWin.get(`/auth/user-energy?id=${ wisewinId }`).then((res) => {
      return res.data
    }).catch((err) => {
      return {}
    });

    let maxEnergyRankLevel = 0;
    const ranks = Object.keys((info?.ranks || {})).map((key) => {
      const item = info?.ranks?.[key] || {};
      const itemKey = Object.keys(item)?.[0];

      if (itemKey === info?.max_energy_rank) {
        maxEnergyRankLevel = key;
      }

      return item[itemKey];
    });

    await this.setState({
      ranks: ranks,
      dateEndQualification: (info?.end_time * 1000),
      leaderBonus: info?.leader_bonus || 0,
      lowTotal: info?.low_total || 0,
      maxEnergyRank: info?.max_energy_rank || 0,
      currentEnergyValue: info?.current_energy_value || 0,
      maxEnergyRankLevel: maxEnergyRankLevel,

      isLoad: false
    });

    await this.refCurrentQualificationsComponent.current.updateResetQualification();
  }

  _headerRightContent = () => {
    return (
      <TouchableOpacity style={styles.headerButton}>
        <CommonInfoIcon color="#8E8E8E"/>
      </TouchableOpacity>
    )
  }
  _routeAccountWalkFame = () => {
    this.props.navigation.navigate("AccountWalkFame");
  }

  render() {
    const {
      ranks,
      dateEndQualification,

      leaderBonus,
      lowTotal,
      maxEnergyRank,
      maxEnergyRankLevel,
      currentEnergyValue,

      isLoad
    } = this.state;

    return (
      <View style={styles.root}>

        <Header
          title={allTranslations(localization.accountQualifications.headerTitle)}
          rightContent={this._headerRightContent}
        />

        <ScrollView contentContainerStyle={styles.scrollView}>

          <CurrentQualificationsComponent
            ref={this.refCurrentQualificationsComponent}

            endTimeStamp={dateEndQualification || 0}

            leaderBonus={leaderBonus}
            lowTotal={lowTotal}
            maxEnergyRank={maxEnergyRank}
            maxEnergyRankLevel={maxEnergyRankLevel}
          />

          <View style={{marginTop: 12}}/>

          <ListQualificationsComponent
            ranks={ranks}
            currentEnergyValue={currentEnergyValue}
          />

          <View style={{marginTop: 12}}/>

          <Button
            label={allTranslations(localization.accountQualifications.buttonWalkFame)}
            labelStyle={{ fontWeight: "normal" }}
            size="small"
            color="secondary"
            onPress={this._routeAccountWalkFame}
          />

        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F2F2F6"
  },

  headerButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },

  scrollView: {
    paddingHorizontal: 12,
    paddingVertical: 16
  },

});

export default AccountQualifications;
