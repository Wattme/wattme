import React from "react";
import {
  View,
  Dimensions,
  StyleSheet, Image,
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import { imageUserQualifications } from "../../../../../common/UserQualifications";

const { width } = Dimensions.get("window");
const widthCard = ( width - 82 ) / 3;

class AllQualifications extends React.PureComponent {

  _list = () => {
    const {
      ranks
    } = this.props;

    return [
      { level: 2, count: ranks?.[2] },
      { level: 3, count: ranks?.[3] },
      { level: 4, count: ranks?.[4] },
      { level: 5, count: ranks?.[5] },
      { level: 6, count: ranks?.[6] },
      { level: 7, count: ranks?.[7] },
    ]
  }

  render() {
    return (
      <View style={styles.root}>

        <Text style={styles.title}>
          { allTranslations(localization.accountWalkFame.allQualifications.title) }
        </Text>

        <View style={styles.container}>

          { this._list().map(( qualification, index ) => (
            <View key={`qualification-level-${ index }`} style={styles.qualification}>

              <View style={styles.qualificationImage}>
                <Image
                  source={imageUserQualifications(qualification.level)}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>

              <Text style={styles.qualificationCount}>
                { qualification.count }
              </Text>

            </View>
          )) }

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  root: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,
    backgroundColor: "white",
    padding: 16
  },

  title: {
    fontSize: 14,
    lineHeight: 23,
    color: "#8E8E8E",
    marginBottom: 12
  },

  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: -12,
    marginTop: -12,
  },

  qualification: {
    width: widthCard,
    backgroundColor: "#F7F7F7",
    borderRadius: 14,
    padding: 16,
    marginLeft: 12,
    marginTop: 12,

    alignItems: "center",
    justifyContent: "center"
  },
  qualificationImage: {
    width: 60,
    height: 60
  },
  qualificationCount: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#282828",
    fontWeight: "500",
    marginTop: 12
  },

});

export default AllQualifications
