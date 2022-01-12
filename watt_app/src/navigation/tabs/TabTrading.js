import React from "react";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import {
  TradingDashboard as TradingDashboardScreen,
  TradingTradeInfo as TradingTradeInfoScreen,

  FilterPage as FilterPageScreen,
  TradingSmartTradeCreate as TradingSmartTradeCreateScreen,

  TradingSelectPair as TradingSelectPairScreen,
} from "../../screens";

const Stack = createStackNavigator();

class TabTrading extends React.Component {
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
  TradingDashboard: {
    name: "TradingDashboard",
    screen: TradingDashboardScreen,
    params: {
      hideHeader: true,
    },
  },
  TradingTradeInfo: {
    name: "TradingTradeInfo",
    screen: TradingTradeInfoScreen,
    params: {
      hideHeader: true,
    },
  },
  TradingSmartTradeCreate: {
    name: "TradingSmartTradeCreate",
    screen: TradingSmartTradeCreateScreen,
    params: {
      hideHeader: true,
    },
  },
  TradingSelectPair: {
    name: "TradingSelectPair",
    screen: TradingSelectPairScreen,
    params: {
      hideHeader: true,
    },
  },

  FilterPage: {
    name: "FilterPage",
    screen: FilterPageScreen,
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

export default TabTrading;
