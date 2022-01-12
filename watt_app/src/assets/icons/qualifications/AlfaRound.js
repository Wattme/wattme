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
        <Path d="M104.527 27.0199C111.914 36.0003 116.268 47.0889 116.966 58.6963L111.47 59.0267C110.842 48.58 106.923 38.6003 100.274 30.5179L104.527 27.0199Z" fill="#5F5B24"/>
        <Path d="M108.041 92.2061C101.662 101.929 92.3691 109.382 81.4937 113.499L79.5445 108.349C89.3323 104.644 97.6961 97.9358 103.437 89.1855L108.041 92.2061Z" fill="#5F5B24"/>
        <Path d="M42.4533 113.478C31.5824 109.349 22.2974 101.886 15.9291 92.1562L20.5363 89.1406C26.2678 97.8972 34.6243 104.614 44.4081 108.33L42.4533 113.478Z" fill="#5F5B24"/>
        <Path d="M7.04609 58.5439C7.77601 46.9385 12.1612 35.862 19.5733 26.9021L23.8161 30.4119C17.1452 38.4758 13.1985 48.4446 12.5416 58.8895L7.04609 58.5439Z" fill="#5F5B24"/>
        <Path d="M42.8865 3.01971C55.3419 -1.01666 68.7555 -1.0063 81.2046 3.04933L79.0458 9.67595C67.9961 6.07622 56.0904 6.06702 45.0351 9.64966L42.8865 3.01971Z" fill="#F6D962"/>
        <Path d="M109.874 22.6041C118.194 32.7142 123.099 45.1986 123.888 58.268L116.931 58.6875C116.231 47.0872 111.877 36.0062 104.493 27.0326L109.874 22.6041Z" fill="#F6D962"/>
        <Path d="M14.2131 22.4979C5.87113 32.5895 0.938022 45.0629 0.120867 58.1305L7.07668 58.5655C7.80198 46.9668 12.1806 35.8955 19.5849 26.9383L14.2131 22.4979Z" fill="#F6D962"/>
        <Path d="M113.871 95.9625C106.698 106.916 96.2425 115.319 84.0015 119.965L81.5283 113.449C92.3933 109.325 101.674 101.867 108.04 92.1448L113.871 95.9625Z" fill="#F6D962"/>
        <Path d="M10.1295 95.9625C17.3017 106.916 27.7575 115.319 39.9985 119.965L42.4717 113.449C31.6067 109.325 22.3262 101.867 15.9602 92.1448L10.1295 95.9625Z" fill="#F6D962"/>
      </Svg>
    );
  }
}

export default Account
