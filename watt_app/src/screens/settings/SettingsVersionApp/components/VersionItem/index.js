import React from "react";
import {
  View,
  StyleSheet
} from "react-native/index";
import {
 Text
} from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

class VersionItem extends React.PureComponent {
  render() {
    return (
      <View style={styles.card}>
        <View style={styles.cardHead}>
          <Text style={styles.versionApp}>
            { allTranslations(localization.settingsVersionApp.version) } 1.3
          </Text>
          <Text style={styles.dateUpdate}>23.12.2021</Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.changeTitle}>
            { allTranslations(localization.settingsVersionApp.whatNew) }
          </Text>

          <View style={styles.listChange}>
            <Text style={styles.listChangeDescription}>
              {`• Повышена безопасность\n`}
              {`• Повышена безопасность\n`}
              {`• Повышена безопасность`}
            </Text>
          </View>
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

    backgroundColor: "white"
  },
  cardHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardBody: {
    marginTop: 12
  },

  versionApp: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828",
    fontWeight: "500"
  },
  dateUpdate: {
    fontSize: 14,
    lineHeight: 17,
    color: "#8E8E8E",
    textAlign: "right"
  },

  changeTitle: {
    fontSize: 14,
    lineHeight: 17,
    color: "#282828",
  },

  listChange: {
    marginTop: 8,
  },
  listChangeDescription: {
    fontSize: 14,
    lineHeight: 23,
    color: "#8E8E8E"
  }

});

export default VersionItem
