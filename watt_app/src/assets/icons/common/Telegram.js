import React, { PureComponent } from "react";
import {
  Svg,
  Path,
  Rect
} from "react-native-svg";

class Accept extends PureComponent {
  render() {
    const {
      size,
      color
    } = this.props;

    return (
      <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M24.9487 9.37422L22.2324 22.1844C22.0275 23.0886 21.4931 23.3135 20.7336 22.8877L16.5948 19.8378L14.5978 21.7585C14.3769 21.9795 14.192 22.1644 13.766 22.1644L14.0634 17.9492L21.7342 11.0177C22.0677 10.7203 21.6619 10.5556 21.2158 10.8529L11.7328 16.8241L7.65028 15.5463C6.76225 15.269 6.74623 14.6582 7.83511 14.2323L23.8035 8.08039C24.5428 7.80314 25.1898 8.24508 24.9487 9.37422Z" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      </Svg>
    );
  }
}

Accept.defaultProps = {
  size: 32,
  color: "#282828",
};

export default Accept
