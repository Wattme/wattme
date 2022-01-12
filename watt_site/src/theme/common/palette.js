const { colors } = require('@mui/material');

const white = '#FFFFFF';
const black = '#000000';
const blackLight = '#282828';
const main = '#F6D962';
const mainHover = '#F6D962';

module.exports = {
  black,
  white,
  blackLight,

  primary: {
    contrastText: white,
    dark: mainHover,
    main: main,
    light: main,
    hover: main
  },
  secondary: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue['A400'],
    light: colors.blue['A400']
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400]
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400]
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400]
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  text: {
    primary: black,
    secondary: colors.blueGrey[600],
    link: colors.blue[600]
  },
  background: {
    default: '#F4F6F8',
    paper: white
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200],
  gray: {
    default: '#8698B1',
    light: '#C2CFE0',
    veryLight: '#F3F5F9',
    dark: '#647083'
  }
};
