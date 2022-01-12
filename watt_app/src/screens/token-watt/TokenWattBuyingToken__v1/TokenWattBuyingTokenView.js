import React from "react";
import {
  View,
  StyleSheet,
  ScrollView, Linking,
} from "react-native/index";
import {

} from "react-native-ui-lib";
import {
  Header,
  ModalLoading,
  PopUpInformation, RefreshControl,
} from "../../../components";
import {
  P2PPoll as P2PPollComponent,
  LockPool as LockPoolComponent,
  TokenCard as TokenCardComponent,
  WhitePaper as WhitePaperComponent,
  AboutTokenWatt as AboutTokenWattComponent,
  AboutPreSaleWatt as AboutPreSaleWattComponent,
  PurchaseInformation as PurchaseInformationComponent,
  SliderLockPool as SliderLockPoolComponent
} from "./components";
import Notification from "../../../common/Notification";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import settings from "../../../constants/settings";
import agentWiseWin from "../../../agent/agentWiseWin";
import urls from "../../../constants/urls";
import agent from "../../../agent/agent";
import { getLinkLanding } from "../../../helpers/linking";

class TokenWattBuyingToken extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wattInfo: {
        wattHold: 0,
        wattUsd: 0,
      },
      exchangeSystemInfo: {},
      lockPoolInformation: {},

      isModalLoading: false,
      isRefreshing: false
    }

    this.refP2PPoll = React.createRef();
    this.refPopUpInformation = React.createRef();
    this.refPopUpP2PInformation = React.createRef();
  }

  componentDidMount = async () => {
    await this.getInformationUser();
    await this.getExchangeSystemInfo();
    await this.getInformationLockPool();

    this.props.navigation.addListener("focus", async () => {
      await this.refreshData();
    });
  }

  refreshData = async () => {

    this.setState({ isRefreshing: true });

    await this.getInformationUser();
    await this.getExchangeSystemInfo();
    await this.getInformationLockPool();
    await this.refP2PPoll.current.initState();

    this.setState({ isRefreshing: false });

  }

  getInformationUser = async () => {

    const { account } = this.props;
    const info = await agentWiseWin.get(`/auth/user-info?id=${ account.wisewinId }`).then((res) => {
      return res.data
    }).catch((err) => {
      return {}
    });

    const wattInfo = {
      wattHold: (info?.watt_hold || 0),
      wattUsd: (info?.watt_usd || 0),
    };

    this.setState({
      wattInfo
    });
  }
  getInformationLockPool = async () => {

    const currentPool = await agentWiseWin.get('/sync-api/streamdesk/get_current_pool').then((res) => {
      return res.data
    }).catch((err) => {
      return {}
    });

    const lockPoolInformation = {
      totalAmountFromPool: (+currentPool?.max_sale || 0),
      currentAmountWatt: (+currentPool?.current_sale || 0),
      course: (this.state?.exchangeSystemInfo?.wattRate || 0),
      name: currentPool?.name || ""
    };

    this.setState({
      lockPoolInformation
    });
  }

  buyTokenWatt = async () => {

    this.props.navigation.navigate("TokenWattTopUp");

    return null


    await this.setState({ isModalLoading: true });

    const dealId = await agentWiseWin.get(`/sync-api/watt/trade`).then((res) => {
      return res.data
    }).catch((err) => {
      return { error: err.response }
    });

    if (dealId.error) {
      await this.setState({ isModalLoading: false });

      Notification.send({
        message: allTranslations(localization.errors["internal-error"]),
        type: "danger"
      })

      return null
    }

    await this.setState({ isModalLoading: false });

    this.props.navigation.navigate("WalletCoinSend", {
      isBuyWatt: true,

      coinCode: settings.purchaseTokenWatt,
      initRecipientAddress: "0x819D10fa9F629FF54c5bc910F9772073f5FEFb61",
    });
  }

  getExchangeSystemInfo = async () => {
    const data = await agent.get(urls.exchangeSystemInfo).then((res) => {
      return res.data
    }).catch((err) => {
      return { error: err.response }
    });

    this.setState({
      exchangeSystemInfo: data
    })
  }

  _routeTokenWattP2PPool = () => {
    this.props.navigation.navigate("TokenWattP2PPool");
  }
  _routeWhitePaper = async () => {
    const link = getLinkLanding(urls.litePaper);

    await Linking.openURL(link)
  }
  _routeTokenWattTopUp = () => {
    this.props.navigation.navigate("TokenWattBusdTopUp", {
      from: "BUSD",
      to: "WATT"
    });
  }
  _routeTokenWattBusdTopUp = () => {
    this.props.navigation.navigate("TokenWattBusdTopUp", {
      from: "WATT",
      to: "BUSD"
    });
  }

  _openBounty = () => {
    this.refPopUpInformation.current.open({
      title: allTranslations(localization.tokenWattBuyingToken.popUpBounty.title),
      message: allTranslations(localization.tokenWattBuyingToken.popUpBounty.message),
      successButtonColor: "primary"
    })
  }
  _openP2pInfo = () => {

    this.refPopUpP2PInformation.current.open({
      title: allTranslations(localization.tokenWattBuyingToken.p2PPoll.popUpTitle),
      caption: allTranslations(localization.tokenWattBuyingToken.p2PPoll.popUpCaption),
      message: allTranslations(localization.tokenWattBuyingToken.p2PPoll.popUpMessage),

      successButtonColor: "primary",
      successButton: allTranslations(localization.common.ok)
    });

  }

  render() {
    const {
      wattInfo,
      exchangeSystemInfo,
      lockPoolInformation,

      isModalLoading,
      isRefreshing
    } = this.state;
    const {
      walletImportInfo
    } = this.props;

    return (
      <View style={styles.root}>

        <Header title={allTranslations(localization.tokenWattBuyingToken.headerTitle)}/>

        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this.refreshData}
            />
          }
        >

          <SliderLockPoolComponent
            totalAmountFromPool={lockPoolInformation?.totalAmountFromPool || 0}
            currentAmountWatt={lockPoolInformation?.currentAmountWatt || 0}
            label={lockPoolInformation?.name}
          />

          <View style={{marginTop: 12}}/>

          <LockPoolComponent
            endTimeStamp={1675209600000}
            wattInfo={wattInfo}
            routeTokenWattP2PPool={this._routeTokenWattP2PPool}
            openBounty={this._openBounty}
            buyToken={this.buyTokenWatt}
          />

          <View style={{marginTop: 12}}/>

          <P2PPollComponent
            ref={this.refP2PPoll}

            navigation={this.props.navigation}

            walletImportInfo={walletImportInfo}
            exchangeSystemInfo={exchangeSystemInfo}

            routeTokenWattTopUp={this._routeTokenWattTopUp}
            routeTokenWattBusdTopUp={this._routeTokenWattBusdTopUp}

            openP2pInfo={this._openP2pInfo}
          />

          <View style={{marginTop: 12}}/>

          <AboutTokenWattComponent/>

          <View style={{marginTop: 12}}/>

          <AboutPreSaleWattComponent/>

          <View style={{marginTop: 12}}/>
          <WhitePaperComponent
            onRoute={this._routeWhitePaper}
          />

        </ScrollView>


        <PopUpInformation
          ref={this.refPopUpInformation}
        />
        <PopUpInformation
          ref={this.refPopUpP2PInformation}
          styles={{
            caption: {fontSize: 14, lineHeight: 23, fontWeight: "normal"}
          }}
        />

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
    backgroundColor: "#F2F2F6"
  },
  scrollView: {
    paddingHorizontal: 12,
    paddingVertical: 16
  },


});

export default TokenWattBuyingToken
