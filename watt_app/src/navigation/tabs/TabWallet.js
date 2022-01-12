import React from "react";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import {
  WalletDashboard as WalletDashboardScreen,
  WalletImport as WalletImportScreen,
  ImportWalletCoin as ImportWalletCoinScreen,
  WalletImportForm as WalletImportFormScreen,
  WalletCreate as WalletCreateScreen,
  WalletCoinManagement as WalletCoinManagementScreen,
  WalletChoosingWallet as WalletChoosingWalletScreen,
  WalletControl as WalletControlScreen,
  WalletCoin as WalletCoinScreen,
  WalletCoinHistoryItem as WalletCoinHistoryItemScreen,
  WalletCoinReceive as WalletCoinReceiveScreen,
  WalletChoiceAdding as WalletChoiceAddingScreen,
  WalletCoinSend as WalletCoinSendScreen,
  WalletCoinSendConfirm as WalletCoinSendConfirmScreen,
  WalletCreateCustomCoin as WalletCreateCustomCoinScreen,
  WalletSecretPhrase as WalletSecretPhraseScreen,
  WalletBuyCrypto as WalletBuyCryptoScreen,


  Networks as NetworksScreen,
} from "../../screens";

const Stack = createStackNavigator();

class TabWallet extends React.Component {
  render() {
    const options = {
      ...optionsInit,
      gestureEnabled: true,
      ...TransitionPresets.SlideFromRightIOS,
    };

    return (
      <Stack.Navigator>
            {
              Object.keys(tabScreens).map((key, idx) => {
                const screen = tabScreens[key];
                const Component = screen.screen;

                return (
                  <Stack.Screen
                    key={`${key}-${idx}`}
                    name={screen.name}
                    component={Component}
                    options={options}
                  />
                );
              })
            }
          </Stack.Navigator>
    );
  }
}

const tabScreens = {
  WalletDashboard: {
    name: "WalletDashboard",
    screen: WalletDashboardScreen,
    params: {
      hideHeader: true,
    },
  },
  WalletChoiceAdding: {
    name: "WalletChoiceAdding",
    screen: WalletChoiceAddingScreen,
    params: {
      hideHeader: true,
    },
  },
  ImportWallet: {
    name: "ImportWallet",
    screen: WalletImportScreen,
    params: {
      hideHeader: true,
    },
  },
  ImportWalletCoin: {
    name: "ImportWalletCoin",
    screen: ImportWalletCoinScreen,
    params: {
      hideHeader: true,
    },
  },
  ImportWalletForm: {
    name: "ImportWalletForm",
    screen: WalletImportFormScreen,
    params: {
      hideHeader: true,
    },
  },
  WalletCreate: {
    name: "WalletCreate",
    screen: WalletCreateScreen,
    params: {
      hideHeader: true,
    },
  },
  WalletCoinManagement: {
    name: "WalletCoinManagement",
    screen: WalletCoinManagementScreen,
    params: {
      hideHeader: true,
    },
  },
  WalletChoosingWallet: {
    name: "WalletChoosingWallet",
    screen: WalletChoosingWalletScreen,
    params: {
      hideHeader: true,
    },
  },
  WalletControl: {
    name: "WalletControl",
    screen: WalletControlScreen,
    params: {
      hideHeader: true,
    },
  },
  WalletCoin: {
    name: "WalletCoin",
    screen: WalletCoinScreen,
    params: {
      hideHeader: true,
    },
  },
  WalletCoinHistoryItem: {
    name: "WalletCoinHistoryItem",
    screen: WalletCoinHistoryItemScreen,
    params: {
      hideHeader: true,
    },
  },
  WalletCoinSendConfirm: {
    name: "WalletCoinSendConfirm",
    screen: WalletCoinSendConfirmScreen,
    params: {
      hideHeader: true,
    },
  },
  WalletCoinReceive: {
    name: "WalletCoinReceive",
    screen: WalletCoinReceiveScreen,
    params: {
      hideHeader: true,
    },
  },
  WalletCoinSend: {
    name: "WalletCoinSend",
    screen: WalletCoinSendScreen,
    params: {
      hideHeader: true,
    },
  },
  WalletCreateCustomCoin: {
    name: "WalletCreateCustomCoin",
    screen: WalletCreateCustomCoinScreen,
    params: {
      hideHeader: true,
    },
  },
  WalletSecretPhrase: {
    name: "WalletSecretPhrase",
    screen: WalletSecretPhraseScreen,
    params: {
      hideHeader: true,
    },
  },
  WalletBuyCrypto: {
    name: "WalletBuyCrypto",
    screen: WalletBuyCryptoScreen,
    params: {
      hideHeader: true,
    },
  },


  Networks: {
    name: "Networks",
    screen: NetworksScreen,
    params: {
      hideHeader: true,
    },
  },
};
const optionsInit = {
  headerStyle: {
    backgroundColor: "#F9F9FF",
    borderBottomWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    height: 0,
    opacity: 0,
  },
  headerBackTitleStyle: {
    tintColor: "#3F4063",
  },
  cardStyle: {
    backgroundColor: "white",
  },
  headerTintColor: "#3F4063",
  headerBackTitle: " ",
};

export default TabWallet;
