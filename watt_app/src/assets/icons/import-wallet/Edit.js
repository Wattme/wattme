import React, { PureComponent } from "react";
import {
  Svg,
  Path,
  G,
  Defs,ClipPath,Rect
} from "react-native-svg";

class Edit extends PureComponent {
  render() {
    const {
      size
    } = this.props;

    return (
      <Svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <G clipPath="url(#clip0_558:2395)">
          <Path d="M8.74975 23.25L8.74959 23.25L8.74963 23.2499L8.74963 23.2499L9.11744 19.942L17.0855 11.9745L20.0254 14.9145L12.0548 22.8851L8.74975 23.25ZM21.1517 8.97015L23.0301 10.8486C23.3231 11.1415 23.3233 11.6166 23.0301 11.9101C23.0301 11.9102 23.0301 11.9102 23.03 11.9103L21.7933 13.147L18.8533 10.207L20.0902 8.97015C20.3832 8.6771 20.8587 8.67711 21.1517 8.97015Z" stroke="#8E8E8E" strokeWidth="1.5"/>
        </G>
        <Defs>
          <ClipPath id="clip0_558:2395">
            <Rect width="16" height="16" fill="white" transform="translate(8 8)"/>
          </ClipPath>
        </Defs>
      </Svg>
    );
  }
}

Edit.defaultProps = {
  size: 32
}

export default Edit
