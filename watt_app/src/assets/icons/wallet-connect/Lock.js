import React, { PureComponent } from "react";
import {
  Svg,
  Path,
  Rect
} from "react-native-svg";

class Lock extends PureComponent {
  render() {
    const {
      size,
      color
    } = this.props;

    return (
      <Svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M1.125 11.7158H6.70312C7.45898 11.7158 7.82812 11.3408 7.82812 10.5205V6.21973C7.82812 5.48145 7.52344 5.10059 6.89648 5.03613V3.55957C6.89648 1.35059 5.44922 0.28418 3.91406 0.28418C2.37891 0.28418 0.931641 1.35059 0.931641 3.55957V5.06543C0.357422 5.15332 0 5.52832 0 6.21973V10.5205C0 11.3408 0.369141 11.7158 1.125 11.7158ZM1.875 3.43652C1.875 1.96582 2.81836 1.18652 3.91406 1.18652C5.00977 1.18652 5.95312 1.96582 5.95312 3.43652V5.03027L1.875 5.03613V3.43652Z" fill="#8E8E8E"/>
      </Svg>
    );
  }
}

Lock.defaultProps = {
  size: 32,
  color: "#282828",
};

export default Lock
