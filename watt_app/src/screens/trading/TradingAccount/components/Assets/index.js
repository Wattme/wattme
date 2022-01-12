import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  VirtualizedList,
  TouchableOpacity
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import {
  CommonGlass as CommonGlassIcon,
  CommonGlassOff as CommonGlassOffIcon
} from "../../../../../assets/icons";
import { FlatList } from 'react-native-gesture-handler';
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import { CoinSymbolCard } from "../../../../../components";

class Assets extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      balancesList: [],

      showSmallAssets: false
    };
  }

  componentDidMount = () => {
    this.setBalancesList();
  }

  setBalancesList = () => {
    let balancesList = [...(this.props?.balances || [])];

    if (!this.state.showSmallAssets) {
      balancesList = balancesList.filter((t) => Boolean(Number.parseFloat(t.free) > 0 || Number.parseFloat(t.locked) > 0));
    }

    this.setState({
      balancesList
    })
  }

  changeShowSmallAssets = async () => {
    await this.setState({
      showSmallAssets: !this.state.showSmallAssets
    });

    this.setBalancesList();
  }


  _renderItemCoin = (props) => {
    const { item: coin, index } = props;
    const { currencies } = this.props;

    const wallet = {
      name: coin.asset,
      code: coin.asset,
      indivisibleBalance: coin.free
    };
    const currency = (currencies || []).find((t) => t.code === wallet.code);
    const isLast = Boolean(index === ((this.state.balancesList || []).length - 1))

    return (
      <View>

        <CoinSymbolCard
          wallet={wallet}
          currency={currency}
        />

        {Boolean(!isLast)&&(
          <View style={styles.coinSeparate}/>
        )}

      </View>
    )
  }
  _keyExtractorCoin = (props, index) => {
    return `TradingAccount-Assets-coin-${ props.asset }-${ index }`
  }

  render() {
    const {
      showSmallAssets,
      balancesList
    } = this.state;
    const {
      balances
    } = this.props;

    const ButtonIcon = Boolean(showSmallAssets) ? CommonGlassOffIcon : CommonGlassIcon;
    const ButtonLabel = allTranslations(localization.tradingAccount.assets[Boolean(showSmallAssets) ? 'hideSmallAssets' : 'showSmallAssets']);

    return (
      <View style={styles.card}>

        <TouchableOpacity
          style={styles.buttonShowAssets}
          onPress={this.changeShowSmallAssets}
        >
          <ButtonIcon/>
          <Text style={styles.buttonShowAssetsLabel}>{ ButtonLabel }</Text>
        </TouchableOpacity>

        <View style={[styles.coins, {flex: 1}]}>

          <FlatList
            nestedScrollEnabled
            data={balancesList}
            renderItem={this._renderItemCoin}
            keyExtractor={this._keyExtractorCoin}
          />

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,
    padding: 16,

    backgroundColor: "#FFFFFF",
  },

  buttonShowAssets: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F7F7F7",
    borderRadius: 14,
    height: 36
  },
  buttonShowAssetsIcon: {},
  buttonShowAssetsLabel: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828",
    marginLeft: 12
  },

  coins: {
    marginTop: 16
  },
  coinSeparate: {
    height: 2,
    marginVertical: 0,
    backgroundColor: "#F9F9F9",
    marginLeft: 56
  },
});

export default Assets
