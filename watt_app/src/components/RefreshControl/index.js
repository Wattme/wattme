import React from "react";
import {
  RefreshControl as RefreshControlDefault,
} from "react-native/index";

const RefreshControl = (props) => {
  return (
    <RefreshControlDefault
      refreshing={props.isRefreshing}
      onRefresh={props.onRefresh}
      progressViewOffset={props?.progressViewOffset || 0}

      tintColor="#163046"
      titleColor="#163046"
      colors={["#163046", "#163046", "#163046"]}

      {...props}
    />
  );
};

export default RefreshControl
