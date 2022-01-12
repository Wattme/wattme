import React, { PureComponent } from "react";
import {
  Svg,
  Path
} from "react-native-svg";

class ArrowLeft extends PureComponent {
  render() {
    return (
      <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M17.7365 25.8481C19.0297 25.62 20.2654 25.1395 21.373 24.4339C22.4806 23.7283 23.4383 22.8115 24.1915 21.7358C24.9448 20.66 25.4787 19.4465 25.763 18.1644C26.0472 16.8823 26.0761 15.5568 25.8481 14.2635C25.62 12.9702 25.1395 11.7346 24.4339 10.627C23.7283 9.51945 22.8115 8.56171 21.7358 7.80848C20.66 7.05525 19.4465 6.52127 18.1644 6.23704C16.8823 5.95281 15.5568 5.92388 14.2635 6.15192C12.9702 6.37996 11.7346 6.86049 10.627 7.56609C9.51945 8.27168 8.56171 9.18851 7.80848 10.2642C7.05525 11.34 6.52127 12.5535 6.23704 13.8356C5.95281 15.1177 5.92388 16.4432 6.15192 17.7365C6.37996 19.0298 6.86049 20.2654 7.56609 21.373C8.27168 22.4806 9.18851 23.4383 10.2642 24.1915C11.34 24.9448 12.5535 25.4787 13.8356 25.763C15.1177 26.0472 16.4432 26.0761 17.7365 25.8481L17.7365 25.8481Z" stroke="#8E8E8E" strokeWidth="2"/>
        <Path d="M16 15L16 22" stroke="#8E8E8E" strokeWidth="2" strokeLinecap="round"/>
        <Path d="M16 11L16 10" stroke="#8E8E8E" strokeWidth="2" strokeLinecap="round"/>
      </Svg>
    );
  }
}

export default ArrowLeft