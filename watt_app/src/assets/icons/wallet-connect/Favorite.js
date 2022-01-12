import React, { PureComponent } from "react";
import {
  Svg,
  Path,
  Rect
} from "react-native-svg";

class Favorite extends PureComponent {
  render() {
    const {
      size,
      color,

      isFill
    } = this.props;

    return (
      <Svg width="32" height="32" viewBox="0 0 32 32" fill={isFill ? "#8E8E8E" : "none"} xmlns="http://www.w3.org/2000/svg">
        <Path d="M10.6129 24.8652C10.9324 25.0981 11.3185 25.0249 11.7911 24.6788L16.4238 21.2841L21.0565 24.6788C21.5291 25.0249 21.9218 25.0981 22.2346 24.8652C22.5408 24.6322 22.614 24.2461 22.4276 23.687L20.6105 18.2423L25.2765 14.8876C25.7491 14.5481 25.9354 14.1953 25.809 13.8226C25.6892 13.4631 25.343 13.2701 24.744 13.2768L19.0197 13.3101L17.2691 7.84533C17.0894 7.27956 16.8098 7 16.4238 7C16.0377 7 15.7582 7.27956 15.5784 7.84533L13.8279 13.3101L8.10355 13.2768C7.51115 13.2701 7.15838 13.4631 7.03857 13.8226C6.9121 14.1953 7.09847 14.5481 7.57106 14.8876L12.237 18.2423L10.4266 23.687C10.2335 24.2461 10.3067 24.6322 10.6129 24.8652Z" stroke="#8E8E8E" strokeWidth="1.5"/>
      </Svg>
    );
  }
}

Favorite.defaultProps = {
  size: 32,
  color: "#282828",
};

export default Favorite
