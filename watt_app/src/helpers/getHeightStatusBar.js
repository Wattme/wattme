import {
    Platform,
    StatusBar
} from 'react-native/index';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const getHeightStatusBar = () => {
    const isIOS = Platform.OS === 'ios';

    if ( isIOS ) {
        return getStatusBarHeight()
    }

    return StatusBar.currentHeight
}

export default getHeightStatusBar
