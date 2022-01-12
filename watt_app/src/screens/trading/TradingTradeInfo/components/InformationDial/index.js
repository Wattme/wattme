import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native/index";
import {
  Text,
  Button,
} from "react-native-ui-lib";
import {
  ImportWalletEdit as ImportWalletEditIcon
} from "../../../../../assets/icons";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

class InformationDial extends React.PureComponent {
  render() {
    const {
      openPopUpMessage
    } = this.props;

    return (
      <View style={styles.root}>

        <View style={[styles.section, { marginTop: 0 }]}>
          <View>
            <Text
              style={styles.sectionTitle}>{allTranslations(localization.tradingTradeInfo.informationDial.units)} (AAVE)</Text>
            <Text style={styles.sectionValue}>45467.563</Text>
          </View>
          <View>
            <Text
              style={[styles.sectionTitle, { textAlign: "right" }]}>{allTranslations(localization.tradingTradeInfo.informationDial.purchase)} (BUSD)</Text>
            <Text style={[styles.sectionValue, { textAlign: "right" }]}>0.235</Text>
          </View>
        </View>

        <View style={[styles.section]}>
          <View>
            <Text
              style={styles.sectionTitle}>{allTranslations(localization.tradingTradeInfo.informationDial.createdBy)}</Text>
            <Text style={styles.sectionValue}>07.10.2021, 09:40</Text>
          </View>
          <View>
            <Text
              style={[styles.sectionTitle, { textAlign: "right" }]}>{allTranslations(localization.tradingTradeInfo.informationDial.total)} (BUSD)</Text>
            <Text style={[styles.sectionValue, { textAlign: "right" }]}>4578.232535</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.noteContainer} activeOpacity={0.6} onPress={openPopUpMessage}>
          <View style={styles.noteLeft}>
            <Text style={styles.noteText}>Примечание</Text>
          </View>

          <View style={styles.noteIcon}>
            <ImportWalletEditIcon/>
          </View>
        </TouchableOpacity>

        <Button
          size="small"
          style={{ marginTop: 16 }}
          label={allTranslations(localization.tradingTradeInfo.informationDial.closeByMarket)}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({

  root: {
    backgroundColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,
    padding: 16,
  },

  section: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 19,
    color: "#8E8E8E",
    marginBottom: 8,
  },
  sectionValue: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828",
    fontWeight: "600",
  },

  noteContainer: {
    flexDirection: "row",

    backgroundColor: "#F7F7F7",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 16,

    shadowColor: "rgba(172, 172, 172, 1)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
  noteLeft: {
    flex: 1,
    justifyContent: "center",
    minHeight: 32
  },
  noteText: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828"
  },
  noteIcon: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center"
  },



});

export default InformationDial;
