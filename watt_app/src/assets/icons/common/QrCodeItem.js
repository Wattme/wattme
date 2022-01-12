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
        <Path d="M13.2996 7H7.89994C7.40292 7 7 7.40294 7 7.9V13.3C7 13.7971 7.40292 14.2 7.89994 14.2H13.2996C13.7966 14.2 14.1996 13.7971 14.1996 13.3V7.9C14.1996 7.40294 13.7966 7 13.2996 7Z" stroke="#282828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <Path d="M13.2996 17.7998H7.89994C7.40292 17.7998 7 18.2027 7 18.6998V24.0998C7 24.5969 7.40292 24.9998 7.89994 24.9998H13.2996C13.7966 24.9998 14.1996 24.5969 14.1996 24.0998V18.6998C14.1996 18.2027 13.7966 17.7998 13.2996 17.7998Z" stroke="#282828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <Path d="M24.0998 7H18.6998C18.2027 7 17.7998 7.40294 17.7998 7.9V13.3C17.7998 13.7971 18.2027 14.2 18.6998 14.2H24.0998C24.5969 14.2 24.9998 13.7971 24.9998 13.3V7.9C24.9998 7.40294 24.5969 7 24.0998 7Z" stroke="#282828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <Path d="M17.7998 17.7998V21.3998" stroke="#282828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <Path d="M17.7998 24.9998H21.3998V17.7998" stroke="#282828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <Path d="M21.4004 19.5996H25.0004" stroke="#282828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <Path d="M25 23.2002V25.0002" stroke="#282828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </Svg>
    );
  }
}

export default AcceptBadge
