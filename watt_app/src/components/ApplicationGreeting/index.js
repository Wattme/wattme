import React, { useState, useRef } from "react";
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
import { setItem } from "../../common/Storage";
import { compose } from "recompose";
import { connect } from "react-redux";
import { updateShowingApplicationGreeting } from "../../state/GlobalState";
import MultifunctionalCryptoWallet from "../../assets/icons/application-greeting/multifunctional-crypto-wallet.png";
import SmartTrading from "../../assets/icons/application-greeting/smart-trading.png";
import AutomatedTrading from "../../assets/icons/application-greeting/automated-trading.png";
import localization from "../../localization/localization";
import EStyleSheet from "react-native-extended-stylesheet";
import allTranslations from "../../localization/allTranslations";

const { width, height } = Dimensions.get("window");
const tabs = [
  {
    image: MultifunctionalCryptoWallet,
    label: localization.applicationGreeting.stage1.label,
    message: localization.applicationGreeting.stage1.message
  },
  // {
  //   image: SmartTrading,
  //   label: localization.applicationGreeting.stage2.label,
  //   message: localization.applicationGreeting.stage2.message
  // },
  // {
  //   image: AutomatedTrading,
  //   label: localization.applicationGreeting.stage3.label ,
  //   message: localization.applicationGreeting.stage3.message
  // }
];

const ApplicationGreeting = (props) => {
  const [stage, setStage] = useState(0);
  const refScrollView = useRef();

  const handleNext = async () => {
    let newStage = stage + 1;

    setStage(newStage);

    if (newStage === 1) {
      await startApp();

      return null
    }

    refScrollView.current.scrollTo({
      x: width * newStage,
      animated: true
    });
  }

  const startApp = async () => {
    await setItem('true', 'is-showing-application-greeting');
    props.updateShowingApplicationGreeting(false);
  }

  return (
    <View style={styles.root}>
      <ScrollView
        ref={refScrollView}

        style={styles.scrollView}
        contentContainerStyle={{alignItems: "center"}}

        scrollEventThrottle={2}

        horizontal={true}
        pagingEnabled={true}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {tabs.map((tab, idx) => (
          <SliderItem key={`slider-item-${idx}`} {...tab}/>
        ))}
      </ScrollView>

      <View style={styles.containerActions}>
        <View style={styles.pagination}>
          {tabs.map((tab, idx) => (
            <View key={`pagination-tab-${idx}`} style={[styles.paginationDot, Boolean(stage === idx) && styles.paginationDotActive]}/>
          ))}
        </View>

        <Button
          label={allTranslations(Boolean(stage === 0) ? localization.applicationGreeting.buttonStart : localization.applicationGreeting.buttonNext)}
          onPress={handleNext}
        />
      </View>
    </View>
  )
}
const SliderItem = (props) => {
  const { image, label, message } = props;

  return (
    <View style={styles.sliderItem}>

      <View style={styles.sliderItemImageContainer}>
        <Image
          style={styles.sliderItemImage}
          source={image}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.sliderItemName}>{ allTranslations(label) }</Text>

      <Text style={styles.sliderItemDescription}>{ allTranslations(message) }</Text>

    </View>
  )
}

const styles = EStyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white"
  },

  scrollView: {
    flexGrow: 1,
  },

  sliderItem: {
    width: width,
    paddingTop: ((height - 120) / 2) - 260,

    alignItems: "center",
  },
  sliderItemImageContainer: {
    width: (width - 120),
    height: (width - 120),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 42,

    '@media (min-width: 400)': {
      marginBottom: 65,
    }
  },
  sliderItemImage: {
    flex: 1
  },
  sliderItemName: {
    fontSize: 25,
    lineHeight: 32,
    textAlign: "center",
    fontWeight: "600",
    color: "#282828"
  },
  sliderItemDescription: {
    marginTop: 24,
    fontSize: 16,
    lineHeight: 23,
    textAlign: "center",
    color: "#8E8E8E"
  },

  containerActions: {
    paddingHorizontal: 12,
    paddingBottom: 40
  },
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    marginLeft: -6,
    marginBottom: 16
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#8E8E8E",

    marginLeft: 6
  },
  paginationDotActive: {
    backgroundColor: "#282828"
  }
});

export default compose(
  connect(
    state => ({
      global: state.globalState
    }),
    dispatch => ({
      updateShowingApplicationGreeting: (value) => dispatch(updateShowingApplicationGreeting(value))
    }),
  ),
)(ApplicationGreeting);
