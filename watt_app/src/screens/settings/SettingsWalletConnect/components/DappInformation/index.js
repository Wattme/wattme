import React from "react";
import {
	View,
	Image,
	StyleSheet
} from "react-native/index";
import {
 Text
} from "react-native-ui-lib";
import {
	LoadSpinner
} from "../../../../../components";

const DappInformation = (props) => {
	const {
		information,
		successfullySigned
	} = props;
	const imageLink = information?.icons?.[0] || ""
	
	
	const _accountAddress = () => {
		const address = information?.account;
		
		if (!address) {
			return "-"
		}
		
		return `${address.substring(0, 6)}...${address.substring(address.length - 6, address.length)}`
	}
	
	
	if (Object.keys(information || {}).length <= 0) {
		return (
			<View style={styles.loaderContainer}>
				<LoadSpinner color="rgba(255,255,255,0)"/>
			</View>
		)
	}
	
	return (
		<View style={styles.root}>
			
			<View style={styles.imageContainer}>
				<Image
					source={{uri: imageLink}}
					style={styles.image}
					resizeMode="contain"
				/>
			</View>
			
			<Text style={styles.name}>
				{information?.name}
			</Text>
			
			<View style={styles.grids}>
				
				<View style={styles.gridRow}>
					<Text style={styles.gridLeft}>Подключен</Text>
					<Text style={styles.gridRight}>{ information?.url || "-" }</Text>
				</View>
				
				<View style={styles.gridSeparate}/>
				
				<View style={styles.gridRow}>
					<Text style={styles.gridLeft}>Адрес</Text>
					<Text style={styles.gridRight}>{ _accountAddress() }</Text>
				</View>
				
				<View style={styles.gridSeparate}/>
				
				<View style={styles.gridRow}>
					<Text style={styles.gridLeft}>Подписанные</Text>
					<Text style={styles.gridRight}>{successfullySigned}</Text>
				</View>
				
			</View>
			
		</View>
	)
}

const styles = StyleSheet.create({
	root: {
		backgroundColor: "white",
		
		borderRadius: 14,
		borderWidth: 1,
		borderColor: "#F0F0F0",
		borderStyle: "solid",
		padding: 16
	},
	
	imageContainer: {
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 12
	},
	image: {
		width: 64,
		height: 64
	},
	
	name: {
		fontSize: 20,
		lineHeight: 24,
		color: "#282828",
		fontWeight: "600",
		textAlign: "center"
	},
	
	grids: {
		marginTop: 24
	},
	gridSeparate: {
		marginVertical: 12,
		height: 1,
		backgroundColor: "#F9F9F9"
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
	
	loaderContainer: {
		paddingVertical: 40,
		justifyContent: "center",
		alignItems: "center",
		
		backgroundColor: "white",
		borderRadius: 14,
		borderWidth: 1,
		borderColor: "#F0F0F0",
		borderStyle: "solid"
	}
});

export default DappInformation