import React from "react";
import {
  View,
  StyleSheet, TouchableOpacity,
} from "react-native/index";
import {
  Text,
} from "react-native-ui-lib";
import {
  Tabs,
} from "../../../../../components";
import {
  CommonPlus as CommonPlusIcon,
  FilterSortArrow as FilterSortArrowIcon,
  FilterFilter as FilterFilterIcon,
} from "../../../../../assets/icons";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

class Controls extends React.PureComponent {
  render() {
    const {
      activeTab,
      changeTab,

      sort,
      changeSort,

      routePageFilter,
      routePageCreateSmartTrade
    } = this.props;

    return (
      <View style={styles.root}>

        <View style={styles.head}>
          <Tabs
            value={activeTab}
            items={[
              { value: "smart-trade", label: allTranslations(localization.tradingDashboard.tabs.smartTrade) },
              { value: "bots", label: allTranslations(localization.tradingDashboard.tabs.bots) },
            ]}

            onChange={changeTab}
          />
        </View>

        <View style={styles.separate} />

        <TabSmartTrade
          sort={sort}
          changeSort={changeSort}

          routePageFilter={routePageFilter}
          routePageCreateSmartTrade={routePageCreateSmartTrade}
        />

      </View>
    );
  }
}

const TabSmartTrade = (props) => {
  const {
    sort,
    changeSort,

    routePageFilter,
    routePageCreateSmartTrade
  } = props;

  const handleChangeSort = () => {
    const value = Boolean(sort === "-date") ? "date" : "-date";
    changeSort(value);
  }

  return (
    <>

      <View style={styles.transactionsRow}>
        <Text style={styles.transactionsTitle}>
          {allTranslations(localization.tradingDashboard.tabSmartTrade.title)}
        </Text>
        <TouchableOpacity onPress={routePageCreateSmartTrade} activeOpacity={0.6}>
          <View style={styles.transactionsButton}>
            <CommonPlusIcon color="#282828" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.filterRow}>

        <TouchableOpacity
          onPress={handleChangeSort}
          style={styles.sortButton}
        >
          <Text style={styles.sortButtonLabel}>
            {allTranslations(localization.tradingDashboard.sorting.date)}
          </Text>
          <View style={{
            transform: [ {rotate: Boolean(sort === "-date") ? "0deg" : "180deg"} ]
          }}>
            <FilterSortArrowIcon />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, {marginLeft: "auto"}]}
          onPress={routePageFilter}
        >
          <FilterFilterIcon />
        </TouchableOpacity>

      </View>

    </>
  );
};
const TabBots = () => {
};

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,
    padding: 16,
    backgroundColor: "white",
  },

  head: {},
  separate: {
    height: 2,
    backgroundColor: "#F9F9F9",
    marginVertical: 15,
  },

  transactionsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  transactionsTitle: {
    fontSize: 16,
    lineHeight: 19,
    color: "black",
    flex: 1,
  },
  transactionsButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,

    backgroundColor: "white",
    elevation: 3,
    shadowColor: "rgba(172, 172, 172, 1)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },

  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },

  sortButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortButtonLabel: {
    fontSize: 13,
    lineHeight: 16,
    color: "#282828",
    fontWeight: "300",
    marginRight: 5,
  },

  filterButton: {
    width: 32,
    height: 32,
  },
});

export default Controls;
