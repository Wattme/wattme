import React from "react";
import {
  View,
  StyleSheet
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";

class StagesTransaction extends React.PureComponent {
  render() {
    return (
      <View style={styles.root}>

        <>
          <View style={styles.section}>
            <View style={styles.dotLine}/>
            <View style={styles.sectionLeft}>
              <View style={styles.dotItem}>
                <View style={styles.dotDot}/>
              </View>
            </View>
            <View style={styles.sectionBody}>
              <View style={styles.amountContainer}>
                <Text style={styles.amountLabel}>0.24460000</Text>
              </View>
              <View style={styles.sectionInformation}>
                <Text style={styles.title}>Шаг покупки</Text>
                <Text style={styles.status}>Завершен</Text>
              </View>
            </View>
          </View>
          <View style={styles.arrow}/>
        </>

        <>
          <View style={styles.section}>
            <View style={styles.dotLine}/>
            <View style={styles.sectionLeft}>
              <View style={styles.dotItem}>
                <View style={styles.dotDot}/>
              </View>
            </View>
            <View style={styles.sectionBody}>
              <View style={styles.amountContainer}>
                <Text style={styles.amountLabel}>0.24460000</Text>
              </View>
              <View style={styles.sectionInformation}>
                <Text style={styles.title}>Шаг покупки</Text>
                <Text style={styles.status}>Завершен</Text>
              </View>
            </View>
          </View>
          <View style={styles.arrow}/>
        </>

        <>
          <View style={styles.section}>
            <View style={styles.dotLine}/>
            <View style={styles.sectionLeft}>
              <View style={styles.dotItem}>
                <View style={[styles.dotDot, {backgroundColor: "#FFFFFF"}]}/>
              </View>
            </View>
            <View style={styles.sectionBody}>
              <View style={styles.amountContainer}>
                <Text style={styles.amountLabel}>0.24460000</Text>
              </View>
              <View style={styles.sectionInformation}>
                <Text style={styles.title}>Шаг покупки</Text>
                <Text style={styles.status}>Завершен</Text>
              </View>
            </View>
          </View>
          <View style={styles.arrow}/>
        </>

        <>
          <View style={styles.section}>
            <View style={styles.sectionLeft}>
              <View style={styles.dotItem}>
                <View style={[styles.dotDot, {backgroundColor: "#10B879"}]}/>
              </View>
            </View>
            <View style={styles.sectionBody}>
              <View style={styles.amountContainer}>
                <Text style={styles.amountLabel}>0.24460000</Text>
              </View>
              <View style={styles.sectionInformation}>
                <Text style={styles.title}>Шаг покупки</Text>
                <Text style={styles.status}>Завершен</Text>
              </View>
            </View>
          </View>
        </>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  root: {
    backgroundColor: "white",
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",

    padding: 16
  },

  arrow: {
    marginLeft: 36,
    height: 2,
    backgroundColor: "#F2F3F4",
    marginVertical: 15
  },

  section: {
    flexDirection: "row"
  },
  sectionLeft: {
    height: 20
  },
  sectionBody: {
    paddingLeft: 16,
    alignItems: "flex-start"
  },
  sectionInformation: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8
  },

  amountContainer: {
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 9,

    borderRadius: 14,
    backgroundColor: "#F7F7F7"
  },
  amountLabel: {
    fontSize: 14,
    lineHeight: 17,
    color: "#282828",
    fontWeight: "300"
  },

  title: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "500",
    color: "#282828"
  },
  status: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "300",
    color: "#8E8E8E",
    marginLeft: 6
  },

  dotItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  dotDot: {
    width: 20,
    height: 20,
    backgroundColor: "#F6D962",

    borderRadius: 999,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#282828"
  },
  dotLine: {
    position: "absolute",
    alignSelf: "center",
    width: 8,
    top: 1,
    left: 6,
    bottom: -34,
    backgroundColor: "#282828"
  },

});

export default StagesTransaction
