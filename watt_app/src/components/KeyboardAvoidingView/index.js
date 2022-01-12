import {Keyboard, KeyboardEvent, ScreenRect as KeyboardEventCoordinates} from "react-native/index";
import {LayoutAnimation} from "react-native/index";
import {Platform} from "react-native/index";
import * as React from 'react';
import {StyleSheet} from "react-native/index";
import {View, ViewStyle as ViewStyleProp, ViewProps, LayoutChangeEvent as ViewLayoutEvent, LayoutRectangle as ViewLayout, EventSubscription} from "react-native/index";

type Props = ViewProps & {

  /**
   * Specify how to react to the presence of the keyboard.
   */
  behavior?: ('height' | 'position' | 'padding'),

  /**
   * Style of the content container when `behavior` is 'position'.
   */
  contentContainerStyle?: ViewStyleProp,

  /**
   * Controls whether this `KeyboardAvoidingView` instance should take effect.
   * This is useful when more than one is on the screen. Defaults to true.
   */
  enabled?: boolean,

  /**
   * Distance between the top of the user screen and the React Native view. This
   * may be non-zero in some cases. Defaults to 0.
   */
  keyboardVerticalOffset?: number
};

type State = {
  bottom: number
};

/**
 * View that moves out of the way when the keyboard appears by automatically
 * adjusting its height, position, or bottom padding.
 */
class KeyboardAvoidingView extends React.Component<Props, State> {
  _frame: ViewLayout|null = null;
  _keyboardEvent: KeyboardEvent|null = null;
  _subscriptions: Array<EventSubscription> = [];
  viewRef: {current: React.ElementRef<typeof View> | null};
  _latestFrameHeightWithoutKeyboard: number = 0;
  _heightValues:number[] = [];

  constructor(props: Props) {
    super(props);
    this.state = {bottom: 0};
    this.viewRef = React.createRef();

  }

  _relativeKeyboardHeight(keyboardFrame: KeyboardEventCoordinates): number {
    const frame = this._frame;
    if (!frame || !keyboardFrame) {
      return 0;
    }

    const keyboardY = keyboardFrame.screenY - (this.props.keyboardVerticalOffset ?? 0);

    return Math.max(frame.y + this._latestFrameHeightWithoutKeyboard - keyboardY, 0);
  }

  _onKeyboardChange = (event: KeyboardEvent) => {
    this._keyboardEvent = event;
    this._updateBottomIfNecesarry();
  };

  _onLayout = (event: ViewLayoutEvent) => {
    const wasFrameNull = this._frame == null;
    this._frame = event.nativeEvent.layout;
    /** when component is doing its job (presumably b/c kb is open) bottom state is > 0,
     * so we don't have to store this._frame.height at this point
     */
    if (this.state.bottom == 0/*_initialFrameHeight*/) {
      this._latestFrameHeightWithoutKeyboard = this._frame.height;
      // save the initial frame height, before the keyboard is visible
      // this._initialFrameHeight = this._frame.height;
    } else {}

    if (wasFrameNull) {
      this._updateBottomIfNecesarry();
    }

    if (this.props.onLayout) {
      this.props.onLayout(event);
    }
  };

  _updateBottomIfNecesarry = () => {
    if (this._keyboardEvent == null) {
      this.setState({bottom: 0});
      return;
    }

    const {duration, easing, endCoordinates} = this._keyboardEvent;
    const height = this._relativeKeyboardHeight(endCoordinates);

    if (this.state.bottom === height) {
      return;
    }

    if (duration && easing) {
      LayoutAnimation.configureNext({
        // We have to pass the duration equal to minimal accepted duration defined here: RCTLayoutAnimation.m
        duration: duration > 10 ? duration : 10,
        update: {
          duration: duration > 10 ? duration : 10,
          type: LayoutAnimation.Types[easing] || 'keyboard',
        },
      });
    }
    this.setState({bottom: height});
  };

  componentDidMount(): void {
    if (Platform.OS === 'ios') {
      this._subscriptions = [
        Keyboard.addListener('keyboardWillChangeFrame', this._onKeyboardChange),
      ];
    } else {
      this._subscriptions = [
        Keyboard.addListener('keyboardDidHide', this._onKeyboardChange),
        Keyboard.addListener('keyboardDidShow', this._onKeyboardChange),
      ];
    }
  }

  componentWillUnmount(): void {
    this._subscriptions.forEach(subscription => {
      subscription.remove();
    });
  }

  render(): React.ReactNode {
    const {
      behavior,
      children,
      contentContainerStyle,
      enabled = true,
      // eslint-disable-next-line no-unused-vars
      keyboardVerticalOffset = 0,
      style,
      // eslint-disable-next-line no-unused-vars
      onLayout,
      ...props
    } = this.props;
    const bottomHeight = enabled === true ? this.state.bottom : 0;
    switch (behavior) {
      case 'height':
        let heightStyle;
        if (this._frame != null && this.state.bottom > 0) {
          // Note that we only apply a height change when there is keyboard present,
          // i.e. this.state.bottom is greater than 0. If we remove that condition,
          // this.frame.height will never go back to its original value.
          // When height changes, we need to disable flex.
          heightStyle = {
            height: this._latestFrameHeightWithoutKeyboard - bottomHeight,
            flex: 0,
          };
        }
        return (
          <View
            ref={this.viewRef}
            style={StyleSheet.compose(style, heightStyle)}
            onLayout={this._onLayout}
            {...props}>
            {children}
          </View>
        );

      case 'position':
        return (
          <View
            ref={this.viewRef}
            style={style}
            onLayout={this._onLayout}
            {...props}>
            <View
              style={StyleSheet.compose(contentContainerStyle, {
                bottom: bottomHeight,
              })}>
              {children}
            </View>
          </View>
        );

      case 'padding':
        return (
          <View
            ref={this.viewRef}
            style={StyleSheet.compose(style, {paddingBottom: bottomHeight})}
            onLayout={this._onLayout}
            {...props}>
            {children}
          </View>
        );

      default:
        return (
          <View
            ref={this.viewRef}
            onLayout={this._onLayout}
            style={style}
            {...props}>
            {children}
          </View>
        );
    }
  }
}

export default KeyboardAvoidingView;