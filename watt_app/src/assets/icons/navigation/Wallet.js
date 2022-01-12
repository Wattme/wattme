import React, { PureComponent } from "react";
import {
  Svg,
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  Rect
} from "react-native-svg";

class Wallet extends PureComponent {
  render() {
    const {
      isFocus
    } = this.props;
    const widthStroke = isFocus ? 0 : 1.5;
    const colorStroke = isFocus ? '#282828' : '#8E8E8E';
    const colorFill = isFocus ? '#282828' : 'transparent';

    if (!isFocus) {
      return (
        <Svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path fillRule="evenodd" clipRule="evenodd" d="M20.0661 5.56654C19.583 5.5016 18.9355 5.5 17.9715 5.5H6.02768C5.19105 5.5 4.51149 6.17254 4.50015 7.00649C4.50035 7.0137 4.50045 7.02094 4.50045 7.0282V7.06522C4.52038 7.8916 5.19652 8.55537 6.02768 8.55537H21.2214C21.221 7.69762 21.2154 7.10518 21.1549 6.6554C21.0929 6.19393 20.9857 5.99644 20.8554 5.86612C20.725 5.7358 20.5275 5.62858 20.0661 5.56654ZM3 7.02769C3 7.04537 3.00015 7.06301 3.00045 7.08062V19.2497L3.00045 19.3045C3.00043 20.6721 3.00042 21.7745 3.11698 22.6414C3.23799 23.5415 3.49689 24.2994 4.0988 24.9013C4.70072 25.5032 5.45859 25.7621 6.3587 25.8831C7.22567 25.9997 8.32799 25.9997 9.69558 25.9997H9.75045H20.5273H20.5822C21.9498 25.9997 23.0521 25.9997 23.919 25.8831C24.8192 25.7621 25.577 25.5032 26.1789 24.9013C26.7809 24.2994 27.0398 23.5415 27.1608 22.6414C27.2773 21.7745 27.2773 20.6722 27.2773 19.3046V19.2497V15.3059V15.2509C27.2773 13.8834 27.2773 12.7811 27.1608 11.9141C27.0398 11.014 26.7809 10.2561 26.1789 9.65423C25.577 9.05231 24.8192 8.79342 23.919 8.6724C23.5608 8.62423 23.1623 8.59597 22.7215 8.57939C22.7213 7.7334 22.718 7.02394 22.6416 6.45552C22.5572 5.82773 22.3715 5.26093 21.916 4.80546C21.4605 4.34999 20.8937 4.16432 20.266 4.07991C19.6712 3.99995 18.922 3.99997 18.0235 4H18.0235L17.9715 4H6.02768C4.35554 4 3 5.35554 3 7.02769ZM4.50045 19.2497V9.64253C4.9488 9.90496 5.47067 10.0554 6.02768 10.0554H15.1109C15.1202 10.0557 15.1295 10.0559 15.1389 10.0559H20.5273C21.9627 10.0559 22.9638 10.0575 23.7192 10.159C24.4529 10.2577 24.8415 10.4381 25.1183 10.7149C25.395 10.9917 25.5755 11.3802 25.6741 12.114C25.7487 12.6686 25.7694 13.3558 25.7751 14.2501H24.2481C22.576 14.2501 21.2204 15.6056 21.2204 17.2777C21.2204 18.9499 22.576 20.3054 24.2481 20.3054H25.7751C25.7694 21.1997 25.7487 21.8869 25.6741 22.4415C25.5755 23.1753 25.395 23.5639 25.1183 23.8407C24.8415 24.1174 24.4529 24.2979 23.7192 24.3965C22.9638 24.4981 21.9627 24.4997 20.5273 24.4997H9.75045C8.31503 24.4997 7.31392 24.4981 6.55857 24.3965C5.8248 24.2979 5.43623 24.1174 5.15946 23.8407C4.8827 23.5639 4.70225 23.1753 4.6036 22.4415C4.50205 21.6862 4.50045 20.6851 4.50045 19.2497ZM22.7204 17.2777C22.7204 16.434 23.4044 15.7501 24.2481 15.7501H25.7758V18.8054H24.2481C23.4044 18.8054 22.7204 18.1215 22.7204 17.2777Z" fill="#767676"/>
        </Svg>
      )
    }

    return (
      <Svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path fillRule="evenodd" clipRule="evenodd" d="M17.8013 5.5C18.7653 5.5 19.4129 5.5016 19.8959 5.56654C20.3574 5.62858 20.5549 5.7358 20.6852 5.86612C20.8155 5.99644 20.9227 6.19393 20.9847 6.6554C21.0442 7.09771 21.0506 7.67797 21.0512 8.51283H20.4852L20.369 8.51282L20.3141 8.51283H15.0321H6.00641C5.17445 8.51283 4.5 7.83838 4.5 7.00641C4.5 6.17445 5.17444 5.5 6.00641 5.5H17.8013ZM3 7.00641C3 5.34602 4.34602 4 6.00641 4H17.8013L17.8533 4H17.8533H17.8533C18.7518 3.99997 19.501 3.99995 20.0958 4.07992C20.7236 4.16432 21.2904 4.34999 21.7458 4.80546C22.2013 5.26093 22.387 5.82773 22.4714 6.45553C22.5465 7.01464 22.551 7.71023 22.5513 8.538C22.975 8.55478 23.3592 8.58275 23.7059 8.62935C24.606 8.75036 25.3638 9.00926 25.9658 9.61117C26.5677 10.2131 26.8266 10.971 26.9476 11.8711C27.0326 12.5031 27.0556 13.2601 27.0618 14.1538H25.1859C23.5255 14.1538 22.1795 15.4999 22.1795 17.1603C22.1795 18.8207 23.5255 20.1667 25.1859 20.1667H27.0618C27.0556 21.0604 27.0326 21.8175 26.9476 22.4494C26.8266 23.3496 26.5677 24.1074 25.9658 24.7094C25.3638 25.3113 24.606 25.5702 23.7059 25.6912C22.8389 25.8077 21.7366 25.8077 20.369 25.8077H20.3141H9.75001H9.69514C8.32754 25.8077 7.22522 25.8077 6.35825 25.6912C5.45814 25.5702 4.70027 25.3113 4.09835 24.7094C3.49644 24.1074 3.23754 23.3496 3.11653 22.4495C2.99997 21.5825 2.99998 20.4802 3 19.1126V19.1126V19.1126V19.0577V7.00641ZM27.0641 15.6538V18.6667H25.1859C24.3539 18.6667 23.6795 17.9922 23.6795 17.1603C23.6795 16.3283 24.3539 15.6538 25.1859 15.6538H27.0641Z" fill="#282828"/>
      </Svg>
    );
  }
}

export default Wallet