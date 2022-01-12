import React, { PureComponent } from "react";
import {
  Svg,
  Path,
  G,
  Defs,ClipPath,Rect
} from "react-native-svg";

class Edit extends PureComponent {
  render() {
    return (
      <Svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Rect x="8" y="7" width="16" height="18" rx="3" stroke="#8E8E8E" strokeWidth="2"/>
        <Rect x="12.5" y="14.5" width="7" height="1" rx="0.5" stroke="#8E8E8E"/>
        <Path fillRule="evenodd" clipRule="evenodd" d="M14 7H12V8C12 9.10457 12.8954 10 14 10H18C19.1046 10 20 9.10457 20 8V7H18C18 7.55228 17.5523 8 17 8H15C14.4477 8 14 7.55228 14 7Z" fill="#8E8E8E"/>
        <Rect x="12.5" y="18.5" width="7" height="1" rx="0.5" fill="#C4C4C4" stroke="#8E8E8E"/>
      </Svg>
    );
  }
}

export default Edit
