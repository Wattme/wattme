import React from "react";
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native/index";
import {
  Text,
} from "react-native-ui-lib";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import { imageUserQualifications } from "../../../../../common/UserQualifications";
import { convertorNumber } from "../../../../../helpers/convertor";

const { width } = Dimensions.get("window");

class ListQualifications extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      indicatorLineWidth: 0,
      indicatorWidth: 0
    };
  }


  setSizeIndicator = () => {}

  _leftPositionLineIndicator = () => {
    const { currentEnergyValue } = this.props;

    const progressWidth = (( width - 24 ) - 32) - this.state.indicatorWidth;

    const [
      startQualification,
      endQualification,
      levelQualification
    ] = this._positionBoundaries();

    const stepQualification = endQualification - startQualification;
    const energyValue = currentEnergyValue - startQualification;
    const energyValuePercent = (energyValue * 100) / stepQualification;
    const widthOnePercent = progressWidth / 100;
    const currentProgress = energyValuePercent * widthOnePercent;

    return currentProgress || 0
  };
  _listQualifications = () => {
    const {
      ranks,
    } = this.props;

    return [
      { level: 1, label: allTranslations(localization.accountProfileMe.qualification.not), total: ranks?.[0] },
      { level: 2, label: "Spark", total: ranks?.[1] },
      { level: 3, label: "Flash", total: ranks?.[2] },
      { level: 4, label: "Power", total: ranks?.[3] },
      { level: 5, label: "Storm", total: ranks?.[4] },
      { level: 6, label: "Tesla", total: ranks?.[5] },
      { level: 7, label: "Alfa", total: ranks?.[6] },
    ];
  };

  _positionBoundaries = () => {
    const {
      ranks,
      currentEnergyValue,
    } = this.props;

    let currentStart = 0;
    let currentEnd = 0;
    let currentLevel = 0;
    (ranks || []).map((t, index) => {
      if (Boolean(t < currentEnergyValue && currentEnergyValue <= ranks[index + 1])) {
        currentStart = ranks[index];
        currentEnd = ranks[index + 1];
        currentLevel = index;
      }
    });

    if (currentEnd === 0) {
      currentEnd = ranks?.[1] || 0
    }

    return [
      currentStart,
      currentEnd,
      currentLevel
    ];
  };

  render() {
    const {
      currentEnergyValue,
    } = this.props;
    const currentValue = currentEnergyValue;

    return (
      <View style={styles.root}>

        <View style={styles.currentQualification}>
          <View style={styles.currentQualificationHead}>
            <Text style={styles.currentQualificationHeadValue}>
              {this._positionBoundaries()?.[0]}
            </Text>
            <Text style={styles.currentQualificationHeadValue}>
              {this._positionBoundaries()?.[1]}
            </Text>
          </View>
          <View style={styles.currentQualificationBody}>
            <View
              style={styles.currentQualificationBodyLine}
              onLayout={({ nativeEvent }) => this.setState({ indicatorLineWidth: nativeEvent?.layout?.width || 0 })}
            />

            <View
              style={[
                styles.currentQualificationBodyLineIndicator,
                { left: this._leftPositionLineIndicator(currentValue) },
              ]}
              onLayout={({ nativeEvent }) => this.setState({ indicatorWidth: nativeEvent?.layout?.width || 0 })}
            >
              <Text style={styles.currentQualificationBodyLineIndicatorLabel}>
                {convertorNumber(currentValue)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.qualificationsList}>

          {

            this._listQualifications().map((qualification, index) => {
              const isDisabled = Boolean(currentEnergyValue <= qualification.total);
              const isDisabledLine = Boolean(currentEnergyValue <= this._listQualifications()?.[index + 1]?.total);

              return (

                <View style={[
                  styles.qualificationItem,
                  Boolean(index === 0) && { marginTop: 0 },
                ]}>
                  <View style={[
                    styles.qualificationItemImage,
                    Boolean(index > 0 && isDisabled) && styles.qualificationItemImageDisabled,
                  ]}>
                    <Image
                      source={imageUserQualifications(qualification.level)}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </View>
                  <View style={styles.qualificationItemContent}>
                    <Text style={styles.qualificationItemName}>
                      {qualification.label}
                    </Text>
                    <View style={styles.qualificationItemCount}>
                      <Text style={styles.qualificationItemCountLabel}>
                        {convertorNumber(qualification.total)}
                      </Text>
                    </View>
                  </View>


                  {
                    Boolean(index < this._listQualifications().length - 1) && (
                      <View
                        style={[
                          styles.qualificationItemLine,
                          Boolean(!isDisabledLine) && {
                            backgroundColor: "#10B879",
                          },
                        ]}
                      />
                    )
                  }

                </View>

              );
            })

          }

        </View>

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
    padding: 16,
  },

  currentQualification: {},
  currentQualificationHead: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  currentQualificationHeadValue: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828",
  },
  currentQualificationBody: {
    marginTop: 8,
  },
  currentQualificationBodyLine: {
    width: "100%",
    height: 8,
    backgroundColor: "#8E8E8E",
    borderRadius: 8,
  },
  currentQualificationBodyLineIndicator: {
    backgroundColor: "#10B879",
    borderRadius: 8,
    height: 20,
    paddingHorizontal: 10,
    top: -6,

    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  currentQualificationBodyLineIndicatorLabel: {
    fontSize: 14,
    lineHeight: 14,
    color: "#FFFFFF",
    fontWeight: "500",
  },

  qualificationsList: {
    marginTop: 24,
  },

  qualificationItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  qualificationItemLine: {
    position: "absolute",
    left: 22,
    top: "100%",
    width: 4,
    height: 16,
    backgroundColor: "#8E8E8E",
  },
  qualificationItemImage: {
    width: 48,
    height: 48,
    marginRight: 12,
    zIndex: 10,
  },
  qualificationItemImageDisabled: {
    opacity: 0.55,
  },
  qualificationItemContent: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    minHeight: 48,
  },
  qualificationItemName: {
    fontSize: 16,
    lineHeight: 19,
    color: "#282828",
  },
  qualificationItemCount: {
    backgroundColor: "#10B879",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  qualificationItemCountLabel: {
    fontSize: 16,
    lineHeight: 19,
    color: "white",
  },

});

export default ListQualifications;
