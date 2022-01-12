import React from "react";
import {
  View,
  StyleSheet,
} from "react-native/index";
import {
  Button,
} from "react-native-ui-lib";
import {
  BlockInformation,
} from "../../../../../components";
import allTranslations from "../../../../../localization/allTranslations";
import localization from "../../../../../localization/localization";
import moment from "moment";

class Controls extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      backTime: "10",

      startTime: Date.now(),
    };
    this.timeoutBackTime = null;
  }

  componentDidMount = async () => {
    await this.startBackTime();
  };

  startBackTime = async () => {
    const currentTime = Date.now();
    const differenceTime = currentTime - this.state.startTime;
    const secondsBackTime = differenceTime - (10 * 1000);

    if (secondsBackTime >= 0) {
      this.props?.onChangeDealCurrent(false);

      return null;
    }

    this.setState({
      backTime: moment(Math.abs(secondsBackTime)).format("ss"),
    });

    this.timeoutBackTime = setTimeout(async () => {
      await this.startBackTime();
    }, 1000);
  };

  onUpdateStartBackTime = async () => {
    await this.setState({
      startTime: Date.now(),
    });

    await this.startBackTime();
  };

  render() {
    const {
      isDealCurrent,
      isDisabledControls,
      signTransaction,
      onUpdateDeal,
    } = this.props;
    const {
      backTime,
    } = this.state;

    return (
      <View style={styles.footer}>
        {Boolean(isDealCurrent) ? (
          <Button
            label={`${allTranslations(localization.walletCoinSendConfirm.buttonConfirm)} (${backTime})`}
            labelStyle={{ fontWeight: "normal" }}
            onPress={signTransaction}
            disabled={isDisabledControls}
          />
        ) : (
          <Button
            label={allTranslations(localization.walletCoinSendConfirm.buttonUpdate)}
            onPress={onUpdateDeal}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 12,
    paddingBottom: 24,
    paddingTop: 12,
  },
});

export default Controls;
