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
        <Path d="M24 8H8C6.9 8 6.01 8.9 6.01 10L6 22C6 23.1 6.9 24 8 24H24C25.1 24 26 23.1 26 22V10C26 8.9 25.1 8 24 8ZM24.75 22.7135H7.38021V11L16 16.5L24.75 11V22.7135ZM16 15L7.38021 9.5H24.75L16 15Z" fill="#8E8E8E"/>
      </Svg>
    );
  }
}

export default Add
