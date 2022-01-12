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
        <Path d="M23.5303 16.5303C23.8232 16.2374 23.8232 15.7626 23.5303 15.4697L18.7574 10.6967C18.4645 10.4038 17.9896 10.4038 17.6967 10.6967C17.4038 10.9896 17.4038 11.4645 17.6967 11.7574L21.9393 16L17.6967 20.2426C17.4038 20.5355 17.4038 21.0104 17.6967 21.3033C17.9896 21.5962 18.4645 21.5962 18.7574 21.3033L23.5303 16.5303ZM8 16.75H23V15.25H8V16.75Z" fill={ color }/>
      </Svg>
    );
  }
}

export default Add
