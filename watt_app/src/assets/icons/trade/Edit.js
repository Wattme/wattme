import React, { PureComponent } from "react";
import {
  Svg,
  Path, Mask, Rect, G, Defs, ClipPath,
} from "react-native-svg";

class Edit extends PureComponent {
  render() {
    return (
      <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <G clipPath="url(#clip0_479_1342)">
          <Path d="M0.749654 15.2499L0.7495 15.2499L0.749535 15.2498L0.749541 15.2498L1.11734 11.9418L9.08537 3.9744L12.0254 6.91439L4.05474 14.885L0.749654 15.2499ZM13.1516 0.970027L15.0301 2.84847C15.323 3.14138 15.3232 3.61651 15.0301 3.90999C15.03 3.91004 15.03 3.91009 15.0299 3.91013L13.7932 5.14685L10.8532 2.20689L12.0901 0.970028C12.3831 0.676983 12.8586 0.676983 13.1516 0.970027Z" stroke="white" strokeWidth="1.5"/>
        </G>
        <Defs>
          <ClipPath id="clip0_479_1342">
            <Rect width="16" height="16" fill="white"/>
          </ClipPath>
        </Defs>
      </Svg>
    );
  }
}

export default Edit
