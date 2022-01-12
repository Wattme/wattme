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
  CommonArrowBottom as CommonArrowBottomIcon
} from "../../../../../assets/icons";
import { Portal } from "react-native-portalize";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

class Categories extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      buttonPosition: {
        x: 0,
        y: 0,
      },

      isOpen: false
    };

    this.refContainer = React.createRef();
  }

  openDropDown = (event) => {
    const buttonPositionX = ((event.nativeEvent?.pageX || 0) - (event.nativeEvent?.locationX || 0));
    const buttonPositionY = ((event.nativeEvent?.pageY || 0) - (event.nativeEvent?.locationY || 0));

    this.setState({
      isOpen: !this.state.isOpen,

      buttonPosition: {
        x: buttonPositionX,
        y: buttonPositionY
      }
    })
  }

  selectCategory = (categoryValue) => {
    this.props?.onChange(categoryValue);
    this.setState({ isOpen: false });
  }

  _labelButton = () => {
    const { value } = this.props;

    if (!value) {
      return allTranslations(localization.browserHome.categories.allCategory)
    }

    if (Boolean(localization.browserHome.categories[value])) {
      return allTranslations(localization.browserHome.categories[value])
    }

    return value
  }

  render() {
    const { data } = this.props;
    const {
      isOpen,
      buttonPosition
    } = this.state;

    return null

    return (
      <>

        <View ref={this.refContainer} style={styles.root}>

          <TouchableOpacity
            style={styles.button}
            onPress={this.openDropDown}
          >
            <Text style={styles.buttonLabel}>
              { this._labelButton() }
            </Text>
            <View style={[
              styles.buttonIcon,
              {transform: [{ rotate: isOpen ? '180deg' : '0deg' }]}
            ]}>
              <CommonArrowBottomIcon/>
            </View>
          </TouchableOpacity>

          {Boolean(isOpen)&&(
            <Portal>
              <View style={[styles.dropDown, { top: buttonPosition.y }]}>
                {data.map((category, index) => (
                  <TouchableOpacity key={`Categories-item-${index}`} style={styles.category} onPress={() => this.selectCategory(category.value)}>
                    <Text style={styles.categoryLabel}>
                      { category.label }
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={styles.dropDownBackDrop} onPress={this.openDropDown}/>
            </Portal>
          )}

        </View>

      </>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    height: 24
  },
  buttonLabel: {
    fontSize: 18,
    lineHeight: 21,
    color: "#282828",
    marginRight: 8
  },
  buttonIcon: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center"
  },

  dropDown: {
    zIndex: 99999999,
    position: "absolute",
    backgroundColor: "white",
    alignSelf: "center",

    marginTop: 24 + 8,

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,
    overflow: "hidden",

    shadowColor: "rgba(172, 172, 172, 1)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2
  },
  dropDownBackDrop: {
    flex: 1,
    position: "absolute",
    zIndex: 5,
    left: -9999,
    top: -9999,
    right: -9999,
    bottom: -9999
  },

  category: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  categoryLabel: {
    fontSize: 18,
    lineHeight: 21,
    textAlign: "center",
    color: "#282828"
  },
})

export default Categories
