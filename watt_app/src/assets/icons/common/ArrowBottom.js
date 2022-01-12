import React, { PureComponent } from "react";
import {
  Svg,
  Path
} from "react-native-svg";

class Add extends PureComponent {
  render() {
    const {
      color,
      size
    } = this.props;
    return (
      <Svg width={ size } height={ size } viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M4.30665 9.58121C4.10823 9.409 4 9.18982 4 8.93151C4 8.41487 4.469 8 5.06426 8C5.36189 8 5.63247 8.10959 5.83991 8.28963L12.009 13.7691L18.1601 8.28963C18.3675 8.10959 18.6471 8 18.9357 8C19.531 8 20 8.41487 20 8.93151C20 9.18982 19.8918 9.409 19.6933 9.58121L12.8388 15.6712C12.6043 15.8904 12.3157 15.9922 12 16C11.6843 16 11.4138 15.8904 11.1702 15.6712L4.30665 9.58121Z" fill={color}/>
      </Svg>
    );
  }
}

Add.defaultProps = {
  color: "#282828",
  size: 24
};

export default Add
