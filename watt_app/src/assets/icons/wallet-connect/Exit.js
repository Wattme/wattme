import React, { PureComponent } from "react";
import {
  Svg,
  Path,
  Rect
} from "react-native-svg";

class Exit extends PureComponent {
  render() {
    const {
      size,
      color
    } = this.props;

    return (
      <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path fillRule="evenodd" clipRule="evenodd" d="M19.7504 12.4172C19.4354 12.1022 18.9247 12.1022 18.6097 12.4173L15.949 15.0779L13.3393 12.4681C13.0243 12.1531 12.5136 12.1532 12.1985 12.4682C11.8835 12.7833 11.8834 13.294 12.1984 13.609L14.8082 16.2187L12.1475 18.8794C11.8325 19.1944 11.8324 19.7052 12.1474 20.0201C12.4624 20.3351 12.9732 20.3351 13.2882 20.0201L15.9488 17.3594L18.5585 19.9691C18.8735 20.2841 19.3843 20.284 19.6993 19.969C20.0143 19.654 20.0144 19.1432 19.6994 18.8282L17.0897 16.2185L19.7503 13.5579C20.0654 13.2429 20.0654 12.7322 19.7504 12.4172Z" fill="#8E8E8E"/>
      </Svg>
    );
  }
}

Exit.defaultProps = {
  size: 32,
  color: "#282828",
};

export default Exit
