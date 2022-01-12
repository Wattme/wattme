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
        <Path d="M11.9568 39.0314C16.8073 28.4631 24.8791 19.7015 35.0152 14.0026L37.7138 18.8024C28.5913 23.9314 21.3267 31.8168 16.9612 41.3283L11.9568 39.0314Z" fill="#5F5B24"/>
        <Path d="M88.8526 13.927C99.0047 19.5974 107.101 28.3362 111.981 38.891L106.983 41.2019C102.591 31.7026 95.3044 23.8377 86.1675 18.7343L88.8526 13.927Z" fill="#5F5B24"/>
        <Path d="M112.178 84.6786C107.389 95.2749 99.3684 104.083 89.2655 109.841L86.5391 105.057C95.6317 99.8748 102.85 91.9474 107.161 82.4107L112.178 84.6786Z" fill="#5F5B24"/>
        <Path d="M34.9227 109.946C24.7976 104.227 16.7427 95.4503 11.9126 84.8726L16.9214 82.5853C21.2686 92.1053 28.5179 100.005 37.6305 105.151L34.9227 109.946Z" fill="#5F5B24"/>
        <Path d="M5.64269 36.1571C11.1002 24.2556 20.1854 14.3873 31.5961 7.96663L35.0138 14.0405C24.8857 19.7394 16.8218 28.4984 11.9778 39.0621L5.64269 36.1571Z" fill="#F6D962"/>
        <Path d="M92.2635 7.8879C103.691 14.2789 112.802 24.1236 118.29 36.0108L111.962 38.9323C107.091 28.3812 99.0044 19.6432 88.8616 13.9706L92.2635 7.8879Z" fill="#F6D962"/>
        <Path d="M118.505 87.5175C113.117 99.4503 104.089 109.371 92.715 115.857L89.2623 109.803C99.3574 104.046 107.371 95.2405 112.154 84.6491L118.505 87.5175Z" fill="#F6D962"/>
        <Path d="M5.61699 87.7867C11.0626 99.6937 20.1379 109.571 31.5422 116.003L34.966 109.933C24.8436 104.224 16.7885 95.4565 11.955 84.8881L5.61699 87.7867Z" fill="#F6D962"/>
      </Svg>
    );
  }
}

export default Account