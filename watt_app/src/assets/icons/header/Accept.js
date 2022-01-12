import React, { PureComponent } from "react";
import {
  Svg,
  Path
} from "react-native-svg";

class Accept extends PureComponent {
  render() {
    return (
      <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M6 15.7778L13.5 23.5556L26 8" stroke="#282828" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </Svg>
    );
  }
}

export default Accept
