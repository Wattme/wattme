import React, {PureComponent} from "react";
import {
	View,
	Platform,
	Dimensions,
	StyleSheet
} from "react-native/index";
import {
	useSafeAreaInsets
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
import NavigationButton from "./NavigationButton";

const {
	height
} = Dimensions.get("window");

const NavigationMenu = (props) => {
	const {
		state,
		navigation
	} = props;
	const insets = useSafeAreaInsets();
  
	const onRoute = (route, isFocused) => {
		const event = navigation.emit({
			type: "tabPress",
			target: route.key,
			canPreventDefault: true,
		});
		
		if (!isFocused && !event.defaultPrevented) {
			navigation.navigate(route.name);
		}
	};
	const _getTitle = (name) => {
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
	const _getIcon = (name) => {
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
  
  const _rootTopPosition = () => {
    const isIos = Boolean(Platform.OS === "ios");
    
    if ( isIos ) {
      return height - 95;
    }
    
    return height - 80 + (insets?.top || 0)
  }
  const _rootPaddingBottom = () => {
    const isIos = Boolean(Platform.OS === "ios");
    
    if (isIos) {
      return (insets?.top || 15)
    }
    
    return 15
  }
	
	return (
		<View>
			<Portal>
				<View
					style={[
						styles.root,
						{
							top: _rootTopPosition(),
              paddingBottom: _rootPaddingBottom()
						}
					]}
				>
					{
						state.routes.map((route, index) => (
							<NavigationButton
								key={`tab-navigation-${index}`}
								
								title={_getTitle(route.name)}
								icon={_getIcon(route.name)}
								isFocused={Boolean(state.index === index)}
								
								onPress={() => onRoute(route, Boolean(state.index === index))}
							/>
						))
					}
				</View>
			</Portal>
		</View>
	);
}

const spacingItems = 0;
const styles = StyleSheet.create({
	root: {
		borderTopWidth: 1,
		borderColor: "#C8CCD5",
		borderStyle: "solid",
		
		paddingTop: 15,
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "white",
		marginLeft: -spacingItems
	}
});

export default NavigationMenu;
