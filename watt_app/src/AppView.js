import React, {Component} from "react";
import {
	Text,
	Platform,
	AppState,
	TextInput,
	Dimensions,
	ScrollView
} from "react-native/index";
import {compose} from "recompose";
import {connect} from "react-redux";
import Navigation from "./navigation";
import axiosInstance from "./agent/agent";
import {clearAll, getItem, setItem} from "./common/Storage";
import {
	SafeAreaProvider,
} from "react-native-safe-area-context";
import {
	updateFiat,
	updateFiats,
	updateWallet,
	updateAccount,
	updatePassCode,
	updateLanguage,
	updateCurrencies,
	updateWalletsList,
	updateUserCurrencies,
	updateMoonPaySettings,
	updateWalletsListName,
	updateSettingsTouchId,
	updateWalletImportInfo,
	updateWalletConnectHistory,
	updateShowingApplicationGreeting,
} from "./state/GlobalState";
import {
	setDateEndQualification,
} from "./state/QualificationState";
import {
	setKeys as tradingSetKeys,
	setProfile as tradingSetProfile,
	setListKeys as tradingSetListKeys,
} from "./state/BinanceState";
import {
	setProfile as wiseWinSetProfile,
} from "./state/WiseWinState";
import urls from "./constants/urls";
import WS from "react-native-websocket";
import "./theme/theme-manager";
import {
	ModalApplicationLock,
	FlashMessage as FlashMessageComponent,
	LoadingApp as LoadingAppComponent,
	NetInfo as NetInfoComponent,
} from "./components";
import axios from "axios";
import {Host} from "react-native-portalize";
import {getLanguage} from "./helpers/language";
import {LocaleConfig} from "react-native-calendars";
import {updateCurrencyInfo} from "./state/WalletConnectHomeState";
import {getBalanceMain, getBalanceTokens} from "./sheduler/balance";
import KeyboardAvoidingView from "./components/KeyboardAvoidingView";
import agent from "./agent/agent";
import coinCup from "./agent/coincup";
import settings from "./constants/settings";
import agentWiseWin from "./agent/agentWiseWin";
import FlashMessage from "react-native-flash-message";
import EStyleSheet from "react-native-extended-stylesheet";
import BackgroundTimer from "react-native-background-timer";
import getHeightStatusBar from "./helpers/getHeightStatusBar";
import {View} from "react-native-ui-lib";

const heightWindow = Dimensions.get("screen")?.height;
const heightStatusBar = getHeightStatusBar();

