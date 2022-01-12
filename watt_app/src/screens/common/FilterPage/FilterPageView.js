import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  Header
} from "../../../components";
import {
  HeaderAccept as HeaderAcceptIcon,
  CommonAccept as CommonAcceptIcon
} from "../../../assets/icons";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";

class FilterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterParams: [ ...props?.route?.params?.filterParams || [] ],

      filter: { ...props?.route?.params?.initFilter || {} }
    };

    this.backPath = props?.route?.params?.backPath || ""
  }

  componentDidMount = () => {};

  changeFilter = (name, value) => {
    let filter = {...this.state.filter};
    filter[name] = value;

    this.setState({
      filter
    })
  }

  _routeGoBack = () => {
    this.props.navigation.navigate(this.backPath, {
      filter: this.state.filter
    })
  }
  _renderHeaderRightContent = () => {
    return (
      <TouchableOpacity style={styles.headerButton} activeOpacity={0.6} onPress={this._routeGoBack}>
        <HeaderAcceptIcon/>
      </TouchableOpacity>
    )
  }

  render() {
    const {
      filter,
      filterParams
    } = this.state;

    return (
      <View style={styles.root}>

        <Header title={allTranslations(allTranslations(localization.filterPage.headerTitle))} hideLeft rightContent={this._renderHeaderRightContent}/>

        <ScrollView style={{flexGrow: 1}}>

          {filterParams.map((section, index) => (
            <View key={`FilterPage-section-${index}`} style={styles.section}>

              <Text style={styles.sectionLabel}>
                { section.label }
              </Text>

              <View style={styles.sectionItems}>
                {(section?.items || []).map(( item, index ) => (
                  <TouchableOpacity
                    key={`FilterPage-section-${index}-${index}`}
                    style={styles.sectionItem}
                    onPress={() => this.changeFilter(section.name, item.value)}
                    activeOpacity={0.6}
                  >
                    <Text style={styles.sectionItemLabel}>{ item.label }</Text>

                    {Boolean(filter[section.name] === item.value) && (
                      <View style={styles.sectionItemIcon}>
                        <CommonAcceptIcon size={20} color="#8E8E8E"/>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>

            </View>
          ))}

        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F2F2F6"
  },

  headerButton: {
    width: 32,
    height: 32
  },

  section: {
    marginTop: 16
  },
  sectionLabel: {
    paddingHorizontal: 24,
    marginBottom: 16,
    height: 20,

    fontSize: 16,
    lineHeight: 19,
    color: "#8E8E8E"
  },
  sectionItems: {
    backgroundColor: "white",
    paddingVertical: 8
  },
  sectionItem: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  sectionItemLabel: {
    height: 20,
    flex: 1,

    fontSize: 16,
    lineHeight: 19,
    color: "#282828"
  },
  sectionItemIcon: {
    width: 20,
    height: 20
  },
});

export default FilterPage;
