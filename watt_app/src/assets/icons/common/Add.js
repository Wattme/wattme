import React, { PureComponent } from "react";
import {
  Svg,
  Path
} from "react-native-svg";

class Add extends PureComponent {
  render() {
    return (
      <Svg width="26" height="30" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M11.875 1.51554C12.5712 1.11362 13.4288 1.11362 14.125 1.51554L24.1154 7.28349C24.8115 7.68542 25.2404 8.4282 25.2404 9.23205V20.768C25.2404 21.5718 24.8115 22.3146 24.1154 22.7165L14.125 28.4845C13.4288 28.8864 12.5712 28.8864 11.875 28.4845L1.88462 22.7165C1.18847 22.3146 0.759619 21.5718 0.759619 20.768V9.23205C0.759619 8.4282 1.18847 7.68542 1.88462 7.28349L11.875 1.51554Z" stroke="#2E4B62" strokeWidth="1.5"/>
        <Path d="M13 11V19" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <Path d="M9 15H17" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </Svg>
    );
  }
}

export default Add
