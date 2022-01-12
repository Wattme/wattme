import React from "react";
import {
  View,
  Easing,
  Animated,
  StyleSheet,
} from "react-native/index";
import Svg, { Path, Rect } from "react-native-svg";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

class LoadSpinner extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      spinValue: new Animated.Value(0)
    }
  }

  componentDidMount = () => {
    this.startAnimation();
  }

  startAnimation = () => {

    Animated.loop(
      Animated.timing(
        this.state.spinValue,
        {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true
        }
      )
    ).start();

  }


  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    const {
      color
    } = this.props;

    return (
      <View style={styles.root}>

        <AnimatedSvg width="108" height="108" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: [{ rotate: spin }]
          }}
        >
          <Rect width="108" height="108" fill={ color } />

          <Path
            d="M94 54C94 76.0914 76.0914 94 54 94C31.9086 94 14 76.0914 14 54C14 31.9086 31.9086 14 54 14C76.0914 14 94 31.9086 94 54ZM19.7348 54C19.7348 72.9241 35.0759 88.2652 54 88.2652C72.9241 88.2652 88.2652 72.9241 88.2652 54C88.2652 35.0759 72.9241 19.7348 54 19.7348C35.0759 19.7348 19.7348 35.0759 19.7348 54Z"
            fill="#3D3D3D"
          />

          <Path
            d="M91.1326 54C92.7162 54 94.0107 52.7145 93.8973 51.135C93.2417 42.0014 89.4668 33.3355 83.1587 26.6181C76.8507 19.9007 68.439 15.5891 59.3645 14.3613C57.7952 14.149 56.431 15.3602 56.3316 16.9407V16.9407C56.2321 18.5212 57.436 19.8707 59.0027 20.1019C66.6203 21.2259 73.6691 24.8902 78.9783 30.5439C84.2874 36.1976 87.5019 43.4625 88.1453 51.1357C88.2777 52.7138 89.549 54 91.1326 54V54Z"
            fill="#F5EB51"
          />
        </AnimatedSvg>

        <Svg style={styles.lightning}>
          <Path
            d="M65.5616 54.7618C65.8785 54.1663 66.0279 53.5047 65.9957 52.8398C65.9634 52.1749 65.7506 51.5288 65.3773 50.9628C65.0041 50.3967 64.4828 49.9296 63.863 49.6057C63.2432 49.2818 62.5455 49.1119 61.836 49.1121H54.9026C54.7774 49.1121 54.6534 49.0889 54.5377 49.0438C54.422 48.9988 54.317 48.9327 54.2286 48.8495C54.1402 48.7663 54.0702 48.6675 54.0225 48.5588C53.9749 48.4502 53.9506 48.3337 53.9511 48.2162V33.816C53.9501 33.6307 53.8822 33.4512 53.7586 33.3067C53.6349 33.1622 53.4628 33.0613 53.2701 33.0203C53.0775 32.9793 52.8758 33.0008 52.6978 33.0811C52.5198 33.1614 52.3761 33.2959 52.29 33.4627L42.4313 52.2761C42.117 52.8727 41.9702 53.5348 42.005 54.1996C42.0398 54.8643 42.255 55.5098 42.6301 56.0747C43.0053 56.6396 43.528 57.1052 44.1487 57.4275C44.7695 57.7498 45.4676 57.918 46.1771 57.9163H52.9995C53.2473 57.9162 53.4853 58.0068 53.663 58.1688C53.8407 58.3308 53.9441 58.5514 53.9511 58.7838V73.184C53.9521 73.3693 54.0199 73.5488 54.1436 73.6933C54.2672 73.8378 54.4394 73.9387 54.632 73.9797C54.8246 74.0207 55.0263 73.9992 55.2043 73.9189C55.3823 73.8386 55.526 73.7041 55.6121 73.5373L65.5616 54.7618Z"
            fill="#F5EB51"
          />
        </Svg>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",

    width: 108,
    height: 108,
  },

  lightning: {
    position: "absolute",
    alignSelf: "center",
  }
});

LoadSpinner.defaultProps = {
  color: "black"
};

export default LoadSpinner;
