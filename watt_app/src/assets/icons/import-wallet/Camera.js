import React, { PureComponent } from "react";
import {
  Svg,
  Path,
  Circle
} from "react-native-svg";

class Edit extends PureComponent {
  render() {
    return (
      <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M8.38549 7.76193H9.07923L9.32217 7.11211L9.7247 6.03542C9.72474 6.03531 9.72478 6.03521 9.72482 6.03511C9.72483 6.03508 9.72483 6.03506 9.72484 6.03503C9.80761 5.81441 10.0197 5.66669 10.2581 5.66669H14.3667C14.6053 5.66669 14.8175 5.81458 14.9001 6.03542L14.9009 6.03752L15.3069 7.11461L15.5509 7.76193H16.2426H19.1236C19.4389 7.76193 19.695 8.01808 19.695 8.33335V17.7619C19.695 18.0772 19.4389 18.3334 19.1236 18.3334H5.50453C5.18926 18.3334 4.93311 18.0772 4.93311 17.7619V8.33335C4.93311 8.01808 5.18926 7.76193 5.50453 7.76193H8.38549Z" stroke="white" strokeWidth="2"/>
        <Circle cx="12.3141" cy="12.6705" r="2.68762" stroke="white" strokeWidth="2"/>
      </Svg>
    );
  }
}

export default Edit
