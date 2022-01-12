import React, { PureComponent } from "react";
import {
  Svg,
  G,
  Path,
  Defs,
  ClipPath,
  Rect
} from "react-native-svg";

class CryptoBnb extends PureComponent {
  render() {
    const { active } = this.props;

    return (
      <Svg width="37" height="41" viewBox="0 0 37 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <G clipPath="url(#clip0)">
          <Path d="M17 0.866025C17.9282 0.330127 19.0718 0.330127 20 0.866025L34.7535 9.38398C35.6817 9.91987 36.2535 10.9103 36.2535 11.9821V29.018C36.2535 30.0897 35.6817 31.0801 34.7535 31.616L20 40.134C19.0718 40.6699 17.9282 40.6699 17 40.134L2.24648 31.616C1.31828 31.0801 0.746479 30.0897 0.746479 29.0179V11.982C0.746479 10.9103 1.31828 9.91987 2.24648 9.38397L17 0.866025Z"
                fill={active ? "white" : "#213D53"}/>
          <Path d="M24 27H14V25.7619C14 24.941 14.3292 24.1537 14.9153 23.5732C15.5013 22.9928 16.2962 22.6667 17.125 22.6667H20.875C21.7038 22.6667 22.4987 22.9928 23.0847 23.5732C23.6708 24.1537 24 24.941 24 25.7619V27ZM19 21.4286C18.5075 21.4286 18.0199 21.3325 17.5649 21.1458C17.11 20.9592 16.6966 20.6856 16.3483 20.3407C16.0001 19.9958 15.7239 19.5863 15.5355 19.1357C15.347 18.685 15.25 18.2021 15.25 17.7143C15.25 17.2265 15.347 16.7435 15.5355 16.2929C15.7239 15.8423 16.0001 15.4328 16.3483 15.0879C16.6966 14.743 17.11 14.4694 17.5649 14.2827C18.0199 14.0961 18.5075 14 19 14C19.9946 14 20.9484 14.3913 21.6517 15.0879C22.3549 15.7845 22.75 16.7292 22.75 17.7143C22.75 18.6994 22.3549 19.6441 21.6517 20.3407C20.9484 21.0372 19.9946 21.4286 19 21.4286V21.4286Z"
                fill={active ? "#213D53" : "white"}/>
        </G>
        <Defs>
          <ClipPath id="clip0">
            <Rect width="37" height="41" fill={active ? "#213D53" : "white"}/>
          </ClipPath>
        </Defs>
      </Svg>

    );
  }
}

export default CryptoBnb