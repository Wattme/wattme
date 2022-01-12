import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native/index";
import {
  Text
} from "react-native-ui-lib";

const { width } = Dimensions.get("window");

class Slider extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeDot: 0
    };
  }

  onScrollEndDrag = ({ nativeEvent }) => {
    const sliderWidth = width;
    const contentOffsetX = nativeEvent?.contentOffset?.x || 0;
    const activeDot = Math.floor(contentOffsetX / sliderWidth);

    if (this.state.activeDot === activeDot) {
      return null
    }

    this.setState({ activeDot });
  }

  render() {
    const {
      children
    } = this.props;
    const {
      activeDot
    } = this.state;

    return (
      <View style={styles.root}>

        <ScrollView
          style={styles.slider}
          contentContainerStyle={{justifyContent: "center"}}

          scrollEventThrottle={160}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}

          onMomentumScrollEnd={this.onScrollEndDrag}
        >
          { children }
        </ScrollView>

        <View style={styles.dots}>
          {children.map((item, index) => (
            <View
              key={`slider-dot-${index}`}
              style={[
                styles.dot,
                Boolean(activeDot === index) && styles.dotActive
              ]}
            />
          ))}
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  },

  slider: {
    flexGrow: 1
  },

  dots: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -8,

    marginTop: 24
  },

  dot: {
    marginLeft: 8,

    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#8E8E8E"
  },
  dotActive: {
    backgroundColor: "#282828"
  },

});

export default Slider