import {
  ThemeManager,
  Typography
} from "react-native-ui-lib";

// AtypText-Regular
// AtypText-Bold
// AtypText-Light
// AtypText-Medium
// AtypText-Semibold

Typography.loadTypographies({
  body: {fontSize: 18},
  header: {
    fontSize: 20,
    lineHeight: 24,
    color: '#3D6670'
  },
  modalizeHeader: {
    fontSize: 18,
    color: '#090A0B',
    fontWeight: 'bold'
  },
  formTitle: {
    fontSize: 12,
    color: '#AFB4C0'
  },
})

const getFontFamily = (fontWidth) => {
  switch (fontWidth) {
    case "bold": {
      return 'SFUIDisplay-Bold'
    }
    case "300": {
      return 'SFUIDisplay-Light'
    }
    case "500": {
      return 'SFUIDisplay-Medium'
    }
    case "600": {
      return 'SFUIDisplay-Semibold'
    }
    case "800": {
      return 'SFUIDisplay-Semibold'
    }

    default: {
      return "SFUIDisplay-Regular"
    }
  }
}
const getStyleObject = (style) => {
  let styleObject = {};

  if (Boolean(Array.isArray(style))) {
    style.map((item) => {
      if (typeof item === 'object') {
        styleObject = {...styleObject, ...item}
      }
    })
  }
  else {
    if (Boolean(typeof style === 'object')) {
      styleObject = {...style}
    }
  }

  return styleObject

}
ThemeManager.setComponentForcedTheme("Text", (props) => {
  let style = getStyleObject(props.style);
  const fontFamily = getFontFamily(style.fontWeight);

  return {
    customTypography: true,

    style: {
      ...style,
      fontFamily
    }
  }
});

export {
  getFontFamily
}
