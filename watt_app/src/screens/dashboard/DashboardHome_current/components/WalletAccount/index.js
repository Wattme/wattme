import React from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native/index";
import {
  Text,
  Button
} from "react-native-ui-lib";
import {
  CommonArrowRight as CommonArrowRightIcon,
} from "../../../../../assets/icons";
import Icon from "react-native-vector-icons/FontAwesome5";
import { convertorNumber } from "../../../../../helpers/convertor";
import { fiatConverter, fiatSymbol } from "../../../../../common/FiatsConverter";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

const { width } = Dimensions.get("window");
const sizeCard = (width - 24);

class WalletAccount extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fiat: (props?.userCurrencies || [])?.[0] || "",
    };
  }

  onScrollEndDrag = ({ nativeEvent }) => {
    const sliderWidth = sizeCard;
    const contentOffsetX = nativeEvent?.contentOffset?.x || 0;
    const activeDot = Math.floor(contentOffsetX / sliderWidth);
    const fiat = (this.props?.userCurrencies || [])?.[activeDot];

    if (this.state.fiat === fiat) {
      return null;
    }

    this.setState({ fiat });
  };

  _totalBalanceWallet = (fiat = this.state.fiat) => {
    const { wallet, currencies } = this.props;

    const balanceUsd = (wallet?.list || [])
      .map((coin) => {
        const indivisibleBalance = Number.parseFloat(coin?.indivisibleBalance || "0");
        const currencyBalance = Number.parseFloat((currencies || []).find((t) => t.code === coin.code)?.price_usd || "0");

        return indivisibleBalance * currencyBalance;
      })
      .reduce((value, item) => {
        return value + item;
      }, 0);
    const fiatBalance = fiatConverter(balanceUsd, fiat);

    return `${fiatSymbol(fiat)} ${convertorNumber(fiatBalance, 2, ".")}`;
  };
  _totalProfit = (fiat = this.state.fiat) => {
    const { wallet, currencies } = this.props;
    const profitUsd = (wallet?.list || [])
      .map((coin) => {
        const currency = (currencies || []).find((t) => t.code === coin.code);
        const currencyUsd = Number.parseFloat(currency?.price_usd || "0");
        const coinAmountUsd = Number.parseFloat(coin?.indivisibleBalance || "0") * Number.parseFloat(currency?.price_usd || "0");
        const percentChange24Hours = Number.parseFloat(currency?.change_percent_24hr || 0);

        return (coinAmountUsd / 100) * percentChange24Hours;
      })
      .reduce((value, item) => {
        return value + item;
      }, 0);

    const profitFiat = convertorNumber(fiatConverter(profitUsd, fiat), 2, ".");

    return {
      totalProfit: Number.parseFloat(profitFiat),
      totalProfitMessage: `${Math.abs(profitFiat)} ${fiatSymbol(fiat)} ${allTranslations(localization.walletInformationCard.profitDay)}`,
    };
  };

  render() {
    const {
      wallet,
      userCurrencies,

      openInformationCreatWallet
    } = this.props;
    const { totalProfit } = this._totalProfit();
    const profitIcon = Boolean(totalProfit !== 0) ? Boolean(totalProfit < 0) ? "caret-down" : "caret-up" : "";
    const profitColor = Boolean(totalProfit !== 0) ? Boolean(totalProfit < 0) ? "#F5386A" : "#10B879" : "#8E8E8E";
    const walletImage = Boolean(wallet?.image) ? { uri: wallet?.image } : require("../../../../../assets/png/wallet/wallet-image-pug-white.png");
    const totalBalance = this._totalBalanceWallet();

    if (Boolean(Object.keys(wallet || {}).length <= 0)) {
      return (
        <NotWallet
          openInformationCreatWallet={openInformationCreatWallet}
        />
      )
    }

    return (
      <View style={styles.card}>

        <View style={styles.cardHead}>

          <View style={styles.cardWalletAvatar}>
            <Image
              source={walletImage}
              style={{ flex: 1, borderRadius: 999, width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </View>

          <View style={styles.cardWalletName}>
            <Text style={styles.cardWalletNameLabel}>
              {wallet.label}
            </Text>
          </View>

          <View style={styles.cardHeadArrow}>
            <CommonArrowRightIcon color="#282828" />
          </View>

        </View>

        <View style={styles.cardBody}>
          <ScrollView
            style={styles.cardSlider}
            scrollEventThrottle={160}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}

            onMomentumScrollEnd={this.onScrollEndDrag}
          >

            {(userCurrencies || []).map((fiat, index) => {
              return (
                <View key={`WalletAccount-userCurrencies-${index}`} style={{width: sizeCard}}>
                  <View>

                    <Text style={styles.cardWalletBalance}>
                      {this._totalBalanceWallet(fiat)}
                    </Text>

                    <View style={styles.containerProfit}>
                      {Boolean(profitIcon) && (
                        <View style={styles.profitArrow}>
                          <Icon
                            name={profitIcon}
                            color={profitColor}
                          />
                        </View>
                      )}
                      <Text style={[styles.profitTitle, { color: profitColor }]}>
                        {this._totalProfit(fiat)?.totalProfitMessage}
                      </Text>
                    </View>

                  </View>
                </View>
              );
            })}

          </ScrollView>
        </View>

        <View style={styles.pagination}>
          {(userCurrencies || []).map((item, index) => (
            <View
              key={`WalletAccount-userCurrencies-pagination-dot-${index}`}
              style={[
                styles.dot,
                Boolean(item === this.state.fiat) && styles.dotActive,
              ]}
            />
          ))}
        </View>

      </View>
    );
  }
}
const NotWallet = (props) => {
  const {
    openInformationCreatWallet
  } = props;

  return (
    <View style={[styles.card, {padding: 16}]}>

      <Text style={styles.cardTitle}>
        { allTranslations(localization.dashboardHome.walletAccount.title) }
      </Text>

      <View style={styles.cardSeparate}/>

      <Button
        label={allTranslations(localization.dashboardHome.walletAccount.buttonConnect)}
        style={{borderRadius: 14}}
        size="xsSmall"

        onPress={openInformationCreatWallet}
      />

    </View>
  )
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "white",
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",

    paddingVertical: 16,
  },

  cardTitle: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "500",
    color: "#000000"
  },
  cardSeparate: {
    marginVertical: 11,
    width: "100%",
    height: 2,
    backgroundColor: "#F9F9F9"
  },

  cardHead: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16
  },
  cardBody: {
    marginTop: 24,
  },

  cardWalletAvatar: {
    width: 56,
    height: 56,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#FFFFFF",
  },
  cardWalletName: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 12,
  },
  cardWalletNameLabel: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: "500",
    color: "#000000",
  },
  cardHeadArrow: {
    width: 24,
    height: 44,

    alignItems: "center",
    justifyContent: "center",
  },

  cardWalletBalance: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
  },

  containerProfit: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    height: 20,
  },
  profitArrow: {
    width: 12,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  profitTitle: {
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 4,
  },

  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    marginTop: 16,
    height: 8,
    marginLeft: -8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#8E8E8E",

    marginLeft: 8,
  },
  dotActive: {
    backgroundColor: "#000000",
  },

  cardSlider: {
    width: sizeCard
  },

});

export default WalletAccount;
