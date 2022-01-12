import React, { PureComponent } from "react";
import {
  Svg,
  Path,
  Circle
} from "react-native-svg";
import Add from "../common/ArrowBottom";

class Close extends PureComponent {
  render() {
    const {
      size
    } = this.props;

    return (
      <Svg width={size} height={size} viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path fillRule="evenodd" clipRule="evenodd" d="M7.66826 0.466797H10.0513C10.5142 0.466788 10.9006 0.466781 11.2163 0.492572C11.5455 0.519471 11.8546 0.577634 12.1469 0.726566C12.5954 0.955064 12.96 1.31967 13.1885 1.76812C13.3374 2.06041 13.3956 2.36952 13.4225 2.69875C13.4482 3.0144 13.4482 3.40077 13.4482 3.86367V5.88676L13.9899 5.88676C14.4528 5.88675 14.8392 5.88674 15.1549 5.91253C15.4841 5.93943 15.7932 5.99759 16.0855 6.14653C16.534 6.37502 16.8986 6.73963 17.1271 7.18808C17.276 7.48037 17.3342 7.78948 17.3611 8.11871C17.3869 8.43438 17.3869 8.82077 17.3869 9.2837V16.4362C17.3869 16.8992 17.3869 17.2856 17.3611 17.6012C17.3342 17.9305 17.276 18.2396 17.1271 18.5319C16.8986 18.9803 16.534 19.3449 16.0855 19.5734C15.7932 19.7223 15.4841 19.7805 15.1549 19.8074C14.8392 19.8332 14.4529 19.8332 13.99 19.8332H3.72995C3.26706 19.8332 2.88061 19.8332 2.56496 19.8074C2.23573 19.7805 1.92663 19.7223 1.63433 19.5734C1.18588 19.3449 0.821275 18.9803 0.592776 18.5319C0.443845 18.2396 0.385682 17.9305 0.358782 17.6012C0.332991 17.2856 0.332999 16.8992 0.333008 16.4362V9.28372C0.332999 8.82078 0.332991 8.43438 0.358782 8.11871C0.385682 7.78948 0.443845 7.48037 0.592776 7.18808C0.821275 6.73963 1.18588 6.37502 1.63433 6.14653C1.92663 5.99759 2.23573 5.93943 2.56496 5.91253C2.88063 5.88674 3.26702 5.88675 3.72995 5.88676L4.27131 5.88676L4.27131 3.86375C4.2713 3.40083 4.27129 3.01442 4.29708 2.69875C4.32398 2.36952 4.38214 2.06041 4.53107 1.76812C4.75957 1.31967 5.12418 0.955064 5.57263 0.726566C5.86492 0.577634 6.17403 0.519471 6.50326 0.492572C6.81892 0.466781 7.20533 0.466788 7.66826 0.466797ZM12.1482 3.89013V5.88676H5.57131V3.89013C5.57131 3.39403 5.57181 3.06104 5.59276 2.80461C5.61309 2.55577 5.64939 2.43679 5.68938 2.35831C5.79324 2.15447 5.95897 1.98874 6.16282 1.88487C6.2413 1.84488 6.36028 1.80859 6.60912 1.78825C6.86555 1.7673 7.19853 1.7668 7.69464 1.7668H10.0249C10.521 1.7668 10.854 1.7673 11.1104 1.78825C11.3593 1.80859 11.4782 1.84488 11.5567 1.88487C11.7606 1.98874 11.9263 2.15447 12.0302 2.35831C12.0701 2.43679 12.1064 2.55577 12.1268 2.80461C12.1477 3.06104 12.1482 3.39403 12.1482 3.89013ZM8.86066 11.3063C9.21965 11.3063 9.51066 11.5974 9.51066 11.9563V13.763C9.51066 14.122 9.21965 14.413 8.86066 14.413C8.50168 14.413 8.21066 14.122 8.21066 13.763V11.9563C8.21066 11.5974 8.50168 11.3063 8.86066 11.3063Z" fill="#8E8E8E"/>
      </Svg>
    );
  }
}

Close.defaultProps = {
  size: 18
};

export default Close
