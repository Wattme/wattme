import React, { Component } from "react";
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  ScrollView,
  Dimensions,
  SafeAreaView
} from "react-native/index";
import {
  CommonSearch as CommonSearchIcon
} from "../../../assets/icons";
import {
  DappApp as DappAppComponent,
  Networks as NetworksComponent,
  Categories as CategoriesComponent,
  PopUpWarningDapp as PopUpWarningDappComponent
} from "./components";
import {
  ModalNetworks
} from "../../../components";
import NetInfo from "@react-native-community/netinfo";
import allTranslations from "../../../localization/allTranslations";
import localization from "../../../localization/localization";
import getHeightStatusBar from "../../../helpers/getHeightStatusBar";
import axios from "axios";
import { getItem, setItem } from "../../../common/Storage";

const {width} = Dimensions.get("window");
const heightStatusBar = getHeightStatusBar();

class BrowserHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      networks: [],
      categories: [],
      modalNetworks: [],

      activeNetwork: "",
      activeCategory: "",

      isRefreshUpdate: false,
    };

    this.refModalNetworks = React.createRef();
    this.refPopUpWarningDappComponent = React.createRef();
  }

  componentDidMount = async () => {

    const isConnected = await NetInfo.fetch().then((res) => {
      return res.isConnected
    }).catch(() => {
      return false
    })

    if (!isConnected) {
      let walletConnectCachingDapps = await getItem("wallet-connect-caching-dapps");
      if (!!walletConnectCachingDapps) {
        walletConnectCachingDapps = JSON.parse(walletConnectCachingDapps);
        await this.props.updateCurrencyInfo(walletConnectCachingDapps);
      }
    }


    await this.onLoadCurrencyInfo();
  };
  componentDidUpdate = async (prevProps) => {
    const prevList = prevProps.walletConnectHome?.currencyInfo || [];
    const currentList = this.props.walletConnectHome?.currencyInfo || [];

    if (prevList.length !== currentList.length) {
      await this.onLoadCurrencyInfo();
    }
  }

  onLoadCurrencyInfo = async () => {
    let list = this.props.walletConnectHome?.currencyInfo || [];

    await setItem(JSON.stringify(list), "wallet-connect-caching-dapps")

    const networks = [
      {
        value: "",
        label: "ALL",
      },
    ];
    const categories = [
      {
        value: "",
        label: allTranslations(localization.browserHome.categories.allCategory)
      },
      {
        value: "favorites",
        label: allTranslations(localization.browserHome.categories.favorites)
      },
    ];

    list.map((site) => {
      (site?.networks || []).map((network) => {
        if (!Boolean(networks.find((t) => t.value === network))) {
          networks.push({
            value: network,
            label: network,
          });
        }
      });
      (site?.categories || []).map((category) => {
        if (!Boolean(categories.find((t) => t.value === category))) {
          categories.push({
            value: category,
            label: category,
            networks: site?.networks || []
          });
        }
      });
    });

    this.setState({
      networks,
      categories,
      isLoading: false,
    });
  }

  openBrowser = (url, networks = [], isConfirm) => {
    const { network } = this.state;

    // Если у выбранной валюты поддержка большее чем 1 сети
    // вызываем модальное окно выбора предварительный сети
    // и если не выбрано сеть в шапке
    if (!network && networks.length > 1) {
      let modalNetworks = networks.map((network) => {
        if (network === "BSC") {
          return {code: "BNB", name: "Binance"}
        }
        if (network === "ETH") {
          return {code: "ETH", name: "Ethereum"}
        }
        if (network === "Polygon") {
          return {code: "POLYGON", name: "Polygon"}
        }
      });

      this.setState({modalNetworks, modalNetworksUrl: url});

      this.refModalNetworks.current?.open();

      return null
    }

    this.refModalNetworks.current?.close();

    let networkDapp = network || networks[0];
    if (networkDapp === "BSC") {
      networkDapp = "BNB";
    }


    if (!isConfirm) {
      this.refPopUpWarningDappComponent.current.open({
        onSuccess: this.openBrowser.bind(this, url, networks, true)
      });

      return null
    }

    this.props.navigation.navigate("BrowserApp", {
      webViewUri: url,
      network: networkDapp,
    });
  };

  _getDappsApp = () => {
    const { currencyInfo, favorites } = this.props.walletConnectHome;
    let { search, activeNetwork, activeCategory } = this.state;

    // Отбор приложение по популярности и тд
    let dappsList = currencyInfo.filter((site) => {
      const isSearch = Boolean(search) ? Boolean((site?.name || "").indexOf(search) > -1 || (site?.description || "").indexOf(search) > -1) : true;
      const isNetwork = Boolean(activeNetwork) ? (site?.networks || []).includes(activeNetwork) : true;

      let isCategory = Boolean(activeCategory) ? (site?.categories || []).includes(activeCategory) : true;
      if (activeCategory === "favorites" && !isCategory) {
        isCategory = Boolean((favorites || []).find((t) => t.uri === site?.url));
      }

      return Boolean(isSearch && isNetwork && isCategory);
    });
    // все приложение которые поподает в выбоку по поиску

    let dappsListPopular = dappsList.filter((t) => t.isPopular);
    // все приложение с пометкой "isPopular" (задается в файле на бекенде)

    let dappsListOther = dappsList.filter((t) => !t.isPopular);
    // остальные приложение которые не попали ввыборку (выборку из бека по определенным параметрам)

    // регулирование порядка список
    return [
      ...dappsListPopular,
      ...dappsListOther
    ]
  };
  _FlatListItem = (props) => {
    return (
      <FlatListItem {...props} onPress={this.openBrowser}/>
    )
  }


  render() {
    const {
      networks,
      categories,

      search,
      activeNetwork,
      activeCategory,

      modalNetworks,
      modalNetworksUrl
    } = this.state;

    return (
      <View style={styles.root}>

        <View style={styles.searchContainer}>
          <TextInput
            value={search}
            style={styles.searchContainerInput}
            placeholder={allTranslations(localization.browserHome.searchPlaceholder)}
            placeholderTextColor="#8E8E8E"

            onChangeText={(search) => this.setState({ search })}
          />
          <CommonSearchIcon fill="#8E8E8E"/>
        </View>

        <View style={styles.networksContainer}>
          <NetworksComponent
            data={networks}
            value={activeNetwork}

            onChange={(activeNetwork) => this.setState({ activeNetwork })}
          />
        </View>

        <SafeAreaView style={styles.dappsContainer}>
          <FlatList
            data={this._getDappsApp() || []}

            ListHeaderComponent={() => (
              <ListHeaderComponent
                categories={categories}
                activeCategory={activeCategory}
                onChange={(activeCategory) => this.setState({activeCategory})}
              />
            )}
            renderItem={this._FlatListItem}
            numColumns={4}
            keyExtractor={(item) => `BrowserHome-dapp-${item.name}`}

            columnWrapperStyle={{marginLeft: -8}}
            contentContainerStyle={{paddingVertical: 16}}

            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>

        <ModalNetworks
          innerRef={this.refModalNetworks}
          networks={modalNetworks}
          onChange={(value) => this.openBrowser(modalNetworksUrl, [value])}
        />



        <PopUpWarningDappComponent
          ref={this.refPopUpWarningDappComponent}
        />

      </View>
    );
  }
}
const FlatListItem = (props) => {
  const {
    item,
    onPress
  } = props;

  return (
    <View style={{ width: ((width - 48) / 4) }}>
      <DappAppComponent
        app={item}
        onPress={onPress}
      />
    </View>
  )
}
const ListHeaderComponent = (props) => {
  return (
    <View style={{marginBottom: 16}}>
      <CategoriesComponent
        data={props.categories}
        value={props.activeCategory}

        onChange={props.onChange}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F2F2F6",

    paddingHorizontal: 12,
    paddingTop: heightStatusBar + 20
  },
  scrollView: {
    paddingTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 12,
  },

  searchContainer: {
    backgroundColor: "white",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 11,
    height: 40,
  },
  searchContainerInput: {
    flex: 1,
    fontSize: 14,
    lineHeight: 17,
    paddingHorizontal: 16,
    paddingVertical: 0
  },

  networksContainer: {
    marginTop: 20,
    marginBottom: 10,
    marginLeft: -36,
    marginRight: -12
  },
  network: {
    width: 40,
    height: 40,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 24
  },
  networkImage: {
    width: 24,
    height: 24
  },

  dappsContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    marginBottom: 12,

    paddingHorizontal: 12,
  },
});

export default BrowserHome;
