import React, { PureComponent } from "react";
import {
  Svg,
  Path,
  Rect
} from "react-native-svg";

class Accept extends PureComponent {
  render() {
    return (
      <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M24 8H8L14.4 15.8833V21.3333L17.6 23V15.8833L24 8Z" stroke="#8E8E8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </Svg>
    );
  }
}

export default Accept
