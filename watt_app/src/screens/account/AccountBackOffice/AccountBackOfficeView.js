import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
} from "react-native/index";
import {
  Text,
  Button,
} from "react-native-ui-lib";
import {
  Header,
  ModalLoading,
  InformationFunctionDevelop
} from "../../../components";
import {
  UserCard as UserCardComponent,
  Tariff as TariffComponent,
  EcosystemParticipants as EcosystemParticipantsComponent,
  WalletAddress as WalletAddressComponent
} from "./components";
import Notification from "../../../common/Notification";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import agentWiseWin from "../../../agent/agentWiseWin";

class AccountBackOffice extends Component {
  constructor(props) {
    super(props);

    this.state = {

      energyLevel: "",
      payoutWallet: "",


      countdownEnergy: 0,
      totalCountEnergyUsers: 0,

      isModalLoading: false

    };


    this.refTariffComponent = React.createRef();
    this.refWalletAddress = React.createRef();
  }

  componentDidMount = async () => {
    await this.checkUser();
    this.props.navigation.addListener("focus", async () => {
      await this.checkUser();
    });
  };

  checkUser = async () => {
    const { account } = this.props.global;
    const isNotBlankAccount = Boolean(!account?.phone || !account?.city || !account?.country);

    if (isNotBlankAccount) {
      if (!this.props.navigation.isFocused()) {
        return null
      }

      this.props.navigation.push("AccountProfileMeEdit", {
        isRegistration: true
      });

      setTimeout(async () => {
        await this.checkUser();
      }, 100);

      return null
    }

    await this.getInformationPage();
    await this.getUserWiseWin();
  }

  getInformationPage = async () => {

    const wisewinId = this.props?.global?.account?.wisewinId;
    const info = await agentWiseWin.get(`/auth/user-energy?id=${ wisewinId }`).then((res) => {
      return res.data
    }).catch((err) => {
      return {}
    });

    await this.setState({
      energyLevel: info?.energy_level || "",
      countdownEnergy: (info?.countdown_energy * 1000) || 0,
      totalCountEnergyUsers: info?.total_count_energy_users || 0,
    });

    await this.refTariffComponent.current.updateResetQualification();
  }
  getUserWiseWin = async () => {
    const userWiseWin = this.props.wiseWinAccount;
    if (Object.keys(userWiseWin).length > 0) {
      await this.setState({
        payoutWallet: userWiseWin?.wallet || ""
      });

      this.refWalletAddress.current.initWallet(userWiseWin?.wallet || "");

      return null
    }

    const wiseWinId = this.props.global?.account?.wisewinId;
    const wiseWinProfile = await agentWiseWin(`/auth/user-info?id=${ wiseWinId }`).then((res) => {
      return res.data
    }).catch((err) => {
      return {}
    });


    await this.setState({
      payoutWallet: wiseWinProfile?.wallet || ""
    });

    this.refWalletAddress.current.initWallet(wiseWinProfile?.wallet || "");

    this.props.wiseWinSetProfile(wiseWinProfile);
  }


  setUserWiseWinWallet = async (wallet) => {

    this.setState({ isModalLoading: true });

    const wiseWinId = this.props.global?.account?.wisewinId;
    const responseSetWallet = await agentWiseWin.get(`/sync-api/streamdesk/set_wallet?id=${ wiseWinId }&wallet=${ wallet }`).then((res) => {
      return res.data
    }).catch((err) => {
      return { error: err.response }
    });

    if ( !responseSetWallet.success ) {
      this.setState({ isModalLoading: false });

      Notification.send({
        type: "danger",
        message: allTranslations(localization.accountBackOffice.walletAddress.walletAlreadyExist)
      });

      return null
    }

    await this.getUserWiseWin();

    this.setState({ isModalLoading: false });

    Notification.send({
      type: "success",
      message: allTranslations(localization.accountBackOffice.walletAddress.successSetupAddress)
    })

  }

  _namePacket = () => {
    const { wiseWinAccount } = this.props;

     if ( wiseWinAccount?.tariff_title_watt === "null" ) {
       return "Zero"
     }
     if ( wiseWinAccount?.tariff_title_watt === "minimum" ) {
       return "Minimum"
     }
     if ( wiseWinAccount?.tariff_title_watt === "medium" ) {
       return "Medium"
     }
     if ( wiseWinAccount?.tariff_title_watt === "maximum" ) {
       return "Maximum"
     }

    return "Zero"
  }

  _routeProfileMe = () => {
    this.props.navigation.navigate("AccountProfileMe")
  }
  _routeAccountMyTeam = () => {
    this.props.navigation.navigate("AccountMyTeam");
  }
  _routeAccountStatistics = () => {
    this.props.navigation.navigate("AccountStatistics");
  }
  _routeAccountQualifications = () => {
    this.props.navigation.navigate("AccountQualifications");
  }
  _routeTokenWattBuyingToken = () => {
    this.props.navigation.navigate("TokenWattBuyingToken");
  }

  render() {
    const {
      global,
      wiseWinAccount
    } = this.props;
    const {
      energyLevel,
      payoutWallet,
      isModalLoading,
      countdownEnergy,
      totalCountEnergyUsers
    } = this.state;
    const {
      account,
    } = global;

    return (
      <View style={styles.root}>

        <Header
          title={allTranslations(localization.accountBackOffice.headerTitle)}
          hideLeft
        />

        <ScrollView style={{ flexGrow: 1 }} contentContainerStyle={styles.scrollView}>

          <UserCardComponent
            account={ account }
            wiseWinAccount={wiseWinAccount}

            routeProfileMe={this._routeProfileMe}
            routeAccountMyTeam={this._routeAccountMyTeam}
            routeTokenWattBuyingToken={this._routeTokenWattBuyingToken}
          />

          <View style={{marginTop: 12}}/>

          {
            Boolean(!account?.wisewinPatronCode) ? (
              <InformationFunctionDevelop
                message={allTranslations(localization.accountBackOffice.messageNotCurator)}
              />
            ) : (
              <EcosystemParticipantsComponent
                totalCountEnergyUsers={totalCountEnergyUsers}
                routeAccountStatistics={this._routeAccountStatistics}
                routeAccountQualifications={this._routeAccountQualifications}
              />
            )
          }

          <View style={{marginTop: 12}}/>

          <TariffComponent
            ref={this.refTariffComponent}

            endTimeStamp={countdownEnergy}

            paketName={this._namePacket()}
            energyLevel={energyLevel}
            totalCountEnergyUsers={totalCountEnergyUsers}
          />

          <View style={{marginTop: 12}}/>

          <WalletAddressComponent
            ref={this.refWalletAddress}
            onSetup={this.setUserWiseWinWallet}
          />

        </ScrollView>


        <ModalLoading
          open={isModalLoading}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F2F2F6",
  },

  scrollView: {
    paddingHorizontal: 12,
    paddingVertical: 16
  },
});

export default AccountBackOffice;
