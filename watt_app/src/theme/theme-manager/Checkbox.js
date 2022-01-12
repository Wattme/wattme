import {
  ThemeManager
} from "react-native-ui-lib";
import variables from "../variables";

const colors = {
  default: "#282828",
  primary: "#282828",
  secondary: variables.colorSecondary,
};
const sizes = {
  default: 32,
  large: 50,
};

ThemeManager.setComponentForcedTheme("Checkbox", (props) => {
  const color = colors[props.color || 'default'];
  const size = sizes[props.size || 'default'];

  return {
    color
  }
});
