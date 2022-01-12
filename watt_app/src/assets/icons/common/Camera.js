import React, { PureComponent } from "react";
import {
  Svg,
  Path,
  Rect
} from "react-native-svg";

class Accept extends PureComponent {
  render() {
    const {
      fill
    } = this.props;

    return (
      <Svg width="36" height="32" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path fillRule="evenodd" clipRule="evenodd" d="M36 28.5714V8C36 6.10714 34.4883 4.57143 32.625 4.57143H26.4375L25.5656 2.22143C25.0734 0.885714 23.8148 0 22.4086 0H13.5844C12.1781 0 10.9195 0.885714 10.4273 2.22143L9.5625 4.57143H3.375C1.51172 4.57143 0 6.10714 0 8V28.5714C0 30.4643 1.51172 32 3.375 32H32.625C34.4883 32 36 30.4643 36 28.5714ZM23.2867 18C23.2867 20.9198 20.9198 23.2867 18 23.2867C15.0802 23.2867 12.7133 20.9198 12.7133 18C12.7133 15.0802 15.0802 12.7133 18 12.7133C20.9198 12.7133 23.2867 15.0802 23.2867 18ZM25 18C25 21.866 21.866 25 18 25C14.134 25 11 21.866 11 18C11 14.134 14.134 11 18 11C21.866 11 25 14.134 25 18Z" fill="white"/>
      </Svg>
    );
  }
}

export default Accept
