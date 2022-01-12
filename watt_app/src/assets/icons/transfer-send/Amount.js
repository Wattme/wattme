import React, { PureComponent } from "react";
import {
  Svg,
  G,
  Path,
  Defs,
  ClipPath,
  Rect
} from "react-native-svg";

class Amount extends PureComponent {
  render() {
    const {active} = this.props;

    return (
      <Svg width="37" height="41" viewBox="0 0 37 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M17 0.866025C17.9282 0.330127 19.0718 0.330127 20 0.866025L34.7535 9.38398C35.6817 9.91987 36.2535 10.9103 36.2535 11.9821V29.018C36.2535 30.0897 35.6817 31.0801 34.7535 31.616L20 40.134C19.0718 40.6699 17.9282 40.6699 17 40.134L2.24648 31.616C1.31828 31.0801 0.746479 30.0897 0.746479 29.0179V11.982C0.746479 10.9103 1.31828 9.91987 2.24648 9.38397L17 0.866025Z" fill={active ? "white" : "#213D53"}/>
        <Path d="M26 21.5V22.875C26 25.1534 22.642 27 18.5 27C14.4316 27 11.12 25.2187 11.0034 22.9967L11 22.875V21.5C11 23.7784 14.358 25.625 18.5 25.625C22.642 25.625 26 23.7784 26 21.5ZM18.5 16C22.642 16 26 17.8466 26 20.125C26 22.4034 22.642 24.25 18.5 24.25C14.358 24.25 11 22.4034 11 20.125C11 17.8466 14.358 16 18.5 16Z" fill={active ? "#213D53" : "white"}/>
      </Svg>
    );
  }
}

Amount.defaultProps = {
  active: false
}

export default Amount
