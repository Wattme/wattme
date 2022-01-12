import React from "react";
import {
  createStackNavigator, TransitionPresets,
} from "@react-navigation/stack";
import {
  BrowserHome as BrowserHomeScreen,
  BrowserApp as BrowserAppScreen,
} from "../../screens";

const Stack = createStackNavigator();

class TabBrowser extends React.Component {
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
  BrowserHome: {
    name: "BrowserHome",
    screen: BrowserHomeScreen,
    params: {
      hideHeader: true,
    },
  },
  BrowserApp: {
    name: "BrowserApp",
    screen: BrowserAppScreen,
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

export default TabBrowser;
