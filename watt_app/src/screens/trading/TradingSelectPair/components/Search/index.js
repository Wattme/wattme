import React from "react";
import {
  View,
  TextInput,
  StyleSheet
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  CommonSearch as CommonSearchIcon
} from "../../../../../assets/icons";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

class Search extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
    };

    this.timeoutSearch = null;
  }

  onChangeSearch = (search) => {
    clearTimeout( this.timeoutSearch );

    this.setState({ search });

    this.timeoutSearch = setTimeout(() => {
      this.props.onChange(search);
    }, 500);
  }

  render() {
    const {
      search
    } = this.state;
    const {
      disable
    } = this.props;

    return (
      <View style={styles.root}>

        <View style={styles.icon}>
          <CommonSearchIcon fill="#8E8E8E"/>
        </View>

        <TextInput
          value={search}

          editable={!disable}
          style={styles.input}
          placeholderTextColor="#8E8E8E"
          placeholder={allTranslations(localization.tradingSelectPair.searchPlaceholder)}

          onChangeText={this.onChangeSearch}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,
    backgroundColor: "white",

    padding: 16,
    paddingVertical: 4,

    height: 40
  },

  icon: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",

    marginRight: 8
  },

  input: {
    fontSize: 14,
    color: "#282828",
    flex: 1,

    paddingHorizontal: 0,
    paddingVertical: 0
  },
})

export default Search
