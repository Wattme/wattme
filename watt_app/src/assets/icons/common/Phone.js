import React, { PureComponent } from "react";
import {
  Svg,
  Path
} from "react-native-svg";

class Add extends PureComponent {
  render() {
    const {
      color
    } = this.props;

    return (
      <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M21.1429 6H11.8571C10.8357 6 10 6.81818 10 7.81818V24.1818C10 25.1818 10.8357 26 11.8571 26H21.1429C22.1643 26 23 25.1818 23 24.1818V7.81818C23 6.81818 22.1643 6 21.1429 6ZM21.5 24H11.5321V8H21.5V24Z" fill="#8E8E8E"/>
      </Svg>
    );
  }
}

export default Add
