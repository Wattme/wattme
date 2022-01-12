import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  useNavigation
} from '@react-navigation/native';
import {
  HeaderArrowLeft as HeaderArrowLeftIcon
} from "../../assets/icons/header";
import getHeightStatusBar from "../../helpers/getHeightStatusBar";

const heightStatusBar = getHeightStatusBar();

class Header extends React.PureComponent {

  _routeGoBack = () => {
    this.props.navigation.goBack();
  }

  _renderRightContent = () => {
    if (!this.props.rightContent) {
      return null
    }

    return this.props.rightContent()
  }
  _renderLeftContent = () => {

    if (this.props.leftContent) {
      return (
        <TouchableOpacity style={styles.buttonBack} onPress={this._routeGoBack}>
          { this.props.leftContent() }
        </TouchableOpacity>
      )
    }

    return (
      <TouchableOpacity style={styles.buttonBack} onPress={this._routeGoBack}>
        <HeaderArrowLeftIcon/>
      </TouchableOpacity>
    )
  }

  render() {
    const {
      title,
      hideLeft,

      styleRoot,
      styleRightContent
    } = this.props;

    return (
      <View style={[styles.root, styleRoot || {}]}>

        <View style={styles.leftContent}>
          {!Boolean(hideLeft) && (
            <>
              { this._renderLeftContent() }
            </>
          )}
        </View>

        <Text style={styles.title}>{title}</Text>

        <View style={[styles.rightContent, styleRightContent]}>
          {this._renderRightContent()}
        </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  root: {
    paddingTop: heightStatusBar + 16,
    paddingBottom: 16,
    paddingHorizontal: 34,

    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white"
  },

  title: {
    flex: 1,
    fontSize: 20,
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: '500'
  },

  buttonBack: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center"
  },

  leftContent: {
    width: 32,
    height: 32
  },
  rightContent: {
    width: 32,
    height: 32
  },
});

export default function (props) {
  const navigation = useNavigation();

  return <Header {...props} navigation={navigation}/>
}
