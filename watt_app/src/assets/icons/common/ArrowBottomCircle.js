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
      <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Circle cx="16" cy="16" r="9.5" stroke={color}/>
        <Path d="M15.5 11C15.5 10.7239 15.7239 10.5 16 10.5C16.2761 10.5 16.5 10.7239 16.5 11H15.5ZM16.3536 18.3536C16.1583 18.5488 15.8417 18.5488 15.6464 18.3536L12.4645 15.1716C12.2692 14.9763 12.2692 14.6597 12.4645 14.4645C12.6597 14.2692 12.9763 14.2692 13.1716 14.4645L16 17.2929L18.8284 14.4645C19.0237 14.2692 19.3403 14.2692 19.5355 14.4645C19.7308 14.6597 19.7308 14.9763 19.5355 15.1716L16.3536 18.3536ZM16.5 11V18H15.5L15.5 11H16.5Z" fill={color}/>
        <Path d="M13.5 21H18.5" stroke={color} strokeLinecap="round"/>
      </Svg>
    );
  }
}

export default ArrowTopCircle