class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			verificationCode: "",
			
			isLoading: true,
			isLockApp: false,
			isBackground: false,
		};
		
		this.appState = React.createRef(AppState.currentState);
		
		this.timeOutStartBlockApp = null;
	}
	
	componentDidMount = async () => {
		// await clearAll()
		
		AppState.addEventListener("change", this.checkAppState);
		
		// Загрузка основной части (приложение не будет запущенно, пока все эти функция не выполнятся)
		await this.setDefaultOptionsComponent();
		await this.checkIsFistStartApp();
		await this.onSetFiat();
		await this.onSetAuth();
		await this.initialTrading();
		await this.onSetLanguage();
		await this.onSetWallets();
		await this.onSetPassCode();
		await this.onSetUserCurrencies();
		await this.onSetWalletsList();
		await this.onSetSettingsTouchId();
		await this.onSetWalletsImportInformation();
		await this.onUpdateWalletConnectHistory();
		await this.setLocales();
		await this.initQualificationState();
		await this.onUpdateBalance();
		
		// Запуск приложения
		this.setState({isLoading: false});
		
		// Дополнительный функции (запускаются и работают когда приложение уже активно)
		await this.onSetMoonPaySettings();
		await this.initWalletConnect();
		await this.onUpdateBalanceCustomTokens();
	};
	componentWillUnmount = async () => {
		AppState.removeEventListener("change", this.checkAppState);
	};
	
	
	// Устоновка дефолтных значений для глабольных компонентов
	setDefaultOptionsComponent = () => {
		
		// Запретить замурование текста
		if (Text.defaultProps == null) Text.defaultProps = {};
		Text.defaultProps.allowFontScaling = false;
		
		// Запретить зумирование инпута
		if (TextInput.defaultProps == null) TextInput.defaultProps = {};
		TextInput.defaultProps.allowFontScaling = false;
		
		// Устоновка дефолтных значений для скролла
		if (ScrollView.defaultProps == null) ScrollView.defaultProps = {};
		ScrollView.defaultProps.keyboardShouldPersistTaps = "handled";
		
	};
	
	// Проверка на первый запуск приложения
	checkIsFistStartApp = async () => {
		const bool = await getItem("is-showing-application-greeting");
		
		this.props.updateShowingApplicationGreeting(!Boolean(bool));
	};
	
	// Получение пользовательского пароля из хранилища
	onSetPassCode = async () => {
		const passCode = await getItem("pass-code");
		this.props.updatePassCode(passCode);
		
		if (Boolean(passCode) && passCode !== null && passCode !== "") {
			this.setState({isLockApp: true});
		}
	};
	
	// Получение разрешения на импользование биометрического входа
	onSetSettingsTouchId = async () => {
		const settingsTouchId = await getItem("settings-touch-id");
		
		if (!settingsTouchId) {
			return null;
		}
		
		this.props.updateSettingsTouchId(JSON.parse(settingsTouchId));
	};
	
	// Получение пользователя
	onSetAuth = async () => {
		const token = await getItem("jwt");
		if (!token) {
			return null;
		}
		
		axiosInstance.defaults.headers["x-auth-token"] = token;
		const account = await axiosInstance.get(urls.userMe).then((response) => {
			return response.data;
		}).catch((error) => {
			return null;
		});
		
		if (!account) {
			return null;
		}
		
		this.props.updateAccount(account?.user || {});
		
		await this.getAccountWiseWin();
	};
	
	// Устоновка активного языка пользователья из хранилища
	onSetLanguage = async () => {
		const storeLanguage = await getItem("language");
		const language = getLanguage(storeLanguage);
		
		if (!language) {
			return null;
		}
		
		axiosInstance.defaults.headers["x-language"] = language;
		
		this.props.updateLanguage(language);
	};
	
	// Устоновка списка кошельков пользователья
	onSetWallets = async () => {
		let wallet = await getItem("wallet");
		wallet = JSON.parse(wallet || "{}");
		
		this.props.updateWallet(wallet);
	};
	
	// Устоновка списка валюты (Рубли, Доллары и тд)
	onSetUserCurrencies = async () => {
		let userCurrencies = await getItem("user-currencies");
		
		if (!userCurrencies) {
			userCurrencies = "[\"USD\", \"RUB\"]";
		}
		
		this.props.updateUserCurrencies(JSON.parse(userCurrencies));
	};
	
	// Устоновка всех кошельков пользователя из хранилища
	onSetWalletsList = async () => {
		
		let walletsName = await getItem("wallets-list-name");
		let walletsList = await getItem("wallets-list");
		walletsList = JSON.parse(walletsList || "{}");
		
		this.props.updateWalletsList(walletsList);
		
		if (!!walletsName) {
			this.props.updateWalletsListName(walletsName);
		}
	};
	
	//
	onSetFiat = async () => {
		const fiat = await getItem("select-fiat");
		
		if (Boolean(fiat)) {
			this.props.updateFiat(fiat);
		}
	};
	
	// Функционал обновления баланса пользовательского кошелька (основные валюты)
	onUpdateBalance = async () => {
		const wallet = await getBalanceMain();
		await this.props.updateWallet(wallet);
	};
	
	// Функционал обновления баланса пользовательского кошелька (дополнительные валюты)
	onUpdateBalanceCustomTokens = async () => {
		const initWallet = this.props.wallet;
		const walletBalanceCustom = await getBalanceTokens(initWallet);
		await this.props.updateWallet(walletBalanceCustom);
	};
	
	// Event WWS крипто курсов (ETH, BTC)
	onUpdateCurrencies = (items) => {
		items = items.map((t, idx) => {
			return {
				...t,
				number: idx + 1,
			};
		});
		
		this.props.updateCurrencies(items);
	};
	
	// Event WWS курсов (рубли. доллары)
	onUpdateFiats = (items) => {
		this.props.updateFiats(items);
	};
	onUpdateWalletConnectHistory = async () => {
		
		let walletConnectHistory = await getItem("wallet-connect-history");
		walletConnectHistory = JSON.parse(walletConnectHistory || "[]");
		
		this.props.updateWalletConnectHistory(walletConnectHistory);
		
	};
	
	// Получение глобальный настроек MoonPay
	onSetMoonPaySettings = async () => {
		// const moonpaySettings = await axiosInstance.get(urls.moonpaySettings).then((res) => {
		//   return res.data;
		// }).catch(err => {
		//   return [];
		// });
		const moonPaySettings = {
			apiKey: "pk_test_n3Y9wjclWLm2hQ5drOxL2hexs2cObvQB\n",
		};
		
		this.props.updateMoonPaySettings(moonPaySettings);
	};
	
	// Функционал блокировки приложения (если пользователь закрыл/свернул приложение)
	checkAppState = async (nextAppState) => {
		const {isBackground} = this.state;
		const passCode = await getItem("pass-code");
		
		BackgroundTimer.stopBackgroundTimer();
		
		if (nextAppState === "background") {
			BackgroundTimer.runBackgroundTimer(() => {
				this.setState({isBackground: true});
			}, settings.timeOutLockApp * 1000);
			
			return null;
		}
		if (isBackground && nextAppState === "active" && Boolean(passCode)) {
			this.setState({isLockApp: true, isBackground: false});
		}
	};
	
	// Инициализация аккаунта trading
	initialTrading = async () => {
		const account = await agent.get(`${urls.tradingAccount}`).then((res) => {
			return res.data;
		}).catch((err) => {
			return {error: err?.response};
		});
		if (account.error) {
			return null;
		}
		
		const keys = await agent.get("/trading/keys").then((res) => {
			return res.data?.keys || [];
		}).catch(() => {
			return [];
		});
		
		this.props.tradingSetProfile({
			...account,
		});
		this.props.tradingSetListKeys(keys);
	};
	
	// Инициализация аккаунта Wise Win
	getAccountWiseWin = async () => {
		
		const account = this.props.account || {};
		
		if (!account?.wisewinId) {
			return null;
		}
		
		const wiseWinAccount = await agentWiseWin.get(`/auth/user-info?id=${account?.wisewinId}`).then((res) => {
			return res.data;
		}).catch((err) => {
			return {};
		});
		
		this.props.wiseWinSetProfile(wiseWinAccount);
	};
	
	onSetWalletsImportInformation = async () => {
		const data = await coinCup.get("/app/configuration-wallet-import").then((res) => {
			return res.data;
		}).catch(() => {
			return {};
		});
		
		this.props.updateWalletImportInfo(data);
	};
	
	initWalletConnect = async () => {
		const list = await axios.get(`https://coincap.wise.win/app/currency-info?language=ru`).then((res) => {
			return res.data;
		}).catch((err) => {
			return [];
		});
		
		this.props.walletConnectUpdateCurrencyInfo(list);
	};
	
	setLocales = async () => {
		LocaleConfig.locales["ru-RU"] = {
			monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
			monthNamesShort: ["Янв", "Фев", "Март", "Апр", "Май", "Июнь", "Июнь", "Авг", "Сен", "Окт", "Ноя", "Дек"],
			dayNames: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
			dayNamesShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Птн", "Сб"],
			today: "Сегодня",
		};
		LocaleConfig.defaultLocale = "ru-RU";
	};
	
	initQualificationState = async () => {
		this.props.setDateEndQualification(1638270326000);
	};
	
	onLockApp = () => {
		this.setState({isLockApp: false});
	};
	
	
	// Рендер вспомогательных компонентов
	_renderModalApplicationLock = () => {
		const {
			isLockApp
		} = this.state;
		
		if (!isLockApp) {
			return null
		}
		
		return (
			<ModalApplicationLock
				open={this}
				hidePortal={true}
				onNext={this.onLockApp}
			/>
		)
	}
	_renderNetInfoComponent = () => {
		return (
			<NetInfoComponent/>
		)
	}
	_renderPvseudoNavigation = () => {
		
		return (
      <View style={{height: 80, backgroundColor: "#F2F2F6"}}/>
		)
	}
	
	render() {
		const {isLoading} = this.state;
		const {account} = this.props;
		
		if (isLoading) {
			return (
				<LoadingAppComponent/>
			);
		}
		
		return (
			<>
				
				<>
					<Host>
						<KeyboardAvoidingView
							style={{flex: 1}}
							behavior={Platform.OS == "ios" ? "height" : "height"}
						>
							<SafeAreaProvider>
								
								{/* Рендер информационного сообщения об отсутствие интернета */}
								{this._renderNetInfoComponent()}
								
								{/* Ренден навигации приложения */}
								<Navigation/>
							
							
							</SafeAreaProvider>
						</KeyboardAvoidingView>
						
						{this._renderPvseudoNavigation()}
					</Host>
				</>
				
				
				{/* Рендер бодального окна блокировки */}
				{this._renderModalApplicationLock()}
				
				
				<WS
					url={urls.prodWS}
					onMessage={(event) => {
						const messages = JSON.parse(event.data);
						
						if (messages?.event === "current_currencies") {
							this.onUpdateCurrencies(messages.data || []);
						}
						if (messages?.event === "current_fiats") {
							this.onUpdateFiats(messages.data || []);
						}
					}}
					reconnect
				/>
				
				<FlashMessage
					position="top"
					MessageComponent={FlashMessageComponent}
					hideOnPress={true}
				/>
			
			</>
		);
	}
	
}

