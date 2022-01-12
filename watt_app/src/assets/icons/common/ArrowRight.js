import React, { PureComponent } from "react";
import {
  Svg,
  Path
} from "react-native-svg";

class Add extends PureComponent {
  render() {
    const {
      color
    } = this.props;
    return (
      <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M14.3836 22.7317C14.2329 22.9053 14.0411 23 13.8151 23C13.363 23 13 22.5896 13 22.0688C13 21.8083 13.0959 21.5716 13.2534 21.3901L18.0479 15.9921L13.2534 10.6099C13.0959 10.4284 13 10.1838 13 9.93123C13 9.41037 13.363 9 13.8151 9C14.0411 9 14.2329 9.0947 14.3836 9.26832L19.7123 15.2661C19.9041 15.4713 19.9932 15.7238 20 16C20 16.2762 19.9041 16.513 19.7123 16.726L14.3836 22.7317Z" fill={color}/>
      </Svg>
    );
  }
}

export default Add
