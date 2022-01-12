import React, { PureComponent } from "react";
import {
  Svg,
  Path,
  Rect
} from "react-native-svg";

class Lock extends PureComponent {
  render() {
    const {
      size,
      color
    } = this.props;

    return (
      <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M18.25 10.375V10.375C18.25 9.08935 18.25 8.44653 17.9655 7.97179C17.7964 7.68969 17.5603 7.45363 17.2782 7.28454C16.8035 7 16.1606 7 14.875 7H11C9.11438 7 8.17157 7 7.58579 7.58579C7 8.17157 7 9.11438 7 11V14.875C7 16.1606 7 16.8035 7.28454 17.2782C7.45363 17.5603 7.68969 17.7964 7.97179 17.9655C8.44653 18.25 9.08935 18.25 10.375 18.25V18.25" stroke="#8E8E8E" strokeWidth="1.5"/>
        <Rect x="13.75" y="13.75" width="11.25" height="11.25" rx="2" stroke="#8E8E8E" strokeWidth="1.5"/>
      </Svg>
    );
  }
}

Lock.defaultProps = {
  size: 32,
  color: "#282828",
};

export default Lock
