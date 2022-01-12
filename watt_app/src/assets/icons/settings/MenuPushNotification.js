import React, { PureComponent } from "react";
import {
  Svg,
  G,
  Path,
  Rect
} from "react-native-svg";

class ExitProfile extends PureComponent {
  render() {
    return (
      <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Rect width="32" height="32" rx="16" fill="#EEBB3F"/>
        <Path fillRule="evenodd" clipRule="evenodd" d="M10.0004 11.9405C10.5689 9.06911 13.0878 7 16.015 7C18.9422 7 21.4611 9.06911 22.0297 11.9405L22.9644 16.6613C23.2767 18.2387 22.4512 19.8222 20.9883 20.4789C20.5219 20.6883 20.0449 20.8667 19.5605 21.0142L19.2694 21.9722C18.8341 23.4047 17.5131 24.3839 16.0159 24.3839C14.5188 24.3839 13.1978 23.4047 12.7625 21.9722L12.4716 21.0148C11.9864 20.8672 11.5088 20.6886 11.0417 20.4789C9.57879 19.8222 8.75334 18.2387 9.06565 16.6614L10.0004 11.9405ZM14.1559 21.3986L14.1977 21.5361C14.441 22.3367 15.1792 22.8839 16.0159 22.8839C16.8526 22.8839 17.5909 22.3367 17.8342 21.5361L17.876 21.3983C16.6439 21.5884 15.3881 21.5885 14.1559 21.3986Z" fill="white"/>
      </Svg>
    );
  }
}

export default ExitProfile
