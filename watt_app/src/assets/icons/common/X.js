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
        <Path fillRule="evenodd" clipRule="evenodd" d="M22.6827 9.50177C22.1366 8.9557 21.2512 8.95577 20.705 9.50193L16.092 14.1149L11.5678 9.59066C11.0217 9.04459 10.1362 9.04466 9.59008 9.59083C9.04391 10.137 9.04384 11.0224 9.58992 11.5685L14.1142 16.0928L9.50193 20.705C8.95576 21.2512 8.95569 22.1366 9.50176 22.6827C10.0478 23.2288 10.9333 23.2287 11.4794 22.6825L16.0917 18.0703L20.6161 22.5947C21.1622 23.1408 22.0476 23.1407 22.5938 22.5945C23.14 22.0484 23.14 21.1629 22.594 20.6169L18.0695 16.0924L22.6825 11.4795C23.2287 10.9333 23.2288 10.0478 22.6827 9.50177Z" fill={ color }/>
      </Svg>
    );
  }
}

Add.defaultProps = {
  color: "#8E8E8E"
}

export default Add
