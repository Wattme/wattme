import React from "react";
import {
  createStackNavigator, TransitionPresets,
} from "@react-navigation/stack";
import {
  DashboardHome as DashboardHomeScreen,
  DashboardHomeSettings as DashboardHomeSettingsScreen,

  TradingConnection as TradingConnectionScreen,
  TradingAccount as TradingAccountScreen,

  SettingsHome as SettingsHomeScreen,
  SettingsProfileMe as SettingsProfileMeScreen,
  SettingsVersionApp as SettingsVersionAppScreen,
  SettingsSecurity as SettingsSecurityScreen,
  SettingsPushNotification as SettingsPushNotificationScreen,
  SettingsWalletConnect as SettingsWalletConnectScreen
} from "../../screens";
import { Platform } from "react-native";
import { KeyboardAvoidingView } from "react-native/index";

const Stack = createStackNavigator();

class TabDashboard extends React.Component {
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
  Dashboard: {
    name: "Dashboard",
    screen: DashboardHomeScreen,
    params: {
      hideHeader: true,
    },
  },
  DashboardHomeSettings: {
    name: "DashboardHomeSettings",
    screen: DashboardHomeSettingsScreen,
    params: {
      hideHeader: true,
    },
  },

  TradingConnection: {
    name: "TradingConnection",
    screen: TradingConnectionScreen,
    params: {
      hideHeader: true,
    },
  },
  TradingAccount: {
    name: "TradingAccount",
    screen: TradingAccountScreen,
    params: {
      hideHeader: true,
    },
  },

  SettingsHome: {
    name: "SettingsHome",
    screen: SettingsHomeScreen,
    params: {
      hideHeader: true,
    },
  },
  SettingsProfileMe: {
    name: "SettingsProfileMe",
    screen: SettingsProfileMeScreen,
    params: {
      hideHeader: true,
    },
  },
  SettingsVersionApp: {
    name: "SettingsVersionApp",
    screen: SettingsVersionAppScreen,
    params: {
      hideHeader: true,
    },
  },
  SettingsPushNotification: {
    name: "SettingsPushNotification",
    screen: SettingsPushNotificationScreen,
    params: {
      hideHeader: true,
    },
  },
  SettingsSecurity: {
    name: "SettingsSecurity",
    screen: SettingsSecurityScreen,
    params: {
      hideHeader: true,
    },
  },
  SettingsWalletConnect: {
    name: "SettingsWalletConnect",
    screen: SettingsWalletConnectScreen,
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

export default TabDashboard;
