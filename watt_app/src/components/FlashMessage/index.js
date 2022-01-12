import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native/index";
import {
  Text,
} from "react-native-ui-lib";
import {
  colors,
  icons,
} from "../../common/Notification";
import Svg, { Path } from "react-native-svg";
import getHeightStatusBar from "../../helpers/getHeightStatusBar";

const heightStatusBar = getHeightStatusBar();

const FlashMessage = (props) => {
  const { message } = props;
  const color = colors[message.type];
  const icon = icons[message.type];

  const handleOnClose = () => {
    props?.onClick();
  };

  return (
    <>

      <TouchableOpacity
        style={[styles.root, { backgroundColor: color }]}
        activeOpacity={1}
        onPress={handleOnClose}
      >

        <View style={styles.content}>

          <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path fillRule="evenodd" clipRule="evenodd" d="M12.1828 4.5C7.93973 4.5 4.5 7.93973 4.5 12.1828C4.5 16.426 7.93973 19.8657 12.1828 19.8657C16.426 19.8657 19.8657 16.426 19.8657 12.1828C19.8657 7.93973 16.426 4.5 12.1828 4.5ZM3 12.1828C3 7.1113 7.1113 3 12.1828 3C17.2544 3 21.3657 7.1113 21.3657 12.1828C21.3657 17.2544 17.2544 21.3657 12.1828 21.3657C7.1113 21.3657 3 17.2544 3 12.1828ZM12.182 10.4955C12.5962 10.4955 12.932 10.8313 12.932 11.2455V15.9305C12.932 16.3447 12.5962 16.6805 12.182 16.6805C11.7678 16.6805 11.432 16.3447 11.432 15.9305V11.2455C11.432 10.8313 11.7678 10.4955 12.182 10.4955ZM12.1837 9.37114C12.7012 9.37114 13.1207 8.95164 13.1207 8.43416C13.1207 7.91668 12.7012 7.49718 12.1837 7.49718C11.6662 7.49718 11.2467 7.91668 11.2467 8.43416C11.2467 8.95164 11.6662 9.37114 12.1837 9.37114Z" fill="white"/>
          </Svg>

          <Text style={styles.label}>{message?.description}</Text>

        </View>

      </TouchableOpacity>

    </>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: heightStatusBar + 16,
    marginHorizontal: 16,

    padding: 16,
    borderRadius: 14,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },

  label: {
    marginLeft: 16,
    fontSize: 14,
    lineHeight: 18,
    color: "white",
    flex: 1,
  }
});

export default FlashMessage;
