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

class CallRequest extends React.PureComponent {
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
		
		console.log("payloadpayloadpayload: ", payload);
		console.log("message: ", message);
		
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
	
	render() {
		const {
			message
		} = this.state;
		
		return (
			<Modalize
				innerRef={this.innerRef}
				onBackButtonPress={this.props.onClose}
				onOverlayPress={this.props.onClose}
			>
				<View style={styles.modalizeContainer}>
					
					<View style={styles.root}>
						<Text style={styles.title}>Подписать</Text>
						<Text style={styles.description}>
							{message}
						</Text>
					</View>
					
					<View style={{marginTop: 16}}/>
					
					<Button
						label="Подписать"
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

export default CallRequest