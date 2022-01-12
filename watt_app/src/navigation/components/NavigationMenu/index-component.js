import React, {PureComponent} from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native/index";
import {
  View,
  Text,
} from "react-native-ui-lib";
import {
  SafeAreaInsetsContext,
} from "react-native-safe-area-context";
import {
  Portal
} from "react-native-portalize";
import {
  NavigationDashboard as NavigationDashboardIcon,
  NavigationSettings as NavigationSettingsIcon,
  NavigationBrowser as NavigationBrowserIcon,
  NavigationTrading as NavigationTradingIcon,
  NavigationWallet as NavigationWalletIcon,
} from "../../../assets/icons";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import getHeightStatusBar from "../../../helpers/getHeightStatusBar";
import NavigationButton from "./NavigationButton";

const heightStatusBar = getHeightStatusBar();
const {
  height
} = Dimensions.get("window");

class NavigationMenu extends PureComponent {
  onRoute = (route, isFocused) => {
    const event = this.props.navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      this.props.navigation.navigate(route.name);
    }
  };

  _getTitle = (name) => {
    switch (name) {
      case "Dashboard": {
        return allTranslations(localization.navigation.dashboard);
      }
      case "Wallet": {
        return allTranslations(localization.navigation.wallet);
      }
      case "Browser": {
        return allTranslations(localization.navigation.browser);
      }
      case "Trading": {
        return allTranslations(localization.navigation.trading);
      }
      case "Account": {
        return allTranslations(localization.navigation.account);
      }
    }
  };
  _getIcon = (name) => {
    switch (name) {
      case "Dashboard": {
        return NavigationDashboardIcon;
      }
      case "Wallet": {
        return NavigationWalletIcon;
      }
      case "Browser": {
        return NavigationBrowserIcon;
      }
      case "Trading": {
        return NavigationTradingIcon;
      }
      case "Account": {
        return NavigationSettingsIcon;
      }
    }
  };

  render() {
    const {state} = this.props;

    return (
      <SafeAreaInsetsContext.Consumer>
        {(insets) => {
          const sizeTopBottom = (insets?.top || 0) + (insets?.bottom || 0);

          console.log('sizeTopBottom: ', sizeTopBottom);

          return (
            <Portal>
              <View style={[styles.root, {
                top: height - sizeTopBottom
              }]}>
                {
                  state.routes.map((route, index) => (
                    <NavigationButton
                      key={`tab-navigation-${index}`}

                      title={this._getTitle(route.name)}
                      icon={this._getIcon(route.name)}
                      isFocused={Boolean(state.index === index)}

                      onPress={() => this.onRoute(route, Boolean(state.index === index))}
                    />
                  ))
                }
              </View>
            </Portal>
          );
        }}
      </SafeAreaInsetsContext.Consumer>
    );
  }
}

const spacingItems = 0;
const styles = StyleSheet.create({
  root: {
    borderTopWidth: 1,
    borderColor: "#C8CCD5",
    borderStyle: "solid",

    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginLeft: -spacingItems
  },

  button: {
    flex: 1,
    marginLeft: spacingItems,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonIcon: {
    justifyContent: "center",
    alignItems: "center",

    width: 30,
    height: 30,

    marginBottom: 4,
  },
  buttonLabel: {
    fontSize: 13,
    lineHeight: 16,
    textAlign: "center",
    color: "#8E8E8E",
  },

  psevdoFooter: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "red",
  },
});

export default NavigationMenu;
