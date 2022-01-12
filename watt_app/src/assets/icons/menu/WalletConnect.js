import React, { PureComponent } from "react";
import {
  Svg,
  G,
  Path,
  Defs,
  ClipPath,
  Rect
} from "react-native-svg";

class Account extends PureComponent {
  render() {
    return (
      <Svg width="41" height="47" viewBox="0 0 41 47" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M19 0.866025C19.9282 0.330126 21.0718 0.330127 22 0.866025L39.3516 10.884C40.2798 11.4199 40.8516 12.4103 40.8516 13.4821V33.518C40.8516 34.5897 40.2798 35.5801 39.3516 36.116L22 46.134C21.0718 46.6699 19.9282 46.6699 19 46.134L1.6484 36.116C0.720199 35.5801 0.148403 34.5897 0.148403 33.5179V13.482C0.148403 12.4103 0.7202 11.4199 1.6484 10.884L19 0.866025Z" fill="#F2F5FA"/>
        <Rect x="12" y="24.7194" width="3" height="8" rx="1" transform="rotate(-45 12 24.7194)" fill="#263E51"/>
        <Rect width="3" height="8" rx="1" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 30.2114 24.7194)" fill="#263E51"/>
        <Rect width="3" height="7.59181" rx="1" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 23.3506 25.1769)" fill="#263E51"/>
        <Rect x="18.8608" y="25.1769" width="3" height="7.59181" rx="1" transform="rotate(-45 18.8608 25.1769)" fill="#263E51"/>
        <Path d="M16.8608 21.7669C18.3608 20.4336 22.1608 18.5669 25.3608 21.7669" stroke="#263E51" strokeWidth="2" strokeLinecap="round"/>
      </Svg>
    );
  }
}

export default Account
