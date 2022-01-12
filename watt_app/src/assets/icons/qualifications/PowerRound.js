import React, { PureComponent } from "react";
import {
  Svg,
  G,
  Path,
  Defs,
  ClipPath,
  Rect,
  Fe
} from "react-native-svg";
import Filter from "../filter/Filter";

class Account extends PureComponent {
  render() {
    const {
      size,
      style
    } = this.props;

    return (
      <Svg style={style} width={ size } height={ size } viewBox="0 0 124 124" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M117.065 61.9997C117.065 92.4107 92.4123 117.064 62.0014 117.064C31.5904 117.064 6.9375 92.4107 6.9375 61.9997C6.9375 31.5888 31.5904 6.93585 62.0014 6.93585C92.4123 6.93585 117.065 31.5888 117.065 61.9997ZM15.4392 61.9997C15.4392 87.7153 36.2858 108.562 62.0014 108.562C87.717 108.562 108.564 87.7153 108.564 61.9997C108.564 36.2842 87.717 15.4376 62.0014 15.4376C36.2858 15.4376 15.4392 36.2842 15.4392 61.9997Z" fill="white"/>
        <Path d="M117.065 61.9998C117.065 92.4108 92.4123 117.064 62.0014 117.064C31.5904 117.064 6.9375 92.4108 6.9375 61.9998C6.9375 31.5889 31.5904 6.93591 62.0014 6.93591C92.4123 6.93591 117.065 31.5889 117.065 61.9998ZM12.4439 61.9998C12.4439 89.3697 34.6315 111.557 62.0014 111.557C89.3712 111.557 111.559 89.3697 111.559 61.9998C111.559 34.63 89.3712 12.4423 62.0014 12.4423C34.6315 12.4423 12.4439 34.63 12.4439 61.9998Z" fill="#3E3E3E"/>
        <Path d="M124 62C124 96.2417 96.2417 124 62 124C27.7583 124 0 96.2417 0 62C0 27.7583 27.7583 0 62 0C96.2417 0 124 27.7583 124 62ZM7.006 62C7.006 92.3723 31.6277 116.994 62 116.994C92.3723 116.994 116.994 92.3723 116.994 62C116.994 31.6277 92.3723 7.006 62 7.006C31.6277 7.006 7.006 31.6277 7.006 62Z" fill="black"/>
        <Path d="M45.0191 9.62058C56.0806 6.03427 67.9936 6.04187 79.0505 9.64229L77.3456 14.8781C67.3943 11.6377 56.6727 11.6309 46.7174 14.8585L45.0191 9.62058Z" fill="#5F5B24"/>
        <Path d="M80.1554 113.986C69.1772 117.819 57.2671 118.079 46.1321 114.728L47.7191 109.455C57.7405 112.471 68.4596 112.237 78.34 108.787L80.1554 113.986Z" fill="#5F5B24"/>
        <Path d="M42.8865 3.01971C55.3419 -1.01666 68.7555 -1.0063 81.2046 3.04933L79.0458 9.67595C67.9961 6.07622 56.0904 6.06702 45.0351 9.64966L42.8865 3.01971Z" fill="#F6D962"/>
        <Path d="M82.3923 120.55C70.0277 124.857 56.6171 125.138 44.0826 121.355L46.0967 114.683C57.2222 118.041 69.1253 117.791 80.1 113.969L82.3923 120.55Z" fill="#F6D962"/>
      </Svg>
    );
  }
}

export default Account