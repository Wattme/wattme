import { StyleSheet, Dimensions, Platform } from 'react-native';
import { getFontFamily } from "../../theme/theme-manager/Text";
const { height, width } = Dimensions.get('window');

module.exports = StyleSheet.create({
	container: {
		marginTop: 20,
		marginLeft: 30,
		marginRight: 30,
		alignItems: 'flex-start',
	},
	row: {
		flexDirection: 'row'
	},
	number: {
		fontSize: 25,
    lineHeight: 30,
    fontFamily: getFontFamily("600"),
		textAlign: 'center',
	},
	backspace: {
    flex: 1,
    justifyContent: 'center',
	},
	cell: {
		flex: 1,
		justifyContent: 'center',
	},
});
