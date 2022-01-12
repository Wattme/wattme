import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native/index";
import {} from "react-native-ui-lib";
import {
  Portal,
} from "react-native-portalize";
import {
  Modalize as ModalizeRoot,
} from "react-native-modalize";
import BlurView from "../BlurView";

const { width, height } = Dimensions.get("window");

const Modalize = (props) => {
  const { innerRef, children } = props;

  const onClose = () => {
    innerRef.current?.close();
  };

  const _FloatingComponent = () => {

    return (
      <TouchableOpacity
        style={styles.absolute}
        activeOpacity={1}
        onPress={onClose}
      >
        <BlurView style={styles.blurView}/>
      </TouchableOpacity>
    );
  };
  const _HeaderComponent = () => {
    return (
      <View style={styles.header}>
        <View style={styles.headerIndicatorClose}/>
      </View>
    )
  };

  return (
    <Portal>

      <ModalizeRoot
        ref={innerRef}
        adjustToContentHeight={true}
        avoidKeyboardLikeIOS={false}
        keyboardAvoidingBehavior="padding"
        scrollViewProps={{
          alwaysBounceHorizontal: false,
          alwaysBounceVertical: false,
          bounces: false,
        }}
        rootStyle={styles.rootStyle}
        modalStyle={styles.noBackGround}
        handleStyle={styles.noBackGround}
        childrenStyle={styles.childrenStyle}
        overlayStyle={styles.overlayStyle}

        FloatingComponent={_FloatingComponent}
        HeaderComponent={_HeaderComponent}

        {...props}
      >

        <View style={styles.containerBody}>
          {children}
        </View>

      </ModalizeRoot>

    </Portal>
  );
};

const styles = StyleSheet.create({
  rootStyle: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    zIndex: 999,
  },
  childrenStyle: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  overlayStyle: {
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0)",
  },

  absolute: {
    zIndex: -1,
    position: "absolute",
    right: 0,
    bottom: 0,
    width: width,
    height: height,
  },
  blurView: {
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
    top: 0,

    backgroundColor: "rgba(40, 40, 40, 0.4)",
  },

  noBackGround: {
    backgroundColor: "rgba(0, 0, 0, 0)",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,

    elevation: 0,
  },

  header: {
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -20,
    zIndex: 99
  },
  headerIndicatorClose: {
    width: 32,
    height: 4,
    backgroundColor: "#8E8E8E",
    borderRadius: 999
  },

  containerBody: {
    zIndex: 2,
    backgroundColor: "rgba(0, 0, 0, 0)"
  },
});

export default Modalize;
