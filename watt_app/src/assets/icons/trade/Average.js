import React, { PureComponent } from "react";
import {
  Svg,
  Path, Mask, Rect,
} from "react-native-svg";

class Average extends PureComponent {
  render() {
    return (
      <Svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
         <Path d="M12.4232 16C12.0573 16 11.7646 15.9755 11.5451 15.9264V14.0434C10.8134 13.9522 10.1366 13.7874 9.51463 13.549C8.89268 13.3035 8.3878 13.0546 8 12.8021C8.00732 12.5146 8.09878 12.213 8.27439 11.8974C8.45 11.5748 8.6439 11.3434 8.8561 11.2032C9.35366 11.5187 9.92805 11.7957 10.5793 12.0342C11.2378 12.2726 11.889 12.3954 12.5329 12.4024C13.1768 12.4024 13.711 12.2691 14.1354 12.0026C14.5598 11.7361 14.7756 11.3574 14.7829 10.8665C14.7976 10.025 14.2598 9.41837 13.1695 9.04668L10.9963 8.32084C10.1988 8.04734 9.56951 7.66163 9.10854 7.16371C8.65488 6.66579 8.42805 6.04515 8.42805 5.30178C8.42805 4.43918 8.72805 3.69932 9.32805 3.08218C9.93537 2.45803 10.7476 2.07933 11.7646 1.94609V0.0841553C11.8817 0.056104 12.0207 0.035065 12.1817 0.0210385C12.3427 0.00701284 12.4927 0 12.6317 0C12.9756 0 13.2646 0.0280518 13.4988 0.0841553V1.94609C14.1061 2.01622 14.6695 2.13544 15.189 2.30375C15.7159 2.46504 16.1841 2.65089 16.5939 2.86128C16.5939 3.14881 16.5207 3.44335 16.3744 3.74491C16.2354 4.03945 16.0561 4.28139 15.8366 4.47074C15.3317 4.21126 14.8085 4.00438 14.2671 3.8501C13.7329 3.6888 13.1988 3.60815 12.6646 3.60815C12.0354 3.60815 11.5341 3.7414 11.161 4.00789C10.7878 4.27438 10.6012 4.63204 10.6012 5.08087C10.6012 5.50866 10.7439 5.83125 11.0293 6.04865C11.322 6.25904 11.6988 6.44138 12.1598 6.59566L14.2012 7.30046C15.0573 7.595 15.7378 8.02279 16.2427 8.58383C16.7476 9.13785 17 9.85667 17 10.7403C17 11.6309 16.6671 12.3813 16.0012 12.9915C15.3354 13.5946 14.428 13.9557 13.2793 14.075V15.9264C13.0671 15.9755 12.7817 16 12.4232 16Z" fill="#282828"/>
        <Path fillRule="evenodd" clipRule="evenodd" d="M4.3334 5.83333C4.3334 5.64924 4.18416 5.5 4.00007 5.5C3.81597 5.5 3.66673 5.64924 3.66673 5.83333V8.1666H1.33333C1.14924 8.1666 1 8.31584 1 8.49993C1 8.68403 1.14924 8.83327 1.33333 8.83327H3.66673V11.1667C3.66673 11.3508 3.81597 11.5 4.00007 11.5C4.18416 11.5 4.3334 11.3508 4.3334 11.1667V8.83327H6.66667C6.85076 8.83327 7 8.68403 7 8.49993C7 8.31584 6.85076 8.1666 6.66667 8.1666H4.3334V5.83333Z" fill="#282828"/>
        <Path d="M3.66673 8.1666V8.3666H3.86673V8.1666H3.66673ZM3.66673 8.83327H3.86673V8.63327H3.66673V8.83327ZM4.3334 8.83327V8.63327H4.1334V8.83327H4.3334ZM4.3334 8.1666H4.1334V8.3666H4.3334V8.1666ZM4.00007 5.7C4.0737 5.7 4.1334 5.7597 4.1334 5.83333H4.5334C4.5334 5.53878 4.29462 5.3 4.00007 5.3V5.7ZM3.86673 5.83333C3.86673 5.7597 3.92643 5.7 4.00007 5.7V5.3C3.70551 5.3 3.46673 5.53878 3.46673 5.83333H3.86673ZM3.86673 8.1666V5.83333H3.46673V8.1666H3.86673ZM1.33333 8.3666H3.66673V7.9666H1.33333V8.3666ZM1.2 8.49993C1.2 8.4263 1.2597 8.3666 1.33333 8.3666V7.9666C1.03878 7.9666 0.8 8.20538 0.8 8.49993H1.2ZM1.33333 8.63327C1.2597 8.63327 1.2 8.57357 1.2 8.49993H0.8C0.8 8.79449 1.03878 9.03327 1.33333 9.03327V8.63327ZM3.66673 8.63327H1.33333V9.03327H3.66673V8.63327ZM3.86673 11.1667V8.83327H3.46673V11.1667H3.86673ZM4.00007 11.3C3.92643 11.3 3.86673 11.2403 3.86673 11.1667H3.46673C3.46673 11.4612 3.70551 11.7 4.00007 11.7V11.3ZM4.1334 11.1667C4.1334 11.2403 4.0737 11.3 4.00007 11.3V11.7C4.29462 11.7 4.5334 11.4612 4.5334 11.1667H4.1334ZM4.1334 8.83327V11.1667H4.5334V8.83327H4.1334ZM6.66667 8.63327H4.3334V9.03327H6.66667V8.63327ZM6.8 8.49993C6.8 8.57357 6.7403 8.63327 6.66667 8.63327V9.03327C6.96122 9.03327 7.2 8.79449 7.2 8.49993H6.8ZM6.66667 8.3666C6.7403 8.3666 6.8 8.4263 6.8 8.49993H7.2C7.2 8.20538 6.96122 7.9666 6.66667 7.9666V8.3666ZM4.3334 8.3666H6.66667V7.9666H4.3334V8.3666ZM4.1334 5.83333V8.1666H4.5334V5.83333H4.1334Z" fill="#282828"/>
      </Svg>
    );
  }
}

export default Average
