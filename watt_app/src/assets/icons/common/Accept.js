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
      <Svg width={ size } height={ size } viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M6 15.7778L13.5 23.5556L26 8" stroke={ color } strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </Svg>
    );
  }
}

Accept.defaultProps = {
  size: 32,
  color: "#282828",
};

export default Accept
