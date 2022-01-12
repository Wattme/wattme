import React from "react";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import {
  AccountBackOffice as AccountBackOfficeScreen,
  AccountProfileMe as AccountProfileMeScreen,
  AccountProfileMeEdit as AccountProfileMeEditScreen,
  AccountStatistics as AccountStatisticsScreen,
  AccountQualifications as AccountQualificationsScreen,
  AccountWalkFame as AccountWalkFameScreen,
  AccountMyTeam as AccountMyTeamScreen,
  AccountDocuments as AccountDocumentsScreen,

  TokenWattAbout as TokenWattAboutScreen,
  TokenWattBuyingToken as TokenWattBuyingTokenScreen,
  TokenWattP2PPool as TokenWattP2PPoolScreen,
  TokenWattTopUp as TokenWattTopUpScreen,
  TokenWattBusdTopUp as TokenWattBusdTopUpScreen,
  TokenWattTransactions as TokenWattTransactionsScreen,
  TokenWattInformation as TokenWattInformationScreen,
  TokenWattTransactionsDetails as TokenWattTransactionsDetailsScreen,

  WalletCoinSend as WalletCoinSendScreen,
  WalletCoinSendConfirm as WalletCoinSendConfirmScreen,
} from "../../screens";

const Stack = createStackNavigator();

class TabAccountCabinet extends React.Component {
  render() {
    const options = {
      ...optionsInit,
      gestureEnabled: true,
      ...TransitionPresets.SlideFromRightIOS,
    };

    return (
      <Stack.Navigator>
        {
          Object.keys(tabScreensCabinet).map((key, idx) => {
            const screen = tabScreensCabinet[key];
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

const tabScreensCabinet = {
  AccountBackOffice: {
    name: "AccountBackOffice",
    screen: AccountBackOfficeScreen,
    params: {
      hideHeader: true,
    },
  },
  AccountProfileMe: {
    name: "AccountProfileMe",
    screen: AccountProfileMeScreen,
    params: {
      hideHeader: true,
    },
  },
  AccountProfileMeEdit: {
    name: "AccountProfileMeEdit",
    screen: AccountProfileMeEditScreen,
    params: {
      hideHeader: true,
    },
  },
  AccountStatistics: {
    name: "AccountStatistics",
    screen: AccountStatisticsScreen,
    params: {
      hideHeader: true,
    },
  },
  AccountQualifications: {
    name: "AccountQualifications",
    screen: AccountQualificationsScreen,
    params: {
      hideHeader: true,
    },
  },
  AccountWalkFame: {
    name: "AccountWalkFame",
    screen: AccountWalkFameScreen,
    params: {
      hideHeader: true,
    },
  },
  AccountMyTeam: {
    name: "AccountMyTeam",
    screen: AccountMyTeamScreen,
    params: {
      hideHeader: true,
    },
  },
  AccountDocuments: {
    name: "AccountDocuments",
    screen: AccountDocumentsScreen,
    params: {
      hideHeader: true,
    },
  },

  TokenWattAbout: {
    name: "TokenWattAbout",
    screen: TokenWattAboutScreen,
    params: {
      hideHeader: true,
    },
  },
  TokenWattBuyingToken: {
    name: "TokenWattBuyingToken",
    screen: TokenWattBuyingTokenScreen,
    params: {
      hideHeader: true,
    },
  },
  TokenWattP2PPool: {
    name: "TokenWattP2PPool",
    screen: TokenWattP2PPoolScreen,
    params: {
      hideHeader: true,
    },
  },
  TokenWattTopUp: {
    name: "TokenWattTopUp",
    screen: TokenWattTopUpScreen,
    params: {
      hideHeader: true,
    },
  },
  TokenWattBusdTopUp: {
    name: "TokenWattBusdTopUp",
    screen: TokenWattBusdTopUpScreen,
    params: {
      hideHeader: true,
    },
  },
  TokenWattTransactions: {
    name: "TokenWattTransactions",
    screen: TokenWattTransactionsScreen,
    params: {
      hideHeader: true,
    },
  },
  TokenWattInformation: {
    name: "TokenWattInformation",
    screen: TokenWattInformationScreen,
    params: {
      hideHeader: true,
    },
  },
  TokenWattTransactionsDetails: {
    name: "TokenWattTransactionsDetails",
    screen: TokenWattTransactionsDetailsScreen,
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
  WalletCoinSendConfirm: {
    name: "WalletCoinSendConfirm",
    screen: WalletCoinSendConfirmScreen,
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

export default TabAccountCabinet;
