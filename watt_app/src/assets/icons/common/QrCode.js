import React, { PureComponent } from "react";
import {
  Svg,
  Path,
  Rect
} from "react-native-svg";

class AcceptBadge extends PureComponent {
  render() {
    const {
      color
    } = this.props;

    return (
      <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M13 7C13 7.55228 12.5523 8 12 8H10C8.89543 8 8 8.89543 8 10V11C8 11.5523 7.55228 12 7 12C6.44772 12 6 11.5523 6 11V10C6 7.79086 7.79086 6 10 6H12C12.5523 6 13 6.44772 13 7Z" fill={color}/>
        <Path d="M13 25C13 24.4477 12.5523 24 12 24H10C8.89543 24 8 23.1046 8 22V21C8 20.4477 7.55228 20 7 20C6.44772 20 6 20.4477 6 21V22C6 24.2091 7.79086 26 10 26H12C12.5523 26 13 25.5523 13 25Z" fill={color}/>
        <Path d="M19 25C19 25.5523 19.4477 26 20 26H22C24.2091 26 26 24.2091 26 22V21C26 20.4477 25.5523 20 25 20C24.4477 20 24 20.4477 24 21V22C24 23.1046 23.1046 24 22 24H20C19.4477 24 19 24.4477 19 25Z" fill={color}/>
        <Path d="M20 8C19.4477 8 19 7.55228 19 7C19 6.44772 19.4477 6 20 6H22C24.2091 6 26 7.79086 26 10V11C26 11.5523 25.5523 12 25 12C24.4477 12 24 11.5523 24 11V10C24 8.89543 23.1046 8 22 8H20Z" fill={color}/>
        <Rect x="6.5" y="15.5" width="19" height="1" rx="0.5" fill={color} stroke={color}/>
      </Svg>
    );
  }
}

AcceptBadge.defaultProps = {
  color: "#282828"
}

export default AcceptBadge
