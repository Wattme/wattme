import React, { PureComponent } from "react";
import {
  Svg,
  Path,
  Circle
} from "react-native-svg";

class ArrowTopCircle extends PureComponent {
  render() {
    const {
      color
    } = this.props;

    return (
      <Svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Circle cx="16.5" cy="16" r="9.5" stroke={color}/>
        <Path d="M16 18C16 18.2761 16.2239 18.5 16.5 18.5C16.7761 18.5 17 18.2761 17 18H16ZM16.8536 10.6464C16.6583 10.4512 16.3417 10.4512 16.1464 10.6464L12.9645 13.8284C12.7692 14.0237 12.7692 14.3403 12.9645 14.5355C13.1597 14.7308 13.4763 14.7308 13.6716 14.5355L16.5 11.7071L19.3284 14.5355C19.5237 14.7308 19.8403 14.7308 20.0355 14.5355C20.2308 14.3403 20.2308 14.0237 20.0355 13.8284L16.8536 10.6464ZM17 18V11H16L16 18H17Z" fill={color}/>
        <Path d="M14 21H19" stroke={color} strokeLinecap="round"/>
      </Svg>
    );
  }
}

export default ArrowTopCircle
