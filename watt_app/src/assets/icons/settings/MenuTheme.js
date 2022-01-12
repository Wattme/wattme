import React, { PureComponent } from "react";
import {
  Svg,
  G,
  Path,
  Rect,
  Circle
} from "react-native-svg";

class ExitProfile extends PureComponent {
  render() {
    return (
      <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Rect width="32" height="32" rx="16" fill="#4BA1F8"/>
        <Path fillRule="evenodd" clipRule="evenodd" d="M15.6739 9.21014C15.8618 8.9683 15.8838 8.63654 15.7295 8.37204C15.5751 8.10754 15.2755 7.96344 14.9725 8.00802C11.0277 8.58842 8 11.9859 8 16.0919C8 20.6047 11.6584 24.2631 16.1713 24.2631C19.6466 24.2631 22.6134 22.0938 23.795 19.0381C23.9056 18.7523 23.8311 18.4279 23.6069 18.219C23.3828 18.01 23.054 17.9585 22.7766 18.0887C22.0241 18.4423 21.1833 18.6402 20.2942 18.6402C17.0652 18.6402 14.4475 16.0226 14.4475 12.7935C14.4475 11.4423 14.905 10.2 15.6739 9.21014Z" fill="white"/>
      </Svg>
    );
  }
}

export default ExitProfile
