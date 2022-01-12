import {
  ThemeManager,
} from "react-native-ui-lib";
import variables from "../variables";

const colors = {
  default: variables.colorPrimary,
  primary: variables.colorPrimary,
  secondary: variables.colorSecondary,
};
const colorsText = {
  default: "#282828",
  primary: "#282828",
  secondary: "white",
};

const sizes = {
  xsSmall: 36,
  small: 40,
  default: 52,
  large: 55,
  xLarge: 63,
};
const sizesTextFontWeight = {
  xsSmall: "normal",
  small: "500",
  default: "500",
  large: "500",
  xLarge: "500",
};
const sizesBorderRadius = {
  xsSmall: 8,
  small: 14,
  default: 14,
  large: 14,
  xLarge: 14,
};
const sizesText = {
  xsSmall: 16,
  small: 18,
  default: 18,
  large: 18,
  xLarge: 18,
};

const contained = (props) => {
  let { disabled, color, size, style, labelStyle } = props;

  color = !color ? "primary" : color;

  return {

    style: {
      borderWidth: 2,
      borderStyle: "solid",
      borderColor: Boolean(!disabled) ? colors[color] : "#8E8E8E",
      borderRadius: sizesBorderRadius[size || 'default'],

      backgroundColor: Boolean(!disabled) ? colors[color] : "#8E8E8E",

      height: sizes[size || 'default'],

      ...style
    },

    labelStyle: {
      fontSize: sizesText[size || 'default'],
      lineHeight: 21,
      fontWeight: sizesTextFontWeight[size || 'default'],
      color: disabled ? "#FFFFFF" : colorsText[color],

      ...labelStyle
    },

  }
}
const outlined = (props) => {
  let { disabled, color, size, style, labelStyle } = props;

  color = !color ? "primary" : color;

  return {

    style: {
      borderWidth: 2,
      borderStyle: "solid",
      borderColor: Boolean(!disabled) ? colors[color] : "#E2E7EB",
      borderRadius: 10,
      backgroundColor: "transparent",

      height: sizes[size || 'default'],

      ...style
    },

    labelStyle: {
      fontSize: 15,
      lineHeight: 18,
      fontWeight: sizesTextFontWeight[size || 'default'],
      color: disabled ? "#B0BEC8" : colors[color],

      ...labelStyle
    },

  }
}

ThemeManager.setComponentForcedTheme("Button", (props) => {
  let settings = {};

  if (props.variant === "contained" || !props.variant) {
    settings = contained(props);
  }
  if (props.variant === "outlined") {
    settings = outlined(props);
  }

  return settings
});



const old = () => {
  const color = colors[props.color || 'default'];
  const size = sizes[props.size || 'default'];

  let settings = {
    height: size,
    color: Boolean(props?.variant === 'contained') ? 'white' : color,
    backgroundColor: Boolean(props?.variant === 'outlined') ? 'rgba(0,0,0,0)' : color
  }
  let style = {
    height: size,

    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: color,
    borderRadius: 12,

    fontWeight: '500'
  };

  if (props.disabled) {
    style.borderColor = '#a4a4a4';
    settings.backgroundColor = '#a4a4a4';
  }

  return {
    style: {
      ...style,
      ...props.style
    },

    ...settings,

    labelStyle: {
      fontSize: 15,
      lineHeight: 18,
      fontWeight: "800",
      color: Boolean(props?.variant === 'contained') ? "white" : color
    }
  }
};
