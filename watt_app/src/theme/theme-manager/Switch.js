import {
  ThemeManager,
} from "react-native-ui-lib";
import variables from "../variables";

const colors = {
  default: variables.colorPrimary,
  primary: variables.colorPrimary,
  secondary: variables.colorSecondary,
};

ThemeManager.setComponentForcedTheme("Switch", (props) => {
  return {
    onColor: "#10B879",
    offColor: "#8E8E8E",

    width: 48,
    height: 28,

    thumbSize: 24
  }
});
