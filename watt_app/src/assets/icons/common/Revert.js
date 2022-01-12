import React, { PureComponent } from "react";
import {
  Svg,
  Path,
  Rect,
  G,
  Defs,
  ClipPath
} from "react-native-svg";

class Accept extends PureComponent {
  render() {
    const {
      color
    } = this.props;

    return (
      <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path fillRule="evenodd" clipRule="evenodd" d="M11.9169 8.28033C12.2098 7.98744 12.2098 7.51256 11.9169 7.21967C11.624 6.92678 11.1491 6.92678 10.8562 7.21967L7.21967 10.8562C6.92678 11.1491 6.92678 11.624 7.21967 11.9169L10.8562 15.5534C11.1491 15.8463 11.624 15.8463 11.9169 15.5534C12.2098 15.2605 12.2098 14.7856 11.9169 14.4927L9.56066 12.1365H20.4779C20.8921 12.1365 21.2279 11.8007 21.2279 11.3865C21.2279 10.9723 20.8921 10.6365 20.4779 10.6365H9.56066L11.9169 8.28033ZM19.9471 17.3718C19.6542 17.0789 19.6542 16.6041 19.9471 16.3112C20.24 16.0183 20.7149 16.0183 21.0078 16.3112L24.6443 19.9477C24.7849 20.0884 24.864 20.2791 24.864 20.478C24.864 20.6769 24.7849 20.8677 24.6443 21.0084L21.0078 24.6449C20.7149 24.9378 20.24 24.9378 19.9471 24.6449C19.6542 24.352 19.6542 23.8771 19.9471 23.5842L22.3033 21.228H11.3861C10.9719 21.228 10.6361 20.8922 10.6361 20.478C10.6361 20.0638 10.9719 19.728 11.3861 19.728H22.3033L19.9471 17.3718Z" fill={color}/>
      </Svg>
    );
  }
}

export default Accept
