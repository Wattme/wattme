import React, {Component} from "react";
import {
	View,
	StyleSheet,
	ScrollView, Linking
} from "react-native/index";
import {
	Header,
	ModalCamera,
	ModalLoading,
	PopUpInformation,
	
	WalletConnectSessionRequest,
	WalletConnectCallRequest,
	WalletConnectCallRequestSendTransaction
} from "../../../components";
import {
	DappInformation as DappInformationComponent
} from "./components";
import WalletConnect from "@walletconnect/client";
import settings from "../../../constants/settings";
import chainIds from "../../../constants/chainIds";
import {walletConnectGetTx, walletConnectSignTypedData} from "../../../utils/walletconnect/WalletConnect";
import {getTransactionLinkBlockChain} from "../../wallet/WalletCoin/utils/transaction-block-chain";


class SettingsWalletConnect extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			walletConnector: null,
			walletDappInformation: {},
			wallet: {},
			
			successfullySigned: 0,
			
			isShowScanner: true,
			isShowModalLoading: false
		}
		
		this.refWalletConnectSessionRequest = React.createRef();
		this.refWalletConnectCallRequest = React.createRef();
		this.refWalletConnectCallRequestSendTransaction = React.createRef();
		this.refPopUpInformation = React.createRef();
	}
	
	componentDidMount = () => {
	}
	componentWillUnmount = async () => {
		
		if (!!this.state.walletConnector) {
			await this.killSessionWalletConnect();
		}
	}
	
	onScannedQrCode = async (data) => {
		const dataQrCode = data?.data || "";
		
		// Определение что QR код это Wallet Connect
		const isWc = Boolean(dataQrCode.split(":")?.[0] === "wc");
		if (!isWc) {
			this.refPopUpInformation.current.open({
				title: "Wallet Connect",
				message: "Не удается распознать QR код"
			});
			
			return null
		}
		
		// Закрываем окно сканера
		this.setState({
			isShowScanner: false
		});
		
		// Создаем сессию в Wallet Connect
		await this.createSessionWalletConnect(dataQrCode);
	}
	
	// Создание сессии Wallet Connect
	createSessionWalletConnect = async (schemeUrl) => {
		
		//
		const walletConnector = new WalletConnect({
			uri: schemeUrl,
			clientMeta: settings.walletConnectClientMeta
		});
		
		const session = await walletConnector.createSession();
		console.log('session: ', session);
		
		await this.setState({walletConnector});
		
		await this.subscribeSessionWalletConnect();
	}
	
	// Подписка на события Wallet Connect
	subscribeSessionWalletConnect = async () => {
		const connector = this.state.walletConnector;
		
		// Запрос на подтверждение сеана
		connector.on("session_request", (error, payload) => {
			this.refWalletConnectSessionRequest.current.open(payload);
		});
		
		// Успешное подключение к Wallet Connect
		connector.on("connect", (error, payload) => {
			this.connectSessionWalletConnect(payload);
		});
		
		// Запросы на одобрение транзакций / подписей и тд
		connector.on("call_request", (error, payload) => {
			const payloadMethod = payload?.method || "";
			
			
			// Подпись транзакции
			if ( payloadMethod === "eth_sendTransaction" ) {
				(async () => {
					await this.callRequestSendTransactionSessionWalletConnect(payload);
				})();
			}
			
			// Подпись сообщения
			if ( payloadMethod === "eth_signTypedData" ) {
				(async () => {
					await this.callRequestSignTypedDataSessionWalletConnect(payload);
				})();
			}
		});
		
		// Отключение сессии
		connector.on("disconnect", (error, payload) => {
			this._routeGoBack();
		});
	}
	
	// Подтверждение сессии Wallet Connect
	confirmSessionWalletConnect = (payload) => {
		
		// Получение информации о дапе
		const payloadChainId = payload?.params?.[0]?.chainId || null;
		
		// Поиск кода нужного кошелька (По CHAIN ID)
		const walletCode = (chainIds || []).find((t) => t.chainId === payloadChainId)?.code || null;
		if (!walletCode) {
			this.refPopUpInformation.current.open({
				title: "Wallet Connect",
				message: "Данная сеть не поддерживается"
			});
			
			return null
		}
		
		
		// Поиск кошелька по коду (с верху)
		const wallet = (this.props.wallet?.list || []).find((t) => t.code === walletCode) || null;
		if (!wallet || wallet?.disable) {
			this.refPopUpInformation.current.open({
				title: "Wallet Connect",
				message: "Кошелек не найден, импортируйте или включите."
			});
			
			return null
		}
		
		
		// Подтвержденне сессии
		const connector = this.state.walletConnector;
		connector.approveSession({
			accounts: [wallet?.address],
			chainId: payloadChainId
		});
		this.setState({
			wallet
		})
	}
	
	// Инициализация страницы после подтверждение соеденение сессии
	connectSessionWalletConnect = async (payload) => {
		const walletDappInformation = {
			...(payload?.params?.[0]?.peerMeta || {}),
			account: payload?.params?.[0]?.accounts?.[0] || ""
		};
		
		this.setState({
			walletDappInformation
		});
	}
	
	// Подписание транзакции
	callRequestSendTransactionSessionWalletConnect = async (payload, isSuccess) => {
		if (!isSuccess) {
			this.refWalletConnectCallRequestSendTransaction.current.open(payload);
			
			return null
		}
		
		this.setState({ isShowModalLoading: true });
		
		// Инициализация данных для подписание транзакции
		const wallet = this.state.wallet;
		const transaction = payload?.params?.[0] || {};
		const chainId = chainIds.find((t) => t.code === wallet?.code)?.chainId || null;
		const provider = chainIds.find((t) => t.code === wallet?.code)?.provider || null;
		
		// Подписание транзакции
		const connector = this.state.walletConnector;
		const responseTxTransaction = await walletConnectGetTx({
			transaction: transaction,
			signature: wallet?.mnemonic || "",
			signatureType: "mnemonic",
			chainId: chainId,
			provider: provider,
		});
		await connector.approveRequest({
			id: payload.id,
			result: responseTxTransaction.hash,
		});
		
		this.setState({ isShowModalLoading: false });
		
		if (!!responseTxTransaction.error) {
			this.refPopUpInformation.current.open({
				title: "Wallet Connect",
				message: "При подписании транзакции возникла ошибка, попробуйте позже."
			});
			
			return null
		}
		
		this.refPopUpInformation.current.open({
			title: "Wallet Connect",
			message: "Тразакция успешно подтверждена.",
			
			controls: "confirm",
			successButton: "Перейти",
			onConfirm: this._linkingOpenBlockChain.bind(this, responseTxTransaction.hash)
		});
		
		this.setState({
			successfullySigned: (this.state.successfullySigned || 0) + 1
		})
	}
	
	// Подписание сообщения
	callRequestSignTypedDataSessionWalletConnect = async (payload, isSuccess) => {
		if (!isSuccess) {
			this.refWalletConnectCallRequest.current.open(payload);
			
			return null
		}
		
		this.setState({ isShowModalLoading: true });
		
		const wallet = this.state.wallet;
		
		// Подпись сообщения
		const signature = await walletConnectSignTypedData({
			dataToSign: payload?.params[1] || {},
			signature: wallet?.mnemonic,
			signatureType: "mnemonic",
		});
		
		// Отправка подписи
		const connector = this.state.walletConnector;
		await connector.approveRequest({
			id: payload.id,
			result: signature,
		});
		
		this.setState({ isShowModalLoading: false });
	}
	
	// Отключение от сессии Wallet Connect
	killSessionWalletConnect = async () => {
		
		if (!this.state.walletConnector) {
			return null
		}
		
		await this.state.walletConnector.killSession();
		
		this._routeGoBack();
	}
	
	_routeGoBack = () => {
		this.props.navigation.navigate("SettingsHome");
	}
	_linkingOpenBlockChain = async (hash) => {
		const url = getTransactionLinkBlockChain({
			coinRank: this.state.wallet.rank,
			tx: hash
		});
		
		await Linking.openURL(url);
	}
	
	render() {
		const {
			walletDappInformation,
			
			successfullySigned,
			
			isShowScanner,
			isShowModalLoading
		} = this.state;
		
		return (
			<>
				<View style={styles.root}>
					
					<Header
						title="WalletConnect"
					/>
					
					<ScrollView contentContainerStyle={styles.scrollView}>
						
						<DappInformationComponent
							information={walletDappInformation}
							successfullySigned={successfullySigned}
						/>
					
					</ScrollView>
				</View>
				
				
				<WalletConnectSessionRequest
					ref={this.refWalletConnectSessionRequest}
					
					onConfirm={this.confirmSessionWalletConnect}
					onClose={this._routeGoBack}
				/>
				
				<WalletConnectCallRequest
					ref={this.refWalletConnectCallRequest}
					
					onConfirm={this.callRequestSignTypedDataSessionWalletConnect}
					onClose={this._routeGoBack}
				/>
				
				<WalletConnectCallRequestSendTransaction
					ref={this.refWalletConnectCallRequestSendTransaction}
					
					onConfirm={this.callRequestSendTransactionSessionWalletConnect}
					onClose={this._routeGoBack}
				/>
				
				{Boolean(isShowScanner) && (
					<ModalCamera
						open={true}
						
						onClose={this._routeGoBack}
						onBarCodeRead={this.onScannedQrCode}
					/>
				)}
				
				<ModalLoading
					open={isShowModalLoading}
				/>
				
				<PopUpInformation
					ref={this.refPopUpInformation}
				/>
			</>
		);
	}
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: "#F2F2F6"
	},
	
	scrollView: {
		paddingHorizontal: 12,
		paddingVertical: 16
	}
});

export default SettingsWalletConnect
