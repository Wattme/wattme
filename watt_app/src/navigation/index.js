import React from "react";
import {
  View,
  Linking,
  StatusBar,
} from "react-native/index";
import {
  NavigationContainer,
} from "@react-navigation/native";
import {
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  NavigationMenu as NavigationMenuComponent,
} from "./components";
import {
  ApplicationGreeting,
} from "../components";
import { compose } from "recompose";
import { connect } from "react-redux";
import { Host } from "react-native-portalize";

import TabDashboard from "./tabs/TabDashboard";
import TabWallet from "./tabs/TabWallet";
import TabBrowser from "./tabs/TabBrowser";
import TabTrading from "./tabs/TabTrading";

import TabAccountAuth from "./tabs/TabAccountAuth";
import TabAccountCabinet from "./tabs/TabAccountCabinet";

const Tab = createBottomTabNavigator();

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLightStatusBar: false,
    };

    this.refNavigationContainer = React.createRef();
  }

  componentDidMount = async () => {
    await this.pppDeepLinkHandling();
    Linking.addEventListener("url", this.pppDeepLinkHandling);
  };

  navigationContainer = (props) => {
    this.updateStatusBar(props);
  };

  updateStatusBar = ({ history }) => {
    const lastHistoryItem = history[history.length - 1] || {};
    const routePath = (lastHistoryItem?.key || "").split("-")[0];

    const isLightStatusBar = Boolean(lightStatusBarScreens.includes(routePath));

    if (this.state.isLightStatusBar === isLightStatusBar) {
      return null;
    }

    this.setState({ isLightStatusBar });
  };

  // Обработка глубой ссылки приложения
  pppDeepLinkHandling = async (data) => {

    const initialUrl = await Linking.getInitialURL();
    const schemeUrl = data?.url || initialUrl;

    // Если приложение запущенно по прямому входу, отменяем функцию
    if (!schemeUrl) {
      return null;
    }

    // Проверка на URL от Wallet Connect
    const isWc = Boolean(schemeUrl.substr(0, 3) === "wc:");
    if (isWc) {
      this.refNavigationContainer.current.navigate("Browser", {
        screen: "BrowserApp",
        params: {
          schemeUrl: schemeUrl,
        },
      });
    }

  };


  render() {
    const { isLightStatusBar } = this.state;
    const isShowingApplicationGreeting = Boolean(this.props.isShowingApplicationGreeting || false);
    const isAuth = Boolean(Object.keys(this.props?.account || {}).length > 0);

    if (isShowingApplicationGreeting) {
      return (
        <>
          <StatusBar
            barStyle={isLightStatusBar ? "light-content" : "dark-content"}
            backgroundColor={"rgba(255, 255, 255, 0)"}
            translucent={true}
          />

          <ApplicationGreeting />
        </>
      );
    }

    return (
      <>

        <StatusBar
          barStyle={isLightStatusBar ? "light-content" : "dark-content"}
          backgroundColor={"rgba(255, 255, 255, 0)"}
          translucent={true}
        />

        <NavigationContainer
          ref={this.refNavigationContainer}
          onStateChange={this.navigationContainer}
        >

          <Tab.Navigator
            tabBar={(props) => <NavigationMenuComponent {...props} />}
          >

            <Tab.Screen
              name="Dashboard"
              component={TabDashboard}
            />

            <Tab.Screen
              name="Wallet"
              component={TabWallet}
            />

            <Tab.Screen
              name="Browser"
              component={TabBrowser}
            />

            <Tab.Screen
              name="Trading"
              component={TabTrading}
            />

            <Tab.Screen
              name="Account"
              component={isAuth ? TabAccountCabinet : TabAccountAuth}
            />

          </Tab.Navigator>

        </NavigationContainer>

      </>
    );
  }
}

const lightStatusBarScreens = [];

export default compose(
  connect(
    state => ({
      account: state.globalState?.account,
      isShowingApplicationGreeting: state.globalState?.isShowingApplicationGreeting,
    }),
  ),
)(Navigation);
