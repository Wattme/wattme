import {
  ThemeManager
} from "react-native-ui-lib";
import variables from "../variables";

const colors = {
  default: variables.colorPrimary,
  primary: variables.colorPrimary,
  secondary: variables.colorSecondary,
};
const sizes = {
  default: 40,
  large: 50,
};

ThemeManager.setComponentForcedTheme("RadioButton", (props) => {
  const color = colors[props.color || 'default'];
  const size = sizes[props.size || 'default'];

  return {
    color
  }
});
