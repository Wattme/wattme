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
        <Path fillRule="evenodd" clipRule="evenodd" d="M16 26C21.5228 26 26 21.5228 26 16C26 10.4772 21.5228 6 16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26Z" fill="#282828"/>
        <Path fillRule="evenodd" clipRule="evenodd" d="M19.8518 12.2503C19.5368 11.9353 19.0261 11.9353 18.7111 12.2504L16.0503 14.9111L13.4407 12.3015C13.1257 11.9865 12.615 11.9866 12.2999 12.3016C11.9849 12.6167 11.9849 13.1274 12.2998 13.4424L14.9094 16.052L12.2489 18.7125C11.9339 19.0275 11.9339 19.5383 12.2488 19.8532C12.5638 20.1682 13.0746 20.1682 13.3896 19.8532L16.0501 17.1927L18.6599 19.8025C18.9749 20.1175 19.4857 20.1174 19.8007 19.8024C20.1157 19.4874 20.1158 18.9766 19.8008 18.6616L17.191 16.0518L19.8517 13.391C20.1668 13.076 20.1668 12.5653 19.8518 12.2503Z" fill="white"/>
      </Svg>
    );
  }
}

export default Add