EStyleSheet.build({});

export default compose(
	connect(
		state => ({
			account: state.globalState.account,
			wallet: state.globalState?.wallet || {},
		}),
		dispatch => ({
			updateFiat: (fiat) => dispatch(updateFiat(fiat)),
			updateFiats: (fiats) => dispatch(updateFiats(fiats)),
			updateWallet: (wallet) => dispatch(updateWallet(wallet)),
			updateAccount: (account) => dispatch(updateAccount(account)),
			updatePassCode: (passCode) => dispatch(updatePassCode(passCode)),
			updateLanguage: (language) => dispatch(updateLanguage(language)),
			updateCurrencies: (currencies) => dispatch(updateCurrencies(currencies)),
			updateWalletsList: (walletsList) => dispatch(updateWalletsList(walletsList)),
			updateUserCurrencies: (userCurrencies) => dispatch(updateUserCurrencies(userCurrencies)),
			updateWalletsListName: (walletsName) => dispatch(updateWalletsListName(walletsName)),
			updateSettingsTouchId: (settingsTouchId) => dispatch(updateSettingsTouchId(settingsTouchId)),
			updateMoonPaySettings: (moonPaySettings) => dispatch(updateMoonPaySettings(moonPaySettings)),
			updateWalletImportInfo: (walletImportInfo) => dispatch(updateWalletImportInfo(walletImportInfo)),
			updateWalletConnectHistory: (walletConnectHistory) => dispatch(updateWalletConnectHistory(walletConnectHistory)),
			updateShowingApplicationGreeting: (value) => dispatch(updateShowingApplicationGreeting(value)),
			
			tradingSetKeys: (keys) => dispatch(tradingSetKeys(keys)),
			tradingSetProfile: (keys) => dispatch(tradingSetProfile(keys)),
			tradingSetListKeys: (listKeys) => dispatch(tradingSetListKeys(listKeys)),
			
			walletConnectUpdateCurrencyInfo: (list) => dispatch(updateCurrencyInfo(list)),
			
			setDateEndQualification: (date) => dispatch(setDateEndQualification(date)),
			
			wiseWinSetProfile: (profile) => dispatch(wiseWinSetProfile(profile)),
		}),
	),
)(App);
