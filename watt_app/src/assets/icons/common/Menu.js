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
      <Svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Rect x="6" y="5" width="20" height="2" rx="1" fill="#8E8E8E"/>
        <Rect x="6" y="11" width="20" height="2" rx="1" fill="#8E8E8E"/>
        <Rect x="6" y="17" width="20" height="2" rx="1" fill="#8E8E8E"/>
      </Svg>
    );
  }
}

Accept.defaultProps = {
  size: 32,
  color: "#282828",
};

export default Accept
