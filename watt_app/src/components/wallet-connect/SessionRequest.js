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

class SessionRequest extends React.PureComponent {
	constructor(props) {
		super(props);
		
		this.state = {
			payload: {},
			
			appName: ""
		};
		
		this.innerRef = React.createRef();
	}
	
	open = (payload = {}) => {
		const appName = payload?.params?.[0]?.peerMeta?.name || "";
		
		this.setState({
			payload,
			appName
		});
		
		this.innerRef.current.open();
	}
	
	onConfirm = () => {
		this.innerRef.current.close();
		this.props.onConfirm(this.state.payload);
	}
	
	render() {
		const {
			appName,
		} = this.state;
		
		return (
			<Modalize
				innerRef={this.innerRef}
				onBackButtonPress={this.props.onClose}
				onOverlayPress={this.props.onClose}
			>
				<View style={styles.modalizeContainer}>
					
					<View style={styles.root}>
						<Text style={styles.title}>Подтверждение</Text>
						<Text style={styles.description}>{appName} хочет подключиться к вашему кошельку</Text>
						
						<View style={{alignItems: "center"}}>
							<View style={styles.options}>
								<Text style={styles.option}>•&nbsp;&nbsp;&nbsp;Просмотр баланса и активности кошелька</Text>
								<Text style={styles.option}>•&nbsp;&nbsp;&nbsp;Запрос на одобрения транзакций</Text>
							</View>
						</View>
					</View>
					
					<View style={{marginTop: 16}}/>
					
					<Button
						label="Подключиться"
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
		fontSize: 16,
		lineHeight: 23,
		color: '#8E8E8E',
		textAlign: "center",
		
		marginBottom: 24
	},
	
	options: {
		maxWidth: 300,
		marginHorizontal: "auto"
	},
	option: {
		fontSize: 14,
		lineHeight: 17,
		color: "#282828",
		marginBottom: 12
	}
	
});

export default SessionRequest