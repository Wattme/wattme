import React from "react";
import {
	View,
	StyleSheet
} from "react-native/index";
import {
	Text,
	Button
} from "react-native-ui-lib";
import Modalize from "../Modalize";
import allTranslations from "../../localization/allTranslations";
import localization from "../../localization/localization";
import ethConvert from "ether-converter";
import {ethers} from "ethers";

class CallRequestSendTransaction extends React.PureComponent {
	constructor(props) {
		super(props);
		
		this.state = {
			payload: {},
			
			message: ""
		};
		
		this.innerRef = React.createRef();
	}
	
	open = (payload = {}) => {
		const message = JSON.stringify(payload?.params?.[1] || {});
		
		this.setState({
			payload,
			message
		});
		
		this.innerRef.current.open();
	}
	
	onConfirm = () => {
		this.innerRef.current.close();
		this.props.onConfirm(this.state.payload, true);
	}
	
	
	_formatAddress = (address) => {
		if (!address) {
			return "-"
		}
		
		return `${address.substring(0, 6)}...${address.substring(address.length - 6, address.length)}`
	}
	_amount = (initAmount) => {
		if (!initAmount) {
			return 0
		}
		
		return ethers.utils.formatEther(initAmount);
	}
	_commission = (info = {}) => {
		if (Object.keys(info).length <= 0) {
			return 0
		}
		
		const gasPrice = ethConvert(ethers.utils.formatEther(info?.gasPrice), "ether", "wei");
		const gasUsed = ethers.utils.formatEther(info?.gas)
		const networkFee = ethConvert(ethConvert((gasUsed * gasPrice), "gwei", "ether"), "ether", "gwei");
		
		return networkFee
	}
	
	render() {
		const {
			message,
			payload
		} = this.state;
		const params = payload?.params?.[0] || {};
		
		
		return (
			<Modalize
				innerRef={this.innerRef}
				onBackButtonPress={this.props.onClose}
				onOverlayPress={this.props.onClose}
			>
				<View style={styles.modalizeContainer}>
					
					<View style={styles.root}>
						<Text style={styles.title}>Подверждение</Text>
						
						<View style={styles.grids}>
							<View style={styles.gridRow}>
								<Text style={styles.gridLeft}>Откого</Text>
								<Text style={styles.gridRight}>{this._formatAddress(params.from)}</Text>
							</View>
							<View style={styles.gridSeparate}/>
							<View style={styles.gridRow}>
								<Text style={styles.gridLeft}>Кому</Text>
								<Text style={styles.gridRight}>{this._formatAddress(params.to)}</Text>
							</View>
							<View style={styles.gridSeparate}/>
							<View style={styles.gridRow}>
								<Text style={styles.gridLeft}>Сумма</Text>
								<Text style={styles.gridRight}>{this._amount(params.value)}</Text>
							</View>
							<View style={styles.gridSeparate}/>
							<View style={styles.gridRow}>
								<Text style={styles.gridLeft}>Комиссия</Text>
								<Text style={styles.gridRight}>{this._commission(params)}</Text>
							</View>
							<View style={styles.gridSeparate}/>
						</View>
					</View>
					
					<View style={{marginTop: 16}}/>
					
					<Button
						label="Отправить"
						onPress={this.onConfirm}
					/>
				
				</View>
			</Modalize>
		);
	}
	
}

const styles = StyleSheet.create({
	
	modalizeContainer: {
		paddingHorizontal: 12,
		paddingBottom: 20,
	},
	root: {
		paddingTop: 44,
		paddingHorizontal: 16,
		paddingBottom: 24,
		
		borderRadius: 14,
		backgroundColor: "#F7F7F7"
	},
	
	title: {
		fontSize: 25,
		lineHeight: 30,
		fontWeight: "500",
		textAlign: "center",
		color: "#282828",
		marginBottom: 24,
	},
	description: {
		fontSize: 12,
		lineHeight: 18,
		color: '#8E8E8E',
		
		marginBottom: 24
	},
	
	grids: {
		marginTop: 24
	},
	gridSeparate: {
		marginVertical: 12,
		height: 1,
		backgroundColor: "#F0F0F0"
	},
	gridRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	gridLeft: {
		flex: 1,
		fontSize: 16,
		lineHeight: 19,
		color: "#8E8E8E",
		paddingRight: 12
	},
	gridRight: {
		flex: 1,
		fontSize: 16,
		lineHeight: 19,
		color: "#282828",
		textAlign: "right"
	},
	
});

export default CallRequestSendTransaction