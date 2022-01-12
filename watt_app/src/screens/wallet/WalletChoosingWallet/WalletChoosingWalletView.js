import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native/index";
import {
  Text,
} from "react-native-ui-lib";
import {
  Header,
  ModalLoading,
  PopUpInformation
} from "../../../components";
import {
  Wallet as WalletComponent,
} from "./components";
import {
  CommonPlus as CommonPlusIcon,
} from "../../../assets/icons";
import Notification from "../../../common/Notification";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import { getBalanceMain } from "../../../sheduler/balance";
import { getWalletsList } from "../../../helpers/walletsList";

class WalletChoosingWallet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sections: [],

      activeNameWallet: "",

      isOpenModalLoading: false,
    };

    this.refPopUpInformation = React.createRef();
  }

  componentDidMount = () => {
    this.initSections();
    this.props.navigation.addListener("focus", () => {
      this.initSections();
    });
  };
  initSections = () => {
    const { walletsList, wallet } = this.props.global;
    const activeNameWallet = wallet?.key;

    let multiWallets = [];
    let singleWallets = [];

    Object.keys(walletsList).map((key) => {
      const walletItem = walletsList[key];
      const walletItemType = walletItem?.type;

      if (walletItemType === "MULTI") {
        multiWallets.push({
          ...walletItem,
          walletKey: key,
          caption: allTranslations(localization.walletChoosingWallet.multiSectionTitle),
        });
      } else {
        const length = 10;
        const walletCode = walletItem?.list?.[0]?.code || "";
        const walletAddress = walletItem?.list?.[0]?.address || "";

        singleWallets.push({
          ...walletItem,
          walletKey: key,
          label: `${walletCode} ${allTranslations(localization.walletChoosingWallet.singleLabelWallet)}`,
          caption: `${walletAddress.substring(0, length)} •••• ${walletAddress.substring(walletAddress.length - length, walletAddress.length)}`,
        });
      }
    });

    let sections = [
      {
        label: allTranslations(localization.walletChoosingWallet.multiSectionTitle),
        items: multiWallets,
      },
      {
        label: allTranslations(localization.walletChoosingWallet.singleSectionTitle),
        items: singleWallets,
      },
    ];

    this.setState({
      sections,
      activeNameWallet,
    });
  };

  setActiveWallet = async (walletKey) => {

    // Если пользователь выбрал тот же кошелек
    if (walletKey === this.state.activeNameWallet) {
      return null;
    }

    this.setState({ isOpenModalLoading: true });

    let walletInit = (this.props.global.walletsList || {})?.[walletKey] || {};
    walletInit = await getBalanceMain(walletInit);

    const { walletsList, wallet } = await getWalletsList({
      walletName: walletInit.key,
      walletList: walletInit.list,
    });

    this.props.updateWallet(wallet);
    this.props.updateWalletsList(walletsList);

    this.setState({
      activeNameWallet: walletKey,
      isOpenModalLoading: false,
    });
  };

  deleteWallet = async (wallet, isConfirm) => {
    if (!isConfirm) {
      this.refPopUpInformation.current.open({
        title: allTranslations(localization.walletChoosingWallet.deleteWalletConfirm.title),
        message: allTranslations(localization.walletChoosingWallet.deleteWalletConfirm.message),

        controls: "confirm",

        onConfirm: this.deleteWallet.bind(this, wallet, true)
      });

      return null
    }

    this.refPopUpInformation.current.close();

    this.setState({ isOpenModalLoading: true });

    let newWalletsList = {...this.props.global.walletsList};
    delete newWalletsList[wallet.key];

    let newWallet = newWalletsList[Object.keys(newWalletsList)[0]] || {};
    newWallet = await getBalanceMain(newWallet);

    this.props.updateWallet(newWallet);
    this.props.updateWalletsList(newWalletsList);

    if (Object.keys(newWalletsList).length <= 0) {
      this.props.navigation.goBack("WalletDashboard");
    }

    await this.initSections();

    Notification.send({
      message: allTranslations(localization.walletChoosingWallet.deleteWalletSuccess),
      type: "success"
    });

    this.setState({ isOpenModalLoading: false });
  }

  _routeWalletAdd = () => {
    this.props.navigation.navigate("WalletChoiceAdding");
  };

  _renderRightContent = () => {
    return (
      <TouchableOpacity onPress={this._routeWalletAdd}>
        <CommonPlusIcon color="#8E8E8E" />
      </TouchableOpacity>
    );
  };

  render() {
    const {
      sections,

      activeNameWallet,

      isOpenModalLoading,
    } = this.state;

    return (
      <View style={styles.root}>
        <Header
          title={allTranslations(localization.walletChoosingWallet.header)}
          rightContent={this._renderRightContent}
        />

        <ScrollView contentContainerStyle={styles.scrollView}>

          {sections.map((section, idx) => {
            if ((section.items || []).length <= 0) {
              return null;
            }

            return (
              <View
                key={`WalletChoosingWallet-section-${idx}`}
                style={[styles.section, Boolean(idx === 0) && { marginTop: 0 }]}
              >
                <View style={styles.sectionHead}>
                  <Text style={styles.sectionTitle}>{section.label}</Text>
                </View>

                {(section.items || []).map((wallet, idxWallet) => (
                  <View key={`WalletChoosingWallet-section-${idx}-${idxWallet}`}>

                    <WalletComponent
                      wallet={wallet}
                      isActive={Boolean(wallet.walletKey === activeNameWallet)}
                      isFirst={idxWallet === 0}
                      isLast={(section.items || []).length - 1 === idxWallet}

                      onPress={() => this.setActiveWallet(wallet.walletKey)}
                      onDelete={() => this.deleteWallet(wallet)}
                    />

                    {
                      Boolean((section.items || []).length - 1 > idxWallet) && (
                        <View style={styles.sectionSeparate}/>
                      )
                    }

                  </View>
                ))}
              </View>
            );
          })}

        </ScrollView>

        <ModalLoading
          open={isOpenModalLoading}
        />


        <PopUpInformation
          ref={this.refPopUpInformation}
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
    paddingVertical: 16,
  },

  section: {
    marginTop: 12,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    backgroundColor: "white",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    overflow: "hidden"
  },
  sectionHead: {
    marginBottom: 16,
  },
  sectionSeparate: {
    height: 2,
    backgroundColor: "#F9F9F9",
    marginLeft: 60
  },
  sectionTitle: {
    fontSize: 18,
    lineHeight: 21,
    color: "#000000",
    fontWeight: "500",
  },
});

export default WalletChoosingWallet;
