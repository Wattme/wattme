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
  CommonArrowBottom as CommonArrowBottomIcon,
  CommonWatt as CommonWattIcon,
} from "../../../../../assets/icons";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";

const AboutTokenWatt = (props) => {
  const {
    routeLitePaper,
    routePresentation
  } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <View style={styles.root}>

      <TouchableOpacity style={styles.buttonOpen} activeOpacity={0.8} onPress={() => setOpen(!open)}>
        <Text style={styles.buttonOpenLabel}>
          {allTranslations(localization.tokenWattBuyingToken.aboutTokenWatt.label)}
        </Text>
        <View style={[
          styles.buttonOpenIcon,
          Boolean(open) && { transform: [{ rotate: "180deg" }] },
        ]}>
          <CommonArrowBottomIcon color="#282828" />
        </View>
      </TouchableOpacity>

      {Boolean(open) && (
        <View style={styles.content}>

          <View style={styles.greenSection}>
            <Text style={styles.message}><Text style={{ fontWeight: "500" }}>WATT
              - </Text>{allTranslations(localization.tokenWattBuyingToken.aboutTokenWatt.messageAboutWatt)}</Text>
          </View>

          <View style={{ marginTop: 12 }} />

          <View style={styles.graySection}>
            <Text style={styles.message}>
              <Text
                style={styles.messageBig}>{allTranslations(localization.tokenWattBuyingToken.aboutTokenWatt.energyLabel)}</Text>
              {allTranslations(localization.tokenWattBuyingToken.aboutTokenWatt.energyMessage)}
            </Text>
          </View>

          <View style={{ marginTop: 12 }} />

          <View style={styles.infoIcons}>
            <View style={styles.infoIcon}>
              <Text style={styles.infoIconLabel}>
                {allTranslations(localization.tokenWattBuyingToken.aboutTokenWatt.get)}
              </Text>
              <View style={styles.infoIconBottom}>
                <CommonWattIcon/>
              </View>
            </View>
            <View style={styles.infoIcon}>
              <Text style={styles.infoIconLabel}>
                {allTranslations(localization.tokenWattBuyingToken.aboutTokenWatt.send)}
              </Text>
              <View style={styles.infoIconBottom}>
                <CommonWattIcon/>
              </View>
            </View>
            <View style={styles.infoIcon}>
              <Text style={styles.infoIconLabel}>
                {allTranslations(localization.tokenWattBuyingToken.aboutTokenWatt.accumulate)}
              </Text>
              <View style={styles.infoIconBottom}>
                <CommonWattIcon/>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 12 }} />

          <View style={styles.infoSection}>
            <Text style={styles.infoSectionLabel}>
              { allTranslations(localization.tokenWattBuyingToken.aboutTokenWatt.infoSectionLabel) }
            </Text>
          </View>

          <View style={styles.footer}>
            <Button
              label="Lite Paper"
              style={styles.footerButton}
              labelStyle={styles.footerButtonLabel}
              onPress={routeLitePaper}
            />
            <Button
              label={allTranslations(localization.common.presentation)}
              style={styles.footerButton}
              labelStyle={styles.footerButtonLabel}
              onPress={routePresentation}
            />
          </View>

        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({

  root: {
    backgroundColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F0F0F0",
    borderRadius: 14,
    overflow: "hidden",
  },

  buttonOpen: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    height: 52,
  },
  buttonOpenLabel: {
    fontSize: 16,
    lineHeight: 23,
    color: "#282828",
    fontWeight: "500",
  },
  buttonOpenIcon: {
    width: 32,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  greenSection: {
    backgroundColor: "#EDFFF8",
    borderRadius: 14,
    padding: 16,
  },
  graySection: {
    backgroundColor: "#F7F7F7",
    borderRadius: 14,
    padding: 16,
  },

  messageBig: {
    fontSize: 16,
    lineHeight: 23,
    color: "#282828",
  },
  message: {
    fontSize: 14,
    lineHeight: 23,
    color: "#282828",
  },

  infoIcons: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -12,
  },

  infoIcon: {
    flex: 1,
    marginLeft: 12,
    backgroundColor: "#F7F7F7",
    borderRadius: 8,
    overflow: "hidden",
  },
  infoIconLabel: {
    fontSize: 14,
    lineHeight: 17,
    fontWeight: "500",
    color: "#282828",
    textAlign: "center",
    marginVertical: 8,
  },
  infoIconBottom: {
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#282828",
  },

  infoSection: {},
  infoSectionLabel: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "600",
    color: "#10B879",
    textAlign: "center",
    textTransform: "uppercase"
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -12,
    marginTop: 12
  },
  footerButton: {
    flex: 1,
    marginLeft: 12,
    height: 36,
    borderRadius: 8,
    paddingVertical: 0
  },
  footerButtonLabel: {
    fontSize: 16,
    lineHeight: 19,
    fontWeight: "normal"
  }

});

export default AboutTokenWatt;
