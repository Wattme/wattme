import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,

  FlatList,
  SafeAreaView,
} from "react-native/index";
import {
  Header,
  LoadSpinner
} from "../../../components";
import {
  HeaderAccept as HeaderAcceptIcon
} from "../../../assets/icons";
import {
  Search as SearchComponent,
  PairCard as PairCardComponent
} from "./components";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import agent from "../../../agent/agent";
import urls from "../../../constants/urls";

class TradingSelectPair extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listPair: [],
      initListPair: [],

      search: "",
      selectPair: "",

      isLoadList: true
    };
  }

  componentDidMount = async () => {
    await this.getListPair();
  };

  getListPair = async () => {

    const globalTradingSymbols = this.props.tradingSymbols || [];

    if (globalTradingSymbols.length > 0) {
      this.setState({
        listPair: globalTradingSymbols,
        initListPair: globalTradingSymbols,
        isLoadList: false
      })

      return null
    }

    const listPair = await agent.get(`${ urls.tradingSymbols }`).then((res) => {
      return res.data?.symbols || []
    }).catch((err) => {
      return []
    });

    this.props.setTradingSymbols(listPair);

    this.setState({
      listPair,
      initListPair: listPair,
      isLoadList: false
    })
  }
  onChangeSearch = ( search ) => {

    const listPair = (this.state.initListPair || [])
      .filter((t) => {
        const symbol = (t?.symbol || '').toLowerCase();
        const quoteAsset = (t?.quoteAsset || '').toLowerCase();
        const baseAsset = (t?.baseAsset || '').toLowerCase();
        const searchLow = (search || "").toLowerCase();

        if (!searchLow) {
          return true
        }

        return Boolean(
          symbol.indexOf(searchLow) > -1 ||
          quoteAsset.indexOf(searchLow) > -1 ||
          baseAsset.indexOf(searchLow) > -1
        )
      })

    this.setState({
      search,
      listPair
    });
  }

  selectPair = (pair) => {
    this.props.navigation.navigate("TradingSmartTradeCreate", {
      selectPair: pair
    })
  }

  _headerRenderRightContent = () => {
    return (
      <TouchableOpacity style={styles.buttonHeaderAccept}>
        <HeaderAcceptIcon/>
      </TouchableOpacity>
    )
  }
  _renderItemFlatList = (props) => {
    const { item, index } = props;
    const { wallet } = this.props;
    const walletItem = wallet?.find((wall) => wall.asset === item?.quoteAsset);

    return (
      <>

        <PairCardComponent
          { ...item }
          wallet={walletItem}

          onPress={this.selectPair}
        />

        <View style={styles.itemsSeparate}/>

      </>
    )
  }
  _renderListFooterComponent = () => {

    if (!this.state.isLoadList) {
      return null
    }

    return (
      <View style={styles.loadingContent}>
        <LoadSpinner color="white"/>
      </View>
    )
  }

  render() {
    const {
      search,
      listPair,
      isLoadList
    } = this.state;

    return (
      <>

        <Header
          title={allTranslations(localization.tradingSelectPair.headerTitle)}
          rightContent={this._headerRenderRightContent}
        />

        <View style={styles.root}>

          <SearchComponent
            search={search}
            disable={isLoadList}
            onChange={this.onChangeSearch}
          />

          <View style={styles.itemsContainer}>

            <SafeAreaView style={{flex: 1}}>
              <FlatList
                data={listPair}
                contentContainerStyle={{flexGrow: 1, paddingHorizontal: 28, paddingVertical: 16}}
                renderItem={this._renderItemFlatList}
                ListFooterComponent={this._renderListFooterComponent}
                ListFooterComponentStyle={{flex: 1}}
                showsVerticalScrollIndicator={false}

                keyExtractor={(item, index) => `${ item?.status }-${ item?.symbol }-${ index }`}
              />
            </SafeAreaView>

          </View>

        </View>

      </>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F2F2F6",

    paddingHorizontal: 12,
    paddingVertical: 16
  },
  buttonHeaderAccept: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center"
  },

  itemsContainer: {
    flex: 1,

    marginTop: 12,

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,

    backgroundColor: "white",

    overflow: "hidden"
  },
  itemsSeparate: {
    marginLeft: 44,
    height: 2,
    backgroundColor: "#F2F3F4",
    marginVertical: 7
  },

  loadingContent: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TradingSelectPair;
