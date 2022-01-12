import React, { PureComponent } from "react";
import {
  Svg,
  Path, Mask, Rect,
} from "react-native-svg";

class Cancel extends PureComponent {
  render() {
    return (
      <Svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path fillRule="evenodd" clipRule="evenodd" d="M11.8944 0.580744C11.4257 0.112025 10.6657 0.112088 10.1969 0.580885L6.23743 4.54031L2.35415 0.657023C1.88543 0.188304 1.12542 0.188367 0.656626 0.657164C0.187829 1.12596 0.187767 1.88597 0.656486 2.35469L4.53977 6.23797L0.580811 10.1969C0.112014 10.6657 0.111951 11.4257 0.58067 11.8945C1.04939 12.3632 1.8094 12.3631 2.27819 11.8943L6.23715 7.93536L10.1207 11.8189C10.5894 12.2876 11.3494 12.2876 11.8182 11.8188C12.287 11.35 12.2871 10.59 11.8184 10.1213L7.93482 6.23769L11.8942 2.27827C12.363 1.80947 12.3631 1.04946 11.8944 0.580744Z" fill="white"/>
      </Svg>
    );
  }
}

export default Cancel
