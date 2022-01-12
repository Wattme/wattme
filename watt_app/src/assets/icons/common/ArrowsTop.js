import React, { PureComponent } from "react";
import {
  Svg,
  Path,
  Circle, Rect,
} from "react-native-svg";

class ArrowTopCircle extends PureComponent {
  render() {
    const {
      color
    } = this.props;

    return (
      <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path fillRule="evenodd" clipRule="evenodd" d="M16.0003 3.41699C9.05074 3.41699 3.41699 9.05074 3.41699 16.0003C3.41699 22.9499 9.05074 28.5837 16.0003 28.5837C22.9499 28.5837 28.5837 22.9499 28.5837 16.0003C28.5837 9.05074 22.9499 3.41699 16.0003 3.41699ZM1.91699 16.0003C1.91699 8.22232 8.22232 1.91699 16.0003 1.91699C23.7783 1.91699 30.0837 8.22232 30.0837 16.0003C30.0837 23.7783 23.7783 30.0837 16.0003 30.0837C8.22232 30.0837 1.91699 23.7783 1.91699 16.0003Z" fill="#8E8E8E"/>
        <Path d="M12 15L16 11L18 13L20 15" stroke="#8E8E8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <Path d="M12 21L16 17L18 19L20 21" stroke="#8E8E8E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </Svg>
    );
  }
}

export default ArrowTopCircle
