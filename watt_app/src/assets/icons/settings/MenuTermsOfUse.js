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
        <Rect width="32" height="32" rx="16" fill="#F2994A"/>
        <Path fillRule="evenodd" clipRule="evenodd" d="M16.1919 8C11.6676 8 8 11.6676 8 16.1919C8 20.7161 11.6676 24.3837 16.1919 24.3837C20.7161 24.3837 24.3837 20.7161 24.3837 16.1919C24.3837 11.6676 20.7161 8 16.1919 8ZM16.9414 15.4472C16.9414 15.033 16.6056 14.6972 16.1914 14.6972C15.7772 14.6972 15.4414 15.033 15.4414 15.4472V19.1681C15.4414 19.5824 15.7772 19.9181 16.1914 19.9181C16.6056 19.9181 16.9414 19.5824 16.9414 19.1681V15.4472ZM16.9356 13.2147C16.9356 13.6257 16.6024 13.9588 16.1914 13.9588C15.7804 13.9588 15.4472 13.6257 15.4472 13.2147C15.4472 12.8037 15.7804 12.4705 16.1914 12.4705C16.6024 12.4705 16.9356 12.8037 16.9356 13.2147Z" fill="white"/>
      </Svg>
    );
  }
}

export default ExitProfile
