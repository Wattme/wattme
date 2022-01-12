import React from "react";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import {
  AccountLogin as AccountLoginScreen,

  AccountRegistration as AccountRegistrationScreen,
  AccountConfirmRegistration as AccountConfirmRegistrationScreen,

  AccountForgotPassword as AccountForgotPasswordScreen,
  AccountConfirmForgotPassword as AccountConfirmForgotPasswordScreen
} from "../../screens";
import {
  store,
} from "../../store/store";

const Stack = createStackNavigator();

class TabAccount extends React.Component {
  render() {
    const {globalState} = store.getState();

    const options = {
      ...optionsInit,
      gestureEnabled: true,
      ...TransitionPresets.SlideFromRightIOS,
    };

    return (
      <Stack.Navigator>
        {
          Object.keys(tabScreensAuth).map((key, idx) => {
            const screen = tabScreensAuth[key];
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

const tabScreensAuth = {
  AccountLogin: {
    name: "AccountLogin",
    screen: AccountLoginScreen,
    params: {
      hideHeader: true,
    },
  },

  AccountRegistration: {
    name: "AccountRegistration",
    screen: AccountRegistrationScreen,
    params: {
      hideHeader: true,
    },
  },
  AccountConfirmRegistration: {
    name: "AccountConfirmRegistration",
    screen: AccountConfirmRegistrationScreen,
    params: {
      hideHeader: true,
    },
  },

  AccountForgotPassword: {
    name: "AccountForgotPassword",
    screen: AccountForgotPasswordScreen,
    params: {
      hideHeader: true,
    },
  },
  AccountConfirmForgotPassword: {
    name: "AccountConfirmForgotPassword",
    screen: AccountConfirmForgotPasswordScreen,
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

export default TabAccount;
