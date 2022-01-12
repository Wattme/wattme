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

class DropDownSort extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: false,

      dropDownTop: 0,
      widthButtonSort: 0,
    };
  }

  openDropDown = (event) => {
    const dropDownTop = ((event.nativeEvent?.pageY || 0) - (event.nativeEvent?.locationY || 0));

    this.setState({
      dropDownTop,
      open: true
    })
  }

  render() {
    const {
      open,

      dropDownTop,
      widthButtonSort
    } = this.state;

    return (
      <>

        <TouchableOpacity
          style={styles.buttonSort}
          activeOpacity={0.8}
          onPress={this.openDropDown}
          onLayout={({ nativeEvent }) => this.setState({ widthButtonSort: nativeEvent?.layout?.width })}
        >
          <Text style={styles.buttonSortLabel}>
            { allTranslations(localization.accountStatistics.sort.allTime) }
          </Text>
          <View style={styles.buttonSortIcon}>
            <CommonArrowBottomIcon
              color="#8E8E8E"
              size={16}
            />
          </View>
        </TouchableOpacity>

        {Boolean(open)&&(
          <Portal>
            <View style={[styles.dropDown, { top: dropDownTop, width: widthButtonSort }]}>
              <TouchableOpacity style={styles.dropDownItem}>
                <Text style={styles.dropDownItemLabel}>
                  { allTranslations(localization.accountStatistics.sort.allTime) }
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropDownItem}>
                <Text style={styles.dropDownItemLabel}>
                  { allTranslations(localization.accountStatistics.sort.month) }
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropDownItem}>
                <Text style={styles.dropDownItemLabel}>
                  { allTranslations(localization.accountStatistics.sort.year) }
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.dropDownBackDrop} activeOpacity={1} onPress={() => this.setState({ open: false })}/>
          </Portal>
        )}

      </>
    );
  }
}

const styles = StyleSheet.create({

  buttonSort: {
    flexDirection: "row",
    alignItems: "center",
    height: 24,
    paddingHorizontal: 10,
    backgroundColor: "#F7F7F7",
    borderRadius: 8
  },
  buttonSortLabel: {
    fontSize: 14,
    lineHeight: 20,
    color: "#282828"
  },
  buttonSortIcon: {
    height: 24,
    width: 24,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8
  },


  dropDown: {
    position: "absolute",
    right: 28,
    zIndex: 10,

    backgroundColor: "white",
    borderRadius: 8,
    marginTop: 32,


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
    flex: 1
  },
  dropDownItem: {
    height: 24,
    paddingHorizontal: 10,
    justifyContent: "center"
  },
  dropDownItemLabel: {
    fontSize: 14,
    lineHeight: 17,
    color: "#282828"
  },

});

export default DropDownSort
