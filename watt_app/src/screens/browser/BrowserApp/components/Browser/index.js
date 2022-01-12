import React from "react";
import {
  View,
  StyleSheet,
} from "react-native/index";
import {} from "react-native-ui-lib";
import { WebView } from "react-native-webview";

class Browser extends React.PureComponent {

  componentDidMount = () => {
    this.props.innerRef.current?.injectJavaScript(`(function(){window.localStorage.clear(); location.reload();})();`);
  }

  render() {
    const {
      link,

      innerRef
    } = this.props;

    return (
      <View style={styles.root}>
        <WebView
          ref={innerRef}

          source={{ uri: link }}
          userAgent={userAgent}

          javaScriptEnabled={true}
          domStorageEnabled={true}
          injectedJavaScriptForMainFrameOnly={true}
          injectedJavaScriptBeforeContentLoadedForMainFrameOnly={true}
        />
      </View>
    );
  }
}

const userAgent = "pro/1.0.1 Mozilla/5.0 (Linux; Android 10; SM-A405FM Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/91.0.4472.120 Mobile Safari/537.36";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default Browser;
