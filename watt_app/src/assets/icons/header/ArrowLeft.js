import React, { PureComponent } from "react";
import {
  Svg,
  Path
} from "react-native-svg";

class ArrowLeft extends PureComponent {
  render() {
    return (
      <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M19.0235 24.655C19.2387 24.8782 19.5127 25 19.8356 25C20.4814 25 21 24.4724 21 23.8027C21 23.4679 20.863 23.1635 20.638 22.9301L13.7886 15.9899L20.638 9.0699C20.863 8.83653 21 8.52198 21 8.19729C21 7.52762 20.4814 7 19.8356 7C19.5127 7 19.2387 7.12176 19.0235 7.34498L11.411 15.0564C11.137 15.3202 11.0098 15.6449 11 16C11 16.3551 11.137 16.6595 11.411 16.9335L19.0235 24.655Z" fill="#282828"/>
      </Svg>
    );
  }
}

export default ArrowLeft
