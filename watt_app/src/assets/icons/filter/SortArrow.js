import React, { PureComponent } from "react";
import {
  Svg,
  Path,
  Rect
} from "react-native-svg";

class Accept extends PureComponent {
  render() {
    return (
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="#8E8E8E"/>
        <Path d="M12.4596 6.54038C12.2058 6.28654 11.7942 6.28654 11.5404 6.54038L7.40381 10.677C7.14996 10.9308 7.14996 11.3424 7.40381 11.5962C7.65765 11.85 8.0692 11.85 8.32304 11.5962L12 7.91924L15.677 11.5962C15.9308 11.85 16.3424 11.85 16.5962 11.5962C16.85 11.3424 16.85 10.9308 16.5962 10.677L12.4596 6.54038ZM12.65 17L12.65 7L11.35 7L11.35 17L12.65 17Z" fill="white"/>
        <Rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="white"/>
      </Svg>
    );
  }
}

export default Accept
